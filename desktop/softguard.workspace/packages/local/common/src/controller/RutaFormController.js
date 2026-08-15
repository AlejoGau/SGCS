//MIGRADO2024
Ext.define('Common.controller.RutaFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'GeocercaCuentaModel', 'GeocercaMapModel', 'GeocercaModel', 'GeocercaSearchModel', 'TablasLineasSearchModel', 'TGFlotasByUserModel', 'LineaByUserSearchModel' ],
    views : [ 'RutaFormView' ],
    init : function(config) {
        // genero los eventos
    	this.control({
			'rutaformview' : {
				afterrender : this.initview
			},
            'rutaformview button[action=save]': {
                click: this.onSaveClick
            },
            'rutaformview gmappanel6': {
                mapready: this.onMapReady
            }
            
            
        });
	}, 
	initview : function(view) {
        var flotas = Ext.create('Ext.data.Store', {
            model: this.getLineaByUserSearchModelModel(),
            autoLoad: false
        });
        var combo = view.down('#comboFlota');
        combo.bindStore(flotas);
        flotas.load({
            callback: function(records, operation, success){
                if (records.length == 0 && view.down('#toolbarFlota')){
                    view.removeDocked(view.down('#toolbarFlota'),true);
                } else{
                    combo.setValue(record.get('Dealer'));
                }
            }
        });
        var record = view.record;
        
        view.down('#Name').setValue(record.get('Name'))
        
        view.down('#Name').originalValue = record.get('Name');
        
       
        view.down('#GeoType').setValue(record.get('GeoType'))
        
        
        if(record.get('Dealer') != '') {
            view.down('#comboFlota').setDisabled(true)
            view.down('#comboFlota').setValue(record.get('Dealer'))
        }
	},
    
    onMapReady: function(gmappanel6,gmap){
        var me = this;
        var view = gmappanel6.up('rutaformview');
        var map = gmappanel6.getMap();
        var record = view.record;
        var polyOptions = {
          strokeWeight: 1,
          fillOpacity: 0.45,
          editable: true
        };
        
        
        google.maps.Polyline.prototype.getBounds = function() {
          var bounds = new google.maps.LatLngBounds();
          this.getPath().forEach(function(e) {
            bounds.extend(e);
          });
          return bounds;
        };
        
        gmappanel6.routemarkers = {data:[]};
        // Creates a drawing manager attached to the map that allows the user to draw
        // markers, lines, and shapes.
        gmappanel6.drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYLINE,
          markerOptions: {
            draggable: true
          },
          drawingControlOptions: {
            drawingModes: [
                google.maps.drawing.OverlayType.MARKER,
                google.maps.drawing.OverlayType.POLYLINE,
              //  google.maps.drawing.OverlayType.CIRCLE,
              //  google.maps.drawing.OverlayType.POLYGON
            ]
          },
          rectangleOptions: polyOptions,
          polylineOptions: polyOptions,
          circleOptions: polyOptions,
          polygonOptions: polyOptions,
          map: map
        });
        
        // dibujo la geocerca
        var metadata = Ext.create(me.getGeocercaMapModelModel());
        metadata.data = Ext.decode(record.get('MetaData'));
        
        if (metadata.get('Type') == 'circle'){
            var newShape = new google.maps.Circle();
            
            var center = new google.maps.LatLng(
                metadata.get('CenterLat'),
                metadata.get('CenterLng')
            );
            newShape.setCenter(center);
            newShape.setRadius(metadata.get('Radius'));
            newShape.setMap(map);
            gmappanel6.geocerca = newShape;
            var bounds = newShape.getBounds();
            map.fitBounds(bounds);
        }
        
        if (metadata.get('Type') == 'polygon'){
            var newShape = new google.maps.Polygon();
            var pathArray = Ext.decode(metadata.get('Path'));
            var path = new google.maps.MVCArray();
            
            Ext.Array.each(pathArray,function(item){
                var latlng = new google.maps.LatLng(
                    item.lat,
                    item.lng
                )
                path.push(latlng);
            });
            
            newShape.setPath(path);
            newShape.setMap(map);
            gmappanel6.geocerca = newShape;
            var bounds = newShape.getBounds();
            map.fitBounds(bounds);
        }
        
        if (metadata.get('Type') == 'polyline'){
            var newShape = new google.maps.Polyline();
            var pathArray = Ext.decode(metadata.get('Path'));
            var path = new google.maps.MVCArray();
            
            Ext.Array.each(pathArray,function(item){
                var latlng = new google.maps.LatLng(
                    item.lat,
                    item.lng
                )
                path.push(latlng);
            });
            
            newShape.setPath(path);
            newShape.setMap(map);
            gmappanel6.geocerca = newShape;
            var bounds = newShape.getBounds();
            map.fitBounds(bounds);
        }
        
        gmappanel6.colors = ['#1E90FF', '#FF1493', '#32CD32', '#FF8C00', '#4B0082'];
        google.maps.event.addListener(gmappanel6.drawingManager, 'overlaycomplete', function(e) {
            if (e.type != google.maps.drawing.OverlayType.MARKER) {
                // Switch back to non-drawing mode after drawing a shape.
                gmappanel6.drawingManager.setDrawingMode(null);
    
                // Add an event listener that selects the newly-drawn shape when the user
                // mouses down on it.
                var newShape = e.overlay;
                newShape.type = e.type;
                google.maps.event.addListener(newShape, 'click', function() {
                  me.setSelection(newShape,gmappanel6);
                });
                me.setSelection(newShape, gmappanel6);
                
                gmappanel6.routemarkers = {data:[]};
                
                if (gmappanel6.geocerca){
                    gmappanel6.geocerca.setMap(null);
                }
                gmappanel6.geocerca = newShape;
                metadata.set('Type',newShape.type);
                
                if (newShape.type == 'circle'){
                    metadata.set('CenterLat',newShape.getCenter().lat());
                    metadata.set('CenterLng',newShape.getCenter().lng());
                    metadata.set('Radius',newShape.radius);
                }
                
                if (newShape.type == 'polygon'){
                    var path = new Array();
                    newShape.getPath().forEach(function(element){
                        path.push({
                            lat: element.lat(),
                            lng: element.lng()
                        })
                    })
                    metadata.set('Path',Ext.encode(path));
                }
                
                if (newShape.type == 'polyline'){
                    var path = new Array();
                    newShape.getPath().forEach(function(element){
                        path.push({
                            lat: element.lat(),
                            lng: element.lng()
                        })
                    })
                    metadata.set('Path',Ext.encode(path));
                }
                
                
                record.set('MetaData',Ext.encode(metadata.data));
            }
        });
        
        google.maps.event.addListener(gmappanel6.drawingManager, 'markercomplete', function(e) {
            if (gmappanel6.geocerca){
                    gmappanel6.geocerca.setMap(null);
                }
                var currentroute = gmappanel6.routemarkers;
                var length = currentroute.data.length;
                if (!currentroute.start){
                    currentroute.start = e;
                } else {
                    currentroute.start.setMap(null);
                    currentroute.data.push({location:e.getPosition(), stopover:true});
                    me.makeroute(gmappanel6, metadata, record);
                    e.setMap(null);
                }        
                
            }
        );
        // Clear the current selection when the drawing mode is changed, or when the
        // map is clicked.
        google.maps.event.addListener(gmappanel6.drawingManager, 'drawingmode_changed', function(){
            if (gmappanel6.selectedShape) {
              gmappanel6.selectedShape.setEditable(false);
              gmappanel6.selectedShape = null;
            }
            
            if (gmappanel6.routemarkers.directionDisplay){
                gmappanel6.routemarkers.directionDisplay.setMap(null);
                gmappanel6.routemarkers = {data:[]};
            }
            
        });
        
        google.maps.event.addListener(map, 'click', function(){
            if (gmappanel6.selectedShape) {
              gmappanel6.selectedShape.setEditable(false);
              gmappanel6.selectedShape = null;
            }
        });
        //me.buildColorPalette();
    },
    
    onSaveClick: function (button,event,options) {
        var controller = this;
        var view = button.up('rutaformview');
        var myform = view.getForm();
        var record = view.record;       
        var vehicle = view.vehicle;
        var dealer = view.down('#comboFlota');
        var name = view.down('#Name');
        var geotype = view.down('#GeoType');
        record.set('GeoType', geotype.getValue());
        record.set('Dealer', dealer.getValue());
        record.set('Name', name.getValue());
                        
        if (myform.isValid()){           
            myform.updateRecord(record);
            var isnew = record.get('Id');
            view.record.save({
                success: function(record, operation) {                
                    notify('Se guardo con exito');
                    if (vehicle && isnew == 0){
                        var geocercaCuentaModel = controller.getGeocercaCuentaModelModel();
                        var geocercaCuenta = Ext.create(geocercaCuentaModel,{
                            GeoFenseId: view.record.get('Id'),
                            CuentaId: vehicle.get('OwnerId')
                        })
                        geocercaCuenta.save({callback: function(){
                            view.caller.fireEvent('objectchanged', view.caller, view.record);
                            view.up('window').close();
                        }});
                    }
                    else {
                        view.caller.fireEvent('objectchanged', view.caller, view.record);
                        view.up('window').close();
                    }
                
            }})
        }
    },
    
    makeroute: function(gmappanel6, metadata, record){
        var currentroute = gmappanel6.routemarkers;
        var waypts= Ext.Array.clone(currentroute.data);
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        
        
        if (!gmappanel6.routemarkers.directionDisplay){
            directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: false, //false it if you want a marker from the direction service
                polylineOptions: {
                    strokeColor: 'red', //"black",
                    strokeOpacity: 1.0,
                    strokeWeight: 3
                }
            });
            gmappanel6.routemarkers.directionDisplay = directionsDisplay;
        } else {
            directionsDisplay = gmappanel6.routemarkers.directionDisplay;
        }
        var start = currentroute.start.getPosition();
        var end = waypts[waypts.length-1].location;
        
        
        waypts.pop();
        var request = {
            origin:start,
            destination:end,
            waypoints:waypts,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                
                metadata.set('Type','polyline');
                var path = new Array();
                var legs = response.routes[0].legs;
                for (i=0;i<legs.length;i++) {
                  var steps = legs[i].steps;
                  for (j=0;j<steps.length;j++) {
                    var nextSegment = steps[j].path;
                    for (k=0;k<nextSegment.length;k++) {
                      path.push({
                            lat: nextSegment[k].lat(),
                            lng: nextSegment[k].lng()
                        })
                    }
                  }
                }
                metadata.set('Path',Ext.encode(path));
                record.set('MetaData',Ext.encode(metadata.data));
            }
        });
        directionsDisplay.setMap(gmappanel6.getMap());
        
    },
    
    clearSelection: function(gmappanel6) {
        if (gmappanel6.selectedShape) {
          gmappanel6.selectedShape.setEditable(false);
          gmappanel6.selectedShape = null;
        }
      },
      setSelection: function(shape, gmappanel6) {
        this.clearSelection(gmappanel6);
        gmappanel6.selectedShape = shape;
        shape.setEditable(true);
        this.selectColor(shape.get('fillColor') || shape.get('strokeColor'), gmappanel6);
      },
      deleteSelectedShape: function(gmappanel6) {
        if (gmappanel6.selectedShape) {
          gmappanel6.selectedShape.setMap(null);
        }
      },
      
      setSelectedShapeColor: function(color,gmappanel6) {
        if (gmappanel6.selectedShape) {
          if (gmappanel6.selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
            gmappanel6.selectedShape.set('strokeColor', color);
          } else {
            gmappanel6.selectedShape.set('fillColor', color);
          }
        }
      },
      makeColorButton: function(color,gmappanel6) {
        var button = document.createElement('span');
        button.className = 'color-button';
        button.style.backgroundColor = color;
        google.maps.event.addDomListener(button, 'click', function() {
          selectColor(color,gmappanel6);
          setSelectedShapeColor(color,gmappanel6);
        });
        return button;
      },
    
    selectColor: function(color,gmappanel6) {
        gmappanel6.selectedColor = color;
        var colors = gmappanel6.colors;
        var drawingManager = gmappanel6.drawingManager;
        for (var i = 0; i < colors.length; ++i) {
          var currColor = colors[i];
          //colorButtons[currColor].style.border = currColor == color ? '2px solid #789' : '2px solid #fff';
        }
        // Retrieves the current options from the drawing manager and replaces the
        // stroke or fill color as appropriate.
        var polylineOptions = drawingManager.get('polylineOptions');
        polylineOptions.strokeColor = color;
        drawingManager.set('polylineOptions', polylineOptions);
        var rectangleOptions = drawingManager.get('rectangleOptions');
        rectangleOptions.fillColor = color;
        drawingManager.set('rectangleOptions', rectangleOptions);
        var circleOptions = drawingManager.get('circleOptions');
        circleOptions.fillColor = color;
        drawingManager.set('circleOptions', circleOptions);
        var polygonOptions = drawingManager.get('polygonOptions');
        polygonOptions.fillColor = color;
        drawingManager.set('polygonOptions', polygonOptions);
      },
      setSelectedShapeColor: function(color,gmappanel6) {
          var selectedShape = gmappanel6.selectedShape;
        if (selectedShape) {
          if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
            selectedShape.set('strokeColor', color);
          } else {
            selectedShape.set('fillColor', color);
          }
        }
      },
    
    buildColorPalette: function(gmappanel6) {
     var colorPalette = document.getElementById('color-palette');
     for (var i = 0; i < colors.length; ++i) {
       var currColor = colors[i];
       var colorButton = makeColorButton(currColor,gmappanel6);
       colorPalette.appendChild(colorButton);
       colorButtons[currColor] = colorButton;
     }
     this.selectColor(colors[0],gmappanel6);
   }
   
});
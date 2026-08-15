//MIGRADO2024
Ext.define('Common.controller.AreaControlController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'GeocercaMapModel' ],
    views : [ 'AreaControlView' ],
    init : function(config) {
        this.control({
			'areacontrolview #googlemap' : {
				mapready : this.onMapReady
			},
            'areacontrolview #removeGeocerca' : {
                click : this.deleteSelectedShape
            }
        });
	}, // cierro init
    onMapReady: function(gmappanel6) {
        console.log('Inicio el mapa de configuracion GeoCerca');
        
        var controller = this;
        var view = gmappanel6.up('smartpanicconfigview');
        var map = gmappanel6.getMap();
        var record = view.record;
        
        var btn = view.down('#removeGeocerca');
        var viewMapCoords = view.down('#geocercaCoords');
        
        // Creates a drawing manager attached to the map that allows the user to draw
        // markers, lines, and shapes.    
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
        
        gmappanel6.drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          markerOptions: {
            draggable: true
          },
          drawingControlOptions: {
            drawingModes: [
                google.maps.drawing.OverlayType.POLYGON,
                google.maps.drawing.OverlayType.CIRCLE
            ]
          },
          polygonOptions: polyOptions,
          circleOptions: polyOptions,
          map: map
        });
        
        
        var metadata = Ext.JSON.decode(view.metadata.Config);
        console.log(metadata.geocercaCoords);
        
        // Dibujo el poligono si existiese 
        if (metadata.geocercaCoords && metadata.geocercaCoords!='' && metadata.geocercaCoords !='{}'){
            
            // Dibujo la geocerca si esta por Metadata
            
            metadata.geocercaCoords = Ext.JSON.decode(metadata.geocercaCoords);
            
            
            var newShape = new google.maps.Polygon();
            //var pathArray = Ext.JSON.decode(metadata.geocercaCoords);
            var path = new google.maps.MVCArray();
            
            Ext.Array.each(metadata.geocercaCoords,function(item){
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
            
            // Añado posibilidad de editar con un click
            google.maps.event.addListener(newShape, 'click', function() {
                controller.setSelection(newShape,gmappanel6);
            });
        }
        
        
        google.maps.event.addListener(gmappanel6.drawingManager, 'overlaycomplete', function(e) {
            if (e.type != google.maps.drawing.OverlayType.MARKER) {
                // Switch back to non-drawing mode after drawing a shape.
                gmappanel6.drawingManager.setDrawingMode(null);
    
                // Add an event listener that selects the newly-drawn shape when the user
                // mouses down on it.
                var newShape = e.overlay;
                newShape.type = e.type;
                google.maps.event.addListener(newShape, 'click', function() {
                    controller.setSelection(newShape,gmappanel6);
                });
                controller.setSelection(newShape, gmappanel6);
                                
                if (newShape.type == 'polygon'){
                    var path = new Array();
                    newShape.getPath().forEach(function(element){
                        path.push({
                            lat: element.lat(),
                            lng: element.lng()
                        })
                    })
                    metadata.geocercaCoords = Ext.encode(path);
                }
                // DSS-1532: el circulo se persiste como poligono (anillo de 64 puntos), porque esta
                // pantalla guarda solo geocercaCoords (path). El backend lo trata igual que un poligono.
                if (newShape.type == 'circle'){
                    var c = newShape.getCenter();
                    var cLat = c.lat(), cLng = c.lng();
                    var r = (typeof newShape.getRadius === 'function') ? newShape.getRadius() : newShape.radius;
                    var mPerDegLat = 111320;
                    var mPerDegLng = 111320 * Math.cos(cLat * Math.PI / 180);
                    var pathC = new Array();
                    for (var i = 0; i <= 64; i++){
                        var ang = 2 * Math.PI * i / 64;
                        pathC.push({
                            lat: cLat + (r * Math.cos(ang)) / mPerDegLat,
                            lng: cLng + (r * Math.sin(ang)) / (mPerDegLng || 1)
                        });
                    }
                    metadata.geocercaCoords = Ext.encode(pathC);
                }
                viewMapCoords.setValue(metadata.geocercaCoords);
            }
        });
        
        // map is clicked.
        google.maps.event.addListener(map, 'click', function() {
            btn.setDisabled(true);    
            
            if (gmappanel6.selectedShape) {
                gmappanel6.selectedShape.setEditable(false);
                gmappanel6.selectedShape = null;
            }
        });
                
    },
    
    setSelection: function(shape, gmappanel6) {
        var controller = this;
        var view = gmappanel6.up('smartpanicconfigview');
        var btn = view.down('#removeGeocerca');
        btn.setDisabled(false);
        
        controller.clearSelection(gmappanel6);
        gmappanel6.selectedShape = shape;
        shape.setEditable(true);
        
    },
    
    clearSelection: function(gmappanel6) {
        if (gmappanel6.selectedShape) {
            gmappanel6.selectedShape.setEditable(false);
            gmappanel6.selectedShape = null;
        }
    },
    
    deleteSelectedShape: function(btn) {
        var controller = this;
        var view = btn.up('smartpanicconfigview');
        var gmappanel6 = view.down('#googlemap');
        var viewMapCoords = view.down('#geocercaCoords');
        
        if (gmappanel6.selectedShape) {
            gmappanel6.selectedShape.setMap(null);
            viewMapCoords.setValue('{}');
        }
    },
})
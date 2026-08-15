Ext.define('Trackguard.controller.GeocercasProgramadasMapController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'GeocercaSearchModel', 'GeocercaMapModel' ],
    views : [ 'GeocercasProgramadasMapView' ],

    init : function(config) {
        // genero los eventos
    	this.control({
            'geocercasprogramadasmapview' : {
                beforerender : this.initview
			},
            'geocercasprogramadasmapview gmappanel6' : {
    			mapready : this.onMapReady,
                beforerender : this.prepareMap
			}
		});
	}, // cierro init
    
    initview: function(view){
        
        if (view.record){
            view.eventId = view.record.get('Id');
        }

    },
    
    prepareMap: function(gmappanel6){
        view = gmappanel6.up('geocercasprogramadasmapview');
       
        if (view.record){
            view.eventId = view.record.get('routeId');
        }
        
    },
   
    
    onMapReady: function(gmappanel6,googlemap){
        var view= gmappanel6.up('geocercasprogramadasmapview');
        var records = view.records;
        var controller= this;
        //gmappanel6.record = record;
        //this.gmappanel6 = gmappanel6;
        
        
        
        
        var map = gmappanel6.getMap();
        
        if (UiApplicationMetadata.Kml){
            var kml = new google.maps.KmlLayer({
                url: UiApplicationMetadata.Kml
            });     
            kml.setMap(map);
        }
        
        
        
        Ext.Array.each(records, function (record) {
            controller.drawGeocerca(record,gmappanel6, map, controller)
        })
        
        
        
        
        
        
        
        
    },
    
    
    drawGeocerca : function (record, gmappanel6, map, me) {
    
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

    
    
    },
  
    getMarkerIcon: function(pos, view){
        
        
        var iconUrl = '/resources/softguard/images/trackguard-0.png';
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(16,35)
        );
        
        return image;
    },
    
    
    
  
    /*
    getVehicleInfoWindowHtml: function(vehicle, pos){
        var html = '\
            <div style="width:200px;height:100px;">\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            <span style="font-weight:bold;">Dirección:</span><span> {direccion}</span><br/>\
            <span style="font-weight:bold;">Fecha:</span><span>  {fecha}</span><br/>\
            <span style="font-weight:bold;">Evento:</span><span>  {evento}</span><br/>\
            </div>';
            //<span style="font-weight:bold;">Fecha SIS:</span><span>  {fecha}</span><br/>';
        
        html = html.replace(/\{dealer\}/, vehicle.get('cue_clinea'));
        html = html.replace(/\{ncuenta\}/, vehicle.get('cue_ncuenta'));
        html = html.replace(/\{nombre\}/, vehicle.get('Domain'));
        html = html.replace(/\{cuenta\}/, vehicle.get('cue_cnombre'));
        html = html.replace(/\{velocidad\}/, pos.gps.get('gps_iVelocidad'));
        html = html.replace(/\{direccion\}/, pos.address);
        html = html.replace(/\{evento\}/, pos.gps.get('cod_cdescripcion'));
        html = html.replace(/\{fechaRaw\}/, pos.gps.get('gps_tRawfechahora'));
        html = html.replace(/\{fecha\}/, Ext.Date.format(pos.gps.get('gps_isofechahora'), 'd-m-Y H:i:s'));
        return html
    },
    */
	prepareMap : function(googlemap) {
        /*Ext.apply(googlemap, {
			setCenter : {
				lat : mylat,
				lng : mylong
			}
		});*/
	},

    
    getBounds: function(markers) {
        var bounds = new google.maps.LatLngBounds();
        Ext.each(markers, function (marker,index,array) {
                bounds.extend(marker.position);
        });
        return bounds
    },
    
    
    
    
    showRoute: function(routeId, view){
        var points = new Array();
        var markers = new Array();
        var controller = this;
        
        var sorters = [
                {
                    property : 'time',
                    direction: 'ASC'
                }
            ];

        var store =Ext.create('Ext.data.Store',{
            model: controller.getGeocercaSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: 'routeId',
                value: routeId
            }],
            sorters: sorters
        })
        
        //busco los puntos de la ruta
        store.load({callback: function(records){
            Ext.Array.each(records,function(record, index, total){
            
                points.push({lat: record.get('chp_rLatitud'), lng: record.get('chp_rLongitud'),fecha: record.get('gps_isofechahora')});
                markers.push({
                        marker: null,
                        lat : record.get('chp_rLatitud'),
                        lng : record.get('chp_rLongitud'),
                        record: record,
                        title : record.get('zon_cdescripcion'),
                        icon: controller.getRouteMarkerIcon(),
                        /*infoWindow: {
                            content: controller.getRouteInfoWindowHtml(record, view), 
                            listener:'click'
                        },*/
                        draggable : false
                    }
                );
                
            })
            
            // muestro los puntos
            view.down('gmappanel6').addMarkers(markers);
            
            // dibujo la ruta
            view.down('gmappanel6').addPolyline(points);
            
            var bounds = controller.getBounds(view.down('gmappanel6').cache.marker);
            view.down('gmappanel6').getMap().fitBounds(bounds);
            
        }})

        
        
        return {points:points, markers:markers}
    },
    
    getRouteMarkerIcon: function(){
                
        var iconUrl = '/resources/softguard/images/trackguard-0.png';
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(16,35)
        );
        
        return image;
    },
    
   
    
});
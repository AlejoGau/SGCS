//MIGRADO2024
Ext.define('Common.controller.VehicleGpsController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'VehicleGpsModel', 'GeocercaMapModel', 'GeocercaSearchModel' ],
	views : [ 'VehicleGpsView' ],
	init : function(config) {
		this.control({
			'vehiclegpsview gmappanel6' : {
				mapready : this.onMapReady,
                //beforerender : this.prepareMap
			}
        });
	}, // cierro init
    onMapReady: function(gmappanel6,googlemap){
        var view= gmappanel6.up('vehiclegpsview');
        console.log("VIEW________",view)
        var record = view.record;
        this.gmappanel6 = gmappanel6;
       console.log(gmappanel6)
        
       
                
        var map = gmappanel6.getMap();
        if (UiApplicationMetadata.Kml){
            var kml = new google.maps.KmlLayer({
                url: UiApplicationMetadata.Kml
            });     
            kml.setMap(map);
        }
        
        if (UiApplicationMetadata.MapType){
            map.setMapTypeId(UiApplicationMetadata.MapType);
        }
        
        gmappanel6.ultimasPosiciones = Ext.create('Ext.data.Store',{
            pageSize: 500,
            filters: [{
                property: 'gps_idCuenta',
                id: 'cuentaFilter',
                value: record.get('cue_iid')
            }
            ],
            model: this.getVehicleGpsModelModel()
        });
        console.log(gmappanel6)
        //gmappanel6.getMap().setOptions({mapMaker: true });
        this.showMarkerArray(gmappanel6, this);
        this.mostrarGeocercas(gmappanel6.getMap(), record);
        
        
    },
    
    getVehiclePosition: function(vehicle, gmappanel6){
        /*
        var seconds = +Ext.Date.format(new Date(),'s');
        var mylat = -34.6068 - ((seconds+vehicle.get('Id'))/1000);
        var mylong = -58.4126 - ((seconds+vehicle.get('Id'))/1000);
        */
        var store = gmappanel6.ultimasPosiciones;
        var record = store.getAt(store.find('gps_idCuenta', vehicle.get('OwnerId'),0,false,false,true));
        if (record){
            vehicle.gpsRecord = record;
            vehicle.currentPositioRecord = record;
            var mylat = record.get('gps_rLatitud').replace(/,/g,'.');
            var mylong = record.get('gps_rLongitud').replace(/,/g,'.');
            var point = new google.maps.LatLng(mylat,mylong);
        }else return {lat:'',long:'',position: null}
        
    },
    
    getMarkerIcon: function(vehicle){
        var selected = '';
        if (vehicle.get('selected')){selected='_active'};
        var tipo = vehicle.get('tip_nTipo')?vehicle.get('tip_nTipo'):"0";
        var iconUrl = '/resources/softguard/images/trackguard-'+tipo+selected+'.png';
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(24,48)
        );
        
        return image;
    },
    
    
    showVehicle: function(vehicle,index,array){
        var gmappanel6 = this.gmappanel6;
        var controller = this.controller;
        var view = gmappanel6.up('vehiclegpsview');
        
        var center = view.down('button[action=center]').pressed;
        var clear = false;
        var marker = {};
        var pos = controller.getVehiclePosition(vehicle, gmappanel6);
        var geocoder = gmappanel6.getGeocoder();
        //var listeners = {};
        var listeners = {
            click: function(){
                view.fireEvent('vehicleSelected',this.record);
            }
        };
        var vehiclePos= vehicle.pos;
        console.log('vehicle: '+Ext.encode(vehicle));
        if (pos.position && !vehicle.lastPosition || 
                (vehicle.currentPositioRecord 
                && vehicle.currentPositioRecord.get('gps_rLatitud') != vehicle.lastPosition.get('gps_rLatitud') 
                && vehicle.currentPositioRecord.get('gps_rLongitud') != vehicle.lastPosition.get('gps_rLongitud')
                && vehicle.currentPositioRecord.get('gps_isorawfechahora')>vehicle.lastPosition.get('gps_isorawfechahora')
                )){
            geocoder.geocode({
            location: pos.position
    		}, function(result, status){
                if (status == 'OK' && result.length > 0){
                    pos.address = result[0].formatted_address
                }
                vehicle.pos = pos;
                var infoHtml = controller.getVehicleInfoWindowHtml(vehicle,pos);
                if (typeof vehicle.markerIndex !== "undefined" && gmappanel6.cache.marker[vehicle.markerIndex]){
                    // muevo el marker de lugar
                    gmappanel6.cache.marker[vehicle.markerIndex].setPosition(pos.position);
                    // lo muestro por si estaba oculto
                    gmappanel6.cache.marker[vehicle.markerIndex].setMap(gmappanel6.getMap());
                    // cambio el icono por si se selecciono o no
                    gmappanel6.cache.marker[vehicle.markerIndex].setIcon(controller.getMarkerIcon(vehicle));
                    // cambio el contenido del marker
                    gmappanel6.cache.infowindow[vehicle.markerIndex].setContent(infoHtml);
                    
                } else {
                    marker = {
                        lat : pos.lat,
                        lng : pos.long,
                        record: vehicle,
                		title : vehicle.get('Name'),
                        icon: controller.getMarkerIcon(vehicle),
                        infoWindow: {
                            content: infoHtml, 
                            listener:'mouseover',
                            disableAutoPan: true
                        },
            			draggable : false
            		};
                    gmappanel6.marker = gmappanel6.addMarker(pos.position, marker, clear,center,listeners); 
                    vehicle.markerIndex = gmappanel6.cache.marker.length-1;
                }
                
                vehicle.lastPosition = vehicle.currentPositioRecord;
                
                geocoder.geocode({
                location: pos.position
        		}, function(result, status){
                    if (status == 'OK' && result.length > 0){
                        pos.address = result[0].formatted_address;
                        vehicle.address = pos.address;
                    }
                    else{
                        pos.address = '';
                        vehicle.address = '';
                    }
                    var infoHtml = controller.getVehicleInfoWindowHtml(vehicle,pos);
                    if (typeof vehicle.markerIndex !== "undefined"){
                        // cambio el contenido del marker
                        gmappanel6.cache.infowindow[vehicle.markerIndex].setContent(infoHtml);
                        
                    }
                });
            });
            
        }
        
    },
    
    showMarkerArray: function(gmappanel6,controller){
        var vehicles = [gmappanel6.record];
        var markers = gmappanel6.markerList;
        
        var view = gmappanel6.up('vehiclegpsview');
        // si se cerro la ventana freno la tarea
        if (!view){
            Ext.TaskManager.stop({
                args: [gmappanel6,controller],
                run: this.showMarkerArray,
                interval: 3000
            });
            return false;
        }
        
        var dataPanel = Ext.getCmp('datapanel');
        
        if (!vehicles || vehicles.length == 0){
            dataPanel.hide();
            //view.doLayout();
            
        } else {
            gmappanel6.ultimasPosiciones.load({callback: function(records, operation, success){
                Ext.Array.each(vehicles,controller.showVehicle,{gmappanel6: gmappanel6, controller: controller});
                Ext.Array.each(markers,controller.showMarker,{gmappanel6: gmappanel6, controller: controller});
                /*
                var active = Ext.Array.filter(gmappanel6.cache.marker,function(item){
                    return item.getMap()
                });
                */
                var center = view.down('button[action=center]').pressed;
                
                if (center){
                    var bounds = controller.getBounds(gmappanel6.cache.marker);
                    gmappanel6.getMap().setCenter(bounds.getCenter());
                }
            }})
            if (dataPanel.isHidden()){
                dataPanel.show();
                //view.doLayout();
            }
        
        }
        
    },
    
    showMarker: function(marker,index,array){
        var gmappanel6 = this.gmappanel6;
        var controller = this.controller;
        var view = gmappanel6.up('vehiclegpsview');
        var clear = false;
        
        var lat = marker.get('Latitude');
        var long = marker.get('Longitude');
        var point = new google.maps.LatLng(lat,long);
        var pos = {lat: lat, long: long, position: point};
        
        var listeners = {};
        
        var infoHtml = controller.getMarkerInfoWindowHtml(marker,pos);
        console.log("infoHtml",infoHtml)
        if (typeof marker.markerIndex !== "undefined"){
            gmappanel6.cache.marker[marker.markerIndex].setPosition(pos.position);
            gmappanel6.cache.marker[marker.markerIndex].setMap(gmappanel6.getMap());
            gmappanel6.cache.infowindow[marker.markerIndex].setContent(infoHtml);
            
        } else {
            newmarker = {
                lat : pos.lat,
                lng : pos.long,
                record: marker,
            	title : marker.get('Name'),
                infoWindow: {
                    content: infoHtml, 
                    listener:'mouseover',
                    disableAutoPan: true
                },
    			draggable : false
    		};
            gmappanel6.marker = gmappanel6.addMarker(pos.position, newmarker, clear,center,listeners); 
            marker.markerIndex = gmappanel6.cache.marker.length-1;
        }
    },
    
    getVehicleInfoWindowHtml: function(vehicle, pos){
        var html = '\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            <span style="font-weight:bold;">{lblVelocidad}:</span><span> {velocidad} km/h</span><br/>\
            <span style="font-weight:bold;">{lblDireccion}:</span><span> {direccion}</span><br/>\
            <span style="font-weight:bold;">{lblFechaRecepcion}:</span><span>  {fecha}</span><br/>\
            <span style="font-weight:bold;">{lblFechaGPS}:</span><span>  {fechaRaw}</span><br/>\
            <span style="font-weight:bold;">{lblFechaAlerta}:</span><span>  {fechaAlerta}</span><br/>\
            <span style="font-weight:bold;">{lblUltAlerta}:</span><span>  {alerta}</span><br/>\
            <span style="font-weight:bold;">{lblLatitud}:</span><span>  {latitud}</span><br/>\
            <span style="font-weight:bold;">{lblLongitud}:</span><span>  {longitud}</span><br/>';
        
        // traducciones
        
        html = html.replace(/\{lblVelocidad\}/, getLocale('Velocidad'));
        html = html.replace(/\{lblDireccion\}/, getLocale('Dirección'));
        html = html.replace(/\{lblFechaRecepcion\}/, getLocale('Fecha recepción'));
        html = html.replace(/\{lblFechaGPS\}/, getLocale('Fecha Gps'));
        html = html.replace(/\{lblFechaAlerta\}/, getLocale('Fecha Alerta'));
        html = html.replace(/\{lblUltAlerta\}/, getLocale('Ult. Alerta'));
        html = html.replace(/\{lblLatitud\}/, getLocale('Latitud'));
        html = html.replace(/\{lblLongitud\}/, getLocale('Longitud'));
        
        
        //sta_dFechaUltimaAlerta
        html = html.replace(/\{dealer\}/, vehicle.get('cue_clinea'));
        html = html.replace(/\{ncuenta\}/, vehicle.get('cue_ncuenta'));
        html = html.replace(/\{nombre\}/, vehicle.get('Domain'));
        html = html.replace(/\{cuenta\}/, vehicle.get('cue_cnombre'));
        html = html.replace(/\{velocidad\}/, pos.gps.get('gps_iVelocidad'));
        html = html.replace(/\{direccion\}/, vehicle.address);
        html = html.replace(/\{fechaRaw\}/, Ext.Date.format(pos.gps.get('gps_isorawfechahora'), 'd-m-Y H:i:s'));
        html = html.replace(/\{fecha\}/, Ext.Date.format(pos.gps.get('gps_isofechahora'), 'd-m-Y H:i:s'));
        html = html.replace(/\{fechaAlerta\}/, Ext.Date.format(pos.gps.get('sta_dFechaUltimaAlerta'), 'd-m-Y H:i:s'));
        html = html.replace(/\{alerta\}/, pos.gps.get('sta_cUltimaAlerta')+'-'+pos.gps.get('cod_cdescripcion'));
        html = html.replace(/\{latitud\}/, pos.gps.get('gps_rLatitud'));
        html = html.replace(/\{longitud\}/, pos.gps.get('gps_rLongitud'));
        return html
    },
    
    getMarkerInfoWindowHtml: function(marker, pos){
        var html = '\
            <H1>{nombre}</H1>\
            <H2>{direccion}</H2>';
        html = html.replace(/\{nombre\}/, marker.get('Name'));
        html = html.replace(/\{direccion\}/, marker.get('FullAddress'));
        return html
    },
    
    
    getBounds: function(markers) {
        var bounds = new google.maps.LatLngBounds();
        Ext.each(markers, function (marker,index,array) {
            if (marker.getMap()){
                bounds.extend(marker.position);
            }
        });
        return bounds
    },
    
    mostrarGeocercas: function(map,record){
        var me = this;
        var store =Ext.create('Ext.data.Store',{
            model: 'Common.model.GeocercaSearchModel',
            remoteFilter: true,
            filters: [
                {
                    property: 'Cuenta',
                    value   : record.get('OwnerId')
                }
            ]
        });
        store.load({callback: function(records, operation, success){
            Ext.Array.each(records,me.mostrarGeocerca,{gmappanel6: map, controller: me});
        }});
        
    },
    
    mostrarGeocerca: function(record,index, array){
        var controller = this.controller;
        var me = this.controller;
        var map = this.gmappanel6;
        var gmappanel6 = this.gmappanel6;
        var metadata = Ext.create(me.getGeocercaMapModelModel());
        var tipo = record.get('GeoType');
        var color = '';
        
        if (tipo == 'E') {
            color = 'Red';
        } else {
            color = 'Green';
        }
        
        metadata.data = Ext.decode(record.get('MetaData'));
        
        if (metadata.get('Type') == 'circle'){
            var newShape = new google.maps.Circle({
                strokeColor: color,
                fillColor: color
            });
            
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
            var newShape = new google.maps.Polygon({
                strokeColor: color,
                fillColor: color
            });
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
            //map.fitBounds(bounds);
        }
    }
});
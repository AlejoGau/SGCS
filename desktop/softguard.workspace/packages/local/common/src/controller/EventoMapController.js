//MIGRADO2024
Ext.define('Common.controller.EventoMapController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'VehicleGpsModel', 'GpsHistoricoSearchModel' ],
    views : [ 'EventoMapView' ],
    init : function(config) {
		this.control({
			'eventomapview gmappanel6' : {
				mapready : this.onMapReady,
               // beforerender : this.prepareMap
			},
            'eventomapview #btnAddress' : {
                click : this.onAddressClick
            },
            'eventomapview' : {
                activate: this.onActivate
            },
            'eventomapview button[action=center]': {
                click: this.onCenterClick
            }
        });
	}, // cierro init
   
   
   
   
   onCenterClick: function (btn) {
        var view = btn.up('eventomapview');
        
        if(!btn._pressed) {
            btn.setText(getLocale('Cambiar a Manual'));            
            btn._pressed = true;
        } else {
            btn.setText(getLocale('Cambiar a Centrar'));
            btn._pressed = false
        }
    },
   
                
    onMapReady: function(gmappanel6){
        var view = gmappanel6.up('eventomapview');
        var record = view.record;
        
        gmappanel6.vehicleList = [record];
        
        gmappanel6.ultimasPosiciones = Ext.create('Ext.data.Store',{
            pageSize: 500,
            model: this.getVehicleGpsModelModel()
        });
        
        this.loadData(gmappanel6,this);
        
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
        
        
        var trefresco = 10000
        
        var runner = new Ext.util.TaskRunner();
        view.player = runner.newTask({
            args: [gmappanel6,this],
            run: this.loadData,
            interval: trefresco
        });
        view.player.start();
        
        view.velocidad = trefresco;
        
        
        
        Ext.Ajax.request({
              url: '/rest/tablas/parametros/',
              params: { par_ccodigo: 'tiempogps'},
              method: 'GET',
              scope: this,
              success: function(response){
                gmappanel6.tiempogps = Ext.JSON.decode(response.responseText)[0].par_ivalor;
              }
        });
        
        Ext.Ajax.request({
              url: '/rest/tablas/parametros/',
              params: { par_ccodigo: 'tg_tiempovidaalarma'},
              method: 'GET',
              scope: this,
              success: function(response){
                gmappanel6.tg_tiempovidaalarma = Ext.JSON.decode(response.responseText)[0].par_ivalor;
              }
        });
        var evento = record.get('rec_iid')
        if (evento){
            // llamo a mostrar el historial.
            var cuenta = view.record;
            this.showHistory(gmappanel6,record,evento);
        }
        
       
    },
    
    onActivate: function(view){
        var gmappanel6 = view.down('gmappanel6');
        var gmapsize = gmappanel6.getSize();
        gmappanel6.setSize(gmapsize.width,gmapsize.height);  
    },
    
    onAddressClick: function(button){
        var form = button.up('form');
        var gmappanel6 = Ext.getCmp('gmappanel6');
        var address = form.down('#address').getValue();
        var infoHtml = '';
        
        newmarker = {
            infoWindow: {
                content: infoHtml, 
                listener:'mouseover',
                disableAutoPan: true
            },
            geoCodeAddr: address,
			draggable : false
		};
        gmappanel6.addMarkers([newmarker]); 
    },
    
    
    getVehiclePosition: function(vehicle, gmappanel6){
        var store = gmappanel6.ultimasPosiciones;
        if (store){
            var record = store.getAt(store.find('gps_idCuenta', vehicle.get('cue_iid'),0,false,false,true));
            if (record){
                
                var mylat = record.get('gps_rLatitud').replace(/,/g,'.');
                var mylong = record.get('gps_rLongitud').replace(/,/g,'.');
                var point = new google.maps.LatLng(mylat,mylong);
                
                return {lat: mylat, long: mylong, position: point, gps: record};
            }else{
                
                return {lat:'',long:'',position: null}
            } 
        }
    },
    
    getMarkerIcon: function(vehicle, gmappanel6){
        var color = '';
        var store = gmappanel6.ultimasPosiciones;
        var record = store.getAt(store.find('gps_idCuenta', vehicle.get('cue_iid'),0,false,false,true));
        var now = new Date();
        var ageAlarma = (now -record.get('sta_dFechaUltimaAlerta'))/60000;
        var ageGps = (now -record.get('gps_isofechahora'))/60000;
        
        
        if (vehicle.selected){
            if(ageAlarma<gmappanel6.tg_tiempovidaalarma){
                color='_red';
            }
            else{
                color='_active'
            }
        }else if(ageAlarma<gmappanel6.tg_tiempovidaalarma){
            color='_alert'
        };
        
        if (ageGps>gmappanel6.tiempogps){
            iconUrl = '/resources/softguard/images/exclamacion'+color+'.png';
        }else {
            if (record.get('gps_iVelocidad') == 0){
                iconUrl = '/resources/softguard/images/stop'+color+'.png';
            }else{
                iconUrl = '/resources/softguard/images/direction_'+record.get('gps_Rumbo')+color+'.png';
            }
        }
        
        
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(16,35)
        );
        
        return image;
    },
    
    loadData: function(gmappanel6,controller){
        var vehicles = gmappanel6.vehicleList;
        
        var view = gmappanel6.up('eventomapview');
        
        if (vehicles && vehicles.length > 0){
            var cuentas = [];
            
            if (view.vehicleSelected){
                cuentas.push(view.vehicleSelected.get('cue_iid'));
            } else {
                Ext.Array.each(vehicles,function(item){
                    cuentas.push(item.get('cue_iid'))
                });
            }
            
            
            if (gmappanel6.ultimasPosiciones){
                gmappanel6.ultimasPosiciones.remoteFilter = false;
                gmappanel6.ultimasPosiciones.filter({
                    property: 'gps_idCuenta',
                    id: 'cuentaFilter',
                    value: cuentas.join()
                });
                gmappanel6.ultimasPosiciones.remoteFilter = true;
                gmappanel6.ultimasPosiciones.load({callback: function(records, operation, success){
                    controller.showMarkerArray(gmappanel6,controller);
                }})
            }
            
        } else {
            controller.showMarkerArray(gmappanel6,controller);
        }
        
    },
    
    showMarkerArray: function(gmappanel6,controller){
        var vehicles = gmappanel6.vehicleList;
        var markers = gmappanel6.markerList;
        var view = gmappanel6.up('eventomapview');
        
        Ext.Array.each(vehicles,controller.showVehicle,{gmappanel6: gmappanel6, controller: controller});
        Ext.Array.each(markers,controller.showMarker,{gmappanel6: gmappanel6, controller: controller});
        
        var center = view.down('button[action=center]')._pressed;
        
        var active = Ext.Array.filter(gmappanel6.cache.marker,function(item){
            return item.getMap()
        });
        
        if (center && active.length > 0){
            var bounds = controller.getBounds(active);
            gmappanel6.getMap().fitBounds(bounds);
            
            if (view.vehicleSelected && view.vehicleSelected.position){
                gmappanel6.getMap().setCenter(view.vehicleSelected.position);
                gmappanel6.getMap().setZoom(14);
            }else{
                gmappanel6.getMap().setZoom(gmappanel6.getMap().getZoom()-2);
            }
        }
        
        
    },
    
    
    showMarker: function(marker,index,array){
        var gmappanel6 = this.gmappanel6;
        var controller = this.controller;
        var view = gmappanel6.up('eventomapview');
        var clear = false;
        
        var lat = marker.get('Latitude');
        var long = marker.get('Longitude');
        var point = new google.maps.LatLng(lat,long);
        var pos = {lat: lat, long: long, position: point};
        
        var listeners = {};
        var icon = marker.get('Icon');
        var iconUrl = '';
        
        if (icon){
            iconUrl = '/resources/softguard/images/poi/'+icon;
        }
        
        var infoHtml = controller.getMarkerInfoWindowHtml(marker,pos);
        if (typeof marker.markerIndex !== "undefined"){
            gmappanel6.cache.marker[marker.markerIndex].setPosition(pos.position);
            gmappanel6.cache.marker[marker.markerIndex].setMap(gmappanel6.getMap());
            gmappanel6.cache.infowindow[marker.markerIndex].setContent(infoHtml);
            
        } else {
            newmarker = {
                lat : pos.lat,
                lng : pos.long,
                record: marker,
                icon: iconUrl,
                labelContent: marker.get('Name'),
                labelAnchor: new google.maps.Point(40, 0),
                labelClass: "gmaplabel2", // the CSS class for the label
                labelStyle: {opacity: 1/*0.75*/},
        		title : marker.get('Name'),
                infoWindow: {
                    content: infoHtml, 
                    listener:'mouseover',
                    disableAutoPan: true
                },
    			draggable : false
    		};
            gmappanel6.addMarker(pos.position, newmarker, clear,center,listeners); 
            marker.markerIndex = gmappanel6.cache.marker.length-1;
        }
    },
    
    showVehicle: function(vehicle,index,array){
        var gmappanel6 = this.gmappanel6;
        var controller = this.controller;
        var view = gmappanel6.up('eventomapview');
        
        var center = false;
        var clear = false;
        var marker = {};
        var pos = controller.getVehiclePosition(vehicle, gmappanel6);
        
        
        if (pos && pos.position){
            var geocoder = gmappanel6.getGeocoder();
        
            var listeners = {
                mouseout: function(){
                    gmappanel6.cache.infowindow[this.record.markerIndex].close();
                }
            };
            
            var infoHtml = controller.getVehicleInfoWindowHtml(vehicle,pos);
            if (typeof vehicle.markerIndex !== "undefined"){
                // verifico que el paquete no sea viejo
                if(vehicle.pos.gps.get('gps_isorawfechahora')<pos.gps.get('gps_isorawfechahora')){
                    // muevo el marker de lugar
                    gmappanel6.cache.marker[vehicle.markerIndex].setPosition(pos.position);
                    // cambio el contenido del marker
                    gmappanel6.cache.infowindow[vehicle.markerIndex].setContent(infoHtml);
                }else{
                    //el paquete esta desordenado
                }
                
                // lo muestro por si estaba oculto
                gmappanel6.cache.marker[vehicle.markerIndex].setMap(gmappanel6.getMap());
                
                // cambio el icono por si se selecciono o no
                gmappanel6.cache.marker[vehicle.markerIndex].setIcon(controller.getMarkerIcon(vehicle,gmappanel6));
                
                vehicle.position = pos.position;
                vehicle.pos = pos;
                
                
            } else {
                vehicle.position = pos.position;
                vehicle.pos = pos;
                marker = {
                    lat : pos.lat,
                    lng : pos.long,
                    record: vehicle,
                    labelContent: vehicle.get('cue_clinea')+'-'+vehicle.get('cue_ncuenta'),
                    labelAnchor: new google.maps.Point(40, 0),
                    labelClass: "gmaplabel", // the CSS class for the label
                    labelStyle: {opacity: 1/*0.75*/},
                	title : vehicle.get('Name'),
                    icon: controller.getMarkerIcon(vehicle,gmappanel6),
                    infoWindow: {
                        content: infoHtml, 
                        listener:'mouseover',
                        disableAutoPan: true
                    },
        			draggable : false
        		};
                //console.log(vehicle.get('cue_clinea')+'-'+vehicle.get('cue_ncuenta'))
                gmappanel6.addMarker(pos.position, marker, clear,center,listeners);
                vehicle.markerIndex = gmappanel6.cache.marker.length-1;
            }
                
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
            
        }
        
    },
    getVehicleInfoWindowHtml: function(vehicle, pos){
        var html = '\
            <span style="font-weight:bold;">{dealer}-{ncuenta} {cuenta}</span>\
            <span style="font-weight:bold;">Velocidad:</span><span> {velocidad} km/h</span><br/>\
            <span style="font-weight:bold;">Dirección:</span><span> {direccion}</span><br/>\
            <span style="font-weight:bold;">Fecha recepción:</span><span>  {fecha}</span><br/>\
            <span style="font-weight:bold;">Fecha GPS:</span><span>  {fechaRaw}</span><br/>\
            <span style="font-weight:bold;">Fecha Alerta:</span><span>  {fechaAlerta}</span><br/>\
            <span style="font-weight:bold;">Ult. Alerta:</span><span>  {alerta}</span><br/>';
        
        
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
            bounds.extend(marker.position);
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
                    value   : record.get('cue_iid')
                }
            ]
        });
        store.load({callback: function(records, operation, success){
            map.geocercas = records;
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
        
        metadata.data = Ext.JSON.decode(record.get('MetaData'));
        
        if (tipo == 'E') {
            color = 'Red';
        } else {
            color = 'Green';
        }
         
        
        if (metadata.get('Type') == 'circle'){
            var center = new google.maps.LatLng(
                metadata.get('CenterLat'),
                metadata.get('CenterLng')
            );
            var newShape = new google.maps.Circle({
                strokeColor: color,
                fillColor: color
            });
            newShape.setCenter(center);
            newShape.setRadius(metadata.get('Radius'));
            newShape.setMap(map);
            //gmappanel6.geocerca = newShape;
            var bounds = newShape.getBounds();
        }
        
        if (metadata.get('Type') == 'polygon'){
            var pathArray = Ext.JSON.decode(metadata.get('Path'));
            var path = new google.maps.MVCArray();
            
            Ext.Array.each(pathArray,function(item){
                var latlng = new google.maps.LatLng(
                    item.lat,
                    item.lng
                )
                path.push(latlng);
            });
            
            var newShape = new google.maps.Polygon({
                strokeColor: color,
                fillColor: color
            });
            newShape.setPath(path);
            newShape.setMap(map);
            //gmappanel6.geocerca = newShape;
            var bounds = newShape.getBounds();
        }
        
        record.shape = newShape;
    },
    
    showHistory: function(map, vehicle, event){
        var controller = this;
        var store = Ext.create('Ext.data.Store',{
            model: this.getGpsHistoricoSearchModelModel(),
            remoteFilter: true,
            filters: [
                {
                    property:'rec_iidcuenta',
                    value: vehicle.get('cue_iid')
                },{
                    property:'rec_iid:GT',
                    value: event-10
                }
            ],
            pageSize: 1000
        });
        
        store.load({callback: function(records){
            var temp = controller.getHistoryMarkers(store, vehicle);
            var points = temp.points;
            var markers = temp.markers;
            
            //var fechaDesde = Ext.Date.format(points[0].fecha, 'Y-m-d H:i:s');
            //var fechaHasta = Ext.Date.format(points[points.length -1].fecha, 'Y-m-d H:i:s');
            
            //var bounds = controller.getBounds(points);
            //var center = bounds.getCenter();
            
            map.addPolyline(points);
            map.addMarkers(markers);
            //map.getMap().fitBounds(bounds);
        }});
    },
    
    getHistoryMarkers: function(store, vehicle){
        var points = new Array();
        var markers = new Array();
        var controller = this;
        
        store.each(function(record, index, total){
            points.push({lat: record.get('gps_rLatitud'), lng: record.get('gps_rLongitud'),fecha: record.get('gps_isofechahora')});
            markers.push({
                    marker: null,
                    lat : record.get('gps_rLatitud'),
                    lng : record.get('gps_rLongitud'),
                    record: record,
                    title : Ext.Date.format(record.get('gps_isofechahora'),'Y-m-d H:i:s'),
                    icon: controller.getHistoryMarkerIcon(index, total),
                    infoWindow: {
                        content: controller.getHistoryInfoWindowHtml(vehicle,record), 
                        listener:'click'
                    },
                    draggable : false
                }
            );
        });
        
        return {points:points, markers:markers}
    },
    
    getHistoryMarkerIcon: function(i,total,old){
        var selected = '';
        var iconUrl = '';
        
        switch (i)
        {
            case 0:
                iconUrl = '/resources/softguard/images/start.png';
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size(48,48),
                    new google.maps.Point(0,0),
                    new google.maps.Point(16,35)
                );
                break;
            /*case total-1:
                iconUrl = '/resources/softguard/images/finish.png';
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size(48,48),
                    new google.maps.Point(0,0),
                    new google.maps.Point(16,35)
                );
                break;*/
            default:
                iconUrl = old?'/resources/softguard/images/icon_dot_verde.gif':'/resources/softguard/images/icon_dot-nonew.gif';
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size(10,10),
                    new google.maps.Point(0,0),
                    new google.maps.Point(5,5)
                );
                break;
            
        }
        
        
        return image;
    },
    
    getHistoryInfoWindowHtml: function(vehicle, gps){
        var html = '\
            <span style="font-weight:bold;">{dealer}-{ncuenta} {cuenta}</span>\
            <span style="font-weight:bold;">Velocidad:</span><span> {velocidad}km/h</span><br/>\
            <span style="font-weight:bold;">Fecha:</span><span>  {fecha}</span><br/>\
            <span style="font-weight:bold;">Dirección:</span><span>  {direccion}</span><br/>\
            <span style="font-weight:bold;">Evento:</span><span>  {evento}</span><br/>';
        
        html = html.replace(/\{dealer\}/, vehicle.get('cue_clinea'));
        html = html.replace(/\{ncuenta\}/, vehicle.get('cue_ncuenta'));
        html = html.replace(/\{nombre\}/, vehicle.get('Domain'));
        html = html.replace(/\{cuenta\}/, vehicle.get('cue_cnombre'));
        html = html.replace(/\{velocidad\}/, gps.get('gps_iVelocidad'));
        html = html.replace(/\{direccion\}/, gps.get('gps_cDireccion'));
        html = html.replace(/\{fecha\}/, Ext.Date.format(gps.get('gps_isofechahora'), 'Y-m-d H:i:s'));
        html = html.replace(/\{evento\}/, gps.get('cod_cdescripcion'));
        return html
    }
    
});
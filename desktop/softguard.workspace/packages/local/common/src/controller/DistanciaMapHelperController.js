//MIGRADO2024
Ext.define('Common.controller.DistanciaMapHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'VehicleSearchModel' ],
    views : [ 'DistanciaMapHelperView' ],
    init : function(config) {
		this.control({
			'distanciamaphelperview gmappanel6' : {
				mapready : this.onMapReady,
           
                manualcenter : this.onManualCenter
			},
            'distanciamaphelperview #datapanel' : {
                afterrender : this.initDatapanel
            },
            'distanciamaphelperview button[action=center]': {
                click: this.onCenterClick
            },
            'distanciamaphelperview #medir': {
                click: this.onBuscarDireccionrClick
            }
            
            
        });
	},
    
    
    onBuscarDireccionrClick: function (btn) {
        
        var view = btn.up('distanciamaphelperview')
        var gmappanel6 = view.down('gmappanel6')
        var direccionDestino = view.down('#direcciondestino').getValue()
        
        if(!view.addressOrigen) {
            view.addressOrigen = view.down('#direccionorigen').getValue();
        }
       
        
                
                var directionsService = gmappanel6.directionsService;
                var directionsDisplay = gmappanel6.directionsDisplay;
        
                
                if (!directionsDisplay){
                    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
                    gmappanel6.directionsDisplay = directionsDisplay;
                } 
                
                directionsDisplay.setMap(gmappanel6.getMap());
                
                if (!directionsService){
                    directionsService = new google.maps.DirectionsService();
                    gmappanel6.directionsService = directionsService;
                }
                
                var request = {
                    origin:view.addressOrigen,
                    destination:direccionDestino,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                
                directionsService.route(request, function(result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        gmappanel6.route = result;
                        directionsDisplay.setDirections(result);
                        console.log(result)
                        
                        
                        var infowindow2 = new google.maps.InfoWindow();
                          infowindow2.setContent("<h1>"+result.routes[0].legs[0].end_address+'</h1><strong style="font-weight:bold">'+getLocale('Distancia')+"</strong>: "+result.routes[0].legs[0].distance.text + '<br> <strong style="font-weight:bold">'+getLocale('Tiempo')+"</strong>: "+result.routes[0].legs[0].duration.text);
                          infowindow2.setPosition(result.routes[0].legs[0].steps[result.routes[0].legs[0].steps.length-1].end_location);
                          infowindow2.open(gmappanel6.getMap());
                          
                          var ihtml ='<ul>';
                            Ext.Array.each(result.routes[0].legs[0].steps,function(step){
                                //console.log(step.instructions);
                                ihtml+= '<li>'+step.instructions+'</li>';
                            })
                            ihtml += '</ul>';
                          view.down('#ruta').setValue(ihtml)
                          view.down('#panelruta').show()
                       // callback.call(scope, result)
                    }
                });
                
        
    },
   
    
   
    
   
    
    
    
    initPanel: function(view) {
        var controller = this;
        view.controller = this;
        
        var record = view.record;
        
        var title = record.get('cue_clinea')+"-"+record.get('cue_ncuenta')+" "+record.get('cue_cnombre')+" - "+record.get('Domain');
        //view.up('vehicleslavegpsview').down('#displayname').setText(title);
      
        
    },
    
    
    onMapReady: function(gmappanel6,googlemap){
        var controller = this;
     
        var view = gmappanel6.up('distanciamaphelperview');
        
        controller.initMapReady(gmappanel6,googlemap);
        
    },
    initMapReady: function(gmappanel6,googlemap){
        var view = gmappanel6.up('distanciamaphelperview');
        
        if(view.addressOrigen) {
            view.down('#direccionorigen').hide()
            view.down('#direccionorigentext').setValue(view.addressOrigen)
            
            
            var geocode = gmappanel6.getGeocoder()
            var map = gmappanel6.getMap();
            geocode.geocode( { 'address': view.addressOrigen}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
              }
            });
        }
        
        
        
        
        
        
    
        
        
        
        //gmappanel6.getMap().setOptions({mapMaker: true });
        //this.showMarkerArray(gmappanel6, this);
       // this.mostrarGeocercas(map, record);
    },
    
   
    
    mostrarGeocercas: function(map,record){
        var me = this;
        var store =Ext.create('Ext.data.Store',{
            model: 'Trackguard'+'.model.GeocercaSearchModel',
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
    },
    
    getHistoryMarkers: function(store, vehicle){
        var points = new Array();
        var markers = new Array();
        var controller = this;
        
        store.each(function(record, index, total){
            points.push({lat: record.get('gps_rLatitud'), lng: record.get('gps_rLongitud'),fecha: record.get('gps_isofechahora')});
            if (!record.marker){
                var mark = {
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
                markers.push(mark);
                record.marker = mark;
            }
            
            
        });
        
        return {points:points, markers:markers}
    },
    
    getHistoryMarker: function(vehicle, record){
        var controller = this;
        if (!record.marker){
            var mark = {
                marker: null,
                lat : record.get('gps_rLatitud'),
                lng : record.get('gps_rLongitud'),
                record: record,
                title : Ext.Date.format(record.get('gps_isorawfechahora'),'Y-m-d H:i:s'),
                icon: controller.getHistoryMarkerIcon(1, 3),
                infoWindow: {
                    content: controller.getHistoryInfoWindowHtml(vehicle,record), 
                    listener:'click'
                },
                draggable : false
            }
            record.marker = mark;
        }
        return record.marker;
    },
    
    getHistoryMarkerIcon: function(i,total,old){
        var selected = '';
        var iconUrl = '';
        iconUrl = old?'/resources/softguard/images/icon_dot_verde.gif':'/resources/softguard/images/icon_dot-nonew.gif';
        var image = new google.maps.MarkerImage(
            iconUrl,
            new google.maps.Size(10,10),
            new google.maps.Point(0,0),
            new google.maps.Point(5,5)
        );
        return image;
    },
    
    getHistoryInfoWindowHtml: function(vehicle, gps){
        var pos = vehicle.pos;
        var html = '\
            <div style="width:500px;">\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            ';
            
            html += '\
                <table>';
        if(vehicle.address) {
        
            html += '\
                    <tr>\
                        <td colspan="2" style="padding:5px 5px 0 5px; font-size:13px; ">\
                        <span class="x-btn-icon icon-map" style="display:inline-block; height: 16px; width:16px;"></span><span style="line-height:17px; vertical-align:top;"> {direccion}</span><br/>\
                        </td>\
                    </tr>\
                    ';
        }
        html += '\
                    <tr>\
                        <td style="padding:5px; font-size:13px;">\
                           <span style="font-weight:bold;">{lblVelocidad}:</span><span> {velocidad} km/h</span><br/>\
                           <span style="font-weight:bold;">{lblUltAlerta}:</span><span>  {alerta}</span><br/>\
                            <!--span style="font-weight:bold;">{lblLatitud}:</span><span>  {latitud}</span><br/>\
                            <span style="font-weight:bold;">{lblLongitud}:</span><span>  {longitud}</span><br/-->\
                            <span style="font-weight:bold;">{lblOdometro}:</span><span>  {odometro}</span><br/>\
                        </td>\
                        <td style="padding:5px; font-size:13px;">\
                            <span style="font-weight:bold;">{lblFechaRecepcion}:</span><span>  {fecha}</span><br/>\
                           <span style="font-weight:bold;">{lblFechaGPS}:</span><span>  {fechaRaw}</span><br/>\
                           <span style="font-weight:bold;">{lblFechaAlerta}:</span><span>  {fechaAlerta}</span><br/>\
                        </td>\
                    </tr>\
                    ';
                    
        
                    
        html += '</table>';
            
            // traducciones
        
        html = html.replace(/\{lblVelocidad\}/, getLocale('Velocidad'));
        html = html.replace(/\{lblDireccion\}/, getLocale('Dirección'));
        html = html.replace(/\{lblFechaRecepcion\}/, getLocale('Fecha recepción'));
        html = html.replace(/\{lblFechaGPS\}/, getLocale('Fecha Gps'));
        html = html.replace(/\{lblFechaAlerta\}/, getLocale('Fecha Alerta'));
        html = html.replace(/\{lblUltAlerta\}/, getLocale('Ult. Alerta'));
        html = html.replace(/\{lblLatitud\}/, getLocale('Latitud'));
        html = html.replace(/\{lblLongitud\}/, getLocale('Longitud'));
        html = html.replace(/\{lblOdometro\}/, getLocale('Odómetro'));
        
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
        html = html.replace(/\{odometro\}/, pos.gps.get('gps_iOdometro'));
        return html
    }
});
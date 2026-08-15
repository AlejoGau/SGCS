//MIGRADO2024
Ext.define('Common.controller.SmartTrackMonitoreoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'GpsHistoricoSearchModel', 'ReceptorFormatosSearchModel', 'SmartTrackSearchModel', 'SmartTrackModel', 'SmartTrackGpsModel', 'EventoPosicionSearchModel' ],
    views : [ 'ExtUxNotification', 'SmartTrackGpsView' ],
    init : function(config) {
    	// genero los eventos
		this.control({
            'smarttrackgpsview' : {
                beforerender : this.initview
			},
            'smarttrackgpsview gmappanel6' : {
    			mapready : this.onMapReady,
                beforerender : this.prepareMap
			}
		});
	}, // cierro init
    
    initview: function(view){
        if(myQueryString.eventId){
            view.eventId = myQueryString.eventId
        }
        if(myQueryString.objectId){
            view.objectId = myQueryString.objectId
        }
        if (view.record){
            view.eventId = view.record.get('rec_iid');
        }
    },
    
    prepareMap: function(gmappanel6){
        view = gmappanel6.up('smarttrackgpsview');
        if(myQueryString.eventId){
            view.eventId = myQueryString.eventId
        }
        if(myQueryString.objectId){
            view.objectId = myQueryString.objectId
        }
        if (view.record){
            view.eventId = view.record.get('rec_iid');
        }
        
    },
    
    setEventType: function(event, view){
        var tipo = 0;
        var map = view.down('#googlemap');
        
        switch(event.get('for_cformato')){
            case view.config.CIDEASSIST:
              map.codRestauracion = view.config.CIDRASSIST
              tipo=3;
              break;
            case view.config.CIDEFIRE:
              map.codRestauracion = view.config.CIDRFIRE
              tipo=2;
              break;
            case view.config.CIDESOS:
              map.codRestauracion = view.config.CIDRSOS
              tipo=1;
              break;
        }
        
        view.eventType = tipo;
    },
    
    openObjectList: function(view){
        
    },
    
    openObjectById: function(){
        
    },
	openById : function(objectId, view) {
        var me = this;
        var viewport = Ext.getCmp('viewport');
        var smartpanicgpsview = view?view:viewport.down('smarttrackgpsview');
        var gmap = smartpanicgpsview.down('#googlemap');
        
        
        smartpanicgpsview.imei = objectId;
        smartpanicgpsview.objectId =objectId;
        
		var store =Ext.create('Ext.data.Store',{
            model: this.getSmartTrackSearchModelModel(),
            pageSize: 150,
            filters: [
                {
                    property: 'Imei', 
                    value: objectId
                }
            ]
        });
        store.load({
            callback: function(records, operation, success){
                smartpanicgpsview.vehicleSelected = records[0];
                smartpanicgpsview.record = records[0];
                //gmap.fireEvent('markersChange',gmap,records);   
            }
        });
        
	},
    
    
    onMapReady: function(gmappanel6,googlemap){
        var view= gmappanel6.up('smarttrackgpsview');
        var record = view.record;
        var controller= this;
        gmappanel6.record = record;
        //this.gmappanel6 = gmappanel6;
        
        
        
        
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
        
        
        if (view.eventId){
            // no recibi la cuenta pero si el evento
            // busco el imei del evento
            
            var store = Ext.create('Ext.data.Store',{
                pageSize: 1,
                remoteFilter: true,
                filters: [{
                    property: 'gps_idRec',
                    value: view.eventId
                }],
                model: this.getEventoPosicionSearchModelModel()
            });
            
            store.load({
                callback: function(records, operation, success){
                    //console.log(records);
                    var record = records[0];
                    if (!record){
                        notifyError('El evento no tiene posición!');
                        
                        if (view.up('tabpanel')){
                            view.close();
                        } else {
                            var win = view.up('window');
                            if (win){
                                win.close();
                            }
                        }
                        
                        
                    
                    } else{
                        var objectId = record.get('gps_cIMEI');
                        view.event = record;
                        view.objectId = objectId;
                        controller.openById(objectId, view);
                        controller.showHistory(gmappanel6,record,view.eventId);
                        
                        Ext.TaskManager.start({
                            args: [gmappanel6,record, view.eventId],
                            run: controller.showHistory,
                            scope: controller,
                            interval: 10000
                        });
                        
                    }
                    
                }
            });
        }
        
    },
    
    getVehiclePosition: function(vehicle, gmappanel6){
        /*
        var seconds = +Ext.Date.format(new Date(),'s');
        var mylat = -34.6068 - ((seconds+vehicle.get('Id'))/1000);
        var mylong = -58.4126 - ((seconds+vehicle.get('Id'))/1000);
        */
        var store = gmappanel6.ultimasPosiciones;
        //var record = store.getAt(store.find('gps_idCuenta', vehicle.get('CuentaId'),0,false,false,true));
        var record = store.getAt(0);
        if (record){
            
            var mylat = record.get('gps_rLatitud').replace(/,/g,'.');
            var mylong = record.get('gps_rLongitud').replace(/,/g,'.');
            var point = new google.maps.LatLng(mylat,mylong);
            
            return {lat: mylat, long: mylong, position: point, gps: record};
        }else return {lat:'',long:'',position: null}
        
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
    
    
    showVehicle: function(vehicle,index,array){
        
        if (!vehicle)
        return false;
        
        var gmappanel6 = this.gmappanel6;
        var controller = this.controller;
        var view = gmappanel6.up('smarttrackgpsview');
        
        var center = view.down('button[action=center]').pressed;
        var clear = false;
        var marker = {};
        var pos = controller.getVehiclePosition(vehicle, gmappanel6);
        var geocoder = gmappanel6.getGeocoder();
        var listeners = {};
        /*var listeners = {
            click: function(){
                view.fireEvent('vehicleSelected',this.record);
            }
        };*/
        
        if (pos.position){
            geocoder.geocode({
            location: pos.position
        	}, function(result, status){
                if (status == 'OK' && result.length > 0){
                    pos.address = result[0].formatted_address
                }
                
                var infoHtml = controller.getVehicleInfoWindowHtml(vehicle,pos);
                if (typeof vehicle.markerIndex !== "undefined" && gmappanel6.cache.marker[vehicle.markerIndex]){
                    // muevo el marker de lugar
                    gmappanel6.cache.marker[vehicle.markerIndex].setPosition(pos.position);
                    // lo muestro por si estaba oculto
                    gmappanel6.cache.marker[vehicle.markerIndex].setMap(gmappanel6.getMap());
                    // cambio el icono por si se selecciono o no
                    gmappanel6.cache.marker[vehicle.markerIndex].setIcon(controller.getMarkerIcon(pos, view));
                    // cambio el contenido del marker
                    gmappanel6.cache.infowindow[vehicle.markerIndex].setContent(infoHtml);
                    
                } else {
                    marker = {
                        lat : pos.lat,
                        lng : pos.long,
                        record: vehicle,
                		title : vehicle.get('Name'),
                        icon: controller.getMarkerIcon(pos, view),
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
            });
            
        }
        
    },
    
    showMarkerArray: function(gmappanel6,controller){
        var vehicles = [gmappanel6.record];
        var markers = gmappanel6.markerList;
        
        var view = gmappanel6.up('smarttrackgpsview');
        // si se cerro la ventana freno la tarea
        if (!view || gmappanel6.restaurado){
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
            view.doLayout();
            
        } else {
            gmappanel6.ultimasPosiciones.load({callback: function(records, operation, success){
                Ext.Array.each(vehicles,controller.showVehicle,{gmappanel6: gmappanel6, controller: controller});
                var center = view.down('button[action=center]').pressed;
                
                if (center){
                    var bounds = controller.getBounds(gmappanel6.cache.marker);
                    gmappanel6.getMap().setCenter(bounds.getCenter());
                }
            }})
            /*if (dataPanel.isHidden()){
                dataPanel.show();
                view.doLayout();
            }
            */
        }
        
    },
    
    
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
    
    
    getBounds: function(markers) {
        var bounds = new google.maps.LatLngBounds();
        Ext.each(markers, function (marker,index,array) {
                bounds.extend(marker.position);
        });
        return bounds
    },
    
    showHistory: function(map, vehicle, event){
        var controller = this;
        var view = map.up('smarttrackgpsview');
        var store = Ext.create('Ext.data.Store',{
            model: this.getGpsHistoricoSearchModelModel(),
            remoteFilter: true,
            filters: [
                {
                    property:'gps_cIMEI',
                    value: view.event.get('gps_cIMEI')
                },{
                    property:'rec_iid:GT',
                    value: event-10
                }
            ],
            pageSize: 1000
        });
        
        map.clearMarkers();
        
        store.load({callback: function(records){
            var primerEvento = store.getAt(0)
            map.primerEvento = primerEvento;
            /*
            if (myQueryString.eventType =='' || !myQueryString.eventType){
                controller.setEventType(primerEvento, view);
            }
            */
            var temp = controller.getHistoryMarkers(store, vehicle, map);
            var points = temp.points;
            var markers = temp.markers;
            
            //var fechaDesde = Ext.Date.format(points[0].fecha, 'Y-m-d H:i:s');
            //var fechaHasta = Ext.Date.format(points[points.length -1].fecha, 'Y-m-d H:i:s');
            
            
            //var center = bounds.getCenter();
            
            //map.addPolyline(points);
            map.addMarkers(markers);
            
            if(view.down('button[action=center]')) {
                var center = view.down('button[action=center]').pressed;
                    
                if (center){
                    var bounds = controller.getBounds(markers);
                    map.getMap().fitBounds(bounds);
                    if (map.getMap().getZoom()>14){
                        map.getMap().setZoom(14)
                    }
                }
            }
            
        }});
    },
    
    getHistoryMarkers: function(store, vehicle, map){
        var points = new Array();
        var markers = new Array();
        var controller = this;
        var secuencia = 0;
        store.each(function(record, index, total){
            
            if (record.get('rxt_iSecuencia') < secuencia){
                return false
            } else {
                secuencia = record.get('rxt_iSecuencia');
            }
            
            points.push({lat: record.get('gps_rLatitud'), lng: record.get('gps_rLongitud'),fecha: record.get('gps_isofechahora')});
            markers.push({
                    marker: null,
                    lat : record.get('gps_rLatitud'),
                    lng : record.get('gps_rLongitud'),
                    record: record,
                    title : Ext.Date.format(record.get('gps_isofechahora'),'Y-m-d H:i:s'),
                    icon: controller.getHistoryMarkerIcon(index, total,null, record, map),
                    infoWindow: {
                        content: controller.getHistoryInfoWindowHtml(vehicle,record), 
                        listener:'click'
                    },
                    draggable : false
                }
            );
            
            // agrego los circulos de la accuracy
            if (record.get('gps_rAccuracy')>0)
                controller.mostrarPrecision(record, map, controller);
            
            
            if (map.restaurado) {return false;}
        });
        
        markers[markers.length-1].icon = new google.maps.MarkerImage(
            '/resources/softguard/images/finish.png',
            new google.maps.Size(48,48),
            new google.maps.Point(0,0),
            new google.maps.Point(16,35)
        );
        
        return {points:points, markers:markers}
    },
    
    getHistoryMarkerIcon: function(i,total,old,record, map){
        var selected = '';
        var iconUrl = '';
        
        //console.log(record.get('rec_calarma'));
        
        switch (i)
        {
            case 0:
                var tipo = record.get('rec_czona');
                var tipoIcon = '';
                
                switch(tipo)
                    {
                    case "SP1":
                        tipoIcon = 'sos';
                      break;
                    case "SP2":
                      tipoIcon = 'fire';
                      break;
                    case "SP3":
                      tipoIcon = 'alarm';
                    }
                
                var iconUrl = '/resources/softguard/images/mapguard-cservice/'+tipoIcon+'.png';
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size(48,48),
                    new google.maps.Point(0,0),
                    new google.maps.Point(16,35)
                );
                break;
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
    
    mostrarPrecision: function(record,gmappanel6, controller){
        var me = controller;
        var color = 'Blue';
        var map = gmappanel6.getMap();
        var newShape = new google.maps.Circle({
            strokeColor: color,
            fillOpacity: 0.1,
            strokeWeight: 1,
            fillColor: color
        });
        
        var center = new google.maps.LatLng(
            record.get('gps_rLatitud'),
            record.get('gps_rLongitud')
        );
        newShape.setCenter(center);
        newShape.setRadius(record.get('gps_rAccuracy'));
        newShape.setMap(map);
        
        gmappanel6.cache.circle.push(newShape);
    },
    
    getHistoryInfoWindowHtml: function(vehicle, gps){
        var html = '\
            <div style="width:220px;height:130px;">\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            <span style="font-weight:bold;">{lblfecha}:</span><span>  {fecha}</span><br/>\
            <span style="font-weight:bold;">{lbldireccion}:</span><span>  {direccion}</span><br/>\
            <span style="font-weight:bold;">{lblevento}:</span><span>  {evento}</span><br/>\
            <span style="font-weight:bold;">{lblprecision}:</span><span>  {precision}</span><br/>\
            </div>';
            
        //html = html.replace(/\{lblVelocidad\}/, getLocale('Velocidad'));
        html = html.replace(/\{lblfecha\}/, getLocale('Fecha'));
        html = html.replace(/\{lbldireccion\}/, getLocale('Dirección'));
        html = html.replace(/\{lblevento\}/, getLocale('Evento'));
        html = html.replace(/\{lblprecision\}/, getLocale('Precisión'));
        
        html = html.replace(/\{dealer\}/, vehicle.get('cue_clinea'));
        html = html.replace(/\{ncuenta\}/, vehicle.get('cue_ncuenta'));
        html = html.replace(/\{nombre\}/, vehicle.get('Domain'));
        html = html.replace(/\{cuenta\}/, vehicle.get('cue_cnombre'));
        //html = html.replace(/\{velocidad\}/, gps.get('gps_iVelocidad'));
        html = html.replace(/\{direccion\}/, gps.get('gps_cDireccion'));
        html = html.replace(/\{fecha\}/, Ext.Date.format(gps.get('gps_isofechahora'), 'Y-m-d H:i:s'));
        html = html.replace(/\{evento\}/, gps.get('cod_cdescripcion'));
        html = html.replace(/\{precision\}/, gps.get('gps_rAccuracy'));
        return html
    }
});
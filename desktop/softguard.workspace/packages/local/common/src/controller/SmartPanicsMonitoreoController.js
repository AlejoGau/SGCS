//MIGRADO2024
Ext.define( 'Common.controller.SmartPanicsMonitoreoController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'EventoPosicionSearchModel', 'GpsHistoricoSearchModel', 'ReceptorFormatosSearchModel', 'EventosposicionesSPSearchModel', 'SmartPanicModel', 'SmartPanicSearchModel', 'SmartPanicGpsModel', 'ImeiGeofenceModel', 'GeocercaMapModel' ],
views: [ 'ExtUxNotification', 'SmartPanicGpsView' ],
init: function(config ) {
    // genero los eventos
    this.control( {
        'smartpanicgpsview': {
            beforerender: this.initview
        },
        'smartpanicgpsview gmappanel6': {
            mapready: this.onMapReady,
            beforerender: this.prepareMap,
            manualcenter: this.onManualCenter
        },
        'smartpanicgpsview #mostrarposiciones': {
            click: this.onClickMostrarPosiciones
        },
        'smartpanicgpsview #mostrargeocercas': {
            click: this.onClickMostrarGeocercas
        },
        'smartpanicgpsview #mostrarsmartpanics': {
            click: this.onClickMostrarSmatpanics
        },
        'smartpanicgpsview button[action=center]': {
            click: this.onCenterClick
        }
    });
}, // cierro init
onManualCenter: function(gmappanel6 ) {
    var view = gmappanel6.up( 'smartpanicgpsview' );
    var btn = view.down( '#center' );
    if( btn._pressed ) {
        btn.setText( getLocale( 'Cambiar a Centrar' ) );
        btn._pressed = false
    }
},
        
onCenterClick: function (btn ) {
    var view = btn.up( 'smartpanicgpsview' );
    if( !btn._pressed ) {
        btn.setText( getLocale( 'Cambiar a Manual' ) );
        btn._pressed = true;
    } else {
        btn.setText( getLocale( 'Cambiar a Centrar' ) );
        btn._pressed = false
    }
},
        
forceCenter: function (view ) {
    var controller = this;
    var gmappanel6 = view.down( 'gmappanel6' )
    var btn = view.down( '#center' );
    btn.setText( getLocale( 'Cambiar a Manual' ) );
    btn._pressed = true;
    var bounds = controller.getBounds( gmappanel6.cache.marker );
    if( bounds )
        gmappanel6.getMap().fitBounds( bounds );
    if( gmappanel6.getMap().getZoom() > 14 ) {
        gmappanel6.getMap().setZoom( 14 )
    }
},
        
onClickMostrarSmatpanics: function (btn ) {
    var view = btn.up( 'smartpanicgpsview' )
    var gmappanel6 = view.down( 'gmappanel6' )
    var controller = this;
    if( btn.pressed ) {
        //view.MOSTRARGEOCERCAS = true;
        btn.setText( getLocale( 'Ocultar Grupo' ) )
        btn.toggle( true )
        controller.mostrarSmartpanics( gmappanel6, view.record, view );
    } else {
        //view.MOSTRARGEOCERCAS = false;
        btn.setText( getLocale( 'Mostrar Grupo' ) )
        btn.toggle( false )
        //controller.mostrarGeocercas(gmappanel6.getMap(), view.record);
        view.storeSmartPanics.each( function( item ) {
            item.marker.setMap( null )
        })
    }
},
        
mostrarSmartpanics: function(map, record, view ) {
    var controller = this;
    view.smartpanicsArray = [];
    view.storeSmartPanics.load( function( records ) {
        view.storeSmartPanics.each( function( record, index, total ) {
            // no son estas lat y long son los del gps
            var lat = record.get( 'gps_rlatitud' );
            var long = record.get( 'gps_rlongitud' );
            //points.push({lat:lat , lng: long,fecha: record.get('gps_isofechahora')});
            view.smartpanicsArray.push( {
                marker: null,
                lat: lat,
                lng: long,
                record: record,
                title: record.get( 'cue_clinea' ) + "-" + record.get( 'cue_ncuenta' ) + " " + record.get( 'cue_cnombre' ),
                icon: controller.getSmartPanicsMarkerIcon( record ),
                infoWindow: {
                    content: controller.getSmartPanicsInfoWindowHtml( record, view ),
                    listener: 'click'
                },
                draggable: false
            }
            );
        });
        map.addMarkers( view.smartpanicsArray );
        //controller.forceCenter(view)
    })
},
onClickMostrarGeocercas: function (btn ) {
    var view = btn.up( 'smartpanicgpsview' )
    var gmappanel6 = view.down( 'gmappanel6' )
    var controller = this;
    if( btn.pressed ) {
        view.MOSTRARGEOCERCAS = true;
        btn.setText( getLocale( 'Ocultar Geocercas' ) );
        btn.toggle( true );
        controller.mostrarGeocercas( gmappanel6.getMap(), view.record, view );
    } else {
        view.MOSTRARGEOCERCAS = false;
        btn.setText( getLocale( 'Mostrar Geocercas' ) );
        btn.toggle( false );
        //controller.mostrarGeocercas(gmappanel6.getMap(), view.record);
        Ext.Array.each( view.geocercaArray, function( item ) {
            item.setMap( null )
        })
    }
},
        
onClickMostrarPosiciones: function (btn ) {
    var view = btn.up( getLocale( 'smartpanicgpsview' ) );
    var controller = this;
    if( btn.pressed ) {
        view.MOSTRARPOSICIONES = true;
        btn.setText( getLocale( 'Ocultar Seguimiento' ) );
        btn.toggle( true );
    } else {
        view.MOSTRARPOSICIONES = false;
        btn.setText( getLocale( 'Mostrar Seguimiento' ) );
        btn.toggle( false );
    }
},
        
initview: function(view ) {
    if( myQueryString.eventId ) {
        view.eventId = myQueryString.eventId
    }
    if( myQueryString.objectId ) {
        view.objectId = myQueryString.objectId
    }
    if( view.record ) {
        view.eventId = view.record.get( 'rec_iid' );
    }
    view.storeGPSHistory = Ext.create( 'Ext.data.Store', {
        model: this.getGpsHistoricoSearchModelModel(),
        remoteFilter: true,
        pageSize: 1000
    });
    /*
            //lo paso mas abjo al mapready donde telngo el load del record para asegurar que esta cue_iid
            // se podria unificar el llamado y mandar el record desde la grilla
    view.storeSmartPanics =Ext.create('Ext.data.Store',{
        model: this.getSmartPanicSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: [
            {
                property: 'cue_iid',
                value: view.record.get('cue_iid')
            }
        ]
    })*/
},
        
prepareMap: function(gmappanel6 ) {
    view = gmappanel6.up( 'smartpanicgpsview' );
    if( myQueryString.eventId ) {
        view.eventId = myQueryString.eventId
    }
    if( myQueryString.objectId ) {
        view.objectId = myQueryString.objectId
    }
    if( view.record ) {
        view.eventId = view.record.get( 'rec_iid' );
    }
},
        
setEventType: function(event, view ) {
    var tipo = 0;
    var map = view.down( '#googlemap' );
    switch( event.get( 'for_cformato' ) ) {
        case view.config.CIDEASSIST:
            map.codRestauracion = view.config.CIDRASSIST
            tipo = 3;
            break;
        case view.config.CIDEFIRE:
            map.codRestauracion = view.config.CIDRFIRE
            tipo = 2;
            break;
        case view.config.CIDESOS:
            map.codRestauracion = view.config.CIDRSOS
            tipo = 1;
            break;
    }
    view.eventType = tipo;
},
        
openObjectList: function(view ) {
},
        
openObjectById: function() {
},
openById: function(objectId, view ) {
    var me = this;
    var viewport = Ext.getCmp( 'viewport' );
    var smartpanicgpsview = view ? view : viewport.down( 'smartpanicgpsview' );
    var gmap = smartpanicgpsview.down( '#googlemap' );
    smartpanicgpsview.imei = objectId;
    smartpanicgpsview.objectId = objectId;
    var store = Ext.create( 'Ext.data.Store', {
        model: this.getSmartPanicSearchModelModel(),
        remoteFilter: true,
        pageSize: 150,
        filters: [
            {
                property: 'Imei',
                value: objectId
            }
        ]
    });
    store.load( {
        callback: function( records, operation, success ) {
            if( records ) {
                smartpanicgpsview.vehicleSelected = records[ 0 ];
                smartpanicgpsview.sprecord = records[ 0 ];
            }
            //gmap.fireEvent('markersChange',gmap,records);   
        }
    });
},
        
        
onMapReady: function(gmappanel6, googlemap ) {
    var view = gmappanel6.up( 'smartpanicgpsview' );
    var record = view.record;
    view.recordEvento = view.record ? view.record : view.recordEvento;
    var controller = this;
    gmappanel6.record = record;
    view.geocercaArray = [];
    //this.gmappanel6 = gmappanel6;
    var map = gmappanel6.getMap();
    if( UiApplicationMetadata.Kml ) {
        var kml = new google.maps.KmlLayer( {
            url: UiApplicationMetadata.Kml
        });
        kml.setMap( map );
    }
    if( UiApplicationMetadata.MapType ) {
        map.setMapTypeId( UiApplicationMetadata.MapType );
    }
    if( view.eventId ) {
        // no recibi la cuenta pero si el evento
        // busco el imei del evento
        var store = Ext.create( 'Ext.data.Store', {
            pageSize: 1,
            remoteFilter: true,
            filters: [ {
                property: 'gps_idRec',
                value: view.eventId
            }],
            model: this.getEventoPosicionSearchModelModel()
        });
        store.load( {
            callback: function( records, operation, success ) {
                var record = records[ 0 ];
                if( !record ) {
                    //notifyError( 'El evento no tiene posición!' );
                    //record = view.record;
                    controller.buscarEnPosicionesSP( view, gmappanel6 );
                    return;
                } else {
                    view.sprecord = record;
                    var reporteautoridadformview = view.up( 'reporteautoridadformview' );
                    if( reporteautoridadformview ) {
                        reporteautoridadformview.sprecord = record;
                    }
                }
                if( record ) {
                    var mark = gmappanel6.addMarker( new google.maps.LatLng( record.get( 'gps_rlatitud' ), record.get( 'gps_rlongitud' ) ), {
                        lat: record.get( 'gps_rlatitud' ),
                        lng: record.get( 'gps_rlongitud' ),
                        record: record,
                        title: record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ),
                        icon: controller.getEventMarkerIcon( '', view ),
                        infoWindow: {
                            content: controller.getCuentaInfoWindowHtml( view.recordEvento ),
                            listener: 'mouseover',
                            disableAutoPan: true
                        },
                        draggable: false
                    })
                    var geocoder = gmappanel6.getGeocoder();
                    var lat = record.get( 'gps_rlatitud' );
                    var lng = record.get( 'gps_rlongitud' );
                    var parametro = new google.maps.LatLng( lat, lng );
                    geocoder.geocode( {
                        location: parametro
                    }, function( result, status ) {
                        if( status == 'OK' && view.down( '#direccion' ) ) {
                            view.down( '#direccion' ).setValue( result[ 0 ].formatted_address )
                        }
                    });
                }
                view.storeSmartPanics = Ext.create( 'Ext.data.Store', {
                    model: controller.getSmartPanicSearchModelModel(),
                    pageSize: 100,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [
                        {
                            property: 'cue_iid',
                            value: record.get( 'cue_iid' )
                        }
                    ]
                });
                var objectId = record.get( 'gps_cIMEI' );
                view.event = record;
                view.objectId = objectId;
                controller.openById( objectId, view );
                //controller.showHistory(gmappanel6,record,view.eventId);
                //controller.mostrarGeocercas(gmappanel6.getMap(), record);
                view.task = Ext.TaskManager.start( {
                    args: [ gmappanel6, record, view.eventId ],
                    run: controller.showHistory,
                    scope: controller,
                    interval: 10000
                });
                controller.popularMapBar( view, record )
            }// fin load
        });
    }
},
buscarEnPosicionesSP: function(view, gmappanel6 ) {
    var controller = this;
    var store = Ext.create( 'Ext.data.Store', {
        pageSize: 1,
        remoteFilter: true,
        filters: [ {
            property: 'rec_iid',
            value: view.eventId
        }],
        model: controller.getEventosposicionesSPSearchModelModel()
    });
    store.load( {
        callback: function( records, operation, success ) {
            var record = Array.isArray( records ) && records[ 0 ];
            /* puede darse el caso donde existan varios dispositivos en ese IdCuenta, por lo cual ademas de ese filtro,
            hay que pasar una property nueva al store, sumando el IMEI del dispositivo que genero la señal.
            agrego un if preguntando que sino consiguió nada, en vez de mandarle rec_iid le mando el id de la cuetna y el imei del dispositivo
            https://softguard.atlassian.net/browse/DS-610 */
            if( !record ) {
                notifyError( 'El evento no tiene posición SP!' );
                store.clearFilter();
                store.addFilter( {
                    property: 'sp_cimei',
                    value: view.record.get( 'rxt_cimei' )
                });
                store.addFilter( {
                    property: 'cue_iid',
                    value: view.record.get( 'cue_iid' )
                });
                store.load( {
                    callback: function( records, operation, success ) {
                        var record = records[ 0 ];
                        if( record ) {
                            controller.showPosicionEvento( record, view, gmappanel6 );
                        }
                    }
                });
            } else {
                controller.showPosicionEvento( record, view, gmappanel6 );
            }
        }
    });
},
showPosicionEvento: function(record, view, gmappanel6 ) {
    var controller = this;
    view.sprecord = record;
    var reporteautoridadformview = view.up( 'reporteautoridadformview' );
    if( reporteautoridadformview ) {
        reporteautoridadformview.sprecord = record;
    }
    if( record ) {
        var mark = gmappanel6.addMarker( new google.maps.LatLng( record.get( 'gps_rlatitud' ), record.get( 'gps_rlongitud' ) ), {
            lat: record.get( 'gps_rlatitud' ),
            lng: record.get( 'gps_rlongitud' ),
            record: record,
            title: record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ),
            icon: controller.getEventMarkerIcon( '', view ),
            infoWindow: {
                content: controller.getCuentaInfoWindowHtml( view.recordEvento ),
                listener: 'mouseover',
                disableAutoPan: true
            },
            draggable: false
        })
        var geocoder = gmappanel6.getGeocoder();
        geocoder.geocode( {
            location: new google.maps.LatLng( record.get( 'gps_rlatitud' ), record.get( 'gps_rlongitud' ) )
        }, function( result, status ) {
            if( status == 'OK' && view.down( '#direccion' ) && result.length>0) {
                view.down( '#direccion' ).setValue( result[ 0 ].formatted_address )
            }
        });
    }
    view.storeSmartPanics = Ext.create( 'Ext.data.Store', {
        model: controller.getSmartPanicSearchModelModel(),
        pageSize: 100,
        remoteSort: true,
        remoteFilter: true,
        filters: [
            {
                property: 'cue_iid',
                value: record.get( 'cue_iid' )
            }
        ]
    });
    var objectId = record.get( 'gps_cIMEI' );
    view.event = record;
    view.objectId = objectId;
    controller.openById( objectId, view );
    //controller.showHistory(gmappanel6,record,view.eventId);
    //controller.mostrarGeocercas(gmappanel6.getMap(), record);
    
    view.task = Ext.TaskManager.start( {
        args: [ gmappanel6, record, view.eventId ],
        run: controller.showHistory,
        scope: controller,
        interval: 10000
    });

    
    controller.popularMapBar( view, record )
},
popularMapBar: function (view, record ) {
    var html = '<div style="display: flex;align-items: center;">'
    if( record.get( 'gps_cMethod' ) ) {
        //corto el valor del campo por que vien 2 valores (OFF;1)
        var cropMethod = record.get( 'gps_cMethod' ).split( ';' );
        if( cropMethod[ 1 ] ) {
            var gpsstatus = view.down( '#gpsstatus' );
            if( cropMethod[ 1 ] == 1 ) {
                html += '<div class="icon-marker-red" title="' + getLocale( 'Sin acceso al GPS' ) + '" style="display:inline-block" style="margin-left:10px; margin-right:3px"></div> ' + getLocale( 'Sin acceso al GPS' )
            } else if( cropMethod[ 1 ] == 2 ) {
                html += '<div class="icon-marker-orange" title="' + getLocale( 'Uso del GPS solo en primer plano' ) + '" style="display:inline-block" style="margin-left:10px; margin-right:3px"></div> ' + getLocale( 'Uso del GPS solo en primer plano' )
            } else if( cropMethod[ 1 ] == 3 ) {
                html += '<div class="icon-marker-green" title="' + getLocale( 'Uso full del GPS' ) + '" style="display:inline-block" style="margin-left:10px; margin-right:3px"></div> ' + getLocale( 'Uso full del GPS' )
            }
        }
    }
    if( record.get( 'gps_iBattery' ) ) {
        if( record.get( 'gps_iBattery' ) > 100 ) {
            record.set( 'gps_iBattery', 100 )
        }
        html += '<img src="/resources/global/images/icons/battery.png" style="margin-left:10px; margin-right:3px" title="' + getLocale( 'Bateria' ) + '" /> ' + record.get( 'gps_iBattery' ) + '%'
    }
    if( record.get( 'gps_iVelocidad' ) ) {
        if( record.get( 'gps_iVelocidad' ) < 0 ) {
            record.set( 'gps_iVelocidad', 0 )
        }
        html += '<img src="/resources/global/images/icons/speedometer.png" style="margin-left:10px; margin-right:3px" title="' + getLocale( 'Velocidad' ) + '" /> ' + record.get( 'gps_iVelocidad' ) + ' Km/h'
    }
    if( record.get( 'gps_rAccuracy' ) ) {
        html += '<img src="/resources/global/images/icons/Accuracy-Icon.png" style="margin-left:10px; margin-right:3px" title="' + getLocale( 'Precision' ) + '"/> ' + record.get( 'gps_rAccuracy' )
    }
    var gps_cMethod = record.get( 'gps_cMethod' );
    if( !gps_cMethod ) {
        gps_cMethod = 'OFF';
    }
    html += '<img src="/resources/global/images/icons/gpsmethod-' + gps_cMethod + '.png" style="margin-left:10px; margin-right:3px" title="' + getLocale( 'Método gps: ' ) + getLocale( gps_cMethod ) + '"/> '
    html += "</div>"
    if( view.down( '#iconosmapa' ) ) {
        view.down( '#iconosmapa' ).add( {
            xtype: 'container',
            html: html
        })
    }
},
        
getVehiclePosition: function(vehicle, gmappanel6 ) {
    /*
    var seconds = +Ext.Date.format(new Date(),'s');
    var mylat = -34.6068 - ((seconds+vehicle.get('Id'))/1000);
    var mylong = -58.4126 - ((seconds+vehicle.get('Id'))/1000);
    */
    var store = gmappanel6.ultimasPosiciones;
    //var record = store.getAt(store.find('gps_idCuenta', vehicle.get('CuentaId'),0,false,false,true));
    var record = store.getAt( 0 );
    if( record ) {
        var mylat = record.get( 'gps_rLatitud' ).replace( /,/g, '.' );
        var mylong = record.get( 'gps_rLongitud' ).replace( /,/g, '.' );
        var point = new google.maps.LatLng( mylat, mylong );
        return { lat: mylat, long: mylong, position: point, gps: record };
    } else return { lat: '', long: '', position: null }
},
        
getMarkerIcon: function(pos, view ) {
    var iconUrl = '/resources/softguard/images/trackguard-0.png';
    var image = new google.maps.MarkerImage(
        iconUrl,
        new google.maps.Size( 48, 48 ),
        new google.maps.Point( 0, 0 ),
        new google.maps.Point( 16, 35 )
    );
    return image;
},
        
getSmartPanicsMarkerIcon: function (record ) {
    var json = '';
    var iconUrl = '/resources/global/images/icons/icn_sp.png';
    if( record.get( 'Config' ) != "" ) {
        json = Ext.JSON.decode( record.get( 'Config' ) );
    }
    if( json && json.groupEnabled && json.groupEnabled == 1 ) {
        iconUrl = '/resources/softguard/images/icons/icn_sp_master.png';
    }
    var image = new google.maps.MarkerImage(
        iconUrl,
        new google.maps.Size( 48, 48 ),
        new google.maps.Point( 0, 0 ),
        new google.maps.Point( 16, 35 )
    );
    return image;
},
        
getEventMarkerIcon: function(pos, view ) {
    var iconUrl = '/resources/softguard/images/enalarma.png';
    var image = new google.maps.MarkerImage(
        iconUrl,
        new google.maps.Size( 48, 48 ),
        new google.maps.Point( 0, 0 ),
        new google.maps.Point( 16, 35 )
    );
    return image;
},
        
showVehicle: function(vehicle, index, array ) {
    if( !vehicle )
        return false;
    var gmappanel6 = this.gmappanel6;
    var controller = this.controller;
    var view = gmappanel6.up( 'smartpanicgpsview' );
    var center = view.down( 'button[action=center]' )._pressed;
    var clear = false;
    var marker = {};
    var pos = controller.getVehiclePosition( vehicle, gmappanel6 );
    var geocoder = gmappanel6.getGeocoder();
    var listeners = {};
    /*var listeners = {
        click: function(){
            view.fireEvent('vehicleSelected',this.record);
        }
    };*/
    if( pos.position ) {
        geocoder.geocode( {
            location: pos.position
        }, function( result, status ) {
            if( status == 'OK' ) {
                pos.address = result[ 0 ].formatted_address
                view.down( '#direccion' ).setValue( pos.address )
            }
            var infoHtml = controller.getVehicleInfoWindowHtml( vehicle, pos );
            if( typeof vehicle.markerIndex !== "undefined" && gmappanel6.cache.marker[ vehicle.markerIndex ] ) {
                // muevo el marker de lugar
                gmappanel6.cache.marker[ vehicle.markerIndex ].setPosition( pos.position );
                // lo muestro por si estaba oculto
                gmappanel6.cache.marker[ vehicle.markerIndex ].setMap( gmappanel6.getMap() );
                // cambio el icono por si se selecciono o no
                gmappanel6.cache.marker[ vehicle.markerIndex ].setIcon( controller.getMarkerIcon( pos, view ) );
                // cambio el contenido del marker
                gmappanel6.cache.infowindow[ vehicle.markerIndex ].setContent( infoHtml );
            } else {
                marker = {
                    lat: pos.lat,
                    lng: pos.long,
                    record: vehicle,
                    title: vehicle.get( 'Name' ),
                    icon: controller.getMarkerIcon( pos, view ),
                    infoWindow: {
                        content: infoHtml,
                        listener: 'mouseover',
                        disableAutoPan: true
                    },
                    draggable: false
                };
                gmappanel6.marker = gmappanel6.addMarker( pos.position, marker, clear, center, listeners );
                vehicle.markerIndex = gmappanel6.cache.marker.length - 1;
            }
        });
    }
},
        
showMarkerArray: function(gmappanel6, controller ) {
    var vehicles = [ gmappanel6.record ];
    var markers = gmappanel6.markerList;
    var view = gmappanel6.up( 'smartpanicgpsview' );
    // si se cerro la ventana freno la tarea
    if( !view || gmappanel6.restaurado ) {
        Ext.TaskManager.stop( {
            args: [ gmappanel6, controller ],
            run: this.showMarkerArray,
            interval: 3000
        });
        return false;
    }
    var dataPanel = Ext.getCmp( 'datapanel' );
    if( !vehicles || vehicles.length == 0 ) {
        dataPanel.hide();
        //view.doLayout();
    } else {
        gmappanel6.ultimasPosiciones.load( {
            callback: function( records, operation, success ) {
                Ext.Array.each( vehicles, controller.showVehicle, { gmappanel6: gmappanel6, controller: controller });
                var center = view.down( 'button[action=center]' )._pressed;
                if( center ) {
                    var bounds = controller.getBounds( gmappanel6.cache.marker );
                    if( bounds )
                        gmappanel6.getMap().fitBounds( bounds );
                }
            }
        })
        /*if (dataPanel.isHidden()){
            dataPanel.show();
            view.doLayout();
        }
        */
    }
},
        
        
getSmartPanicsInfoWindowHtml: function(smartpanic, view ) {
    var html = '\
                <div style="width:200px;height:100px;">\
                <H1>{dealer}-{ncuenta} {cuenta}</H1>\
                <!--span style="font-weight:bold;">Fecha:</span><span>  {fecha}</span><br/-->\
                <span style="font-weight:bold;">Usuario:</span><span>  {usuario}</span><br/>\
                </div>';
    //<span style="font-weight:bold;">Fecha SIS:</span><span>  {fecha}</span><br/>';
    html = html.replace( /\{dealer\}/, smartpanic.get( 'cue_clinea' ) );
    html = html.replace( /\{ncuenta\}/, smartpanic.get( 'cue_ncuenta' ) );;
    html = html.replace( /\{cuenta\}/, smartpanic.get( 'cue_cnombre' ) );
    html = html.replace( /\{usuario\}/, smartpanic.get( 'Nombre' ) );
    return html
},
        
getVehicleInfoWindowHtml: function(vehicle, pos ) {
    var html = '\
                <div style="width:200px;height:100px;">\
                <H1>{dealer}-{ncuenta} {cuenta}</H1>\
                <span style="font-weight:bold;">'+ getLocale( 'Dirección' ) + ':</span><span> {direccion}</span><br/>\
                <span style="font-weight:bold;">'+ getLocale( 'Fecha' ) + ':</span><span>  {fecha}</span><br/>\
                <span style="font-weight:bold;">'+ getLocale( 'Evento' ) + ':</span><span>  {evento}</span><br/>\
                </div>';
    //<span style="font-weight:bold;">Fecha SIS:</span><span>  {fecha}</span><br/>';
    html = html.replace( /\{dealer\}/, vehicle.get( 'cue_clinea' ) );
    html = html.replace( /\{ncuenta\}/, vehicle.get( 'cue_ncuenta' ) );
    html = html.replace( /\{nombre\}/, vehicle.get( 'Domain' ) );
    html = html.replace( /\{cuenta\}/, vehicle.get( 'cue_cnombre' ) );
    html = html.replace( /\{velocidad\}/, pos.gps.get( 'gps_iVelocidad' ) );
    html = html.replace( /\{direccion\}/, pos.address );
    html = html.replace( /\{evento\}/, pos.gps.get( 'cod_cdescripcion' ) );
    html = html.replace( /\{fechaRaw\}/, pos.gps.get( 'gps_tRawfechahora' ) );
    html = html.replace( /\{fecha\}/, Ext.Date.format( pos.gps.get( 'gps_isofechahora' ), 'd-m-Y H:i:s' ) );
    return html
},
        
getBounds: function(markers ) {
    if( !markers || markers.length == 0 ) {
        return null
    } else {
        var bounds = new google.maps.LatLngBounds();
        Ext.each( markers, function( marker, index, array ) {
            if( marker.getMap() )
                bounds.extend( marker.position );
        });
        return bounds
    }
},
        
showHistory: function(map, vehicle, event ) {

    var controller = this;



    var view = map.up( 'smartpanicgpsview' );
    view.storeGPSHistory.each( function( record ) {
        if( record.marker ) {
            record.marker.setMap( null )
        }
    })
    if( view.MOSTRARPOSICIONES == true ) {
        if( !view.historyLoading ) {
            view.historyLoading = true;
            view.storeGPSHistory.remoteFilter = false;
            view.storeGPSHistory.filter( [
                {
                    property: 'gps_cIMEI',
                    value: view.event.get( 'gps_cIMEI' ),
                    id: 'gps_cIMEI'
                }, /* 26/06/2024 Daniel O. Medina https://softguard.atlassian.net/browse/DK-190
                {
                    property: 'rec_iid:GT',
                    value: view.eventId - 1,
                    id: 'rec_iid:GT'
                }*/
            ], true )
            view.storeGPSHistory.remoteFilter = true;
            view.storeGPSHistory.load( {
                callback: function( records ) {
                    view.historyLoading = false;
                    //map.clearMarkers();
                    var primerEvento = view.storeGPSHistory.getAt( 0 )
                    map.primerEvento = primerEvento;
                    /*
                    if (myQueryString.eventType =='' || !myQueryString.eventType){
                        controller.setEventType(primerEvento, view);
                    }
                    */
                    var temp = controller.getHistoryMarkers( view.storeGPSHistory, vehicle, map );
                    var points = temp.points;
                    var markers = temp.markers;
                    //var fechaDesde = Ext.Date.format(points[0].fecha, 'Y-m-d H:i:s');
                    //var fechaHasta = Ext.Date.format(points[points.length -1].fecha, 'Y-m-d H:i:s');
                    //var center = bounds.getCenter();
                    //map.addPolyline(points);
                    map.addMarkers( markers );
                    ///Tomo ultima posicion y si no es igual a la anterio tomo la direccion tipo TEXT para mostrarla en el toolbar                
                    var ultimoPoint = points[ points.length - 1 ];
                    if( ultimoPoint && view.fechaUltimoPoint != ultimoPoint.lat + ultimoPoint.lng ) {
                        //console.log(ultimoPoint.lat+ultimoPoint.lng)
                        var geocoder = map.getGeocoder();
                        var point = new google.maps.LatLng( ultimoPoint.lat, ultimoPoint.lng );
                        geocoder.geocode( {
                            location: point
                        }, function( result, status ) {
                            if( status == 'OK' ) {
                                view.down( '#direccion' ).setValue( result[ 0 ].formatted_address )
                                view.fechaUltimoPoint = ultimoPoint.lat + ultimoPoint.lng
                            }
                        })
                    }
                    //var center = view.down('button[action=center]')._pressed;
                    //if (center){
                    /* var bounds = controller.getBounds(markers);
                    if (bounds)
                    map.getMap().fitBounds(bounds);
                    if (map.getMap().getZoom()>14){
                        map.getMap().setZoom(14)
                    }*/
                    // }
                }
            });
        }
    }
    var center = view.down( 'button[action=center]' )._pressed;
    if( center ) {
        controller.forceCenter( view )
    }
},
        
getHistoryMarkers: function(store, vehicle, map ) {
    var points = new Array();
    var markers = new Array();
    var controller = this;
    var secuencia = 0;
    store.each( function( record, index, total ) {
        if( record.get( 'rec_iid' ) != view.eventId ) {
            if( record.get( 'rxt_iSecuencia' ) < secuencia ) {
                return false
            } else {
                secuencia = record.get( 'rxt_iSecuencia' );
            }
            points.push( { lat: record.get( 'gps_rLatitud' ), lng: record.get( 'gps_rLongitud' ), fecha: record.get( 'gps_isofechahora' ) });
            markers.push( {
                marker: null,
                lat: record.get( 'gps_rLatitud' ),
                lng: record.get( 'gps_rLongitud' ),
                record: record,
                title: Ext.Date.format( record.get( 'gps_isofechahora' ), 'Y-m-d H:i:s' ),
                icon: controller.getHistoryMarkerIcon( index, total, null, record, map ),
                infoWindow: {
                    content: controller.getHistoryInfoWindowHtml( vehicle, record ),
                    listener: 'click'
                },
                draggable: false
            }
            );
            // agrego los circulos de la accuracy
            if( record.get( 'gps_rAccuracy' ) > 0 )
                controller.mostrarPrecision( record, map, controller );
            if( map.restaurado ) { return false; }
        }
    });
    if( markers.length > 0 ) {
        markers[ markers.length - 1 ].icon = new google.maps.MarkerImage(
            '/resources/softguard/images/finish.png',
            new google.maps.Size( 48, 48 ),
            new google.maps.Point( 0, 0 ),
            new google.maps.Point( 16, 35 )
        );
    }
    return { points: points, markers: markers }
},
        
getHistoryMarkerIcon: function(i, total, old, record, map ) {
    var selected = '';
    var iconUrl = '';
    //console.log(record.get('rec_calarma'));
    switch( i ) {
        case 0:
            var tipo = record.get( 'rec_czona' );
            var tipoIcon = '';
            switch( tipo ) {
                case "SP1":
                    tipoIcon = 'sos';
                    break;
                case "SP2":
                    tipoIcon = 'fire';
                    break;
                case "SP3":
                    tipoIcon = 'alarm';
            }
            var iconUrl = '/resources/softguard/images/mapguard-cservice/' + tipoIcon + '.png';
            var image = new google.maps.MarkerImage(
                iconUrl,
                new google.maps.Size( 48, 48 ),
                new google.maps.Point( 0, 0 ),
                new google.maps.Point( 16, 35 )
            );
            break;
        default:
            iconUrl = old ? '/resources/softguard/images/icon_dot_verde.gif' : '/resources/softguard/images/icon_dot-nonew.gif';
            var image = new google.maps.MarkerImage(
                iconUrl,
                new google.maps.Size( 10, 10 ),
                new google.maps.Point( 0, 0 ),
                new google.maps.Point( 5, 5 )
            );
            break;
    }
    return image;
},
        
mostrarPrecision: function(record, gmappanel6, controller ) {
    var me = controller;
    var color = 'Blue';
    var map = gmappanel6.getMap();
    var newShape = new google.maps.Circle( {
        strokeColor: color,
        fillOpacity: 0.1,
        strokeWeight: 1,
        zIndex: 0,
        fillColor: color
    });
    var center = new google.maps.LatLng(
        record.get( 'gps_rLatitud' ),
        record.get( 'gps_rLongitud' )
    );
    newShape.setCenter( center );
    newShape.setRadius( record.get( 'gps_rAccuracy' ) );
    newShape.setMap( map );
    gmappanel6.cache.circle.push( newShape );
},
        
getHistoryInfoWindowHtml: function(vehicle, gps ) {
    var html = '\
                <div style="width:220px;height:130px;">\
                <H1>{dealer}-{ncuenta} {cuenta}</H1>\
                <span style="font-weight:bold;">{lblfecha}:</span><span>  {fecha}</span><br/>\
                <span style="font-weight:bold;">{lbldireccion}:</span><span>  {direccion}</span><br/>\
                <span style="font-weight:bold;">{lblevento}:</span><span>  {evento}</span><br/>\
                <span style="font-weight:bold;">{lblprecision}:</span><span>  {precision}</span><br/>\
                </div>';
    //html = html.replace(/\{lblVelocidad\}/, getLocale('Velocidad'));
    html = html.replace( /\{lblfecha\}/, getLocale( 'Fecha' ) );
    html = html.replace( /\{lbldireccion\}/, getLocale( 'Dirección' ) );
    html = html.replace( /\{lblevento\}/, getLocale( 'Evento' ) );
    html = html.replace( /\{lblprecision\}/, getLocale( 'Precisión' ) );
    html = html.replace( /\{dealer\}/, vehicle.get( 'cue_clinea' ) );
    html = html.replace( /\{ncuenta\}/, vehicle.get( 'cue_ncuenta' ) );
    html = html.replace( /\{nombre\}/, vehicle.get( 'Domain' ) );
    html = html.replace( /\{cuenta\}/, vehicle.get( 'cue_cnombre' ) );
    //html = html.replace(/\{velocidad\}/, gps.get('gps_iVelocidad'));
    html = html.replace( /\{direccion\}/, gps.get( 'gps_cDireccion' ) );
    html = html.replace( /\{fecha\}/, Ext.Date.format( gps.get( 'gps_isofechahora' ), 'Y-m-d H:i:s' ) );
    html = html.replace( /\{evento\}/, gps.get( 'cod_cdescripcion' ) );
    html = html.replace( /\{precision\}/, gps.get( 'gps_rAccuracy' ) );
    return html
},
        
getCuentaInfoWindowHtml: function(record ) {
    var html = '\
                <div>\
                <H1>{dealer}-{ncuenta} {cuenta}</H1>\
                <!--span style="font-weight:bold;">Dirección:</span><span> {direccion}</span><br/-->\
                <span style="font-weight:bold;">'+ getLocale( 'Fecha' ) + ':</span><span>  {fecha}</span><br/>\
                <span style="font-weight:bold;">'+ getLocale( 'Evento' ) + ':</span><span>  {evento}</span><br/>\
                <span style="font-weight:bold;">'+ getLocale( 'Usuario' ) + ':</span><span>  {usuario}</span><br/>\
                </div>';
    //<span style="font-weight:bold;">Fecha SIS:</span><span>  {fecha}</span><br/>';
    html = html.replace( /\{dealer\}/, record.get( 'cue_clinea' ) );
    html = html.replace( /\{ncuenta\}/, record.get( 'cue_ncuenta' ) );
    html = html.replace( /\{nombre\}/, record.get( 'Domain' ) );
    html = html.replace( /\{cuenta\}/, record.get( 'cue_cnombre' ) );
    html = html.replace( /\{velocidad\}/, record.get( 'gps_iVelocidad' ) );
    html = html.replace( /\{usuario\}/, record.get( 'usu_cnombre' ) );
    //html = html.replace(/\{direccion\}/, record.address);
    html = html.replace( /\{evento\}/, record.get( 'cod_cdescripcion' ) );
    html = html.replace( /\{fechaRaw\}/, record.get( 'gps_tRawfechahora' ) );
    var fecha = record.get( 'rec_isofechahora' );
    if( record.get( 'rec_isoFechaHora' ) ) {
        fecha = record.get( 'rec_isoFechaHora' );
    }
    html = html.replace( /\{fecha\}/, Ext.Date.format( fecha, 'd-m-Y H:i:s' ) );
    return html
},
        
mostrarGeocercas: function(map, record, view ) {
    var controller = this;
    var store = Ext.create( 'Ext.data.Store', {
        model: this.getImeiGeofenceModelModel(),
        remoteFilter: true,
        filters: [
            {
                property: 'Imei',
                value: view.event.get( 'gps_cIMEI' )
            }
        ]
    });
    store.load( {
        callback: function( records, operation, success ) {
            Ext.Array.each( records, controller.mostrarGeocerca, { gmappanel6: map, controller: controller, view: view });
            controller.forceCenter( view )
        }
    });
},
        
mostrarGeocerca: function(record, index, array ) {
    var controller = this.controller;
    var me = this.controller;
    var map = this.gmappanel6;
    var gmappanel6 = this.gmappanel6;
    var metadata = Ext.create( me.getGeocercaMapModelModel() );
    var tipo = record.get( 'GeoType' );
    var color = '';
    var view = this.view
    if( tipo == 'E' ) {
        color = 'Red';
    } else if( tipo == 'I' ) {
        color = 'Green';
    } else {
        color = 'Yellow';
    }
    metadata.data = Ext.JSON.decode( record.get( 'MetaData' ) ).data;
    if( metadata.get( 'Type' ) == 'circle' ) {
        var newShape = new google.maps.Circle( {
            clickable: true,
            strokeColor: color,
            fillColor: color
        });
        var center = new google.maps.LatLng(
            metadata.get( 'CenterLat' ),
            metadata.get( 'CenterLng' )
        );
        newShape.setCenter( center );
        newShape.setRadius( metadata.get( 'Radius' ) );
        controller.createGeofenceInfowindow( map, newShape, controller.getGeofenceHtml( record ) );
        newShape.setMap( map );
        gmappanel6.geocerca = newShape;
        var bounds = newShape.getBounds();
        if( bounds )
            map.fitBounds( bounds );
        view.geocercaArray.push( newShape )
    }
    if( metadata.get( 'Type' ) == 'polygon' ) {
        var newShape = new google.maps.Polygon( {
            strokeColor: color,
            fillColor: color
        });
        var pathArray = Ext.JSON.decode( metadata.get( 'Path' ) );
        var path = new google.maps.MVCArray();
        Ext.Array.each( pathArray, function( item ) {
            var latlng = new google.maps.LatLng(
                item.lat,
                item.lng
            )
            path.push( latlng );
        });
        newShape.setPath( path );
        newShape.setMap( map );
        gmappanel6.geocerca = newShape;
        var bounds = newShape.getBounds();
        if( bounds )
            map.fitBounds( bounds );
        view.geocercaArray.push( newShape )
    }
},
        
createGeofenceInfowindow: function(map, circle, info ) {
    var infowindow = new google.maps.InfoWindow( {
        content: info
    });
    google.maps.event.addListener( circle, 'mouseover', function( ev ) {
        // alert(infowindow.content);
        infowindow.setPosition( circle.getCenter() );
        infowindow.open( map );
    });
    google.maps.event.addListener( circle, 'mouseout', function( ev ) {
        infowindow.close();
    });
},
        
getGeofenceHtml: function(record ) {
    var html = '\
                <div style="width:150px;height:50px;">\
                <H1>{Name}</H1>\
                <!--span style="font-weight:bold;">{lbltype}:</span-->\
                <span>  {geotype}</span><br/>\
                </div>';
    var geotype = "";
    var tipo = record.get( 'GeoType' );
    if( tipo == 'E' ) {
        geotype = 'Exclusión';
    } else if( tipo == 'I' ) {
        geotype = 'Inclusión';
    } else {
        geotype = 'Exclusión e Inclusión';
    }
    html = html.replace( /\{lbltype\}/, getLocale( 'Geocerca de ' ) );
    html = html.replace( /\{geotype\}/, getLocale( geotype ) );
    html = html.replace( /\{Name\}/, record.get( 'Name' ) );
    return html
}
});
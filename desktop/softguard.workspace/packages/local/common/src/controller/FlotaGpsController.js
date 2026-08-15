//MIGRADO2024
function replaceSpecialChars( str ) {
    var replacements = {
        '&#225;': 'á',
        '&#233;': 'é',
        '&#237;': 'í',
        '&#243;': 'ó',
        '&#250;': 'ú',
        // Agrega más reglas de reemplazo según sea necesario
    };
    for( var key in replacements ) {
        var regex = new RegExp( key, 'g' );
        str = str.replace( regex, replacements[ key ] );
    }
    return str;
}
Ext.define( 'Common.controller.FlotaGpsController', {
    extend: 'Ext.app.Controller',
    stores: [ 'Common.store.TrackGuardMonitoreoSecurityModuleStore' ],
models: [ 'VehicleGpsModel', 'VehicleModel', 'GeocercaMapModel', 'GpsHistoricoSearchModel', 'SecurityModulesModel', 'VehicleSearchModel' ],
views: [ 'FlotaGpsView' ],
id: 'FlotaGpsController',
    refs: [
        {
            ref: 'myView',
            selector: 'flotagpsview'
        }
    ],
        init : function(config ) {
            this.control( {
                'flotagpsview gmappanel': {
                    mapready: this.onMapReady,
                    // beforerender : this.prepareMap,
                    markersChange: this.onMarkersChange,
                    manualcenter: this.onManualCenter
                },
                'flotagpsview': {
                    afterrender: this.initView,
                    vehicleSelected: this.onVehicleSelected
                },
                'flotagpsview #btnMapmaker': {
                    toggle: this.onMapmakerToggle
                },
                'flotagpsview #btnOsm': {
                    toggle: this.onOsmToggle
                },
                'flotagpsview #btnAddress': {
                    click: this.onAddressClick
                }/*,
            'flotagpsview #datapanel' : {
                afterrender : this.initDatapanel,
                beforerender: this.beforeInit
            }*/,
                'flotagpsview button[action=center]': {
                    click: this.onCenterClick
                },
                /*'flotagpsview #menudispositivos' : {
                    click : this.onMenuDispositivosClick
                },*/
                'flotagpsview #enmovimiento': {
                    click: this.onFiltersClick
                },
                'flotagpsview #frenado': {
                    click: this.onFiltersClick
                },
                'flotagpsview #viejas': {
                    click: this.onFiltersClick
                },
                'flotagpsview #conalarma': {
                    click: this.onFiltersClick
                },
                //'flotagpsview #flotagridview' : {
                'flotagpsview': {
                    // selectionchange : this.onSelectionChange,
                    //markersGeoJsonChange : this.onMarkersGeoJsonChange,
                    setUrlGeoJson: this.onSetUrlGeoJson
                },
                'flotagpsview #mostraretiquetas': {
                    click: this.onMostrarEtiquetaClick
                }

            });
        }, // cierro init


onMostrarEtiquetaClick: function (btn ) {
    var view = btn.up( 'flotagpsview' )
    this.onMarkersGeoJsonChange( view )

},
    
onSetUrlGeoJson: function (url, view, forceLoad ) {

    if( !url ) {
        var dateNow = new Date();
        var urlgeojson = '/handler/dispositivosGeoJson';
        urlgeojson += '?token=' + Ext.util.Cookies.get( 'OAuth_Token' );
        urlgeojson += "&_dc=" + dateNow.getTime();
        // urlgeojson += '&showState='+Ext.encode(['enmovimeinto','frenado','alarma']);
        urlgeojson += '&filter=' + Ext.encode( [ { "Id": "stateIN", "property": "stateIN", "value": "enmovimeinto,frenado,alarma" }] );
        //urlgeojson += '[{"Id":"Situacion","property":"Situacion","value":"Habilitada"}]'; //anuluar luego esta línea y activar la otra
        console.log('Pasa por el if que dice que no hay url y se pasa al final la url: '+urlgeojson);

        

        view.urlGeoJson = urlgeojson
    } else {
        view.urlGeoJson = url
    }
    if( forceLoad ) {
        /*****************
            Daniel O. Medina 08/05/2024
            estas líneas son para limpiar el mapa
            para que luego se cargue lo que corresponda
            según esté filtrado o no.
        ***********/
        console.log('Limpiando features del mapa');
        var gmappanel = view.down( '#googlemap' );
        if(gmappanel.dispositivos)
           gmappanel.dispositivos.forEach( function( feature ) {
                                
                                gmappanel.dispositivos.remove( feature )
                            });
        /*********************************** */

        if(gmappanel.dispositivos)//BLOQUE NUEVO
            gmappanel.dispositivos.setMap(null);
        this.onMarkersGeoJsonChange( view )
        
        
    }
},


    
    
centerMapGeojson: function(layer, gmappanel ) {
    var bounds = new google.maps.LatLngBounds();
    var count = 0;

    layer.forEach( function( feature ) {
        bounds.extend( new google.maps.LatLng( feature.getGeometry().get().lat(), feature.getGeometry().get().lng() ) );
        count++;
    })

    if( count > 0 ) {
        var map = gmappanel.getMap();
        var lastzoom = map.getZoom();

        setTimeout( function() {
            // 02-01 : Se encuentra comentado y no centra el mapa. Se descomenta por Juan, pedido de Rodrigo. A chequear Adrian
            map.panToBounds( bounds );
            map.fitBounds( bounds );
            if( map.getZoom() == 0 ) {
                map.setZoom( lastzoom );
            }
        }, 1000 );
    }
},
    
onMarkersGeoJsonChange: function(view, ultimos ) {

    
    // si el mapa no esta visible, no actualizo ni cargo nada.
    if( !view.isVisible() ) {
        return;
    }
    var loading = view.down( '#loadingmap' );
    loading.show();
    //cuando esta definido ultimo en true, intenta enviar la ultima fecha de load

    var controller = this;
    if( view ) {
        var gmappanel = view.down( '#googlemap' );

     
        /*****************
            Daniel O. Medina 08/05/2024
            estas líneas son para limpiar el mapa
            para que luego se cargue lo que corresponda
            según esté filtrado o no.
        ***********
        console.log('Limpiando features del mapa');
        var gmappanel = view.down( '#googlemap' );
        if(gmappanel.dispositivos)
            gmappanel.dispositivos.forEach( function( feature ) {
                                gmappanel.dispositivos.remove( feature )
                            });
        *********************************** */

        //volver atrás gmappanel.dispositivos = null;
        var urlParametroUltimaCarga = '';
        if( gmappanel.dispositivos ) {
            //cuando gmappanel.dispositivos esta en true aplico filtro de ultima llamada para traer solo los registros que se actualizaron
           
            if( ultimos ) {
                //tomo fecha y armao string para filtro
                if( view.ultimaCarga ) {
                    urlParametroUltimaCarga = '&ultimaCarga=' + Ext.Date.format( view.ultimaCarga, 'Y-m-d g:i' )
                }
                view.ultimaCarga = new Date();
            }

            if( view.geojsonAjax && ( typeof view.geojsonAjax.isLoading !== "undefined" ) && view.geojsonAjax.isLoading() ) {
                return false;
            }

            // DEDALO 2024/07/7 hay errores aleatorios que no se ven los dispositivos en el mapa, se toma el camino de recargar, posiblemente lo ideal seria volver al ajax y mover el marker que ya existe.
            gmappanel.dispositivos.loadGeoJson( view.urlGeoJson+ urlParametroUltimaCarga, null, function( features ) {
             
                if(features.length == 0)
                    console.log('view.urlGeoJson: '+view.urlGeoJson+' trayendo CERO features');
                console.log('Cantidad de features devueltos: '+features.length);

                if( features.length > 50 ) {
                    //notify('Puede sufrir decremento de performance. Intente deshabilitar las etiquetas.')
                    if(view.down( '#mostraretiquetas' ))
                        view.down( '#mostraretiquetas' ).toggle( false );
                }
                gmappanel.dispositivos.setMap( gmappanel.getMap() );
                //  loading.hide();
            });
            
            view.geojsonAjax = Ext.Ajax.request( {
                url: view.urlGeoJson + urlParametroUltimaCarga,
                success: function( response, opts ) {
                    var obj = Ext.decode( response.responseText );

                    if( !ultimos ) {
                        //elimino los features
                        gmappanel.dispositivos.forEach( function( feature ) {
                            gmappanel.dispositivos.remove( feature )
                        })
                    } else {
                        //elimino solo los features que llegan
                        for( var i in obj.features ) {
                            gmappanel.dispositivos.forEach( function( feature ) {
                                if( feature.getProperty( "cue_iid" ) == obj.features[ i ].properties.cue_iid ) {
                                    gmappanel.dispositivos.remove( feature )
                                }
                            })
                        }
                    }


                    if( obj.features.length > 0 ) {
                        if( obj.features.length > 50 && view.down( '#mostraretiquetas' ).pressed && getParametro( 'LABELMOVILTRACKVIEW' ) ) {
                            notify( 'Puede sufrir decremento de performance. Intente deshabilitar las etiquetas.' )
                        }
                        gmappanel.dispositivos.addGeoJson( obj )
                        if( view.down( '#centerBtn' )._pressed ) {
                            controller.centerMapGeojson( gmappanel.dispositivos, gmappanel )
                        }

                    } else {

                        loading.hide();

                    }
                }
            });
        } else {
            
            if(view.first){
                if( ultimos ) {
                    //tomo fecha y armao string para filtro
                    if( view.ultimaCarga ) {
                        urlParametroUltimaCarga = '&ultimaCarga=' + Ext.Date.format( view.ultimaCarga, 'Y-m-d g:i' )
                        
                    }
                    view.ultimaCarga = new Date();
                }            
            }



            view.first = true;
            if( view.ocultarFlotagridview ) {
                view.down( '#west' ).hide();
            }
            try {   //Daniel O. Medina. 24/04/2023 try/catch agregado para evitar posible error
                //en cliente donde no se cargue de entrada el mapa con los móviles           
                gmappanel.dispositivos = new google.maps.Data();
            } catch( error ) {
                console.log( error );
                return;
            }
            gmappanel.dispositivos.loadGeoJson( view.urlGeoJson+urlParametroUltimaCarga, null, function( features ) {
                if(features.length == 0)
                    console.log('view.urlGeoJson: '+view.urlGeoJson+urlParametroUltimaCarga+' trayendo CERO features');                
                if( features.length > 50 ) {
                    //notify('Puede sufrir decremento de performance. Intente deshabilitar las etiquetas.')
                    if(view.down( '#mostraretiquetas' ))
                        view.down( '#mostraretiquetas' ).toggle( false );
                }

                //  loading.hide();

                /********Daniel O. Medina  15/05/2024 esta sección estaba fuera del loadGeoJson************** */
                gmappanel.dispositivos.setStyle( { visible: true });
                gmappanel.dispositivos.setStyle( function( feature ) {

                    if( view.down( '#mostraretiquetas' ) && view.down( '#mostraretiquetas' ).pressed && getParametro( 'LABELMOVILTRACKVIEW' ) ) {
                        return {
                            icon: {
                                url: feature.getProperty( 'icon' ),
                                labelOrigin: new google.maps.Point( 10, 50 )
                            },
                            title: controller.replaceSpecialChars( feature.getProperty( 'label' ) ),
                            label: {
                                color: "#333",
                                fontFamily: "tahoma, arial",
                                fontSize: "12px",
                                fontWeight: "bold",
                                text: controller.replaceSpecialChars( feature.getProperty( 'label' ) )
                            }
                        };
                    } else {
                        return {
                            icon: {
                                url: feature.getProperty( 'icon' ),

                            },
                            title: feature.getProperty( 'label' ),
                            label: null
                        };
                    }
                });

                gmappanel.dispositivos.setMap( gmappanel.getMap() );

                gmappanel.dispositivos.addListener( 'addfeature', function( event ) {
                    loading.hide();
                });
                gmappanel.dispositivos.addListener( 'mouseover', function( event ) {
                    var address = '';
                    var infoRecord = getProperties( event.feature );

                    if( gmappanel.infowindowOpened ) {
                        gmappanel.infowindowOpened.close();
                    }

                    gmappanel.infowindowOpened = new google.maps.InfoWindow( {
                        pixelOffset: new google.maps.Size( 0, -60 )
                    });

                    gmappanel.infowindowOpened.setContent( controller.getVehicleInfoWindowHtmlGeoJson( infoRecord, address ) )

                    //busco la direccion
                    var geocoder = view.down( 'gmappanel' ).getGeocoder();
                    geocoder.geocode( {
                        location: event.feature.getGeometry().get()
                    }, function( result, status ) {
                        if( status == 'OK' && result.length > 0 ) {
                            address = result[ 0 ].formatted_address;

                            //actualizo contenido
                            gmappanel.infowindowOpened.setContent( controller.getVehicleInfoWindowHtmlGeoJson( infoRecord, address ) )
                        } else {
                            gmappanel.infowindowOpened.setContent( controller.getVehicleInfoWindowHtmlGeoJson( infoRecord, '' ) )
                        }
                    });

                    Ext.Ajax.request( {
                        url: '/rest/search/vehicle',
                        method: 'GET',
                        params: { filter: Ext.encode( [ { "Id": "cue_cimei", "property": "cue_cimei", "value": event.feature.getProperty( "cue_cimei" ) }] ) },
                        success: function( response, opts ) {
                            var obj = Ext.decode( response.responseText );
                            infoRecord = obj.rows[ 0 ]
                            gmappanel.infowindowOpened.setContent( controller.getVehicleInfoWindowHtmlGeoJson( obj.rows[ 0 ], address ) )
                        }
                    })

                    gmappanel.infowindowOpened.setPosition( event.feature.getGeometry().get() );
                    gmappanel.infowindowOpened.open( gmappanel.getMap() );

                });

                gmappanel.dispositivos.addListener( 'mouseout', function( event ) {
                    gmappanel.infowindowOpened.close();
                });                

                gmappanel.dispositivos.addListener( 'click', function( event ) {
                    var tabpanel = view.up( 'tabpanel' );


                    var store = Ext.create( 'Ext.data.Store', {
                        model: controller.getVehicleSearchModelModel(),
                        remoteFilter: true,
                        pageSize: 2000,
                        sorters: [
                            {
                                property: 'Name',
                                direction: 'ASC'
                                //,root: 'data'
                            }
                        ],
                        filters: [ { "Id": "cue_cimei", "property": "cue_cimei", "value": event.feature.getProperty( "cue_cimei" ) }]
                    }).load( {
                        callback: function( records ) {

                            var title = records[ 0 ].get( 'cue_clinea' ) + "-" + records[ 0 ].get( 'cue_ncuenta' ) + " " + records[ 0 ].get( 'cue_cnombre' );

                            var tab = tabpanel.add( Ext.widget( 'vehicleslavegpsview', {
                                title: title,
                                translate: false,
                                record: records[ 0 ],
                                center: event.feature.getGeometry().get().lat() + ',' + event.feature.getGeometry().get().lng(),
                                closable: true,
                                closeAction: 'destroy'
                            }) );

                            tabpanel.setActiveTab( tab );

                        }
                    })
                });                

                /********************************************* */
            });

            


         }
    }
},
    
getVehicleInfoWindowHtmlGeoJson: function(vehicle, address, waitResolution ) {
    var html = '\
            <div style="width:550px;">\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            <h2>{nombre}</h2>\
            ';

    html += '\
                <table>';
    if( address ) {

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
                           ';
    if( vehicle && vehicle.gps_iBattery && vehicle.gps_iBattery != 0 && vehicle.gps_iBattery != '' ) {
        html += '<span style="font-weight:bold;">{lblBateria}:</span><span>  {bateria}</span><br/>';
    }
    html += '\
                        </td>\
                    </tr>\
                    ';

    html += '</table>';


    // traducciones
    html = html.replace( /\{lblBateria\}/, getLocale( 'Bateria' ) );
    html = html.replace( /\{lblVelocidad\}/, getLocale( 'Velocidad' ) );
    html = html.replace( /\{lblDireccion\}/, getLocale( 'Dirección' ) );
    html = html.replace( /\{lblFechaRecepcion\}/, getLocale( 'Fecha recepción' ) );
    html = html.replace( /\{lblFechaGPS\}/, getLocale( 'Fecha Gps' ) );
    html = html.replace( /\{lblFechaAlerta\}/, getLocale( 'Fecha Alerta' ) );
    html = html.replace( /\{lblUltAlerta\}/, getLocale( 'Ult. Alerta' ) );
    html = html.replace( /\{lblLatitud\}/, getLocale( 'Latitud' ) );
    html = html.replace( /\{lblLongitud\}/, getLocale( 'Longitud' ) );
    html = html.replace( /\{lblOdometro\}/, getLocale( 'Odómetro' ) );

    // TENER EN CUENTA
    // el unico objeto qeu tiene los valores actualizados es POS
    //sta_dFechaUltimaAlerta
    /*if(vehicle) {
        if(vehicle.rec_cdll == "MeitrackPacketParser") {
            html = html.replace(/\{bateria\}/, (vehicle.gps_iBattery/100));
        } else {
            html = html.replace(/\{bateria\}/, vehicle.gps_iBattery);
        }
    }*/



    //TODO: mejorar como sabe si estar cargando la info completa
    if( vehicle && vehicle.Domain == undefined ) {
        var cargando = getLocale( 'Cargando...' )
    } else {
        var cargando = '';
    }
    if( vehicle ) {
        html = html.replace( /\{dealer\}/, vehicle.cue_clinea );
        html = html.replace( /\{ncuenta\}/, vehicle.cue_ncuenta );
        html = html.replace( /\{nombre\}/, vehicle.Domain ? vehicle.Domain : cargando );
        html = html.replace( /\{cuenta\}/, vehicle.cue_cnombre ? vehicle.cue_cnombre : cargando );
        html = html.replace( /\{velocidad\}/, vehicle.gps_iVelocidad ? vehicle.gps_iVelocidad : cargando );
        html = html.replace( /\{direccion\}/, address );
        html = html.replace( /\{bateria\}/, vehicle.gps_iBattery ? vehicle.gps_iBattery : cargando );
        html = html.replace( /\{fechaRaw\}/, vehicle.gps_tRawfechahora ? Ext.Date.format( new Date( vehicle.gps_tRawfechahora ), 'd-m-Y H:i:s' ) : cargando );
        html = html.replace( /\{fecha\}/, vehicle.gps_isofechahora ? Ext.Date.format( new Date( vehicle.gps_isofechahora ), 'd-m-Y H:i:s' ) : cargando );
        html = html.replace( /\{fechaAlerta\}/, vehicle.sta_dfechaultimaalerta ? Ext.Date.format( new Date( vehicle.sta_dfechaultimaalerta ), 'd-m-Y H:i:s' ) : cargando );
        html = html.replace( /\{alerta\}/, vehicle.sta_cultimaalerta ? vehicle.sta_cultimaalerta + '-' + vehicle.cod_cdescripcion : cargando );
        html = html.replace( /\{latitud\}/, vehicle.gps_rLatitud ? vehicle.gps_rLatitud : cargando );
        html = html.replace( /\{longitud\}/, vehicle.gps_rLongitud ? vehicle.gps_rLongitud : cargando );
        html = html.replace( /\{odometro\}/, vehicle.gps_iOdometro ? vehicle.gps_iOdometro : cargando );
    }
    return html
},
    
    
    
onManualCenter: function(gmappanel ) {
    var view = gmappanel.up( 'flotagpsview' );
    var btn = view.down( 'button[action=center]' );

    if( btn._pressed ) {
        btn.btnEl.dom.click();
        //btn.fireEvent('click', btn);
    }
},
    
    
initView: function (view ) {
    this.view = view;

    if( !getParametro( 'LABELMOVILTRACKVIEW' ) ) {
        view.down( '#mostraretiquetas' ).hide()
    }
},
    
    
onFiltersClick: function (btn ) {
    var controller = this;
    var view = btn.up( 'flotagpsview' );
    var gmappanel = view.down( 'gmappanel' );
    controller.showMarkerArray( gmappanel, controller );
},
    
    
onCenterClick: function (btn ) {
    var view = btn.up( 'flotagpsview' );

    if( !btn._pressed ) {
        btn.setText( getLocale( 'Cambiar a Manual' ) );
        this.loadData( view.down( 'gmappanel' ), this );
        btn._pressed = true;
    } else {
        btn.setText( getLocale( 'Cambiar a Centrar' ) );
        btn._pressed = false
    }

},
    
beforeInit: function (view ) {

},
    
    
onClickSearchAll: function (view ) {
    var view = view.up( 'flotagpsview' ) ? view.up( 'flotagpsview' ) : view;
    var store = Ext.create( 'Ext.data.Store', {
        model: this.getVehicleSearchModelModel(),
        remoteFilter: true,
        pageSize: 2000,
        sorters: [
            {
                property: 'Name',
                direction: 'ASC'
                //,root: 'data'
            }
        ],
        filters: [ { "Id": "Situacion", "property": "Situacion", "value": "Habilitada" }]
    });
    var controller = this;

    store.load( {
        params: {
            short: true
        },
        callback: function( records, operation, success ) {

            var gmappanel = view.down( 'gmappanel' );
            //console.log(gmappanel);
            view.recordsInicial = records.slice( 0, 50 );


            controller.onMarkersChange( gmappanel, view.recordsInicial );
            view.totalDispositivos = records.length;
            controller.cambiarContador( view );
        }
    });
},

onMapReady: function(gmappanel ) {
    var controller = this;
    //var task = new Ext.util.DelayedTask(function(){
        //your loading panel2 with heavy data goes here
   //      console.log('Delay finalizado: ',new Date());   

 //------------------------------


    var view = gmappanel.up( 'flotagpsview' );
    view.cantidadDispositivos = 0;

    //defino URL para el GEOJSON
    // puede venir como parametro con lista de vehiculos.
    if( view.urlGeoJson ) {
        controller.onSetUrlGeoJson( view.urlGeoJson, view, true )
    } else {
        controller.onSetUrlGeoJson( '', view )
    }

    view.all = true;

    var map = gmappanel.getMap();

    if( UiApplicationMetadata.Kml ) {
        var kml = new google.maps.KmlLayer( {
            url: UiApplicationMetadata.Kml
        });
        kml.setMap( map );
    }

    if( UiApplicationMetadata.MapType ) {
        map.setMapTypeId( UiApplicationMetadata.MapType );
    }

    var refresco = getParametro( 'TIEMPOREFRESHALL' )
    if( !refresco ) {
        refresco = 15;
    }

    //this.loadData(gmappanel,this);
    var runner = new Ext.util.TaskRunner();
    view.player = runner.newTask( {
        args: [ gmappanel, controller ],
        run: controller.loadData,
        interval: refresco * 1000
    });

    view.player.start();
    view.velocidad = refresco * 1000;
    gmappanel.tiempogps = getParametro( 'TIEMPOGPS' )
    gmappanel.tg_tiempovidaalarma = getParametro( 'TG_TIEMPOVIDAALARMA' )

    var border = view.getLayout();
    var dispPanel = view.down( '#dispositivos' );

    if( view.eventId ) {
        // llamo a mostrar el historial.
        var vehicle = view.vehicleSelected;
        controller.showHistory( gmappanel, vehicle, view.eventId );
        console.log( "vehicle", vehicle )
        controller.mostrarGeocercas( gmappanel.getMap(), vehicle );
    }

    //se toma el parametro del sistema para remplazar los valores
    view.labelConfig = '{cue_clinea}-{cue_ncuenta} {Domain}';

    var labelparam = getParametro( 'LABELMOVILTRACKGUARD' );
    if( labelparam && labelparam != '' ) {
        view.labelConfig = labelparam;
    }
    //-----------------------
    //});
    //start the task after 500 miliseconds
    //task.delay(1000);   
    //Ext.Function.defer( view.player.start(), 5000, this );
},
    
onMapmakerToggle: function(btn, pressed, options ) {
    var view = btn.up( 'flotagpsview' );
    var gmappanel = view.down( 'gmappanel' );

    gmappanel.getMap().setOptions( { mapMaker: pressed });

},
    
onOsmToggle: function(btn, pressed, options ) {
    var view = btn.up( 'flotagpsview' );
    var gmappanel = view.down( 'gmappanel' );

    gmappanel.getMap().setOptions( { mapMaker: pressed });
},

onGeoGroupClick: function() {
    console.log( "aqui" );
},

onMarkersChange: function(gmappanel, vehiclelist ) {
    if( vehiclelist.filter ) {
        gmappanel.vehicleList = vehiclelist.filter( function( v, index, array ) {
            if( v.get( 'est_nestado' ) == 2 ) {
                //notifyError('La cuenta '+v.get('cue_cnombre')+' no se encuentra habilitada.');
                return false;
            } else {
                return true;
            }

        });
    }

    var view = gmappanel.up( 'flotagpsview' );
    view.cantidadDispositivos = vehiclelist.length;

    this.cambiarContador( view );
    view.vehicles = vehiclelist;
    this.cleanSelected( view );
    gmappanel.clearMarkers();
    this.loadData( gmappanel, this );
},
    
    
onMenuDispositivosClick: function(button ) {
    var view = button.up( 'flotagpsview' );
    this.cambiarContador( view );
},
    
cambiarContador: function (view ) {
    if( view.down( '#dispositivos-todos' ).pressed ) {
        if( view.totalDispositivos ) {
            view.down( 'flotagridview' ).setTitle( getLocale( 'Dispositivos Seleccionados / Total: ' ) + view.cantidadDispositivos + ' / ' + view.totalDispositivos )
            view.down( '#menudispositivos' ).setText( getLocale( 'Dispositivos Seleccionados / Total: ' ) + view.cantidadDispositivos + ' / ' + view.totalDispositivos )
        } else if( view.cantidadDispositivos ) {
            view.down( 'flotagridview' ).setTitle( getLocale( 'Dispositivos Seleccionados: ' ) + view.cantidadDispositivos )
            view.down( '#menudispositivos' ).setText( getLocale( 'Dispositivos Seleccionados: ' ) + view.cantidadDispositivos )
        }
    } else if( view.down( '#dispositivos-todos' ).pressed ) {
        view.down( 'flotagridview' ).setTitle( getLocale( 'Todos los dispositivos' ) )
        view.down( '#menudispositivos' ).setText( getLocale( 'Todos los dispositivos' ) )
    } else {
        view.down( 'flotagridview' ).setTitle( getLocale( 'Dispositivos' ) )
        view.down( '#menudispositivos' ).setText( getLocale( 'Dispositivos' ) )
    }

},
    
onAddressClick: function(button ) {
    var form = button.up( 'form' );
    var view = button.up( 'flotagpsview' );
    var map = view.down( '#googlemap' );
    var geocoder = map.getGeocoder();
    var addressField = view.down( '#address' );
    var myAddr = addressField.getValue();

    geocoder.geocode( {
        address: myAddr
    }, function( result, status ) {
        if( status == 'OK' ) {
            var location = result[ 0 ].geometry.location;
            var pos = new google.maps.LatLng( location.lat, location.lng );


            var marker = new google.maps.Marker( {
                position: pos,
                map: map.getMap(),
                title: myAddr
            });

            map.getMap().setCenter( pos );
            map.getMap().setZoom( 14 );
        }
    });
},
    
getVehiclePosition: function(vehicle, gmappanel ) {
    var store = gmappanel.ultimasPosiciones;
    if( store ) {
        var record = store.getAt( store.find( 'gps_idCuenta', vehicle.get( 'cue_iid' ), 0, false, false, true ) );
        if( record ) {
            vehicle.gpsRecord = record;
            vehicle.currentPositioRecord = record;
            var mylat = record.get( 'gps_rLatitud' ).replace( /,/g, '.' );
            var mylong = record.get( 'gps_rLongitud' ).replace( /,/g, '.' );
            var point = new google.maps.LatLng( mylat, mylong );
            vehicle.currentPositioRecord = record;
            return { lat: mylat, long: mylong, position: point, gps: record };
        } else return { lat: '', long: '', position: null }
    }
},
    
getMarkerIcon: function(vehicle, gmappanel ) {
    var color = '';
    var store = gmappanel.ultimasPosiciones;
    var record = store.getAt( store.find( 'gps_idCuenta', vehicle.get( 'cue_iid' ), 0, false, false, true ) );
    var now = new Date();
    var ageAlarma = ( now - record.get( 'sta_dFechaUltimaAlerta' ) ) / 60000;
    var ageGps = ( now - record.get( 'gps_isofechahora' ) ) / 60000;


    if( vehicle.selected ) {
        if( ageAlarma < gmappanel.tg_tiempovidaalarma ) {
            color = '_red';
            vehicle.isAlarma = true;
        }
        else {
            color = '_active'
            vehicle.isAlarma = false;
        }
    } else if( ageAlarma < gmappanel.tg_tiempovidaalarma ) {
        color = '_alert'
        vehicle.isAlarma = true;
    };

    if( ageGps > gmappanel.tiempogps ) {
        iconUrl = '/resources/softguard/images/exclamacion' + color + '.png';
        vehicle.isVieja = true;
    } else {
        vehicle.isAlarma = false;
        if( record.get( 'gps_iVelocidad' ) == 0 ) {
            if( record.get( 'cue_iEngineStatus' ) == 0 ) {
                iconUrl = '/resources/softguard/images/stop' + color + '.png';
            } else {
                iconUrl = '/resources/softguard/images/stop_green.png';
            }
            vehicle.isFrenado = true;
        } else if( record.get( 'gps_Rumbo' ) ) {
            iconUrl = '/resources/softguard/images/direction_' + record.get( 'gps_Rumbo' ) + color + '.png';
            vehicle.isFrenado = false;
        } else {
            iconUrl = '/resources/softguard/images/exclamacion' + color + '.png';
            //vehicle.isVieja = true;
        }
    }


    var image = new google.maps.MarkerImage(
        iconUrl,
        new google.maps.Size( 32, 37 ),
        new google.maps.Point( 0, 0 ),
        new google.maps.Point( 16, 37 )
    );
    //console.log(vehicle.get('cue_clinea')+'-'+vehicle.get('cue_ncuenta'),image);
    return image;
},
    
loadData: function(gmappanel, controller ) {
    var vehicles = gmappanel.vehicleList;
    var store = gmappanel.ultimasPosiciones;
    var view = gmappanel.up( 'flotagpsview' );

    if( vehicles && vehicles.length > 0 && view.isVisible( true ) ) { //&& !store._isloading
        var cuentas = [];

        if( view.vehicleSelected ) {
            cuentas.push( view.vehicleSelected.get( 'cue_iid' ) );
        } else {
            Ext.Array.each( vehicles, function( item ) {
                cuentas.push( item.get( 'cue_iid' ) )
            });
        }

    }

    if( view.isVisible( true ) ) {
        controller.showMarkerArray( gmappanel, controller );
    }

    controller.onMarkersGeoJsonChange( view, true )
},
    
showMarkerArray: function(gmappanel, controller ) {
    var vehicles = gmappanel.vehicleList;
    var markers = gmappanel.markerList;
    var view = gmappanel.up( 'flotagpsview' );

    // Ext.Array.each(vehicles,controller.showVehicle,{gmappanel: gmappanel, controller: controller});
    Ext.Array.each( markers, controller.showMarker, { gmappanel: gmappanel, controller: controller });

    var center = view.down( '#centerBtn' )._pressed;
    var active = Ext.Array.filter( gmappanel.cache.marker, function( item ) {
        return item.getMap()
    });

    //center= false;
    if( center  && active.length > 0 ) {
        var bounds = controller.getBounds( active );
        var map = gmappanel.getMap();
        var lastzoom = map.getZoom();

        gmappanel.forceZoom = true;

        setTimeout( function() {
            map.panToBounds( bounds );
            //map.setCenter(bounds.getCenter());
            map.fitBounds( bounds );

        }, 1000 );

        if( map.getZoom() == 0 ) {
            map.setZoom( lastzoom );
        }
    }
},
    
    
showMarker: function(marker, index, array ) {



    var gmappanel = this.gmappanel;
    var controller = this.controller;
    var view = gmappanel.up( 'flotagpsview' );
    var clear = false;
    var lat = marker.get( 'Latitude' );
    var long = marker.get( 'Longitude' );
    var point = new google.maps.LatLng( lat, long );
    var pos = { lat: lat, long: long, position: point };
    var listeners = {};
    var icon = marker.get( 'Icon' );
    var iconUrl = '';

    if( icon ) {
        iconUrl = '/resources/softguard/images/poi/' + icon;
    }

    var infoHtml = controller.getMarkerInfoWindowHtml( marker, pos );

    if( typeof marker.markerIndex !== "undefined" ) {
        gmappanel.cache.marker[ marker.markerIndex ].setPosition( pos.position );
        gmappanel.cache.marker[ marker.markerIndex ].setMap( gmappanel.getMap() );
        gmappanel.cache.infowindow[ marker.markerIndex ].setContent( infoHtml );

    } else {
        newmarker = {
            lat: pos.lat,
            lng: pos.long,
            record: marker,
            icon: iconUrl,
            labelContent: marker.get( 'Name' ),
            labelAnchor: new google.maps.Point( 40, 0 ),
            labelClass: "gmaplabel2", // the CSS class for the label
            labelStyle: { opacity: 1/*0.75*/ },
            //title : marker.get('Name'),
            infoWindow: {
                content: infoHtml,
                listener: 'mouseover',
                disableAutoPan: true
            },
            draggable: false
        };

        gmappanel.addMarker( pos.position, newmarker, clear, center, listeners );
        marker.markerIndex = gmappanel.cache.marker.length - 1;
    }
},
    
showVehicle: function(vehicle, index, array ) {
    var gmappanel = this.gmappanel;
    var controller = this.controller;
    var view = gmappanel.up( 'flotagpsview' );
    var center = false;
    var clear = false;
    var marker = {};
    var pos = controller.getVehiclePosition( vehicle, gmappanel );
    var vehiclePos = vehicle.pos;
    console.log( "showVehicle" );
    //if (pos.position){
    if( pos.position && !vehicle.lastPosition ||
        ( vehicle.currentPositioRecord
            /* 
             9/4/2018
             arreglo por que  si cambiaba solo 1 cord no impactaba en el mapa, ahora solo se evalua por fecha
             hablado por chat con rodrigo
             
             && vehicle.currentPositioRecord.get('gps_rLatitud') != vehicle.lastPosition.get('gps_rLatitud') 
             && vehicle.currentPositioRecord.get('gps_rLongitud') != vehicle.lastPosition.get('gps_rLongitud')*/

            && vehicle.currentPositioRecord.get( 'gps_isorawfechahora' ) > vehicle.lastPosition.get( 'gps_isorawfechahora' )
        ) ) {
        var geocoder = gmappanel.getGeocoder();

        var listeners = {
            click: function() {
                view.fireEvent( 'vehicleSelected', this.record, view );
            },
            mouseout: function() {
                gmappanel.cache.infowindow[ this.record.markerIndex ].close();
            }
        };

        var infoHtml = controller.getVehicleInfoWindowHtml( vehicle, pos, false );
        if( typeof vehicle.markerIndex !== "undefined" ) {
            // verifico que el paquete no sea viejo
            if( vehicle.pos.gps.get( 'gps_isorawfechahora' ) < pos.gps.get( 'gps_isorawfechahora' ) ) {
                // muevo el marker de lugar
                gmappanel.cache.marker[ vehicle.markerIndex ].setPosition( pos.position );
                // cambio el contenido del marker
                gmappanel.cache.infowindow[ vehicle.markerIndex ].setContent( infoHtml );
                vehicle.position = pos.position;
                vehicle.pos = pos;
            } else {
                //el paquete esta desordenado
            }

            // cambio el icono por si se selecciono o no
            gmappanel.cache.marker[ vehicle.markerIndex ].setIcon( controller.getMarkerIcon( vehicle, gmappanel ) );

        } else {
            var label = view.labelConfig;

            //ramplazo valores
            for( var key in vehicle.data ) {
                console.log( 'key', key )
                label = label.replace( '{' + key + '}', Ext.util.Format.htmlDecode( vehicle.get( key ) ) )
            }

            var labelcontent;

            if( label && label.trim() != '' ) {
                labelcontent = '<span>' + label + '</span>';
            }

            vehicle.position = pos.position;
            vehicle.pos = pos;
            marker = {
                lat: pos.lat,
                lng: pos.long,
                record: vehicle,
                labelContent: labelcontent,
                //labelAnchor: new google.maps.Point(40, 0),
                labelClass: "gmaplabel2", // the CSS class for the label
                labelStyle: { opacity: 1/*0.75*/ },
                title: label,
                icon: controller.getMarkerIcon( vehicle, gmappanel ),
                infoWindow: {
                    content: infoHtml,
                    listener: 'mouseover',
                    disableAutoPan: true
                },
                draggable: false
            };
            //console.log(vehicle.get('cue_clinea')+'-'+vehicle.get('cue_ncuenta'))
            gmappanel.addMarker( pos.position, marker, clear, center, listeners );
            vehicle.markerIndex = gmappanel.cache.marker.length - 1;
            vehicle.marker = marker;
        }

        geocoder.geocode( {
            location: pos.position
        }, function( result, status ) {
            if( status == 'OK' && result.length > 0 ) {
                pos.address = result[ 0 ].formatted_address;
                vehicle.address = pos.address;
                var infoHtml = controller.getVehicleInfoWindowHtml( vehicle, pos, true );
            }
            else {
                pos.address = '';
                vehicle.address = '';
                var infoHtml = controller.getVehicleInfoWindowHtml( vehicle, pos, false );
            }

            if( typeof vehicle.markerIndex !== "undefined" ) {
                // cambio el contenido del marker
                gmappanel.cache.infowindow[ vehicle.markerIndex ].setContent( infoHtml );

            }
        });
        vehicle.lastPosition = vehicle.currentPositioRecord;
    }
    controller.muestroOcultoVehiculos( vehicle, view, gmappanel );
},

muestroOcultoVehiculos: function (vehicle, view, gmappanel ) {
    //default escondo a todos
    var marker = gmappanel.cache.marker[ vehicle.markerIndex ];

    if( marker ) {
        // FILTROS            
        var enmovimiento = view.down( '#enmovimiento' ).pressed;
        var frenado = view.down( '#frenado' ).pressed;
        var viejas = view.down( '#viejas' ).pressed;
        var conalarma = view.down( '#conalarma' ).pressed;
        var now = new Date();
        var ageGps = ( now - vehicle.get( 'gps_isofechahora' ) ) / 60000;
        var mostrar = true;

        if( enmovimiento ) {
            if( !vehicle.isFrenado && !vehicle.isVieja ) {
                mostrar = true;
            }
        }

        if( frenado ) {
            if( vehicle.isFrenado && !vehicle.isVieja ) {
                mostrar = true;
            }
        }

        if( conalarma ) {
            if( vehicle.isAlarma && !vehicle.isVieja ) {
                mostrar = true;
            }
        }

        if( viejas ) {
            if( vehicle.isVieja ) {
                mostrar = true;
            }
        }

        if( mostrar ) {
            //si el marker ya esta visible no vuelvo a setearle el mapa
            //if(!marker.getVisible()) {
            marker.setMap( gmappanel.getMap() );
            //}                    
        } else {
            marker.setMap( null );
        }
    }
},

getVehicleInfoWindowHtml: function(vehicle, pos, showAddress ) {
    var html = '\
            <div style="width:500px;">\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            <h2>{nombre}</h2>\
            ';

    html += '\
                <table>';
    if( showAddress ) {

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
                           ';
    if( vehicle.get( 'gps_iBattery' ) && vehicle.get( 'gps_iBattery' ) != 0 && vehicle.get( 'gps_iBattery' ) != '' ) {
        html += '<span style="font-weight:bold;">{lblBateria}:</span><span>  {bateria}</span><br/>';
    }
    html += '\
            </td>\
        </tr>\
        ';



    html += '</table>';


    // traducciones
    html = html.replace( /\{lblBateria\}/, getLocale( 'Bateria' ) );
    html = html.replace( /\{lblVelocidad\}/, getLocale( 'Velocidad' ) );
    html = html.replace( /\{lblDireccion\}/, getLocale( 'Dirección' ) );
    html = html.replace( /\{lblFechaRecepcion\}/, getLocale( 'Fecha recepción' ) );
    html = html.replace( /\{lblFechaGPS\}/, getLocale( 'Fecha Gps' ) );
    html = html.replace( /\{lblFechaAlerta\}/, getLocale( 'Fecha Alerta' ) );
    html = html.replace( /\{lblUltAlerta\}/, getLocale( 'Ult. Alerta' ) );
    html = html.replace( /\{lblLatitud\}/, getLocale( 'Latitud' ) );
    html = html.replace( /\{lblLongitud\}/, getLocale( 'Longitud' ) );
    html = html.replace( /\{lblOdometro\}/, getLocale( 'Odómetro' ) );

    // TENER EN CUENTA
    // el unico objeto qeu tiene los valores actualizados es POS
    //sta_dFechaUltimaAlerta
    if( vehicle.get( 'rec_cdll' ) == "MeitrackPacketParser" ) {
        html = html.replace( /\{bateria\}/, ( pos.gps.get( 'gps_iBattery' ) / 100 ) );
    } else {
        html = html.replace( /\{bateria\}/, pos.gps.get( 'gps_iBattery' ) );
    }

    html = html.replace( /\{dealer\}/, vehicle.get( 'cue_clinea' ) );
    html = html.replace( /\{ncuenta\}/, vehicle.get( 'cue_ncuenta' ) );
    html = html.replace( /\{nombre\}/, vehicle.get( 'Domain' ) );
    html = html.replace( /\{cuenta\}/, vehicle.get( 'cue_cnombre' ) );
    html = html.replace( /\{velocidad\}/, pos.gps.get( 'gps_iVelocidad' ) );
    html = html.replace( /\{direccion\}/, vehicle.address );
    html = html.replace( /\{fechaRaw\}/, Ext.Date.format( pos.gps.get( 'gps_isorawfechahora' ), 'd-m-Y H:i:s' ) );
    html = html.replace( /\{fecha\}/, Ext.Date.format( pos.gps.get( 'gps_isofechahora' ), 'd-m-Y H:i:s' ) );
    html = html.replace( /\{fechaAlerta\}/, Ext.Date.format( pos.gps.get( 'sta_dFechaUltimaAlerta' ), 'd-m-Y H:i:s' ) );
    html = html.replace( /\{alerta\}/, pos.gps.get( 'sta_cUltimaAlerta' ) + '-' + pos.gps.get( 'cod_cdescripcion' ) );
    html = html.replace( /\{latitud\}/, pos.gps.get( 'gps_rLatitud' ) );
    html = html.replace( /\{longitud\}/, pos.gps.get( 'gps_rLongitud' ) );
    html = html.replace( /\{odometro\}/, pos.gps.get( 'gps_iOdometro' ) );
    return html
},
    
    
getMarkerInfoWindowHtml: function(marker, pos ) {
    var html = '\
            <H1>{nombre}</H1>\
            <H2>{direccion}</H2>';

    html = html.replace( /\{nombre\}/, marker.get( 'Name' ) );
    html = html.replace( /\{direccion\}/, marker.get( 'FullAddress' ) );
    return html
},

getBounds: function(markers ) {
    var bounds = new google.maps.LatLngBounds();
    Ext.each( markers, function( marker, index, array ) {
        bounds.extend( marker.position );
    });
    return bounds
},
    
onVehicleSelected: function(record, view ) {
    var tabpanel = view.up( 'tabpanel' );

    var title = record.get( 'cue_clinea' )
        + "-"
        + record.get( 'cue_ncuenta' ).replace( /^\s+|\s+$/g, '' )
        + " "
        + record.get( 'cue_cnombre' );

    record.isSlave = false;

    var tab = tabpanel.add( Ext.widget( 'vehicleslavegpsview', {
        title: title,
        translate: false,
        record: record,
        center: record.get( 'gps_rLatitud' ) + ',' + record.get( 'gps_rLongitud' ),
        closable: true,
        closeAction: 'destroy'
    }) );

    tabpanel.setActiveTab( tab );
},
    
/*
onVehicleSelected: function(record, view){
    var dataPanel = view.down('#datapanel');
    //var border = view.getLayout();
    var gmappanel = view.down('gmappanel');
    
    if (!gmappanel.MAX_ZINDEX){
        gmappanel.MAX_ZINDEX = google.maps.Marker.MAX_ZINDEX;
    }
   
    dataPanel.setRecord(record);
    // si habia uno seleccionado lo saco
    
    view.down('#centerBtn').toggle(true);
    this.onCenterClick(view.down('#centerBtn'));
    
    if (view.vehicleSelected == record)
    {
       this.cleanSelected(view,false);
    } else{
        if (view.vehicleSelected){
            this.cleanSelected(view,true);    
        } 
        
        view.vehicleSelected = record;
        view.vehicleSelected.selected=true;
        this.showVehicle.call({gmappanel: view.down('gmappanel'), controller: this},record);
        dataPanel.show();
        //dataPanel.doLayout();
        var title = record.get('cue_clinea') + "-" + record.get('cue_ncuenta').replace(/^\s+|\s+$/g, '') + " " + record.get('cue_cnombre')
        dataPanel.setTitle(title);

        dataPanel.expand(false);
        var gmapsize = gmappanel.getSize();
        gmappanel.setSize(gmapsize.width,gmapsize.height);
        
        //dataPanel.floatCollapsedPanel();
        var marker = gmappanel.cache.marker[record.markerIndex];
        //console.log('antes: ',google.maps.Marker.MAX_ZINDEX,marker.getZIndex());
        marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
        //console.log('despues: ',google.maps.Marker.MAX_ZINDEX,marker.getZIndex());
        view.player.restart(10000);
        this.mostrarGeocercas(gmappanel.getMap(),record);
        
        record.breadcrumStore = Ext.create('Ext.data.Store',{
            model: this.getGpsHistoricoSearchModelModel(),
            remoteFilter: false,
            autoLoad: false
        });
        
        
    }
    
    this.showMarkerArray(gmappanel,this);
    
    
},
*/


mostrarGeocercas: function(map, record, cue_iid ) {
    console.log( "mostrarGeocercas" );
    var me = this;
    var cuenta = cue_iid ? cue_iid : record.get( 'cue_iid' );
    var store = Ext.create( 'Ext.data.Store', {
        model: 'TrackguardMonitoreo' + '.model.GeocercaSearchModel',
        remoteFilter: true,
        filters: [
            {
                property: 'Cuenta',
                value: cuenta
            }
        ]
    });
    store.load( {
        callback: function( records, operation, success ) {
            map.geocercas = records;
            Ext.Array.each( records, me.mostrarGeocerca, { gmappanel: map, controller: me });
        }
    });

},
    
mostrarGeocerca: function(record, index, array ) {
    var controller = this.controller;
    var me = this.controller;
    var map = this.gmappanel;
    var gmappanel = this.gmappanel;
    var metadata = Ext.create( me.getGeocercaMapModelModel() );
    var tipo = record.get( 'GeoType' );
    var color = '';

    metadata.data = Ext.decode( record.get( 'MetaData' ) );

    if( tipo == 'E' ) {
        color = 'Red';
    } else {
        color = 'Green';
    }


    if( metadata.get( 'Type' ) == 'circle' ) {
        var center = new google.maps.LatLng(
            metadata.get( 'CenterLat' ),
            metadata.get( 'CenterLng' )
        );
        var newShape = new google.maps.Circle( {
            strokeColor: color,
            fillColor: color
        });
        newShape.setCenter( center );
        newShape.setRadius( metadata.get( 'Radius' ) );
        newShape.setMap( map );
        //gmappanel.geocerca = newShape;
        var bounds = newShape.getBounds();
    }

    if( metadata.get( 'Type' ) == 'polygon' ) {
        var pathArray = Ext.decode( metadata.get( 'Path' ) );
        var path = new google.maps.MVCArray();

        Ext.Array.each( pathArray, function( item ) {
            var latlng = new google.maps.LatLng(
                item.lat,
                item.lng
            )
            path.push( latlng );
        });

        var newShape = new google.maps.Polygon( {
            strokeColor: color,
            fillColor: color
        });
        newShape.setPath( path );
        newShape.setMap( map );
        //gmappanel.geocerca = newShape;
        var bounds = newShape.getBounds();
    }

    record.shape = newShape;
},
    
cleanSelected: function(view, prevent ) {
    var dataPanel = view.down( '#datapanel' );
    var gmap = view.down( 'gmappanel' );
    var map = gmap.getMap();

    if( !map ) return null;

    var geocercas = map.geocercas;
    if( view.vehicleSelected ) {
        var record = view.vehicleSelected;
        view.vehicleSelected.selected = false;
        var marker = gmap.cache.marker[ record.markerIndex ];
        marker.setZIndex();
        this.showVehicle.call( { gmappanel: gmap, controller: this }, view.vehicleSelected );
        view.vehicleSelected.breadcrumStore = null;
        view.vehicleSelected = null;

        if( !prevent ) {
            dataPanel.collapse( null, false );
            dataPanel.hide();

            var gmapsize = gmap.getSize();
            gmap.setSize( gmapsize.width, gmapsize.height );
        }
    }

    if( geocercas ) {
        Ext.Array.each( geocercas, function( record, index, array ) {
            if( record.shape )
                record.shape.setMap( null );
        });
    }
},
    
showHistory: function(map, vehicle, event ) {
    var controller = this;
    var store = Ext.create( 'Ext.data.Store', {
        model: this.getGpsHistoricoSearchModelModel(),
        remoteFilter: true,
        filters: [
            {
                property: 'rec_iidcuenta',
                value: vehicle.get( 'cue_iid' )
            }, {
                property: 'rec_iid:GT',
                value: event - 1
            }
        ],
        pageSize: 1000
    });

    store.load( {
        callback: function( records ) {
            var temp = controller.getHistoryMarkers( store, vehicle );
            var points = temp.points;
            var markers = temp.markers;

            //var fechaDesde = Ext.Date.format(points[0].fecha, 'Y-m-d H:i:s');
            //var fechaHasta = Ext.Date.format(points[points.length -1].fecha, 'Y-m-d H:i:s');

            //var bounds = controller.getBounds(points);
            //var center = bounds.getCenter();

            map.addPolyline( points );
            map.addMarkers( markers );
            //map.getMap().fitBounds(bounds);
        }
    });
},
    
getHistoryMarkers: function(store, vehicle ) {
    var points = new Array();
    var markers = new Array();
    var controller = this;

    store.each( function( record, index, total ) {
        points.push( { lat: record.get( 'gps_rLatitud' ), lng: record.get( 'gps_rLongitud' ), fecha: record.get( 'gps_isofechahora' ) });
        if( !record.marker ) {
            var mark = {
                marker: null,
                lat: record.get( 'gps_rLatitud' ),
                lng: record.get( 'gps_rLongitud' ),
                record: record,
                title: Ext.Date.format( record.get( 'gps_isofechahora' ), 'Y-m-d H:i:s' ),
                icon: controller.getHistoryMarkerIcon( index, total ),
                infoWindow: {
                    content: controller.getHistoryInfoWindowHtml( vehicle, record ),
                    listener: 'click'
                },
                draggable: false
            }
            markers.push( mark );
            record.marker = mark;
        }


    });

    return { points: points, markers: markers }
},
    
getHistoryMarkerIcon: function(i, total, old ) {
    var selected = '';
    var iconUrl = '';

    switch( i ) {
        case 0:
            iconUrl = '/resources/softguard/images/start.png';
            var image = new google.maps.MarkerImage(
                iconUrl,
                new google.maps.Size( 48, 48 ),
                new google.maps.Point( 0, 0 ),
                new google.maps.Point( 16, 35 )
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
    
getHistoryInfoWindowHtml: function(vehicle, gps ) {
    var html = '\
            <div style="width:300px;height:200px;">\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            <span style="font-weight:bold;">{lblVelocidad}:</span><span> {velocidad}km/h</span><br/>\
            <span style="font-weight:bold;">{lblFecha}:</span><span>  {fecha}</span><br/>\
            <span style="font-weight:bold;">{lblDireccion}:</span><span>  {direccion}</span><br/>\
            <span style="font-weight:bold;">{lblEvento}:</span><span>  {evento}</span><br/>\
            <span style="font-weight:bold;">{lblLatitud}:</span><span>  {latitud}</span><br/>\
            <span style="font-weight:bold;">{lblLongitud}:</span><span>  {longitud}</span><br/>\
            <span style="font-weight:bold;">'+ getLocale( 'Odómetro' ) + ':</span><span>  {odometro}</span><br/>\
            </div>';

    // traducciones

    html = html.replace( /\{lblVelocidad\}/, getLocale( 'Velocidad' ) );
    html = html.replace( /\{lblDireccion\}/, getLocale( 'Dirección' ) );
    html = html.replace( /\{lblEvento\}/, getLocale( 'Evento' ) );
    html = html.replace( /\{lblFecha\}/, getLocale( 'Fecha' ) );
    html = html.replace( /\{lblLatitud\}/, getLocale( 'Latitud' ) );
    html = html.replace( /\{lblLongitud\}/, getLocale( 'Longitud' ) );

    html = html.replace( /\{dealer\}/, vehicle.get( 'cue_clinea' ) );
    html = html.replace( /\{ncuenta\}/, vehicle.get( 'cue_ncuenta' ) );
    html = html.replace( /\{nombre\}/, vehicle.get( 'Domain' ) );
    html = html.replace( /\{cuenta\}/, vehicle.get( 'cue_cnombre' ) );
    html = html.replace( /\{velocidad\}/, gps.get( 'gps_iVelocidad' ) );
    html = html.replace( /\{direccion\}/, gps.get( 'gps_cDireccion' ) );
    html = html.replace( /\{fecha\}/, Ext.Date.format( gps.get( 'gps_isofechahora' ), 'Y-m-d H:i:s' ) );
    html = html.replace( /\{evento\}/, gps.get( 'cod_cdescripcion' ) );
    html = html.replace( /\{latitud\}/, gps.get( 'gps_rLatitud' ) );
    html = html.replace( /\{longitud\}/, gps.get( 'gps_rLongitud' ) );
    html = html.replace( /\{odometro\}/, gps.get( 'gps_iOdometro' ) );
    return html
},
replaceSpecialChars: function(str ) {
    var replacements = {
        '&#225;': 'á',
        '&#233;': 'é',
        '&#237;': 'í',
        '&#243;': 'ó',
        '&#250;': 'ú',
        '&#241;': 'ñ',
        '&#193;': 'Á',
        '&#201;': 'É',
        '&#205;': 'Í',
        '&#211;': 'Ó',
        '&#218;': 'Ú',
        '&#209;': 'Ñ',
        // Agrega más reglas de reemplazo según sea necesario
    };

    for( var key in replacements ) {
        var regex = new RegExp( key, 'g' );
        str = str.replace( regex, replacements[ key ] );
    }

    return str;
},
filterGeocercaGroup( GeoGroup ){
    var view = this.getMyView();
    var gmappanel = view.down( 'gmappanel' );
    this.mostrarGeocercasGroup( gmappanel.getMap(), GeoGroup );
},

mostrarGeocercasGroup: function(map, GeoGroup ) {
    console.log( "mostrarGeocercas" );
    var me = this;
    var store = Ext.create( 'Ext.data.Store', {
        model: 'TrackguardMonitoreo' + '.model.GeocercaSearchModel',
        remoteFilter: true,
        filters: [ {
            property: 'GeoGroup',
            value: GeoGroup
        }]
    });

    // Initialize bounds to a default LatLngBounds
    var bounds = new google.maps.LatLngBounds();

    store.load( {
        callback: function( records, operation, success ) {
            map.geocercas = records;
            Ext.Array.each( records, me.mostrarGeocerca1, { gmappanel: map, controller: me, bounds: bounds });
        }
    });
},

mostrarGeocerca1: function(record, index, array ) {
    var controller = this.controller;
    var me = this.controller;
    var map = this.gmappanel;
    var gmappanel = this.gmappanel;
    var metadata = Ext.create( me.getGeocercaMapModelModel() );
    var tipo = record.get( 'GeoType' );
    var color = '';
    var name = record.get( 'Name' );

    metadata.data = Ext.decode( record.get( 'MetaData' ) );

    if( tipo == 'E' ) {
        color = 'Red';
    } else {
        color = 'Green';
    }

    if( metadata.get( 'Type' ) == 'circle' ) {
        var center = new google.maps.LatLng(
            metadata.get( 'CenterLat' ),
            metadata.get( 'CenterLng' )
        );
        var newShape = new google.maps.Circle( {
            strokeColor: color,
            fillColor: color,
            center: center,
            radius: parseFloat( metadata.get( 'Radius' ) ), // Parse the radius as a float
            map: map
        });

        // Extend the bounds with the circle's bounds if it's valid
        if( newShape.getBounds() ) {
            this.bounds.union( newShape.getBounds() );
        }
    }

    if( metadata.get( 'Type' ) == 'polygon' ) {
        var pathArray = Ext.decode( metadata.get( 'Path' ) );
        var path = new google.maps.MVCArray();

        Ext.Array.each( pathArray, function( item ) {
            var latlng = new google.maps.LatLng(
                item.lat,
                item.lng
            );
            path.push( latlng );
        });

        var newShape = new google.maps.Polygon( {
            strokeColor: color,
            fillColor: color,
            paths: path, // Use "paths" instead of "path"
            map: map
        });

        // Extend the bounds with the polygon's bounds if it's valid
        if( newShape.getBounds() ) {
            this.bounds.union( newShape.getBounds() );
        }
    }

    record.shape = newShape;

    // Fit the map bounds to include the newly added geofence
    map.fitBounds( this.bounds );
}





      /*mostrarGeocercasGroup: function(map,cue_iid ){
        console.log("mostrarGeocercas");
        var me = this;
        var cuenta = cue_iid;
        var store =Ext.create('Ext.data.Store',{
            model: 'TrackguardMonitoreo'+'.model.GeocercaSearchModel',
            remoteFilter: true,
            filters: [
                {
                    property: 'Cuenta',
                    value   : cuenta
                }
            ]
        });
        store.load({callback: function(records, operation, success){
            map.geocercas = records;
            Ext.Array.each(records,me.mostrarGeocerca1,{gmappanel: map, controller: me});
        }});
        
    },
    
    mostrarGeocerca1: function(record,index, array){
        var controller = this.controller;
        var me = this.controller;
        var map = this.gmappanel;
        var gmappanel = this.gmappanel;
        var metadata = Ext.create(me.getGeocercaMapModelModel());
        var tipo = record.get('GeoType');
        var color = '';
        
        metadata.data = Ext.decode(record.get('MetaData'));
        
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
            gmappanel.geocerca = newShape;
            var bounds = newShape.getBounds();
        }
        
        if (metadata.get('Type') == 'polygon'){
            var pathArray = Ext.decode(metadata.get('Path'));
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
            gmappanel.geocerca = newShape;
            var bounds = newShape.getBounds();
        }
        
        record.shape = newShape;
    },*/

});
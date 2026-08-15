Ext.define( 'SmartPanics.controller.SPAllSeguimientoMapController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'SPCuentaSeguimientoModel' ],
views: [ 'SpAllSeguimientoMapView' ],

init: function(config ) {
    this.control( {
        'spallseguimientoview #googlemap': {
            mapready: this.onMapReady,
            //beforerender : this.prepareMap,
            markersChange: this.onMarkersChange
        },
        '#spseguimientomapgrid': {
            selectionchange: this.onSelectionChange,
        },
        'spallseguimientoview': {
            //afterrender : this.initView,
            vehicleSelected: this.onVehicleSelected
        },
        'spallseguimientoview #searchall': {
            click: this.onClickSearchAll
        },
        'spallseguimientoview #btnAddress': {
            click: this.onAddressClick
        },
        'spallseguimientoview button[action=center]': {
            click: this.onCenterClick
        }
    });
}, // cierro init


onCenterClick: function (btn ) {
    var view = btn.up( 'vehicleslavegpsview' );

    if( btn.pressed ) {
        btn.setText( getLocale( 'Cambiar a Manual' ) );
    } else {
        btn.setText( getLocale( 'Cambiar a Centrar' ) );
    }
},

beforeInit: function (view ) {

},
    
onSelectionChange: function(selectionModel, records, options ) {
    var grid = selectionModel.view;
    console.log('aaaaaaa')
    var view = grid.up( '#spseguimientomapgrid' );
    var viewport = view.up( 'spallseguimientoview' );
    var gmap = view.map;
    viewport.down( '#searchall' ).toggle( false );
    viewport.all = false;
    if(gmap != null){
        gmap.fireEvent( 'markersChange', gmap, records );
    }

},

onClickSearchAll: function (view ) {
    var view = view.up( 'spallseguimientoview' ) ? view.up( 'spallseguimientoview' ) : view;
    var filters;

    if( view.filterImei ) {
        filters = [
            {
                property: 'imei',
                value: view.filterImei
            }
        ]
    }

    var store = Ext.create( 'Ext.data.Store', {
        model: this.getSPCuentaSeguimientoModelModel(),
        remoteFilter: true,
        pageSize: 500,
        filters: filters,
        sorters: [
            {
                property: 'cue_cnombre',
                direction: 'ASC'
            }
        ]
    });
    var controller = this;

    store.load( {
        callback: function( records, operation, success ) {
            var gmappanel6 = view.down( 'gmappanel6' );
            //console.log(gmappanel6);
            controller.onMarkersChange( gmappanel6, records );
        }
    });
    var sel = view.down( 'spseguimientogridview' );
    if(sel != null){
        var selModel = sel.getSelectionModel();
        selModel.deselectAll();
    }

},

onMapReady: function(gmappanel6 ) {
    var view = gmappanel6.up( 'spallseguimientoview' );

    gmappanel6.ultimasPosiciones = Ext.create( 'Ext.data.Store', {
        pageSize: 500,
        model: this.getSPCuentaSeguimientoModelModel()
    });

    this.loadData( gmappanel6, this );
    var map = gmappanel6.getMap();
    var runner = new Ext.util.TaskRunner();

    view.player = runner.newTask( {
        args: [ gmappanel6, this ],
        run: this.loadData,
        interval: 10000
    });
    view.player.start();

    Ext.Ajax.request( {
        url: '/rest/tablas/parametros/',
        params: { par_ccodigo: 'tiempogps' },
        method: 'GET',
        scope: this,
        success: function( response ) {
            gmappanel6.tiempogps = Ext.JSON.decode( response.responseText )[ 0 ].par_ivalor;
        }
    });

    Ext.Ajax.request( {
        url: '/rest/tablas/parametros/',
        params: { par_ccodigo: 'tg_tiempovidaalarma' },
        method: 'GET',
        scope: this,
        success: function( response ) {
            gmappanel6.tg_tiempovidaalarma = Ext.JSON.decode( response.responseText )[ 0 ].par_ivalor;
        }
    });

    var border = view.getLayout();
    var dispPanel = view.down( '#dispositivos' );
    this.onClickSearchAll( view );
},
    
onMarkersChange: function(gmappanel6, vehiclelist ) {
    if( vehiclelist.filter ) {
        gmappanel6.vehicleList = vehiclelist.filter( function( v, index, array ) {
            if( v.get( 'est_nestado' ) == 2 ) {
                notifyError( 'La cuenta ' + v.get( 'cue_cnombre' ) + ' no se encuentra habilitada.' );
                return false;
            } else {
                return true;
            }
        });
    } else {
        gmappanel6.vehicleList = vehiclelist;
    }
    var view = gmappanel6.up( 'spallseguimientoview' );

    gmappanel6.clearMarkers();
    this.loadData( gmappanel6, this );
},
    
onAddressClick: function(button ) {
    var view = button.up( 'spallseguimientoview' );
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
    
    
getVehiclePosition: function(vehicle, gmappanel6 ) {
    var record = vehicle;
    var mylat = record.get( 'sp_rLatitud' ).replace( /,/g, '.' );
    var mylong = record.get( 'sp_rLongitud' ).replace( /,/g, '.' );
    var point = new google.maps.LatLng( mylat, mylong );

    return { lat: mylat, long: mylong, position: point };
},
    
getMarkerIcon: function(vehicle, gmappanel6 ) {
    var color = '';
    var store = gmappanel6.ultimasPosiciones;
    var record = vehicle;
    var now = new Date();
    var ageGps = ( now - record.get( 'sp_tfechahora' ) ) / 60000;
    var ageAlarma = ageGps;

    iconUrl = '/resources/softguard/images/trackguard-2.png';

    var image = new google.maps.MarkerImage(
        iconUrl,
        new google.maps.Size( 48, 48 ),
        new google.maps.Point( 0, 0 ),
        new google.maps.Point( 16, 35 )
    );

    return image;
},
    
loadData: function(gmappanel6, controller ) {
    var vehicles = gmappanel6.vehicleList;
    var store = gmappanel6.ultimasPosiciones;
    var view = gmappanel6.up( 'spallseguimientoview' );

    if( vehicles && vehicles.length > 0 && view.isVisible( true ) ) {
        var cuentas = [];

        if( view.vehicleSelected ) {
            cuentas.push( view.vehicleSelected.get( 'cue_iid' ) );
        } else {
            Ext.Array.each( vehicles, function( item ) {
                cuentas.push( item.get( 'cue_iid' ) )
            });
        }

        if( store ) {
            store.load( {
                callback: function( records, operation, success ) {
                    var newList = []
                    Ext.Array.each( gmappanel6.vehicleList, function( vl ) {
                        Ext.Array.each( records, function( r ) {
                            if( r.get( 'Id' ) == vl.get( 'Id' ) ) {
                                newList.push( r )
                            }
                        })

                    })

                    gmappanel6.vehicleList = newList
                    gmappanel6.clearMarkers();
                    controller.showMarkerArray( gmappanel6, controller );
                }
            })
        }

    } else {
        controller.showMarkerArray( gmappanel6, controller );
    }
},
    
showMarkerArray: function(gmappanel6, controller ) {
    var vehicles = gmappanel6.vehicleList;
    var markers = gmappanel6.markerList;
    var view = gmappanel6.up( 'spallseguimientoview' );

    Ext.Array.each( vehicles, controller.showVehicle, { gmappanel6: gmappanel6, controller: controller });
    //Ext.Array.each(markers,controller.showMarker,{gmappanel6: gmappanel6, controller: controller});

    var center = view.down( 'button[action=center]' ).pressed;
    var active = Ext.Array.filter( gmappanel6.cache.marker, function( item ) {
        return item.getMap()
    });

    if( center && active.length > 0 ) {
        var bounds = controller.getBounds( active );
        gmappanel6.getMap().fitBounds( bounds );

        if( view.vehicleSelected && view.vehicleSelected.position ) {
            gmappanel6.getMap().setCenter( view.vehicleSelected.position );
            gmappanel6.getMap().setZoom( 14 );
        }
    }
},
    
showVehicle: function(vehicle, index, array ) {
    var gmappanel6 = this.gmappanel6;
    var controller = this.controller;
    var view = gmappanel6.up( 'spallseguimientoview' );
    var center = false;
    var clear = false;
    var marker = {};
    var pos = controller.getVehiclePosition( vehicle, gmappanel6 );

    if( pos && pos.position ) {
        var geocoder = gmappanel6.getGeocoder();

        var listeners = {
            click: function() {
                view.fireEvent( 'vehicleSelected', this.record, view );
            },
            mouseout: function() {
                gmappanel6.cache.infowindow[ this.record.markerIndex ].close();
            }
        };

        var infoHtml = controller.getVehicleInfoWindowHtml( vehicle, pos );
        if( typeof vehicle.markerIndex !== "undefined" ) {

            // muevo el marker de lugar
            gmappanel6.cache.marker[ vehicle.markerIndex ].setPosition( pos.position );
            // cambio el contenido del marker
            gmappanel6.cache.infowindow[ vehicle.markerIndex ].setContent( infoHtml );


            // lo muestro por si estaba oculto
            gmappanel6.cache.marker[ vehicle.markerIndex ].setMap( gmappanel6.getMap() );

            // cambio el icono por si se selecciono o no
            gmappanel6.cache.marker[ vehicle.markerIndex ].setIcon( controller.getMarkerIcon( vehicle, gmappanel6 ) );

            vehicle.position = pos.position;
            vehicle.pos = pos;


        } else {
            vehicle.position = pos.position;
            vehicle.pos = pos;
            marker = {
                lat: pos.lat,
                lng: pos.long,
                record: vehicle,
                labelContent: '<span>' + vehicle.get( 'cue_clinea' ) + '-' + vehicle.get( 'cue_ncuenta' ) + ' ' + vehicle.get( 'Nombre' ) + '</span>',
                //labelAnchor: new google.maps.Point(60, 0),
                labelClass: "gmaplabel2", // the CSS class for the label
                labelStyle: { opacity: 1/*0.75*/ },
                title: vehicle.get( 'Nombre' ),
                icon: controller.getMarkerIcon( vehicle, gmappanel6 ),
                infoWindow: {
                    content: infoHtml,
                    listener: 'mouseover',
                    disableAutoPan: true
                },
                draggable: false
            };
            //console.log(vehicle.get('cue_clinea')+'-'+vehicle.get('cue_ncuenta'))
            gmappanel6.addMarker( pos.position, marker, clear, center, listeners );
            vehicle.markerIndex = gmappanel6.cache.marker.length - 1;
        }


        /* comento porque generaba demasiadas request geocoder.geocode({
        location: pos.position
        }, function(result, status){
            if (status == 'OK'){
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
        }); */
    }
},

getVehicleInfoWindowHtml: function(vehicle, pos ) {
    var html = '\
            <div style="width:400px;">\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            <span style="font-weight:bold;">{lblUsuario}:</span><span>  {usuario}</span><br/>\
            <span style="font-weight:bold;">{lblDireccion}:</span><span> {direccion}</span><br/>\
            <span style="font-weight:bold;">{lblFechaRecepcion}:</span><span>  {fecha}</span><br/>\
            <span style="font-weight:bold;">{lblLatitud}:</span><span>  {latitud}</span><br/>\
            <span style="font-weight:bold;">{lblLongitud}:</span><span>  {longitud}</span><br/>\
            </div>';

    // traducciones

    html = html.replace( /\{lblVelocidad\}/, getLocale( 'Velocidad' ) );
    html = html.replace( /\{lblUsuario\}/, getLocale( 'Usuario' ) );
    html = html.replace( /\{lblDireccion\}/, getLocale( 'Dirección' ) );
    html = html.replace( /\{lblFechaRecepcion\}/, getLocale( 'Última posición' ) );
    html = html.replace( /\{lblLatitud\}/, getLocale( 'Latitud' ) );
    html = html.replace( /\{lblLongitud\}/, getLocale( 'Longitud' ) );

    //sta_dFechaUltimaAlerta
    html = html.replace( /\{dealer\}/, vehicle.get( 'cue_clinea' ) );
    html = html.replace( /\{ncuenta\}/, vehicle.get( 'cue_ncuenta' ) );
    html = html.replace( /\{usuario\}/, vehicle.get( 'Nombre' ) );
    html = html.replace( /\{cuenta\}/, vehicle.get( 'cue_cnombre' ) );
    html = html.replace( /\{direccion\}/, vehicle.address );
    html = html.replace( /\{fecha\}/, Ext.Date.format( vehicle.get( 'sp_tfechahora' ), 'd-m-Y H:i:s' ) );
    html = html.replace( /\{latitud\}/, vehicle.get( 'sp_rLatitud' ) );
    html = html.replace( /\{longitud\}/, vehicle.get( 'sp_rLongitud' ) );
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
    //var border = view.getLayout();
    var gmappanel6 = view.down( 'gmappanel6' );

    var title = record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' - ' + record.get( 'cue_cnombre' ) + ' ' + record.get( 'Nombre' );//"Evento: " + record.get('rec_iid');
    title = title.replace( ',', '' );

    var id = record.get( 'CuentaId' );
    var panel = view.up( 'tabpanel' );
    var mon = Ext.widget( 'spseguimientomapview', {
        title: title,
        record: record,
        closable: true,
        translate: false,
        closeAtion: 'Destroy'
    });


    panel.add( mon );
    panel.setActiveTab( mon );


}
    
});
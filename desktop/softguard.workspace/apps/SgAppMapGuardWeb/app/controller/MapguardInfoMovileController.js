Ext.define( 'SgAppMapGuardWeb.controller.MapguardInfoMovileController', {
    extend: 'Ext.app.Controller',
    stores: [ ],
models: [ 'VehicleSearchModel', 'VehicleGpsModel', 'EventosPendientesSearchModel', 'MapguardModel' ],
views: [ 'MapguardInfoMovileView' ],

init: function(config ) {
    this.control( {
        'mapguardinfomovileview gmappanel6': {
            mapready: this.onMapReady,
            //  beforerender : this.prepareMap,
            manualcenter: this.onManualCenter
        },
        'mapguardinfomovileview #datapanel': {
            //  afterrender : this.initDatapanel
        },
        'mapguardinfomovileview ': {
            afterrender: this.initView
        },
        'mapguardinfomovileview button[action=center]': {
            click: this.onCenterClick
        },
        'mapguardinfomovileview #zoom1': {
            click: this.onZoom1Click
        },
        'mapguardinfomovileview #zoom2': {
            click: this.onZoom2Click
        },
        'mapguardinfomovileview #zoom3': {
            click: this.onZoom3Click
        },
        'mapguardinfomovileview #zoom4': {
            click: this.onZoom4Click
        },
        'mapguardinfomovileview #zoom5': {
            click: this.onZoom5Click
        },
        'mapguardinfomovileview #medirdistancia': {
            click: this.onMedirDistanciaClick
        }
    });
},
    
    
initView: function (view ) {
    //console.log(view)
    var datapanel = view.down( '#datapanel' );

    if( view.recordSlaveGps ) {
        // hay un evento... lo tengo que mostrar en el mapa.
        view.evento = view.record;
        view.record = view.recordSlaveGps;
    }

    datapanel.record = view.record;

    if( view.hideDatapanel )
        datapanel.hide();

    if( view.collapseDatapanel )
        datapanel.collapse();

    if( view.hidedisplayname ) {
        view.down( '#displayname' ).hide()
    }

    // view.down('dispositivomovilwidgetview').record = view.record;


    view.down( 'dispositivomovilwidgetview' ).add( {
        xtype: 'vehiclehistorico',
        collapsible: true,
        collapsed: true,
        record: view.record
    })


    view.down( 'dispositivomovilwidgetview' ).add( {
        xtype: 'smsgridview',
        collapsible: true,
        collapsed: true,
        showMaximizer: true,
        title: 'Sms enviados',
        record: view.record
    })
    view.down( 'dispositivomovilwidgetview' ).add( {
        xtype: 'smsrecibidosgridview',
        collapsible: true,
        collapsed: true,
        showMaximizer: true,
        title: 'Sms recibidos',
        record: view.record
    })
    view.down( 'dispositivomovilwidgetview' ).add( {
        xtype: 'smartmailprogramgridview',
        collapsible: true,
        collapsed: true,
        showMaximizer: true,
        title: 'Correo enviado',
        record: view.record
    })

},
    
onMedirDistanciaClick: function (btn ) {

    var view = btn.up( 'mapguardinfomovileview' );

    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Medir distancia',
        closeAction: 'destroy',
        modal: true,
        width: 740,
        height: 480,
        border: false,
        maximizable: true,
        items: [ {
            xtype: 'distanciamaphelperview',
            caller: view,
            addressOrigen: view.record.address

        }]
    });
    win.show();
},
    
    
onManualCenter: function(gmappanel6 ) {
    var view = gmappanel6.up( 'mapguardinfomovileview' );
    var btn = view.down( 'button[action=center]' );

    if( btn.pressed ) {
        btn.btnEl.dom.click();
        //btn.fireEvent('click', btn);
    }
},
    
onZoom1Click: function (btn ) {

    var gmappanel6 = btn.up( 'mapguardinfomovileview' ).down( 'gmappanel6' )
    var map = gmappanel6.getMap();
    map.setZoom( 1 );

},
onZoom2Click: function (btn ) {

    var gmappanel6 = btn.up( 'mapguardinfomovileview' ).down( 'gmappanel6' )
    var map = gmappanel6.getMap();
    map.setZoom( 4 );

},
onZoom3Click: function (btn ) {

    var gmappanel6 = btn.up( 'mapguardinfomovileview' ).down( 'gmappanel6' )
    var map = gmappanel6.getMap();
    map.setZoom( 7 );

},
onZoom4Click: function (btn ) {

    var gmappanel6 = btn.up( 'mapguardinfomovileview' ).down( 'gmappanel6' )
    var map = gmappanel6.getMap();
    map.setZoom( 12 );

},
onZoom5Click: function (btn ) {

    var gmappanel6 = btn.up( 'mapguardinfomovileview' ).down( 'gmappanel6' )
    var map = gmappanel6.getMap();
    map.setZoom( 17 );

},
    
    
onSelect1: function(selectionModel, record, options ) {
    var view = selectionModel.view.up( 'mapguardinfomovileview' );
    var item = view.down( '#11' );
    var controller = this;
    /* item.removeAll();
     item.add(Ext.widget('vehicleslavegpsview',{
         hideDatapanel: true,
         border: 1,
         record: record
     }))*/

    controller.initMapReady( view.down( 'gmappanel6' ) );
    var title = record.get( 'cue_clinea' ) + "-" + record.get( 'cue_ncuenta' ) + " " + record.get( 'cue_cnombre' ) + " - " + record.get( 'Domain' );
    view.down( '#displayname' ).setText( title );
},
    
        
onCenterClick: function (btn ) {
    var view = btn.up( 'mapguardinfomovileview' );

    if( !btn._pressed ) {
        btn.setText( getLocale( 'Cambiar a Manual' ) );
        btn._pressed = true;
    } else {
        btn.setText( getLocale( 'Cambiar a Centrar' ) );
        btn._pressed = false
    }

},
    
    
initDatapanel: function(view ) {
    var controller = this;
    //  var view = gmappanel6.up('vehicleslavegpsview');
    // lo cargo siempre 
    if( true ) {//view.record && !view.record.get('gps_rLatitud')) {

        var store = Ext.create( 'Ext.data.Store', {
            model: this.getVehicleSearchModelModel(),
            remoteFilter: true,
            limit: 1,
            pageSize: 1,
            filters: [
                {
                    property: 'cue_iid',
                    value: view.record.get( 'cue_iid' )
                }
            ]
        });
        var controller = this;

        store.load( {

            callback: function( records, operation, success ) {

                view.record = records[ 0 ];
                controller.initPanel( view );
            }
        });


    } else {
        controller.initPanel( view );
    }


},
    
initPanel: function(view ) {
    var controller = this;
    view.controller = this;


},
    
    
onMapReady: function(gmappanel6, googlemap ) {
    var controller = this;
    controller.gmappanel6 = gmappanel6;

    var view = gmappanel6.up( 'mapguardinfomovileview' );
    if( !view.record.get( 'gps_rLatitud' ) ) {
        /*var store =Ext.create('Ext.data.Store',{
           model: this.getVehicleSearchModelModel(),
           remoteFilter: true,
           pageSize: 1000,
           filters: [
               {
                   property : 'cue_iid',
                   value: view.record.get('cue_iid')
               }
           ]
       });
       var controller = this;
      
       store.load({
         
           callback: function(records, operation, success){*/
        // view.record = records[0];
        controller.initMapReady( gmappanel6, googlemap );
        /* }
     });*/
    } else {
        controller.initMapReady( gmappanel6, googlemap );
    }

},

initMapReady: function(gmappanel6, googlemap ) {
    var view = gmappanel6.up( 'mapguardinfomovileview' );
    var record = view.record;

    var map = gmappanel6.getMap();

    /*  if (UiApplicationMetadata.Kml){
          var kml = new google.maps.KmlLayer({
              url: UiApplicationMetadata.Kml
          });     
          kml.setMap(map);
      }
      
      if (UiApplicationMetadata.MapType){
          map.setMapTypeId(UiApplicationMetadata.MapType);
      }*/

    gmappanel6.ultimasPosiciones = Ext.create( 'Ext.data.Store', {
        pageSize: 10000,
        filters: [ {
            property: 'gps_idCuenta',
            id: 'cuentaFilter',
            value: record ? record.get( 'cue_iid' ) : view.cue_iid
        }
        ],
        model: this.getVehicleGpsModelModel()
    });



    console.log( "view mapgfuard info mivile", view )
    // si hay evento lo muestro
    if( view.evento )
        this.mostrarEvento( view, 0, null );

    //gmappanel6.getMap().setOptions({mapMaker: true });
    this.showMarkerArray( gmappanel6, this );
    // this.mostrarGeocercas(map, record, this);

},
    
getMarkerIcon: function(vehicle, gmappanel6 ) {
    var color = '';
    // var record = vehicle.gpsRecord;
    var controller = this;
    var now = new Date();
    /* var ageAlarma = (now -record.get('sta_dFechaUltimaAlerta'))/60000;
     var ageGps = (now -record.get('gps_isofechahora'))/60000;*/
    var msg = '';

    var view = gmappanel6.up( 'mapguardinfomovileview' )


    var record = vehicle

    var iconUrl = '/resources/softguard/images/mapguard-cservice/';
    var tipo = 'movil_asignado';

    if( record.get( 'cService' ) == 'ST' ) {
        tipo = 'ServiceTecnico';
    } else {
        switch( record.get( 'tmp_nestado' ) ) {
            case 1:
                tipo = 'movil_disponible'
                break;
            case 2:
                tipo = 'Sos'
                break;
            case 3:
                tipo = 'movil_asignado'
        }
    }

    iconUrl = iconUrl + tipo + '.png';

    var iconObj = {
        url: iconUrl,
        msg: msg
    }

    view.down( 'dispositivomovilwidgetview' ).fireEvent( 'changeicon', view.down( 'dispositivomovilwidgetview' ), iconObj )


    var image = new google.maps.MarkerImage(
        iconUrl,
        new google.maps.Size( 32, 37 ),
        new google.maps.Point( 0, 0 ),
        new google.maps.Point( 16, 37 )
    );

    return image;



},
    
getVehiclePosition: function(vehicle, gmappanel6 ) {

    if( vehicle ) {
        vehicle.gpsRecord = vehicle;
        vehicle.currentPositioRecord = vehicle;
        var mylat = vehicle.get( 'gps_rlatitud' ).replace( /,/g, '.' );
        var mylong = vehicle.get( 'gps_rlongitud' ).replace( /,/g, '.' );
        var point = new google.maps.LatLng( mylat, mylong );

        return { lat: mylat, long: mylong, position: point, gps: vehicle };
    } else {
        if( !vehicle.sinpos ) {
            notify( 'No se encuentra posición' );
        }
        vehicle.sinpos = true;
        //gmappanel6.up('vehicleslavegpsview').down('dispositivomovilwidgetview').hide();
        return { lat: '', long: '', position: null }
    }

},
    
    
showVehicle: function(vehicle, index, array ) {
    var gmappanel6 = this.gmappanel6;
    var controller = this.controller;
    var view = gmappanel6.up( 'mapguardinfomovileview' );
    var vehicle = view.record;
    var center = view.down( 'button[action=center]' ).pressed;
    var clear = false;
    var marker = {};
    var pos = controller.getVehiclePosition( vehicle, gmappanel6 );
    var listeners = {};

    marker = {
        lat: vehicle.get( 'gps_rLatitud' ),
        lng: vehicle.get( 'gps_rLongitud' ),
        record: vehicle,
        title: vehicle.get( 'Name' ),
        icon: controller.getMarkerIcon( vehicle, gmappanel6 ),
        /* infoWindow: {
             content: infoHtml, 
             listener:'mouseover',
             disableAutoPan: true
         },*/
        draggable: false
    };
    gmappanel6.marker = gmappanel6.addMarker( pos.position, marker, clear, center, listeners );
    vehicle.marker = gmappanel6.marker;




    if( view.down( 'dispositivomovilwidgetview' ) ) {

        view.down( 'dispositivomovilwidgetview' ).fireEvent( 'changeobject', view.down( 'dispositivomovilwidgetview' ), vehicle )
    }



},
    
showMarkerArray: function(gmappanel6, controller ) {
    var vehicles = [ gmappanel6.record ];
    var markers = gmappanel6.markerList;

    var view = gmappanel6.up( 'mapguardinfomovileview' );
    // si se cerro la ventana freno la tarea
    /*  if (!view){
          Ext.TaskManager.stop({
              args: [gmappanel6,controller],
              run: this.showMarkerArray,
              interval: 3000
          });
          return false;
      }*/

    var dataPanel = view.down( '#datapanel' );

    if( view.isVisible( true ) ) {
        //console.log('cargo slave');
        gmappanel6.ultimasPosiciones.load(
            {
                params: {
                    short: true
                },
                callback: function( records, operation, success ) {
                    Ext.Array.each( vehicles, controller.showVehicle, { gmappanel6: gmappanel6, controller: controller });
                    //   Ext.Array.each(markers,controller.showMarker,{gmappanel6: gmappanel6, controller: controller});
                    /*
                    var active = Ext.Array.filter(gmappanel6.cache.marker,function(item){
                        return item.getMap()
                    });
                    */
                    var center;
                    if( view.down( 'button[action=center]' ) ) {
                        center = view.down( 'button[action=center]' )._pressed;
                    } else {
                        center = true;
                    }

                    var map = gmappanel6.getMap();
                    if( center ) {
                        map.lastZoom = map.getZoom();
                        var bounds = controller.getBounds( gmappanel6.cache.marker );

                        if( gmappanel6.cache.marker.length > 0 ) {

                            map.setCenter( bounds.getCenter() );
                            //  map.panToBounds(bounds);
                            //  map.fitBounds(bounds);

                            if( map.getZoom() < 8 )
                                map.setZoom( map.lastZoom );

                            if( map.getZoom() > 14 )
                                map.setZoom( map.lastZoom );
                        }

                    }
                }
            }
        )

    }
},
    
showMarker: function(marker, index, array ) {
    var gmappanel6 = this.gmappanel6;
    var controller = this.controller;
    var view = gmappanel6.up( 'mapguardinfomovileview' );

    var clear = false;

    var lat = marker.get( 'Latitude' );
    var long = marker.get( 'Longitude' );
    var point = new google.maps.LatLng( lat, long );
    var pos = { lat: lat, long: long, position: point };

    var listeners = {};

    var infoHtml = controller.getMarkerInfoWindowHtml( marker, pos );

    /* if (typeof marker.SlaveMarkerIndex !== "undefined"){
         gmappanel6.cache.marker[marker.SlaveMarkerIndex].setPosition(pos.position);
         gmappanel6.cache.marker[marker.SlaveMarkerIndex].setMap(gmappanel6.getMap());
         gmappanel6.cache.infowindow[marker.SlaveMarkerIndex].setContent(infoHtml);
         
     } else {*/
    newmarker = {
        lat: pos.lat,
        lng: pos.long,
        record: marker,
        title: marker.get( 'Name' ),
        infoWindow: {
            content: infoHtml,
            listener: 'mouseover',
            disableAutoPan: true
        },
        draggable: false
    };

    gmappanel6.marker = gmappanel6.addMarker( pos.position, newmarker, clear, center, listeners );
    // marker.SlaveMarkerIndex = gmappanel6.cache.marker.length-1;
    /* }*/

},
    
getVehicleInfoWindowHtml: function(vehicle, pos ) {
    var html = '<H1>{dealer}-{ncuenta} {cuenta}</H1>';

    var velocidad = pos.gps.get( 'gps_iVelocidad' );
    var address = vehicle.address;
    var fecharecepcion = Ext.Date.format( pos.gps.get( 'gps_isofechahora' ), 'd-m-Y H:i:s' );
    var fechagps = Ext.Date.format( pos.gps.get( 'gps_isorawfechahora' ), 'd-m-Y H:i:s' );
    var fechaAlerta = Ext.Date.format( pos.gps.get( 'sta_dFechaUltimaAlerta' ), 'd-m-Y H:i:s' );

    if( !fecharecepcion )
        fecharecepcion = Ext.Date.format( vehicle.get( 'rec_isoFechaHora' ), 'd-m-Y H:i:s' );

    if( velocidad )
        html += '<span style="font-weight:bold;">{lblVelocidad}:</span><span> {velocidad} km/h</span><br/>';

    if( address )
        html += '<span style="font-weight:bold;">{lblDireccion}:</span><span> {direccion}</span><br/>';

    if( fechagps )
        html += '<span style="font-weight:bold;">{lblFechaGPS}:</span><span>  {fechaRaw}</span><br/>';

    if( fechaAlerta )
        html += '<span style="font-weight:bold;">{lblFechaAlerta}:</span><span>  {fechaAlerta}</span><br/>';

    html += '\
            <span style="font-weight:bold;">{lblFechaRecepcion}:</span><span>  {fecha}</span><br/>\
            <span style="font-weight:bold;">{lblUltAlerta}:</span><span>  {alerta}</span><br/>\
            <span style="font-weight:bold;">{lblLatitud}:</span><span>  {latitud}</span><br/>\
            <span style="font-weight:bold;">{lblLongitud}:</span><span>  {longitud}</span><br/>';


    // traducciones
    html = html.replace( /\{lblVelocidad\}/, getLocale( 'Velocidad' ) );
    html = html.replace( /\{lblDireccion\}/, getLocale( 'Dirección' ) );
    html = html.replace( /\{lblFechaRecepcion\}/, getLocale( 'Fecha recepción' ) );
    html = html.replace( /\{lblFechaGPS\}/, getLocale( 'Fecha Gps' ) );
    html = html.replace( /\{lblFechaAlerta\}/, getLocale( 'Fecha Alerta' ) );
    html = html.replace( /\{lblUltAlerta\}/, getLocale( 'Ult. Alerta' ) );
    html = html.replace( /\{lblLatitud\}/, getLocale( 'Latitud' ) );
    html = html.replace( /\{lblLongitud\}/, getLocale( 'Longitud' ) );


    //sta_dFechaUltimaAlerta
    html = html.replace( /\{dealer\}/, vehicle.get( 'cue_clinea' ) );
    html = html.replace( /\{ncuenta\}/, vehicle.get( 'cue_ncuenta' ) );
    html = html.replace( /\{nombre\}/, vehicle.get( 'Domain' ) );
    html = html.replace( /\{cuenta\}/, vehicle.get( 'cue_cnombre' ) );
    html = html.replace( /\{velocidad\}/, velocidad );
    html = html.replace( /\{direccion\}/, address );
    html = html.replace( /\{fechaRaw\}/, fechagps );
    html = html.replace( /\{fecha\}/, fecharecepcion );
    html = html.replace( /\{fechaAlerta\}/, fechaAlerta );
    html = html.replace( /\{alerta\}/, pos.gps.get( 'cod_cdescripcion' ) );
    html = html.replace( /\{latitud\}/, pos.gps.get( 'gps_rLatitud' ) );
    html = html.replace( /\{longitud\}/, pos.gps.get( 'gps_rLongitud' ) );
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
        if( marker.getMap() ) {
            bounds.extend( marker.position );
        }
    });
    return bounds
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
    
getHistoryMarker: function(vehicle, record ) {
    var controller = this;
    if( !record.marker ) {
        var mark = {
            marker: null,
            lat: record.get( 'gps_rLatitud' ),
            lng: record.get( 'gps_rLongitud' ),
            record: record,
            title: Ext.Date.format( record.get( 'gps_isorawfechahora' ), 'Y-m-d H:i:s' ),
            icon: controller.getHistoryMarkerIcon( 1, 3 ),
            infoWindow: {
                content: controller.getHistoryInfoWindowHtml( vehicle, record ),
                listener: 'click'
            },
            draggable: false
        }
        record.marker = mark;
    }
    return record.marker;
},
    
getHistoryMarkerIcon: function(i, total, old ) {
    var selected = '';
    var iconUrl = '';


    iconUrl = old ? '/resources/softguard/images/icon_dot_verde.gif' : '/resources/softguard/images/icon_dot-nonew.gif';
    var image = new google.maps.MarkerImage(
        iconUrl,
        new google.maps.Size( 10, 10 ),
        new google.maps.Point( 0, 0 ),
        new google.maps.Point( 5, 5 )
    );
    return image;
},
    
getHistoryInfoWindowHtml: function(vehicle, gps ) {
    var pos = vehicle.pos;
    var html = '\
            <div style="width:500px;">\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            ';

    html += '\
                <table>';
    if( vehicle.address ) {

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
                           <span style="font-weight:bold;">{lblBateria}:</span><span>  {bateria}</span><br/>\
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

    //sta_dFechaUltimaAlerta
    html = html.replace( /\{bateria\}/, vehicle.get( 'gps_ibattery' ) );
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
    
getEventoIcon: function(cuenta, gmappanel6 ) {
    var cuentaTipoIcon = cuenta.get( 'tip_curlimagen' );
    var iconUrl = '/resources/softguard/images/mapguard-cservice/';
    var tipo = 'Casa';// cuenta.get('tip_cdescripcion');

    if( cuenta.get( 'selected' ) ) {
        tipo = tipo + '_selected';
    }

    iconUrl = iconUrl + tipo + '.png';

    /*if (cuentaTipoIcon){
        iconUrl = cuentaTipoIcon;
    }*/

    //si tiene alarma muestro el icono de alarma
    if( cuenta.get( 'rec_calarma' ) ) {
        //iconUrl = '/handler/getImage?u=/images/codala/'+cuenta.get('rec_calarma')+'.png';          
        var iconUrl = '/resources/softguard/images/enalarma.png';
    }

    var image = new google.maps.MarkerImage(
        iconUrl,
        new google.maps.Size( 48, 48 ),
        new google.maps.Point( 0, 0 ),
        new google.maps.Point( 15, 35 )
    );

    return image;

},
    
    
    
mostrarEvento: function(view, index, array ) {
    var gmappanel6 = view.down( '#googlemap' );
    var controller = this;
    var cuenta = view.evento;

    var center = false;
    var clear = false;
    var pos = controller.getEventoPosition( cuenta, gmappanel6 );

    var igual = false;

    if( pos && pos.position && cuenta.position && cuenta.marker ) {
        if(
            cuenta.position.lat().toFixed( 6 ) == parseFloat( pos.lat ).toFixed( 6 ) &&
            cuenta.position.lng().toFixed( 6 ) == parseFloat( pos.long ).toFixed( 6 )
        ) {

            igual = true;

        }
    }


    if( pos && pos.position && ( pos.lat != 0 && pos.long != 0 ) && !igual ) {
        var geocoder = gmappanel6.getGeocoder();

        cuenta.position = pos.position;

        var infoHtml = controller.getVehicleInfoWindowHtml( cuenta, pos );

        var markerConf = {
            position: pos.position,
            lat: pos.lat,
            lng: pos.long,
            record: cuenta,
            labelContent: "<span>" + cuenta.get( 'cue_clinea' ) + '-' + cuenta.get( 'cue_ncuenta' ) + "</span>",
            labelAnchor: new google.maps.Point( 0, 0 ),
            labelClass: "gmaplabel2", // the CSS class for the label
            labelStyle: { opacity: 0.75 },
            title: cuenta.get( 'Name' ),
            icon: controller.getEventoIcon( cuenta, gmappanel6 ),
            infoWindow: {
                content: infoHtml,
                listener: 'mouseover',
                disableAutoPan: true
            },
            draggable: false,
            record: cuenta
        };

        if( cuenta.marker ) {
            // muevo el marker de lugar
            cuenta.marker.setPosition( pos.position );
            // lo muestro por si estaba oculto
            cuenta.marker.setMap( gmappanel6.getMap() );
            // cambio el icono por si se selecciono o no
            cuenta.marker.setIcon( controller.getEventoIcon( cuenta, gmappanel6 ) );
            // cambio el contenido del marker

            if( cuenta.infowindow )
                cuenta.infowindow.setContent( infoHtml );

        } else {


            gmappanel6.addMarker( pos.position, markerConf, clear );


            cuenta.marker.setMap( gmappanel6.getMap() );

            //agrego listener
            google.maps.event.addListener( cuenta.marker, 'click', function() {
                //view.cuentaSelected = cuenta;
                view.fireEvent( 'cuentaSelected', cuenta, view );
            });

            cuenta.markerIndex = gmappanel6.cache.marker.length - 1;
            cuenta.infowindow = gmappanel6.createInfoWindow( markerConf.infoWindow, pos.position, cuenta.marker );

            google.maps.event.addListener( cuenta.marker, 'mouseout', function() {
                cuenta.infowindow.close()

            });
        }

    }

},
    
getEventoPosition: function(record, gmappanel6 ) {
    var arrayLatLng = [];

    if( record.get( 'sp_rLongitud' ) && record.get( 'sp_rLongitud' ) != '' ) {
        arrayLatLng[ 0 ] = record.get( 'sp_rLatitud' );
        arrayLatLng[ 1 ] = record.get( 'sp_rLongitud' );

    } else if( record.get( 'gps_rLongitud' ) && record.get( 'gps_rLongitud' ) != '' ) {
        arrayLatLng[ 0 ] = record.get( 'gps_rLatitud' );
        arrayLatLng[ 1 ] = record.get( 'gps_rLongitud' );

    } else if( record.get( 'sp_rlongitud' ) && record.get( 'sp_rlongitud' ) != '' && record.get( 'sp_rlongitud' ) != 0 ) {
        arrayLatLng[ 0 ] = record.get( 'sp_rlatitud' );
        arrayLatLng[ 1 ] = record.get( 'sp_rlongitud' );

    } else if( record.get( 'gps_rlongitud' ) && record.get( 'gps_rlongitud' ) != '' ) {
        arrayLatLng[ 0 ] = record.get( 'gps_rlatitud' );
        arrayLatLng[ 1 ] = record.get( 'gps_rlongitud' );

    } else if( record.get( 'lat' ) && record.get( 'long' ) != '' ) {
        arrayLatLng[ 0 ] = record.get( 'lat' );
        arrayLatLng[ 1 ] = record.get( 'long' );

    } else if( record.get( 'cue_cLatLng' ) ) {
        var myLatLng = record.get( 'cue_cLatLng' );
        var arrayLatLng = myLatLng.split( ',' );

    } else {
        var myLatLng = record.get( 'cue_clatlng' );
        var arrayLatLng = myLatLng.split( ',' );
    }

    if( arrayLatLng.length > 1 ) {
        if( !isNaN( arrayLatLng[ 0 ] ) && !isNaN( arrayLatLng[ 1 ] ) ) {
            var point = new google.maps.LatLng( arrayLatLng[ 0 ], arrayLatLng[ 1 ] );
            return { lat: arrayLatLng[ 0 ], long: arrayLatLng[ 1 ], position: point, gps: record };
        }
        else return { lat: '', long: '', position: null }
    } else {
        return { lat: 0, long: 0, position: null };
    }
}
});
//MIGRADO2024
Ext.define( 'Common.controller.VehicleHistoricoMapController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'GeocercaMapModel' ],
views: [ 'VehicleHistoricoMapView' ],
init: function(config ) {
    this.control( {
        'vehiclehistoricomap': {
            afterrender: this.initview,
            poiChanged: this.onPoiChanged
        },
        'vehiclehistoricomap gmappanel6': {
            mapready: this.onMapReady
        },
        'vehiclehistoricomap #play': {
            toggle: this.onPlayToggle
        },
        'vehiclehistoricomap #velMax': {
            change: this.onVelMAxChange
        },
        'vehiclehistoricomap #exportKml': {
            click: this.onExportKmlClick
        }
    });
}, // cierro init
initview: function(view ) {
    var controller = this;
    var record = view.vehicle;
    view.maxSpeed = record.get( 'MaxSpeed' );
    view.down( '#velMax' ).setValue( view.maxSpeed );
},
onVelMAxChange: function(field, newvalue, oldvalue ) {
    var view = field.up( 'vehiclehistoricomap' );
    view.maxSpeed = newvalue;
    if( oldvalue > 0 ) {
        var mappanel = view.down( 'gmappanel6' );
        mappanel.fireEvent( 'mapready', mappanel );
    }
},
onMapReady: function(map ) {
    var controller = this;
    var view = map.up( 'vehiclehistoricomap' );
    var vehicle = view.vehicle;
    var flecha = view.down( '#btnFlechas' ).pressed;
    var geocercas = view.down( '#btnGeocercas' ).pressed;
    var lineas = view.down( '#btnLineas' ).pressed;
    var temp = controller.getMarkers( view );
    var points = temp.points;
    var markers = temp.markers;
    var fechaDesde = Ext.Date.format( points[ 0 ].fecha, 'Y-m-d H:i:s' );
    var fechaHasta = Ext.Date.format( points[ points.length - 1 ].fecha, 'Y-m-d H:i:s' );
    var title = getLocale( 'Recorrido' ) + ' ' + vehicle.get( 'cue_clinea' ) + '-' + vehicle.get( 'cue_ncuenta' ) + ' (' + getLocale( 'de' ) + ' ' + fechaDesde + ' ' + getLocale( 'a' ) + ' ' + fechaHasta + ' )';
    var bounds = controller.getBounds( points );
    var center = bounds.getCenter();
    view.geocercaArray = [];
    map.points = points;
    map.bounds = bounds;
    map.center = center;
    //view.setTitle(title);
    map.clearMarkers();
    if( lineas ) {
        // Primera línea negra para el borde
        map.addPolyline( points, {
            strokeColor: "#000000", 
            strokeOpacity: 1, 
            strokeWeight: 7, 
            strokeDashArray: [], 
            strokeDashOffset: 0,
        });
        // Línea amarilla encima de la línea negra
        map.addPolyline( points, {
            strokeColor: "#FFFF00", 
            strokeOpacity: 1,
            strokeWeight: 4, 
            strokeDashArray: [], 
            strokeDashOffset: 0,
        });
    }
    if( geocercas ) {
        var storegeocercas = Ext.create( 'Ext.data.Store', {
            model: 'Common.model.GeocercaSearchModel',
            remoteFilter: true,
            filters: [
                {
                    property: 'Cuenta',
                    value: vehicle.get( 'OwnerId' )
                }
            ]
        });
        storegeocercas.load( {
            callback: function( records, operation, success ) {
                Ext.Array.each( records, controller.mostrarGeocerca, { gmappanel6: map, controller: controller });
            }
        });
    }
    map.addMarkers( markers );
    map.getMap().setOptions( { mapMaker: false });
    map.getMap().fitBounds( bounds );
},
onPlayToggle: function(btn, pressed ) {
    var view = btn.up( '#historicoMapView' );
    var controller = this;
    var mappanel = view.down( 'gmappanel6' );
    var store = view._store;
    var vehicle = view.vehicle;
    view.down( '#btnFlechas' ).disable();
    Ext.Array.each( mappanel.cache.marker, function( marker ) {
        marker.setMap( null );
    })
    if( !view.player ) {
        var runner = new Ext.util.TaskRunner();
        view.player = runner.newTask( {
            run: function() {
                var qtty = store.count();
                var playerMarker = view.playerMarker;
                var position = view.playerPosition ? view.playerPosition : 0;
                var markers = mappanel.cache.marker;
                var marker = markers[ position ];
                var record = marker.record;
                var label = Ext.Date.format( record.get( 'gps_isofechahora' ), 'm-d H:i:s' );
                var text = '[' + position + '] ' + label + ' ' + record.get( 'cod_cdescripcion' ) + ' ' + record.get( 'gps_cDireccion' );
                var field = view.down( '#posicionField' );
                marker.setMap( mappanel.getMap() );
                if( !playerMarker ) {
                    mark = {
                        marker: null,
                        zIndex: 1000,
                        icon: controller.getVehicleIcon( record ),
                        labelContent: label,
                        labelAnchor: new google.maps.Point( 40, 0 ),
                        labelClass: "gmaplabel2", // the CSS class for the label
                        labelStyle: { opacity: 0.75 },
                        lat: record.get( 'gps_rLatitud' ),
                        lng: record.get( 'gps_rLongitud' ),
                        record: record,
                        title: Ext.Date.format( record.get( 'gps_isofechahora' ), 'Y-m-d H:i:s' ),
                        draggable: false
                    }
                    var mkr_point = new google.maps.LatLng( mark.lat, mark.lng );
                    view.playerMarker = mappanel.addMarker( mkr_point, mark, false, true, null );
                    //mappanel.getMap().setZoom(14);
                    playerMarker = view.playerMarker;
                } else {
                    if( position > qtty - 1 ) {
                        position = 0;
                    }
                    if( !playerMarker.getMap() ) {
                        playerMarker.setMap( mappanel.getMap() );
                    }
                    playerMarker.set( 'labelContent', label );
                    //field.setValue(text);
                    playerMarker.setPosition( marker.getPosition() );
                    playerMarker.setIcon( controller.getVehicleIcon( record ) );
                    mappanel.getMap().setCenter( playerMarker.getPosition() );
                    position++;
                    view.playerPosition = position;
                }
                //markers[position].setIcon(controller.getMarkerIcon(position,qtty,true,markers[position]));
            },
            interval: view.velocidad
        });
    }
    view.player.start();
},
    
getMarkers: function(view ) {
    var store = view._store;
    var flecha = view.down( '#btnFlechas' ).pressed;
    var vehicle = view.vehicle;
    var points = new Array();
    var markers = new Array();
    var controller = this;
    store.each( function( record, index, total ) {
        // filtro puntos para moviles autos (no mascotas ni personas
        if( record.get( 'tip_nTipo' ) == 1 && record.get( 'gps_iVelocidad' ) < 10 && record.get( '_distancia' ) < 0.08 && index != 0 && index != total - 1 ) {
            //console.log(record.get('gps_iVelocidad'),record.get('_distancia'));
            return;
        }
        else {
            points.push( { lat: record.get( 'gps_rLatitud' ), lng: record.get( 'gps_rLongitud' ), fecha: record.get( 'gps_isorawfechahora' ) });
            markers.push( new google.maps.Marker(
                {
                    position: new google.maps.LatLng( record.get( 'gps_rLatitud' ), record.get( 'gps_rLongitud' ) ),
                    lat: record.get( 'gps_rLatitud' ),
                    lng: record.get( 'gps_rLongitud' ),
                    record: record,
                    title: Ext.Date.format( record.get( 'gps_isorawfechahora' ), 'Y-m-d H:i:s' ),
                    icon: controller.getMarkerIcon( index, total, false, { record: record }, flecha, view ),
                    infoWindow: {
                        content: controller.getVehicleInfoWindowHtml( vehicle, record ),
                        listener: 'click'
                    },
                    draggable: false
                }
            ) );
        }
    });
    // agrego los puntos detenidos
    var detenidosActive = view.down( '#detenido' ).pressed;
    if( detenidosActive ) {
        view._storeDetenidos.each( function( record, index, total ) {
            //points.push({lat: record.get('gps_rlatitud'), lng: record.get('gps_rlongitud'),fecha: record.get('min_fecha')});
            markers.push( new google.maps.Marker(
                {
                    position: new google.maps.LatLng( record.get( 'gps_rlatitud' ), record.get( 'gps_rlongitud' ) ),
                    lat: record.get( 'gps_rlatitud' ),
                    lng: record.get( 'gps_rlongitud' ),
                    record: record,
                    title: getLocale( 'Detenido ' ) + Ext.Date.format( record.get( 'pos_isorawfechahora' ), 'Y-m-d H:i:s' ),
                    icon: new google.maps.MarkerImage(
                        '/resources/softguard/images/stop.png',
                        new google.maps.Size( 32, 37 ),
                        new google.maps.Point( 0, 0 ),
                        new google.maps.Point( 16, 37 )
                    ),
                    infoWindow: {
                        content: controller.getVehicleDetenidoInfoWindowHtml( vehicle, record ),
                        listener: 'click'
                    },
                    draggable: false
                }
            ) );
        });
    }
    return { points: points, markers: markers }
},
getMarkerIcon: function(i, total, old, marker, flecha, view ) {
    var selected = '';
    var iconUrl = '';
    var record = marker ? marker.record : null;
    switch( i ) {
        case 0:
            iconUrl = '/resources/softguard/images/start.png';
            var image = new google.maps.MarkerImage(
                iconUrl,
                new google.maps.Size( 32, 37 ),
                new google.maps.Point( 0, 0 ),
                new google.maps.Point( 16, 37 )
            );
            break;
        case total - 1:
            iconUrl = '/resources/softguard/images/finish.png';
            var image = new google.maps.MarkerImage(
                iconUrl,
                new google.maps.Size( 32, 37 ),
                new google.maps.Point( 0, 0 ),
                new google.maps.Point( 16, 37 )
            );
            break;
        default:
            var rotation = 0;
            var path = google.maps.SymbolPath.FORWARD_CLOSED_ARROW;
            if( record && record.get( 'gps_Rumbo' ) ) {
                switch( record.get( 'gps_Rumbo' ) ) {
                    case 'up':
                        rotation = 0;
                        break;
                    case 'upright':
                        rotation = 45;
                        //rotation = 0;
                        break;
                    case 'right':
                        rotation = 90;
                        //rotation = 0;
                        break;
                    case 'downright':
                        rotation = 135;
                        //rotation = 0;
                        break;
                    case 'down':
                        rotation = 180;
                        //rotation = 0;
                        break;
                    case 'downleft':
                        rotation = 225;
                        //rotation = 0;
                        break;
                    case 'left':
                        rotation = 270;
                        //rotation = 0;
                        break;
                    case 'upleft':
                        rotation = 315;
                        //rotation = 0;
                        break;
                    case 'stop':
                        rotation = 0;
                        path = google.maps.SymbolPath.CIRCLE;
                        break;
                }
            }
            if( record.get( 'gps_iVelocidad' ) == 0 ) {
                rotation = 0;
                path = google.maps.SymbolPath.CIRCLE;
            }
            //console.log(record.get('gps_Rumbo'), rotation, path);
            // me fijo si mostrar flechas o circulos
            if( view.maxSpeed < record.get( 'gps_iVelocidad' ) ) {
                iconUrl = '/resources/global/images/icons/velocimeter.png';
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size( 32, 37 ),
                    new google.maps.Point( 0, 0 ),
                    new google.maps.Point( 16, 37 )
                );
            }
            else if( flecha ) {
                var image = {
                    path: path,
                    scale: 4,
                    rotation: rotation,
                    fillColor: 'red',
                    fillOpacity: 0.5,
                    strokeWeight: 1,
                    strokeColor: 'red'
                };
            } else {
                iconUrl = old ? '/resources/softguard/images/icon_dot_verde.gif' : '/resources/softguard/images/icon_dot-nonew.gif';
                var image = new google.maps.MarkerImage(
                    iconUrl,
                    new google.maps.Size( 10, 10 ),
                    new google.maps.Point( 0, 0 ),
                    new google.maps.Point( 5, 5 )
                );
            }
            break;
    }
    return image;
},
    
getVehicleInfoWindowHtml: function(vehicle, gps ) {
    var html = '\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            <span style="font-weight:bold;">'+ getLocale( 'Velocidad' ) + ':</span><span> {velocidad}km/h</span><br/>\
            <span style="font-weight:bold;">'+ getLocale( 'Fecha recepción' ) + ':</span><span>  {fecha}</span><br/>\
            <span style="font-weight:bold;">'+ getLocale( 'Fecha GPS' ) + ':</span><span>  {fechaRaw}</span><br/>\
            <span style="font-weight:bold;">'+ getLocale( 'Dirección' ) + ':</span><span>  {direccion}</span><br/>\
            <span style="font-weight:bold;">'+ getLocale( 'Evento' ) + ':</span><span>  {evento}</span><br/>\
            <span style="font-weight:bold;">'+ getLocale( 'Odómetro' ) + ':</span><span>  {odometro}</span><br/>\
            <!-- span style="font-weight:bold;">'+ getLocale( 'Rumbo' ) + ':</span><span>  {rumbo}</span><br/-->';
    html = html.replace( /\{dealer\}/, vehicle.get( 'cue_clinea' ) );
    html = html.replace( /\{ncuenta\}/, vehicle.get( 'cue_ncuenta' ) );
    html = html.replace( /\{nombre\}/, vehicle.get( 'Domain' ) );
    html = html.replace( /\{cuenta\}/, vehicle.get( 'cue_cnombre' ) );
    html = html.replace( /\{velocidad\}/, gps.get( 'gps_iVelocidad' ) );
    html = html.replace( /\{rumbo\}/, gps.get( 'gps_Rumbo' ) );
    html = html.replace( /\{direccion\}/, gps.get( 'gps_cDireccion' ) );
    html = html.replace( /\{fechaRaw\}/, Ext.Date.format( gps.get( 'gps_isorawfechahora' ), 'd-m-Y H:i:s' ) );
    html = html.replace( /\{fecha\}/, Ext.Date.format( gps.get( 'gps_isofechahora' ), 'd-m-Y H:i:s' ) );
    html = html.replace( /\{evento\}/, gps.get( 'cod_cdescripcion' ) );
    html = html.replace( /\{odometro\}/, gps.get( 'gps_iOdometro' ) );
    return html
},
    
getVehicleDetenidoInfoWindowHtml: function(vehicle, gps ) {
    var html = '\
            <H1>{dealer}-{ncuenta} {cuenta}</H1>\
            <span style="font-weight:bold;">'+ getLocale( 'Desde' ) + ':</span><span>  {minFecha}</span><br/>\
            <span style="font-weight:bold;">'+ getLocale( 'Hasta' ) + ':</span><span>  {maxFecha}</span><br/>\
            <span style="font-weight:bold;">'+ getLocale( 'Tiempo detenido' ) + ':</span><span>  {detenido}</span><br/>\
            <span style="font-weight:bold;">'+ getLocale( 'Dirección' ) + ':</span><span>  {direccion}</span><br/>\
        ';
    html = html.replace( /\{dealer\}/, vehicle.get( 'cue_clinea' ) );
    html = html.replace( /\{ncuenta\}/, vehicle.get( 'cue_ncuenta' ) );
    html = html.replace( /\{nombre\}/, vehicle.get( 'Domain' ) );
    html = html.replace( /\{cuenta\}/, vehicle.get( 'cue_cnombre' ) );
    html = html.replace( /\{velocidad\}/, gps.get( 'gps_iVelocidad' ) );
    html = html.replace( /\{rumbo\}/, gps.get( 'gps_Rumbo' ) );
    html = html.replace( /\{direccion\}/, gps.get( 'gps_cdireccion' ) );
    html = html.replace( /\{detenido\}/, gps.get( 'minutos' ) );
    html = html.replace( /\{minFecha\}/, Ext.Date.format( gps.get( 'min_fecha' ), 'd-m-Y H:i:s' ) );
    html = html.replace( /\{maxFecha\}/, Ext.Date.format( gps.get( 'max_fecha' ), 'd-m-Y H:i:s' ) );
    html = html.replace( /\{fecha\}/, Ext.Date.format( gps.get( 'gps_isofechahora' ), 'd-m-Y H:i:s' ) );
    html = html.replace( /\{evento\}/, gps.get( 'cod_cdescripcion' ) );
    html = html.replace( /\{odometro\}/, gps.get( 'gps_iOdometro' ) );
    return html
},
    
getBounds: function(markers ) {
    var bounds = new google.maps.LatLngBounds();
    Ext.each( markers, function( marker, index, array ) {
        var point = new google.maps.LatLng( marker.lat, marker.lng );
        bounds.extend( point );
    });
    return bounds
},
    
getVehicleIcon: function(record ) {
    var color = '';
    if( record.get( 'gps_iVelocidad' ) == 0 ) {
        iconUrl = '/resources/softguard/images/stop' + color + '.png';
    } else {
        iconUrl = '/resources/softguard/images/direction_' + record.get( 'gps_Rumbo' ) + color + '.png';
    }
    var image = new google.maps.MarkerImage(
        iconUrl,
        new google.maps.Size( 32, 37 ),
        new google.maps.Point( 0, 0 ),
        new google.maps.Point( 16, 37 )
    );
    return image;
},
onExportKmlClick: function(btn ) {
    var view = btn.up( 'vehiclehistoricomap' );
    var store = view._store;
    var filter = store.getProxy().encodeFilters( store.filters.items );
    var record = view.vehicle;
    var url = '/handler/ExportKml?filter=' + filter + '&filename=' + getLocale( 'posiciones' ) + '_' + record.get( 'Domain' ) + '.kml'
    window.location = url;
},
        
mostrarGeocerca: function(record, index, array ) {
    var controller = this.controller;
    var me = this.controller;
    var gmappanel6 = this.gmappanel6;
    var map = gmappanel6.getMap();
    var metadata = Ext.create( me.getGeocercaMapModelModel() );
    var tipo = record.get( 'GeoType' );
    var color = '';
    var view = gmappanel6.up( 'vehiclehistoricomap' );
    if( tipo == 'E' ) {
        color = 'Red';
    } else if( tipo == 'I' ) {
        color = 'Green';
    } else {
        color = 'Yellow';
    }
    metadata.data = Ext.JSON.decode( record.get( 'MetaData' ) );
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
},
onPoiChanged: function(pois, gmappanel6 ) {
    var controller = this;
    Ext.Array.each( pois, controller.showMarker, { gmappanel6: gmappanel6, controller: controller });
},
    
showMarker: function(marker ) {
    var gmappanel6 = this.gmappanel6;
    var controller = this.controller;
    var view = gmappanel6.up( 'vehiclehistoricomap' );
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
        gmappanel6.cache.marker[ marker.markerIndex ].setPosition( pos.position );
        gmappanel6.cache.marker[ marker.markerIndex ].setMap( gmappanel6.getMap() );
        gmappanel6.cache.infowindow[ marker.markerIndex ].setContent( infoHtml );
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
        gmappanel6.addMarker( pos.position, newmarker, clear, center, listeners );
        marker.markerIndex = gmappanel6.cache.marker.length - 1;
    }
},
    
getMarkerInfoWindowHtml: function(marker, pos ) {
    var html = '\
            <H1>{nombre}</H1>\
            <H2>{direccion}</H2>';
    html = html.replace( /\{nombre\}/, marker.get( 'Name' ) );
    html = html.replace( /\{direccion\}/, marker.get( 'FullAddress' ) );
    return html
}
})
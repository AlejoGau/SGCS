//MIGRADO2024
Ext.define( 'Common.controller.EventosMapController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [  ],
views: [ 'EventosMapView' ],
init: function(config ) {
    this.control( {
        'eventosmapview gmappanel6': {
            mapready: this.onMapReady
        },
        'eventosmapview #btnAddress': {
            click: this.onAddressClick
        },
        'eventosmapview': {
            activate: this.onActivate
        }
    });
}, // cierro init
onMapReady: function(gmappanel6 ) {
    var view = gmappanel6.up( 'eventosmapview' );
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
    this.showMarkerArray( gmappanel6, this );
},
    
onActivate: function(view ) {
    var gmappanel6 = view.down( 'gmappanel6' );
    var gmapsize = gmappanel6.getSize();
    gmappanel6.setSize( gmapsize.width, gmapsize.height );
},
    
onAddressClick: function(button ) {
    var form = button.up( 'form' );
    var gmappanel6 = Ext.getCmp( 'gmappanel6' );
    var address = form.down( '#address' ).getValue();
    var infoHtml = '';
    newmarker = {
        infoWindow: {
            content: infoHtml,
            listener: 'mouseover',
            disableAutoPan: true
        },
        geoCodeAddr: address,
        draggable: false
    };
    gmappanel6.addMarkers( [ newmarker ] );
},
    
getMarkerIcon: function(record, gmappanel6 ) {
    var iconUrl = '';
    //console.log(record.get('rec_calarma'));
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
        default:
            tipoIcon = 'sos';
    }
    var iconUrl = '/resources/softguard/images/mapguard-cservice/' + tipoIcon + '.png';
    var image = new google.maps.MarkerImage(
        iconUrl,
        new google.maps.Size( 48, 48 ),
        new google.maps.Point( 0, 0 ),
        new google.maps.Point( 16, 35 )
    );
    return image;
},
    
    
showMarkerArray: function(gmappanel6, controller ) {
    var view = gmappanel6.up( 'eventosmapview' );
    var markers = view.markerList;
    Ext.Array.each( markers, controller.showMarker, { gmappanel6: gmappanel6, controller: controller });
    var center = true;
    var active = Ext.Array.filter( gmappanel6.cache.marker, function( item ) {
        return item.getMap()
    });
    if( center && active.length > 0 ) {
        var bounds = controller.getBounds( active );
        gmappanel6.getMap().fitBounds( bounds );
        if( view.vehicleSelected && view.vehicleSelected.position ) {
            gmappanel6.getMap().setCenter( view.vehicleSelected.position );
            gmappanel6.getMap().setZoom( 12 );
        } else {
            //gmappanel6.getMap().setZoom(gmappanel6.getMap().getZoom()-2);
        }
    }
},
    
    
showMarker: function(marker, index, array ) {
    var gmappanel6 = this.gmappanel6;
    var controller = this.controller;
    var view = gmappanel6.up( 'eventosmapview' );
    var clear = false;
    var center = false;
    var lat = marker.get( 'gps_rLatitud' );
    var long = marker.get( 'gps_rLongitud' );
    var point = new google.maps.LatLng( lat, long );
    var pos = { lat: lat, long: long, position: point };
    var listeners = {};
    if( lat == "" && long == "" ) {
        return;
    }
    //var iconUrl = '/resources/softguard/images/icon_dot-nonew.gif';
    var iconUrl = controller.getMarkerIcon( marker, gmappanel6 );
    var infoHtml = controller.getMarkerInfoWindowHtml( marker, pos );
    var cuenta = marker.get( 'cue_clinea' ) + '-' + marker.get( 'cue_ncuenta' );
    // siempre creo el marker porque esta ventana se cierra y se vuelve abrir con el mismo store de records.
    /*
            if (typeof marker.markerIndex !== "undefined"  && marker.markerIndex != 0){
                gmappanel6.cache.marker[marker.markerIndex].setPosition(pos.position);
                gmappanel6.cache.marker[marker.markerIndex].setMap(gmappanel6.getMap());
                gmappanel6.cache.infowindow[marker.markerIndex].setContent(infoHtml);
                
            } else {*/
    newmarker = {
        lat: pos.lat,
        lng: pos.long,
        record: marker,
        icon: iconUrl,
        labelContent: cuenta,
        labelAnchor: new google.maps.Point( 40, 0 ),
        labelClass: "gmaplabel", // the CSS class for the label
        labelStyle: { opacity: 1/*0.75*/ },
        title: cuenta,
        infoWindow: {
            content: infoHtml,
            listener: 'mouseover',
            disableAutoPan: true
        },
        draggable: false
    };
    gmappanel6.addMarker( pos.position, newmarker, clear, center, listeners );
    marker.markerIndex = gmappanel6.cache.marker.length - 1;
    // }
},
    
    
getMarkerInfoWindowHtml: function(marker, pos ) {
    var html = '\
            <B>{nombre}</B>\
            <H2>{fecha}</H2>\
            <H2>{usuario}</H2>\
            <H2>{zona}</H2>\
            <H2>{Evento}</H2>';
    html = html.replace( /\{nombre\}/, marker.get( 'cue_clinea' ) + '-' + marker.get( 'cue_ncuenta' ) + ' ' + marker.get( 'cue_cnombre' ) );
    html = html.replace( /\{fecha\}/, Ext.Date.format( marker.get( 'rec_isoFechaHora' ), 'D d-m-Y G:i:s' ) );
    html = html.replace( /\{Evento\}/, marker.get( 'rec_calarma' ) + ' ' + marker.get( 'cod_cdescripcion' ) );
    html = html.replace( /\{usuario\}/, marker.get( 'usu_cnombre' ) );
    html = html.replace( /\{zona\}/, marker.get( 'zon_cdescripcion' ) );
    return html
},
getBounds: function(markers ) {
    var bounds = new google.maps.LatLngBounds();
    Ext.each( markers, function( marker, index, array ) {
        bounds.extend( marker.position );
    });
    return bounds
}
    
});
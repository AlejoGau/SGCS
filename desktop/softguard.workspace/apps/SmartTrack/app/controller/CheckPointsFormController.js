var par_NOMBREPAIS;
par_NOMBREPAIS = getParametro( 'NOMBREPAIS' )
// esto global no me gusta... lo cambie a getparametro, pero deberiamos sacar la variable global


Ext.define( 'SmartTrack.controller.CheckPointsFormController', {
    extend: 'Ext.app.Controller',
    stores: [ 'ProvinciasStore' ],
models: [ 'CheckPointsModel', 'SoftguardZonaModel', 'SoftguardCuentaModel' ],
views: [ 'CheckPointsFormView' ],

init: function(config ) {
    // genero los eventos

    this.control( {
        'checkpointsformview': {
            afterrender: this.initview
        },
        'checkpointsformview button[action="save"]': {
            click: this.onSaveClick
        },
        'checkpointsformview button[action="map"]': {
            click: this.onMapClick
        },
        '#mapWindow button[action="saveMap"]': {
            click: this.onMapSaveClick
        },
        '#mapWindow button[action="buscar"]': {
            click: this.onBuscarMapClick
        },
        'checkpointsformview #chktipo': {
            change: this.onChangeTipo
        },
        'checkpointsformview #btnqr': {
            click: this.onBtnQrClick
        },
        'checkpointsformview #novalidadposicion': {
            change: this.onNoValidarPosicion
        }


    });
}, // cierro init


onNoValidarPosicion: function (check, value ) {
    var view = check.up( 'checkpointsformview' );
    if( check.checked ) {
        view.down( '#chp_iTolerancia' ).setValue( 0 );
        view.down( '#chp_iTolerancia' ).hide();
    } else {
        //view.down( '#chp_iTolerancia' ).setValue( 10 );
        view.down( '#chp_iTolerancia' ).show();
    }

},
    
onChangeTipo: function(combo, newValue ) {
    var view = combo.up( 'checkpointsformview' );
    if( view.record.get( 'Id' ) == 0 ) {
        view.down( '#referencia' ).setValue( '' );
    }

    if( newValue == 0 ) {
        view.down( '#referencia' ).hide();
        view.down( '#btnqr' ).show();
        if( view.down( '#referencia' ).getValue() == '' ) {
            view.down( '#referencia' ).setValue( new Date().getTime() );
        }

    } else if( newValue == 2 ) {
        view.down( '#btnqr' ).hide();
        if( view.down( '#referencia' ).getValue() == '' ) {
            view.down( '#referencia' ).setValue( new Date().getTime() );
        }
        view.down( '#referencia' ).hide();
    } else if( newValue == 3 ) { // NFC
        view.down( '#btnqr' ).hide();
        if( view.down( '#referencia' ).getValue() == '' ) {
            // view.down('#referencia').setValue(new Date().getTime());
            // comento para que no aparezca un valor por defecto dedalo 16/2/2018
        }
        view.down( '#referencia' ).show();
    } else if( newValue == 4 ) {
        view.down( '#btnqr' ).hide();
        if( view.down( '#referencia' ).getValue() == '' ) {
            view.down( '#referencia' ).setValue( new Date().getTime() );
        }
        view.down( '#referencia' ).show();
    } else {
        view.down( '#btnqr' ).hide();
        view.down( '#referencia' ).show();
    }


},
    
onBtnQrClick: function(button, event, options ) {

    var view = button.up( 'checkpointsformview' );


    var win = Ext.create( 'Ext.Window', {
        iconCls: 'icon-table-add',
        layout: 'fit',
        title: 'QR Code',
        width: 390,
        height: 450,
        border: false,
        items: [
            {
                xtype: 'simpleiframe',
                itemId: 'Iframe',
                height: 0,
                border: false,
                width: '100%',
                src: '/handler/QrCodeHandler?title=' + view.down( '#descripcion' ).getValue() + '&code=' + view.down( '#referencia' ).getValue()+'&url=' + view.down('#chp_cURL').getValue()
            }
        ],
        tbar: [
            {
                text: 'Imprimir',
                iconCls: 'icon-printer',
                handler: function( button ) {
                    var iframe = button.up( 'window' ).down( '#Iframe' );
                    var ele = iframe.getEl();

                    document.getElementById( 'iframe-' + ele.id ).contentWindow.printMe();

                }
            }
        ],
        caller: view
    });
    win.show();


},
    
initview: function(view ) {

    this.loadRecord( view );

    if( view.record.get( 'Id' ) != 0 ) {
        view.down( '#chktipo' ).hide();
    }

    if( view.record.get( 'chp_iTolerancia' ) == 0 ) {
        view.down( '#novalidadposicion' ).setValue( true )

    }

},
    
loadRecord: function(view ) {
    var modelCheckPoints = this.getCheckPointsModelModel();
    var modelZona = this.getSoftguardZonaModelModel();
    var controller = this;

    var record = view.record;

    view.down( '#referencia' ).setValue( Ext.util.Format.trim( record.get( 'chp_cReference' ) ) );
    view.down( '#latitud' ).setValue( record.get( 'chp_rLatitud' ) );
    view.down( '#longitud' ).setValue( record.get( 'chp_rLongitud' ) );
    view.down( '#descripcion' ).setValue( record.get( 'zon_cdescripcion' ) );
    view.down( '#observacion' ).setValue( record.get( 'zon_mobservacion' ) );
    view.down( '#chp_iTolerancia' ).setValue( record.get( 'chp_iTolerancia' ) );
    view.down( '#chp_cURL' ).setValue( record.get('chp_cURL') );
    if( record.get( 'chp_nTipo' ) == 0 ) {
        view.down( '#chktipo' ).setValue( '' );
    } else {
        view.down( '#chktipo' ).setValue( record.get( 'chp_nTipo' ) );
    }


},    


onSaveClick: function(button, event, options ) {
    var view = button.up( 'checkpointsformview' );
    var win = button.up( 'window' );
    var myform = button.up( 'form' ).getForm();
    var modelCheckPoints = this.getCheckPointsModelModel();
    var modelZona = this.getSoftguardZonaModelModel();
    var controller = this;

    var d = new Date(); // para el variable de referencia

    var objectId = view.record.get( 'chp_idKey' );
    var cuentaid = view.record.get( 'chp_iCuenta' );
    var referencia = view.down( '#referencia' ).getValue() != '' ? view.down( '#referencia' ).getValue() : d.getTime();

    if( myform.isValid() ) {
        if( objectId == 0 ) {
            Ext.Ajax.request( {
                url: '/rest/search/CheckPointCrud',
                params: {
                    'Id': 0,
                    'cue_iid': cuentaid,
                    'zon_cdescripcion': view.down( '#descripcion' ).getValue(),
                    'zon_mobservacion': view.down( '#observacion' ).getValue(),
                    'chp_cReference': referencia,
                    'chp_rLatitud': view.down( '#latitud' ).getValue(),
                    'chp_rLongitud': view.down( '#longitud' ).getValue(),
                    'chp_nTipo': view.down( '#chktipo' ).getValue(),
                    'chp_iTolerancia': view.down( '#chp_iTolerancia' ).getValue(),
                    'zon_cimagen': view.record.get( 'zon_cimagen' ),
                    'chp_cURL' : view.down('#chp_cURL').getValue()
                },
                method: 'GET',
                scope: this,
                success: function( response ) {
                    var parametros = Ext.JSON.decode( response.responseText );
                    var rec = parametros.rows[ 0 ];

                    if( rec ) {
                        notify( 'Se creo con exito el checkpoint' )
                        view.caller.fireEvent( 'objectchanged', view.caller, record );
                        win.close();
                    }

                }

            });


        } else {

            Ext.Ajax.request( {
                url: '/rest/search/CheckPointCrud',
                params: {
                    'Id': view.record.get( 'Id' ),
                    'cue_iid': cuentaid,
                    'zon_cdescripcion': view.down( '#descripcion' ).getValue(),
                    'zon_mobservacion': view.down( '#observacion' ).getValue(),
                    'chp_cReference': view.down( '#referencia' ).getValue(),
                    'chp_rLatitud': view.down( '#latitud' ).getValue(),
                    'chp_rLongitud': view.down( '#longitud' ).getValue(),
                    'chp_nTipo': view.down( '#chktipo' ).getValue(),
                    'chp_iTolerancia': view.down( '#chp_iTolerancia' ).getValue(),
                    'zon_cimagen': view.record.get( 'zon_cimagen' ),
                    'chp_cURL' : view.down('#chp_cURL').getValue()


                },
                method: 'GET',
                scope: this,
                success: function( response ) {
                    var parametros = Ext.JSON.decode( response.responseText );
                    var rec = parametros.rows[ 0 ];

                    if( rec ) {
                        notify( 'Se modifico con exito el checkpoint' )
                        view.caller.fireEvent( 'objectchanged', view.caller, record );
                        win.close();
                    }

                }

            });

        }




    }

},

    
onMapClick: function(button, event, options ) {
    var view = button.up( 'checkpointsformview' );
    var myForm = view.getForm();
    var myrecord = myForm.getRecord();

    var mylat = view.down( '#latitud' ).getValue();
    var myLong = view.down( '#longitud' ).getValue();


    console.log( mylat, myLong )

    var mappanel = Ext.widget( 'gmappanel', {
        zoomLevel: 5,
        width: '100%',
        flex: 1,
        gmapType: 'map',
        mapConfOpts: [ 'enableScrollWheelZoom', 'enableDoubleClickZoom', 'enableDragging' ],
        mapControls: [ 'GSmallMapControl', 'GMapTypeControl', 'NonExistantControl' ],
        geocodePosition: function( pos, infowindow ) {
            var geocoder = this.getGeocoder();
            geocoder.geocode( {
                latLng: pos
            }, function( responses ) {
                if( responses && responses.length > 0 ) {
                    var address = responses[ 0 ].address_components;
                    win.down( '#address' ).setText( address[ 0 ].long_name + ', ' + address[ 2 ].long_name + ', ' + address[ 3 ].long_name );

                } else {
                    var msg = 'No se encontró una dirección válida.';
                    //updateMarkerAddress(msg);
                    win.down( '#address' ).setText( msg );
                }
            });
        }
    });
    if( mylat && myLong && ( mylat != 0 || mylat != '' ) && ( myLong != 0 || myLong != '' ) ) {
        Ext.apply( mappanel, {
            zoomLevel: 14,
            setCenter: {
                lat: mylat,
                lng: myLong,
                marker: {
                    title: 'Punto',
                    draggable: true
                },
                listeners: {
                    dragend: function( e ) {
                        var latlng = e.latLng;
                        //var field = myForm.findField('cue_cLatLng'), 
                        var lat = latlng.lat();
                        var long = latlng.lng();
                        //field.setValue(lat + ',' + long);
                        mappanel.getMap().setCenter( latlng, mappanel.zoomLevel );
                    }
                }
            }
        });
    } else {
        Ext.apply( mappanel, {
            zoomLevel: 14,
            setCenter: {
                geoCodeAddr: par_NOMBREPAIS,
                marker: {
                    title: 'Punto',
                    draggable: true
                },
                listeners: {
                    dragend: function( e ) {
                        var latlng = e.latLng;
                        //var field = myForm.findField('cue_cLatLng'), 
                        var lat = latlng.lat();
                        var long = latlng.lng();
                        //field.setValue(lat + ',' + long);
                        mappanel.getMap().setCenter( latlng, mappanel.zoomLevel );
                    }
                }
            }
        });
    }
    var win = Ext.create( 'Ext.Window', {
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        title: 'Mapa',
        closeAction: 'hide',
        itemId: 'mapWindow',
        width: 550,
        height: 550,
        border: true,
        modal: true,
        view: view,
        tbar: [
            { text: 'Guardar', action: 'saveMap' }
        ],
        items: [
            {
                xtype: 'form',
                itemId: 'mapAddress',
                width: '100%',

                items: [
                    {
                        xtype: 'fieldset',
                        title: 'Buscador',
                        collapsible: true,
                        collapsed: true,
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Calle',
                                //value:  myForm.findField('cue_ccalle').getValue(),
                                name: "calle"

                            }, {
                                xtype: 'textfield',
                                fieldLabel: 'Ciudad',
                                //value:  myForm.findField('cue_clocalidad').getValue(),
                                name: "localidad"

                            }, {
                                xtype: 'combo',
                                fieldLabel: 'Provincia / Estado',
                                store: 'ProvinciasStore',
                                name: "provincia",
                                // value:  myForm.findField('cue_cprovincia').getValue(),
                                displayField: 'pro_cdescripcion',
                                editable: true,
                                autoSelect: false,
                                forceSelection: false,
                                itemId: 'comboProvincia',
                                valueField: 'Codigo'
                            },
                            { xtype: 'button', text: 'Buscar', action: 'buscar' }
                        ]
                    }
                ]
            },
            mappanel
        ]
    });
    win.show();
},
    
onBuscarMapClick: function(button, event, options ) {
    var win = button.up( '#mapWindow' );
    var view = win.view;
    var form = win.down( 'form' ).getForm();
    var map = win.down( 'gmappanel' );
    var provincia = form.findField( 'provincia' ).getRawValue();
    var calle = form.findField( 'calle' ).getValue();
    var localidad = form.findField( 'localidad' ).getValue();
    var myAddr = calle + ' ,' + localidad + ' ,' + provincia + ' ,' + view.pais;

    var geocoder = map.getGeocoder();
    geocoder.geocode( {
        address: myAddr
    }, function( result, status ) {
        if( status == 'OK' ) {
            var location = result[ 0 ].geometry.location;
            var pos = new google.maps.LatLng( location.lat, location.lng );
            //este código estaba comentado, 05/10/2023 Daniel O. Medina se reactiva según tarea https://softguard.atlassian.net/browse/DSS-758
            if( map.cache.marker.length > 0 ) {
                map.cache.marker[ 0 ].setPosition( pos );
            } else {
                map.addMarker( pos, {});
            }

            map.getMap().setCenter( pos );
            map.getMap().setZoom( 14 );
        }
    });

    //map.geoCodeLookup( myAddr, map.setCenter.marker, true, true, map.setCenter.listeners );
},
    
onMapSaveClick: function(button, event, options ) {
    var win = button.up( '#mapWindow' );
    var view = win.view;
    var map = win.down( 'gmappanel' );
    var latlng = map.getCenterLatLng();


    lat = latlng.lat,
        long = latlng.lng;
    view.down( '#latitud' ).setValue( lat );
    view.down( '#longitud' ).setValue( long );

    win.close();
    notify( 'Posición establecida. Debe guardar.' );
}
    
   

	
   
});
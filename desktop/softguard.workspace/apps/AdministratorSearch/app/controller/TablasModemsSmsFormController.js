Ext.define( 'AdministratorSearch.controller.TablasModemsSmsFormController', {
    extend: 'Ext.app.Controller',
    stores: [ 'TablasTerminalesStore' ],
models: [ 'TablasModemsSmsModel', 'TablasTerminalesSearchModel', 'TablasMedicosSearchModel', 'TablasModemsSmsSearchModel', 'GatewaySearchModel' ],
views: [ 'TablasModemsSmsFormView' ],

init: function(config ) {
    // genero los eventos

    this.control( {
        'tablasmodemssmsformview': {
            beforerender: this.initview,
        },
        'tablasmodemssmsformview button[action="save"]': {
            click: this.onSaveClick
        },
        'tablasmodemssmsformview #puerto': {
            change: this.onPuertoChange
        },
        'tablasmodemssmsformview #gateways': {
            change: this.onGatewayChange
        }
    });
}, // cierro init

initview: function(view ) {
    view.Gatestore = Ext.create( 'Ext.data.Store', {
        model: this.getGatewaySearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true
    })
    view.down( '#gateways' ).bindStore( view.Gatestore );
    view.Gatestore.load( {
        callback: function() {
            if( view.down( '#gateways' ).getValue() == 0 ) {
                view.down( '#gateways' ).setRawValue( '' );
            }
        }
    });

    view.storeTerminales = Ext.create( 'Ext.data.Store', {
        model: this.getTablasTerminalesSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true
    })
    view.down( '#terminal' ).bindStore( view.storeTerminales );
    view.storeTerminales.load();


    if( view.record.get( 'tgm_ntipo' ) == 0 ) {
        view.down( '#smpp' ).show();
    } else {
        view.down( '#smpp' ).hide();
    }

    view.loadRecord( view.record );
    view.down( '#sms_csourceImei' ).setValue( view.record.get( 'sms_csource' ) );
    view.down( '#dealer' ).setValue( view.record.get( 'sms_cDealer' ) )
},
onGatewayChange: function (field, newVal, oldVal ) {
    var view = field.up( 'tablasmodemssmsformview' );
    var form = view.getForm();
    var record = view.Gatestore.findRecord( 'Id', newVal )

    if( record ) {
        view.down( '#sms_csourceImei' ).setDisabled( true )

        if( record.get( 'tgm_ntipo' ) == 0 ) {
            view.down( '#smpp' ).show();
        } else {
            view.down( '#smpp' ).hide();

            view.down( '#sms_ndefault' ).show();
            view.down( '#sms_nEstado' ).show();
            view.down( '#terminal' ).show();

            form.findField( 'sms_nport' ).clearInvalid();
            form.findField( 'sms_nport' ).textValid = true;
            form.findField( 'sms_cseteo' ).clearInvalid();
            form.findField( 'sms_cseteo' ).textValid = true;
            form.findField( 'sms_cinbox' ).clearInvalid();
            form.findField( 'sms_cinbox' ).textValid = true;
            form.findField( 'sms_csource' ).clearInvalid();
            form.findField( 'sms_csource' ).textValid = true;

            if( record.get( 'tgm_ntipo' ) == 4 ) { // smartsms
                view.down( '#sms_ndefault' ).hide();
                //view.down('#sms_nEstado').hide();

                form.findField( 'sms_cterminal' ).setDisabled( true )
                view.down( '#terminal' ).hide();

                view.down( '#sms_csourceImei' ).setDisabled( false )
                view.down( '#sms_csourceImei' ).show();

            }
        }
    }

    /* Ext.Array.each(view.getForm()._fields.items,function(v,k) {
         v.validate();
     });*/

},
    
onPuertoChange: function (field, newVal, oldVal ) {
    var seteoField = field.up( 'form' ).down( '#seteo' );
    if( newVal >= 1 && newVal <= 15 ) {
        seteoField.setValue( '57600,N,8,1' );
    } else {
        seteoField.setValue( '' );
    }
},


onSaveClick: function(button, event, options ) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    var myform = button.up( 'form' ).getForm();
    var view = button.up( 'tablasmodemssmsformview' );
    var win = button.up( 'window' );
    var record = myform.getRecord();
    var controller = this;

    record.setConfig({
        proxy: this.getTablasModemsSmsModelModel().getProxy()
    });

    myform.updateRecord( record );

    if( myform.isValid() ) {
        if( record.get( 'sms_iGateway' ) == 5 ) {
            //solo para SMARTSMS
            record.set( 'sms_csource', view.down( '#sms_csourceImei' ).getValue() );
            record.data.sms_cDealer = view.down( '#dealer' ).getValue();

            //veo llave
            var storeKeyModules = KeyModulesStore;//Ext.data.StoreManager.lookup( 'KeyModulesStore' );
            if( storeKeyModules.isModuleAvailable( 'SmartSms' ) ) {

                //si el record ya tiene ID no verifico la llave
                if( record.get( 'Id' ) != 0 ) {
                    controller.forceSave( record, view )
                } else {

                    //si el record esta creando veo cuantos estan creados
                    var keySmartSms = storeKeyModules.getModuleAvailable( 'SmartSms' )
                    view.store = Ext.create( 'Ext.data.Store', {
                        model: this.getTablasModemsSmsSearchModelModel(),
                        pageSize: 1000,
                        remoteSort: true,
                        remoteFilter: true,
                        filters: [ {
                            property: 'sms_iGateway',
                            value: 5
                        }]
                    }).load( {
                        callback: function( records ) {
                            var lic = keySmartSms.get( 'QuantityOfUsers' );
                            if( lic != 0 && records.length >= lic ) {
                                notify( 'Error licencia smartsms superada' )
                                return false;
                            } else {
                                controller.forceSave( record, view )
                            }
                        }
                    })
                }
            } else {
                notify( 'Error licencia smartsms invalida' )
                return false;
            }

        } else {
            controller.forceSave( record, view )
        }
    } else {
        notify( 'Verfique los campos con error.' )
    }
},
    
forceSave: function (record, view ) {
    record.save( {
        scope: this,

        view: view,
        callback: function( record, operation ) {
            if( operation.success ) {
                notify( 'Los datos se guardaron correctamente' );
                view.caller.fireEvent( 'objectchanged', view.caller, record );
                view.close();
            } else {
                notifyError( 'Hubo un error al guardar los datos' );
            }

        }
    });
}
});
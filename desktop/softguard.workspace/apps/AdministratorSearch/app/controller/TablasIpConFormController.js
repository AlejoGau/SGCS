Ext.define( 'AdministratorSearch.controller.TablasIpConFormController', {
    extend: 'Ext.app.Controller',
    stores: [ 'TablasModemSmsStore', 'ReceptoresStore' ],
models: [ 'TablasIpConModel', 'TablasModemsSmsModel', 'TablasModemsSmsSearchModel', 'ReceptoresSearchModel', 'm_receptores_cabSearchModel' ],
views: [ 'TablasIpConFormView' ],

init: function(config ) {
    // genero los eventos

    this.control( {
        'tablasipconformview': {
            afterrender: this.initview
        },
        'tablasipconformview button[action="save"]': {
            click: this.onSaveClick
        },
        'tablasipconformview #receptor': {
            change: this.onReceptorChange
        }
    });
}, // cierro init

fixview: function(view ) {
    var combomodem = view.down( '#modemsms' );
    var modemvalue = combomodem.getValue();

    if( modemvalue == 0 ) {
        combomodem.setValue( null );
    }
},
        
initview: function(view ) {
    var controller = this;
    var record = view.record;
    var comboReceptores = view.down( '#receptor' );
    console.log( "tablasipconformCONTROLLER  ", view )
    storeReceptores = Ext.create( 'Ext.data.Store', {
        // model: this.getReceptoresSearchModelModel(),
        model: this.getM_receptores_cabSearchModelModel(),
        pageSize: 1000,
        remoteSort: true,
        remoteFilter: true,
        filters: [ {
            property: "rec_ntcpip",
            value: 1
        }, {
                property: "rec_iEsIRS",
                value: 0
            }
        ],

        sorters: [ {
            property: 'rec_cdescripcion', direction: 'ASC'
        }]
    })


    comboReceptores.bindStore( storeReceptores );
    storeReceptores.load( {
        callback: function() {
            console.log( 'cargo' );
        }
    });


    var comboModemSms = view.down( '#modemsms' );
    storeModemSms = Ext.create( 'Ext.data.Store', {
        model: this.getTablasModemsSmsSearchModelModel(),
        pageSize: 1000,
        remoteSort: true,
        remoteFilter: true

    })

    comboModemSms.bindStore( storeModemSms );
    storeModemSms.load(records => console.log("storeModemSms records",records));
    view.loadRecord( view.record );
    controller.fixview( view );
},
        
/*
PABLO PIDE 13/9/2016
Cuando en DSS das de alta una conexiónIP y seleccionas alguno de estos receptores con rec_cdll IN('X28','ELECTRONICLINE','BAC','NUSET')
NO TENES que permitir habilitarlo
Es decir SIEMPRE se graba deshabilitado
*/
onReceptorChange: function(combo, newReceptor ) {
    var view = combo.up( 'tablasipconformview' );
    var store = combo.store;
    var receptor = store.findRecord( 'rec_iid', newReceptor );

    if( receptor.get( 'rec_cdll' ).search( /^(X28|ELECTRONICLINE|BAC|NUSET)$/ ) != -1 && receptor.get( 'rec_cdll' ).search( /(X28)/ ) != -1 ) {
        var estado = view.down( '#estado' );
        estado.setValue( 1 );
        estado.disable();
        console.log( 'deshabilitar' );
    } else {
        var estado = view.down( '#estado' );
        estado.enable();
    }
},
        
onSaveClick: function(button, event, options ) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    var myform = button.up( 'form' ).getForm();
    var view = button.up( 'tablasipconformview' );
    var win = button.up( 'window' );
    var record = myform.getRecord();
    var model = this.getTablasIpConModelModel();
    record.setConfig({
        proxy: model.getProxy()
    });

    if( myform.isValid() ) {
        myform.updateRecord( record );
        if( record.get( 'ipc_imodemsms' ) == null ) {
            record.set( 'ipc_imodemsms', 0 );
        }
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

            },
            button: button
        });
    } else {
        notifyError( 'Corrija los valores del formulario' );
    }
}
});
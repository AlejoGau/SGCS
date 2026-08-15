//MIGRADO2024
Ext.define( 'Common.controller.ComandoGpsConfigController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'PoiFileSearchModel' ],
views: [ 'ComandoGpsConfigView' ],
init: function(config ) {
    this.control( {
        'comandogpsconfigview': {
            afterrender: this.initview
        },
        'comandogpsconfigview #combocomandos': {
            select: this.onComandoComboSelect
        }
    });
}, // cierro init
initview: function(view ) {
    // cargo el record en los formularios
    var me = this;
    var iconcombo = view.down( '#comboIcon' );
    var iconstore = Ext.create( 'Ext.data.Store', {
        model: me.getPoiFileSearchModelModel(),
        searchName: 'SoftguardMiscFile',
        path: '/SmartPanics/Comandos/',
        type: 'File',
        pageSize: 500,
        remoteSort: true,
        remoteFilter: true,
        listeners: {
            beforeload: function( store, operation ) {
                operation.scope = store;
            }
        }
    })
    iconcombo.bindStore( iconstore );
    iconstore.load( {
        callback: function( records, operation, success ) {
            //iconcombo.setValue(record.get('Icon'));
        }
    });
    //Muestro o no combo alarma
    var codAlarma = view.down( '#codigoAlarma' )
    var codAlarmaStore = codAlarma.store
    if( getParametro( 'GENEROEVTCMD' ) == 1 ) {
        codAlarmaStore.filter( [ { "property": "cod_ntipo", "value": "0" }] )
        codAlarma.setVisible( true )
    }
},
    
onComandoComboSelect: function(combo, records, options ) {
    var view = combo.up( 'comandogpsconfigview' );
    // genero los campos de parametros
    // busco el registro del comando
    var comando = view.comandosStore.findRecord( 'tcm_iid', combo.getValue() );
    console.log('comando aaa', comando)
    var fieldset = view.down( '#parametros' );
    console.log( "comando.get( 'tcm_cValores' ) ", comando.get( 'tcm_cValores' ) )
    // inserto los campos
    if( comando && comando.get( 'tcm_cValores' ) ) {
        fieldset.removeAll();
        var tcm_cValores = Ext.JSON.decode( comando.get( 'tcm_cValores' ) );
        var fields = 0;
        Ext.Array.each( tcm_cValores, function( field ) {
            if( !field._AtSend ) {
                fieldset.add( field );
                fields++;
            }
        });
        if( fields > 0 ) {
            fieldset.show();
        }
    }
    else {
        fieldset.removeAll();
    }
}
});
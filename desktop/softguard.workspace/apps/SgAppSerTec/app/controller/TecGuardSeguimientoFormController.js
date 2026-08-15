Ext.define('SgAppSerTec.controller.TecGuardSeguimientoFormController', {
    extend: 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'TecGuardSeguimientoFormView' ],
    init: function () {
        // genero los eventos
        this.control({
            'tecguardseguimientoformview': {
                afterrender: this.initview
            },
            'tecguardseguimientoformview #save' : {
                click : this.onSaveClick
            }
        });
    }, // cierro init:

    initview: function(view){
        console.log(arguments);
        console.log("view - -- ",view)
        if(view.cuenta){
            var _config = view.cuenta.cue_cConfig ? view.cuenta.cue_cConfig: view.cuenta.cue_cConfig;
            
            if (_config && _config != 'null' && _config != 'undefined' && _config != '') {
                view.metadata = Ext.JSON.decode(_config);

                // seteo los valores
                if (view.metadata && view.metadata.tecguardconfig){
                    view.down('#trackingEnabled').setValue(view.metadata.tecguardconfig.trackingEnabled);
                    view.down('#trackingTrigger').setValue(view.metadata.tecguardconfig.trackingTrigger);
                }

            } else{
                view.metadata = {};
            }
        }

        // cargo la metadata de la cuenta
    },

    onSaveClick: function(btn){
        var view = btn.up('tecguardseguimientoformview');
        var tecguardconfig = view.getValues();

        view.metadata.tecguardconfig = tecguardconfig;

        // guardo la metadata en xtrainfo.
        Ext.Ajax.request({
            url: '/rest/search/m_CuentasXtraInfoUpdateCreate',
            params: {
                cue_iidCuenta: view.record.get('cue_iid'),
                cue_cConfig: Ext.JSON.encode(view.metadata)
            },
            method: 'GET',
            scope: this,
            success: function(response){
                notify('Los datos se guardaron con éxito');
            }
        })
    }
});
Ext.define('iOT.controller.iOTCuentaController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: [],
    views: ['iOTEnergyMonitorView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'iotenergyview': {
                afterrender: this.initView,

            },
        
        });
    },

   
    initView: function (view) {

        console.log('Ingresando al controller enerby monitor');

    },

});

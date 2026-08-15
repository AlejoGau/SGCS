Ext.define('GestorSim.controller.ComandoGpsConfigController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['PoiFileSearchModel'],
    views: ['ComandoGpsConfigView'],

    init: function (config) {
        this.control({
            'comandogpsconfigview': {
                afterrender: this.initview
            },
            'comandogpsconfigview #combocomandos': {
                select: this.onComandoComboSelect
            }
        });
    }, // cierro init

    initview: function (view) {
        // cargo el record en los formularios

        var me = this;
        var iconcombo = view.down('#comboIcon');
        var iconstore =Ext.create('Ext.data.Store',{
            model: me.getPoiFileSearchModelModel(),
            searchName: 'SoftguardMiscFile', 
            path: '/SmartPanics/Comandos/',
            type: 'File',
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            listeners: {
                beforeload: function(store,operation) {
                    operation.scope = store;     

                }
            }
        })

        // var iconstore = Ext.create('Ext.data.Store', {
        //     model: me.getPoiFileSearchModelModel(),
        //     // searchName: 'SoftguardMiscFile',
        //     // path: '/SmartPanics/Comandos/',
        //     proxy: {
        //         type: 'File',
        //         pageSize: 500,
        //         remoteSort: true,
        //         remoteFilter: true,
        //         searchName: 'SoftguardMiscFile',
        //         path: '/SmartPanics/Comandos/',
        //         reader: 'json'
        //     },
        //     listeners: {
        //         load: function (data) {
        //             console.log(data)

        //         }
        //     }
        // });


        iconcombo.bindStore(iconstore);
        iconstore.load({
            callback: function (records, operation, success) {
                // iconcombo.setValue(record.get('Icon'));
                // console.log(records);
            }
        });
    },


    onComandoComboSelect: function (combo, records, options) {
        var view = combo.up('comandogpsconfigview');

        // genero los campos de parametros
        // busco el registro del comando
        var comando = view.comandosStore.findRecord('tcm_iid', combo.getValue());
        var fieldset = view.down('#parametros');

        // inserto los campos
        if (comando && comando.get('tcm_cValores')) {
            fieldset.removeAll();
            // var tcm_cValores = Ext.JSON.decode(comando.get('tcm_cValores'));
            var tcm_cValores = eval(comando.get('tcm_cValores'));
            var fields = 0;
            Ext.Array.each(tcm_cValores, function (field) {
                if (!field._AtSend) {
                    fieldset.add(field);
                    fields++;
                }
            });

            if (fields > 0) {
                fieldset.show();
            }
        }
        else {
            fieldset.removeAll();
        }
    }
});
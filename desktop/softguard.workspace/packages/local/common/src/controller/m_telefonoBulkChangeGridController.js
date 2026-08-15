//MIGRADO2024
/**
 * NOTAS
 * 
 * RIGHTS: segun que app utiliza este modulo viene en view.rights o view.security.rights (webremoto)
 * ATENCION: cuando se cambia el orden de los registros hace un request por cada regsitro
 */
Ext.define('Common.controller.m_telefonoBulkChangeGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_telefonoSearchModel' ],
    views : [ 'm_telefonoBulkChangeGridView' ],
    init: function (config) {
        var me = this;
        // genero los eventos
        this.control({
            'm_telefonosbulkchangegridview button[action=save]': {
                click: this.onSaveClick
            },
            'm_telefonosbulkchangegridview': {
                afterrender: this.loadData
            }
            
        });
    }, // cierro init
    
    loadData: function (view) {
        var record = view.record;
        if (view.mystore){
            mystore = view.mystore;
            view.bindStore(mystore);
        } else {
            mystore =Ext.create('Ext.data.Store',{
                model: this.getM_telefonoSearchModelModel(),
                remoteSort: true,
                remoteFilter: true,
                filters: view.filters,
                pageSize: 600,
                sorters: [
                    {
                        property : 'cue_cnombre',
                        direction: 'ASC'
                    },
                    {
                        property : 'tel_norden',
                        direction: 'ASC'
                    }
                ]
            });
            view.bindStore(mystore);
            mystore.load();
        }
    },
    onSaveClick: function (button,event,options) {
        var view = button.up('m_telefonosbulkchangegridview');
        var win = view.up('window');
        var store = view.getStore();
        var filter = store.getProxy().encodeFilters(store.filters.items);
        var newNumber = view.newNumber;
        Ext.Ajax.request({
            url: '/rest/search/m_telefonosbulkchange',
            params: {
                filter: filter,
                newNumber : newNumber
            },
            method:'GET',
            success: function(resp,operation) {
                notify('Los teléfonos se modificaron con éxito');
                win.close();
            }
        })
    }
});
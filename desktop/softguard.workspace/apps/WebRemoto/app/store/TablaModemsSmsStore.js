Ext.define('WebRemoto.store.TablaModemsSmsStore', {   
    extend: 'Ext.data.Store',
    autoLoad: true,
    remoteFilter: true,
    storeId: 'TablaModemsSmsStore',
    filters: [{
        property: 'sms_nEstado',
        value: 2
    }],
    model: 'WebRemoto.model.TablasModemsSmsSearchModel'
});
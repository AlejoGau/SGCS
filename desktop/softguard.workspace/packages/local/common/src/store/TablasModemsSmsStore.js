//MIGRADO2024
Ext.define('Common.store.TablasModemsSmsStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    filters: [
        {property: "sms_nEstado", value: 2}
    ],
    storeId: 'TablasModemsSmsStore',
    model: 'Common.model.TablasModemsSmsSearchModel'
});
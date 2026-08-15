Ext.define('GestorSim.store.TablasModemsSmsStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    filters: [
        {property: "sms_nEstado", value: 2}
    ],
    storeId: 'TablasModemsSmsStore',
    model: 'GestorSim.model.TablasModemsSmsSearchModel'
});
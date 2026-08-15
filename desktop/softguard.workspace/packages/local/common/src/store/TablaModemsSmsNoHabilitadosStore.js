//MIGRADO2024
Ext.define('Common.store.TablaModemsSmsNoHabilitadosStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaModemsSmsNoHabilitadosStore',
    model: 'Common.model.TablasModemsSmsSearchModel',
    
    filters: [
        {
            property: 'sms_nEstado',
            value: 1
        }
    ]
});
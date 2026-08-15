//MIGRADO2024
Ext.define('Common.store.CuentaStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'CuentaStore',    
    model: 'Common.model.CuentaSearchModel',
})
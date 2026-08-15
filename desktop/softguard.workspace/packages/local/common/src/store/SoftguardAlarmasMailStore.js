//MIGRADO2024
Ext.define('Common.store.SoftguardAlarmasMailStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'SoftguardAlarmasMailStore',
    model: 'Common.model.SoftguardCodigoAlarmaModel',
    remoteSort: false,
    remoteFilter: false
    
})
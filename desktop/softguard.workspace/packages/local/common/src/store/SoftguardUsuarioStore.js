//MIGRADO2024
Ext.define('Common.store.SoftguardUsuarioStore', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    storeId: 'SoftguardUsuarioStore',
    autoSync: false,
    model: 'Common.model.SoftguardUsuarioModel'
})
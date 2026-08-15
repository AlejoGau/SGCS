Ext.define('Cuenta.store.SoftguardUsuarioStore', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    storeId: 'SoftguardUsuarioStore',
    autoSync: false,
    model: 'Cuenta'+'.model.SoftguardUsuarioModel'
})
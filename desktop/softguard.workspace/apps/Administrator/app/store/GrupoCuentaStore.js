Ext.define('Administrator.store.GrupoCuentaStore', {
    extend : 'Ext.data.Store',
    storeId: 'GrupoCuentaStore',
    autoLoad: true,
    model : 'Administrator'+'.model.GrupoCuentaSearchModel'
});
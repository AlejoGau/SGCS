//MIGRADO2024
Ext.define('Common.store.TablasGruposStore', {
    extend : 'Ext.data.Store',
    storeId: 'TablasGruposStore',
    autoLoad: true,
    model : 'Common.model.TablasGruposSearchModel'
});
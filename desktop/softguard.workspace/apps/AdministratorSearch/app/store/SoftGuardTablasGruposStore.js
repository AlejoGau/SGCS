Ext.define('AdministratorSearch.store.SoftGuardTablasGruposStore', {
    extend : 'Ext.data.Store',
    storeId: 'TablasGruposStore',
    autoLoad: true,
    model : 'AdministratorSearch.model.TablasGruposSearchModel'
});
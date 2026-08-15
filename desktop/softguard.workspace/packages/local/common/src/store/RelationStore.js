//MIGRADO2024
Ext.define('Common.store.RelationStore', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    storeId: 'relationstore',
    model: 'Common.model.RelationSearchModel'
});
//MIGRADO2024
Ext.define('Common.store.GeographyStore', {
    extend : 'Ext.data.Store',
    model : 'Common.model.GeographyModel',
    storeId: 'GeographyStore',
    pageSize: 100000,
	autoLoad: true
});
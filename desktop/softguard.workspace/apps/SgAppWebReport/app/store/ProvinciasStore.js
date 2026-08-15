Ext.define('SgAppWebReport.store.ProvinciasStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    pageSize: 10000,
    remoteFilter: true,
    remoteSort: true,
    storeId: 'ProvinciasStore',	
    model: 'Common.model.t_provinciasSearchModel',
	sorters: [{ property: 'pro_cdescripcion', direction: 'ASC' }]
});
Ext.define('Tablas.store.ProvinciasStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    pageSize: 10000,
    storeId: 'ProvinciasStore',	
    model: 'Tablas.model.t_provinciasSearchModel',
	sorters: [{ property: 'pro_cdescripcion', 
			    direction: 'ASC' }]
});
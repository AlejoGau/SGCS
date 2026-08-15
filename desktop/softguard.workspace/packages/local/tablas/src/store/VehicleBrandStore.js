Ext.define('Tablas.store.VehicleBrandStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    pageSize: 10000,
    storeId: 'VehicleBrandStore',	
    model: 'Tablas.model.VehicleBrandModel',
	sorters: [{ property: 'Name', 
			    direction: 'ASC' }]
});
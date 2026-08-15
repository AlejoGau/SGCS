Ext.define('Common.store.VehicleBrandStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    pageSize: 10000,
    storeId: 'VehicleBrandStore',	
    model: 'Common.model.VehicleBrandModel',
	sorters: [{ property: 'Name', 
			    direction: 'ASC' }]
});
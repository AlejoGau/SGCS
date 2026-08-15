Ext.define('Tablas.store.VehicleModelStore', {    
    extend: 'Ext.data.Store',
    remoteFilter:true,
    storeId: 'VehicleModelStore',	
    model: 'Tablas.model.VehicleModelModel',
	sorters: [{ property: 'Name', 
			    direction: 'ASC' }]
});
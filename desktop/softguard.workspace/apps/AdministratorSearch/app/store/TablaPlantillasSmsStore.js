Ext.define('AdministratorSearch.store.TablaPlantillasSmsStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaPlantillasSms',
    model: 'AdministratorSearch.model.TablaPlantillasSmsModel',
	proxy: { type: 'rest', 
			 url: '/Rest/Tablas/PlantillasSms/' }
});
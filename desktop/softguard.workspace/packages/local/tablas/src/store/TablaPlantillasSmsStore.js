Ext.define('Tablas.store.TablaPlantillasSmsStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaPlantillasSms',
    model: 'Tablas'+'.model.TablaPlantillasSmsModel',
	proxy: { type: 'rest', 
			 url: '/Rest/Tablas/PlantillasSms/' }
});
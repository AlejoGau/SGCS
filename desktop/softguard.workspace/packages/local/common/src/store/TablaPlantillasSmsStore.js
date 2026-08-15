//MIGRADO2024
Ext.define('Common.store.TablaPlantillasSmsStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaPlantillasSms',
    model: 'Common.model.TablaPlantillasSmsModel',
	proxy: { type: 'rest', 
			 url: '/Rest/Tablas/PlantillasSms/' }
});
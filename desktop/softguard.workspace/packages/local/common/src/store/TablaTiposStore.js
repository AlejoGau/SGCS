//MIGRADO2024
Ext.define('Common.store.TablaTiposStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaTiposStore',
    model: 'Common.model.TablaTiposModel',
	sorters: [{ property: 'Descripcion', 
			    direction: 'ASC' }],
	proxy: { type: 'rest', 
			 url: '/Rest/Tablas/Tipos/' }
});
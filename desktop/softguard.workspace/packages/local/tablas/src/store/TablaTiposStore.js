Ext.define('Tablas.store.TablaTiposStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaTiposStore',
    model: 'Tablas'+'.model.TablaTiposModel',
	sorters: [{ property: 'Descripcion', 
			    direction: 'ASC' }],
	proxy: { type: 'rest', 
			 url: '/Rest/Tablas/Tipos/' }
});
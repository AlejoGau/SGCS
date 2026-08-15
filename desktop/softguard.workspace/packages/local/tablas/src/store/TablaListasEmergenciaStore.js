Ext.define('Tablas.store.TablaListasEmergenciaStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaListasEmergenciaStore',
    model: 'Tablas' +'.model.TablaListasEmergenciaModel',
	sorters: [{ property: 'Descripcion', 
			    direction: 'ASC' }],
	proxy: { type: 'rest', 
			 url: '/Rest/Tablas/ListasEmergencia/' }
});
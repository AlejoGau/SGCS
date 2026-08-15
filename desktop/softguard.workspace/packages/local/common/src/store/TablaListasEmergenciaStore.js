//MIGRADO2024
Ext.define('Common.store.TablaListasEmergenciaStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaListasEmergencia',
    model: 'Common.model.TablaListasEmergenciaModel',
	sorters: [{ property: 'Descripcion', 
			    direction: 'ASC' }],
	proxy: { type: 'rest', 
			 url: '/Rest/Tablas/ListasEmergencia/' }
});
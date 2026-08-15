//MIGRADO2024
Ext.define('Common.store.TablaMedicosStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaMedicosStore',
    model: 'Common.model.TablaMedicosModel',
	proxy: { type: 'rest', 
			 url: '/Rest/Tablas/Medicos/' }
});
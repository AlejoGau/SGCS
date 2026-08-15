Ext.define('Tablas.store.TablaMedicosStore', {  
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaMedicosStore',
    model: 'Tablas.model.TablaMedicosModel',
	proxy: { 
        type: 'rest', 
        url: '/Rest/Tablas/Medicos/' 
    }
});
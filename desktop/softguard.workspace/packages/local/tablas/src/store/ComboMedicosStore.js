Ext.define('Tablas.store.ComboMedicosStore', {  
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'ComboMedicosStore',
    model: 'Tablas.model.TablasMedicosSearchModel',
    filters:[
        {
            property: 'med_ntipo',
            value: 0
        }
    ],
    remoteFilter:true,
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/t_medicos/',
		appendId : true
	}
});
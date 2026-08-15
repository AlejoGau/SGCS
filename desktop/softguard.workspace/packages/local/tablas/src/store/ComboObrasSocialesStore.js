Ext.define('Tablas.store.ComboObrasSocialesStore', {  
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'ComboObrasSocialesStore',
    model: 'Tablas.model.TablasMedicosSearchModel',
    filters:[
        {
            property: 'med_ntipo:NOT',
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
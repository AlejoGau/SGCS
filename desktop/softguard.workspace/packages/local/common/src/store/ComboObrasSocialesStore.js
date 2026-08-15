//MIGRADO2024
Ext.define('Common.store.ComboObrasSocialesStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'ComboObrasSocialesStore',
    model: 'Common.model.TablasMedicosSearchModel',
    pageSize: 1000,
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
Ext.define('AdministratorSearch.store.ReceptoresStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'ReceptoresStore',    
    model: 'AdministratorSearch.model.ReceptoresSearchModel',
    filters:[
        {
            property: 'rec_ntcpip',
            value: 2
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
        url : '/Rest/search/SeachReceptoresCab',
		appendId : true
	}
})
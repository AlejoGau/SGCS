//MIGRADO2024
Ext.define('Common.store.ReceptoresStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'ReceptoresStore',    
    model: 'Common.model.ReceptoresSearchModel',
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
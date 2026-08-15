Ext.define('AdministratorSearch.store.TablasIpConStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaIpConStore',
    model: 'AdministratorSearch.model.TablasIpConSearchModel',
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/search/SearchIpCon',
	}
});
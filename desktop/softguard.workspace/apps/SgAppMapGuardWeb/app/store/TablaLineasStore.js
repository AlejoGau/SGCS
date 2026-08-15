Ext.define('SgAppMapGuardWeb.store.TablaLineasStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaLineasStore',
    model: 'SgAppMapGuardWeb'+'.model.TablasLineasSearchModel',
	proxy: { type: 'rest', 
        reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
            },
		 url: '/Rest/Search/LinesByUser'  	 
	}
});
Ext.define('Awcc.store.TablaLineasStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaLineasStore',
    model: 'Awcc.model.TablasLineasSearchModel',
	proxy: { type: 'rest', 
        reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
            },
		 url: '/Rest/Search/LinesByUser'  	 
	}
});
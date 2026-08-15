Ext.define('Trackguard.store.TablaLineasStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaLineasStore',
    model: 'Trackguard'+'.model.TablasLineasSearchModel',
	proxy: { type: 'rest', 
        reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
            },
		 url: '/rest/search/LinesByUser'  	 
	}
});
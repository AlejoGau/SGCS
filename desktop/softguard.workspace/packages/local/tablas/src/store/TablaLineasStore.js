Ext.define('Tablas.store.TablaLineasStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'TablaLineasStore',
    model: 'Tablas.model.TablasLineasSearchModel',
	proxy: { type: 'rest', 
        reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
            },
		 url: '/rest/search/LinesByUser'  	 
	}
});
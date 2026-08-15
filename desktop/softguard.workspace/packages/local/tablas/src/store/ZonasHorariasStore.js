Ext.define('Tablas.store.ZonasHorariasStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'ZonasHorariasStore',
    model: 'Tablas.model.TimeZoneModel',
    pageSize: 500,
    proxy: { type: 'rest', 
        reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
            },
    	 url: '/rest/t_TimeZone/'  	 
	}
});
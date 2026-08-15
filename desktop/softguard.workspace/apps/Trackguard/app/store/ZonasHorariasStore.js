Ext.define('Trackguard.store.ZonasHorariasStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'ZonasHorariasStore',
    model: 'Trackguard'+'.model.TimeZoneModel',
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
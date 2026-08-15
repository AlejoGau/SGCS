Ext.define('Cuenta.store.ZonasHorariasStore', {    
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'ZonasHorariasStore',
    model: 'Cuenta.model.TimeZoneModel',
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
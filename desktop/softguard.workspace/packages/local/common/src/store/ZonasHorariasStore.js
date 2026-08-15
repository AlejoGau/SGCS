//MIGRADO2024
Ext.define('Common.store.ZonasHorariasStore', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    storeId: 'ZonasHorariasStore',
    model: 'Common.model.TimeZoneModel',
    pageSize: 500,
    proxy: { type: 'rest', 
        reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
            },
    	 url: '/Rest/t_TimeZone/'  	 
	}
});
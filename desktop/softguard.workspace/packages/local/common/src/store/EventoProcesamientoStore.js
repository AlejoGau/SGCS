//MIGRADO2024
Ext.define('Common.store.EventoProcesamientoStore', {
    extend: 'Ext.data.Store',
    fields: [
        'Name', 
        {name: 'Value', type:'int'}
    ],
    storeId: 'EventoProcesamientoStore',
    data : [
        {Name: getLocale('Pendiente - Procesando'), Value: 11},
    	{Name: getLocale('Pendiente - Procesado'), Value: 12},
		{Name: getLocale('Procesando - Espera'), Value: 13},
		{Name: getLocale('Pendiente - Procesa Todo'), Value: 14},
		{Name: getLocale('Pendiente - Espera Todo'), Value: 15},
        {Name: getLocale('Espera - Procesando'), Value: 21},
    	{Name: getLocale('Espera - Procesado'), Value: 22},
		{Name: getLocale('Espera - Espera'), Value: 23},
		{Name: getLocale('Espera - Procesa Todo'), Value: 24},
        {Name: getLocale('Espera - Procesa Todo'), Value: 25},
        {Name: getLocale('Procesando - Pendiente'), Value: 31},
        {Name: getLocale('Procesando - Supervisor'), Value: 40},
        {Name: getLocale('Supervisor - Espera'), Value: 46},
        {Name: getLocale('Supervisor - Procesado'), Value: 43}
        
	]
});             
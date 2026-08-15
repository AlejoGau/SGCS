//MIGRADO2024
Ext.define('Common.store.TablaDiasStore', {
    extend: 'Ext.data.Store',
    fields: [
        'Name', 
    	{name: 'Value', type:'int'}
	],
    storeId: 'TablaDiasStore',
	data : [
			{Name: getLocale('Domingo'), Value: 1},
			{Name: getLocale('Lunes'), Value: 2},
			{Name: getLocale('Martes'), Value: 3},
			{Name: getLocale('Miercoles'), Value: 4},
			{Name: getLocale('Jueves'), Value: 5},
			{Name: getLocale('Viernes'), Value: 6},
			{Name: getLocale('Sabado'), Value: 7}
		]
});
//MIGRADO2024
Ext.define('Common.store.ServTecEstadoStore', {
    extend: 'Ext.data.Store',
    fields: [
        'Name', 
        {name: 'Value', type:'int'}
    ],
    storeId: 'ServTecEstadoStore',
	data : [
		{Name: getLocale('Pendiente'), Value: 1},
		{Name: getLocale('Asignado'), Value: 2},
		{Name: getLocale('Cancelado'), Value: 3},
		{Name: getLocale('Finalizado'), Value: 4},
		{Name: getLocale('En Ejecución'), Value: 5},
		{Name: getLocale('En Camino'), Value: 6}
    ]
});
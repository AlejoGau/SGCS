//MIGRADO2024
Ext.define('Common.store.EventoPrioridadesStore', {
    extend: 'Ext.data.Store',
    fields: [
        'Name', 
        {name: 'Value', type:'int'}
    ],
    storeId: 'EventoPrioridadesStore',
    data : [
        {Name: 1, Value: 1},
		{Name: 2, Value: 2},
		{Name: 3, Value: 3},
		{Name: 4, Value: 4},
		{Name: 5, Value: 5},
		{Name: 6, Value: 6},
		{Name: 7, Value: 7},
        {Name: 8, Value: 8},
        {Name: 9, Value: 9}
	]
});
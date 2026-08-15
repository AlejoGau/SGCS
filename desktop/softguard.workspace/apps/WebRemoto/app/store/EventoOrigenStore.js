Ext.define('WebRemoto.store.EventoOrigenStore', {    
    extend: 'Ext.data.Store',
    fields: [
        'Name', 
        {name: 'Value', type:'int'}
    ],
    storeId: 'EventoOrigenStore',
	data : [
        {Name: getLocale('Timer'), Value: 1},
		{Name: getLocale('Receptor'), Value: 2},
		{Name: getLocale('Manual'), Value: 3},
		{Name: getLocale('Mailguard'), Value: 4},
		{Name: getLocale('Sistema'), Value: 5},
        {Name: getLocale('Origen'), Value: 6},
		//{Name: getLocale('Origen SMS'), Value: 6},
		{Name: getLocale('Scheduler'), Value: 7},
        {Name: getLocale('Job'), Value: 8}
	]
});
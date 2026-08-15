Ext.define('Administrator.store.SiNoStore', {    
    extend: 'Ext.data.Store',
    model: 'Administrator.model.NameValueIntModel',
    storeId: 'SiNoStore',
	data: [
        {Name: getLocale('Seleccione'),    Value: 0},
		{Name: getLocale('Si'),    Value: 1},
		{Name: getLocale('No'),    Value: 2}
	]
});
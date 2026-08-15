Ext.define('AdministratorSearch.store.SiNoGPSStore', {    
    extend: 'Ext.data.Store',
    model: 'AdministratorSearch.model.NameValueIntModel',
    storeId: 'SiNoGPSStore',
	data: [
        {Name: getLocale('Seleccione'),    Value: 0},
		{Name: getLocale('Si'),    Value: 1},
		{Name: getLocale('No'),    Value: 2},
        {Name: getLocale('GPS'),    Value: 3}
	]
});
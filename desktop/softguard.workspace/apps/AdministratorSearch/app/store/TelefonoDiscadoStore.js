Ext.define('AdministratorSearch.store.TelefonoDiscadoStore', {    
    extend: 'Ext.data.Store',
    model: 'AdministratorSearch.model.NameValueIntModel',
	data : [
 		{Name: getLocale('Manual'),    Value: 0},
		{Name: getLocale('Automático'),    Value: 1}
	]
});
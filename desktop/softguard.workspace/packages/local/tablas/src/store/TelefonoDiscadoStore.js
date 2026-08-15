Ext.define('Tablas.store.TelefonoDiscadoStore', {    
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
    storeId: 'TelefonoDiscadoStore',
	data : [
 		{Name: getLocale('Manual'),    Value: 0},
		{Name: getLocale('Automático'),    Value: 1}
	]
});
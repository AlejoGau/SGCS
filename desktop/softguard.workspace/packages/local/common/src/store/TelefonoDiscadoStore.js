//MIGRADO2024
Ext.define('Common.store.TelefonoDiscadoStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
	storeId: 'telefonoDiscadoStore',
	data : [
 		{Name: getLocale('Manual'),    Value: 0},
		{Name: getLocale('Automático'),    Value: 1}
	]
});
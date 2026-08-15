//MIGRADO2024
Ext.define('Common.store.SiNoEstadoStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
	data: [
		{Name: getLocale('Si'),    Value: 1},
		{Name: getLocale('No'),    Value: 2}
	]
});
//MIGRADO2024
Ext.define('Common.store.TestReinicioStore', {
    extend: 'Ext.data.Store',
   model: 'Common.model.NameValueIntModel',
	data: [
		{Name:getLocale("TST"),Value:0},
		{Name:getLocale("Cualquiera"),Value:1}
	]
});
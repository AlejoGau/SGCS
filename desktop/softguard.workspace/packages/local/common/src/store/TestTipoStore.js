//MIGRADO2024
Ext.define('Common.store.TestTipoStore', {
    extend: 'Ext.data.Store',
     model: 'Common.model.NameValueIntModel',
	data: [
		{Name:getLocale("Minutos"),Value:0},
		{Name:getLocale("Horas"),Value:1},
		{Name:getLocale("Dias"),Value:2}
	]
});
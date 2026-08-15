//MIGRADO2024
Ext.define('Common.store.HorarioEventoStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueModel',
    storeId: 'HorarioEventoStore',
	data : [
		{Name: getLocale('Domingo'),    Value: '1'},
		{Name: getLocale('Lunes'),    Value: '2'},
		{Name: getLocale('Martes'),    Value: '3'},
		{Name: getLocale('Mi&eacute;rcoles'),    Value: '4'},
		{Name: getLocale('Jueves'),    Value: '5'},
		{Name: getLocale('Viernes'),    Value: '6'},
		{Name: getLocale('S&aacute;bado'),    Value: '7'}
	]
});
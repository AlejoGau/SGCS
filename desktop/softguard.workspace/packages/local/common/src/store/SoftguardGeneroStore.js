//MIGRADO2024
Ext.define('Common.store.SoftguardGeneroStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
    data : [
 		{Name: getLocale('Masculino'),    Value: 1},
		{Name: getLocale('Femenino'),    Value: 2}
	]
});
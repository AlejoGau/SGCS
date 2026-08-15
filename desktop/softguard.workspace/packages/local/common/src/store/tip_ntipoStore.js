//MIGRADO2024
Ext.define('Common.store.tip_ntipoStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
    storeId: 'tip_ntipoStore',
    data: [
        {Name: getLocale('Preventivo'),    Value: 0},
		{Name: getLocale('Correctivo'),    Value: 1},
		{Name: getLocale('Instalacion'),    Value: 2}
	]
});
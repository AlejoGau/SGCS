//MIGRADO2024
Ext.define('Common.store.DealerAutoprocesaStore', {
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
    storeId: 'DealerAutoprocesaStore',
	data: [
        {Name: getLocale('Seleccione'),    Value: 0},
		{Name: getLocale('Si'),    Value: 1},
		{Name: getLocale('No'),    Value: 2},
		{Name: getLocale('Según configuración del código de alarma'),    Value: 3}
	]
});
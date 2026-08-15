Ext.define('iOT.store.iOTPendienteProcesadaStore', {    
    extend: 'Ext.data.Store',
    model: 'Common.model.NameValueIntModel',
    storeId: 'ProcesadaPendienteStore',
	data: [
        {Name: getLocale('Seleccione'),    Value: 0},
		{Name: getLocale('Pendiente'),    Value: 1},
		{Name: getLocale('Procesada'),    Value: 2}
	]
});
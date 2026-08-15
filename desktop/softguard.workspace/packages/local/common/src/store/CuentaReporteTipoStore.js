//MIGRADO2024
Ext.define('Common.store.CuentaReporteTipoStore', {
    extend: 'Ext.data.Store',
    storeId: 'ReporteTipoStore',
    model: 'Common.model.NameValueIntModel',
	data : [
		{Name: getLocale('Apertura / Cierre'),    Value: 0},
		{Name: getLocale('Emergencias'),    Value: 1},
		{Name: getLocale('No emergencias'),    Value: 2},
		{Name: getLocale('Todos'),    Value: 3},
    	{Name: getLocale('Grupos'),    Value: 4},
		{Name: getLocale('Sumario'),    Value: 5}
		
	]
});
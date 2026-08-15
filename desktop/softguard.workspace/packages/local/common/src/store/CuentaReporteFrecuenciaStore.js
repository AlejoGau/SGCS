//MIGRADO2024
Ext.define('Common.store.CuentaReporteFrecuenciaStore', {
    extend: 'Ext.data.Store',
    storeId: 'ReporteTipoStore',
    model: 'Common.model.NameValueIntModel',
	data : [
        {Name: getLocale('Diario'),    Value: 0},
        {Name: getLocale('Semanal'),    Value: 1},
        {Name: getLocale('Quincenal'),    Value: 2},
        {Name: getLocale('Mensual'),    Value: 3},
        {Name: getLocale('Cuatrimestral'),    Value: 4},
        {Name: getLocale('Anual'),    Value: 5},
        {Name: getLocale('Nunca'),    Value: 6}
	]
});
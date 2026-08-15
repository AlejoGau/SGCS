//MIGRADO2024
Ext.define('Common.store.SoftguardEstadoTipoStore', {
    extend: 'Ext.data.Store',
    storeId: 'EstadoTipoStore',
    model: 'Common.model.NameValueIntModel',
    data:[
    	{Name:getLocale('Permanente'), Value: 0},
		{Name:getLocale('Minutos'), Value: 1},
		{Name:getLocale('Horas'), Value: 2},
		{Name:getLocale('Dias'), Value: 3},
		{Name:getLocale('Meses'), Value: 4}
	]
})
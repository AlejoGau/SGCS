//MIGRADO2024
Ext.define('Common.store.SoftguardZonatipoStore', {
    extend: 'Ext.data.Store',
    storeId: 'EstadoEstadoStore',
    model: 'Common.model.NameValueModel',
    data:[
    	{Name:getLocale('Normal'), Value: 'Normal'},
		{Name:getLocale('FWD'), Value: 'FWD'},
		{Name:getLocale('MAP'), Value: 'MAP'},
		{Name:getLocale('LOC'), Value: 'LOC'},
    	{Name:getLocale('LNK'), Value: 'LNK'}
	]
})
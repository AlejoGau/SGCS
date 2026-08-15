Ext.define('WebMG.store.mip_emisorStore', {    
    extend: 'Ext.data.Store',
    model: 'WebMG'+'.model.NameValueIntModel',
    storeId: 'mip_emisorStore',
    data: [
        {Name: getLocale('VISA'),    Value: 0},
		{Name: getLocale('MASTER'),    Value: 1},
		{Name: getLocale('AMERICAN EXPRESS'),    Value: 2}
	]
});
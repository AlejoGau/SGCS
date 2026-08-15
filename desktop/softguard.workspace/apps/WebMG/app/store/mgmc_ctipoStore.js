Ext.define('WebMG.store.mgmc_ctipoStore', {        
    extend: 'Ext.data.Store',
    storeId: 'mgmc_ctipoStore',
    model: 'WebMG'+'.model.NameValueModel',
    data : [
        {
            Value: 'C',
            Name: getLocale('Deudores por ventas')
    	},
		{
            Value: 'CASH',
            Name: getLocale('Caja y Bancos')
    	},
		{
            Value: 'IMPD',
            Name: getLocale('Deudas Fiscales')
    	},
    	{
            Value: 'PROV',
            Name: getLocale('Deudas comerciales')
    	},
        {
            Value: 'IMPC',
            Name: getLocale('Créditos fiscales')
    	}
	]
});
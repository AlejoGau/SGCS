Ext.define('Common.store.ActionTypeStore', {        
    extend: 'Ext.data.Store',
    storeId: 'ActionTypeStore',
    model: 'Common.model.NameValueModel',
    data : [
    	{
            Value: '1',
            Name: getLocale('Email recibido')
    	},
		{
            Value: '2',
            Name: getLocale('Llamado realizado')
    	},
		{
            Value: '3',
            Name: getLocale('Llamado recibido')
    	},
		{
            Value: '4',
            Name: getLocale('Nota')
    	},
    	{
            Value: '5',
            Name: getLocale('Email enviado')
    	},
        {
            Value: '6',
            Name: getLocale('Email sin enviar')
    	}
	]
});
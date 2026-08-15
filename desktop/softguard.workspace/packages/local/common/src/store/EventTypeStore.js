Ext.define('Common.store.EventTypeStore', {        
    extend: 'Ext.data.Store',
    storeId: 'EventTypeStore',
    model: 'Common.model.EventTypeModel',
    data : [
		{
            Id: 1,
            Name: getLocale('Reunión'),
            Value: 'm',
            Color: 'Red'
    	},
		{
            Id: 2,
            Name: getLocale('Llamado'),
            Value: 'c',
            Color: 'Red'
    	},
		{
            Id: 3,
            Name: getLocale('Recordatorio'),
            Value: 'r',
            Color: 'Red'
    	},
		{
            Id: 4,
            Name: getLocale('Otro'),
            Value: 'o',
            Color: 'Red'
    	}
	]
});
//MIGRADO2024
Ext.define('Common.model.VehicleBrandSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [{
            name: 'Id',
            type: 'int'
        },
        {
            name: 'Name',
            type: 'string'
        },
        {
            name: 'ObjectTypeId',
            type: 'int',
            defaultValue: 661
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'VehicleBrand'
        }
    ],
    proxy : {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/Rest/VehicleBrand/'
	}
});
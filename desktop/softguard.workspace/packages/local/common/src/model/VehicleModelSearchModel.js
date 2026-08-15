//MIGRADO2024
Ext.define('Common.model.VehicleModelSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
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
        defaultValue: 660
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'VehicleModel'
        },
		{name:'VehicleBrand',type:'int',defaultValue:0}
        ],
    proxy : {
        type : 'vehiclemodelsearchproxy',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
        url : '/Rest/VehicleBrand/{0}/VehicleModel',
		replaceIdRegex : /\{0\}/,
		appendId : false,
		
	}
});
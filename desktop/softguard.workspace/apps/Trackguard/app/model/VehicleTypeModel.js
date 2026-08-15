Ext.define('Trackguard.model.VehicleTypeModel', {
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
    	defaultValue: 662
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'VehicleType'
        },
		
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/VehicleType/',
		appendId : true
		}
});

																

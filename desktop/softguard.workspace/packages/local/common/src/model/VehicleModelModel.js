//MIGRADO2024
"/Rest/search/VehicleModelSearch"
Ext.define('Common.model.VehicleModelModel', {
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
    		defaultValue: 'Vehicle'
        },
    	{name:'VehicleBrand',type:'int',defaultValue:0}
        ],
    	//cambio
    proxy: {
    	type : 'rest',
    	url : '/Rest/VehicleModel/',
    	appendId : true
    }
});
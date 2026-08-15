//MIGRADO2024
Ext.define('Common.model.RoutesProgramModel', {
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
        defaultValue: 3119
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 't_categorizacion'
        },
    	{name:'routeId',type:'int'},
        {name:'programtype',type:'string'},
        {name:'starthour',type:'int'},
        {name:'startminutes',type:'int'},
        {name:'dayofweek',type:'int'},
        {name:'dayofmonth',type:'int'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/VC_Route_Programs/',
		appendId : true
		}
});
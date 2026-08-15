//MIGRADO2024
Ext.define('Common.model.TimeZoneModel', {
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
    	defaultValue: 3101
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_TimeZone'
        },
		{name:'ttz_cTitle',type:'string'},
{name:'ttz_nOffSet',type:'int',defaultValue:0}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_TimeZone/',
		appendId : true
		}
});
																
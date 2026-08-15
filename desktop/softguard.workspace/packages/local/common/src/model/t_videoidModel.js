//MIGRADO2024
Ext.define('Common.model.t_videoidModel', {
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
    	defaultValue: 3111
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_videoid'
        },
		{name:'tvi_cdescripcion',type:'string'},
{name:'tvi_cnombre',type:'string'},
{name:'tvi_cconfig',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_videoid/',
		appendId : true
		}
});
//MIGRADO2024
Ext.define('Common.model.t_videoidSearchModel', {
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
        {name:'tvi_cconfig',type:'string'},
        {name:'tvi_nLaunch',type:'int'},
        {name:'tvi_iid',type:'int', mapping: 'Id'}
    ],
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/t_videoid/',
		appendId : true
	}
});
Ext.define('AdministratorSearch.model.t_redirectordestinoSearchModel', {
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
        defaultValue: 3132
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 't_redirectdestino'
        },
		{name:'rrd_cnombre',type:'string'},
        {name:'rrd_curl',type:'string'},
        {name:'rrd_cconfig',type:'string'},
        {name:'rrd_cmetadata',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_redirectordestino/',
		appendId : true
	}
});
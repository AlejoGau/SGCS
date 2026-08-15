//MIGRADO2024
Ext.define('Common.model.t_autoridaddestinoSearchModel', {
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
		defaultValue: 't_autoridaddestino'
        },
		{name:'tad_cnombre',type:'string'},
        {name:'tad_curl',type:'string'},
        {name:'tad_cconfig',type:'string'},
        {name:'tad_cmetadata',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_autoridaddestino/',
		appendId : true
	}
});
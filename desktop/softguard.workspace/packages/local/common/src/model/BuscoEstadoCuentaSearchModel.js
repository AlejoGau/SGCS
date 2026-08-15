//MIGRADO2024
Ext.define('Common.model.BuscoEstadoCuentaSearchModel', {
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
        defaultValue: 3085
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_observaciones'
        },
		{name:'cli_nsituacion',type:'string'},
        {name:'cli_icodigo_ID',type:'int'}
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/SP_BuscoEstadoCuenta',
		appendId : true
	}
});
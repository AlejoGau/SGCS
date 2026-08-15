//MIGRADO2024
Ext.define('Common.model.t_instaladoresdealerModel', {
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
        defaultValue: 3080
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 't_instaladoresdealer'
        },
		{name:'tid_iidInstalador',type:'int'},
{name:'tid_iidDealer',type:'int'}
        ],
		
   proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_instaladoresdealer/',
		appendId : true
	}
});
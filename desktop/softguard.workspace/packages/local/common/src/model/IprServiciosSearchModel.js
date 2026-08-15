//MIGRADO2024
Ext.define('Common.model.IprServiciosSearchModel', {
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
        defaultValue: 3178
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 's_iprservicios'
        },
		{name:'iprs_ccnombre',type:'string'},
        {name:'iprs_localip',type:'string'},
        {name:'iprs_commandport',type:'int',defaultValue:0},
        {name:'iprs_websocketport',type:'int',defaultValue:0},
        {name:'iprs_status',type:'string'},
        {name:'iprs_config',type:'string'},
        {name:'iprs_lastserviceupdate',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)}
        
        ],
		
    proxy: {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/Rest/s_iprservicios/',
		appendId : true
	}
});
																
//MIGRADO2024
Ext.define('Common.model.TablasIpConModel', {
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
    	defaultValue: 3092
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_ip_con'
        },
		{name:'ipc_icodigo',type:'int'},
        {name:'ipc_cdescripcion',type:'string'},
        {name:'ipc_ireceptor',type:'int', convert: function (value) {
            if(value == 0) {
                value = null;
            }
            return value;
        }},
        {name:'ipc_nestado',type:'int'},
        {name:'ipc_nport',type:'int'},
        {name:'ipc_nprotocolo',type:'int'},
        {name:'ipc_crespondeack',type:'int'},
        {name:'ipc_itiempoinactividad',type:'int'},
        {name:'ipc_cresetxhb',type:'int'},
        {name:'ipc_imodemsms',type:'int'},
        {name:'ipc_cremotehostip',type:'string'},
        
        {name:'rec_cConfig',type:'string'},
        {name:'rec_cdescripcion',type:'string'},
        {name:'rec_cdll',type:'string'},
        {name:'rec_iid',type:'int'},
        {name:'rec_ntcpip',type:'int'},
        {name:'rec_iEsIRS',type:'int'}
        
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_ip_con/',
		appendId : true
		}
});
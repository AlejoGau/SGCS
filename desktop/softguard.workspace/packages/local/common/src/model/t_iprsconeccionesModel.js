//MIGRADO2024
Ext.define('Common.model.t_iprsconeccionesModel', {
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
    	defaultValue: 3179
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_iprsconecciones'
        },
		{name:'iprsc_iprsiid',type:'int',defaultValue:0},
        {name:'iprsc_ipcidkey',type:'int',defaultValue:0},
        {name:'iprsc_status',type:'string'},
        {name:'iprsc_config',type:'string'},
        {name:'iprsc_lastserviceupdate',type:'date', dateFormat:'MS', defaultValue: new Date()},
        {name:'ipc_itiempoinactividad',type:'int'},
        {name:'ipc_cresetxhb',type:'int'},
        {name:'iprsc_iduplicado',type:'int'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_iprsconecciones/',
		appendId : true
	}
});
																
//MIGRADO2024
/**
    este model esta hecho para pasar el token
*/
Ext.define('Common.model.SoftguardEstadoSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
	fields : [{
			name : 'Id',
			type : 'int'
		}, {
			name : 'Name',
			type : 'string'
		}, 
        {name:'est_iidcuenta',type:'int',defaultValue:0},
		{name:'est_nestado',type:'int',defaultValue:2},
        {name:'est_ntipo',type:'int',defaultValue:0},
        {name:'est_dfechadesde',type:'date', dateFormat:'MS'},
        {name:'est_nduracion',type:'int',defaultValue:0},
        {name:'est_dfechahasta',type:'date', dateFormat:'MS'},
        {name:'est_mnota',type:'string'},
        {name:'est_cData',type:'string'},
        {name:'token',type:'string'}
    ],
	proxy : {
        type : 'rest',
		url : '/Rest/search/EstadoUpd',
		appendId : true,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        actionMethods : {
                create  : 'GET',
                read    : 'GET',
                update  : 'POST',
                destroy : 'GET'
         }
	},
});
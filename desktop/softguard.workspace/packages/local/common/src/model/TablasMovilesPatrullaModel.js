//MIGRADO2024
Ext.define('Common.model.TablasMovilesPatrullaModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string',
        mapping: 'tmp_cnombre'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
    	defaultValue: 3087
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_movilespatrulla'
        },
		{name:'tmp_cnombre',type:'string'},
        {name:'tmp_cnumero',type:'string'},
        {name:'tmp_clicencia',type:'string'},
        {name:'tmp_cmarca',type:'string'},
        {name:'tmp_cmodelo',type:'string'},
        {name:'tmp_cpathfoto',type:'string'},
        {name:'tmp_cflota',type:'string'},
        {name:'tmp_idKey',type:'int', mapping: 'Id'},
        {name:'tmp_nestado',type:'int',defaultValue:0},//1 disponible, 2 fuera de servicio, 3 asignado
        {name:'tmp_icuenta',type:'int',defaultValue:0},
        {name:'tmp_iAsignado',type:'int',defaultValue:0}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_movilespatrulla/',
		appendId : true
	}
});
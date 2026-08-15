//MIGRADO2024
Ext.define('Common.model.p_objetos_modificacionesSearchModel', {
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
        defaultValue: 3180
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'p_objetos_modificaciones'
        },
		{name:'pom_usuariopedido',type:'int',defaultValue:0},
		{name:'pom_fechapedido',type:'date'},
		{name:'pom_idtipoobjeto',type:'int',defaultValue:0},
		{name:'pom_idobjeto',type:'int',defaultValue:0},
		{name:'pom_sinmodificar'},
		{name:'pom_modificado'},
		{name:'pom_estado',type:'int',defaultValue:0},
		{name:'pom_log',type:'string'},
		{name:'pom_usuarioultcambio',type:'int',defaultValue:0},
		{name:'pom_fechaultcambio',type:'date'},
        {name:'pom_metadata'},
        {name:'pom_cueiid'},
        {name:'cue_cnombre',type:'string'},        
        {name:'cue_clinea',type:'string'},
        {name:'cue_ncuenta',type:'string'},
        {name:'udw_usuario',type:'string'},
	],
		
    proxy: {
		type : 'rest',
		url : '/Rest/search/p_objetos_modificaciones',
		appendId : false,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		}
});
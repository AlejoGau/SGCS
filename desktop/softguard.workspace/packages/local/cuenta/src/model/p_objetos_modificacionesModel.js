Ext.define('Cuenta.model.p_objetos_modificacionesModel', {
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
		{name:'pom_fechapedido',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)},
		{name:'pom_idtipoobjeto',type:'int',defaultValue:0},
		{name:'pom_idobjeto',type:'int',defaultValue:0},
		{name:'pom_sinmodificar'},
		{name:'pom_modificado'},
		{name:'pom_estado',type:'int',defaultValue:0},
		{name:'pom_log',type:'string'},
		{name:'pom_usuarioultcambio',type:'int',defaultValue:0},
		{name:'pom_fechaultcambio',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)},
        {name:'pom_metadata'},
        {name:'pom_cueiid'},
	],
		
    proxy: {
		type : 'rest',
		url : '/Rest/p_objetos_modificaciones/',
		appendId : true
		}
});
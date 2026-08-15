//MIGRADO2024
Ext.define('Common.model.UsuarioModel', {
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
        defaultValue: 3090
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'Usuario'
        },
		{name:'usu_iidcuenta',type:'int'},
        {name:'usu_icodigo',type:'int'},
        {name:'usu_cidentificacion',type:'int'},
        {name:'usu_cnombre',type:'string'},
        {name:'usu_cclave',type:'string'},
        {name:'usu_ntipo',type:'int'},
        {name:'usu_cimagen',type:'string'},
        {name:'usu_mobservacion',type:'string'},
        {name:'usu_idKey',type:'int'},
        {name:'usu_cidextendido',type:'string'},
        {name:'usu_cmetadata',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/Usuario/',
		appendId : true
		}
});
//MIGRADO2024
Ext.define('Common.model.AwccUsuariosByEntidadSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string',
        mapping: 'nombrelogin'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 3063
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'w_usuarios'
        },
        {name:'EsTemplate', type: 'boolean'},
		{name:'nombrelogin'},
        {name:'contrasena'},
        {name:'first_login'},
        {name:'nombre_mostrar'},
        {name:'logo'},
        {name:'html_bienvenida',type:'string'},
        {name:'tipo_vista',type:'int',defaultValue:0},
        {name:'tipo_vistaM',type:'int',defaultValue:0},
        {name:'email_novedades'},
        {name:'entidad'},
        {name:'cue_iid',type:'int',defaultValue:0},
        {name:'email'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/rest/search/AWCC_Usuarios',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		appendId : true
	}
});
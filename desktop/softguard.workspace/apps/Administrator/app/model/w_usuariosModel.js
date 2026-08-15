Ext.define('Administrator.model.w_usuariosModel', {
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
        {name: 'comboText', convert: function(v,record){
            return record.get('nombrelogin') + ' ('+record.get('nombre_mostrar')+')';
        }},
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'w_usuarios'
        },
		{name:'nombrelogin'},
        {name:'contrasena'},
        {name:'first_login'},
        {name:'nombre_mostrar'},
        {name:'logo'},
        {name:'html_bienvenida',type:'string'},
        {name:'tipo_vista',type:'int',defaultValue:0},
        {name:'tipo_vistaM',type:'int',defaultValue:0},
        {name:'email_novedades'},
        {name:'email'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/w_usuarios/',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		appendId : true
	}
});

																

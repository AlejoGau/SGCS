//MIGRADO2024
Ext.define('Common.model.WUsuariosModel', {
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
    	defaultValue: 3063
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'w_usuarios'
        },
		{name:'nombrelogin'},
{name:'contrasena',type:'string'},
{name:'first_login'},
{name:'nombre_mostrar',type:'string'},
{name:'logo',type:'string'},
{name:'html_bienvenida',type:'string'},
{name:'tipo_vista',type:'int',defaultValue:0},
{name:'tipo_vistaM',type:'int',defaultValue:0},
{name:'email_novedades',type:'string'},
{name:'email',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/w_usuarios/',
		appendId : true
		}
});
																
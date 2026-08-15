Ext.define('Cuenta.model.m_usuariosModel', {
	extend: 'Ext.data.Model',
	idProperty: 'Id',
	fields: [{
			name: 'Id',
			type: 'int',
			critical: true
		},{
			name : 'usu_idKey',
			type: 'int',
			mapping: 'Id'		
			/**Daniel O. Medina
			 * se agrega ese field para resolver:
			 * https://basecamp.com/2249105/projects/17543484/todos/421862631#comment_798199647
			 * 
			 * error: al crear una nueva persona salen un monton de accesos que no tiene que ver con la persona. si cerras la ventana y la abris ya no tiene nada
			 */

		},
		{
			name: 'Name',
			type: 'string',
			critical: true
		},
		{
			name: 'ObjectTypeId',
			type: 'int',
			defaultValue: 3071
		},
		{
			name: 'ObjectTypeName',
			type: 'string',
			defaultValue: 't_firmante_fc',
			critical: true
		},
		{
			name: 'usu_iidcuenta',
			type: 'int',
			critical: true
		},
		{
			name: 'usu_icodigo',
			type: 'int',
			critical: true
		},
		{
			name: 'usu_cnombre',
			type: 'string',
			critical: true
		},
		{
			name: 'usu_iid',
			type: 'int',
			critical: true
		},
		{
			name: 'usu_cclave',
			type: 'string',
			critical: true
		},
		{
			name: 'usu_ntipo',
			type: 'int',
			critical: true
		},
		{
			name: 'usu_cimagen',
			type: 'string',
			critical: true
		},
		{
			name: 'usu_mobservacion',
			type: 'string',
			critical: true
		},
		{
			name: 'usu_cidextendido',
			type: 'string',
			defaultValue: '',
			critical: true
		},
		{
			name: 'usu_cmetadata',
			type: 'string',
			critical: true
		},
		{
			name: 'usu_teliid',
			type: 'int',
			critical: true
		},

		// DNI
		{
			name: 'usu_cidentificacion',
			type: 'string',
			critical: true
		},
		// vehiculo nuevo
		{
			name: 'usu_vehiculo',
			type: 'string',
			critical: true
		},
	],
	proxy: {
		type: 'rest',
		url: '/Rest/usuario/',
		appendId: true,
		writer:{ writeAllFields:true }
	}
});
Ext.define('Cuenta.model.m_usuariosSearchModel', {
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
			defaultValue: 3071
		},
		{
			name: 'ObjectTypeName',
			type: 'string',
			defaultValue: 't_firmante_fc'
		},
		{
			name: 'usu_iidcuenta',
			type: 'int'
		},
		{
			name: 'usu_icodigo',
			type: 'int'
		},
		{
			name: 'usu_cnombre',
			type: 'string'
		},
		{
			name: 'usu_iid',
			type: 'int'
		},
		{
			name: 'usu_cclave',
			type: 'string'
		},
		{
			name: 'usu_ntipo',
			type: 'int'
		},
		{
			name: 'usu_cimagen',
			type: 'string'
		},
		{
			name: 'usu_mobservacion',
			type: 'string'
		},
		{
			name: 'usu_cidextendido',
			type: 'string',
			defaultValue: ''
		},
		{
			name: 'usu_cmetadata',
			type: 'string'
		},
		{
			name: 'usu_teliid',
			type: 'int'
		},
		{
			name: 'usu_cidentificacion',
			type: 'string'
		},
		// Vehiculo - Nuevo
		{
			name: 'usu_vehiculo',
			type: 'string'
		},

		{
			name: 'cue_ncuenta',
			type: 'string'
		},
		{
			name: 'cue_clinea',
			type: 'string'
		},
		{
			name: 'cue_cnombre',
			type: 'string'
		},
		{
			name: 'cue_clocalidad',
			type: 'string'
		},

		{
			name: '_cuenta',
			type: 'string',
			convert: function (value, record) {
				return record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre')
			}
		}



	],


	proxy: {
		type: 'rest',
		reader: {
			type: 'json',
			rootProperty: 'rows',
			totalProperty: 'total'
		},
		url: '/Rest/search/usuariosearch',
		appendId: true,
		writer:{ writeAllFields:true }
	}
});
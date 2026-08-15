Ext.define('SgAppAccessControl.model.m_AccesosProveedoresModel', {
	extend: 'Ext.data.Model',
	idProperty: 'Id',
	fields: [{
			name: 'Id',
			type: 'int',
			critical: true
		},
        {
            name: 'apr_idKey',
            type: 'int'
			,convert: function(v, record){
				return record.get('Id');
			}			
        },		
		{
			name: 'Name',
			type: 'string',
			critical: true
		},
		{
			name: 'ObjectTypeId',
			type: 'int',
			defaultValue: 3227
		},
		{
			name: 'apr_cNombre',
			type: 'string',
			critical: true
		},
		{
			name:'apr_cIdentificacion',
			type:'string',
			critical: true
		},

		{
			name:'apr_cDireccion',
			type:'string',
			critical: true
		},
		{
			name:'apr_cCodigoPostal',
			type:'string',
			critical: true
		},
		{
			name:'apr_cLocalidad',
			type:'string',
			critical: true
		},
		{
			name:'apr_iProvincia',
			type:'int',
			critical: true
		},
		{
			name:'apr_cTelefono',
			type:'string',
			critical: true
		},
		{
			name:'apr_iCategoria',
			type:'int',
			critical: true
		},
		{
			name:'apr_tFechaAlta',
			//type:'string',
			type:'date',
             dateFormat:'MS', defaultValue: new Date()
		},
		{
			name:'apr_iStatus',
			type:'int',
			critical: true
		},
		{
			name:'apr_cObservaciones',
			type:'string',
			critical: true
		},{
			name:'apr_cPathPicture',
			type:'string',
			critical: true

		}
	],
	proxy: {
		type: 'rest',
		url: '/Rest/m_AccesosProveedores/',
		appendId: true,
		writer:{ writeAllFields:true }
	}
});
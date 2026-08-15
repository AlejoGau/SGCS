Ext.define('AccessControl.model.m_AccesosProveedoresDocumentosModel', {
	extend: 'Ext.data.Model',
	idProperty: 'Id',
	fields: [{
			name: 'Id',
			type: 'int',
			critical: true
		},
		{
			name: 'Name',
			type: 'string',
			critical: true
		},
		{
			name: 'ObjectTypeId',
			type: 'int',
			defaultValue: 3228
		},
		{
			name: 'apd_idKeyProveedor',
			type: 'int',
			critical: true
		},
		{
			name: 'apd_idKeyTipoDoc',
			type: 'int',
			critical: true
		},
		{
			name:'apd_tFechaVto',
			type:'string',
			critical: true
        },
		{
			name:'apd_cDescripcion',
			type:'string',
			critical: true
		},
		{
			name:'apd_cPathFile',
			type:'string',
			critical: true
		},





	],
	proxy: {
		type: 'rest',
		url: '/Rest/m_AccesosProveedoresDocumentos/',
		appendId: true,
		writer:{ writeAllFields:true }
	}
});
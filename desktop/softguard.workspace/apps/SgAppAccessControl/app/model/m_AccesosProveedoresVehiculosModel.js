Ext.define('SgAppAccessControl.model.m_AccesosProveedoresVehiculosModel', {
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
			defaultValue: 3232
		},
		{
			name: 'apv_idKeyProveedor',
			type: 'int',
			critical: true
		},
		{
			name:'apv_idKeyVehiculo',
			type:'int',
			critical: true
		},




	],
	proxy: {
		type: 'rest',
		url: '/Rest/m_AccesosProveedoresVehiculos/',
		appendId: true,
		writer:{ writeAllFields:true }
	}
});
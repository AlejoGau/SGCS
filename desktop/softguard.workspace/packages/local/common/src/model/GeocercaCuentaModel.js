//MIGRADO2024
Ext.define('Common.model.GeocercaCuentaModel', {
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
    	defaultValue: 3061
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'GeoFenceCuenta'
        },
		{name:'GeoFenseId',type:'int',defaultValue:0},
        {name:'CuentaId',type:'int',defaultValue:0}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/GeoFenseCuenta/',
		appendId : true,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        }
	}
});
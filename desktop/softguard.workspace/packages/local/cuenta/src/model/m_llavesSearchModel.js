Ext.define('Cuenta.model.m_llavesSearchModel', {
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
            defaultValue: 3217
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'm_llaves'
        },
		{name:'lla_cdescripcion'},
        {name:'lla_cnumero'},
        {name:'lla_cubicacion'},
        {name:'lla_responsable'},
        {name:'lla_iidcuenta',type:'int',defaultValue:0}
	],

    proxy: {
		type : 'rest',
		url : '/rest/m_llaves',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		appendId : false
	}
});

																

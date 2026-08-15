Ext.define('WebRemoto.model.m_llavesModel', {
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
		url : '/Rest/m_llaves/',
		appendId : true
	}
});

																

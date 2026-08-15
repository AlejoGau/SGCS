Ext.define('Cuenta.model.SoftguardTelefonoModel', {
    extend : 'Ext.data.Model',
	idProperty : 'Id',
	fields : [{
				name : 'Id',
				type : 'int'
			}, {
				name : 'Name',
				type : 'string'
			},{
                name: 'ObjectTypeId',
                type: 'int',
                defaultValue: 3180
            },
            {
                name: 'ObjectTypeName',
                type: 'string',
        		defaultValue: 'tel'
            }, {
				name : 'tel_iidcuenta',
				type : 'int',
				defaultValue : 0
			}, {
				name : 'tel_iid',
				type : 'int',
				defaultValue : 0
			}, {
				name : 'tel_clista'
			}, {
				name : 'tel_cnombre',
				type : 'string'
			}, {
				name : 'tel_cobservacion',
				type : 'string'
			}, {
				name : 'tel_ctelefono',
				type : 'string'
			}, {
				name : 'tel_ndiscado',
				type : 'int',
				defaultValue : 0
			}, {
				name : 'tel_cpredigito',
				type : 'string'
			}, {
				name : 'tel_cpostdigito',
				type : 'string'
			}, {
				name : 'tel_norden',
				type : 'int',
				defaultValue : 0
			}, {
				name : 'tel_ntr',
				type : 'int',
				defaultValue : 2
			}, {
				name : 'tel_cclave',
				type : 'string'
			}, {
				name : 'tel_cpermiso',
				type : 'string'
			}, {
				name : 'tel_nsms',
				type : 'int',
				defaultValue : 2
			}, {
    			name : 'tel_nsp',
				type : 'int',
    			defaultValue : 2
			}, {
        		name : '_usado',
				type : 'string',
                defaultValue : 'false'
			}],

	proxy : {
		
        type: 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Telefono',
		appendId : true,
		writer: {writeAllFields: true}
	}// cierro el proxy
});

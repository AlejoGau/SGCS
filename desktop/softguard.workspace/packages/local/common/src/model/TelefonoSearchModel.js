//MIGRADO2024
Ext.define('Common.model.TelefonoSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'tel_iid',
	fields : [{
			name : 'Id',
			type : 'int'
		}, {
			name : 'Name',
			type : 'string'
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
			defaultValue : 0
		}, {
			name : '_usado',
			type : 'string',
			defaultValue : 'false'
		},
        {name:'tel_ccountrycode',type:'string'},
        {name:'tel_cinternacional',type:'string'},
        {name:'tel_iismobile',type:'int'},
		{
            name : '_displayName',
            type : 'string',
            convert: function(value, record){
                return record.get('tel_cnombre')+" "+record.get('tel_cinternacional');
            }
        }
	],
    proxy: {
    	type : 'rest',
		url : '/rest/telefono/',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		appendId : false
	}
});
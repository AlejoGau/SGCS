//MIGRADO2024
Ext.define('Common.model.TelefonoPlantillaModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
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
				defaultValue : 0
			}, {
				name : 'tel_cclave',
				type : 'string'
			}, {
				name : 'tel_cpermiso',
				type : 'string'
			}, {
				name : 'tel_nsms',
				type : 'int',
				defaultValue : 0
			}],
	proxy : {
		type : 'rest',
		url : '/Rest/TelefonoPlanilla/',
		appendId : true
	}// cierro el proxy
});
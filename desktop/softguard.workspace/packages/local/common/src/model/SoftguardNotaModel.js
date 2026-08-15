//MIGRADO2024
Ext.define('Common.model.SoftguardNotaModel', {
    extend: 'Ext.data.Model',
	idProperty : 'Id',
	fields : [{
				name : 'Id',
				type : 'int'
			}, {
				name : 'Name',
				type : 'string'
			}, {
				name : 'not_iidcuenta'
			}, {
				name : 'not_mnotaprincipal'
			}, {
				name : 'not_mnotatemporal'
			}, {
				name : 'not_dtemporaldesde',
				type : 'date',
				dateFormat : 'MS'
			}, {
				name : 'not_dtemporalhasta',
				type : 'date',
				dateFormat : 'MS'
			}],
	proxy : {
		type : 'rest',
		url : '/Rest/Nota/',
		appendId : true
	}
});
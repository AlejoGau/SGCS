//MIGRADO2024
Ext.define('Common.model.EncuestaReporteNoCompletasSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name:'cantidad', type:'int', defaultValue:0},
        {name:'estado',type:'string'}
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/chequearStatusFinalEncuesta',
		appendId : false
	}
});
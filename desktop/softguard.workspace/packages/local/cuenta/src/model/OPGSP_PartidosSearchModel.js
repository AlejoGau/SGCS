Ext.define('Cuenta.model.OPGSP_PartidosSearchModel', {
    extend: 'Ext.data.Model',                
    fields: [
        { name: 'OPGSP_idPartido', type: 'int'}
        ,{ name: 'OPGSP_cPartido', type: 'string'}
    ],
		
   proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/OPGSP_Partidos',
		appendId : true
	}
})
Ext.define('Cuenta.model.OPGSP_LocalidadSearchModel', {
    extend: 'Ext.data.Model',                
    fields: [
        { name: 'OPGSP_idLocalidad', type: 'int'}
        ,{ name: 'OPGSP_cLocalidad', type: 'string'}
    ],
		
   proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/OPGSP_Localidad',
		appendId : true
	}
})
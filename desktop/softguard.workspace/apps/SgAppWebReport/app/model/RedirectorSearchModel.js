Ext.define('SgAppWebReport.model.RedirectorSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'ope_iid',
    fields: [{
        name: 'trd_idKey',
        type: 'int'
        },
        {
            name: 'trd_cNombre',
            type: 'string'
            
        }
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/search/t_redirectorSearch',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        }
	
	}
});
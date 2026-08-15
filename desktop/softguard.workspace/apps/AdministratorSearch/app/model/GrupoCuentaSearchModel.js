Ext.define('AdministratorSearch.model.GrupoCuentaSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'string'
        },
        {
        name: 'Name',
        type: 'string',
        mapping: 'tgc_cdescripcion'
        },
        {
        name: 'tgc_cdescripcion',
        type: 'string'
        }
        ],
		
    proxy: {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/rest/GrupoCuentas/',
		appendId : false
	}
});
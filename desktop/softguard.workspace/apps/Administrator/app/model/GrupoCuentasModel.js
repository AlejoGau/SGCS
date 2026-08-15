Ext.define('Administrator.model.GrupoCuentasModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
        name: 'Nombre',
        type: 'string'
        }
        ,
        {
        name: 'Name',
        type: 'string',
        mapping: 'Nombre'
        }
        ],
    	
    proxy: {
		type : 'rest',
		url : '/rest/GrupoCuentas/',
		appendId : true
	}
});
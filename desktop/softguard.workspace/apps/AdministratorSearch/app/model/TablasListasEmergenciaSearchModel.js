Ext.define('AdministratorSearch.model.TablasListasEmergenciaSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
    	defaultValue: 3071
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_listas_emergencia'
        },
		{name:'lis_ccodigo',type:'int'},
{name:'lis_cdescripcion',type:'string'}
        ],
		
           
        proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_listas_emergencia/',
		appendId : true
	}
});

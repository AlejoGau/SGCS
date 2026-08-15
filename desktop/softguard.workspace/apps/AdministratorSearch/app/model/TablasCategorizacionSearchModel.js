Ext.define('AdministratorSearch.model.TablasCategorizacionSearchModel', {
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
    	defaultValue: 3079
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_categorizacion'
        },
		{name:'cat_cCodigo',type:'string'},
        {name:'cat_cDescripcion',type:'string'},
        {name:'cat_iEstado',type:'int'}
    ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_categorizacion/',
		appendId : true
	}
});
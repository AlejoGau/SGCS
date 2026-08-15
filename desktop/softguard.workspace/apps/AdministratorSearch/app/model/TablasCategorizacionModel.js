Ext.define('AdministratorSearch.model.TablasCategorizacionModel', {
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
{name:'cat_cDescripcion',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_categorizacion/',
		appendId : true
		}
});
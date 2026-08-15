Ext.define('AdministratorSearch.model.TablasFlotasSearchModel', {
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
    	defaultValue: 3086
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_flotas'
        },
		{name:'flo_ccodigo',type:'string'},
{name:'flo_cdescripcion',type:'string'}
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_flotas/',
		appendId : true
	}
});
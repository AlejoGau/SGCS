Ext.define('Tablas.model.t_AccesosCategoriaProveedor', {
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
        defaultValue: 3231
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 'T_AccesosCategoriaProveedor'
        },
            {name:'acp_cDescripcion',type:'string'}

        ],
           
        proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    url : '/Rest/T_AccesosCategoriaProveedor/',
	}
});

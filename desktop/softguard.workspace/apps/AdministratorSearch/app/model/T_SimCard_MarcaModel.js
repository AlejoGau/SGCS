
Ext.define( 'AdministratorSearch.model.T_SimCard_MarcaModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [ {
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
            defaultValue: 3235
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'T_SimCard_Marca'
        },
        { name: 'tsm_cDescripcion', type: 'string' }
    ],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/T_SimCard_Marca/',
        appendId: true
    }
});
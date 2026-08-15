

Ext.define( 'AdministratorSearch.model.T_SimCard_APNModel', {
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
            defaultValue: 3234
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'T_SimCard_APN'
        },
        { name: 'tsa_cDescripcion', type: 'string' },
        { name: 'tsa_cURL', type: 'string' },
        { name: 'tsa_cUser', type: 'string' },
        { name: 'tnd_cPassword', type: 'string' }
    ],

    proxy: {
        type: 'rest',
        reader: {
            type: 'json',
            rootProperty: 'rows',
            totalProperty: 'total'
        },
        url: '/Rest/T_SimCard_APN/',
        appendId: true
    }
});
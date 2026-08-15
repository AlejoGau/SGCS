//MIGRADO2024
Ext.define( 'Common.model.OrganizationSearchMobileModel', {
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
            defaultValue: 600
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'Organization'
        },
        { name: 'Address', type: 'string' },
        { name: 'Country', type: 'string' },
        { name: 'State', type: 'string' },
        { name: 'City', type: 'string' },
        { name: 'Zip', type: 'string' },
        { name: 'Phone', type: 'string' },
        { name: 'Mobile', type: 'string' },
        { name: 'Fax', type: 'string' },
        { name: 'Email', type: 'string' },
        { name: 'NationalTax', type: 'string' },
        { name: 'StateTax', type: 'string' },
        { name: 'Account', type: 'string' },
        { name: 'Web', type: 'string' }
    ],
    proxy: {
        type: 'rest',
        url: '/Rest/search/OrganizationSearchMobile',
        appendId: true
    }
});
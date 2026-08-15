Ext.define('Cuenta.model.NameValueIntModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'Name',
            type: 'string'
        }, {
            name: 'Code',
            type: 'string'
        },
        {
            name: 'Value',
            type: 'int'
        }
    ]
});
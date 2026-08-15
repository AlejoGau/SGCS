Ext.define('Common.model.EventTypeModel', {
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
            name: 'Value',
            type: 'string'
        },
        {
            name:    'IsHidden',
            type:    'boolean',
            defaultValue: false
        },
        {
            name: 'Color',
            type: 'string'
        }
    ]
});
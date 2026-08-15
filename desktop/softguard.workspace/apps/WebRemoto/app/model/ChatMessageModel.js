Ext.define('WebRemoto.model.ChatMessageModel', {
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
            name: 'Message',
            type: 'string'
        },
        {
            name: 'Date',
            type: 'date', dateFormat: 'c'
        },
        {
            name: 'side',
            type: 'string',
            defaultValue: 'left',
        }
    ]
});
Ext.define('Common.model.MailActionModel', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'from',
            type: 'string'
        },
        {
            name: 'to',
            type: 'string'
        },
        {
            name: 'cc',
            type: 'string'
        },
        {
            name: 'cco',
            type: 'string'
        },
    	{name:'Description',type:'string'},
        {name:'Attach',type:'string'}
    ],
    idProperty: 'Id',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        },
        writer: {writeAllFields: true}
    }
});

Ext.define('Common.model.ActionModel', {
    extend: 'Ext.data.Model',
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
            defaultValue: 1001
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'Action'
        },
		{name:'Description',type:'string'},
        {name:'ActionType',type:'string'},
        {
            name:'Date',
            type:'date', 
            dateFormat:'MS',
            defaultValue: new Date()
        },
        {
            name: 'IssueId',
            type: 'int'
        },
        {name:'Status',type:'string'},
        {name:'CreatorObjectTypeId',type:'int',defaultValue:0},
        {name:'CreatorObjectId',type:'int',defaultValue:0}
    ],
    idProperty: 'Id',
    proxy: {
        type: 'rest',
        url: '/rest/action',
        appendId: true,
        writer: {writeAllFields: true}
    }
});

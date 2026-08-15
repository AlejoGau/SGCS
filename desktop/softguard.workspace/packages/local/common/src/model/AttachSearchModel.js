Ext.define('Common.model.AttachSearchModel', {
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
        defaultValue: 12
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'Attach'
        },
		{name:'FullName',type:'string'},
        {name:'Format',type:'string'},
        {name:'Weight',type:'string'},
        {name:'Location',type:'string'},
        {name:'Width',type:'int',defaultValue:0},
        {name:'Height',type:'int',defaultValue:0},
        {name:'SaveAs',type:'string'},
        {name:'Target',type:'string'},
        {name:'Link',type:'string'},
        {name:'Status',type:'string'},
        {name:'SmallComment',type:'string'},
        {name:'LargeComment',type:'string'},
        {name:'DateCreated',type:'date', dateFormat:'MS'},
        {name:'FolderId',type:'int',defaultValue:0}
        ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty: 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Attach/',
		appendId : true
		}
});
//MIGRADO2024
Ext.define('Common.model.BundleSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int',
        ignoreSql: true
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: '_ObjectTypeId',
        type: 'int',
        defaultValue: 21,
        ignoreSql: true
        },
        {
        name: '_ObjectTypeName',
        type: 'string',
        defaultValue: 'Bundle',
        ignoreSql: true
        },
		{name:'Data',type:'string'},
        {name:'ObjectTypeId',type:'int',defaultValue:0},
        {name:'ObjectId',type:'int',defaultValue:0},
        {name:'ComponentList',type:'string'},
        {name:'MimeType',type:'string'},
        {name:'Version',type:'string'},
        {name:'DateCreated',type:'date', dateFormat:'MS'},
        {name:'DateUpdated',type:'date', dateFormat:'MS'},
        {name:'Description',type:'string'},
        {name:'Changelog',type:'string'},
        {name:'Customdata',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Bundle/',
		appendId : false
		}
});
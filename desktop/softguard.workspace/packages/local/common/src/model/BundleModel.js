//MIGRADO2024
Ext.define('Common.model.BundleModel', {
    extend: 'Ext.data.Model',
    idProperty: 'IdKey',
    fields: [{
            name: 'IdKey',
            type: 'int',
            mapping: 'Id',
            ignoreSql: true,
            persist: false
        },
        {
            name: 'Name',
            type: 'string'
        },
        {
            name: '_ObjectTypeId',
            type: 'int',
            defaultValue: 21,
            ignoreSql: true,
            persist: false
        },
        {
            name: '_ObjectTypeName',
            type: 'string',
            defaultValue: 'Bundle',
            ignoreSql: true,
            persist: false
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
        {name:'ApplicationHtml',type:'string'},
        {name:'Customdata',type:'string'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/Bundle/',
		appendId : true
	}
});
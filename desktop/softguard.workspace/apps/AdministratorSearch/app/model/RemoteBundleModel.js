Ext.define('AdministratorSearch.model.RemoteBundleModel', {
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
        defaultValue: 21
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'Bundle'
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
        url : '/rest/request/get/?'+
            UiApplicationMetadata.RemoteUpdateServer+
            '/Rest/Bundle/'+
            '?oauth_token='+UiApplicationMetadata.RemoteUpdateToken,
		appendId : true
		}
});
Ext.define('AdministratorSearch.model.RemoteUiApplicationSearchModel', {
extend : 'Ext.data.Model',
        idProperty : 'Id',
		fields : [{
					name : 'Id',
					type : 'int'
				}, {
					name : 'Name',
					type : 'string'
				}, {
					name : 'Description',
					type : 'string'
				}, {
    				name : 'Version',
					type : 'string'
				},{
                    name : 'SmallComment',
					type : 'string'
				}, {
					name : 'Icon',
					type : 'string'
				}, {
					name : 'MenuName',
					type : 'string'
				}, {
                    name : 'RazorTemplateId',
					type : 'int'
				}, {
                    name : 'Viewport',
    				type : 'string',
                    defaultValue: ''
				}, {
                    name : 'CustomData',
        			type : 'string',
                    defaultValue: ''
				},{
                    name : 'ObjectTypeId',
    				type : 'int',
                    defaultValue: 51
				}, {
    				name : 'ObjectTypeName',
					type : 'string',
                    defaultValue: 'UIApplication'
				}],
		proxy : {
			type : 'rest',
            reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
            },
			url : '/rest/request/get/?'+
                UiApplicationMetadata.RemoteUpdateServer+
                '/rest/search/UiapplicationUpdate'+
                '?oauth_token='+UiApplicationMetadata.RemoteUpdateToken,
			appendId : false
		}
	});
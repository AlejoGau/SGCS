Ext.define('AdministratorSearch.model.UiApplicationModel', {
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
				},{
                    name : 'ObjectTypeId',
    				type : 'int',
                    defaultValue: 51
				}, {
    				name : 'ObjectTypeName',
					type : 'string',
                    defaultValue: 'UIApplication'
				},
                {name:'Version',type:'string'}
                ],
		proxy : {
			type : 'uiapplicationproxy',
			appendId : false,
                      
		}
	});
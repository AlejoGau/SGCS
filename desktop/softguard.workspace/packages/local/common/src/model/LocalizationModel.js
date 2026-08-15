Ext.define('Common.model.LocalizationModel', {
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
        	defaultValue: 17
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
    		defaultValue: 'Localization'
        },
		{name:'UiApplication',type:'string'},
        {name:'Language',type:'string'},
        {name:'Translation',type:'string'},
        {name:'Status',type:'string'},
        {name:'UserName',type:'string'},
        {name:'Created', type:'date', dateFormat:'MS'},
        {name:'Modified', type:'date', dateFormat:'MS'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/Localization/',
		appendId : true
	}
});

																

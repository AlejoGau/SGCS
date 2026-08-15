Ext.define('Desktop.model.LocalizationSearchModel', {
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
        {name:'Created',type:'date', dateFormat:'MS', defaultValue: new Date('1/1/1900')},
        {name:'Modified',type:'date', dateFormat:'MS', defaultValue: new Date('1/1/1900')},
        {name:'UserId',type:'int',defaultValue:0},
        {name:'UserName',type:'string'}
    ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/Localization/',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		appendId : true
	}
});

Ext.define('Common.model.SystemTestSearchModel', {
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
    	defaultValue: 3134
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 's_SystemTest'
        },
		{name:'Sql'},
        {name:'Status',type:'int',defaultValue:0},
        {name:'LastExecution',type:'date', dateFormat:'n/j/Y g:i:s A'}, //"2/15/2016 1:36:28 PM"
        {name:'Message',type:'string', convert: function(value){return getLocale(Ext.String.trim(value));}},
        {name:'Category',type:'string', convert: function(value){return getLocale(Ext.String.trim(value));}}
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/SystemTest',
		appendId : true
	}
});

																

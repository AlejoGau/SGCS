Ext.define('FileManager.model.SearchObjectSearchModel', {
    extend: 'Ext.data.Model',
    idProperty : 'Id',
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
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'SearchObject',
        ignoreSql: true
        },
		{name:'ObjectTypeId',type:'int',defaultValue:0},
        {name:'_ObjectTypeId',type:'int',defaultValue:55,
        ignoreSql: true},
        {name:'Content',type:'string'},
        {name:'SearchType',type:'string'},
        {name:'IdProperty',type:'string'},
        {name:'TokenProperty',type:'string'},
        {name:'TotalRowsParameterName',type:'string'}
    ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            root : 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/SearchObject/',        
		appendId : false
	}
});
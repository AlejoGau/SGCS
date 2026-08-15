Ext.define('AdministratorSearch.model.LogsByTimerSearchModel', {
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
        defaultValue: 3074
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'LogsByTimer'
        },

		{name:'Date',type:'date'},
        {name:'Thread',type:'string'},
        {name:'Level',type:'string'},
        {name:'Logger',type:'string'},
        {name:'Message',type:'string'},
        {name:'Exception',type:'string'},
        {name:'DbProcId',type:'string'},
        {name:'DbSchema',type:'string'},
        {name:'DbName',type:'string'},
        {name:'DbServer',type:'string'},
        {name:'LogModule',type:'string'}

             
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/LogsByTimer',
		appendId : true
	}
});
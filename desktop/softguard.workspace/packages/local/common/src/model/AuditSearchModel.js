//MIGRADO2024
Ext.define('Common.model.AuditSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        {
            name: 'Id',
            type: 'int'
        },
        {
            name: 'Name',
            type: 'string'
        },
        {
            name: 'ObjectTypeId',
            type: 'int'
        },
        {
            name: 'ObjectTypeName',
            type: 'string'
        },
		{name:'ApplicationModule',type:'string'},
        {name:'FunctionId',type:'int',defaultValue:0},
        {name:'FunctionName',type:'string'},
        {name:'HasXml',type:'bool'},
        {name:'ImpersonateUser',type:'string'},
        {name:'ObjectId',type:'int',defaultValue:0},
        {name:'ObjectName',type:'string'},
        {name:'ParentDescription',type:'string'},
        {name:'UserName',type:'string'},
        {name:'RowNumber',type:'int',defaultValue:0},
        {
    		name : 'AuditDate', type:'date'//, 
            //dateFormat : 'n/j/Y g:i:s A'
		}
    ],
    proxy : {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/audit',
        appendId : false
	}
});
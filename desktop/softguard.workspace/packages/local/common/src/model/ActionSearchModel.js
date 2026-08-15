Ext.define('Common.model.ActionSearchModel', {
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
        	defaultValue: 1001
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
    		defaultValue: 'Action'
        },
		{name:'Description',type:'string'},
        {name:'ActionType',type:'string'},
        {name:'Date',type:'date', dateFormat:'MS'},
        {name:'Status',type:'string'},
        {name:'CreatorObjectTypeId',type:'int',defaultValue:0},
        {name:'CreatorObjectId',type:'int',defaultValue:0}
        ],
        proxy : {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty: 'rows',
            totalProperty : 'total'
        },
        url : '/Rest/Action/',
        writer: {writeAllFields:true},
		//appendId : true
	}
});

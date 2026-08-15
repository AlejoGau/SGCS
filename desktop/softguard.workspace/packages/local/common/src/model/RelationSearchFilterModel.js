Ext.define('Common.model.RelationSearchFilterModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Id',
        type: 'int'
    },{
        name: 'RelationId',
        type: 'int',
        mapping: 'Id'
    },{
        name: 'RelationObjectTypeId',
        type: 'int',
        mapping: 'ObjectTypeId'
    }, {
        name: 'ObjectTypeName',
        type: 'string'
    },{
        name: 'RelationObjectId',
        type: 'int',
        mapping: 'ObjectId'
    }, {
        name: 'ObjectName',
        type: 'string'
    }, {
        name: 'text',
        type: 'string',
        mapping: 'ObjectName'
    }, {
        name: 'ObjectId',
        type: 'int'
    },{
        name: 'leaf',
        type: 'bool',
        defaultValue: false
    }, {
        name: 'iconCls',
        type: 'string',
        convert: function(v,record){
            //console.log(record);
            return 'icon-'+record.get('ObjectTypeName');
        }
    }
    ],
    idProperty: 'Id',

    proxy: {
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty: 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/relation',
		appendId : false
	}
    
});

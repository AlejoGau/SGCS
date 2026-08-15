Ext.define('Common.model.RelationModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'Id',
        type: 'int'
    }, {
        name: 'ObjectTypeId',
        type: 'int'
    },{
        name: 'ObjectTypeName',
        type: 'string'
    }, {
        name: 'RelationObjectTypeId',
        type: 'int'
    }, {
        name: 'ObjectId',
        type: 'int'
    }, {
        name: 'RelationObjectId',
        type: 'int'
    }
            ],
    idProperty: 'Id',
    proxy: {
        type: 'rest',
        writer:{ writeAllFields:true },
        url: '/Rest/Relation/',
        writer: {writeAllFields: true},
        appendId: true
    }
    
});

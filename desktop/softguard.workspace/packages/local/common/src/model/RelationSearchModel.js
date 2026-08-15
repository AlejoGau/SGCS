//MIGRADO2024
Ext.define('Common.model.RelationSearchModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        mapping: 'RelationId'
        //persist:false
    },{
        name: 'RelationId',
        type: 'int'
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
    proxy: {
        type: 'relationsearchproxy',    
        url : ''
        
    }
    
});
Ext.define('Common.model.TaxonomyTreeSearchModel', {
    extend: 'Ext.data.Model',
    autoLoad: false,
    autoSync: false,
    idProperty: 'id',
    fields: [
        {
            name: 'id',
            type: 'int',
        },
        {
            name: 'text',
            type: 'string'
        },
		{
			name: 'qtip', 
			type: 'string',
            persist: false,
			convert: function(v, r){
				return 'Id: ' + r.data.id;
			}
		},
        {
            name: 'IsSecurity',
            type: 'bool'
        }, 
        {
            name: 'children',
            type: 'int',
            mapping: 'Parent'
        }, 
        {
            name: 'checked',
            type: 'bool',
            defaultValue: false
        },
		{
			name: 'parentId',
			type: 'int'
		},
        {
            name: 'leaf',
            type: 'bool',
            defaultValue: false
        }, 
        {
            name: 'expanded',
            type: 'bool',
            defaultValue: false
        },{
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'Project'
        },{
            name: 'ObjectId',
            type: 'int'
        },{
            name: 'root',
            type: 'bool',
            persist: false,
            defaultValue: false
        }
        ],
        proxy: {
            type: 'rest', 
            url: '/Rest/taxonomy',   
            writer:{ writeAllFields:true },

            appendId : false                
            /*buildUrl: function (action) {
                var url = '';

                var objectId = (action.operation.scope && action.operation.scope.ObjectId) ? action.operation.scope.ObjectId:action.operation.node.get('ObjectId');
                var ObjectTypeName = (action.operation.scope && action.operation.scope.ObjectTypeName) ?  action.operation.scope.ObjectTypeName : action.operation.node.get('ObjectTypeName');
                url = '/Rest/'+ObjectTypeName+'/'+ objectId + '/taxonomies';

                return url;
            }*/
        
            
        }
});


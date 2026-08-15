Ext.define('Common.model.TaxonomyModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {
            name: 'Id',
            type: 'int'
        },
        {
            name: 'text',
            type: 'string',
            mapping: 'Name'
        },
        {
            name: 'Name',
            type: 'string',
            mapping: 'Name'
        },
    	{
			name: 'qtip', 
			type: 'string',
            persist: false,
			convert: function(v, r){
				return 'Id: ' + r.get('Id');
			}
		},
        {
            name: 'IsSecurity',
            type: 'bool'
        }, 
        /*{
            name: 'children',
            type: 'int',
            mapping: 'Parent'
        },*/
		{
			name: 'Parent',
			type: 'int'
		},
        {
            name: 'leaf',
            type: 'bool',
            defaultValue: false
        },{
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'Taxonomy'
        },{
            name: 'ObjectId',
            type: 'int',
            defaultValue: 4
        },{
            name: 'root',
            type: 'bool',
            persist: false,
            defaultValue: false
        }
    ],
    proxy: {
        type: 'ajax',
    	url : '/Rest/Taxonomy/',
        writer:{ writeAllFields:true },
        appendId : true,
                
		/*buildUrl: function(request){
            var url = '/Rest/Taxonomy/';
            var action = request.action;
            var operation = request.operation;
            
            if (action != 'read' && action != 'create')
                url = url+operation.records[0].get('Id');
                
            return url;
		}*/
    }
});


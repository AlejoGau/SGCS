Ext.define('SmartTrack.model.IconosVigicontrolSearchModel', {
    extend: 'Ext.data.Model',
    autoLoad: false,
    autoSync: false,
    idProperty: 'id',
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'Name',
            type: 'string'
        },
        {
            name: 'FileName',
            type: 'string',
            convert: function(v,record){
                return record.get('Name').split('.')[0];
                
            }
        },
        {
            name: 'Path',
            type: 'string',
            defaultValue: ''
        },
        {
            name: 'Type',
            type: 'string'
        },
        {
            name: 'CreationTime',
            type: 'string'
        },
        {
            name: 'text',
            type: 'string',
            convert: function(v, record){
                return record.get('FileName') //saque el getlocale el dia 6/3/2017
            }
        },
        {
            name: 'children',
            type: 'int',
            mapping: 'Parent'
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
            defaultValue: 'File'
        },{
            name: 'root',
            type: 'bool',
            defaultValue: false
        },
        {
            name: 'Weight',
            type: 'int'
        },
        {
            name: 'VirtualPath',
            type: 'string'
        }
        ],
        proxy: {
            type: 'rest',  
            reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
            },
            buildUrl: function (action) {
                var url = '';
                var folder = '';
                var searchName = '';
                var type = '';
                
                if (action.operation.scope){
                    searchName = action.operation.scope.searchName;
                    type = 'Type='+action.operation.scope.type;
                    folder = action.operation.scope.path?'Path='+action.operation.scope.path:'';
                }
                
                url = '/Rest/Search/'+searchName;
                
                if (type){
                    url = Ext.urlAppend( url, type )
                }
                
                if (action.operation.node && action.operation.node.get('Name')){
                    folder = 'Path='+action.operation.node.get('Path')+'/'+action.operation.node.get('Name');
                }
                
                if (folder){
                    url = Ext.urlAppend( url, folder )
                }
                

                return url;
            }
            
        }
});
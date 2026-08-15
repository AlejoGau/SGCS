
Ext.define('GestorSim.model.PoiFileSearchModel', {
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
        type: 'poifilesearchproxy',  
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        
    }
});
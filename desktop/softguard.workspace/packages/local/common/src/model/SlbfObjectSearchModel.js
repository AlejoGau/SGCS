//MIGRADO2024
Ext.define('Common.model.SlbfObjectSearchModel', {
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
    	defaultValue: 16
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'SlbfObject'
        },
		{name:'Description',type:'string'},
        {name:'TableName',type:'string'},
        {name:'Namespace',type:'string'},
        {name:'FullName',type:'string'},
        {name:'Assembly',type:'string'},
        {name:'AliasFromObject',type:'string'},
        {name:'AllowRelation',type:'string'},
        {name:'SchemaData',type:'string'},
        {name:'NameLocale',type:'string', convert:function(v,record){return getLocale(record.get('Name'))}} // localizo el nombre de la tabla
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/SlbfObject/',
		appendId : true
	}
});
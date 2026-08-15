//MIGRADO2024
Ext.define('Common.model.GeographybyparentModel', {
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
        defaultValue: 603
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'Geography'
        },
		{name:'Parent',type:'int',defaultValue:0},
		{name:'Level',type:'int',defaultValue:0},
		{name:'FirstParent',type:'int',defaultValue:0},
		{name:'ShortName',type:'string'},
		{name:'StandardName',type:'string'}
        ],
		
    proxy: {
		type : 'geographybyparentproxy',
		url : '/Rest/Geography/byparent',
        appendId: false,
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
            
    }
});
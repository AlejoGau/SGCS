//MIGRADO2024
Ext.define('Common.model.GeographyOrgGridModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'string'
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
		type : 'geographyorggridproxy',
		url : '/Rest/Geography/',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        }
    }
        
});
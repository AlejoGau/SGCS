//MIGRADO2024
Ext.define('Common.model.Taxo_ComoNosConocioSearchModel', {
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
        defaultValue: 600
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'Taxo_ComoNosConocio'
        },
		{name:'ParentId',type:'int'},
        {name:'ChildId',type:'int'},
        {name:'ParentName',type:'string'},
        {name:'editable',type:'int'},
        {name:'metadata',type:'string'},
        {name:'type',type:'int'},
       
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/Taxo_ComoNosConocioItems',
		appendId : true
	}
});
																
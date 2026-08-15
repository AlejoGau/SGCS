Ext.define('AdministratorSearch.model.SblfObjectSearchModel', {
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
        name: 'AliasFromObject',
        type: 'string'
        },
        {
        name: 'AllowRelation',
        type: 'string'
        },
    	{name:'Assembly',type:'string'},
        {name:'Description',type:'string'},
        {name:'FullName',type:'string'},
        {name:'Namespace',type:'string'},
        {name:'TableName',type:'string'}
    ],

        
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
       url : '/Rest/slbfobject/',
		appendId : true
	}
});



Ext.define('AdministratorSearch.model.SlbfObjectModel', {
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
		url : '/rest/slbfobject/',
		appendId : true
		}
});



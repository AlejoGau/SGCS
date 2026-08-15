Ext.define('ResourceModule.model.ResourceTypeSearchModel',{
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {
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
            defaultValue: 7054
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 't_ResourcesModule_Type'
        },
		{
            name:'rmt_idKey',
            type:'int'
        },
        {
            name: 'rmt_itipo',
            type: 'int'
        },        
        {
            name:'rmt_cNombre',
            type:'string'
        },
        {
            name:'rmt_idOrg',
            type:'int',
            defaultValue:0
        },
        {
            name: 'OrgName',
            type: 'string'
        },
        {
            name:'rmt_cIcono',
            type:'string'
        },
        {
            name:'rmo_iestado',
            type:'int'
        }

        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/search/SearchT_ResourcesModule_Type',
		appendId : true,
        reader: {
            type : 'json',
            root : 'rows',
            totalProperty : 'total'
        }         
	},
               
});
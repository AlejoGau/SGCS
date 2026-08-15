Ext.define('AdministratorSearch.model.TablasTagsAgModel', {
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
    	defaultValue: 3083
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_tags_ag'
        },
		{name:'tag_ccodigo',type:'string'},
{name:'tag_ctag',type:'string'},
{name:'tag_czona',type:'string'},
{name:'tag_iCuenta',type:'int',defaultValue:0}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_tags_ag/',
		appendId : true
		}
});
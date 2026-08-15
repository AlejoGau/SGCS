Ext.define('AdministratorSearch.model.TablasGruposModel', {
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
    	defaultValue: 3075
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_grupos'
        },
		{name:'gru_ccodigo',type:'string'},
{name:'gru_cdescripcion',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_grupos/',
		appendId : true
		}
});
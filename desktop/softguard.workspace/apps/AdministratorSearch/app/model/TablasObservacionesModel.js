Ext.define('AdministratorSearch.model.TablasObservacionesModel', {
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
    	defaultValue: 3085
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_observaciones'
        },
		{name:'obs_ccodigo',type:'string'},
{name:'obs_cdescripcion',type:'string'},
{name:'obs_mobservacion',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_observaciones/',
		appendId : true
		}
});
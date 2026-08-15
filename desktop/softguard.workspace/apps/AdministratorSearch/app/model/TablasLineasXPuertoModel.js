Ext.define('AdministratorSearch.model.TablasLineasXPuertoModel', {
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
    	defaultValue: 3069
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_LineasXPuerto'
        },
		{name:'lxp_iAlias',type:'int',defaultValue:0},
{name:'lxp_nLinea',type:'int',defaultValue:0},
{name:'lxp_nEstado',type:'int',defaultValue:0}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_LineasXPuerto/',
		appendId : true
		}
});
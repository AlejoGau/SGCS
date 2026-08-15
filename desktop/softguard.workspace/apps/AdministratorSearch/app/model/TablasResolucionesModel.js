Ext.define('AdministratorSearch.model.TablasResolucionesModel', {
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
    	defaultValue: 3078
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_resoluciones'
        },
		{name:'res_ccodigo',type:'string'},
{name:'res_cdescripcion',type:'string'},
{name:'res_nfalsaalarma',type:'int',defaultValue:0},
{name:'res_nEstado',type:'int',defaultValue:0}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_resoluciones/',
		appendId : true
		}
});
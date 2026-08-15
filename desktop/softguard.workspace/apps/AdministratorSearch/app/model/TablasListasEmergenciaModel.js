Ext.define('AdministratorSearch.model.TablasListasEmergenciaModel', {
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
    	defaultValue: 3071
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_listas_emergencia'
        },
		{name:'lis_ccodigo',type:'string'},
{name:'lis_cdescripcion',type:'string'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_listas_emergencia/',
		appendId : true
		}
});

																

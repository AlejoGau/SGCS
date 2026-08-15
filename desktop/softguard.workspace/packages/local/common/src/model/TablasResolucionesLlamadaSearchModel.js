//MIGRADO2024
Ext.define('Common.model.TablasResolucionesLlamadaSearchModel', {
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
    	defaultValue: 3081
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_resolucionesllamada'
        },
		{name:'rll_ccodigo',type:'string'},
{name:'rll_cdescripcion',type:'string'}
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_resolucionesllamada/',
		appendId : true
	}
});
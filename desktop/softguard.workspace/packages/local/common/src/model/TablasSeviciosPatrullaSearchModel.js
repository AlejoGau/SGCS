//MIGRADO2024
Ext.define('Common.model.TablasSeviciosPatrullaSearchModel', {
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
    	defaultValue: 3088
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_serviciospatrulla'
        },
		{name:'tsp_ccodigo',type:'string'},
{name:'tsp_cdescripcion',type:'string'},
{name:'tsp_cpathicon',type:'string'}
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_serviciospatrulla/',
		appendId : true
	}
});
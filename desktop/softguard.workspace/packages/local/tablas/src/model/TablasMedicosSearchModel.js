Ext.define('Tablas.model.TablasMedicosSearchModel', {
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
    	defaultValue: 3073
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_monitoreo_dealer'
        },
		    {name:'med_ccodigo',type:'string'},
{name:'med_cnombre',type:'string'},
{name:'med_ccalle',type:'string'},
{name:'med_clocalidad',type:'string'},
{name:'med_cprovincia',type:'string'},
{name:'med_ccodigopostal',type:'string'},
{name:'med_ctelefono',type:'string'},
{name:'med_cfax',type:'string'},
{name:'med_ntipo',type:'int',defaultValue:0}
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/t_medicos/',
		appendId : true
	}
});
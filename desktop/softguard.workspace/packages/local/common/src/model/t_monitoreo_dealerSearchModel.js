//MIGRADO2024
Ext.define('Common.model.t_monitoreo_dealerSearchModel', {
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
		{name:'tmd_clinea',type:'string'},
{name:'tmd_diasemana',type:'int'},
{name:'tmd_horadesde',type:'string'},
{name:'tmd_horahasta',type:'string'},
{name:'tmd_estado',type:'int'},
{name:'tmd_iorganizacion',type:'int'},
{name:'organizacion',type:'string'}
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/t_monitoreo_dealer',
		appendId : true
	}
});
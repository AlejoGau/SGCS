//MIGRADO2024
Ext.define('Common.model.t_monitoreo_dealerModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int',
        defaultValue: 0
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
		defaultValue: 't_medicos'
        },
		    {name:'tmd_clinea',type:'string'},
{name:'tmd_diasemana',type:'int'},
{name:'tmd_horadesde',type:'string'},
{name:'tmd_horahasta',type:'string'},
{name:'tmd_estado',type:'int'},
{name:'tmd_iorganizacion',type:'int'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_monitoreo_dealer/',
		appendId : true,
		reader: {
			type: 'json',
			rootProperty: 'data'
		},
		writer: {
			type: 'json',
			writeAllFields: true
		}
	}
});
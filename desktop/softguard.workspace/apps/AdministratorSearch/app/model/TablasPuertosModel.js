Ext.define('AdministratorSearch.model.TablasPuertosModel', {
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
    	defaultValue: 3091
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_puertos'
        },
		{name:'pue_icodigo',type:'int',defaultValue:0},
{name:'pue_cdescripcion',type:'string'},
{name:'pue_ireceptor',type:'int'},
{name:'pue_npuerto',type:'int',defaultValue:0},
{name:'pue_ndatabits',type:'int',defaultValue:8},
{name:'pue_nstopbits',type:'int',defaultValue:1},
{name:'pue_nbaudrate',type:'int',defaultValue:1},
{name:'pue_nparity',type:'int',defaultValue:1},
{name:'pue_nflowctrl',type:'int',defaultValue:0},
{name:'pue_nbufferin',type:'int',defaultValue:1024},
{name:'pue_nbufferout',type:'int',defaultValue:1024},
{name:'pue_nrts',type:'int',defaultValue:2},
{name:'pue_ndtr',type:'int',defaultValue:2},
{name:'pue_nestado',type:'int',defaultValue:2},
{name:'pue_crespondeack',type:'int',defaultValue:0},
{name:'pue_itiempoinactividad',type:'int',defaultValue:0},
{name:'pue_cresetxhb',type:'int',defaultValue:0}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/t_puertos/',
		appendId : true
		}
});
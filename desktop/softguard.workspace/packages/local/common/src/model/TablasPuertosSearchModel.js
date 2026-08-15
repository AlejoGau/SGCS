//MIGRADO2024
Ext.define('Common.model.TablasPuertosSearchModel', {
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
{name:'pue_ndatabits',type:'int',defaultValue:0},
{name:'pue_nstopbits',type:'int',defaultValue:0},
{name:'pue_nbaudrate',type:'int',defaultValue:0},
{name:'pue_nparity',type:'int',defaultValue:0},
{name:'pue_nflowctrl',type:'int',defaultValue:0},
{name:'pue_nbufferin',type:'int',defaultValue:0},
{name:'pue_nbufferout',type:'int',defaultValue:0},
{name:'pue_nrts',type:'int',defaultValue:0},
{name:'pue_ndtr',type:'int',defaultValue:0},
{name:'pue_nestado',type:'int',defaultValue:0},
{name:'pue_crespondeack',type:'int',defaultValue:0},
{name:'pue_itiempoinactividad',type:'int',defaultValue:0},
{name:'pue_cresetxhb',type:'int',defaultValue:0},
{name:'rec_cdescripcion',type:'string'},
{name:'rec_cdll',type:'string'},
{name:'rec_iid',type:'int'},
{name:'rec_ntcpip',type:'int'}
        ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/SearchPuertos',
		appendId : true
	}
});
//MIGRADO2024
Ext.define('Common.model.ZonaPlanillaModel', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [{
        name: 'id',
        type: 'int'
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
    	defaultValue: 3015
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'ZonaPlanilla'
        },
		{name:'zon_iid',type:'int',defaultValue:0},
{name:'zon_ccodigo',type:'string'},
{name:'zon_cdescripcion',type:'string'},
{name:'zon_codigoalarma',type:'string'},
{name:'zon_clistaemergencia',type:'string'},
{name:'zon_cimagen',type:'string'},
{name:'zon_mobservacion',type:'string'},
{name:'zon_ccodigorestauracion',type:'string'},
{name:'zon_nminutosrestauracion',type:'int',defaultValue:0},
{name:'zon_nmostrar',type:'int',defaultValue:0},
{name:'zon_cdealer',type:'string'},
{name:'zon_ccuenta',type:'string'},
{name:'zon_calarmaagenerar',type:'string'},
{name:'zon_nautoprocesa',type:'int',defaultValue:0}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/ZonaPlanilla/',
		appendId : false
		}
});
Ext.define('Cuenta.model.m_telefonoModel', {
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
        defaultValue: 3015
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'ZonaPlanilla'
        },
		{name:'tel_cclave',type:'string'},
{name:'tel_clista',type:'string'},
{name:'tel_cnombre',type:'string'},
{name:'tel_cobservacion',type:'string'},
{name:'tel_cpermiso',type:'string'},
{name:'tel_cpostdigito',type:'string'},
{name:'tel_cpredigito',type:'string'},
{name:'tel_ctelefono',type:'string'},
{name:'tel_iid',type:'int',defaultValue:0},
{name:'tel_iidcuenta',type:'int',defaultValue:0},
{name:'tel_ndiscado',type:'string'},
{name:'tel_norden',type:'string'},
{name:'tel_nsms',type:'string'},
{name:'tel_nsp',type:'string'},
{name:'tel_ntr',type:'string'},{
                name : '_usado',
				type : 'string',
                defaultValue : 'false'
			}

        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/Telefono/',
		appendId : true
		}
});

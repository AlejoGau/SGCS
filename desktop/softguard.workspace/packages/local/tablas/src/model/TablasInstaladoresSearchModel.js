Ext.define('Tablas.model.TablasInstaladoresSearchModel', {
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
        defaultValue: 3080
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_instaladores'
        },
		{name:'ins_ccodigo',type:'string'},
{name:'ins_cnombre',type:'string'},
{name:'ins_cempresa',type:'string'},
{name:'ins_ccalle',type:'string'},
{name:'ins_inumero',type:'int',defaultValue:0},
{name:'ins_npiso',type:'int',defaultValue:0},
{name:'ins_cdepartamento',type:'string'},
{name:'ins_ctelefono',type:'string'},
{name:'ins_cmail',type:'string'},
{name:'ins_cDealer',type:'string'},
{name:'ins_iTipo',type:'int'}
        ],
		
   proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/t_instaladores',
		appendId : true
	}
});
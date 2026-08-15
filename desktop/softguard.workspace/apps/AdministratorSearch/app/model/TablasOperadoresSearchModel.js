Ext.define('AdministratorSearch.model.TablasOperadoresSearchModel', {
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
        defaultValue: 3107
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 's_operadores'
        },
		{name:'ope_clogin',type:'string'},
{name:'ope_cnombre',type:'string'},
{name:'ope_cclave',type:'string'},
{name:'ope_nsql',type:'int',defaultValue:0},
{name:'ope_nsupervisor',type:'float',defaultValue:0},
{name:'ope_clinea',type:'string'},
{name:'ope_nprioridad',type:'float',defaultValue:0},
{name:'ope_dCambio',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)},
{name:'ope_nSereno',type:'float',defaultValue:0},
{name:'ope_iid',type:'int',defaultValue:0}
        ],
		
   
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
    	url : '/Rest/s_operadores/',
		appendId : true
	}
});
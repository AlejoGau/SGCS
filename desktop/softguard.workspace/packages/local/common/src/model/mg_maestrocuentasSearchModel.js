//MIGRADO2024
Ext.define('Common.model.mg_maestrocuentasSearchModel', {
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
        defaultValue: 3211
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'mg_maestrocuentas'
        },
		{name:'mgmc_idorganizacion',type:'int',defaultValue:0},
        {name:'mgmc_ccodigo',type:'string'},
        {name:'mgmc_descripcion',type:'string'},
        {name:'mgmc_ctipo',type:'string'},
        {name:'mgmc_lastupdate',type:'date', dateFormat:'MS', defaultValue: new Date(-62135586000000)},
        {name:'mgmc_saldo'},
        {name:'mgmc_moncodigo',type:'string'},
        {name:'mgmc_metadata',type:'string'},
        {name:'mgmc_capitulo',type:'int',defaultValue:0},
        {name:'mgmc_rubro',type:'int',defaultValue:0},
        {name:'mgmc_subrubro',type:'int',defaultValue:0},
        {name:'mgmc_imputacion',type:'int',defaultValue:0}
        
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/mg_maestrocuentas'
	}
});
																
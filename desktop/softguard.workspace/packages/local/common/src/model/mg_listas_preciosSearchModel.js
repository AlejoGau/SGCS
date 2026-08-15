//MIGRADO2024
Ext.define('Common.model.mg_listas_preciosSearchModel', {
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
        defaultValue: 600
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
    	defaultValue: 'MG_listas_Precios'
        },
		{name:'mglp_nombre',type:'string'},
        {name:'mglp_tipo',type:'int'},
        {name:'mglp_multiplicador',type:'number'},
        {name:'mglp_idorganizacion',type:'int'},
        {name:'mglp_currency',type:'string'},
        
        {name:'mglpd_valor',type:'number'},
        {name:'mglpd_idkey',type:'int'},
        {name:'nombreProdcuto',type:'string'},
        {name:'Price',type:'string'},
        {name:'mon_ccodigo',type:'string'},
        {name:'mon_csymbol',type:'string'},
        
        {name:'nombreOrganizacion',type:'string'}
        
        
        
        
        
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/MG_listas_precios',
		appendId : true
	}
});
																
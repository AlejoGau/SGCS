//MIGRADO2024
Ext.define('Common.model.mg_listas_precios_detalleSearchModel', {
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
		{name:'mglpd_idproducto',type:'string'},
        {name:'mglpd_idlista',type:'int'},
        {name:'mglpd_valor',type:'number'},
        
        {name:'Name',type:'string'},
        {name:'Price',type:'string'},
    	{name:'mglp_currency',type:'string'}
        
        
        
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/Search/MG_listas_precios_detalle',
		appendId : true
	}
});
																
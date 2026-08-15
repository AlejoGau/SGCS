//MIGRADO2024
Ext.define('Common.model.mg_listas_precios_detalleModel', {
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
        {name:'mglpd_valor',type:'number'}
        ],
		
    proxy: {
		type : 'rest',
		url : '/Rest/MG_listas_precios_detalle',
        writer:{ writeAllFields:true },
		appendId : true
		}
});
																
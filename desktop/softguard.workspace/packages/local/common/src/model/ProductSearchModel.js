//MIGRADO2024
Ext.define('Common.model.ProductSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [{
        name: 'Id',
        type: 'int',
        defaultValue: 0
        },
        {
        name: 'Name',
        type: 'string'
        },
        {
        name: 'ObjectTypeId',
        type: 'int',
        defaultValue: 403
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 'Product'
        },
		{name:'SmallComment',type:'string'},
        {name:'LargeComment',type:'string'},
        {name:'Body',type:'string'},
        {name:'Available',type:'string'},
        {name:'Price',type:'float',defaultValue:0},
        {name:'Structure',type:'string'},
        {name:'Weight',type:'int',defaultValue:0},
        {name:'MetaDescription',type:'string'},
        {name:'MetaKeywords',type:'string'},
        {name:'Status',type:'string'},
        {name:'AttachId',type:'int',defaultValue:0},
        {name:'Code',type:'string'},
        {name:'VAT',type:'float',defaultValue:0},
        {name:'Cost',type:'float',defaultValue:0},
        {name:'MeasureUnit',type:'string'},
        {name:'mon_ccodigo',type:'string'},
        {name:'mon_csymbol',type:'string'},
        
        {name:'final_price',type:'number'},
        {name:'description',type:'string'},
        
        {name:'pro_itipo',type:'int'},
        {name:'pro_cantidad_auto',type:'int',defaultValue:0},
        
        {name:'imp_ccodigo',type:'string'},
        {name:'imp_nporcentaje',type:'string'},
        {name:'imp_cdescripcion',type:'string'},
        {name:'imp_idorganizacion',type:'int'},
        {name:'mglp_idkey',type:'int'}
        
        
        
        ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/Product',
		appendId : false
	}
});

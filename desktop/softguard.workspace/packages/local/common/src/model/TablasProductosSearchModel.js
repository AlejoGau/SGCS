//MIGRADO2024
Ext.define('Common.model.TablasProductosSearchModel', {
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
        defaultValue: 3087
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
        {name:'Price',type:'float'},
        {name:'Structure',type:'string'},
        {name:'Weight',type:'string'},
        {name:'MetaDescription',type:'string'},
        {name:'MetaKeywords',type:'string'},
        {name:'Status',type:'string'},
        {name:'_Status',type:'string',convert: function (value, rec) {
            if(rec.get('Status') == '0') { 
                return 'No Disponible'
            } else {
                return 'Disponible'
                
            }
        }},
        {name:'AttachId',type:'string'},
        {name:'Code',type:'string'},
        {name:'VAT',type:'float'},
        {name:'Weight',type:'string'},
        {name:'Cost',type:'string'},
        {name:'MeasureUnit',type:'string'},
        {name:'pro_iidorganizacion',type:'int'},
        {name:'pro_itipo',type:'int'},
        {name:'pro_cantidad_auto',type:'int',defaultValue:0},
        {name:'pro_currency',type:'string'},
        {name:'mon_ccodigo',type:'string'},
        {name:'mon_csymbol',type:'string'}
    ],
		
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/product',
		appendId : true
	}
});

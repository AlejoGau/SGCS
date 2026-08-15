//MIGRADO2024
Ext.define('Common.model.t_formatos_impresion_fcSearchModel', {
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
        defaultValue: 3162
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
		defaultValue: 't_condiciones_pago_fc'
        },
{name:'for_cCodigo',type:'string'},
{name:'for_cDescripcion',type:'string'},
{name:'for_cFormato',type:'string'},
{name:'for_nLineas',type:'string'}
        ],
		
   proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/t_formatos_impresion_fc',
		appendId : true
		}
});
																
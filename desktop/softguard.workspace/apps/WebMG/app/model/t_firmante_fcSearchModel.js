Ext.define('WebMG.model.t_firmante_fcSearchModel', {
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
        defaultValue: 3071
        },
        {
        name: 'ObjectTypeName',
        type: 'string',
        defaultValue: 't_firmante_fc'
        },
            {name:'fir_ccodigo',type:'string'},
{name:'fir_cnombre',type:'string'},
{name:'fir_ccuenta',type:'string'},
{name:'fir_nlimite',type:'string'},
{name:'fir_nestado',type:'int'},
{name:'fir_mlegajo',type:'string'}

        ],
		
           
        proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty: 'rows',
            totalProperty : 'total'
        },
	url : '/Rest/search/t_firmantes_fc',
		appendId : true
	}
});

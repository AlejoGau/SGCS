Ext.define('AdministratorSearch.model.t_tipos_formapago_fcModel', {
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
        defaultValue: 't_formas_pago_fc'
        },
		    {name:'tfp_ccodigo',type:'string'},
{name:'tfp_cdescripcion',type:'string'}
        ],
		
           
        proxy: {
        type : 'rest',        
		url : '/Rest/t_tipos_formapago_fc/',
		appendId : true
	}
});

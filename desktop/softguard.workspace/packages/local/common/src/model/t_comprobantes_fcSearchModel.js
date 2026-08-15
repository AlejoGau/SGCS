//MIGRADO2024
Ext.define('Common.model.t_comprobantes_fcSearchModel', {
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
	    {name:'cbt_ccodigo',type:'string'},
        {name:'cbt_cdescripcion',type:'string'},
        {name:'cbt_cdescripcionreducida',type:'string'},
        {name:'cbt_ntipo',type:'string'},
        {name:'cbt_cletra',type:'string'},
        {name:'cbt_cprefijo',type:'string'},
        {name:'cbt_inumero',type:'string'},
        {name:'cbt_ncopias',type:'string'},
        {name:'cbt_casociado',type:'string'},
        {name:'cbt_nCbteCAE',type:'string'},
        {name:'_cbt_cdescripcion',type:'string', convert: function (value, record) {
            return Ext.util.Format.trim(record.get('cbt_cdescripcion'))+' ('+record.get('org_cnombre')+')'
        }},
        {name:'cbt_idOrganizacionFacturadora',type:'int'},
        {name:'org_cnombre',type:'string'}
    ],
    
    proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
	    url : '/Rest/search/t_comprobantes_fc',
		appendId : true
	}
});
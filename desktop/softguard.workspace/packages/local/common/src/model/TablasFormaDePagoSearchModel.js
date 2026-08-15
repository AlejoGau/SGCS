Ext.define('Common.model.TablasFormaDePagoSearchModel', {
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
		    {name:'fpg_ccodigo',type:'string'},
{name:'fpg_cdescripcion',type:'string'},
{name:'fpg_cdescripcionreducida',type:'string'},
{name:'fpg_npidenumero',type:'int'},
{name:'fpg_npidevencimiento',type:'int'},
{name:'fpg_npidebanco',type:'int'},
{name:'fpg_ctipo',type:'string'},
{name:'_fpg_cdescripcion',type:'string', convert:function (value,record) {
    return record.get('fpg_cdescripcion');//+' ('+record.get('fpg_cdescripcionreducida')+')'
}},
{name:'org_cnombre',type:'string'},
{name:'tfp_cdescripcion',type:'string'},
{name:'mgmc_descripcion',type:'string'},
{name:'mgmc_ccodigo',type:'string'},
{name:'_mgmc_descripcion',type:'string', 
    convert:function (value,record) {
        return record.get('mgmc_ccodigo')+' '+record.get('mgmc_descripcion');
    }
}


        ],
		
           
        proxy: {
        type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/t_formas_pago_fc',
		appendId : true
	}
});

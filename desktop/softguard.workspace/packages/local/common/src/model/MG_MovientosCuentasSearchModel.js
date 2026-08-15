//MIGRADO2024
Ext.define('Common.model.MG_MovientosCuentasSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'mgm_idkey',
    fields: [
        {   
            name: 'mgm_idkey',
            type: 'int'
        },
        {
            name: 'cbc_yTotal',
            type: 'float'
        },
        {
            name: 'ObjectTypeName',
            type: 'string',
            defaultValue: 'MoneytGuardClient'
        },
        'cbc_dFecha',
        'cbt_cprefijo',
        'cbt_cletra',
        'cbt_inumero',
        'cbt_cdescripcion',
        'cbt_cdescripcionreducida',
    	{name:'cli_cnombre',type:'string'},
        {name:'cli_cidentificacion',type:'string'},
        {name:'cli_czona',type:'string'},
        {name:'cbc_iNumeroCbte',type:'string'},
        {name:'cbc_cPrefijoCbte',type:'string'},
        {name:'cbc_cPrefijoCbte',type:'string'},
        {name:'cbc_iNumeroCbte',type:'string'},
        {name:'cbc_dFecha',type:'date'},
        {name:'cbc_cTipoCbte',type:'string'},
        {name:'cbc_cTipoCbte',type:'string'},
        {name:'cbt_ccodigo',type:'string'},
        {name:'cbt_cdescripcion',type:'string'},
        {name:'cbc_iCodigo_ID',type:'int'},
        {name:'_ncomprobante',type:'string',convert:function(v, record){
             return  Ext.String.leftPad(Ext.util.Format.trim(record.get('cbc_cPrefijoCbte')), 4, '0')+'-'+Ext.String.leftPad(record.get('cbc_iNumeroCbte'), 10, '0')
         }},
         
         {name:'_grouptitle',type:'string',convert:function(v, record){
             return  Ext.String.leftPad(Ext.util.Format.trim(record.get('cbc_cPrefijoCbte')), 4, '0')+'-'+Ext.String.leftPad(record.get('cbc_iNumeroCbte'), 10, '0')+' Total: '+record.get('cbc_yTotal')
         }},
      "mgm_idcuenta",
      "mgm_monto",
      "mgm_saldo",
      "mgm_fecha",
      "mgm_estado",
      "mgm_idcomprobante",
      "mgmc_moncodigo"
        ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/mg_movimientoscuentas',
		appendId : false
	}
});
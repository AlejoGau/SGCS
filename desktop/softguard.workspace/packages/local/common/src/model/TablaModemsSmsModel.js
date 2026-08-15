//MIGRADO2024
Ext.define('Common.model.TablaModemsSmsModel', {
    extend: 'Ext.data.Model',
    idProperty: 'sms_icodigo',
    fields: [
    	{name:'sms_cdescripcion',type:'string'},
    	{name:'sms_cinbox',type:'string'},
    	{name:'sms_cseteo',type:'string'},
    	{name:'sms_csmpphostname',type:'string'},
    	{name:'sms_csmpppassword',type:'string'},
    	{name:'sms_csmppsystemid',type:'string'},
    	{name:'sms_csource',type:'string'},
    	{name:'sms_cterminal',type:'string'},
    	{name:'sms_icodigo',type:'int'},
    	{name:'sms_ndefault',type:'string'},
    	{name:'sms_nport',type:'string'},
    	{name:'sms_nsmppport',type:'string'},
        {name:'sms_nEstado', type:'int',defaultValue:2},
	]
});
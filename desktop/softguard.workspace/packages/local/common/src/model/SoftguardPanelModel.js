//MIGRADO2024
Ext.define('Common.model.SoftguardPanelModel', {
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
    	'pan_iidcuenta','pan_ccodigo','pan_mubicacion','pan_ccallerid1','pan_ccallerid2','pan_ccallerid3','pan_ccallerid4','pan_ccallerid5',
        {
        name: 'pan_nmostrar',
        type: 'int',
        defaultValue: 2
        }
        ,'pan_csender','pan_cnrosim1','pan_ccompania1','pan_cnrosim2','pan_ccompania2','pan_cgprs'
        ,
        {
            name: 'pan_rpmidkey',
            type: 'int'
        }],
        
        
    proxy : {
    	type : 'softguardpanelproxy',
		url : '/Rest/Cuenta/{0}/Panel',
		replaceIdRegex : /\{0\}/,
		appendId : true,
	}
});
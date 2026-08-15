//MIGRADO2024
Ext.define('Common.model.SmsAWCCSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'cue_iid',
    fields: [
        {
            name: 'para',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        },{
            name: 'cdevento',
            type: 'string'
        },{
            name: 'dsevento',
            type: 'string'
        }
    ],
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/rest/search/AWCC_SMS',        
        appendId : false
	}
});
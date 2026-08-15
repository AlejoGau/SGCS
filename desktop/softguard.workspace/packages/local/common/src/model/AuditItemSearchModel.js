//MIGRADO2024
Ext.define('Common.model.AuditItemSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        {name:'XmlNew',type:'string'},
        {name:'XmlOld',type:'string'},
        {name:'OldValueDenom',type:'string'},
        {name:'NewValueDenom',type:'string'}
        ],
    proxy : {
		type : 'rest',
        reader: {
                type : 'json',
                rootProperty : 'rows',
                totalProperty : 'total'
        },
		url : '/Rest/search/auditXML',
		appendId : true
	}
});
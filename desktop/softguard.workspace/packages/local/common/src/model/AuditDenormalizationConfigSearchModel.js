//MIGRADO2024
Ext.define('Common.model.AuditDenormalizationConfigSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        {name:'name',type:'string'},
		{name:'value',type:'string'}
	],
		
    proxy: {
		type : 'rest',
		url : '/Rest/search/AuditDenormalizationConfig',
		appendId : true
		}
});
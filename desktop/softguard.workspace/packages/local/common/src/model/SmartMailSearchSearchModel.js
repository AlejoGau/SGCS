//MIGRADO2024
Ext.define('Common.model.SmartMailSearchSearchModel', {
    extend : 'Ext.data.Model',
    idProperty : 'Id',
    fields: [
        { name: 'Email', type: 'string' }
        ],
   
    proxy : {        
        type : 'rest',
        
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
        url : '/rest/search/SmartMailEmailByProgram',        
    	appendId : true
	}
});
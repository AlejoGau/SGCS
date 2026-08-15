Ext.define('AdministratorSearch.model.FormatoReceptoresModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        
         {name:'RowNumber',type:'int'},
         {name:'rec_iid',type:'int'},
         {name:'rec_cformato',type:'string'}
         
    ],
    	
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/SeachReceptoresItem',
		appendId : true
	}
});

Ext.define('AdministratorSearch.model.FormatosSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        
       {name:'RowNumber',type:'int'},
       {name:'for_ccodigo',type:'int'},
       {name:'for_cdescripcion',type:'string'},
       {name:'for_cformato',type:'string'},
       {name:'for_cnombre',type:'string'},
       {name:'for_calarma',type:'string'}
       
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/SeachFormatos',
		appendId : true
	}
});

																

Ext.define('AdministratorSearch.model.FormatoReceptoresSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        
         {name:'RowNumber',type:'int'},
         {name:'rec_iid',type:'int'},
         {name:'rec_cformato',type:'string'},
         {name:'rec_cdescripcion',type:'string'},
         {name:'rec_cdll',type:'string'},
         {name:'rec_ntcpip',type:'string',
              convert: function (value, model) {
                    var valor;
                  
                    if(value == 2) {
                        valor = "Si";
                    } else { 
                        valor = "No";
                    }
                   return valor;
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
		url : '/Rest/search/SeachReceptoresItem',
		appendId : true
	}
});

			
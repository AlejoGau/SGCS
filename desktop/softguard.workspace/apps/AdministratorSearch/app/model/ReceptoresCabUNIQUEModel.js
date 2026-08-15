Ext.define('AdministratorSearch.model.ReceptoresCabUNIQUEModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        
          {name:'Id',type:'int'},
          {name:'RowNumber',type:'int'},
          {name:'rec_iid',type:'int'},
          {name:'rec_cdescripcion',type:'string'},
          {name:'rec_cdll',type:'string'},
          {name:'rec_ntcpip',type:'int',
              convert: function (value, model) {
                    var valor;
                  
                    if(value == 2) {
                        valor = getLocale("No");
                    } else { 
                        valor = getLocale("Si");
                    }
                   return valor;
             }
          },
          
          {name:'rec_idKey',type:'int'},
          
          
    ],
        
    proxy: {
    	type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/ReceptoresCabUNIQUE',
		appendId : true
	}
});
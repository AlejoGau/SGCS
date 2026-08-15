Ext.define('GestorSim.model.ReceptoresSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'Id',
    fields: [
        
          {name:'RowNumber',type:'int'},
          {name:'rec_iid',type:'int'},
          {name:'rec_cdescripcion',type:'string'},
          {name:'rec_cdll',type:'string'},
          {name:'Id', type:'int',mapping:'rec_iid'},
          {name:'Equipo', type:'string', mapping:'rec_cdescripcion'},
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
          }
          
    ],
		
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/SeachReceptoresCab',
		appendId : true
	}
});

			
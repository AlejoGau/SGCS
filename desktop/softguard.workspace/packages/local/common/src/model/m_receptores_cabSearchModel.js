//MIGRADO2024
Ext.define('Common.model.m_receptores_cabSearchModel', {
    extend: 'Ext.data.Model',
    idProperty: 'RowNumber',
    fields: [
        
          {name:'RowNumber',type:'int'},
          {name:'rec_iid',type:'int'},
          {name:'rec_cdescripcion',type:'string'},
          {name:'rec_cdll',type:'string'},
          {name:'rec_cConfig',type:'string'},          
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
          {name:'rpm_idKey',type:'int'},
          {name:'RowNumber',type:'int'},
          {name:'rpm_cModelo',type:'string'},
          {name:'rpm_cConfig',type:'string'},
          
          {name:'_nombreCompleto',type:'string',
              convert: function (value, model) {
                  if(model.get('rpm_cModelo') == '') {
                        return model.get('rec_cdescripcion')
                  } else {
                      return model.get('rec_cdescripcion')+' - '+model.get('rpm_cModelo')
                  }
             }
          },
          
    ],
    	
    proxy: {
		type : 'rest',
        reader: {
            type : 'json',
            rootProperty : 'rows',
            totalProperty : 'total'
        },
		url : '/Rest/search/m_receptores_cab',
		appendId : true
	}
});
																
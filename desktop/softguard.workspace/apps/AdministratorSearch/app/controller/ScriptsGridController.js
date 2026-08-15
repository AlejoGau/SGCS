Ext.define('AdministratorSearch.controller.ScriptsGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'ScriptsStore' ],
    models : [ 'ScriptsModel' ],
    views : [ 'scriptsGridView' ],

    init : function(config) {
		// genero los eventos
		this.control({
					'scriptsview' : {
						afterrender : this.initView,
                        ejecuteScript: this.onEjecuteScript
    				}
                
    			});
	}, // cierro init

	initView : function(view) {
        
        view.bindStore(this.getScriptsStoreStore());
      
	    
	},
    
    
    
    onEjecuteScript: function(record,view){
        console.log(record)
        
        
        Ext.MessageBox.confirm(getLocale('Ejecutar Script'), getLocale('Esta seguro que quiere ejecutar')+' '+getLocale(record.get('Name')), function(btn){
           if(btn === 'yes'){
               
               
                view.mask = Ext.create('Ext.LoadMask', view, {
                    msg: getLocale("Ejecutando script")+' '+getLocale(record.get('Name'))
                }).show();
               
              record.set('Status', 1)
        
            	Ext.Ajax.request({
                      url: record.get('Url'),
                      success: function(resp,operation) {
                          
                          
                          if(resp.responseText)  {                 
                          
                                var metadata = Ext.JSON.decode(resp.responseText);
                                record.set('Status', 0)
                                view.mask.hide()
                          }
                      },
                      failure: function(error) {
                            console.log('failure'); // ajax error
                            record.set('Status', 0)
                            view.mask.hide()
                      },
    
                      callback: function(o, r, n){
                        console.log('callback');
                        record.set('Status', 0)
                        view.mask.hide()
                      }    
        		})
           }
           else{
              //some code
           }
         });
        
        
        
    }

    
});
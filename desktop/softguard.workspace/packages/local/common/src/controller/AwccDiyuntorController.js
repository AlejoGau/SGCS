//MIGRADO2024
Ext.define('Common.controller.AwccDiyuntorController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'AwccDiyuntorView' ],
    init : function(config) {
    	this.control({
			'awccdiyuntor' : {
				beforerender : this.initview
			}
        });
	},
    
	initview : function(view) {
       
      var store = KeyModulesStore;//this.getKeyModulesStoreStore();
        
       
        if (!store.isModuleAvailable('AWCC')){
            notify('No es posible acceder a la funcionalidad completa de esta solapa. Consulte con el proveedor del servicio.')
        } else {
        
            if(getParametro('VERSIONAWCC') == 1) {
            
            
                    var awccView = Ext.widget('exawccusuariosgridview', {
                            title : '',
                            record: view.record,
                            module:view.module
                	    }); 
            } else {
                
                    var awccView = Ext.widget('awccUsuariobydealergridview', {
                            title : '',
                            record: view.record,
                            module:view.module
                	    }); 
            }
            view.add(awccView)
        } 
      
        
        
        
	},
    
});
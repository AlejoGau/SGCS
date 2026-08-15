Ext.define('AdministratorSearch.controller.SystemConfigurationController', {
    extend : 'Ext.app.Controller',
    stores : [ 'SystemConfigurationModuleStore', 'SystemTablesModuleStore', 'SystemParametersModuleStore' ],
    models : [  ],
    views : [ 'SystemConfigurationView' ],

    init : function(config) {
        // genero los eventos
    	this.control({
            'systemconfigurationview' : {
                beforerender : this.initview
			}
		});
	}, // cierro init
    
    initview: function(view){
        
         
        
    }
    
});



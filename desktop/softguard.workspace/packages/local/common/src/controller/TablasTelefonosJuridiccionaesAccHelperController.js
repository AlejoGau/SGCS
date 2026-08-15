//MIGRADO2024
Ext.define('Common.controller.TablasTelefonosJuridiccionaesAccHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasTelefonosJuridiccionalesModel' ],
    views : [ 'TablasTelefonosJurisdiccionalesHelperView' ],
    init : function(config) {
        // genero los eventos
    	this.control({
					'tablastelefonosjuridiccionaleshelperview' : {
						beforerender : this.initview
					}
    				
                });
	}, // cierro init
	initview : function(view) {
               
        view.loadRecord(view.record);
	},
  
	
   
});
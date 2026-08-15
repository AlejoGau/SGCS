Ext.define('Trackguard.controller.GeocercasProgramadasController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'GeocercasProgramadasView' ],

    init : function(config) {
        // genero los eventos

        this.control({
        			'geocercasprogramadasview' : {
						beforerender : this.initview
					}
    				
                });
	}, // cierro init

	initview : function(view) {
        
         var myPanel = view.down('#centerroutes');  
       
        var newTab = Ext.widget('geocercasprogramadasgridview',{
            title: 'Lista',
        	closable: false,
    		record: view.record,
            profile: view.module.data.profile
        });	

		// agrego la paleta creada
		myPanel.add(newTab);
		myPanel.setActiveTab(newTab);
        
    }
})

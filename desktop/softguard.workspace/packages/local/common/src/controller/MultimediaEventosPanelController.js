//MIGRADO2024
Ext.define('Common.controller.MultimediaEventosPanelController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'MultimediaEventosPanelView' ],
    init : function(config) {
        // this.initConfig(config);
    	// genero los eventos
		this.control({
            'multimediaeventospanelview' : {
                beforerender : this.initview,
			}
		});
	}, // cierro init
	initview : function(view) {
           
        
    }
});
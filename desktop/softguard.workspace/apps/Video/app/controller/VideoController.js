Ext.define('Video.controller.VideoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ExtUxNotification', 'MetadataViewport' ],

    init : function(config) {
    	// genero los eventos
		this.control({
            '#aaaviewport' : {
                afterrender : this.initview
			}
		});
	}, // cierro init
    
    initview: function(view){
        //console.log(123)
    }
});
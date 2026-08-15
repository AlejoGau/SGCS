Ext.define('WeSafe.controller.SpinBoxROController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'SpinBoxROView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'spinboxroview' : {
    			afterrender : this.initView
            }
		});
        
	}, // cierro init


    initView : function(view) {
        view.loadRecord(view.record);
    }

})
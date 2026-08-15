//MIGRADO2024
Ext.define('Common.controller.NotificacionesPanelController', {
    extend: 'Ext.app.Controller',
        stores : [  ],
        models : [  ],
		views : [ 'NotificacionesPanelView' ],
    init: function (config) {
        this.control({
    
            'notificacionespanelview':{
                beforerender: this.initview
            }
            
        });
		
    },
   
    
    initview : function(view) {
        view.down('#mailview').record = view.record;
        view.down('#smsview').record = view.record;
        view.down('#pushview').record = view.record;
        view.down('#mailview').module = view.module;
        view.down('#smsview').module = view.module;
        view.down('#pushview').module = view.module;
	},
    
   
});
Ext.define('SgAppNotificationReport.controller.NotificationReportController', {
    extend : 'Ext.app.Controller',
    stores : [ 'NRModuleStore' ],
    models : [  ],
    views : [ 'NRview', 'ExtUxNotification' ],

    init : function(config) {
        // genero los eventos
		this.control({
            'viewport' : {
                beforerender : this.initview
			}
		});
	}, // cierro init
    
    initview: function(view){
        this.application._nameModule = 'SgAppNotificationReport';
        
        var view = view.down('tabpanel');
        
        var newTab = Ext.widget('smartmailprogramgridview', {
                iconCls: 'icon-email-go',
        		title : getLocale('Correos enviados'),
                targetTab: view,
    			closable : false,
                readonly: true
    		});
            
            view.add(newTab);
            view.setActiveTab(newTab);
     
    }
    
});
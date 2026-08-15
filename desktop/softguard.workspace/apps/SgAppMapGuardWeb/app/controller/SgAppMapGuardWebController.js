Ext.define('SgAppMapGuardWeb.controller.SgAppMapGuardWebController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ExtUxNotification' ],

    init : function(config) {
    	// genero los eventos
		this.control({
            'viewport' : {
                beforerender : this.initview
			}
		});
	}, // cierro init
    
    initview: function(view){
        //this.application._idModule = 5;
        
        this.application._nameModule = 'SgAppMapGuardWeb'

        var view = Ext.widget('mapguardgpsview',{
                        title: getLocale('MapGuard')
                    });
        var myPanel = Ext.getCmp('center');
        myPanel.add(view);
        myPanel.setActiveTab(view);
/*
 var view = Ext.widget('mapguardeventosview',{
                        title: getLocale('MapGuard2')
                    });
        myPanel.add(view);
*/

    }



    
});
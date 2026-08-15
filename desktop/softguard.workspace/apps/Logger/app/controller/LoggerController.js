Ext.define('Logger.controller.LoggerController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'GrabacionAudioSearchModel' ],
    views : [  ],

    init : function(config) {
        // genero los eventos
		this.control({
            'viewport' : {
                beforerender : this.initview
			}
		});
	}, // cierro init
    
    initview: function(view){
        this.application._idModule = 71;
      /*  var myPanel = Ext.getCmp('center');

        var linkview = Ext.widget('multicuentallamadasgrabadasview',{
            title: getLocale('Llamadas')
        });

        myPanel.add(linkview);*/
    },

   
   
    
});
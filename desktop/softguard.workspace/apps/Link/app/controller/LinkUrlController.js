Ext.define('Link.controller.LinkUrlController', {
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
        this.application._idModule = 70;
        var myPanel = Ext.getCmp('center');

        var linkview = Ext.widget('linkurlgridview',{
            title: getLocale('links'),
            onlyRead:true
        });

        myPanel.add(linkview);
        
        
      /* 
      Le falta para terminarlo
      
      var linkview = Ext.widget('linkhtmlview',{
            title: getLocale('links'),
            onlyRead:true
        });

        myPanel.add(linkview);*/
        
        
        
    },

   
   
    
});
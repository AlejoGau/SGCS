Ext.define('AdministratorSearch.controller.SessionesController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'SessionView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'sessionview' : {
                afterrender : this.initView
            },
            'sessionview #refresh' : {
                click : this.onClickRefresh
            } 
        });
        
	}, // cierro init
    
    initView: function(view){
        
        view.baseurl = '/handler/SessionHtml';
        var target = view.down('#Iframe');
        
        target.getDocument().getElementsByTagName('body')[0].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol+'//'+window.location.hostname+'/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        var url;
        url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        
        target.setSrc(url);

    },

    onClickRefresh: function (btn) {
        var view  = btn.up('sessionview');
        var target = view.down('#Iframe');
         var url;
        url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        
        target.setSrc(url);
    }
   
        
    
});
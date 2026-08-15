Ext.define('Link.controller.LinkUrlHtmlController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'LinkHtmlView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'linkhtmlview' : {
                afterrender : this.initView,
                cuentachanged: this.onCuentaChanged
            },
            'linkhtmlview button[action=search]' : {
                click: this.onSearchClick
            },
            'linkhtmlview button[action=todos]' : {
                click: this.onTodosClick
            }
        });
	}, // cierro init
    
    onSearchClick: function(button, event, options) {  
        var controller = this;
        var view = button.up('linkhtmlview')?button.up('linkhtmlview'):button;
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        var producto = view.down('#producto').getValue();

        view.filters = [];

        if(producto) {
            url = Ext.String.urlAppend(url,"stt_idproducto="+producto);
            view.filters.push({
                property:'stt_idproducto',
                value:producto
            })
        }
        
        var target = view.down('#Iframe');
        target.getDocument().getElementsByTagName('body')[0].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol+'//'+window.location.hostname+'/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
    
        if (view.filters.length>0){
           url = Ext.String.urlAppend(url, 'filter='+Ext.encode(view.filters));
        } 
        target.setSrc(url);
    },
    
    initView: function(view){
        view.baseurl = '/handler/LinkHtml';
        var target = view.down('#Iframe');
        target.getDocument().getElementsByTagName('body')[0].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol+'//'+window.location.hostname+'/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
     
       target.setSrc(view.baseurl);
      // this.onSearchClick(view)

    },
     onTodosClick: function(button){ 
        var view = button.up('linkhtmlview');     
       /* var controller = this;
        view.down('#producto').setValue('');
        controller.onSearchClick(view)     */  
        var target = view.down('#Iframe');
        var ele = target.getEl();
        document.getElementById('iframe-'+ele.id).contentWindow.openTab(Ext,view.up('tabpanel'));
    }
});
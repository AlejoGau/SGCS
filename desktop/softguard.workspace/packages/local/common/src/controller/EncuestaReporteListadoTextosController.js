//MIGRADO2024
Ext.define('Common.controller.EncuestaReporteListadoTextosController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'EncuestaReporteListadoTextosView' ],
    init : function(config) {
        // genero los eventos
        this.control({
    		'encuestaslistadotextosview' : {
				afterrender : this.initview
			}
    				
        });
	}, // cierro init
    initview : function(view) {
        var encuesta = view.up('encuestaview').down('encuestasformview').record; // El record viene de la solapa principal, correspondiente a la Encuesta consultada
        var controller = this;
        view.baseurl = '/handler/EncuestaReporteListadoTextosHTML';
        var url = view.baseurl;
        
        // Agrego el parametro de Id de Encuesta para filtrar por la cual tengo abierta
        url = Ext.String.urlAppend(url, 'Id='+encuesta.get('Id'));
        var target = view.down('#Iframe');
        target.load({
            src: url
        });
        //
        //target.getDocument().getElementsByTagName('body')[0].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        //target.setSrc(url);
    }
});
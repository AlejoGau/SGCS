Ext.define('SgAppWebReport.controller.ReporteHorasPorObjetivoCleanAppController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteHorasPorObjetivoCleanAppView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportehorasporobjetivocleanappview' : {
                afterrender : this.initView   
            }
        });
        
    }, // cierro init
    
    initView: function(view){
        
        /* Modifico el baseUrl al nuevo creado */
        view.baseurl =  '/handler/ReporteHorasPorTecnicoHTML?oauth_token=8CDCD4D5-8284-48C0-B75A-4D3AAF379C87';
        var target = view.down('#Iframe');      
        var url = view.baseurl
        
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        target.load({
            src: url
        }); 
      
    }

})
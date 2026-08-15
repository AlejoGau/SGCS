Ext.define('SgAppWebReport.controller.ReporteHistorialAsignacionesCleanAppController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteHistorialAsignacionesCleanAppView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportehistorialasignacionescleanappview' : {
                afterrender : this.initView   
            }
        });
        
    }, // cierro init
    
    initView: function(view){
        
        /* Modifico el baseUrl al nuevo creado */
        view.baseurl =  '/handler/ReporteHorasPorTecnicoHTML';
        var target = view.down('#Iframe');      
        var url = view.baseurl
        
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
                target.load({
            src: url
        }); 
      
    }

})
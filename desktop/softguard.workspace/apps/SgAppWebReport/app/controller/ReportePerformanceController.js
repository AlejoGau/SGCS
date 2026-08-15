Ext.define('SgAppWebReport.controller.ReportePerformanceController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReportePerformanceView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reporteperformaceview' : {
                afterrender : this.initView
            },
            'reporteperformaceview button[action=btnprint]': {
                click: this.onBtnprintClick
            },               
    	});
        
	}, // cierro init
    
    initView: function(view){
        var controller = this
        view.baseurl =  '/handler/PerformanceHTML';
        var target = view.down('#Iframe');
        
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
         
        
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'icon=computer_error.png');
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token='+controller.application.getToken());
       var url;
        url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        
                target.load({
            src: url
        }); 
                
       
    },
    onBtnprintClick: function (button) {
        var view = button.up('reporteperformaceview');
        var target = view.down('#Iframe');
        url = target.src;
        var contenido;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { 
            printHTMLContent(body);
            /*
            var win = Ext.create('Ext.window.Window', {
                    title: 'Mi ventana',
                    html: "",
                    modal: true,
        });
        contenido = body.replace('body', 'body onload="window.print(); window.onafterprint = function() { window.close(); }"')
            let myWindow = window.open('', '', 'width=600,height=400');
            if (myWindow) {
                let doc = myWindow.document;
                doc.open();
                doc.write(contenido);
                doc.close();
            } else {
                console.error('No se pudo abrir la ventana.');
            }
            //win.printMe();
            */
        });
    },    

});
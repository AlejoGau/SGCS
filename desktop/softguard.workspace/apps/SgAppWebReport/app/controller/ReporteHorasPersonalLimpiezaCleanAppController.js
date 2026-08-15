Ext.define('SgAppWebReport.controller.ReporteHorasPersonalLimpiezaCleanAppController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteHorasPersonalLimpiezaCleanAppView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportehoraspersonallimpiezacleanappview' : {
                afterrender : this.initView   
            },
            'reportehoraspersonallimpiezacleanappview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportehoraspersonallimpiezacleanappview button[action=export]' : {
                click: this.onExportClick
            },
            'reportehoraspersonallimpiezacleanappview button[action=btnprint]' : {
                click: this.onBtnprintClick
            }

        });
        
    }, // cierro init
    
    initView: function(view){
        var controller = this;
        /* Modifico el baseUrl al nuevo creado */
        view.baseurl =  '/handler/ReporteHorasVigiladorHTML?fromCleanapp=true';
        var target = view.down('#Iframe');      
        var url = view.baseurl
        
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Pedazo de puto')+'</h1>';
        target.load({
            src: url
        }); 
    },
    onBtnprintClick: function(button) {
        var view = button.up('reportehoraspersonallimpiezacleanappview');
        var target = view.down('#Iframe');
        url = target.src;
        var contenido;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { 
            /*var win = Ext.create('Ext.window.Window', {
                    title: 'Mi ventana',
                    html: "",
                    modal: true,*/
                    printHTMLContent(body);
        });
        /*contenido = body.replace('body', 'body onload="window.print(); window.onafterprint = function() { window.close(); }"')
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
        });*/
    },
    onSearchClick : function(button, event, options) {
        var view = button.up('reportehoraspersonallimpiezacleanappview');

        /* Tomo los valores de los combo creado en la view */
        var vigilador = view.down('#vigilador').getValue();
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = view.down('#fechaHasta').getValue();
        var target = view.down('#Iframe');

        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        
        /* Agrego los valores de los combo a las URL
         * Genero los parametros del Store Procedure
         */
        if(vigilador) {   
            url = Ext.String.urlAppend(url,"vigilador="+vigilador);
        }
        if(fechadesde) {   
            url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format(fechadesde,'Y-m-d'));
        } 
        if(fechahasta) {   
            url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(fechahasta,'Y-m-d'));
        }
        
        view.urltoexport = url;
        
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        ////target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        /* Llamo a la URL */
        target.load({
            src: url
        }); 

    },

    onExportClick : function(button){
        var view = button.up('reportehoraspersonallimpiezacleanappview');
        if(view.urltoexport) {
            var url = view.urltoexport;
        } else {
            var url = view.baseurl;
        }
        
        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        location.href=url;
    }

})
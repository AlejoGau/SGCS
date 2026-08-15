Ext.define('SgAppWebReport.controller.ReporteFlujoSenalesController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'FlujoSenalesModel' ],
    views : [ 'ReporteFlujoSenalesView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reporteflujosenalesview' : {
                afterrender : this.initView   
            },
            'reporteflujosenalesview button[action=search]' : {
                click: this.onSearchClick
            },
            'reporteflujosenalesview button[action=export]' : {
                click: this.onExportClick
            },
            'reporteflujosenalesview button[action=btnprint]': {
                click: this.onBtnprintClick
            },              
        });
        
    }, // cierro init
    
    initView: function(view){

        /* Cargo el Stored correspondiente a panel, esto lo uso
         * para poder tener la informacion en los combo
         */
        var controller = this;
        
        var storeReceptor = Ext.create('Ext.data.Store',{
            model: controller.getFlujoSenalesModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true
        });
        view.down('#receptorcombo').bindStore(storeReceptor);
        storeReceptor.load();

        /* Modifico el baseUrl al nuevo creado */
        view.baseurl =  '/handler/ReporteFlujoSenalesHTML';
        var target = view.down('#Iframe');
        
        var url = view.baseurl
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        /* Llamo a la URL */
        target.load({
            src: url
        }); 
    },

    onBtnprintClick: function (button) {
        var view = button.up('reporteflujosenalesview');
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

    onSearchClick : function(button, event, options) {
        var view = button.up('reporteflujosenalesview');

        /* Tomo los valores de los combo creado en la view */
        var panel = view.down('#receptorcombo').getValue();
        var target = view.down('#Iframe');

        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        
        if(panel) {   
            url = Ext.String.urlAppend(url,"receptorcombo="+panel);
        }
        
        view.urltoexport = url;
        
        /* Agrego los valores de los combo a las URL
         * Genero los parametros del Store Procedure
         */
        
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        /* Llamo a la URL */
        target.load({
            src: url
        }); 

    },

    onExportClick : function(button){
        var view = button.up('reporteflujosenalesview');
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

        location.href=url;
    }
});
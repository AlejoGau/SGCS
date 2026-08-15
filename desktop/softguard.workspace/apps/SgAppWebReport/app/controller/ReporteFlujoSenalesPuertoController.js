Ext.define('SgAppWebReport.controller.ReporteFlujoSenalesPuertoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'FlujoSenalesModel' ],
    views : [ 'ReporteFlujoSenalesPuertoView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reporteflujosenalespuertoview' : {
                afterrender : this.initView   
            },
            'reporteflujosenalespuertoview button[action=search]' : {
                click: this.onSearchClick
            },
            'reporteflujosenalespuertoview button[action=export]' : {
                click: this.onExportClick
            },
            'reporteflujosenalespuertoview button[action=btnprint]' : {
                click: this.onBtnprintClick
            }            
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
        view.baseurl =  '/handler/ReporteFlujoSenalesPuertoHTML';
        var target = view.down('#Iframe');
        
        var url = view.baseurl
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        /* Llamo a la URL */
                target.load({
            src: url
        }); 
    },
    /*printContent: function printHTMLContent(htmlContent) {
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.top = '-10000px';
        document.body.appendChild(iframe);
    

        let iframeDoc = iframe.contentWindow || iframe.contentDocument;
        if (iframeDoc.document) {
            iframeDoc = iframeDoc.document; 
        }
    
        iframeDoc.open();
        iframeDoc.write(htmlContent);
        iframeDoc.close();
    

        iframe.onload = () => {
            iframe.contentWindow.print();
            document.body.removeChild(iframe); 
        };
    },*/
    onBtnprintClick: function(button, event, options){
        var view = button.up('reporteflujosenalespuertoview');
        var panel = view.down('#receptorcombo').getValue();
        var url = view.baseurl;
        
        if(panel) {   
            url = Ext.String.urlAppend(url,"receptorcombo="+panel);
        }
        
        
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
  
        var target = view.down('#Iframe');
        var controller = this;
        url = target.src;
        var contenido;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { 
            printHTMLContent(body);    

        });
    },
    onSearchClick : function(button, event, options) {
        var view = button.up('reporteflujosenalespuertoview');

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
        var view = button.up('reporteflujosenalespuertoview');
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
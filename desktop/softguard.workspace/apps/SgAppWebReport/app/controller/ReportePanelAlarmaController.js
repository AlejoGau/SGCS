Ext.define('SgAppWebReport.controller.ReportePanelAlarmaController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasPanelesSearchModel', 'PanelSearchModel', 'SoftguardTablaPanelesModel' ],
    views : [ 'ReportePanelAlarmaView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportepanelalarmaview' : {
                afterrender : this.initView   
            },
            'reportepanelalarmaview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportepanelalarmaview button[action=export]' : {
                click: this.onExportClick
            },
            'reportepanelalarmaview button[action=btnprint]' : {
                click: this.onBtnprintClick
            }
        });
        
    }, // cierro init
    
    initView: function(view){

        /* Cargo el Stored correspondiente a panel, esto lo uso
         * para poder tener la informacion en los combo
         */
        var controller = this;
        
        var storePaneles = Ext.create('Ext.data.Store',{
            model: controller.getTablasPanelesSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            sorters: [{
                property: 'pan_cdescripcion',
                direction: 'ASC'
            }]
        });
        view.down('#panelgprscombo').bindStore(storePaneles);
        
        var storeEquipos = Ext.create('Ext.data.Store',{
            model: controller.getTablasPanelesSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                    property:'pan_nesgprs',
                    value : 1
            }],
            sorters: [{"property":"pan_cdescripcion","direction":"ASC"}],
        })
        
        view.down('#panelcelularcombo').bindStore(storeEquipos);
        storePaneles.load();
        storeEquipos.load();

        /* Modifico el baseUrl al nuevo creado */
        view.baseurl =  '/handler/ReportePanelAlarmaHTML';
        var target = view.down('#Iframe');
        
        var url = view.baseurl
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        /* Llamo a la URL */
        target.load({
            src: url
        }); 
    },
    onBtnprintClick: function(button){
        var view = button.up('reportepanelalarmaview');
        var target = view.down('#Iframe');
        
        url = target.src;

        var contenido;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { //Obtenemos el valor devuelto.
            printHTMLContent(body);
            /*
            var win = Ext.create('Ext.window.Window', {
                title: 'Mi ventana',
                html: "",
                modal: true,
                //renderTo: body.replace('<body>', '<body onload="window.print()>"'),
                
            });
            // Abrir en una nueva pestaña
            contenido = body.replace('BODY', 'body onload="window.print()"')
            //var newTab;// = window.open('', '_blank');
            //newTab.document.write(win.html);
            let myWindow = window.open();
            myWindow.document.write(contenido);
            myWindow.document.close();
            myWindow.focus();
            myWindow.print();
            */
            //win.printMe();

        });
    },

    onSearchClick : function(button, event, options) {
        var view = button.up('reportepanelalarmaview');

        /* Tomo los valores de los combo creado en la view */
        var panel = view.down('#paneltipocombo').getValue();
        var panelgprs = view.down('#panelgprscombo').getValue();
        var panelcelular = view.down('#panelcelularcombo').getValue();
        var target = view.down('#Iframe');

        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        
        if(panel) {   
            url = Ext.String.urlAppend(url,"paneltipocombo="+panel);
        }
        if(panelgprs) {   
            url = Ext.String.urlAppend(url,"panelgprscombo="+panelgprs);
        }
        if(panelcelular) {   
            url = Ext.String.urlAppend(url,"panelcelularcombo="+panelcelular);
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
        var view = button.up('reportepanelalarmaview');
        var url = view.urltoexport ? view.urltoexport : view.baseurl;     
        
        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }

        location.href=url;
    }
});
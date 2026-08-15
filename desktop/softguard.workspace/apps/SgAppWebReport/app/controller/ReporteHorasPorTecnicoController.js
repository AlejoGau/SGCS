Ext.define('SgAppWebReport.controller.ReporteHorasPorTecnicoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'InstaladoresByTokenSearchModel' ],
    views : [ 'ReporteHorasPorTecnicoView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportehorasportecnicoview' : {
                afterrender : this.initView   
            },
            'reportehorasportecnicoview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportehorasportecnicoview button[action=export]' : {
                click: this.onExportClick
            },
            'reportehorasportecnicoview button[action=btnprint]': {
                click: this.onBtnprintClick
            },             
        });
        
    }, // cierro init
    
    initView: function(view){
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getInstaladoresByTokenSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true
        })
        view.down('#tecnico').bindStore(view.store);
        view.store.load();
        
        /* Modifico el baseUrl al nuevo creado */
        view.baseurl =  '/handler/ReporteHorasPorTecnicoHTML';
        var target = view.down('#Iframe');
        
        var now = new Date();
        view.down('#fechaDesde').setValue(now)
        view.down('#fechaHasta').setValue(now)
      
        var url = view.baseurl
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        target.load({
            src: url
        }); 
      
    },

    onBtnprintClick: function (button) {
        var view = button.up('reportehorasportecnicoview');
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
    
    
     onSearchClick: function(button, event, options) { 
        var view = button.up('reportehorasportecnicoview');
  
        var fechaDesde = view.down('#fechaDesde').getValue();
        var fechahasta = view.down('#fechaHasta').getValue();
        var tecnico = view.down('#tecnico').getValue();
        var target = view.down('#Iframe');
        
        view.baseurl =  '/handler/ReporteHorasPorTecnicoHTML';
        var url = view.baseurl;
        
        if(fechaDesde) {
            url = Ext.String.urlAppend(url,"fechaDesde="+Ext.Date.format(fechaDesde,'Y-m-d'));
        }
        
        if(fechahasta) {   
            url = Ext.String.urlAppend(url,"fechaHasta="+Ext.Date.format(Ext.Date.add(fechahasta, Ext.Date.DAY, 1),'Y-m-d'));
        }
        
        if(tecnico) {   
            url = Ext.String.urlAppend(url,"tecnico="+tecnico);
        }

        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        view.baseurl = url
                 
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
         
                target.load({
            src: url
        }); 
    },
    
    onExportClick : function(button){
        var controller = this;
        var view = button.up('reportehorasportecnicoview');
        var url = view.baseurl;
        
        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }

        location.href=url;
    }
 
});
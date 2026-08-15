Ext.define('SgAppWebReport.controller.ReporteOrganizacionController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteOrganizacionView' ],

    init : function(config) {

            // genero los eventos
            this.control({
            'reporteorganizacionview' : {
                afterrender : this.initView
            },
            'reporteorganizacionview button[action=search]' : {
                click: this.onSearchClick
            },
            'reporteorganizacionview button[action=all]' : {
                click: this.onAllClick
            },            
            'reporteorganizacionview button[action=export]' : {
                click: this.onExportClick
            },         
            'reporteorganizacionview button[action=btnprint]' : {
                click: this.onBtnprintClick
            },
    
    })},

    initView: function(view){
        var controller = this
        view.baseurl =  '/handler/ReporteOrganizacionHtml';
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token='+controller.application.getToken());
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());

        var target = view.down('#Iframe');

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        this.onSearchClick(view);
           
    },
    onBtnprintClick: function(button){
        var view = button.up('reporteorganizacionview');
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
            
            //win.printMe();
            */

        });
    },

//AJUSTAR CAMBIOS
    onExportClick : function(button){
        var view = button.up('reporteorganizacionview');

        if(view.urltoexport) {
            var url = view.urltoexport;
        } else {
            var url = view.baseurl;
        }

        var nombre = view.down('#nombre').getValue();
        var provest = view.down('#provest').getValue();identificador
        var identificador = view.down('#identificador').getValue();
        var estadogrupo = view.down('#estadogrupo').getValue();
        var IdentificadorFisc = view.down('#IdentificadorFisc').getValue();
        var tipo = view.down('#tipo').getValue();
        var nombreLegal = view.down('#nombreLegal').getValue();

        
        var identificadorchb = view.down('#identificadorchb').getValue();
        var fechaCreacionchb = view.down('#fechaCreacionchb').getValue();
        var identificadorFiscalchb = view.down('#identificadorFiscalchb').getValue();
        var grupoEstadochb = view.down('#grupoEstadochb').getValue();
        var nombreLegalchb = view.down('#nombreLegalchb').getValue();
        var notaschb = view.down('#notaschb').getValue();
        var movilchb = view.down('#movilchb').getValue();
        var cuentasAsociadaschb = view.down('#cuentasAsociadaschb').getValue();
        var codPostalchb = view.down('#codPostalchb').getValue();
        
        if(nombre) {
            url = Ext.String.urlAppend(url,"nombre="+nombre);
        }

        if(provest) {
            url = Ext.String.urlAppend(url,"provest="+provest);
        }

        if(identificador) {
            url = Ext.String.urlAppend(url,"identificador="+identificador);
        }
        
        if(estadogrupo) {
            url = Ext.String.urlAppend(url,"estadogrupo="+estadogrupo);
        }

        if(IdentificadorFisc) {
            url = Ext.String.urlAppend(url,"IdentificadorFisc="+IdentificadorFisc);
        }

        if(tipo) {
            url = Ext.String.urlAppend(url,"tipo="+tipo);
        }

        if(nombreLegal) {
            url = Ext.String.urlAppend(url,"nombreLegal="+nombreLegal);
        }

        if(identificadorchb) {
            url = Ext.String.urlAppend(url,"identificadorchb="+identificadorchb);
        }

        if(fechaCreacionchb) {
            url = Ext.String.urlAppend(url,"fechaCreacionchb="+fechaCreacionchb);
        }

        if(identificadorFiscalchb) {
            url = Ext.String.urlAppend(url,"identificadorFiscalchb="+identificadorFiscalchb);
        }

        if(grupoEstadochb) {
            url = Ext.String.urlAppend(url,"grupoEstadochb="+grupoEstadochb);
        }

        if(nombreLegalchb) {
            url = Ext.String.urlAppend(url,"nombreLegalchb="+nombreLegalchb);
        }

        if(notaschb) {
            url = Ext.String.urlAppend(url,"notaschb="+notaschb);
        }

        if(movilchb) {
            url = Ext.String.urlAppend(url,"movilchb="+movilchb);
        }

        if(cuentasAsociadaschb) {
            url = Ext.String.urlAppend(url,"cuentasAsociadaschb="+cuentasAsociadaschb);
        }

        if(codPostalchb) {
            url = Ext.String.urlAppend(url,"codPostalchb="+codPostalchb);
        }
        
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        
        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }

        location.href=url;
    },

    onSearchClick: function(button){
        //FUNCIONALIDAD BOTON BUSCAR

        var view = button.up('reporteorganizacionview')?button.up('reporteorganizacionview'):button; 
        
        var filters = [];
        var url = view.baseurl;

        var nombre = view.down('#nombre').getValue();
        var provest = view.down('#provest').getValue();identificador
        var identificador = view.down('#identificador').getValue();
        var estadogrupo = view.down('#estadogrupo').getValue();
        var IdentificadorFisc = view.down('#IdentificadorFisc').getValue();
        var tipo = view.down('#tipo').getValue();
        var nombreLegal = view.down('#nombreLegal').getValue();

        
        var identificadorchb = view.down('#identificadorchb').getValue();
        var fechaCreacionchb = view.down('#fechaCreacionchb').getValue();
        var identificadorFiscalchb = view.down('#identificadorFiscalchb').getValue();
        var grupoEstadochb = view.down('#grupoEstadochb').getValue();
        var nombreLegalchb = view.down('#nombreLegalchb').getValue();
        var notaschb = view.down('#notaschb').getValue();
        var movilchb = view.down('#movilchb').getValue();
        var cuentasAsociadaschb = view.down('#cuentasAsociadaschb').getValue();
        var codPostalchb = view.down('#codPostalchb').getValue();
        console.log(estadogrupo)
        if(nombre) {
            url = Ext.String.urlAppend(url,"nombre="+nombre);
        }

        if(provest) {
            url = Ext.String.urlAppend(url,"provest="+provest);
        }

        if(identificador) {
            url = Ext.String.urlAppend(url,"identificador="+identificador);
        }
        
        if(estadogrupo || estadogrupo == 0) {
            url = Ext.String.urlAppend(url,"estadogrupo="+estadogrupo);
        }

        if(IdentificadorFisc) {
            url = Ext.String.urlAppend(url,"IdentificadorFisc="+IdentificadorFisc);
        }

        if(tipo || tipo == 0) {
            url = Ext.String.urlAppend(url,"tipo="+tipo);
        }

        if(nombreLegal) {
            url = Ext.String.urlAppend(url,"nombreLegal="+nombreLegal);
        }

        if(identificadorchb) {
            url = Ext.String.urlAppend(url,"identificadorchb="+identificadorchb);
        }

        if(fechaCreacionchb) {
            url = Ext.String.urlAppend(url,"fechaCreacionchb="+fechaCreacionchb);
        }

        if(identificadorFiscalchb) {
            url = Ext.String.urlAppend(url,"identificadorFiscalchb="+identificadorFiscalchb);
        }

        if(grupoEstadochb) {
            url = Ext.String.urlAppend(url,"grupoEstadochb="+grupoEstadochb);
        }

        if(nombreLegalchb) {
            url = Ext.String.urlAppend(url,"nombreLegalchb="+nombreLegalchb);
        }

        if(notaschb) {
            url = Ext.String.urlAppend(url,"notaschb="+notaschb);
        }

        if(movilchb) {
            url = Ext.String.urlAppend(url,"movilchb="+movilchb);
        }

        if(cuentasAsociadaschb) {
            url = Ext.String.urlAppend(url,"cuentasAsociadaschb="+cuentasAsociadaschb);
        }

        if(codPostalchb) {
            url = Ext.String.urlAppend(url,"codPostalchb="+codPostalchb);
        }
        
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        
        var target = view.down('#Iframe');

        if(url) {
            target.load({
                src: url
            }); 
        } else {
            target.load({
                src: view.baseurl
            }); 
        }
        
        console.log(url)
    },

    onAllClick: function(button){
        var view = button.up('reporteorganizacionview')?button.up('reporteorganizacionview'):button; 
        
        view.down('#nombre').setValue('');
        view.down('#direccion').setValue('');
        view.down('#provest').setValue('');
        view.down('#localidad').setValue('');
        
        
        this.onSearchClick(view);
    }
});
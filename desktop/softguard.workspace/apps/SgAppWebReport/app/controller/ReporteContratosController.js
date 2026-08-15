
Ext.define('SgAppWebReport.controller.ReporteContratosController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteContratosView' ],

    init : function(config) {

            // genero los eventos
             
            this.control({
            'reportecontratosview' : {
                afterrender : this.initView
            },
            'reportecontratosview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportecontratosview button[action=all]' : {
                click: this.onAllClick
            },
            'reportecontratosview button[action=btnprint]' : {
                click: this.onBtnprintClick
            }
    
    })},

    initView: function(view){
        var controller = this
        view.baseurl =  '/handler/ReporteContratosHTML';
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token='+controller.application.getToken());
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());

        var target = view.down('#Iframe');

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        this.onSearchClick(view);
           
    },

    
    onSearchClick: function(button){
        //FUNCIONALIDAD BOTON BUSCAR
        
        var view = button.up('reportecontratosview')?button.up('reportecontratosview'):button;
        var url = view.baseurl;
 
        var nombre = view.down('#nombre').getValue();
        var dni = view.down('#dni').getValue();
        var telefono = view.down('#telefono').getValue();
        var activo = view.down('#activo').getValue();
        var inactivo = view.down('#inactivo').getValue();


        var estado = ''
        if(activo){
            estado = 'activo'
        }else if(inactivo){
            estado= 'inactivo'
        }

        if(nombre){
            url = Ext.String.urlAppend(url,"nombre="+nombre);
        }

        if(dni){
            url = Ext.String.urlAppend(url,"dni="+dni);
        }

        if(telefono){
            url = Ext.String.urlAppend(url,"telefono="+telefono);
        }

        if(estado){
            url = Ext.String.urlAppend(url,"estado="+estado);
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
    onBtnprintClick: function(button){
        var view = button.up('reportecontratosview');
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
            contenido = body.replace('body', 'body onload="window.print()"')
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

    
    onAllClick: function(button){
        var view = button.up('reportecontratosview')?button.up('reportecontratosview'):button; 
        
        view.down('#nombre').setValue('');
        view.down('#dni').setValue('');
        view.down('#telefono').setValue('');
        view.down('#activo').reset();
        view.down('#inactivo').reset();

        
        this.onSearchClick(view);
    }
});

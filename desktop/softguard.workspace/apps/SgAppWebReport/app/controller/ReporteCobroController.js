
Ext.define('SgAppWebReport.controller.ReporteCobroController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteCobroView' ],

    init : function(config) {

            // genero los eventos
             
            this.control({
            'reportecobroview' : {
                afterrender : this.initView
            },
            'reportecobroview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportecobroview button[action=all]' : {
                click: this.onAllClick
            },
            'reportecobroview button[action=btnprint]' : {
                click: this.onBtnprintClick
            }
    
    })},

    initView: function(view){
        var controller = this
        view.baseurl =  '/handler/ReporteCobroHTML';
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token='+controller.application.getToken());
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());

        var target = view.down('#Iframe');

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        this.onSearchClick(view);
           
    },
    onBtnprintClick: function(button){
        var view = button.up('reportecobroview');
        var target = view.down('#Iframe');
        
        url = target.src;

        var contenido;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { //Obtenemos el valor devuelto.
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

        });
    },

    
    onSearchClick: function(button){
        //FUNCIONALIDAD BOTON BUSCAR
        
        var view = button.up('reportecobroview')?button.up('reportecobroview'):button;
        var url = view.baseurl;
 
        var nombre = view.down('#nombre').getValue();
        var dni = view.down('#dni').getValue();
        var telefono = view.down('#telefono').getValue();
        var fecha = view.down('#fecha').getValue();

        var pago = view.down('#pago').getValue();
        var impago = view.down('#Impago').getValue();

        var estado = '';
        if(pago){
            estado = 'pago'
        }else if (impago){
            estado = 'impago'
        }

        var anual = view.down('#anual').getValue();
        var mensual = view.down('#mensual').getValue();

        var metodo = '';
        if(anual){
            metodo = 'anual'
        }else if (mensual){
            metodo = 'mensual'
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

        if(fecha){
            fecha = Ext.Date.format(fecha, "Y-m-d")
            url = Ext.String.urlAppend(url,"fecha="+fecha);
        }

        if(estado){
            url = Ext.String.urlAppend(url,"estado="+estado);
        }

        if(metodo){
            url = Ext.String.urlAppend(url,"metodo="+metodo);
        }
        
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        
        var target = view.down('#Iframe');
        
        if(url) {
            target.load({
                src: url
            }); 
        } else {
            target.load({
                src: url
            }); 
        }
        
        console.log(url)
    },
    
    onAllClick: function(button){
        var view = button.up('reportecobroview')?button.up('reportecobroview'):button; 
        
        view.down('#nombre').setValue('');
        view.down('#dni').setValue('');
        view.down('#telefono').setValue('');
        view.down('#fecha').setValue('');
        view.down('#pago').reset();
        view.down('#Impago').reset();
        view.down('#anual').reset();
        view.down('#mensual').reset();
        
        this.onSearchClick(view);
    }
});

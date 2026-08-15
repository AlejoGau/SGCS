Ext.define('SgAppWebReport.controller.ReporteCuentaSinControlTestConfiguradoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteCuentaSinControlTestConfiguradoView' ],

    init : function(config) {

            // genero los eventos
            this.control({
            'reportecuentasincontrolconfiguracionview' : {
                afterrender : this.initView
            },
            'reportecuentasincontrolconfiguracionview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportecuentasincontrolconfiguracionview button[action=all]' : {
                click: this.onAllClick
            },            
            'reportecuentasincontrolconfiguracionview button[action=export]' : {
                click: this.onExportClick
            },
            'reportecuentasincontrolconfiguracionview button[action=btnprint]' : {
                click: this.onBtnprintClick
            }
    
    })},

    initView: function(view){
        var controller = this
        view.baseurl =  '/handler/ReporteCuentaSinControlConfiguracionHTML';
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token='+controller.application.getToken());
        view.baseurl = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());

        var target = view.down('#Iframe');

        target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        target.load({
            src: view.baseurl
        }); 
    },

onExportClick : function(button){
    var view = button.up('reportecuentasincontrolconfiguracionview');
    
    if(view.urltoexport) {
        var url = view.urltoexport;
    } else {
        var url = view.baseurl;
    }

    // 👇 AGREGAR DEALER (igual que hacés en search)
    var dealer = view.down('#dealer').getValue();
    if(dealer){
        url = Ext.String.urlAppend(url,"dealer="+dealer);
    }
    
    /* Agrego flag de Export */
    var exportToExcel = 'yes';
    if(exportToExcel) {
        url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
    }

    location.href = url;
},
    onBtnprintClick: function(button){
        var view = button.up('reportecuentasincontrolconfiguracionview');
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
    onSearchClick: function(button){
        //FUNCIONALIDAD BOTON BUSCAR

        var view = button.up('reportecuentasincontrolconfiguracionview')?button.up('reportecuentasincontrolconfiguracionview'):button; 
        
        var filters = [];
        var url = view.baseurl;

        var dealer = view.down('#dealer').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        var nombre = view.down('#nombre').getValue();

        if(dealer){
            url = Ext.String.urlAppend(url,"dealer="+dealer);
        }

        if(cuentadesde){
            url = Ext.String.urlAppend(url,"cuentadesde="+cuentadesde);
        }

        if(cuentahasta){
            url = Ext.String.urlAppend(url,"cuentahasta="+cuentahasta);
        }

        if(nombre){
            url = Ext.String.urlAppend(url,"nombre="+nombre);
        }
        

        var checkbox = '';
        var telefonico = view.down('#telefonico').getValue();
        var telefonicoGPRS = view.down('#telefonicoGPRS').getValue();
        var GPRS = view.down('#GPRS').getValue();
        var test = view.down('#test').getValue();
        var seguidor = view.down('#seguidor').getValue();

        if(telefonico){
            checkbox = 1
            url = Ext.String.urlAppend(url,"checkbox="+checkbox);
        }else if (GPRS){
            checkbox = 2
            url = Ext.String.urlAppend(url,"checkbox="+checkbox);
        }else if (seguidor){
            checkbox = 3
            url = Ext.String.urlAppend(url,"checkbox="+checkbox);
        }else if (telefonicoGPRS){
            checkbox = 4
            url = Ext.String.urlAppend(url,"checkbox="+checkbox);
        }else if (test){
            checkbox = 5
            url = Ext.String.urlAppend(url,"checkbox="+checkbox);
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
        var view = button.up('reportecuentasincontrolconfiguracionview')?button.up('reportecuentasincontrolconfiguracionview'):button; 
        
        view.down('#dealer').setValue('');
        view.down('#cuentadesde').setValue('');
        view.down('#cuentahasta').setValue('');
        view.down('#nombre').setValue('');
        view.down('#telefonico').setValue(true);
        view.down('#telefonicoGPRS').reset();
        view.down('#GPRS').reset();
        view.down('#test').reset();
        view.down('#seguidor').reset();
        
        this.onSearchClick(view);
    }
});
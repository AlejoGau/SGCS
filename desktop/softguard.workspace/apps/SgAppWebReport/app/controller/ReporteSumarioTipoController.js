Ext.define('SgAppWebReport.controller.ReporteSumarioTipoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasLineasSearchModel', 'TablasTiposSearchModel' ],
    views : [ 'ReporteSumarioTipoView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportesumariotipoview' : {
                afterrender : this.initView
            },
            'reportesumariotipoview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportesumariotipoview button[action=todos]' : {
                click: this.onTodosClick
            },
            'reportesumariotipoview button[action=btnprint]' : {
                click: this.onBtnprintClick
            } 
		});
        
	}, // cierro init
    
    initView: function(view){
        
        
        view.baseurl =  '/handler/ReporteSumarioTipoHTML';
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        var url = Ext.String.urlAppend(view.baseurl, '_dc='+new Date().getTime());
        
        
        
        
        
        var cuentaStore = Ext.create('Ext.data.Store',{
            model: this.getTablasTiposSearchModelModel(),
            autoload: false,
            pageSize: 10000
        });
        var comboCuenta = view.down('#dealer');
        comboCuenta.bindStore(cuentaStore);  
        cuentaStore.load({callback:function () {
            
            
        
            view.down('#dealer').setValue(view.down('#dealer').getStore().getAt(0).get('lin_ccodigo'));
            var dealer = view.down('#dealer').getValue();
            if(dealer) {
                url = Ext.String.urlAppend(url,"Tipo="+dealer);
            }
           
                    target.load({
            src: url
        }); 
        
        
        }});
        
        
       
        
        
        
        
        
        
        
        
        
    },
    
    onTodosClick: function(button){ 
         
        var view = button.up('reportesumariotipoview'); 
        
        var filters = [];
        
        var target = view.down('#Iframe');
      
        target.load({
            src: view.baseurl+'?cache='+new Date().getTime()
        });    
        
    },
    onSearchClick: function (button) {
        var view = button.up('reportesumariotipoview'); 
        
        var filters = [];
        
        var dealer = view.down('#dealer').getValue();
        
        var url = view.baseurl;
        if(dealer) {
            url = Ext.String.urlAppend(url,"Tipo="+dealer);
        }
        
      
        
        var target = view.down('#Iframe');

        url = Ext.String.urlAppend(url,"_dc="+new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
                target.load({
            src: url
        });       
    },
    onBtnprintClick: function(button){
        var view = button.up('reportesumariotipoview');
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
    }
    
    
});
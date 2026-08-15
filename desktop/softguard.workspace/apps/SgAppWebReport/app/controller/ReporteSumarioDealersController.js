Ext.define('SgAppWebReport.controller.ReporteSumarioDealersController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'CuentaSearchModel', 'TablasLineasSearchModel', 'TablasTiposSearchModel' ],
    views : [ 'ReporteSumarioDealersView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportesumariodealersview' : {
            	afterrender : this.initView
            },
            'reportesumariodealersview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportesumariodealersview button[action=todos]' : {
                click: this.onTodosClick
            },
            'reportesumariodealersview button[action=btnprint]' : {
                click: this.onBtnprintClick
            }
		});
        
	}, // cierro init
    
    initView: function(view){
        
        var controller = this;

        var cuentaStore = Ext.create('Ext.data.Store',{
            model: this.getTablasLineasSearchModelModel(),
            autoload: false,
            pageSize: 10000
        });

        var comboCuenta = view.down('#dealer');       
        cuentaStore.load();
        comboCuenta.bindStore(cuentaStore);           

    
        view.baseurl =  '/handler/ReporteSumarioDealersHTML';
        if(view.filters) {
            view.baseurl = Ext.String.urlAppend(view.baseurl, 'Filter='+Ext.encode(view.filters));            
        }
        
        controller.setIframeUrl(view);
    },
    
    onTodosClick: function(button){ 
        var view = button.up('reportesumariodealersview'); 
        var filters = [];
        var target = view.down('#Iframe');
 
        target.load({
            src: view.baseurl+'?cache='+new Date().getTime()
        });     
    },

    onSearchClick: function (button) {
        var view = button.up('reportesumariodealersview'); 
        var controller = this;
        controller.setIframeUrl(view);
    },
    onBtnprintClick: function(button){
        var view = button.up('reportesumariodealersview');
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
    setIframeUrl: function(view){
        var url = this.getUrl(view);
        var target = view.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
                target.load({
            src: url
        }); 
    },

    getUrl: function(view){
        var filters = [];
        var dealer = view.down('#dealer').getValue();
        var sorter = view.down('#sorter').getValue();
        var url = view.baseurl;
        if(dealer) {
            url = Ext.String.urlAppend(url,"Dealer="+dealer);
        }
        if(sorter) {
            url = Ext.String.urlAppend(url,"sorter="+sorter);
        }


        url = Ext.String.urlAppend(url,"_dc="+new Date().getTime());
        return url;
    }

});
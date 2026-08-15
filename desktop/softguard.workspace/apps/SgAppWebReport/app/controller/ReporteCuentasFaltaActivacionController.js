Ext.define('SgAppWebReport.controller.ReporteCuentasFaltaActivacionController', {
    extend : 'Ext.app.Controller',
    stores : [ 'SoftguardEstadoEstadoStore' ],
    models : [  ],
    views : [ 'ReporteCuentasFaltaActivacionView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportecuentafaltaactivacionview' : {
                afterrender : this.initView
                
            },
            'reportecuentafaltaactivacionview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportecuentafaltaactivacionview button[action=todos]' : {
                click: this.onTodosClick
            },
            'reportecuentafaltaactivacionview button[action=btnprint]' : {
                click: this.onBtnprintClick
            }
    	});
        
	}, // cierro init
    
    initView: function(view){
        
        view.baseurl =  '/handler/ReporteCuentasFalloTesteoHTML';
        var target = view.down('#Iframe');
        var estadoStore = this.getSoftguardEstadoEstadoStoreStore();
        estadoStore.removeAt(2);
        var comboEstado = view.down('#estadoCuenta');
        comboEstado.bindStore(estadoStore);        

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        var filters = [];
        filters.push({ 
            property: 'sta_dfechaOPNdesde:LT',
            value: 15
        });
        
        var sorters = [{
            property : 'sta_dfechaOPNdesde',
            direction: 'DESC'
        }];
        var controller = this
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token='+controller.application.getToken());
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'sorters='+Ext.encode(sorters));
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'campos=sta_dfechaOPNdesde');
        
        // BC - Se debe filtrar por estados de panel en DESACTIVADO / ABIERTO
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'estadoPanel=1');
        
        /* En caso que se quiera la columna Situacion
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'campos=sta_dfechaOPNdesde,Situacion');
        */
        
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'icon=lock_open.png');
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'title='+Ext.encode('Cuentas con falta de activacion'));
        
        var url = Ext.String.urlAppend(view.baseurl, 'filter='+Ext.encode(filters));
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        
                target.load({
            src: url
        }); 
    },
    
     onSearchClick: function(button, event, options) {
        var view = button.up('reportecuentafaltaactivacionview');
        var dias = view.down('#cantidaddias').getValue();
      
        // BC : 356866204 - Agregado para obtener el value del combo de Estado de Cuentas
        // 29/08 : Se ajusta para cantidades, debido a que como es fecha de N dias para "atras", puede haber mucha informacion
        var estadoCuenta = view.down('#estadoCuenta').getValue();
        var cantidadregistros = view.down('#comboregistros').getValue();
        var target = view.down('#Iframe');
        var filters = [];
        
        if(dias && dias >= 0){
             filters.push({ 
                property: 'sta_dfechaOPNdesde:LT',
                value: dias
            });
        }
        // 29/08 : Se ajusta el buscador por estado de la Cuenta.
        if (estadoCuenta && estadoCuenta >= 0) {
            filters.push({
                property : 'est_nestado',
                value: estadoCuenta
            });
        };

        var url = Ext.String.urlAppend(view.baseurl, 'filter='+Ext.encode(filters));
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());

        if(cantidadregistros) {
            url = Ext.String.urlAppend(url,"limit="+cantidadregistros);
        }
        
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        target.load({
            src: url
        }); 
    },
    onBtnprintClick: function(button){
        var view = button.up('reportecuentafaltaactivacionview');
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
    
    onTodosClick: function(button){ 
        var view = button.up('ordenservtecview');
        view.filters = [];
        var target = view.down('#Iframe');

        target.load({
            src: view.baseurl+'?Filter='+Ext.encode(view.filters)
        }); 
        view.down('#fechadesde').setValue('');
        view.down('#fechahasta').setValue('');
        view.down('#finalizado-btn').toggle(false);
        view.down('#pendiente-btn').toggle(false);
        view.down('#cancelado-btn').toggle(false);    
    }
});
Ext.define('SgAppWebReport.controller.ReporteCotizacionesVencidasCrmController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteCotizacionesVencidasCrmView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportecotizacionesvencidascrmview' : {
                afterrender : this.initView   
            },
            'reportecotizacionesvencidascrmview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportecotizacionesvencidascrmview button[action=getall]' : {
                click: this.onGetAllClick
            },
            'reportecotizacionesvencidascrmview button[action=export]' : {
                click: this.onExportClick
            },
            'reportecotizacionesvencidascrmview button[action=btnprint]' : {
                click: this.onBtnprintClick
            }
        });
        
    }, // cierro init
    
    limpiarfiltros : function(view) {
        /* limpio los filtros y sorters aplicados */
        view.filters = [];
        view.sorters = [];
        return view;
    },
    
    limpiarcampos : function(view) {
        /* Limpio los campos */
        var date = view.down('#date').setValue('');
        return;
    },
    
    checkvalue : function(view) {
        /* Tomo los valores de los combo creado en la view */
        var date = view.down('#date').getValue();
        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        
        if (date) {
            /* Sirve para dibujar la fecha en el header */
            url = Ext.String.urlAppend(url, 'fechaprobable='+Ext.Date.format(date,'Y-m-d'));
            
            view.filters.push({
                property: 'o.ForecastDate',
                value: Ext.Date.format(date, 'Y-m-d H:i:s')
            })
        }
        
        if (view.filters.length > 0){
           url = Ext.String.urlAppend(url, 'filter='+Ext.encode(view.filters));
        }
        if (view.sorters.length > 0){
           url = Ext.String.urlAppend(url, 'sort='+Ext.encode(view.sorters));
        }
          
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        return url;
    },
    
    initView: function(view) {
        var controller = this;
        
        /* limpio los filtros y sorters aplicados */
        controller.limpiarfiltros(view);
        
        /* Modifico el baseUrl al nuevo creado */
        view.baseurl =  '/handler/ReporteCotizacionesVencidasCrmHTML';
        var target = view.down('#Iframe');
        
        var url = view.baseurl;
        
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime()+'&' + '&output=embed');
        /* Llamo a la URL */
        controller.onSearchClick(view.down('#buscar'));
    },
    onBtnprintClick: function(button){
        var view = button.up('reportecotizacionesvencidascrmview');
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

    onSearchClick : function(button, event, options) {
        var view = button.up('reportecotizacionesvencidascrmview');
        var controller = this;
        
        /* limpio los filtros y sorters aplicados */
        controller.limpiarfiltros(view);
        
        /* Tomo los valores de los combo creado en la view */
        var url = controller.checkvalue(view);

        var target = view.down('#Iframe');
    
        /* Llamo a la URL */
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        target.load({
            src: url
        }); 
        
    },

    onExportClick : function(button) {
        var view = button.up('reportecotizacionesvencidascrmview');
        var controller = this;
        
        /* limpio los filtros y sorters aplicados */
        controller.limpiarfiltros(view);
        
        /* Tomo los valores de los combo creado en la view */
        var url = controller.checkvalue(view);
        
        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }

        location.href=url;
    },

    onGetAllClick : function(button, event, options) {
        var view = button.up('reportecotizacionesvencidascrmview');
        var controller = this;
        
        /* limpio los filtros y sorters aplicados */
        controller.limpiarfiltros(view);
        controller.limpiarfiltros(view);
        controller.limpiarcampos(view);
        
        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        url = Ext.String.urlAppend(url, 'filter='+Ext.encode(view.filters));
        
        var target = view.down('#Iframe');
        /* Llamo a la URL */
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        target.load({
            src: url
        }); 

    }
});
Ext.define('SgAppWebReport.controller.ReporteHorasContratadasPorObjetivoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteHorasContratadasPorObjetivoView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportehscontratadasobjectview' : {
                afterrender : this.initView,
                cuentachanged : this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'reportehscontratadasobjectview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportehscontratadasobjectview button[action=export]' : {
                click: this.onExportClick
            },
            'reportehscontratadasobjectview button[action=exportSplit]' : {
                click: this.onExportClick
            },
            'reportehscontratadasobjectview button[action=seleccionarCuenta]' : {
                click: this.onSeleccionarCuenta
            },
            'reportehscontratadasobjectview button[action=btnprint]' : {
                click: this.onBtnprintClick
            },
        });
        
    }, // cierro init
    
    initView: function(view) {

        /* Cargo el Stored correspondiente a los usuarios de la cuenta, esto lo uso
         * para poder tener la informacion en el combo de usuario
         */
        var controller = this;
        
        console.log(controller.application.UserData);
        console.log(view);
        
        /* Consulta de RANGOS del usuario logueado
        var userLogueadoRangosStore = Ext.create('Ext.data.Store',{
            model: controller.getUsersDesktopWebModulosModelSearchModel(),
            pageSize: 500,
            remoteFilter: true,
            filters: [{
                property: 'dwm_idModules',
                value: 0
            },{
                property: 'dwm_idWeb',
                value: controller.application.UserData.udw_idKey
            }]
        }).load({callback:function (recordsLogueado) {
            
            if(recordsLogueado.length>0) {
                console.log(recordsLogueado[0]);
            }
        }});
        */
        
        /* Modifico el baseUrl al nuevo creado */
        view.down('#fechaDesde').setValue(new Date());
        view.down('#fechaHasta').setValue(new Date());  
        var fechadesde =  view.down('#fechaDesde').getValue();
        var fechahasta =  view.down('#fechaHasta').getValue();

      

        view.baseurl =  '/handler/ReporteHorasContratadasPorObjetivoHTML';
        var target = view.down('#Iframe');
        
        var url = view.baseurl;

        if(fechadesde) {   
            url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format(fechadesde,'Y-m-d'));
        } 
        if(fechahasta) {   
            url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(fechahasta,'Y-m-d'));
        }  

        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        
        /* Llamo a la URL */
        target.load({
            src: url
        }); 
    },
    onBtnprintClick: function(button){
        var view = button.up('reportehscontratadasobjectview');

        /* Tomo los valores de los combo creado en la view */
        var objetivo = view.down('#idcuenta').getValue();
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = view.down('#fechaHasta').getValue();
        var target = view.down('#Iframe');

        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        
        /* Agrego los valores de los combo a las URL
         * Genero los parametros del Store Procedure
         */
        if(objetivo) {   
            url = Ext.String.urlAppend(url,"cuenta="+objetivo);
        }
        if(fechadesde) {   
            url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format(fechadesde,'Y-m-d'));
        } 
        if(fechahasta) {   
            url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(fechahasta,'Y-m-d'));
        }
        
        view.urltoexport = url;
        
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());

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
        var view = button.up('reportehscontratadasobjectview');

        /* Tomo los valores de los combo creado en la view */
        var objetivo = view.down('#idcuenta').getValue();
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = view.down('#fechaHasta').getValue();
        var target = view.down('#Iframe');

        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        
        /* Agrego los valores de los combo a las URL
         * Genero los parametros del Store Procedure
         */
        if(objetivo) {   
            url = Ext.String.urlAppend(url,"cuenta="+objetivo);
        }
        if(fechadesde) {   
            url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format(fechadesde,'Y-m-d'));
        } 
        if(fechahasta) {   
            url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(fechahasta,'Y-m-d'));
        }
        
        view.urltoexport = url;
        
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        /* Llamo a la URL */
        target.load({
            src: url
        }); 

    },
    
    
    onSeleccionarCuenta: function (button, events, eOps) {
        var view = button.up('reportehscontratadasobjectview');
        //view.win = win;
        
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Seleccione Cuentas',
			closeAction : 'destroy',
            itemId: 'cuentaWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view : view,
			items : [
                {
                    xtype: 'cuentahelperview',
                    filterTipo: 'nofilter',
                    caller: view,
                    filterTipo: 5,
                    tip_ncondicion: "3"
                }
            ]
		});
		win.show();
        
    },
    
    onCuentaSelected:  function (selection, view, recordPreSelected) {
        var controller = this;
        
        Ext.Array.each(selection, function(record){
            var cueiid = record.get('cue_iid');
            var nombre = record.get('cue_clinea')+'-'+record.get('cue_ncuenta')+' '+record.get('cue_cnombre');
            view.down('#idcuenta').setValue(cueiid)
            view.down('#nombrecuenta').setValue(nombre)
            view.down('#sacarcuenta').show();          

        });
    },
    
    onExportClick : function(button){
        var view = button.up('reportehscontratadasobjectview');
        var objetivo = view.down('#idcuenta').getValue();
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = view.down('#fechaHasta').getValue();        
        var view = button.up('reportehscontratadasobjectview');
        if(view.urltoexport) {
            var url = view.urltoexport;
        } else {
            var url = view.baseurl;
        }
        /*if(objetivo) {   
            url = Ext.String.urlAppend(url,"cuenta="+objetivo);
        }
        if(fechadesde) {   
            url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format(fechadesde,'Y-m-d'));
        } 
        if(fechahasta) {   
            url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(fechahasta,'Y-m-d'));
        }  */      
        
        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }

        if ( button.action == "exportSplit") {
            url = url.replace("ReporteHorasContratadasPorObjetivoHTML", "ReporteHorasContratadasPorObjetivoNuevoHTML");
        }

        location.href=url;
    }
});
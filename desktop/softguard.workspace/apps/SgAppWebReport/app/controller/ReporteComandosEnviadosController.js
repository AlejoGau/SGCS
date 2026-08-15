Ext.define('SgAppWebReport.controller.ReporteComandosEnviadosController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteComandosEnviadosView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportecomandosenviadosview' : {
                afterrender : this.initView,
                cuentachanged : this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'reportecomandosenviadosview button[action=mail]' : {
                click: this.onMailClick
            },            
            'reportecomandosenviadosview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportecomandosenviadosview button[action=removeall]' : {
                click: this.onTodosClick
            },            
            'reportecomandosenviadosview button[action=export]' : {
                click: this.onExportClick
            },
            'reportecomandosenviadosview button[action=seleccionarDealerDesde]' : {
                click: this.onSeleccionarDealerDesde
            },
            'reportecomandosenviadosview button[action=btnprint]' : {
                click: this.onBtnprintClick
            }
            
            
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
        view.baseurl =  '/handler/ReporteComandosEnviadosHTML';
        var target = view.down('#Iframe');
        
        var url = view.baseurl
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        /* Llamo a la URL */
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        target.load({
            src: url
        }); 
    },

    onTodosClick:function(button) {
        var view = button.up('reportecomandosenviadosview');
        view.down('#fechaDesde').setValue('');
        view.down('#fechaHasta').setValue('');
        view.down('#flagDealerSelector').setValue('');
        view.down('#dealerDesde').setValue('');
        view.down('#cuentaDesde').setValue('');
        view.down('#cuentaHasta').setValue('');
        view.down('#estado').setValue('');
        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        var target = view.down('#Iframe');

        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        view.urltoexport = url;
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"                    +window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        /* Llamo a la URL */
        target.load({
            src: url
        });         
    },

    onMailClick: function (button) {
        var view = button.up('reportecomandosenviadosview');
        var target = view.down('#Iframe');
        url = target.src;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { //Obtenemos el valor devuelto.
            var mailbody = body;    
            var mail = Ext.widget('mailformview',{
                mailbody: mailbody,
                from: getParametro('MAILSENDERNAME') + " <" +  getParametro('MAILSENDER') +">",
                autoScroll: true,
                subject: getLocale('Reporte de eventos')
            });          
            var win = Ext.widget('window',{
                title: 'Envío de correo',
                layout: 'fit',
                items: mail,
                width: 600,
                height: 600
            }).show();
        });
        
    },
    onBtnprintClick: function(button){
        var view = button.up('reportecomandosenviadosview');
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
            */
            //win.printMe();

        });
    },

    onSearchClick : function(button, event, options) {
        var view = button.up('reportecomandosenviadosview');

        /* Tomo los valores de los combo creado en la view */
        //var objetivo = view.down('#idcuenta').getValue();
         
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = view.down('#fechaHasta').getValue();
        var dealerdesde = view.down('#dealerDesde').getValue();
        //var dealerhasta = view.down('#dealerHasta').getValue();
        var cuentadesde = view.down('#cuentaDesde').getValue();
        var cuentahasta = view.down('#cuentaHasta').getValue();
        var cantidadregistros = view.down('#comboregistros').getValue();
        var estado = view.down('#estado').getValue();
        //var nombre = view.down('#nombre').getValue();
        
        var target = view.down('#Iframe');

        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        
        /* Agrego los valores de los combo a las URL
         * Genero los parametros del Store Procedure
         */
        if(dealerdesde) {   
            url = Ext.String.urlAppend(url,"dealerdesde="+dealerdesde);
        }

        /*if(dealerhasta) {   
            url = Ext.String.urlAppend(url,"dealerhasta="+dealerhasta);
        }*/

        if(cuentadesde) {   
            url = Ext.String.urlAppend(url,"cuentadesde="+cuentadesde);
        }        

        if(cuentahasta) {   
            url = Ext.String.urlAppend(url,"cuentahasta="+cuentahasta);
        }     

        if(cantidadregistros) {
            url = Ext.String.urlAppend(url,"Mostrar="+cantidadregistros);
        } 
     

        if(fechadesde) {   
            url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format(fechadesde,'Y-m-d'));
        } 
        if(fechahasta) {   
            url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(Ext.Date.add(fechahasta, Ext.Date.DAY, 1),'Y-m-d'));
        }
        if(estado) {   
            url = Ext.String.urlAppend(url,"estado="+estado);
        }        
        
        view.urltoexport = url;
        
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        
        /* Llamo a la URL */
                target.load({
            src: url
        }); 

    },
    
    
    onSeleccionarDealerDesde: function (button, events, eOps) {
        var view = button.up('reportecomandosenviadosview');
        //view.win = win;
        view.down('#flagDealerSelector').setValue('dealerDesde');
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Seleccione Dealer Desde',
			closeAction : 'destroy',
            itemId: 'dealerDesdeWin',
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

        var viewcuenta = win.down('cuentahelperview');
        viewcuenta
        'cuentahelperview button[action=selected]'


		win.show();
        
    },
    onSeleccionarDealerHasta: function (button, events, eOps) {
        var view = button.up('reportecomandosenviadosview');
        view.down('#flagDealerSelector').setValue('dealerHasta');
        //view.win = win;
        
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Seleccione Dealer Hasta',
			closeAction : 'destroy',
            itemId: 'dealerDesdeWin',
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
            if(view.down('#flagDealerSelector').getValue()=='dealerDesde'){
                view.down('#dealerDesde').setValue(record.get('cue_clinea'));
                
                view.down('#sacarDealerDesde').show();          
            }
            if(view.down('#flagDealerSelector').getValue()=='dealerHasta'){
                view.down('#dealerHasta').setValue(record.get('cue_clinea'));
                
                view.down('#sacarDealerHasta').show();          
            }            

        });
    },
    
    onExportClick : function(button){
        var view = button.up('reportecomandosenviadosview');
        if(view.urltoexport) {
            var url = view.urltoexport;
        } else {
            var url = view.baseurl;
        }
        
        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }

        location.href=url;
    }    
});
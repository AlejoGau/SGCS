Ext.define('SgAppWebReport.controller.ReporteHorasVigiladorMesController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'ReporteHorasVigiladorMesView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'reportehorasvigiladormesview' : {
                afterrender : this.initView,
                //DS-645|adrianlara|20230427 => se agrega eventos para poder seleccionar una cuenta
	            cuentachanged : this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'reportehorasvigiladormesview button[action=search]' : {
                click: this.onSearchClick
            },
            'reportehorasvigiladormesview button[action=export]' : {
                click: this.onExportClick
            },
            'reportehorasvigiladormesview button[action=exportSplit]' : {
                click: this.onExportClick
            },
            //DS-645|adrianlara|20230427 => se agrega handler para poder seleccionar una cuenta
            'reportehorasvigiladormesview button[action=seleccionarCuenta]' : {
                click: this.onSeleccionarCuenta
            },
            'reportehorasvigiladormesview button[action=btnprint]': {
                click: this.onBtnprintClick
            },               
        });
        
    }, // cierro init
    
    initView: function(view) {
        /* Cargo el Stored correspondiente a los usuarios de la cuenta, esto lo uso
         * para poder tener la informacion en el combo de usuario
         */
        var controller = this;
        view.counter = 0;
        var today = new Date();
        var monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        /*
        var storeUsuarios = Ext.create('Ext.data.Store',{
            model: controller.getUsuarioSearchModelModel(),
            pageSize: 500,
            //remoteSort: true,
            remoteFilter: true,
            sorters: [{
                 property: 'usu_cnombre',
                 direction: 'ASC'
             }]
        });
        view.down('#vigilador').bindStore(storeUsuarios);
        storeUsuarios.load();
        */
        
        /* Modifico el baseUrl al nuevo creado */
        view.down('#fechaDesde').setValue(monthAgo);
        view.down('#fechaHasta').setValue(today);  
        var fechadesde =  view.down('#fechaDesde').getValue();
        var fechahasta =  view.down('#fechaHasta').getValue();



        view.baseurl =  '/handler/ReporteHorasVigiladorMesHTML';
        var target = view.down('#Iframe');
        
        var url = view.baseurl

        if(fechadesde) {   
            url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format(fechadesde,'Y-m-d'));
        } 
        if(fechahasta) {   
            url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(fechahasta,'Y-m-d'));
        }
        url = Ext.String.urlAppend(url,"dayArray=1,2");
        url = Ext.String.urlAppend(url,"dayDatos=v,s");
        
        url = Ext.String.urlAppend(url,"first=true");
        

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        /* Llamo a la URL */
                target.load({
            src: url
        }); 
    },

    onBtnprintClick: function (button) {
        var view = button.up('reportehorasvigiladormesview');
        var target = view.down('#Iframe');
        url = target.src;
        var contenido;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { 
            printHTMLContent(body);
            /*
            var win = Ext.create('Ext.window.Window', {
                    title: 'Mi ventana',
                    html: "",
                    modal: true,
        });
        contenido = body.replace('body', 'body onload="window.print(); window.onafterprint = function() { window.close(); }"')
            let myWindow = window.open('', '', 'width=600,height=400');
            if (myWindow) {
                let doc = myWindow.document;
                doc.open();
                doc.write(contenido);
                doc.close();
            } else {
                console.error('No se pudo abrir la ventana.');
            }
            //win.printMe();
            */
        });
    },

    onSearchClick : function(button, event, options) {
        var view = button.up('reportehorasvigiladormesview');

        /* Tomo los valores de los combo creado en la view */
        var vigilador = view.down('#vigilador').getValue();
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = view.down('#fechaHasta').getValue();
        var extid = view.down('#extid').getValue();
        var Obs = view.down('#Obs').getValue();
        var target = view.down('#Iframe');
        //DS-645|adrianlara|20230427 => obtengo el valor de la cuenta para poder filtrar
        var cuenta = view.down('#idcuenta').getValue();
        var objetivo = view.down('#cuentaobjetivo').getValue();

        var currentDate = new Date(fechadesde);
        var dayArray = [];
        var dayDatos = [];
        var dayOfWeek = ["d", "l", "m", "M", "j", "v", "s"];
        while (currentDate <= fechahasta) {
            dayArray.push(currentDate.getDate());
            dayDatos.push(dayOfWeek[currentDate.getDay()]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        
        /* Agrego los valores de los combo a las URL
         * Genero los parametros del Store Procedure
         */
        if(vigilador) {   
            url = Ext.String.urlAppend(url,"vigilador="+vigilador);
        }
        if(fechadesde) {   
            url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format(fechadesde,'Y-m-d'));
        } 
        if(fechahasta) {   
            url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(fechahasta,'Y-m-d'));
        }
        if(extid) {   
            url = Ext.String.urlAppend(url,"extid="+extid);
        }
        if(Obs) {   
            url = Ext.String.urlAppend(url,"Obs="+Obs);
        }
        //DS-645|adrianlara|20230427 => agrego la cuenta al query de la url
        if(cuenta) {   
            url = Ext.String.urlAppend(url,"cuenta="+cuenta);
        }
        if(objetivo) {   
            url = Ext.String.urlAppend(url,"objetivo="+objetivo);
        }

        url = Ext.String.urlAppend(url,"dayArray="+dayArray);
        url = Ext.String.urlAppend(url,"dayDatos="+dayDatos);  
        url = Ext.String.urlAppend(url,"first=false");
        
        view.urltoexport = url;
        
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        view.counter++;
        /* Llamo a la URL */
                target.load({
            src: url
        }); 

    },

    onExportClick : function(button){
        var view = button.up('reportehorasvigiladormesview');
        if(view.urltoexport) {
            var url = view.urltoexport;
        } else {
            var url = view.baseurl;
        }


        /* Tomo los valores de los combo creado en la view */
        var vigilador = view.down('#vigilador').getValue();
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = view.down('#fechaHasta').getValue();
        var extid = view.down('#extid').getValue();
        var Obs = view.down('#Obs').getValue();
        var target = view.down('#Iframe');
        //DS-645|adrianlara|20230427 => obtengo el valor de la cuenta para poder filtrar
        var cuenta = view.down('#idcuenta').getValue();
        var objetivo = view.down('#cuentaobjetivo').getValue();

        var currentDate = new Date(fechadesde);
        var dayArray = [];
        var dayDatos = [];
        var dayOfWeek = ["d", "l", "m", "M", "j", "v", "s"];
        while (currentDate <= fechahasta) {
            dayArray.push(currentDate.getDate());
            dayDatos.push(dayOfWeek[currentDate.getDay()]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;
        
        /* Agrego los valores de los combo a las URL
         * Genero los parametros del Store Procedure
         */
        if(vigilador) {   
            url = Ext.String.urlAppend(url,"vigilador="+vigilador);
        }
        if(fechadesde) {   
            url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format(fechadesde,'Y-m-d'));
        } 
        if(fechahasta) {   
            url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(fechahasta,'Y-m-d'));
        }
        if(extid) {   
            url = Ext.String.urlAppend(url,"extid="+extid);
        }
        if(Obs) {   
            url = Ext.String.urlAppend(url,"Obs="+Obs);
        }
        //DS-645|adrianlara|20230427 => agrego la cuenta al query de la url
        if(cuenta) {   
            url = Ext.String.urlAppend(url,"cuenta="+cuenta);
        }
        if(objetivo) {   
            url = Ext.String.urlAppend(url,"objetivo="+objetivo);
        }

        url = Ext.String.urlAppend(url,"dayArray="+dayArray);
        url = Ext.String.urlAppend(url,"dayDatos="+dayDatos);  
        url = Ext.String.urlAppend(url,"first=false");
        

        





        
        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if(exportToExcel) {
            url = Ext.String.urlAppend(url,"exportToExcel="+exportToExcel);
        }

        if ( button.action == "exportSplit") {
            url = url.replace("ReporteHorasVigiladorMesHTML", "ReporteHorasVigiladorMesNuevoHTML");
        }
        url = Ext.String.urlAppend(url, '_dc='+new Date().getTime());
        location.href=url;
    },

    //DS-645|adrianlara|20230427 => se agrega funcion para poder seleccionar una cuenta
    onSeleccionarCuenta: function (button, events, eOps) {
        var view = button.up('reportehorasvigiladormesview');
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
            var objetivo = record.get('cue_cnombre');
            view.down('#idcuenta').setValue(cueiid);
            view.down('#nombrecuenta').setValue(nombre);
            view.down('#cuentaobjetivo').setValue(objetivo);
            view.down('#sacarcuenta').show();          

        });
    },
    //DS-645|end
});
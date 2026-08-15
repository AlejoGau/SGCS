Ext.define('SgAppWebReport.controller.ReportePostasCleanAppController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: [],
    views: ['ReportePostasCleanAppView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'reportepostascleanappview': {
                afterrender: this.initView,
                cuentachanged: this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'reportepostascleanappview button[action=search]': {
                click: this.onSearchClick
            },
            'reportepostascleanappview button[action=export]': {
                click: this.onExportClick
            },
            'reportepostascleanappview button[action=btnprint]': {
                click: this.onBtnprintClick
            }, 
            'reportepostascleanappview button[action=seleccionarCuenta]': {
                click: this.onSeleccionarCuenta
            }
        });

    }, // cierro init

    initView: function (view) {
        var controller = this;
        /* Modifico el baseUrl al nuevo creado */
        view.baseurl = '/handler/ReporteRondasVigicontrolHTML?fromCleanApp=true';
        var target = view.down('#Iframe');
        var url = view.baseurl

        //target.getDoc().getElementsByTagName('body')[0].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        // seteo fecha desde y fecha hasta
        view.down('#fechaDesde').setValue(Ext.Date.add(new Date(), Ext.Date.DAY, -1));
        view.down('#fechaHasta').setValue(new Date());

        /* Llamo a la URL */
        controller.onSearchClick(view.down('#buscar'));

    },
    onSearchClick: function (button, event, options) {
        var view = button.up('reportepostascleanappview');
        /* Tomo los valores de los combo creado en la view */
        var objetivo = view.down('#idcuenta').getValue();
        var vigilador = view.down('#vigilador').getValue();
        var fechadesde = view.down('#fechaDesde').getValue();
        var fechahasta = view.down('#fechaHasta').getValue();
        var target = view.down('#Iframe');

        /* Limpio la URL con la base del INIT */
        var url = view.baseurl;

        /* Agrego los valores de los combo a las URL
         * Genero los parametros del Store Procedure
         */
        if (vigilador) {
            url = Ext.String.urlAppend(url, "vigilador=" + vigilador);
        }
        if (objetivo) {
            url = Ext.String.urlAppend(url, "cuenta=" + objetivo);
        }
        if (fechadesde) {
            url = Ext.String.urlAppend(url, "fechadesde=" + Ext.Date.format(fechadesde, 'Y-m-d'));
        }
        if (fechahasta) {
            url = Ext.String.urlAppend(url, "fechahasta=" + Ext.Date.format(fechahasta, 'Y-m-d'));
        }

        view.urltoexport = url;

        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime() + '&' + '&output=embed');


        // Agrega la vista al contenedor principal
        //this.getView().add(view);
        //if(//target.getDoc().getElementsByTagName('body')[0].innerHTML)
        //    //target.getDoc().getElementsByTagName('body')[0].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        /* Llamo a la URL */
        target.load({
            src: url
        });
        let content = target.getEl();
    },

    onBtnprintClick: function (button) {
        var view = button.up('reportepostascleanappview');
        var target = view.down('#Iframe');
        url = target.src;
        var contenido;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { 
            printHTMLContent(body);
        /*    var win = Ext.create('Ext.window.Window', {
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
    onSeleccionarCuenta: function (button, events, eOps) {
        var view = button.up('reportepostascleanappview');
        //view.win = win;
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Seleccione Cuentas',
            closeAction: 'destroy',
            itemId: 'cuentaWin',
            width: 750,
            height: 550,
            border: true,
            modal: true,
            view: view,
            items: [
                {
                    xtype: 'cuentahelperview',
                    filterTipo: 'nofilter',
                    caller: view,
                    filterTipo: 9,
                    cue_nparticion: "0"
                }
            ]
        });
        win.show();
    },

    onCuentaSelected: function (selection, view, recordPreSelected) {
        var controller = this;

        Ext.Array.each(selection, function (record) {
            var cueiid = record.get('cue_iid');
            var nombre = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre');
            view.down('#idcuenta').setValue(cueiid)
            view.down('#nombrecuenta').setValue(nombre)
            view.down('#sacarcuenta').show();

        });
    },

    onExportClick: function (button) {
        var view = button.up('reportepostascleanappview');
        if (view.urltoexport) {
            var url = view.urltoexport;
        } else {
            var url = view.baseurl;
        }

        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if (exportToExcel) {
            url = Ext.String.urlAppend(url, "exportToExcel=" + exportToExcel);
        }

        location.href = url;
    }

})
Ext.define('SgAppWebReport.controller.ReporteUltimoEventoCuentaController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['SoftguardCodigoAlarmaModel'],
    views: ['ReporteUltimoEventoCuentaView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'reporteultimoeventocuentaview': {
                afterrender: this.initView
            },
            'reporteultimoeventocuentaview button[action=search]': {
                click: this.onSearchClick
            },
            'reporteultimoeventocuentaview button[action=todos]': {
                click: this.onTodosClick
            },
            'reporteultimoeventocuentaview button[action=export]': {
                click: this.onExportClick
            },
            'reporteultimoeventocuentaview button[action=btnprint]': {
                click: this.onBtnprintClick
            }
        });

    }, // cierro init

    initView: function (view) {
        var controller = this
        view.baseurl = '/handler/ReporteUltimoEventoCuentaHTML';
        var target = view.down('#Iframe');

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        var filters = [];

        /*view.down('#tst1').setValue(true);
        view.down('#tst2').setValue(true);*/

        var sorters = [
            {
                property: 'cue_ncuenta',
                direction: 'ASC'
            }
        ];

        view.baseurl = Ext.String.urlAppend(view.baseurl, 'icon=cancel.png');
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token=' + controller.application.getToken());
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'sorters=' + Ext.encode(sorters));

        view.baseurl = Ext.String.urlAppend(view.baseurl, 'title=' + Ext.encode('Ultimo evento por cuenta'));
        var url = view.baseurl;
        //var url = Ext.String.urlAppend(view.baseurl, 'filter='+Ext.encode(filters));
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());


        /**
         * BC 390473224 : Agrego combo para codigos de Alarma
         */
        var codigoAlarmaStore = Ext.create('Ext.data.Store', {
            model: this.getSoftguardCodigoAlarmaModelModel(),
            autoload: false,
            sorters: [{
                property: 'cod_cdescripcion',
                direction: 'ASC'
            }],
            pageSize: 10000
        });
        var comboCodigoalarma = view.down('#codigoalarma');
        comboCodigoalarma.bindStore(codigoAlarmaStore);
        codigoAlarmaStore.load();

        target.load({
            src: url
        });

    },

    onSearchClick: function (button, event, options) {
        var view = button.up('reporteultimoeventocuentaview');
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        var comboestado = view.down('#comboestado').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var nombre = view.down('#nombre').getValue();
        var dealerdesde = view.down('#dealerdesde').getValue();
        var dealerhasta = view.down('#dealerhasta').getValue();
        /**
         * BC 390473224 : Agrego combo para codigos de Alarma
         */
        var codAlarma = view.down('#codigoalarma').getValue();

        var filters = [];

        var search = false;


        // BC 399867950 : Cuando estaba en blanco el combo de CodAlarma, se estaba agregando igual al filter, y no traia información.
        if (codAlarma.length > 0) {
            console.log('codAlarma', codAlarmaSinNumeral)
            // Se crea en CuentaByDealer un filter especial para el reporte para la busqueda en este SP por varios codigos de alarma
            var codAlarmaSinNumeral = codAlarma.map(function (item) {
                return item.replace('#', '');
            });

            filters.push({
                property: 'reporte_cod_ccodigo',
                value: codAlarmaSinNumeral.join(',')   // Lo enviás como string separado por comas
            });
        }



        if (fechadesde) {
            filters.push({
                property: 'sta_dfechautimaalarma:GT',
                value: Ext.Date.format(fechadesde, 'Y-m-d H:i:s')
            });
        }

        if (fechahasta) {
            // Establecer la hora en 23:59:59
            fechahasta.setHours(23, 59, 59);

            filters.push({
                property: 'sta_dfechautimaalarma:GL',
                value: Ext.Date.format(fechahasta, 'Y-m-d H:i:s')
            });
        }
        var url = view.baseurl;

        if (comboestado != null) {
            // url = Ext.String.urlAppend(url, 'Situacion='+comboestado);    
            filters.push({
                property: 'Situacion',
                value: comboestado.replace('|', '').replace('|', '')
            });
        }

        if (cuentadesde && cuentadesde != "") {
            url = Ext.String.urlAppend(url, 'cue_ncuentaDesde=' + cuentadesde);
        }
        if (cuentahasta) {
            url = Ext.String.urlAppend(url, 'cue_ncuentaHasta=' + cuentahasta);
        }

        if (nombre) {
            url = Ext.String.urlAppend(url, 'texto=' + nombre);
        }

        if (dealerdesde) {
            url = Ext.String.urlAppend(url, 'lineadesde=' + dealerdesde);
        }
        if (dealerhasta) {
            url = Ext.String.urlAppend(url, 'lineahasta=' + dealerhasta);
        }

        var target = view.down('#Iframe');

        var sorters = [
            {
                property: 'cue_ncuenta',
                direction: 'ASC'
            }
        ];

        var url = Ext.String.urlAppend(url, 'filter=' + Ext.encode(filters));

        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        target.load({
            src: url
        });



    },

    onBtnprintClick: function (button) {
        var view = button.up('reporteultimoeventocuentaview');
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
    onTodosClick: function (button) {
        var view = button.up('reporteultimoeventocuentaview');

        var tst1 = view.down('#tst1').setValue(true);
        var tst2 = view.down('#tst2').setValue(true);

        var filters = [];
        filters.push({
            property: 'sta_ncuentaenfallodetst',
            value: 1
        });
        filters.push({
            property: 'sta_ncuentaenfallo2dotst',
            value: 1
        });

        var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        target.load({
            src: url + '?Filter=' + Ext.encode(view.filters)
        });

    },

    onExportClick: function (button) {
        var view = button.up('reporteultimoeventocuentaview');
        var url = view.baseurl;

        /* limpio todo filtro que haya aplicado */
        var filters = [];
        var search = false;

        /* Tomo los datos que estan en el filtro */
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        var comboestado = view.down('#comboestado').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var nombre = view.down('#nombre').getValue();
        var dealerdesde = view.down('#dealerdesde').getValue();
        var dealerhasta = view.down('#dealerhasta').getValue();

        if (fechadesde) {
            filters.push({
                property: 'sta_dfechautimaalarma:GT',
                value: Ext.Date.format(fechadesde, 'Y-m-d H:i:s')
            });
        }

        if (fechahasta) {
            filters.push({
                property: "sta_dfechautimaalarma:GL",
                value: Ext.Date.format(fechahasta, 'Y-m-d H:i:s')
            });
        }

        if (comboestado != null) {
            filters.push({
                property: 'Situacion',
                value: comboestado.replace('|', '').replace('|', '')
            });
        }

        if (cuentadesde) {
            url = Ext.String.urlAppend(url, "cue_ncuentaDesde=" + cuentadesde);
        }
        if (cuentahasta) {
            url = Ext.String.urlAppend(url, "cue_ncuentaHasta=" + cuentahasta);
        }

        if (nombre) {
            url = Ext.String.urlAppend(url, "texto=" + nombre);
        }

        if (dealerdesde) {
            url = Ext.String.urlAppend(url, "lineadesde=" + dealerdesde);
        }
        if (dealerhasta) {
            url = Ext.String.urlAppend(url, "lineahasta=" + dealerhasta);
        }


        url = Ext.String.urlAppend(url, "filter=" + Ext.encode(filters));
        url = Ext.String.urlAppend(url, "_dc=" + new Date().getTime());

        /* Agrego flag de Export */
        var exportToExcel = 'yes';
        if (exportToExcel) {
            url = Ext.String.urlAppend(url, "exportToExcel=" + exportToExcel);
        }

        location.href = url;

    }


});
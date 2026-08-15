Ext.define('SgAppWebReport.controller.ReporteEstadoCuentaController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['CuentaTipoSearchModel'],
    views: ['ReporteEstadoCuentaView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'reporteestadocuentaview': {
                afterrender: this.initView
            },
            'reporteestadocuentaview button[action=search]': {
                click: this.onSearchClick
            },
            'reporteestadocuentaview button[action=todos]': {
                click: this.onTodosClick
            },
            'reporteestadocuentaview button[action=mail]': {
                click: this.onMailClick
            },
            'reporteestadocuentaview button[action=export]': {
                click: this.onExportClick
            },
            'reporteestadocuentaview button[action=exportCsv]': {
                click: this.onExportClick
            },
            'reporteestadocuentaview button[action=btnprint]': {
                click: this.onBtnprintClick
            }

        });

    }, // cierro init

    initView: function (view) {
        var controller = this
        view.baseurl = '/handler/ReporteEstadoCuentaHTML';
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'title=' + Ext.encode('Estado de las cuentas'));
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token=' + controller.application.getToken());

        var target = view.down('#Iframe');

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        var tipostore = Ext.create('Ext.data.Store', {
            model: this.getCuentaTipoSearchModelModel(),
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property: 'tip_nTipo:ININT',
                    value: '0,5'
                }
            ]
        })
        view.down('#tipo').bindStore(tipostore);
        tipostore.load()




        this.onSearchClick(view)


    },
    onBtnprintClick: function (button) {
        var view = button.up('reporteestadocuentaview');
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

    onExportClick: function (button) {
        var view = button.up('reporteestadocuentaview');
        var iframe = view.down('#Iframe');

        if (iframe.src.includes("export")) {
            iframe.src = iframe.src.replace(/&accion=exportCsv|&accion=exportSplit|&accion=export/gi, "");
        }

        /*// Fuerzo solo al handler NUEVOHTML
        if ( button.action == "exportSplit") {
            iframe.src = iframe.src.replace("EventosByCuentaHTML", "EventosByCuentaNuevoHTML");
        }*/

        let url = Ext.String.urlAppend(iframe.src, "accion=" + button.action);
        iframe.load({
            src: url
        });
    },

    onMailClick: function (button) {
        var view = button.up('reporteestadocuentaview');
        var target = view.down('#Iframe');
        url = target.src;
        fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (body) { //Obtenemos el valor devuelto.
                var mailbody = body;
                var mail = Ext.widget('mailformview', {
                    mailbody: mailbody,
                    from: getParametro('MAILSENDERNAME') + " <" + getParametro('MAILSENDER') + ">",
                    autoScroll: true,
                    subject: getLocale('Reporte de eventos')
                });
                var win = Ext.widget('window', {
                    title: 'Envío de correo',
                    layout: 'fit',
                    items: mail,
                    width: 600,
                    height: 600
                }).show();
            });
    },


    onSearchClick: function (button, event, options) {
        var view = button.up('reporteestadocuentaview') ? button.up('reporteestadocuentaview') : button;
        var baseurl = view.baseurl;
        var url = view.baseurl;

        // ... (resto de tus variables: dealer, cuentadesde, etc) ...
        var dealer = view.down('#dealer').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        var sta_nestado = view.down('#sta_nestado').getValue();
        var madre_cnombre = view.down('#madre_cnombre').getValue();
        var situacion = view.down('#situacion').getValue();
        var tipo = view.down('#tipo').getValue();
        var cue_nAutoMonitoreo = view.down('#cue_nAutoMonitoreo').getValue();
        var cuentanombre = view.down('#cuentaNombre').getValue();

        // --- LOGICA INFALIBLE ---
        // Buscamos el checkbox específico por su ID
        var chkServicio = view.down('#chk_fecha_servicio');
        var campoFecha = 'cue_dfechaalta'; // Por defecto es Alta

        // Si existe el checkbox y está marcado (true), cambiamos a Servicio
        if (chkServicio && chkServicio.getValue()) {
            campoFecha = 'cue_dservicio';
        }
        // ------------------------

        var filters = [];

        if (dealer) {
            filters.push({
                property: 'cue_clinea',
                value: dealer,
                id: 'cue_clinea'
            });
        }

        if (cue_nAutoMonitoreo) {
            url = Ext.String.urlAppend(url, 'cue_nAutoMonitoreo=' + cue_nAutoMonitoreo);
            filters.push({
                property: 'cue_nAutoMonitoreo',
                value: 1
            });
        } else {
            url = Ext.String.urlAppend(url, 'cue_nAutoMonitoreo=' + cue_nAutoMonitoreo);
        }

        url = Ext.String.urlAppend(url, 'filter=' + Ext.encode(filters));

        // Agregamos el parametro
        url = Ext.String.urlAppend(url, 'tipo_fecha=' + campoFecha);

        if (madre_cnombre) {
            url = Ext.String.urlAppend(url, 'madre_cnombre=' + madre_cnombre);
        }

        if (cuentanombre) {
            url = Ext.String.urlAppend(url, 'cuentanombre=' + cuentanombre);
        }

        if (cuentadesde) {
            url = Ext.String.urlAppend(url, 'cue_ncuentaDesde=' + cuentadesde);
        }

        if (cuentahasta) {
            url = Ext.String.urlAppend(url, 'cue_ncuentaHasta=' + cuentahasta);
        }

        if (sta_nestado && sta_nestado.estados != undefined) {
            if (Ext.isArray(sta_nestado.estados)) {
                url = Ext.String.urlAppend(url, 'sta_nestado=' + sta_nestado.estados.join(','));
            } else {
                url = Ext.String.urlAppend(url, 'sta_nestado=' + sta_nestado.estados);
            }
        } else {
            notify('Debe tener seleccionado al menos un estado.');
            return false;
        }

        if (situacion && situacion.situacion != undefined) {
            if (Ext.isArray(situacion.situacion)) {
                url = Ext.String.urlAppend(url, 'est_nEstado=' + situacion.situacion.join(','));
            } else {
                url = Ext.String.urlAppend(url, 'est_nEstado=' + situacion.situacion);
            }
        } else {
            notify('Debe tener seleccionado al menos una situacion.');
            return false;
        }

        if (tipo) {
            url = Ext.String.urlAppend(url, 'tip_ccodigo=' + tipo);
        }

        var target = view.down('#Iframe');
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        target.load({
            src: url
        });

        view.baseurl = baseurl;
    },


    onTodosClick: function (button) {
        var view = button.up('reporteestadocuentaview');
        var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        target.load({
            src: url + '?filter=' + Ext.encode(view.filters)
        });
    }


});
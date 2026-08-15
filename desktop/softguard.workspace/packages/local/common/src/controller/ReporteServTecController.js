//MIGRADO2024
Ext.define('Common.controller.ReporteServTecController', {
    extend: 'Ext.app.Controller',
    stores: ['Common.store.tip_ntipoStore'],
    models: ['ServTecSearchModel', 'InstaladoresByTokenSearchModel'],
    views: ['ReporteServTecView'],
    init: function (config) {
        // genero los eventos
        this.control({
            'reporteservtecview': {
                afterrender: this.initView,
                cuentachanged: this.onCuentaChanged,
                cuentaselected: this.onCuentaChanged
            },
            'reporteservtecview button[action=search]': {
                click: this.onSearchClick
            },
            'reporteservtecview button[action=btnprint]': {
                click: this.onBtnprintClick
            },
            'reporteservtecview button[action=todos]': {
                click: this.onTodosClick
            },
            'reporteservtecview button[action=buscarporcuenta]': {
                click: this.onBuscarPorCuentaClick
            },
            'reporteservtecview button[action=cancelado]': {
                click: this.onCanceladoClick
            },
            'reporteservtecview button[action=pendiente]': {
                click: this.onPendienteClick
            },
            'reporteservtecview button[action=finalizado]': {
                click: this.onFinalizadoClick
            },
            'reporteservtecview button[action=asignado]': {
                click: this.onAsignadoClick
            },
            'reporteservtecview button[action=enejecucion]': {
                click: this.onEnEjecucionClick
            },
            'reporteservtecview button[action=export]': {
                click: this.onExportToExcel
            }
        });
    }, // cierro init
    onSearchClick: function (button, event, options) {
        var view = button.up('reporteservtecview');
        // var store = view.getStore();
        this.activarFiltroEstados(view);
        // this.habilitarOrdenesYReporte(view.filters, view);
        var filters = [];
        var filtrosEstados = this.activarFiltroEstados(view);
        Ext.Array.push(filters, filtrosEstados);

        if (view.down('#tecnicoscombo').getValue()) {
            filters.push({
                property: 'stc_ctecnico_1',
                value: view.down('#tecnicoscombo').getValue()
            })
        }
        if (view.down('#tiposervicio').getValue() != null) {
            filters.push({
                property: 'tip_ntipo',
                value: view.down('#tiposervicio').getValue()
            })
        }
        if (view.down('#nombre').getValue()) {
            filters.push({
                property: 'cue_cnombre:LIKE',
                value: view.down('#nombre').getValue()
            })
        }
        if (view.down('#cuenta').getValue()) {
            filters.push({
                property: 'cue_ncuenta',
                value: view.down('#cuenta').getValue()
            })
        }
        if (view.down('#dealer').getValue()) {
            filters.push({
                property: 'lin_ccodigo',
                value: view.down('#dealer').getValue()
            })
        }
        if (view.down('#observacion').getValue()) {
            filters.push({
                property: 'cue_cobservacion:LIKE',
                value: view.down('#observacion').getValue()
            })
        }
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        var numero = view.down('#numero').getValue();
        if (fechadesde)
            fechadesde = Ext.Date.clearTime(fechadesde);   // 00:00:00 exacto
        filters.push({
            property: 'stc_dfecha_creacion:GT',
            value: fechadesde
        });
        if (fechahasta)
            fechahasta = Ext.Date.clearTime(fechahasta);
        fechahasta = Ext.Date.add(fechahasta, Ext.Date.SECOND, 86399); // 23:59:59
        filters.push({
            property: 'stc_dfecha_creacion:LT',
            value: fechahasta
        });
        if (numero)
            filters.push({
                property: 'stc_inumero',
                value: numero,
                id: 'tecnicos'
            });
        if (view.down('#dealercuenta').getValue()) {
            var datos = view.down('#dealercuenta').getValue().split('-');
            if (datos.length > 0) {
                filters.push({
                    property: 'lin_ccodigo',
                    value: datos[0]
                })
                filters.push({
                    property: 'cue_ncuenta',
                    value: datos[1]
                })
            } else {
                notify('El formato para la busqeuda no es valido')
            }
        }
        var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());
        url = Ext.String.urlAppend(url, 'Filter=' + Ext.encode(filters));
        url = Ext.String.urlAppend(url, 'Page=' + Ext.encode(view.page));
        url = Ext.String.urlAppend(url, 'Limit=' + Ext.encode(view.limit));
        //url = Ext.String.urlAppend(url, 'Filter=' + Ext.encode(filters));
        //target.getDocument().getElementsByTagName( 'body' )[ 0 ].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + '//' + window.location.hostname + '/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale( 'Cargando' ) + '</h1>';
        /* Activo todos los filtros, dado que cuando uno busca desde el FILTRAR
         * no discrimina lo que estaba tildado, sino que trae todos los estados para lo elegido
         * dentro del FILTRAR
         */
        //this.onTodosLosFiltros(view, idsFiltros);
        target.load({
            src: url
        });
    },
    onBtnprintClick: function (button) {
        var view = button.up('reporteservtecview');
        var target = view.down('#Iframe');
        url = target.src;
        var contenido;
        fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (body) {
                /*var win = Ext.create('Ext.window.Window', {
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
                }*/
                printHTMLContent(body);

            });
    },

    initView: function (view) {
        /**
         * BC 389496473 : Se agrega la posibilidad de filtrar las columnas del reporte
         * El parametro url viene desde MulticuentaServicioTecnicoGridController para el boton reporte
         * La url vendra con los check correspondientes
         * 
         * Esta vista cuando se ejecuta desde ReportesWeb, se le agregan a la URL todas las columnas
         * 
         */
        if (view.url) {
            view.baseurl = view.url;
        } else {
            view.baseurl = '/handler/SerTecReportHTML?chknumero=true&chkfechaalta=true&chktiposervicio=true&chkfechavisita=true&chkfechafinalizacion=true&chkcuenta=true&chktelefono=true&chktecnico=true&chkdireccion=true&chklocalidad=true&chkprovincia=true&chkservicio=true&chkobservaciones=true&chkestado=true&chkusuario=true&chkvalor=true&chkfechacreacion=true';
        }
        var target = view.down('#Iframe');
        //target.getDoc().getElementsByTagName( 'body' )[ 0 ].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + "//" + window.location.hostname + ( window.location.port != "" ? ":" + window.location.port : "" ) + '"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale( 'Cargando' ) + '</h1>';

        if (view.filters) {
            var filters = view.filters;
            if (view.filters > 0) {
                view.filterAccount = view.filters[1];
            }
        } else {
            var filters = [{
                property: 'stc_nestado',
                value: 1
            }];
            view.down('#pendiente').toggle(true);
        }
        if (!view.page) {
            view.page = 1;
        }
        if (!view.limit) {
            view.limit = 500;
        }
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());
        url = Ext.String.urlAppend(url, 'Filter=' + Ext.encode(filters));
        url = Ext.String.urlAppend(url, 'Page=' + Ext.encode(view.page));
        url = Ext.String.urlAppend(url, 'Limit=' + Ext.encode(500));
        /*if (view.sort) {
            const cleanSort = view.sort.map(function (item) {
                return {
                    property: item.property || item._property,
                    direction: item.direction || item._direction,
                    id: item.id || item._id,
                    root: item.root || item._root
                };
            });

            url = Ext.String.urlAppend(url, 'Sort=' + Ext.encode(cleanSort));
        }*/
        target.load({
            src: url
        });
        //target.setSrc( url );
        /*if(view.hiddenfilters) {
         view.down('#selcuenta').hide();
         view.down('#cancelado').hide();
         view.down('#pendiente').hide();
         view.down('#finalizado').hide();
         view.down('#asignado').hide();
         view.down('#enejecucion').hide();
         view.down('#todos').hide();
        }*/
        if (view.filters) {
            if (view.filters[0].property == "stc_nestado:inint") {
                view.filtrosActivos = [];
                Ext.Array.each(view.filters[0].value.split(','), function (idestado) {
                    view.filtrosActivos[idestado] = true;
                })
            } else {
                view.filtrosActivos = [];
                view.filtrosActivos[1] = false;
                view.filtrosActivos[2] = false;
                view.filtrosActivos[3] = false;
                view.filtrosActivos[4] = false;
                view.filtrosActivos[5] = false;
            }
        } else {
            view.filtrosActivos = [];
            view.filtrosActivos[1] = true;
            view.filtrosActivos[2] = false;
            view.filtrosActivos[3] = false;
            view.filtrosActivos[4] = false;
            view.filtrosActivos[5] = false;
        }
        this.activarFiltroEstados(view);
        var tecnicoStore = Ext.create('Ext.data.Store', {
            model: this.getInstaladoresByTokenSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
        })
        view.down('#tecnicoscombo').bindStore(tecnicoStore);
        tecnicoStore.load();
        /* Guardo lastUrl con los filtros que vinieron al crear la TAB */
        view.lastUrl = url;
    },

    onTodosClick: function (button) {
        var view = button.up('reporteservtecview');
        view.down('#fechadesde').setValue('');
        view.down('#fechahasta').setValue('');
        view.down('#tecnicoscombo').setValue('');
        view.down('#numero').setValue('');
        view.down('#nombre').setValue('');
        view.down('#cuenta').setValue('');
        view.down('#dealercuenta').setValue('');
        view.down('#dealer').setValue('');
        view.down('#observacion').setValue('');
        view.down('#tiposervicio').setValue('');
        view.down('#finalizado').toggle(true);
        view.down('#pendiente').toggle(true);
        view.down('#cancelado').toggle(true);
        view.down('#asignado').toggle(true);
        view.down('#enejecucion').toggle(true);
        //  view.down('#encamino').toggle(true); 
        var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(view.baseurl, 'Limit=1000');
        if (view.filters) {
            url = Ext.String.urlAppend(url, 'Filter=' + Ext.encode(view.filters));
        }
        target.load({
            src: url
        });
    },

    /* Agrego la funcion para limpiar el formulario cuando doy clic en los filtros de afuera del combo
     * Se agrega esto dado que al realizar el Export y no tener limpio el form, no sale bien y hay incongruencia
     * En lo que veo con lo que exporto y en como se comporta la App */
    onLimpiarFormFilter: function (view) {
        view.down('#fechadesde').setValue('');
        view.down('#fechahasta').setValue('');
        view.down('#tecnicoscombo').setValue('');
        view.down('#numero').setValue('');
        view.down('#nombre').setValue('');
        view.down('#cuenta').setValue('');
        view.down('#dealercuenta').setValue('');
        view.down('#dealer').setValue('');
        view.down('#observacion').setValue('');
        view.down('#tiposervicio').setValue('');
    },

    onBuscarPorCuentaClick: function (button, event, options) {
        var view = button.up('reporteservtecview');
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Seleccione una Cuenta',
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
                    tip_ncondicion: "0",
                    caller: view
                }
            ]
        });
        win.show();
    },

    onCuentaChanged: function (cuenta, view) {

        var gridview = view.up('viewport').down('reporteservtecview');
        // gridview.down('#nombrecuenta').setValue(cuenta.get('Name'));
        gridview.down('#idcuenta').setValue(cuenta.get('Id'));
        var filters = [];
        if (cuenta.get('Id')) {
            filters.push({
                property: 'stc_iid_cuenta',
                value: cuenta.get('Id'),
                id: 'cuenta'
            });
        }
        var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());
        url = Ext.String.urlAppend(url, 'Filter=' + Ext.encode(filters));
        target.getDoc/*.getDocument()*/.getElementsByTagName('body')[0].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + '//' + window.location.hostname + '/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale('Cargando') + '</h1>';
        target.load({
            src: url
        });
    },

    onCanceladoClick: function (button, event, options) {
        var view = button.up('reporteservtecview');
        var controller = this;
        var cuenta = view.down('#idcuenta');
        var filters = [];
        if (!view.filtrosActivos[3]) {
            view.filtrosActivos[3] = true;
        } else {
            view.filtrosActivos[3] = false;
        }
        if (cuenta && cuenta.getValue()) {
            filters.push({
                property: 'stc_iid_cuenta',
                value: cuenta.getValue(),
                id: 'cuenta'
            });
        }
        filters.push({
            property: 'stc_nestado',
            value: controller.activarFiltroEstados(view)
        });
        controller.onLimpiarFormFilter(view);
        var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());
        url = Ext.String.urlAppend(url, 'Filter=' + Ext.encode(filters));
        //target.getDocument().getElementsByTagName( 'body' )[ 0 ].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + "//" + window.location.hostname + ( window.location.port != "" ? ":" + window.location.port : "" ) + '"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale( 'Cargando' ) + '</h1>';
        //document.getElementById(target.getEl().id+ '-iframeEl').innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + "//" + window.location.hostname + ( window.location.port != "" ? ":" + window.location.port : "" ) + '"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale( 'Cargando' ) + '</h1>';
        //target.getDoc().getElementsByTagName( 'body' )[ 0 ].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + "//" + window.location.hostname + ( window.location.port != "" ? ":" + window.location.port : "" ) + '"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale( 'Cargando' ) + '</h1>';

        target.load({
            src: url
        });
    },

    onPendienteClick: function (button, event, options) {
        var view = button.up('reporteservtecview');
        var controller = this;
        var cuenta = view.down('#idcuenta');
        var filters = [];
        if (!view.filtrosActivos[1]) {
            view.filtrosActivos[1] = true;
        } else {
            view.filtrosActivos[1] = false;
        }
        if (cuenta && cuenta.getValue()) {
            filters.push({
                property: 'stc_iid_cuenta',
                value: cuenta.getValue(),
                id: 'cuenta'
            });
        }
        filters.push({
            property: 'stc_nestado',
            value: controller.activarFiltroEstados(view)
        });
        controller.onLimpiarFormFilter(view);
        var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());
        url = Ext.String.urlAppend(url, 'Filter=' + Ext.encode(filters));
        //target.getDocument().getElementsByTagName( 'body' )[ 0 ].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + '//' + window.location.hostname + '/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale( 'Cargando' ) + '</h1>';
        target.load({
            src: url
        });
    },

    onFinalizadoClick: function (button, event, options) {
        var view = button.up('reporteservtecview');
        var controller = this;
        var cuenta = view.down('#idcuenta');
        var filters = [];
        if (!view.filtrosActivos[4]) {
            view.filtrosActivos[4] = true;
        } else {
            view.filtrosActivos[4] = false;
        }
        if (cuenta && cuenta.getValue()) {
            filters.push({
                property: 'stc_iid_cuenta',
                value: cuenta.getValue(),
                id: 'cuenta'
            });
        }
        filters.push({
            property: 'stc_nestado',
            value: controller.activarFiltroEstados(view)
        });
        controller.onLimpiarFormFilter(view);
        var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());
        url = Ext.String.urlAppend(url, 'Filter=' + Ext.encode(filters));
        //target.getDocument().getElementsByTagName( 'body' )[ 0 ].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + "//" + window.location.hostname + ( window.location.port != "" ? ":" + window.location.port : "" ) + '"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale( 'Cargando' ) + '</h1>';
        target.load({
            src: url
        });
    },

    onEnEjecucionClick: function (button, event, options) {
        var view = button.up('reporteservtecview');
        var controller = this;
        var cuenta = view.down('#idcuenta');
        var filters = [];
        if (!view.filtrosActivos[5]) {
            view.filtrosActivos[5] = true;
        } else {
            view.filtrosActivos[5] = false;
        }
        if (cuenta && cuenta.getValue()) {
            filters.push({
                property: 'stc_iid_cuenta',
                value: cuenta.getValue(),
                id: 'cuenta'
            });
        }
        filters.push({
            property: 'stc_nestado',
            value: controller.activarFiltroEstados(view)
        });
        controller.onLimpiarFormFilter(view);
        var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());
        url = Ext.String.urlAppend(url, 'Filter=' + Ext.encode(filters));
        //target.getDocument().getElementsByTagName( 'body' )[ 0 ].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + "//" + window.location.hostname + ( window.location.port != "" ? ":" + window.location.port : "" ) + '"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale( 'Cargando' ) + '</h1>';
        target.load({
            src: url
        });
    },

    onAsignadoClick: function (button, event, options) {
        var view = button.up('reporteservtecview');
        var controller = this;
        var cuenta = view.down('#idcuenta');
        if (!view.filtrosActivos[2]) {
            view.filtrosActivos[2] = true;
        } else {
            view.filtrosActivos[2] = false;
        }
        var filters = [];
        if (cuenta && cuenta.getValue()) {
            filters.push({
                property: 'stc_iid_cuenta',
                value: cuenta.getValue(),
                id: 'cuenta'
            });
        }
        filters.push({
            property: 'stc_nestado',
            value: controller.activarFiltroEstados(view)
        });
        controller.onLimpiarFormFilter(view);
        var target = view.down('#Iframe');
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());
        url = Ext.String.urlAppend(url, 'Filter=' + Ext.encode(filters));
        //target.getDocument().getElementsByTagName( 'body' )[ 0 ].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + "//" + window.location.hostname + ( window.location.port != "" ? ":" + window.location.port : "" ) + '"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale( 'Cargando' ) + '</h1>';
        target.load({
            src: url
        });
    },

    activarFiltroEstados: function (view) {
        var idsFiltros = [];

        if (view.filtrosActivos[1]) idsFiltros.push(1);
        if (view.filtrosActivos[2]) idsFiltros.push(2);
        if (view.filtrosActivos[3]) idsFiltros.push(3);
        if (view.filtrosActivos[4]) idsFiltros.push(4);
        if (view.filtrosActivos[5]) idsFiltros.push(5);

        if (idsFiltros.length === 0) {
            return [];
        }

        return [{
            property: 'stc_nestado:inint',
            value: idsFiltros.join(',')
        }];
    },


    onTodosLosFiltros: function (view, idsFiltros) {
        view.down('#finalizado').toggle(true);
        view.down('#pendiente').toggle(true);
        view.down('#cancelado').toggle(true);
        view.down('#asignado').toggle(true);
        view.down('#enejecucion').toggle(true);
        idsFiltros.push(5);
        idsFiltros.push(4);
        idsFiltros.push(3);
        idsFiltros.push(2);
        idsFiltros.push(1);
    },

    /* Funciona creada para cuando, se elije en el reporte informacion del combo de Filtro
     * Que originalmente esta en blanco, por lo que agrega a la URL el flag de Export porque
     * limpie la URL que venia originalmente con los filtros que ya dejo de usar por cambiarlos 
     * a mano
     */
    onAddExportClick: function (url) {
        var exportToExcel = 'yes';
        if (exportToExcel) {
            url = Ext.String.urlAppend(url, "exportToExcel=" + exportToExcel);
        }
        return url;
    },

    /* Export to Excel */
    onExportToExcel: function (button, view) {
        var controller = this;
        var view = button.up('reporteservtecview')
        var cuenta = view.down('#idcuenta');
        /* Elijo los filtros que vinieron al crear la TAB (linea 270) y los pongo en la URL por si
         * quiero Exportar ni bien inicio el reporte con lo que vino de la TAB Servicio Tecnico
         * 
         * 10/06 Actualizacion
         * Limpio variable URL y realizo la accion pertinente si el reporte vino personalizado
         * En ese caso debo, re armar limit, sort y page 
         * 
         */
        var url = '';
        var filters = [];
        var idsFiltros = [];
        // view.url, viene completa si se utiliza desde SerTec, ya que vienen los checks seleccionados, pero no se guardan los filters. 
        // Si viene esta propiedad view.url, utilizo lastUrl donde ya manipule filters al iniciar en el OnInit.
        if (view.url) {
            url = view.lastUrl;
            url = Ext.String.urlAppend(url, 'Page=' + Ext.encode(view.page));
            url = Ext.String.urlAppend(url, 'Limit=' + Ext.encode(view.limit));
            if (view.filterAccount) {
                filters.push({
                    property: view.filterAccount.property,
                    value: view.filterAccount.value
                })
            }
        } else {
            url = view.baseurl;//view.lastUrl;
        }
        /* AGREGADO DE LOS FILTROS DE LA DERECHA */
        //var filters = view.filters;
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        var numero = view.down('#numero').getValue();
        if (view.down('#tecnicoscombo').getValue()) {
            url = view.baseurl;
            filters.push({
                property: 'stc_ctecnico_1',
                value: view.down('#tecnicoscombo').getValue()
            });
            controller.onTodosLosFiltros(view, idsFiltros);
            url = controller.onAddExportClick(url);
        }
        if (view.down('#tiposervicio').getValue() != null) {
            url = view.baseurl;
            filters.push({
                property: 'tip_ntipo',
                value: view.down('#tiposervicio').getValue()
            });
            controller.onTodosLosFiltros(view, idsFiltros);
            url = controller.onAddExportClick(url);
        }
        if (view.down('#nombre').getValue()) {
            url = view.baseurl;
            filters.push({
                property: 'cue_cnombre:LIKE',
                value: view.down('#nombre').getValue()
            });
            controller.onTodosLosFiltros(view, idsFiltros);
            url = controller.onAddExportClick(url);
        }
        if (view.down('#cuenta').getValue()) {
            url = view.baseurl;
            filters.push({
                property: 'cue_ncuenta',
                value: view.down('#cuenta').getValue()
            });
            controller.onTodosLosFiltros(view, idsFiltros);
            url = controller.onAddExportClick(url);
        }
        if (view.down('#dealer').getValue()) {
            url = view.baseurl;
            filters.push({
                property: 'lin_ccodigo',
                value: view.down('#dealer').getValue()
            });
            controller.onTodosLosFiltros(view, idsFiltros);
            url = controller.onAddExportClick(url);
        }
        if (view.down('#observacion').getValue()) {
            url = view.baseurl;
            filters.push({
                property: 'cue_cobservacion:LIKE',
                value: view.down('#observacion').getValue()
            });
            controller.onTodosLosFiltros(view, idsFiltros);
            url = controller.onAddExportClick(url);
        }
        if (fechadesde != null) {
            url = view.baseurl;
            filters.push({
                property: 'stc_dfecha_creacion:GT',
                value: fechadesde,
                id: 'fechadesde'
            });
            /*
             * Quito el filtro por URL y lo aplico directo en el Array para el SQL
             url = Ext.String.urlAppend(url,"fechadesde="+Ext.Date.format(new Date(fechadesde),'Y-m-d'))*/
            controller.onTodosLosFiltros(view, idsFiltros);
            url = controller.onAddExportClick(url);
        }
        if (fechahasta != null) {
            url = view.baseurl;
            filters.push({
                property: 'stc_dfecha_creacion:LT',
                value: fechahasta,
                id: 'fechahasta'
            });
            /*
             * Quito el filtro por URL y lo aplico directo en el Array para el SQL
            url = Ext.String.urlAppend(url,"fechahasta="+Ext.Date.format(new Date(fechahasta),'Y-m-d'))*/
            controller.onTodosLosFiltros(view, idsFiltros);
            url = controller.onAddExportClick(url);
        }
        /* Ojo por si tira error la fecha desde y hasta
         * debes modificar para que se apendee antes y asi
         * url = Ext.String.urlAppend(url,"FechaDesde="+Ext.Date.format(new Date(fechaDesde),'Y-m-d')
         * url = Ext.String.urlAppend(url,"FechaHasta="+Ext.Date.format(new Date(fechaDesde),'Y-m-d')
         */
        if (numero != null) {
            url = view.baseurl;
            filters.push({
                property: 'stc_inumero',
                value: numero,
                id: 'tecnicos'
            });
            controller.onTodosLosFiltros(view, idsFiltros);
            url = controller.onAddExportClick(url);
        }
        if (view.down('#dealercuenta').getValue()) {
            var datos = view.down('#dealercuenta').getValue().split('-');
            if (datos.length > 0) {
                url = view.baseurl;
                filters.push({
                    property: 'lin_ccodigo',
                    value: datos[0]
                });
                filters.push({
                    property: 'cue_ncuenta',
                    value: datos[1]
                });
                controller.onTodosLosFiltros(view, idsFiltros);
                url = controller.onAddExportClick(url);
            } else {
                notify('El formato para la busqeuda no es valido')
            }
        }
        if (idsFiltros.length > 0) {
            filters.push({
                property: 'stc_nestado:inint',
                value: idsFiltros.join(",")
            });
        } else {
            /* limpio lo que venia por default y vuelvo a tomarlo para limpiar URL de cosas innecesarias */
            //filters = [];
            //idsFiltros = [];
            //url = view.baseurl;
            if (view.filtrosActivos[1]) {
                if (cuenta && cuenta.getValue()) {
                    filters.push({
                        property: 'stc_iid_cuenta',
                        value: cuenta.getValue(),
                        id: 'cuenta'
                    });
                }
                idsFiltros.push(1);
            }
            if (view.filtrosActivos[2]) {
                if (cuenta && cuenta.getValue()) {
                    filters.push({
                        property: 'stc_iid_cuenta',
                        value: cuenta.getValue(),
                        id: 'cuenta'
                    });
                }
                idsFiltros.push(2);
            }
            if (view.filtrosActivos[3]) {
                if (cuenta && cuenta.getValue()) {
                    filters.push({
                        property: 'stc_iid_cuenta',
                        value: cuenta.getValue(),
                        id: 'cuenta'
                    });
                }
                idsFiltros.push(3);
            }
            if (view.filtrosActivos[4]) {
                if (cuenta && cuenta.getValue()) {
                    filters.push({
                        property: 'stc_iid_cuenta',
                        value: cuenta.getValue(),
                        id: 'cuenta'
                    });
                }
                idsFiltros.push(4);
            }
            if (view.filtrosActivos[5]) {
                if (cuenta && cuenta.getValue()) {
                    filters.push({
                        property: 'stc_iid_cuenta',
                        value: cuenta.getValue(),
                        id: 'cuenta'
                    });
                }
                idsFiltros.push(5);
            }
        }
        //this.onTodosLosFiltros(view, idsFiltros);
        if (idsFiltros.length > 0) {
            filters.push({
                property: 'stc_nestado:inint',
                value: idsFiltros.join(",")
            });
        }
        /* realizo el append de _DC, flag del Export y filtros seleccionados */
        url = Ext.String.urlAppend(url, 'Filter=' + Ext.encode(filters));
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        url = controller.onAddExportClick(url);
        var target = view.down('#Iframe');

        location.href = url;
        //target.load(url);
    }

});
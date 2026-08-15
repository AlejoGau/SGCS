Ext.define('SgAppWebReport.controller.ReporteOperadorTiempoRespuestaController', {
    extend: 'Ext.app.Controller',
    stores: ['Common.store.SoftguardEstadoEstadoStore', 'Common.store.TablasCategorizacionStore', 'Common.store.TablasResolucionesStore', 'Common.store.TablaTiposStore'],
    models: ['SoftguardCodigoAlarmaModel', 'soperadoresSearchModel', 'TablaHistoricoSearchModel', 'TablasCategorizacionSearchModel', 'TablasGruposSearchModel', 'TablasResolucionesSearchModel', 'ZonaByCuentaSearchModel'],
    views: ['ReporteOperadorTiempoRespuestaView', 'ReporteEventosByCuentaView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'reporteoperadortiemporespuestaview': {
                afterrender: this.initView,
                cuentachanged: this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'reporteoperadortiemporespuestaview button[action=todos]': {
                click: this.onTodosClick
            },
            'reporteoperadortiemporespuestaview button[action=mail]': {
                click: this.onMailClick
            },
            'reporteoperadortiemporespuestaview #combohistorico': {
                select: this.onComboHistoricoSelect
            },
            'reporteoperadortiemporespuestaview #fechadesde': {
                select: this.onComboHistoricoSelect
            },
            'reporteoperadortiemporespuestaview #fechahasta': {
                select: this.onComboHistoricoSelect
            },
            'reporteoperadortiemporespuestaview button[action=openmenu]': {
                click: this.onOpenMenuClick
            },
            'reporteoperadortiemporespuestaview #seleccionarcuenta': {
                click: this.onsSeleccionarCuenta
            },
            'reporteoperadortiemporespuestaview button[action=export]': {
                click: this.onExportClick
            },
            'reporteoperadortiemporespuestaview button[action=exportCsv]': {
                click: this.onExportClick
            },
            'reporteoperadortiemporespuestaview button[action=btnprint]': {
                click: this.onBtnprintClick
            }
        });

    }, // cierro init

    initView: function (view) {
        var controller = this
        view.baseurl = '/handler/OperadorTiempoRespuetaHTML';

        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token=' +  controller.application.getToken());//Ext.util.Cookies.get('OAuth_Token'));
        var sort = [
            { "property": "ta.cod_nprioridad", "direction": "ASC" },
            { "property": "r.rec_iid", "direction": "DESC" }
        ];

        view.baseurl = Ext.String.urlAppend(view.baseurl, 'sort=' + Ext.encode(sort));
        //var url = Ext.String.urlAppend(view.baseurl, 'Mostrar=200');   
        var url = Ext.String.urlAppend(view.baseurl, '_dc=' + new Date().getTime());
        var target = view.down('#Iframe');




        // si le pasaron una cuenta
        if (view.record) {
            // oculto la seleccion de cuenta
            view.down('#rango').hide();

            // busco particiones
            partstore = Ext.create('Ext.data.Store', {
                model: this.getZonaByCuentaSearchModelModel(),
                remoteFilter: true,
                listeners: {
                    beforeload: function (store, operation) {
                        operation.params = { cuentaId: view.record.get('Id') };
                    }
                },
                filters: [{
                    property: 'zon_ccodigo:like',
                    value: 'PAR'
                }
                ]
            });
            partstore.load({
                callback: function (records) {
                    if (records.length != 0) {
                        view.particiones = Ext.Array.map(records, function (record) {
                            return record.get('cue_iid');
                        });


                        view.particiones.push(view.record.get('cue_iid'));
                    }
                }
            });
        }





        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';


        var now = new Date();

        url = Ext.String.urlAppend(url, "FechaDesde=" + Ext.Date.format(Ext.Date.add(now, Ext.Date.DAY, -1), 'Y-m-d') + "T00:00:00");
        url = Ext.String.urlAppend(url, "FechaHasta=" + Ext.Date.format(now, 'Y-m-d') + "T" + Ext.Date.format(now, 'H:i:s'));


        target.load({
            src: url
        });


    },
    onBtnprintClick: function (button) {
        console.log("onprint")
        var view = button.up('reporteoperadortiemporespuestaview');
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
    // Agregado para cuando, se elimina el combo de Historico, se ponga la fecha del mes corriente
    onCleanDates: function (combo, records, options) {
        var controller = this;
        var view = combo.up('window');
        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechadesde');
        var fechahasta = view.down('#fechahasta');

        if (!value) {
            fechadesde.setValue('');
            fechahasta.setValue('');

            // Seteo el Min y Max a ambos combo.
            fechadesde.setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechadesde.setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
            fechahasta.setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechahasta.setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));

            // Seteo la fecha en los combo del primer dia del mes y el de hoy
            fechadesde.setValue(Ext.Date.getFirstDateOfMonth(new Date()));
            fechahasta.setValue(new Date());

        }
    },

    onComboHistoricoSelect: function (combo, records, options) {
        var view = combo.up('window');
        //var view = combo.up('reporteoperadortiemporespuestaview');

        var value = view.down('#combohistorico').getValue();
        var fechadesde = view.down('#fechadesde');
        var fechahasta = view.down('#fechahasta');

        if (value != view.dateSelected) {
            fechadesde.setValue('');
            fechahasta.setValue('');

            // Al limpiar el combo de Historico, bloqueo los mes en curso del reporte
            view.down('#fechadesde').setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            view.down('#fechahasta').setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
        }

        if (value) {
            var fechahistorico = value.match(/\d{4}/g) + "-" + value.match(/\d{2}$/g);
            var month = value.match(/\d{2}$/g) - 1;

            var fechahistoricodesde = Ext.Date.getFirstDateOfMonth(new Date(value.match(/\d{4}/g), month));
            var fechahistoricohasta = Ext.Date.getLastDateOfMonth(new Date(value.match(/\d{4}/g), month));

            /*
            fechadesde.setValue(fechahistoricodesde);
            fechahasta.setValue(fechahistoricohasta);
            */

            fechadesde.setMinValue(fechahistoricodesde);
            fechadesde.setMaxValue(fechahistoricohasta);
            fechahasta.setMinValue(fechahistoricodesde);
            fechahasta.setMaxValue(fechahistoricohasta);

            if (fechadesde.getValue() || fechahasta.getValue()) {

                if (fechadesde.getValue() && new Date(fechadesde.getValue()).getTime() < fechahistoricodesde) {
                    fechadesde.markInvalid("Se encuentra fuera de rango");
                }

                if (fechahasta.getValue() && new Date(fechahasta.getValue()).getTime() > fechahistoricohasta) {
                    fechahasta.markInvalid("Se encuentra fuera de rango");
                }

            } else {
                fechadesde.setValue(fechahistoricodesde);
                fechahasta.setValue(fechahistoricohasta);
            }
        }

        view.dateSelected = value;
    },

    onTodosClick: function (button) {

        var view = button.up('reporteoperadortiemporespuestaview');

        var filters = [];

        var url = view.baseurl;
        if (view.record) {
            var url = Ext.String.urlAppend(view.baseurl, "Cuentas=" + view.record.get('cue_iid'));
        }
        var target = view.down('#Iframe');
        target.load({
            src: url
        });

    },
    onSearchClick: function (button, viewparent) {
        var view = button.up('reporteeventosview') ? button.up('reporteeventosview') : button;

        var filters = [];

        var fechaDesde = view.down('#fechadesde').getValue();
        var HoraDesde = view.down('#horadesde').getValue();
        var fechaHasta = view.down('#fechahasta').getValue();
        var HoraHasta = view.down('#horahasta').getValue();
        var combooperador = view.down('#combooperador').getValue();
        var dealer = view.down('#dealer').getValue();
        var dealerHasta = view.down('#dealerhasta').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        var nombre = view.down('#nombre').getValue();
        var tipocuenta = view.down('#tipocuenta').getValue();
        var tipoevento = view.down('#tipoevento').getValue();

        var cuentamadre = view.down('#cuentamadrecheck').getValue();
        var origen = view.down('#origencheck').getValue();
        var categorizacion = view.down('#categorizacioncheck').getValue();
        var categorizaciones = view.down('#combocategorizacion').getValue();
        var observaciones = view.down('#observacionescheck').getValue();

        //var operador = view.down('#operadorcheck').getValue();
        var resolucion = view.down('#resolucioncheck').getValue();
        var resoluciones = view.down('#comboresolucion').getValue();

        var comboestado = view.down('#comboestado').getValue();
        var combohistorico = view.down('#combohistorico').getValue();

        var codigoalarma = view.down('#codigoalarma').getValue();
        var idcuenta = view.down('#idcuenta').getValue();


        var grupo = view.down('#grupos').getValue();
        var origenes = view.down('#comboOrigenes').getValue();

        // BC 398886777 : Se agrega que, si se selecciona timeline solamente se haga el JOIN a esa tabla 
        var timeline = view.down('#timeline').getValue();
        var cantidadregistros = view.down('#comboregistros').getValue();

        var url = viewparent.baseurl;

        if (grupo) {
            url = Ext.String.urlAppend(url, "group=" + grupo);
        }

        if (origenes) {
            url = Ext.String.urlAppend(url, "Origenes=" + origenes);
        }

        if (fechaDesde) {
            url = Ext.String.urlAppend(url, "FechaDesde=" + Ext.Date.format(new Date(fechaDesde), 'Y-m-d') + "T" + Ext.Date.format(new Date(HoraDesde), 'H:i:s'));
        }

        if (fechaHasta) {
            url = Ext.String.urlAppend(url, "FechaHasta=" + Ext.Date.format(new Date(fechaHasta), 'Y-m-d') + "T" + Ext.Date.format(new Date(HoraHasta), 'H:i:s'));
        }

        if (combooperador) {
            url = Ext.String.urlAppend(url, "Operador=" + combooperador);
        }

        if (dealer) {
            url = Ext.String.urlAppend(url, "Dealer=" + dealer);
        }

        if (dealerHasta) {
            url = Ext.String.urlAppend(url, "DealerHasta=" + dealerHasta);
        }

        if (cuentadesde) {
            url = Ext.String.urlAppend(url, "CuentaDesde=" + cuentadesde);
        }

        if (cuentahasta) {
            url = Ext.String.urlAppend(url, "CuentaHasta=" + cuentahasta);
        }

        if (nombre) {
            url = Ext.String.urlAppend(url, "Nombre=" + nombre);
        }
        if (tipocuenta) {
            url = Ext.String.urlAppend(url, "TipoCuenta=" + tipocuenta);
        }
        if (tipoevento) {
            url = Ext.String.urlAppend(url, "TipoEvento=" + tipoevento);
        }

        if (cuentamadre) {
            url = Ext.String.urlAppend(url, "CuentaMadre=" + cuentamadre);

            if (view.particiones) {
                var cuentas = view.particiones.join(",");
                url = Ext.String.urlAppend(url, "Cuentas=" + cuentas);
            }

        }
        if (origen) {
            url = Ext.String.urlAppend(url, "Origen=" + origen);
        }
        if (categorizacion) {
            url = Ext.String.urlAppend(url, "Categorizacion=" + categorizacion);
        }
        if (categorizaciones) {
            url = Ext.String.urlAppend(url, "Categorizaciones=" + categorizaciones);
        }
        if (observaciones) {
            url = Ext.String.urlAppend(url, "Observaciones=" + observaciones);
        }

        /* if(operador) {
             url = Ext.String.urlAppend(url,"Operadorchk="+operador);
         }*/
        if (resolucion) {
            url = Ext.String.urlAppend(url, "Resolucionchk=" + resolucion);
        }

        if (resoluciones) {
            url = Ext.String.urlAppend(url, "Resoluciones=" + resoluciones);
        }

        if (comboestado) {
            url = Ext.String.urlAppend(url, "Estado=" + comboestado);
        }

        if (combohistorico) {
            url = Ext.String.urlAppend(url, "Historico=" + combohistorico);
        }

        if (codigoalarma && codigoalarma.length > 0) {
            url = Ext.String.urlAppend(url, "Codigoalarma=" + codigoalarma);
        }

        if (idcuenta) {
            var url = Ext.String.urlAppend(url, "Cuentas=" + idcuenta);
        }

        // BC 398886777 : Se agrega que, si se selecciona timeline solamente se haga el JOIN a esa tabla 
        if (timeline) {
            url = Ext.String.urlAppend(url, "timeline=" + timeline);
        }
        if (cantidadregistros) {
            url = Ext.String.urlAppend(url, "limit=" + cantidadregistros);
            url = Ext.String.urlAppend(url, "Mostrar=" + cantidadregistros);
        } else {
            url = Ext.String.urlAppend(url, "limit=" + getParametro('CANTIDADMAXHISTORICO'));
            url = Ext.String.urlAppend(url, "Mostrar=" + getParametro('CANTIDADMAXHISTORICO'));
        }

        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        var target = viewparent.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        if (url) {
            target.load({
                src: url
            });
        } else {
            target.load({
                src: viewparent.baseurl
            });
        }

    },

    onMailClick: function (button) {
        var view = button.up('reporteoperadortiemporespuestaview');
        
        //var iframe = view.down('#Iframe');
        //var mailbody = document.getElementById('iframe-' + iframe.getEl().id).contentWindow.document.documentElement.innerHTML;
        var target = view.down('#Iframe');
        url = target.src;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) {
            Ext.Ajax.request({
                url: '/Rest/t_parametros/',
                params: { filter: '[{"property":"par_ccodigo", "value":"MAILSENDERNAME"}]' },
                method: 'GET',
                scope: this,
                success: function (response) {
                    var from = Ext.JSON.decode(response.responseText).rows[0].par_cvalor;
                    var mail = Ext.widget('mailformview', {
                        mailbody: body,
                        from: from,
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
                }
            });

        });




    },

    onOpenMenuClick: function (button) {
        var controller = this;
        var view = button.up('reporteoperadortiemporespuestaview');
        var win;

        if (!view.win) {
            win = view.win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                overflowY: 'scroll',
                layout: {
                    type: 'anchor',
                    manageOverflow: 2,
                    reserveScrollbar: true // There will be a gap even when there's no scrollbar
                },
                closeAction: 'close',
                title: 'Filtros',
                width: 600,
                height: 400,
                border: false,
                items: [
                    {
                        xtype: 'form',
                        bodyPadding: '5',
                        itemId: 'form',
                        layout: 'anchor',
                        closeAction: 'close',
                        defaultButton: '#searchwin #search',
                        items: [
                            {
                                xtype: 'combo',
                                fieldLabel: 'Tabla Histórico',
                                displayField: '_periodo',
                                queryMode: 'local',
                                valueField: 'c_periodo',
                                anchor: '100%',
                                itemId: 'combohistorico',
                                name: 'tablahistorico',
                                //plugins: ['clearbutton'],
                                listeners: {
                                    select: function (combo, records, eOpts) {
                                        controller.onComboHistoricoSelect(combo, records, eOpts);
                                    },
                                    change: function (combo, records, eOpts) {
                                        controller.onCleanDates(combo, records, eOpts);
                                    }
                                }
                            }, {
                                xtype: 'fieldset',
                                title: 'Eventos',
                                layout: 'vbox',
                                items: [

                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'datefield',
                                                fieldLabel: 'Desde',
                                                name: "fechadesde",
                                                bindToModel: false,
                                                itemId: 'fechadesde',
                                                labelWidth: 50,
                                                width: 230,
                                                name: 'fechadesde'
                                            }, {
                                                fieldLabel: 'Hora',
                                                xtype: 'timefield',
                                                itemId: 'horadesde',
                                                format: 'H:i',
                                                altFormats: 'H:i',
                                                value: '00:00',
                                                increment: 10,
                                                labelWidth: 40,
                                                width: 123,
                                                margin: '0 0 0 7',
                                                name: 'horadesde'
                                            }
                                        ]
                                    }, {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'datefield',
                                                fieldLabel: 'Hasta',
                                                itemId: 'fechahasta',
                                                bindToModel: false,
                                                name: "fhasta",
                                                labelWidth: 50,
                                                width: 230,
                                                name: 'fechahasta'
                                            }, {
                                                fieldLabel: 'Hora',
                                                xtype: 'timefield',
                                                itemId: 'horahasta',
                                                format: 'H:i',
                                                altFormats: 'H:i',
                                                value: '23:50',
                                                increment: 10,
                                                labelWidth: 40,
                                                width: 123,
                                                margin: '0 0 0 7',
                                                name: 'horahasta'
                                            }
                                        ]
                                    }, {
                                        xtype: 'combo',
                                        itemId: 'comboregistros',
                                        fieldLabel: 'Cantidad de registros',
                                        width: '100%',
                                        margin: '10px 0',
                                        store: [
                                            [500, 500],
                                            [1000, 1000],
                                            [1500, 1500],
                                            [2000, 2000],
                                            [2500, 2500],
                                            [5000, 5000]
                                        ]
                                    }, {
                                        xtype: 'combo',
                                        itemId: 'combooperador',
                                        fieldLabel: 'Operador',
                                        displayField: 'ope_cnombre',
                                        valueField: 'ope_clogin',
                                        queryMode: 'local',
                                        width: '100%',
                                        name: 'operador'
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Tipo de evento',
                                        store: [
                                            [0, getLocale('General')],
                                            [4, getLocale('Restauracion')],
                                            [2, getLocale('Activacion')],
                                            [1, getLocale('Desactivacion')],
                                            [3, getLocale('Estado')]
                                        ],
                                        itemId: 'tipoevento',
                                        width: '100%',
                                        name: 'tipoevento'

                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Codigo alarma',
                                        itemId: 'codigoalarma',
                                        displayField: 'Descripcion',
                                        queryMode: 'local',
                                        valueField: 'cod_ccodigo',
                                        name: "cod_cdescripcion",
                                        width: '100%'

                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Categorización',
                                        itemId: 'combocategorizacion',
                                        store: "TablasResolucionesStore",
                                        triggerAction: 'all',
                                        enableKeyEvents: true,
                                        forceSelection: true,
                                        editable: true,
                                        queryMode: 'local',
                                        width: '100%',
                                        displayField: 'res_cdescripcion',
                                        valueField: 'res_ccodigo',
                                        name: 'categorizacion',
                                        listeners: {
                                            focus: function (combo) {
                                            },
                                            expand: function (combo) {
                                                if (combo.getValue() != '') {
                                                    this.clearValue();
                                                }
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: 'Resolución',
                                        itemId: 'comboresolucion',
                                        store: "TablasCategorizacionStore",
                                        forceSelection: true,
                                        editable: false,
                                        width: '100%',
                                        queryMode: 'local',
                                        displayField: 'cat_cDescripcion',
                                        valueField: 'cat_cCodigo',
                                        name: 'resolucion',
                                        listeners: {
                                            focus: function (combo) {

                                            },
                                            expand: function (combo) {
                                                if (combo.getValue() != '') {
                                                    this.clearValue();
                                                }

                                            }
                                        }
                                    }
                                ]
                            }, {
                                xtype: 'fieldset',
                                itemId: 'rango',
                                title: 'Cuentas',
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        margin: '0 0 10 0',
                                        items: [
                                            {
                                                xtype: 'button',
                                                text: 'Seleccione una cuenta',
                                                iconCls: 'icon-find',
                                                itemId: 'seleccionarcuenta',
                                                margin: '0 10 0 0',
                                                listeners: {
                                                    click: function (button) {
                                                        controller.onsSeleccionarCuenta(win, view);
                                                    }
                                                }
                                            }, {
                                                xtype: 'button',
                                                text: '',
                                                iconCls: 'icon-cancel',
                                                itemId: 'sacarcuenta',
                                                hidden: true,
                                                margin: '0 5 0 0',
                                                listeners: {
                                                    click: function (button) {
                                                        button.up('window').down('#idcuenta').setValue('')
                                                        button.up('window').down('#nombrecuenta').setValue('')
                                                        button.up('window').down('#zona').hide();
                                                        button.hide()
                                                    }
                                                }
                                            }, {
                                                xtype: 'displayfield',
                                                itemId: 'nombrecuenta',
                                                name: 'nombrecuenta'
                                            }, {
                                                xtype: 'displayfield',
                                                hidden: true,
                                                itemId: 'idcuenta',
                                                name: 'idcuenta'
                                            }
                                        ]

                                    }, {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Dealer desde',
                                                itemId: 'dealer',
                                                enforceMaxLength: true,
                                                maxLength: 3,
                                                width: 200,
                                                name: 'dealer'
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'cuentadesde',
                                                fieldLabel: 'Cuenta desde',
                                                enforceMaxLength: true,
                                                maxLength: 4,
                                                width: 170,
                                                labelWidth: 110,
                                                margin: '0 0 0 9',
                                                name: 'cuentadesde'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Dealer hasta',
                                                itemId: 'dealerhasta',
                                                enforceMaxLength: true,
                                                maxLength: 3,
                                                width: 200,
                                                name: 'dealerhasta'
                                            }, {
                                                xtype: 'textfield',
                                                itemId: 'cuentahasta',
                                                fieldLabel: 'Cuenta hasta',
                                                enforceMaxLength: true,
                                                maxLength: 4,
                                                width: 170,
                                                margin: '0 0 0 9',
                                                labelWidth: 110,
                                                name: 'cuentahasta'
                                            }
                                        ]
                                    }

                                    , {
                                        xtype: 'textfield',
                                        fieldLabel: 'Nombre',
                                        itemId: 'nombre',
                                        width: '100%',
                                        name: 'nombre'
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Tipo de cuenta',
                                        store: 'TablaTiposStore',
                                        displayField: 'Descripcion',
                                        queryMode: 'local',
                                        valueField: 'Codigo',
                                        name: "cue_ctipo",
                                        itemId: 'tipocuenta',
                                        width: '100%',
                                        name: 'tipocuenta'
                                    }, {
                                        xtype: 'combo',
                                        itemId: 'comboestado',
                                        fieldLabel: 'Estado',
                                        displayField: 'Name',
                                        valueField: 'Value',
                                        store: 'SoftguardEstadoEstadoStore',
                                        queryMode: 'local',
                                        width: '100%',
                                        name: 'comboestado'
                                    }, {
                                        xtype: 'combo',
                                        itemId: 'comboOrigenes',
                                        fieldLabel: 'Origen',
                                        displayField: 'Name',
                                        valueField: 'Value',
                                        store: 'EventoOrigenStore',
                                        queryMode: 'local',
                                        width: '100%',
                                        name: 'comboorigen'
                                    }, {

                                        xtype: 'combo',
                                        itemId: 'grupos',
                                        fieldLabel: 'Grupo',
                                        displayField: 'gru_cdescripcion',
                                        valueField: 'Value',
                                        queryMode: 'gru_ccodigo',
                                        width: '100%',
                                        name: 'combogrupo'

                                    }
                                ]
                            }, {
                                xtype: 'fieldset',
                                title: 'Mostrar',
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'checkbox',
                                        itemId: 'origencheck',
                                        fieldLabel: 'Origen',
                                        name: 'origencheck'

                                    }, {
                                        xtype: 'checkbox',
                                        itemId: 'cuentamadrecheck',
                                        fieldLabel: 'Cuenta panel',
                                        name: 'cuentamadrecheck'

                                    }, {
                                        xtype: 'checkbox',
                                        itemId: 'categorizacioncheck',
                                        fieldLabel: 'Categorizacion',
                                        name: 'categorizacioncheck'

                                    }, {
                                        xtype: 'checkbox',
                                        itemId: 'observacionescheck',
                                        fieldLabel: 'Observaciones',
                                        name: 'observacionescheck'

                                    }
                                /*,{
                                    xtype : 'checkbox',
                                    itemId: 'operadorcheck',
                                    fieldLabel : 'Operador'
                                    
                                }*/, {
                                        xtype: 'checkbox',
                                        itemId: 'resolucioncheck',
                                        fieldLabel: 'Resolucion',
                                        name: 'resolucioncheck'

                                    }, {
                                        xtype: 'checkbox',
                                        itemId: 'timeline',
                                        fieldLabel: 'Timeline',
                                        name: 'timeline'

                                    }

                                ]
                            }
                        ]
                    }
                ],
                buttons: [{
                    text: 'Buscar',
                    iconCls: 'icon-find',
                    itemId: 'search',
                    action: 'search',
                    listeners: {
                        click: function (button) {
                            controller.onSearchClick(win, view);
                            view.searchRecord = button.up('window').down('#form').getForm().getValues()

                            win.close();
                        }
                    }
                }]
            });

            if (view.searchRecord) {
                win.down('#form').getForm().setValues(view.searchRecord)
            }

            var now = new Date();
            win.down('#fechadesde').setValue(Ext.Date.add(now, Ext.Date.DAY, -1))
            win.down('#fechahasta').setValue(now)

            // 05/09/2018 Se quita para que inicie en 00:00 y 23:50
            //win.down('#horadesde').setValue('00:00')//Ext.Date.format(Ext.Date.add(now, Ext.Date.MINUTE, -60),'H:i'))
            //win.down('#horahasta').setValue(Ext.Date.format(now,'H:i'))

            /* Carga el combo de historico */
            var historicoStore = Ext.create('Ext.data.Store', {
                model: this.getTablaHistoricoSearchModelModel(),
                autoload: false,
                sorters: [{
                    property: 'c_periodo',
                    direction: 'DESC'
                }],
                pageSize: 10000
            });
            var comboHistorico = win.down('#combohistorico');
            comboHistorico.bindStore(historicoStore);
            historicoStore.load();


            var codigoAlarmaStore = Ext.create('Ext.data.Store', {
                model: this.getSoftguardCodigoAlarmaModelModel(),
                autoload: false,
                sorters: [{
                    property: 'cod_cdescripcion',
                    direction: 'ASC'
                }],
                pageSize: 10000
            });
            var comboCodigoalarma = win.down('#codigoalarma');
            comboCodigoalarma.bindStore(codigoAlarmaStore);
            codigoAlarmaStore.load();
            var operadoresStore = Ext.create('Ext.data.Store', {
                model: this.getSoperadoresSearchModelModel(),
                autoload: false,
                remoteSort: true,
                sorters: [{
                    property: 'ope_cnombre',
                    direction: 'ASC'
                }],
                pageSize: 10000
            });
            var comboOperador = win.down('#combooperador');
            comboOperador.bindStore(operadoresStore);
            operadoresStore.load();
            win.show();


            var comboGrupos = win.down('#grupos');
            var combostore = Ext.create('Ext.data.Store', {
                model: this.getTablasGruposSearchModelModel(),
                pageSize: 200,
                remoteSort: true
            });
            comboGrupos.bindStore(combostore);
            combostore.load();

        } else {
            win = view.win;
        }
        win.show();
    },


    onExportClick: function (button) {
        var view = button.up('reporteoperadortiemporespuestaview');
        var iframe = view.down('#Iframe');

        if (iframe.src.includes("export")) {
            iframe.src = iframe.src.replace(/&accion=exportCsv|&accion=exportSplit|&accion=export/gi, "");
        }

        // Fuerzo solo al handler NUEVOHTML
        //if ( button.action == "exportSplit") {
        //    iframe.src = iframe.src.replace("EventosByCuentaHTML", "EventosByCuentaNuevoHTML");
        //}

        let url = Ext.String.urlAppend(iframe.src, "accion=" + button.action);
        window.open(url, '_blank');
        //iframe.setSrc(url); 
    },


    onsSeleccionarCuenta: function (win, view) {
        view.win = win;
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
                    tip_ncondicion: "0",
                    filterTipo: 'nofilter',
                    caller: view
                }
            ]
        });
        win.show();

    },


    onCuentaSelected: function (selection, view, recordPreSelected) {

        Ext.Array.each(selection, function (record) {

            var cueiid = record.get('cue_iid');
            var nombre = record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre');
            view.win.down('#idcuenta').setValue(cueiid)
            view.win.down('#nombrecuenta').setValue(nombre)
            view.win.down('#sacarcuenta').show();

        });


    },


});
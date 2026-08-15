//MIGRADO2024
Ext.define('Common.controller.ReporteEventosController', {
    extend: 'Ext.app.Controller',
    stores: ['Common.store.TablaTiposStore', 'Common.store.SoftguardEstadoEstadoStore'],
    models: ['soperadoresSearchModel', 'TablaHistoricoSearchModel', 'ZonaByCuentaSearchModel', 'SoftguardCodigoAlarmaModel'],
    views: ['ReporteEventosView'],
    init: function (config) {
        // genero los eventos
        this.control({
            'reporteeventosview': {
                afterrender: this.initView
            },
            /*  'reporteeventosview #search' : {
                  click: this.onSearchClick
              },*/
            'reporteeventosview button[action=todos]': {
                click: this.onTodosClick
            },
            'reporteeventosview button[action=mail]': {
                click: this.onMailClick
            },
            'reporteeventosview #combohistorico': {
                select: this.onComboHistoricoSelect
            },
            'reporteeventosview button[action=openmenu]': {
                click: this.onOpenMenuClick
            },
            'reporteeventosview button[action=btnprint]': {
                click: this.onBtnprintClick
            },              


        });

    }, // cierro init

    initView: function (view) {

        view.baseurl = '/handler/ReporteEventosHTML';

        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token=' + Ext.util.Cookies.get('OAuth_Token'));
        var sort = [
            { "property": "r.rec_iprioridad", "direction": "ASC" },
            { "property": "r.rec_iid", "direction": "DESC" }
        ];

        view.baseurl = Ext.String.urlAppend(view.baseurl, 'sort=' + Ext.encode(sort));
        var url = Ext.String.urlAppend(view.baseurl, 'Mostrar=200');

        var now = new Date();
        var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        url = Ext.String.urlAppend(url, "FechaDesde=" + Ext.Date.format(firstDay, 'Y-m-d') + "T" + Ext.Date.format(firstDay, 'H:i:s'));

        url = Ext.String.urlAppend(url, "FechaHasta=" + Ext.Date.format(now, 'Y-m-d') + "T" + Ext.Date.format(now, 'H:i:s'));
        url = Ext.String.urlAppend(url, "viejafechacheck=1");
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        var target = view.down('#Iframe');

        // si le pasaron una cuenta
        if (view.record) {
            // oculto la seleccion de cuenta
            if (view.down('#rango')) {
                view.down('#rango').hide();
            }

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

        target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="' + window.location.protocol + "//" + window.location.hostname + (window.location.port != "" ? ":" + window.location.port : "") + '"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">' + getLocale('Cargando') + '</h1>';

        target.load({
            src: url
        });
    },

    onBtnprintClick: function (button) {
        var view = button.up('reporteeventosview');
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
        //var view = combo.up('reporteeventosview');
        var view = combo.up('window');

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

        var view = button.up('reporteeventosview');

        var filters = [];
        var url = view.baseurl;
        if (view.record) {
            var url = Ext.String.urlAppend(view.baseurl, "Cuentas=" + view.record.get('cue_iid'));
        }
        var target = view.down('#Iframe');
        target.setSrc(url);

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
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        var nombre = view.down('#nombre').getValue();
        var tipocuenta = view.down('#tipocuenta').getValue();
        var tipoevento = view.down('#tipoevento').getValue();
        var timeline = view.down('#timelinecheck').getValue();
        var cuentamadre = view.down('#cuentamadrecheck').getValue();
        var origen = view.down('#origencheck').getValue();
        var categorizacion = view.down('#categorizacioncheck').getValue();
        var categorizaciones = view.down('#combocategorizacion').getValue();
        var observaciones = view.down('#observacionescheck').getValue();
        var agruparprocesartodoscheck = view.down('#agruparprocesartodoscheck').getValue();
        var cod_nalerta = view.down('#cod_nalerta').getValue();
        //var operador = view.down('#operadorcheck').getValue();
        var resolucion = view.down('#resolucioncheck').getValue();
        var resoluciones = view.down('#comboresolucion').getValue();
        var comboestado = view.down('#comboestado').getValue();
        var combohistorico = view.down('#combohistorico').getValue();
        var codigoalarma = view.down('#codigoalarma').getValue();
        var viejafechacheck = view.down('#viejafechacheck').getValue();
        console.log(categorizaciones)

        // 05-10 Agregado por tema de TimeOut al momento de consultar muchos eventos.
        var cantidadregistros = view.down('#comboregistros').getValue();


        var url = viewparent.baseurl;


        if (timeline) {
            url = Ext.String.urlAppend(url, "Timelinechk=" + timeline);
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
            url = Ext.String.urlAppend(url, "table=" + combohistorico);
        }
        if (codigoalarma.length > 0) {
            url = Ext.String.urlAppend(url, "Codigoalarma=" + codigoalarma);
        }
        if (cod_nalerta != null) {
            url = Ext.String.urlAppend(url, "cod_nalerta=" + cod_nalerta);
        }
        if (agruparprocesartodoscheck) {
            url = Ext.String.urlAppend(url, "AgruparProcesarTodos=" + agruparprocesartodoscheck);
        }

        if (viejafechacheck.viejafechacheck == true) {
            url = Ext.String.urlAppend(url, "viejafechacheck=1");
        } else {
            url = Ext.String.urlAppend(url, "viejafechacheck=0");
        }
        if (view.record) {
            var url = Ext.String.urlAppend(url, "Cuentas=" + view.record.get('cue_iid'));
        }
        // 05-10 Agregado por tema de TimeOut al momento de consultar muchos eventos.
        if (cantidadregistros) {
            url = Ext.String.urlAppend(url, "Mostrar=" + cantidadregistros);
        } else {
            url = Ext.String.urlAppend(url, 'Mostrar=' + getParametro('CANTIDADMAXHISTORICO'));
        }
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        var target = viewparent.down('#Iframe');
        //target.getDocument().getElementsByTagName('body')[0].innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol+'//'+window.location.hostname+'/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

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
        var view = button.up('reporteeventosview');
        
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
        var view = button.up('reporteeventosview');
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
                                plugins: ['clearbutton'],
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
                                                width: 230
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
                                                margin: '0 0 0 7'
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
                                                width: 230
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
                                                margin: '0 0 0 7'
                                            }
                                        ]
                                    }, {
                                        xtype: 'combo',
                                        itemId: 'comboregistros',
                                        fieldLabel: 'Cantidad de registros',
                                        width: '100%',
                                        store: [
                                            [200, 200],
                                            [500, 500],
                                            [1000, 1000],
                                            [1500, 1500],
                                            [2000, 2000],
                                            [2500, 2500],
                                            [5000, 5000],
                                            [7500, 7500],
                                            [10000, 10000]
                                        ]
                                    }, {
                                        xtype: 'combo',
                                        itemId: 'combooperador',
                                        fieldLabel: 'Operador',
                                        displayField: 'ope_cnombre',
                                        valueField: 'ope_clogin',
                                        queryMode: 'local',
                                        width: '100%'
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Alerta',
                                        name: 'cod_nalerta',
                                        itemId: 'cod_nalerta',
                                        store: [
                                            [1, getLocale('Genera alerta')],
                                            [0, getLocale('No genera alerta')]
                                        ],
                                        width: '100%'
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
                                        width: '100%'

                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Codigo alarma',
                                        itemId: 'codigoalarma',
                                        displayField: 'Descripcion',
                                        queryMode: 'local',
                                        valueField: 'cod_ccodigo',
                                        name: "cod_cdescripcion",
                                        multiSelect: true,
                                        width: '100%'

                                    }, {
                                        xtype: 'combobox',
                                        fieldLabel: 'Categorización',
                                        itemId: 'combocategorizacion',
                                        store: "TablasResolucionesStore",
                                        multiselect: true,
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
                                        multiselect: true,
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
                                        margin: '0 0 5 0',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                fieldLabel: 'Dealer',
                                                itemId: 'dealer',
                                                enforceMaxLength: true,
                                                maxLength: 3,
                                                width: 200
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
                                                itemId: 'cuentahasta',
                                                fieldLabel: 'Cuenta hasta',
                                                enforceMaxLength: true,
                                                maxLength: 4,
                                                width: 170,
                                                margin: '0 0 0 210',
                                                labelWidth: 110
                                            }
                                        ]
                                    }

                                    , {
                                        xtype: 'textfield',
                                        fieldLabel: 'Nombre',
                                        itemId: 'nombre',
                                        width: '100%'
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: 'Tipo de cuenta',
                                        store: 'TablaTiposStore',
                                        displayField: 'Descripcion',
                                        queryMode: 'local',
                                        valueField: 'Codigo',
                                        name: "cue_ctipo",
                                        itemId: 'tipocuenta',
                                        width: '100%'
                                    }, {
                                        xtype: 'combo',
                                        itemId: 'comboestado',
                                        fieldLabel: 'Estado',
                                        displayField: 'Name',
                                        valueField: 'Value',
                                        //store: 'SoftguardEstadoEstadoStore',
                                        queryMode: 'local',
                                        width: '100%'
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
                                        fieldLabel: 'Origen'

                                    }, {
                                        xtype: 'checkbox',
                                        itemId: 'cuentamadrecheck',
                                        fieldLabel: 'Cuenta panel'

                                    }, {
                                        xtype: 'checkbox',
                                        itemId: 'categorizacioncheck',
                                        fieldLabel: 'Categorizacion'

                                    }, {
                                        xtype: 'checkbox',
                                        itemId: 'observacionescheck',
                                        fieldLabel: 'Observaciones'

                                    }, {
                                        xtype: 'checkbox',
                                        itemId: 'timelinecheck',
                                        fieldLabel: 'Timeline'

                                    }
                                /*,{
                                    xtype : 'checkbox',
                                    itemId: 'operadorcheck',
                                    fieldLabel : 'Operador'
                                    
                                }*/, {
                                        xtype: 'checkbox',
                                        itemId: 'resolucioncheck',
                                        fieldLabel: 'Resolucion'

                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                title: 'Tipo de reporte',
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'checkbox',
                                        itemId: 'agruparprocesartodoscheck',
                                        fieldLabel: 'Agrupar por Procesar todos',
                                        labelWidth: 200

                                    }, {
                                        xtype: 'radiogroup',
                                        fieldLabel: getLocale('Calcular tiempos por'),
                                        itemId: 'viejafechacheck',
                                        layout: 'vbox',
                                        width: '100%',
                                        items: [
                                            {
                                                boxLabel: 'Procesamiento del evento',
                                                name: 'viejafechacheck',
                                                inputValue: true,
                                                checked: true
                                            }, {
                                                boxLabel: 'Primer acción del operador',
                                                name: 'viejafechacheck',
                                                inputValue: false
                                            }
                                        ],
                                        labelWidth: 200
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

        } else {
            win = view.win;
        }
        win.show();
    },


});
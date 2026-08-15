Ext.define('SgAppWebReport.controller.ReporteControlIOController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['TablaHistoricoSearchModel'],
    views: ['ReporteControlIOView'],

    init: function (config) {
        this.control({
            'reportecontrolioview': {
                afterrender: this.initView,
                cuentachanged: this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'reportecontrolioview button[action=todos]': {
                click: this.onTodosClick
            },
            'reportecontrolioview button[action=mail]': {
                click: this.onMailClick
            },
            'reportecontrolioview #fechadesde': {
                select: this.onComboHistoricoSelect
            },
            'reportecontrolioview #fechahasta': {
                select: this.onComboHistoricoSelect
            },
            'reportecontrolioview button[action=openmenu]': {
                click: this.onOpenMenuClick
            },
            'reportecontrolioview #seleccionarcuenta': {
                click: this.onsSeleccionarCuenta
            },
            'reportecontrolioview button[action=export]': {
                click: this.onExportClick
            },
            'reportecontrolioview button[action=exportCsv]': {
                click: this.onExportClick
            },
            'reportecontrolioview button[action=exportSplit]': {
                click: this.onExportClick
            },
            'reportecontrolioview button[action=btnprint]': {
                click: this.onBtnprintClick
            },
        });

    },


    initView: function (view) {
        view.baseurl = '/handler/ControlIOHTML';
        view.baseurl = Ext.String.urlAppend(view.baseurl, 'token=8CDCD4D5-8284-48C0-B75A-4D3AAF379C87' );

        var url = Ext.String.urlAppend(view.baseurl, 'Mostrar=' + getParametro('CANTIDADMAXHISTORICO'));
        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());
        var target = view.down('#Iframe');

        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';
        var now = new Date();

        url = Ext.String.urlAppend(url, "FechaDesde=" + Ext.Date.format(Ext.Date.add(now, Ext.Date.DAY, -1), 'Y-m-d') + "T00:00:00");
        url = Ext.String.urlAppend(url, "FechaHasta=" + Ext.Date.format(now, 'Y-m-d') + "T" + Ext.Date.format(now, 'H:i:s'));

        //Coloco los valores por defecto para esta view
        // hago que este agrupado por usuario
        url = Ext.String.urlAppend(url, "agruparUsu=usu");
        url = Ext.String.urlAppend(url, "agruparUsuOrden=ASC");
        // filtro por tipo de evento deben ser Ingreso, Egreso y Asistencia. cod_ntipo in 8,9,10
        url = Ext.String.urlAppend(url, "TipoEvento=8,9");



        target.load({
            src: url
        });
    },

    onTodosClick: function (button) {
        var view = button.up('reportecontrolioview');
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
    onBtnprintClick: function (button) {
        var view = button.up('reportecontrolioview');
        var target = view.down('#Iframe');
        url = target.src;
        var contenido;
        fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (body) { 
            printHTMLContent(body);            
        });
    },
    onSearchClick: function (button, viewparent) {
        var view = button.up('reporteeventosview') ? button.up('reporteeventosview') : button;
        var filters = [];
        var fechaDesde = view.down('#fechadesde').getValue();
        var HoraDesde = view.down('#horadesde').getValue();
        var fechaHasta = view.down('#fechahasta').getValue();
        var HoraHasta = view.down('#horahasta').getValue();
        var nombrecuenta = view.down('#nombrecuenta').getValue();

        var idcuenta = view.down('#idcuenta').getValue();
        var url = viewparent.baseurl;

        if (nombrecuenta) {
            url = Ext.String.urlAppend(url, "nombrecuenta=" + nombrecuenta);
        }


        if (fechaDesde) {
            url = Ext.String.urlAppend(url, "FechaDesde=" + Ext.Date.format(new Date(fechaDesde), 'Y-m-d') + "T" + Ext.Date.format(new Date(HoraDesde), 'H:i:s'));
        }

        if (fechaHasta) {
            url = Ext.String.urlAppend(url, "FechaHasta=" + Ext.Date.format(new Date(fechaHasta), 'Y-m-d') + "T" + Ext.Date.format(new Date(HoraHasta), 'H:i:s'));
        }

        var reportType = viewparent.reportType == 'historico_eventos';


        if (idcuenta) {
            var url = Ext.String.urlAppend(url, "Cuentas=" + idcuenta);
        }

        url = Ext.String.urlAppend(url, '_dc=' + new Date().getTime());

        url = Ext.String.urlAppend(url, "TipoEvento=8,9");
        console.log("URL BUSCAR - - -- ", url)
        var target = viewparent.down('#Iframe');
        //target.getDoc().innerHTML = '<h1 style="margin:100px auto 0 auto; width:220px; text-align:center;font-size: 15px;font-weight: bold;font-family: arial;"><img src="'+window.location.protocol + "//" +window.location.hostname+(window.location.port!=""?":"+window.location.port:"")+'"/desktop/images/loading_softguard.gif" border="0" alt="SoftGuard loading" title="SoftGuard loading">'+getLocale('Cargando')+'</h1>';

        url = url.replace(/#/g, '%23');

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
        var view = button.up('reportecontrolioview');
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

    onExportClick: function (button) {
        var view = button.up('reportecontrolioview');
        var iframe = view.down('#Iframe');

        if (iframe.src.includes("export")) {
            iframe.src = iframe.src.replace(/&accion=exportCsv|&accion=exportSplit|&accion=export/gi, "");
        }

        // Fuerzo solo al handler NUEVOHTML
        if (button.action == "exportSplit") {
            iframe.src = iframe.src.replace("EventosByCuentaHTML", "EventosByCuentaNuevoHTML");
        }
        
          let url = Ext.String.urlAppend(iframe.src, "accion=" + button.action);
        Ext.MessageBox.show({
            msg: 'Exportando a Excel...',
            progressText: 'Cargando...',
            width: 50,
            wait: true,
            waitConfig: { interval: 100 }
        });

        location.href = url;

        setTimeout(function () {
            Ext.MessageBox.hide(); // Ocultar el mensaje después de 5 segundos
        }, 5000)
    },

    onOpenMenuClick: function (button) {
        var controller = this;
        var view = button.up('reportecontrolioview');
        var win;

        if (!view.win) {
            win = view.win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                overflowY: 'scroll',
                layout: {
                    type: 'anchor',
                    manageOverflow: 2,
                    reserveScrollbar: true
                },
                closeAction: 'close',
                title: 'Filtros',
                width: 600,
                height: 280,
                border: false,
                itemId: 'searchwin',
                items: [
                    {
                        xtype: 'form',
                        bodyPadding: '5',
                        defaultButton: '#searchwin #search',
                        itemId: 'form',
                        layout: 'anchor',
                        closeAction: 'close',
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
                            },
                            {
                                xtype: 'fieldset',
                                title: 'Eventos',
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        padding: '0 0 0 0',
                                        border: 0,
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
                                        xtype: 'fieldset',
                                        padding: '0 0 0 0',
                                        border: 0,
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
                                    }
                                ]
                            }, {
                                xtype: 'fieldset',
                                itemId: 'rango',
                                title: 'Cuentas',
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        padding: '0 0 0 0',
                                        border: 0,
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
            var now = new Date();
            win.down('#fechadesde').setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            win.down('#fechadesde').setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
            win.down('#fechadesde').setValue(Ext.Date.add(now, Ext.Date.DAY, -1));

            win.down('#fechahasta').setMinValue(Ext.Date.getFirstDateOfMonth(new Date()));
            win.down('#fechahasta').setMaxValue(Ext.Date.getLastDateOfMonth(new Date()));
            win.down('#fechahasta').setValue(now);
        } else {
            win = view.win;
        }
        win.show();
    },

       onComboHistoricoSelect: function (combo, records, options) {
        var view = combo.up('window');

        //var value = records[0].get('c_periodo');
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
                    filterTipo: 'nofilter',
                    caller: view
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
            view.win.down('#idcuenta').setValue(cueiid)
            view.win.down('#nombrecuenta').setValue(nombre)
            view.win.down('#sacarcuenta').show();
        });
    },

});
Ext.define('SgAppWebReport.controller.ExportarReporteEventosController', {
    extend: 'Ext.app.Controller',
    stores: ['Common.store.ProvinciasStore', 'Common.store.TablasResolucionesStore'],
    models: ['TablasResolucionesSearchModel', 'TablasTiposSearchModel', 'TablasGruposSearchModel', 'TablaHistoricoSearchModel', 'TablasCategorizacionSearchModel', 'soperadoresSearchModel', 'SoftguardCodigoAlarmaModel', 'ZonaSearchModel', 'ZonaByCuentaSearchModel'],
    views: ['ExportarReporteEventosView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'exportarreporteeventosview': {
                afterrender: this.initView,
                onComboHistoricoSelect: this.onComboHistoricoSelect,
                onCleanDates: this.onCleanDates,
                onSeleccionarCuenta: this.onSeleccionarCuenta,
                selectedEvents: this.eventsSelected,
                cuentachanged: this.onCuentaSelected,
                cuentaselected: this.onCuentaSelected
            },
            'exportarreporteeventosview  button[action=export]': {
                click: this.onExportClick
            },
            'exportarreporteeventosview #agregarevento': {
                click: this.onAgregarEventoClick
            },
            'exportarreporteeventosview button[action=btnprint]': {
                click: this.onBtnprintClick
            },
        })
    },

    onAgregarEventoClick: function (btn) {
        var view = btn.up('exportarreporteeventosview');
        var filter = [];

        var myWindow = Ext.widget('window', {
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true,
            items: [{
                xtype: 'filtereventselecterhelperview',
                eventSelected: view.down('#eventoshide').getValue(),
                caller: view,
                limitEventSelect: 25,
                filter: filter
            }],
            layout: 'fit'
        }).show();

        myWindow.on('selectedEvents', function () {
            console.log(arguments)
        })
    },

    initView: function (view) {
        console.log(view);
        view.baseurl = '/handler/ExcelExport?search=ReporteHistorico&export=1&filename=ExportadorEventos.xlsx';
        // Seteo la fecha por default en hoy
        var now = new Date();
        view.down('#fechadesde').setMinValue(Ext.Date.getFirstDateOfMonth(now));
        view.down('#fechadesde').setMaxValue(Ext.Date.getLastDateOfMonth(now));
        view.down('#fechadesde').setValue(Ext.Date.add(now, Ext.Date.DAY, -1));

        view.down('#fechahasta').setMinValue(Ext.Date.getFirstDateOfMonth(now));
        view.down('#fechahasta').setMaxValue(Ext.Date.getLastDateOfMonth(now));
        view.down('#fechahasta').setValue(now);

        // Inicio los Combos
        // Tablas historicas
        var historicoStore = Ext.create('Ext.data.Store', {
            model: this.getTablaHistoricoSearchModelModel(),
            autoload: false,
            sorters: [{
                property: 'c_periodo',
                direction: 'DESC'
            }],
            pageSize: 10000
        });
        var comboHistorico = view.down('#combohistorico');
        comboHistorico.bindStore(historicoStore);
        historicoStore.load();

        // Codigos de Alarma
        /*  var codigoAlarmaStore = Ext.create('Ext.data.Store', {
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
          codigoAlarmaStore.load();*/

        // Operadores
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
        var comboOperador = view.down('#combooperador');
        comboOperador.bindStore(operadoresStore);
        operadoresStore.load();

        // Grupo        
        var combostore = Ext.create('Ext.data.Store', {
            model: this.getTablasGruposSearchModelModel(),
            pageSize: 200,
            remoteSort: true
        });
        var comboGrupos = view.down('#grupos');
        comboGrupos.bindStore(combostore);
        combostore.load();

        // Tipo de Cuenta
        var tipoCuentaStore = Ext.create('Ext.data.Store', {
            model: this.getTablasTiposSearchModelModel(),
            autoload: false,
            sorters: [{
                property: 'tip_cdescripcion',
                direction: 'ASC'
            }],
            pageSize: 10000
        });
        var comboTipoCuenta = view.down('#tipocuenta');
        comboTipoCuenta.bindStore(tipoCuentaStore);
        tipoCuentaStore.load();
    },

    eventsSelected: function (records, view) {
        var textarea = view.down('#eventos');
        var text = '';
        var arrayEventos = [];

        Ext.Array.each(records.items, function (record) {    
            text = text + record.get('Descripcion') + '\r\n';
            arrayEventos.push(record.get('cod_ccodigo'));
        });
        textarea.setValue(text);
        view.down('#eventoshide').setValue(arrayEventos.join(','));
        //view.record.set('filtroAlarmas', arrayEventos.join(','));
    },

    // Funcion para la manipulacion de fechas segun combo historico
    onComboHistoricoSelect: function (combo, records, options) {
        var view = combo.up('exportarreporteeventosview');

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

    // Agregado para cuando, se elimina el combo de Historico, se ponga la fecha del mes corriente
    onCleanDates: function (combo, records, options) {
        var controller = this;
        var view = combo.up('exportarreporteeventosview');
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

    // Funcion del combo grupos
    onGrupoChange: function (combo, records, options) {
        var view = combo.up('exportarreporteeventosview');
        var value = records[0].get('gru_ccodigo');
        var t = this;
        var codigosAlarmaStore = Ext.create('Ext.data.Store', {
            model: this.getTablasCodigosAlarmaSearchModelModel(),
            pageSize: 200,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property: 'cod_cGrupo',
                    value: value
                }
            ]
        });

        codigosAlarmaStore.load({
            callback: function (records, opciones, success) {
                if (opciones.success) {
                    var codigosalarma = view.down('#codigoalarma');
                    codigosalarma.clearValue();
                    codigosalarma.select(records);
                }
            }
        });

    },

    // Seleccionador de cuenta
    onSeleccionarCuenta: function (view) {

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
            view.down('#idcuenta').setValue(cueiid)
            view.down('#nombrecuenta').setValue(nombre)
            view.down('#sacarcuenta').show();
            view.down('#zona').enable();


            var zoneStore = Ext.create('Ext.data.Store', {
                model: controller.getZonaSearchModelModel(),
                remoteFilter: true,
                pageSize: 250,
                remoteSort: true,
                sorters: {
                    property: 'orderCodigo',
                    direction: 'ASC'
                },
                filters: [
                    {
                        property: 'zon_ccodigo:LIKENOT',
                        value: 'PAR'
                    }, {
                        property: 'zon_ccodigo:ISNOTNULLOREMPTYTRIM',
                        value: ''
                    }, {
                        property: 'zon_iidcuenta',
                        value: record.get('cue_iid')
                    }
                ]
            });

            view.down('#zona').bindStore(zoneStore);

            zoneStore.load({
                callback: function () {
                    view.down('#zona').setDisabled(false)
                }
            });


        });
    },
    onExportClick: function (button) {
        var view = button.up('exportarreporteeventosview'); // Obtiene la vista desde el botón
        var url = view.baseurl; // Obtiene la URL definida en la vista
        var grupos = view.down('#grupos').getValue();
        var fechadesde = view.down('#fechadesde').getValue();
        var fechahasta = view.down('#fechahasta').getValue();
        var horadesde = view.down('#horadesde').getValue();
        var horahasta = view.down('#horahasta').getValue();
        var horahasta = view.down('#horahasta').getValue();
        var resoluciones = view.down('#comboresolucion').getValue();
        var agruparcuentacheck = view.down('#agruparcuentacheck').getValue();
        var seleccionarcuenta = view.down('#idcuenta').getValue();
        var combooperador = view.down('#combooperador').getValue();
        var codigoalarma = view.down('#eventoshide').getValue();
        //var filtroAlarmas = view.down('#eventoshide').getValue();
        var tipocuenta = view.down('#tipocuenta').getValue();
        var idExtendidoDesde = view.down('#idExtendidoDesde').getValue();
        var idExtendidoHasta = view.down('#idExtendidoHasta').getValue();
        var dealer = view.down('#dealer').getValue();
        var dealerHasta = view.down('#dealerhasta').getValue();
        var cuentadesde = view.down('#cuentadesde').getValue();
        var cuentahasta = view.down('#cuentahasta').getValue();
        var nombre = view.down('#nombre').getValue();
        var provincia = view.down('#comboProvincia').getValue();
        var tipocuenta = view.down('#tipocuenta').getValue();
        var eventosOperadorCheck = view.down('#eventosOperadorCheck').getValue();
        var comboregistros = view.down('#comboregistros').getValue();
        var combocategorizacion = view.down('#combocategorizacion').getValue();
        var comboHistoricoSelect = view.down('#combohistorico').getValue();

        if(view.down('#combohistorico').getValue()){
            url = Ext.String.urlAppend(url, "table="+ comboHistoricoSelect);
        }

        if (provincia) {
            url = Ext.String.urlAppend(url, "provincia=" + provincia);
        }

        if (comboregistros) {
            url = Ext.String.urlAppend(url, "limit=" + comboregistros);
        } else {
            url = Ext.String.urlAppend(url, 'Mostrar=' + getParametro('CANTIDADMAXHISTORICO'));
        }
        if (nombre) {
            url = Ext.String.urlAppend(url, "Nombre=" + nombre);
        }
        if (dealer) {
            url = Ext.String.urlAppend(url, "cue_clinea=" + dealer);
        }


        if (dealerHasta) {
            url = Ext.String.urlAppend(url, "cue_clineaHasta=" + dealerHasta);
        }


        if (cuentadesde) {
            url = Ext.String.urlAppend(url, "cue_ncuentaDesde=" + cuentadesde);
        }

        if (cuentahasta) {
            url = Ext.String.urlAppend(url, "cue_ncuentaHasta=" + cuentahasta);
        }

        if (grupos) {

            url = Ext.String.urlAppend(url, "cod_cgrupo=" + grupos);

        }

        if (fechadesde) {
            url = Ext.String.urlAppend(url, "FechaDesde=" + Ext.Date.format(new Date(fechadesde), 'Y-m-d') + "T" + Ext.Date.format(new Date(horadesde), 'H:i:s'));
        }

        if (fechahasta) {
            url = Ext.String.urlAppend(url, "FechaHasta=" + Ext.Date.format(new Date(fechahasta), 'Y-m-d') + "T" + Ext.Date.format(new Date(horahasta), 'H:i:s'));
        }
        if (agruparcuentacheck) {
            url = Ext.String.urlAppend(url, "agruparOrden=" + agruparcuentacheck);
        }
        if (resoluciones) {
            url = Ext.String.urlAppend(url, "Resolucion=" + resoluciones);
        }
        if (seleccionarcuenta) {
            url = Ext.String.urlAppend(url, "Cuentas=" + seleccionarcuenta);
        }
        if (combooperador) {
            url = Ext.String.urlAppend(url, "Operador=" + combooperador);
        }
        if (codigoalarma) {
            url = Ext.String.urlAppend(url, "Codigosalarma=" + codigoalarma);
        }
        if (tipocuenta) {
            url = Ext.String.urlAppend(url, "TipoCuentaId=" + tipocuenta);
        }
        if (idExtendidoDesde) {
            url = Ext.String.urlAppend(url, "idExtendidoDesde=" + idExtendidoDesde);
        }
        if (idExtendidoHasta) {
            url = Ext.String.urlAppend(url, "idExtendidoHasta=" + idExtendidoHasta);
        }

        if (eventosOperadorCheck) {
            url = Ext.String.urlAppend(url, "Estados=" + 3);
        }
        if (combocategorizacion) {
            url = Ext.String.urlAppend(url, "Categorizacion=" + combocategorizacion);
        }

        // Redirige al cliente a la URL
        url = Ext.String.urlAppend(url, "token=" + Ext.util.Cookies.get( 'OAuth_Token' ));
        window.location.href = url;

    },

    onBtnprintClick: function (button) {
        var view = button.up('exportarreporteeventosview');
        var target = view.down('#Iframe');
        url = target.src;
        var contenido;
        fetch(url)
            .then(function (response) {
                return response.text();
            })
            .then(function (body) {
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
            });
    },

})

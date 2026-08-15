//MIGRADO2024
Ext.define('Common.controller.EventosTrGridController', {
    extend: 'Ext.app.Controller',
    stores: ['Common.store.TablasGruposStore', 'Common.store.EventoEstadoStore', 'Common.store.EventoOrigenStore', 'Common.store.EventoTipoStore', 'Common.store.EventoPrioridadesStore'],
    models: ['TablasGruposSearchModel', 'TablasCodigosAlarmaSearchModel', 'EventoTimelineModel', 'TablaHistSearchModel', 'EventosPendientesSearchModel', 'CuentaRecepcionModel', 'EventosTiempoRealModel', 'NameValueModel', 'SoftguardCodigoAlarmaModel', 'ComboEventosModel'],
    views: ['EventosTrGridView'],
    init: function (config) {
        this.control({
            'eventostrgridview': {
                afterrender: this.initView,
                //renderManual: this.initView,
                activate: this.onActivate,
                itemdblclick: this.onItemClick,
                openEvent: this.onItemClick
            },
            'eventostrgridview button[action=search]': {
                click: this.onBuscarClick
            },
            'eventostrgridview #comboEstados': {
                //	select : this.onComboSelect
            },
            'eventostrgridview #comboOrigenes': {
                //	select : this.onComboSelect
            },
            'eventostrgridview #comboTipos': {
                //	select : this.onComboSelect
            },
            'eventostrgridview #dealer': {
                //	change : this.onComboSelect
            },
            'eventostrgridview button[action=play]': {
                click: this.onPlayClick
            },
            'eventostrgridview button[action=stop]': {
                click: this.onStopClick
            },
            'eventostrgridview button[action=groupAlarmas]': {
                click: this.onGroupAlarmasClick
            },
            'eventostrgridview button[action=groupPrioridad]': {
                click: this.onGroupPrioridadClick
            },
            'eventostrgridview button[action=groupCuenta]': {
                click: this.onGroupCuentaClick
            },
            'eventostrgridview #grupos': {
                select: this.onGrupoChange,
                //  change : this.onGrupoChangeClear
            },
            'eventostrgridview #dealer': {
                //	change : this.onDealerChange
            },
            'eventostrgridview #grupos-excluir': {
                //	select : this.onGrupoExcluirChange,
                //  change : this.onGrupoExcluirChangeClear
            },
            'eventostrgridview #procesartodosfull': {
                click: this.onProcesarTodosFullClick
            },
            'eventostrgridview button[action=soloAlarmas]': {
                click: this.onSoloAlarmasClick
            },
            'eventostrgridview #clearfilters': {
                click: this.onClearFiltersClick
            },
            'eventostrgridview #refresh': {
                // saco el refresh porque llama 2 veces.
                //click : this.onRefreshClick
            },
            'eventostrgridview #combohistorico': {
                select: this.onComboHistoricoSelect,
                change: this.onComboHistoricoChange

            },
        });
    }, // cierro init
    onComboHistoricoChange: function (combo, records, eOpts) {
        this.onCleanDates(combo, records, eOpts);
    },
    // Agregado para cuando, se elimina el combo de Historico, se ponga la fecha del mes corriente
    onCleanDates: function (combo, records, options) {
        var controller = this;
        var view = combo.up('eventostrgridview');
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
        var view = combo.up('eventostrgridview');

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


    onRefreshClick: function (btn) {
        var view = btn.up('eventostrgridview')
        this.loadData(view);
    },

    onClearFiltersClick: function (button, event, options) {
        var view = button.up('eventostrgridview');

        if (view.down('#comboOrigenes').isVisible()) {
            view.down('#comboOrigenes').setValue('');
        }
        if (view.down('#comboTipos').isVisible()) {
            view.down('#comboTipos').setValue('');
        }
        if (view.down('#grupos').isVisible()) {
            view.down('#grupos').setValue('');
        }
        if (view.down('#dealer').isVisible()) {
            view.down('#dealer').setValue('');
        }
        if (view.down('#grupos-excluir').isVisible()) {
            view.down('#grupos-excluir').setValue('');
        }
        if (view.down('#comboEstados').isVisible()) {
            view.down('#comboEstados').setValue('');
        }
        if (view.down('#comboalarmas').isVisible()) {
            view.down('#comboalarmas').setValue('');
        }
        if (view.down('#prioridad').isVisible()) {
            view.down('#prioridad').setValue('');
        }
        if (view.down('#fechadesde').isVisible()) {
            view.down('#fechadesde').setValue('');
        }
        if (view.down('#fechahasta').isVisible()) {
            view.down('#fechahasta').setValue('');
        }
        if (view.down('#cuenta').isVisible()) {
            view.down('#cuenta').setValue('');
        }
        var view = button.up('eventostrgridview');
        this.loadData(view);
    },

    onSoloAlarmasClick: function (button, event, options) {
        var view = button.up('eventostrgridview');
        this.loadData(view);
    },

    onProcesarTodosFullClick: function (button, event, options) {
        var view = button.up('eventostrgridview');
        var record = view.record;

        var store = view.store;
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            translate: false,
            forceClose: true,
            title: getLocale('Se procesaran todos los  elementos'),
            closeAction: 'hide',
            caller: view,
            fieldName: 'udw_clave',
            modal: true,
            width: 700,
            height: 630,
            border: false,
            record: record,
            closable: false,

            items: [
                {
                    xtype: 'procesartodoformview',
                    estados: view.estados,
                    condiciones: view.condiciones,
                    record: record,
                    filters: view.procesartodosFilters ? view.procesartodosFilters : '',
                }
            ]
        });
        win.show();
    },
    procesarTodoFull: function () {

    },
    onDealerChange: function (field, newValue, oldValue) {
        var view = field.up('eventostrgridview');

        if (newValue != '') {
            view.grupoOptions = '';
            this.loadData(view);
        }
    },

    onGrupoChangeClear: function (field, newValue, oldValue) {
        var view = field.up('eventostrgridview');
        if (newValue == '') {
            view.grupoOptions = '';
            this.loadData(view);
        }
    },

    onGrupoExcluirChangeClear: function (field, newValue, oldValue) {
        var view = field.up('eventostrgridview');
        if (newValue == '') {
            view.grupoOptions = '';
            this.loadData(view);
        }
    },
    onActivate: function (view) {
        this.loadData(view);
    },

    popularFiltro: function (comboObj, itemsEnambled, fieldValueName) {
        if (itemsEnambled) {
            var fieldValueName = typeof fieldValueName !== 'undefined' ? fieldValueName : 'Value';
            var combo = comboObj;
            var comboStore = combo.getStore();

            var clone = deepCloneStore(comboStore);
            comboStore.removeAll();
            var arrValues = [];
            Ext.Array.each(clone.data.items, function (record) {
                //console.log(record.get(fieldValueName),itemsEnambled)
                if (Ext.Array.contains(itemsEnambled.split(','), record.get(fieldValueName).toString())) {
                    comboStore.add(record);
                    arrValues.push(record)
                }

            })
            combo.setValue(arrValues);
        }
    },
    initView: function (view) {
        var me = this;
        var viewport = view.up('#viewport');
        var estados = view.down('#comboEstados');
        var mygrid = view
        var record = view.record;
        console.log("eventos tr grid init view: ", view)
        //view.groupingFeature = view.getView().getFeature('grouping');
        //view.groupingFeature.disable();
        //view.groupingFeature.lastGroupers = null;
        //view.groupingFeature.block();
        if (!view.interval || view.interval == 0)
            view.interval = 2000;

        if (view.showEvents) {
            view.down('#comboalarmas').hide()
        }

        if (view.Origenes) {
            view.down('#comboOrigenes').hide()
        }


        //veo que filtros vienen
        //ORIGENES
        me.popularFiltro(view.down('#comboOrigenes'), view.showOrigenes);

        //ESTADOS
        me.popularFiltro(view.down('#comboTipos'), view.showTipo);
        if (view.hideTypeFilter) {
            view.down('#comboTipos').hide()
        }

        //PRIORIDADES
        me.popularFiltro(view.down('#prioridad'), view.showPrioridad);
        var comboGrupos = view.down('#grupos');
        var combostore = Ext.create('Ext.data.Store', {
            model: this.getTablasGruposSearchModelModel(),
            pageSize: 200,
            remoteFilter: true,
            remoteSort: true
        });
        comboGrupos.bindStore(combostore);
        combostore.load({
            callback: function () {
                //GRUPOS
                me.popularFiltro(view.down('#grupos'), view.showGrupo, 'gru_ccodigo');
            }
        });
        if (view.hiddenDealerFilter) {
            view.down('#dealer').hide();
        }

        var sorters = [
            {
                property: 'rec_tfechahora',
                direction: 'DESC'
            }
        ];

        if (view.sorters) {
            sorters = view.sorters;
        }

        view.me = this;

        var estadoStore = this.getEventoEstadoStoreStore();
        estados.bindStore(deepCloneStore(estadoStore));

        var titleOriginal = view.title;

        // 🔹 Inicializo la fecha desde con el primer día del mes actual
        view.FechaDesde = Ext.Date.getFirstDateOfMonth(new Date());

        var mystore = Ext.create('Ext.data.Store', {
            model: this.getCuentaRecepcionModelModel(),
            remoteGroup: false,
            remoteSort: true,
            remoteFilter: true,
            autoDestroy: true,
            listeners: {
                beforeload: me.onBeforeload,
                load: function (store) {
                    view.fireEvent('storeLoaded', view, mystore);
                    if (store.totalCount > 0) {
                        view.setTitle(titleOriginal + ' (' + store.totalCount + ')');
                    } else {
                        view.setTitle(titleOriginal);
                    }

                    if (view.parentTabpanel) {
                        view.parentTabpanel.fireEvent('totalCount', view.parentTabpanel, store.totalCount);
                    }
                }
            },
            sorters: sorters
        });

        //mygrid.bindStore(mystore);
        mygrid.reconfigure(mystore);
        mystore.grid = mygrid;
        mystore.view = view;
        mystore.load();

        var pagingtoolbar = view.down('#paging');
        pagingtoolbar.bindStore(mystore);


        if ((view.estados || view.estados == 0)) {
            estados.setValue(view.estados);
            estados.hide();
        } else {
            //estados.setValue([0,1,2,4,9]);
            estados.show();
        }

        if (view.showEstadosFilter) {
            var estadoStore = estados.getStore();

            estadoStore.filterBy(function (record) {
                return Ext.Array.contains(view.estados, record.get('Value'))
            })

            if (view.estadosPreselected) {
                estados.setValue(view.estadosPreselected);
            } else {
                estados.setValue(view.estados);
            }

            estados.show();
        }


        // si le pasaron una cuenta la agrega al filtro

        if (view.record) {
            view.Cuentas = view.record.get('cue_iid');
            view.down('gridcolumn[dataIndex="rec_iidcuenta"]').hide();
        }
        /****
         * Esto se armo el 10/08/2016 para sacar el refresh de todos lados
         * A pedido de Rodrigo, por skype
         * */
        view.noRefresh = true;
        if (view.noRefresh) {
            view.down('#play').hide()
            view.down('#stop').hide()
        } else {
            view.task = Ext.TaskManager.start({
                args: [view, this],
                run: this.loadData,
                interval: view.interval
            });
        }
        var comboGruposExcluir = view.down('#grupos-excluir');

        comboGruposExcluir.bindStore(combostore);
        combostore.load();

        if (view.showMaximizer && view.showMaximizer != false) {
            view.addTool({
                type: 'maximize',
                itemId: 'maximizer',
                handler: function (event, img, view, tool) {
                    var view = tool.up('eventostrgridview');
                    var tabpanel = tool.up('tabpanel');
                    var record = view.record;

                    var win = Ext.create('Ext.Window', {
                        layout: 'fit',
                        title: 'Eventos de la cuenta (' + record.get('cue_clinea') + '-' + record.get('cue_ncuenta') + ' ' + record.get('cue_cnombre') + ') ' + view.nombreEvento,
                        closeAction: 'hide',
                        width: 750,
                        height: 550,
                        border: true,
                        modal: false,
                        view: view,
                        items: [
                            {
                                xtype: 'eventostrgridview',
                                caller: view,
                                showMaximizer: false,
                                record: record

                            }
                        ]
                    });
                    win.show();
                }
            });
        }
        var codAlarmaFilter = [];

        if (view.for_cProtocolo) {
            codAlarmaFilter.push({ property: 'for_cProtocolo', value: view.for_cProtocolo })
        }
        var storeComboAlarmas = Ext.create('Ext.data.Store', {
            model: this.getSoftguardCodigoAlarmaModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            sorters: [{
                property: 'cod_cdescripcion',
                direction: 'ASC'
            }],
            filters: codAlarmaFilter,
        })
        view.down('#comboalarmas').bindStore(storeComboAlarmas);
        storeComboAlarmas.load({
            callback: function () {
                storeComboAlarmas.remoteFilter = false;
            }
        });

        view.headerCt.purgeCache();
        var combo = view.down('#feventos');

        if (combo) { // daba error porque no encontraba el combo, emparcho (dedalo)
            var combostoreeventos = Ext.create('Ext.data.Store', {
                model: this.getComboEventosModelModel()
            });

            combo.bindStore(combostoreeventos);
            var eventos = getParametro('CODALRFALLAAC');
            eventos = eventos.split('|').join();
            combostoreeventos.add({ 'field1': eventos, 'field2': getLocale('Fallo de energía') });
            Ext.Ajax.request({
                url: '/rest/search/CodigosFalloTest',
                method: 'GET',
                success: function (response, action) {
                    var json = Ext.JSON.decode(response.responseText);
                    var objects = json.rows;

                    var eventos = Ext.Array.pluck(objects, "tst_cAlarma").join();

                    combostoreeventos.add({ 'field1': eventos, 'field2': getLocale('Fallo de enlace') });
                }
            });

            combostoreeventos.add({ 'field1': 'LOW', 'field2': getLocale('Batería baja') });
            combostoreeventos.add({ 'field1': 'OVF,CVF,OSA,OPF,CSA,CLF,NYO,NYC', 'field2': getLocale('Apertura y cierres fuera de horario') });

            if (view.hideAlarmFilter) {
                combo.hide()
            }
        }
        if (view.hideComponents) {
            Ext.Array.each(view.hideComponents, function (comp) {
                var _comp = view.down(comp);
                if (_comp) {
                    _comp.hide();
                    _comp.disable();
                }
            })
        }
        var historicoStore = Ext.create('Ext.data.Store', {
            model: this.getTablaHistSearchModelModel(),
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

    },

    onGrupoChange: function (combo, records, options) {
        var view = combo.up('eventostrgridview');
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

        view.grupoOptions = '';

        codigosAlarmaStore.load({
            callback: function (records, opciones, success) {
                if (opciones.success) {
                    Ext.Object.each(records, function (key, value) {

                        //console.log(value.get('cod_ccodigo'));
                        if (key != 0) {
                            view.grupoOptions += ',';
                        }

                        view.grupoOptions += value.get('cod_ccodigo');

                    });
                    if (options.eventos != '') {
                        t.loadData(view);
                    } else {
                        notifyError('No hay códigos de alarma en este grupo');
                    }
                }
            }
        });
    },
    onGrupoExcluirChange: function (combo, records, options) {
        var view = combo.up('eventostrgridview');

        var value = records[0].get('gru_ccodigo');
        var t = this;
        var codigosAlarmaStore = Ext.create('Ext.data.Store', {
            model: this.getTablasCodigosAlarmaSearchModelModel(),
            pageSize: 200,
            remoteSort: true,
            remoteFilter: true,
            filters: [
                {
                    property: 'cod_cGrupo:NOT IN',
                    value: value
                }
            ]
        });

        view.grupoOptions = '';

        codigosAlarmaStore.load({
            callback: function (records, opciones, success) {
                if (opciones.success) {
                    Ext.Object.each(records, function (key, value) {

                        //console.log(value.get('cod_ccodigo'));
                        if (key != 0) {
                            view.grupoOptions += ',';
                        }

                        view.grupoOptions += value.get('cod_ccodigo');

                    });
                    if (options.eventos != '') {
                        t.loadData(view);
                    } else {
                        notifyError('No hay códigos de alarma en este grupo');
                    }
                }
            }
        });
    },

    onComboSelect: function (combo, records, eOpts) {
        var view = combo.up('eventostrgridview');
        this.loadData(view);
    },
    onBuscarClick: function (button, event, options) {
        var view = button.up('eventostrgridview');
        this.loadData(view);
    },

    onPlayClick: function (button, event, options) {
        var view = button.up('eventostrgridview');
        var task = view.task;
        Ext.TaskManager.start(task);
    },

    onStopClick: function (button, event, options) {
        var view = button.up('eventostrgridview');
        var task = view.task;
        Ext.TaskManager.stop(task);
    },

    onGroupAlarmasClick: function (button, event, options) {
        var view = button.up('eventostrgridview');
        var myGrid = view,
            myStore = myGrid.store;

        var grouping = view.getView().features[0];
        if (button.pressed) {
            grouping.enable();
            myStore.group('rec_calarma', 'ASC');
        } else {
            grouping.disable();
            myStore.clearGrouping();
        }
    },

    onGroupCuentaClick: function (button, event, options) {
        var view = button.up('eventostrgridview');
        var myGrid = view,
            myStore = myGrid.store;
        var grouping = view.getView().features[0];
        if (button.pressed) {
            grouping.enable();
            myStore.group('rec_iidcuenta', 'ASC');
        } else {
            grouping.disable();
            myStore.clearGrouping();
        }
    },

    onGroupPrioridadClick: function (button, event, options) {
        var view = button.up('eventostrgridview');
        var myGrid = view,
            myStore = myGrid.store;
        var grouping = view.getView().features[0];
        if (button.pressed) {
            grouping.enable();
            myStore.group('rec_iPrioridad', 'ASC');
        } else {
            grouping.disable();
            myStore.clearGrouping();
        }
    },
    loadData: function (view, showMask) {
        var controller = this;
        var myGrid = view,
            myStore = myGrid.store;
        //para que haga el load del store aunque no este al frente  
        if (view.evaluarNuevosEventosYEnviarAlFrente && !myStore.isLoading()) {
            myStore.load({
                callback: function () {
                    //view.setLoading(false); // el setloading maneja la mascara nada mas
                }
            });
        } else if (myGrid.isVisible(true) && !myStore.isLoading()) {
            // if(showMask==true){view.setLoading(true)};
            // view.setLoading(true)
            myStore.loadPage(1, {
                scope: view, callback: function (records, operation) {
                    if (operation.success) {
                        if (!view.opened && view.autoOpen) {
                            Ext.Array.each(records, function (evento) {
                                view.me.onItemClick(myGrid, evento);
                            })
                            view.opened = true;
                        }
                        //view.setLoading(false);
                    } else {

                        Ext.Msg.alert("No se encontraron resultados", "No hay resultados para la busqueda realizada.", function (btnText, sInput) {

                            window.href = '/';

                        }, this);

                    }
                }
            });
        }
    },

    onBeforeload: function (store, operation, options) {
        if (operation.scope)
            var view = operation.scope;
        else
            var view = store.view;

        console.log('Filtrando EventosTrGridView');

        var params = {};
        var estados = view.down('#comboEstados');
        var origenes = view.down('#comboOrigenes');
        var tipos = view.down('#comboTipos');
        var alarma = view.down('#comboalarmas');
        var dealer = view.down('#dealer');
        var prioridad = view.down('#prioridad');
        var fechadesde = view.down('#fechadesde');
        var fechahasta = view.down('#fechahasta');
        var cuenta = view.down('#cuenta');
        var comboeventos = view.down('#feventos');
        var cod_cgrupoExcluir = view.down('#grupos-excluir').getValue()
        var fehcadesdeValue = '';
        var table = view.down('#combohistorico').getValue();
        // --- FechaDesde ---
        var fehcadesdeValue = '';

        if (fechadesde && fechadesde.getValue()) {
            fehcadesdeValue = fechadesde.getValue();
        } else if (view.FechaDesde) {
            fehcadesdeValue = view.FechaDesde;
        } else {
            // si no hay nada en la vista, arranco con la fecha actual
            fehcadesdeValue = new Date();
        }

        // 🔹 Siempre normalizo al primer día del mes
        fehcadesdeValue = Ext.Date.getFirstDateOfMonth(fehcadesdeValue);

        // 🔹 Si tu API necesita formato YYYY-MM-DD
        fehcadesdeValue = Ext.Date.format(fehcadesdeValue, 'Y-m-d');


        if (table != '') {
            origenes = '';
        }

        var fehcahastaValue = '';
        if (fechahasta.getValue() != null) {
            fehcahastaValue = fechahasta.getValue();
            fehcahastaValue = Ext.Date.add(fehcahastaValue, Ext.Date.DAY, 1);
        } else if (view.FechaHasta) {
            fehcahastaValue = view.FechaHasta;
        }

        /// HAY QUE REVISAR ESTE CONDICIONAL 
        var cuentaValue = '';
        if (cuenta.getValue() != null && cuenta.getValue() != "") {
            cuentaValue = cuenta.getValue();
        }
        if (view.Cuentas) {
            params.Id = view.Cuentas;
        } else {
            params.Id = '';
        }
        // DEDALO 04/03/2020 Agregado para filtrar eventos de un IMEI BC 412363359
        if (view.imei) {
            params.gps_cIMEI = view.imei;
        }

        var condiciones = view.condiciones;

        if (condiciones) {
            params.CondicionCuenta = condiciones;
        }

        if (cod_cgrupoExcluir) {
            params.cod_cgrupoExcluir = cod_cgrupoExcluir
        }

        //params.Alertas = alarma;
        if (origenes != '') {
            params.Origenes = origenes.valueCollection.items.join();//;
        }

        if (view.Origenes && !table) {
            params.Origenes = view.Origenes;
        }

        var valores = estados.valueCollection.items;
        var valoresUnidos = valores.join();
        params.Estados = valoresUnidos;//estados.valueCollection.items.join();//;    

        //params.Estados = estados.valueCollection.items.join();//;    
        var tipos = tipos.valueCollection.items;
        var tiposUnidos = tipos.join();
        params.tipos = tiposUnidos;//tipos.valueCollection.items.join();//;


        /* if(view.showEvents) {
             params.CodigosAlarma = view.showEvents
         } else {
             if(comboeventos.getValue()) {
                 params.CodigosAlarma = comboeventos.getValue();  
             } else {
                 params.CodigosAlarma = alarma.valueCollection.items.join();//;    
             }
         }*/

        if (view.showEvents) {
            params.eventos = view.showEvents
        } else {
            if (comboeventos.getValue()) {
                params.eventos = comboeventos.getValue();
            } else {
                params.eventos = alarma.valueCollection.items.join();//;    
            }
        }

        if (view.filterTipo) {
            options.tipocuenta = view.filterTipo;
            params.tipocuenta = options.tipocuenta;
        }

        if (view.short == 1) {
            params.short = 1;
        }
        if (view.grupoOptions) {
            params.eventos = view.grupoOptions;
        }
        params.cue_ncuenta = cuentaValue;
        params.operador = view.operador ? view.operador : '';
        params.OperadorNot = view.operadorNOT ? view.operadorNOT : '';
        params.cue_clinea = dealer.getValue();
        params.mostrar = view.mostrar ? view.mostrar : 1000;
        params.Prioridad = prioridad.valueCollection.items.join();//;
        params.fechaDesde = fehcadesdeValue;
        params.fechaHasta = fehcahastaValue;

        params.table = table;
        //params.mostrar = 1000;
        params.orden = 'DESC';
        // params.Id = '';

        // operation.params =params;
        operation.store = store;
        operation.store.options = params
    },

    onItemClick: function (grid, record, item, index, e, options) {
        var view = grid.up('eventostrgridview') ? grid.up('eventostrgridview') : grid;
        var type = view.eventEditor ? view.eventEditor : 'eventoview';
        var controller = this;
        console.log('click')
        if (type == 'eventomonitoreoview') {
            var EventosStore = Ext.create('Ext.data.Store', {
                model: controller.getEventosPendientesSearchModelModel(),
                pageSize: 1,
                remoteFilter: true,
                filters: [{
                    property: 'rec_iid',
                    value: record.get('rec_iid')
                }]
            })

            EventosStore.proxy.extraParams = { completo: true };
            EventosStore.load(function (records) {
                if (records.length > 0) {

                    record = records[0]
                    controller.openView(view, record)
                } else {
                    //notify('Ocurrio un error no se encuentra el evento seleccionado.');
                    view.eventEditor = 'eventoview';
                    view.eventTarget = 'win';
                    controller.openView(view, record);
                }

            })


        } else {
            controller.openView(view, record)
            console.log('click')
        }


    },
    openView: function (view, record) {

        // piso el record para que funque con los grupos
        //var record = grid.getStore().data.getByKey(item.viewRecordId);
        //var view = grid.up('eventostrgridview')?grid.up('eventostrgridview'):grid;
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        /* var title = record.get('cue_clinea')+'-'+
             record.get('cue_ncuenta')+' > '+
             record.get('rec_calarma')+'-'+
             record.get('cod_cdescripcion');*/
        //+' ('+Ext.Date.format(record.get('rec_isoFechaHora'),'D d-m-Y G:i:s')+')';
        var title = record.get('cue_clinea') + '-' +
            Ext.util.Format.trim(record.get('cue_ncuenta')) + ' ' +
            Ext.Date.format(new Date(record.get('rec_isoFechaHora')), 'D d-m-Y G:i:s');

        if (record.get("cue_nparticion") != 0) {
            title += ' ' + getLocale('PARTICIONADA');
        }

        var type = view.eventEditor ? view.eventEditor : 'eventoview';

        var icon = '/handler/getImage?u=/images/codala/' + record.get('rec_calarma') + '.png';

        //console.log(panel.operador);






        var widget = Ext.widget(type, {
            title: title,
            tabConfig: { translate: false },
            translate: false,
            header: false,
            record: record,
            icon: icon,
            closeAction: 'destroy',
            operador: view.operador,
            nombreEvento: view.nombreEvento,
            hideProcessOperations: view.hideProcessOperations ? view.noVerifyAssignedUser : false,
            noVerifyAssignedUser: view.noVerifyAssignedUser ? view.noVerifyAssignedUser : false,
            showSmsSender: view.showSmsSender ? view.showSmsSender : false,
            caller: view,
            condiciones: view.condiciones,
            tabConfig: {
                style: "color: " + record.txtColor + " !important; background-color: " + record.backColor + " !important;background-image: none !important"
            },
            tabPanelParent: panel,
            imagenesSoloDelEvento: view.imagenesSoloDelEvento

        })

        //la doble vista me obliga ir a buscar el titulo al parent
        panel.returnTab = view.returnTab ? view.returnTab : view.title;

        if (view.eventTarget == 'tab') {
            var newTab = panel.down('[title="' + title + '"]');
            if (!newTab) {
                widget.closable = false;
                var tab = panel.add(widget);
                // armo el color de la paleta
                panel.setActiveTab(tab);
            } else {
                panel.setActiveTab(newTab);
            }

            if (panel.up('tabpanel')) {
                panel.up('tabpanel').setActiveTab(panel);
            }


        } else {
            Ext.widget('window', {
                title: title,
                translate: false,
                closable: true,
                autoShow: true,
                closeAction: 'destroy',
                width: 900,
                height: 500,
                layout: 'fit',
                items: [widget]
            });
        }
    }
});
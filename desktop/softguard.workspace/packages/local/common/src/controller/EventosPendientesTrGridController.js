//MIGRADO2024
Ext.define('Common.controller.EventosPendientesTrGridController', {
    extend: 'Ext.app.Controller',
    stores: ['Common.store.EventoEstadoStore', 'Common.store.TablasGruposStore'],
    models: ['SoftguardCodigoAlarmaModel', 'EventosTiempoRealModel', 'TablasGruposSearchModel', 'ComboEventosModel', 'EventosPendientesSearchModel', 'AlarmasEnEventosPendientesSearchModel'],
    views: ['EventosPendientesTrGridView', 'EventosPendientesPosterioresGridView'],
    init: function (config) {
        this.control({
            'eventospendientesposteriorestrgridview': {
                afterrender: this.initView,
                renderManual: this.initView,
                activate: this.onActivate,
                itemdblclick: this.onPreOpenItem,
                openEvent: this.onPreOpenItem,
                refresh: this.onClearFiltersClick
            },
            'eventospendientestrgridview': {
                afterrender: this.initView,
                renderManual: this.initView,
                activate: this.onActivate,
                itemdblclick: this.onPreOpenItem,
                openEvent: this.onPreOpenItem,
                refresh: this.onClearFiltersClick
            },
            'eventospendientestrgridview button[action=search]': {
                click: this.onBuscarClick
            },
            'eventospendientestrgridview button[action=play]': {
                click: this.onPlayClick
            },
            'eventospendientestrgridview button[action=stop]': {
                click: this.onStopClick
            },
            'eventospendientestrgridview button[action=groupAlarmas]': {
                click: this.onGroupAlarmasClick
            },
            'eventospendientestrgridview button[action=groupPrioridad]': {
                click: this.onGroupPrioridadClick
            },
            'eventospendientestrgridview button[action=groupCuenta]': {
                click: this.onGroupCuentaClick
            },
            /* 'eventospendientestrgridview #procesartodosfull' : {
                click : this.onProcesarTodosFullClick
            },
            'eventospendientestrgridview #procesarlotes' : {
                click : this.onProcesarLotesClick
            },*/
            'eventospendientestrgridview button[action=soloAlarmas]': {
                click: this.onSoloAlarmasClick
            },
            'eventospendientestrgridview #clearfilters': {
                click: this.onClearFiltersClick
            },
            'eventospendientestrgridview #comboalarmas': {
                expand: this.onAlarmasExpand
            },
            'eventospendientestrgridview #ultimasalarmas': {
                click: this.onUltimasAlarmasClick
            },
            'eventospendientestrgridview #procesarmultiple': {
                click: this.onProcesoMultipleClick
            }
        });
    }, // cierro init
    onProcesoMultipleClick: function (btn) {
        var view = btn.up('eventospendientestrgridview')
        var controller = this;
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
        var recordWebremoto = storeSecurity.findRecord('KeyReference', 'WebRemoto')
        if (recordWebremoto && recordWebremoto.get('Available') == true) {
            var _security = recordWebremoto.get('_Security');
            //viejo lo dejo por compatibilidad
            if (_security && _security.procesarporlote && _security.procesarporlote == "true") {
                controller.onProcesarLotesClick(btn)
            } else if (_security && _security.procesartodos && _security.procesartodos == "true") {
                controller.onProcesarTodosFullClick(btn)
            }
            //lo nuevo
            else if (_security && _security.procesarporlotependientes && _security.procesarporlotependientes == "true") {
                controller.onProcesarLotesClick(btn)
            }
            else if (_security && _security.procesartodospendientes && _security.procesartodospendientes == "true") {
                controller.onProcesarTodosFullClick(btn)
            }
        }
    },

    onUltimasAlarmasClick: function (btn) {
        var view = btn.up('eventospendientestrgridview')
        if (btn.pressed) {
            if (view.down("gridcolumn[dataIndex=sta_cod_ccodigo]")) {
                view.down("gridcolumn[dataIndex=sta_cod_ccodigo]").setVisible(true)
            }
            if (view.down("gridcolumn[dataIndex=sta_dfechautimaalarma]")) {
                view.down("gridcolumn[dataIndex=sta_dfechautimaalarma]").setVisible(true)
            }
            btn.setText(getLocale('Ocultar utimas alarmas'))
        } else {
            if (view.down("gridcolumn[dataIndex=sta_cod_ccodigo]")) {
                view.down("gridcolumn[dataIndex=sta_cod_ccodigo]").setVisible(false)
            }
            if (view.down("gridcolumn[dataIndex=sta_dfechautimaalarma]")) {
                view.down("gridcolumn[dataIndex=sta_dfechautimaalarma]").setVisible(false)
            }
            btn.setText(getLocale('Mostrar utimas alarmas'))
        }
    },

    onAlarmasExpand: function (combo) {
        combo.getStore().load()
    },

    onClearFiltersClick: function (button, event, options) {
        var view = button.up('eventospendientestrgridview') ? button.up('eventospendientestrgridview') : button
        if (view.down('#comboOrigenes').isVisible() && !view.down('#comboOrigenes').isDisabled()) {
            view.down('#comboOrigenes').setValue('');
        }
        if (view.down('#comboTipos').isVisible() && !view.down('#comboTipos').isDisabled()) {
            view.down('#comboTipos').setValue('');
        }
        if (view.down('#grupos').isVisible() && !view.down('#grupos').isDisabled()) {
            view.down('#grupos').setValue('');
        }
        if (view.down('#dealer').isVisible() && !view.down('#dealer').isDisabled()) {
            view.down('#dealer').setValue('');
        }
        if (view.down('#grupos-excluir').isVisible() && !view.down('#grupos-excluir').isDisabled()) {
            view.down('#grupos-excluir').setValue('');
        }
        if (view.down('#comboEstados').isVisible() && !view.down('#comboEstados').isDisabled()) {
            view.down('#comboEstados').setValue('');
        }
        if (view.down('#comboalarmas').isVisible() && !view.down('#comboalarmas').isDisabled()) {
            view.down('#comboalarmas').setValue('');
        }
        if (view.down('#prioridad').isVisible() && !view.down('#prioridad').isDisabled()) {
            view.down('#prioridad').setValue('');
        }
        if (view.down('#fechadesde').isVisible() && !view.down('#fechadesde').isDisabled()) {
            view.down('#fechadesde').setValue('');
        }
        if (view.down('#fechahasta').isVisible() && !view.down('#fechahasta').isDisabled()) {
            view.down('#fechahasta').setValue('');
        }
        if (view.down('#cuenta').isVisible() && !view.down('#cuenta').isDisabled()) {
            view.down('#cuenta').setValue('');
        }
        if (view.down('#comboalarmas').isVisible() && !view.down('#comboalarmas').isDisabled()) {
            view.down('#comboalarmas').setValue('');
        }
        if (view.down('#feventos').isVisible() && !view.down('#feventos').isDisabled()) {
            view.down('#feventos').setValue('');
        }
        if (view.down('#nombre').isVisible() && !view.down('#nombre').isDisabled()) {
            view.down('#nombre').setValue('');
        }
        this.loadData(view);
    },

    onSoloAlarmasClick: function (button, event, options) {
        var view = button.up('eventospendientestrgridview');
        this.loadData(view);
    },
    onProcesarLotesClick: function (button, event, options) {
        var view = button.up('eventospendientestrgridview');
        var record = view.record;
        var store = view.store;
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            translate: false,
            forceClose: true,
            title: getLocale('Debe seleccionar los eventos a procesar'),
            closeAction: 'destroy',
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
                    xtype: 'procesarporloteview',
                    estados: view.estados,
                    eventos: view.getStore().data.items,
                    closeAction: 'destroy',
                    closerOnFinish: true,
                    condiciones: view.condiciones,
                    record: record,
                    filters: view.searchFilters,
                    caller: view,
                    excluirOrganizacionUsuarioActual: view.excluirOrganizacionUsuarioActual
                }
            ]
        });
        win.show();
    },
    onProcesarTodosFullClick: function (button, event, options) {
        var view = button.up('eventospendientestrgridview');
        var record = view.record;
        var store = view.store;
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            translate: false,
            forceClose: true,
            title: getLocale('Debe seleccionar los eventos a procesar'),
            closeAction: 'destroy',
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
                    closeAction: 'destroy',
                    condiciones: view.condiciones,
                    record: record,
                    filters: view.searchFilters,
                    caller: view,
                    excluirOrganizacionUsuarioActual: view.excluirOrganizacionUsuarioActual
                }
            ]
        });
        win.show();
    },

    procesarTodoFull: function () {
    },

    onDealerChange: function (field, newValue, oldValue) {
        var view = field.up('eventospendientestrgridview');
        if (newValue != '') {
            view.grupoOptions = '';
            this.loadData(view);
        }
    },

    onGrupoChangeClear: function (field, newValue, oldValue) {
        var view = field.up('eventospendientestrgridview');
        if (newValue == '') {
            view.grupoOptions = '';
            this.loadData(view);
        }
    },

    onGrupoExcluirChangeClear: function (field, newValue, oldValue) {
        var view = field.up('eventospendientestrgridview');
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
            //pedido el 30/07/2018
            combo.setDisabled(true)
        }
    },
    initView: function (view) {
        var me = this;
        var controller = this;
        var viewport = view.up('#viewport');
        var estados = view.down('#comboEstados');
        var mygrid = view;
        var record = view.record;
        view.noConsiderarFiltroParaIcono = [];

        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
        var recordWebremoto = storeSecurity.findRecord('KeyReference', 'WebRemoto')
        var _security = recordWebremoto.get('_Security');


        //dejo bandera de de colaboración de eventos
        view.colaboracionEventos = _security.colaborador;

        //declaro cuales son los filtros a no considerar como filtros
        console.log('_UserData', _UserData);
        if (view.condiciones) {
            view.noConsiderarFiltroParaIcono.push('tip_ncondicion:ININT')
        }
        if (view.proceso) {
            view.noConsiderarFiltroParaIcono.push('pro_nProceso:ININT')
        }
        if (view.procesoNot) {
            view.noConsiderarFiltroParaIcono.push('pro_nProcesoNOTININT')
        }
        if (view.showEvents) {
            view.noConsiderarFiltroParaIcono.push('rec_calarma:IN')
        }
        view.noConsiderarFiltroParaIcono.push('operadorAtendiendoCuentaININT')
        view.noAbrirEventosGrisados = getParametro('PERMITEATENDERCUENTAENPROCESO') == 0;
        //cantidad de eventos en la grilla
        var pageSize = 1000
        if (getParametro('CANTIDADMAXPENDIENTES')) {
            pageSize = getParametro('CANTIDADMAXPENDIENTES')
        } else if (view.pageSize) {
            pageSize = view.pageSize
        }
        view.groupingFeature = view.getView().getFeature('grouping');
        if (!view.interval || view.interval == 0)
            view.interval = getParametro("TIEMPOREFRESCOPANTALLAEVENTOS");
        if (view.hideProcessOperations) {
        }
        if (view.noshowprocesarporlotes) {
            if (view.down('#procesarlotes')) {
                view.down('#procesarlotes').hide();
            }
        }
        // ver mas abajo el proceso para mostrarlos.
        if (view.hideprocesomultiple) {
            if (view.down('#procesarmultiple')) {
                view.down('#procesarmultiple').hide();
            }
        }
        if (view.showBtnUltimoEvento) {
            view.down('#ultimasalarmas').show()
        }
        if (view.showEvents) {
            view.down('#comboalarmas').hide()
        }
        if (view.showOperador) {
            if (view.down("gridcolumn[dataIndex=ope_cnombre]")) {
                view.down("gridcolumn[dataIndex=ope_cnombre]").setVisible(true)
            }
        }
        if (view.hideDireccion) {
            if (view.down("gridcolumn[dataIndex=cue_ccalle]")) {
                view.down("gridcolumn[dataIndex=cue_ccalle]").setVisible(false)
            }
        }
        //veo que filtros vienen
        //ORIGENES
        me.popularFiltro(view.down('#comboOrigenes'), view.showOrigenes);
        //ESTADOS
        me.popularFiltro(view.down('#comboTipos'), view.showTipo);
        //PRIORIDADES
        me.popularFiltro(view.down('#prioridad'), view.showPrioridad);
        var comboGrupos = view.down('#grupos');
        if (comboGrupos) {
            var combostore = Ext.create('Ext.data.Store', {
                model: this.getTablasGruposSearchModelModel(),
                remoteGroup: false,
                remoteSort: true,
                autoDestroy: true,
                pageSize: 999,
                remoteFilter: true
            })
            comboGrupos.bindStore(combostore);
            combostore.load({
                callback: function (records) {
                    me.popularFiltro(view.down('#grupos'), view.showGrupo, 'gru_ccodigo');
                }
            });
        }
        /*
        var combostore = Ext.create('Ext.data.Store',{
            model: this.getTablasGruposSearchModelModel(),           
            pageSize: 200,
            remoteSort: true
        });       
        
        comboGrupos.bindStore(combostore);        
        combostore.load({callback: function () {
            //GRUPOS
            me.popularFiltro(view.down('#grupos'), view.showGrupo, 'gru_ccodigo');
        }});
            
        */
        if (view.hiddenDealerFilter) {
            if (view.down('#dealer')) {
                view.down('#dealer').hide();
            }
        }
        var sorters = [
            {
                property: 'rec_iPrioridad',
                direction: 'ASC'
            }, {
                property: 'rec_tfechahora',
                direction: 'ASC'
            }
        ];
        if (view.sorters && view.sorters.length > 0) {
            sorters = view.sorters;
        }
        view.me = this;
        if (estados) {
            var estadoStore = this.getEventoEstadoStoreStore();
            estados.bindStore(deepCloneStore(estadoStore));
        }
        var titleOriginal = view.title
        /* var sortX = Ext.clone(sorters);*/
        view.EventosStore = Ext.create('Ext.data.Store', {
            model: me.getEventosPendientesSearchModelModel(),
            remoteGroup: false,
            remoteSort: true,
            autoDestroy: true,
            pageSize: pageSize,
            remoteFilter: true,
            listeners: {
                beforesort: function (store) {
                    console.log(arguments)
                    store._isSort = true;
                },
                /** NOTA:
                 * Cuando esta cargando y se intenta ordenar con la columna, puede que el load no se ejecute
                 * por que algun loading esta en true, pero el sort se guarda en el store para el sigueinte load
                 */
                /*   
                if(sortX[0].property != store.sorters.items[0].property || sortX[0].direction != store.sorters.items[0].direction) {
                    sortX= Ext.clone(store.sorters.items)
                    return false
                }*/
                /* if (store._isLoading || view.isLOADING){
                    return false;
                } else {
                    store._isLoading = true;
                    view.isLOADING = true;
                } */
            },
            sorters: sorters
        });
        view.EventosStore.on('load', function (store) {
            //en cada oportunidad que se hace load del store emito un evento
            store._isLoading = false;
            view.isLOADING = false;
            view.fireEvent('storeLoaded', view, view.EventosStore)
            //limpio contadores
            titleOriginal = titleOriginal.replace(/\(.*?\)/g, "")
            if (store.getTotalCount() > 0) {
                view.setTitle(titleOriginal + ' (' + store.data.length + ')')
            } else {
                view.setTitle(titleOriginal)
            }
            //si tengo parenttabpanel emito evento con la cantidad
            if (view.parentTabpanel) {
                view.parentTabpanel.fireEvent('totalCount', view.parentTabpanel, store.totalCount)
            }



        })

        mygrid.reconfigure(view.EventosStore);


        // view.EventosStore.grid = mygrid;
        //view.EventosStore.view = view;
        /*        
        var pagingtoolbar = view.down('pagingtoolbar');
        pagingtoolbar.bindStore(view.EventosStore);
        */
        //estados.setValue(view.estados?view.estados:[0,1,2,4,9]);
        if (view.showprocesartodos) {
            // view.down('#procesartodosfull').show();
        }
        if (estados && (view.estados || view.estados == 0)) {
            estados.setValue(view.estados);
            estados.hide();
            view.noConsiderarFiltroParaIcono.push('rec_nestado:ININT')
        } else if (estados) {
            estados.setValue([0, 1, 2, 4, 9]);
            estados.show();
        }

        if (view.showEstadosFilter) {
            var estadoStore = estados.getStore();
            estadoStore.filterBy(function (record) {
                return Ext.Array.contains(view.estados, record.get('Value'))
            })
            estados.setValue(view.estados);
            estados.show();
        }
        // si le pasaron una cuenta la agrega al filtro
        if (view.record) {
            view.Cuentas = view.record.get('cue_iid');
            view.down('gridcolumn[dataIndex="rec_iidcuenta"]').hide();
        }
        this.loadData(view, true);
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
        if (comboGruposExcluir) {
            comboGruposExcluir.bindStore(combostore);
        }
        if (view.showMaximizer != false) {
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
        var storeComboAlarmas = Ext.create('Ext.data.Store', {
            model: this.getAlarmasEnEventosPendientesSearchModelModel(),// this.getSoftguardCodigoAlarmaModelModel(),
            pageSize: 500,
            remoteSort: false,
            remoteFilter: false,
            filters: []
        })
        if (view.down('#comboalarmas')) {
            view.down('#comboalarmas').bindStore(storeComboAlarmas);
            storeComboAlarmas.load();
        }
        view.headerCt.purgeCache();
        var combo = view.down('#feventos');
        var combostoreeventos = Ext.create('Ext.data.Store', {
            model: this.getComboEventosModelModel()
        });
        if (combo) {
            combo.bindStore(combostoreeventos);
        }
        var eventos = getParametro('CODALRFALLAAC');
        if (eventos) {
            eventos = eventos.split('|').join();
            if (combo) {
                combo.getStore().add({ 'field1': eventos, 'field2': getLocale('Fallo de energía') });
            }
        }
        // cambiar a store con autoload
        if (combo) {
            Ext.Ajax.request({
                url: '/rest/search/CodigosFalloTest',
                method: 'GET',
                success: function (response, action) {
                    var json = Ext.JSON.decode(response.responseText);
                    var objects = json.rows;
                    var eventos = Ext.Array.pluck(objects, "tst_cAlarma").join();
                    combo.getStore().add({ 'field1': eventos, 'field2': getLocale('Fallo de enlace') });
                }
            });
        }
        if (combo) {
            combo.getStore().add({ 'field1': 'LOW', 'field2': getLocale('Batería baja') });
            combo.getStore().add({ 'field1': 'OVF,CVF,OSA,OPF,CSA,CLF,NYO,NYC', 'field2': getLocale('Apertura y cierres fuera de horario') });
        }
        if (!view.preventEvaluateProcesarTodos) {
            if (recordWebremoto && recordWebremoto.get('Available') == true) {
                var procesarmultiple = view.down('#procesarmultiple');
                //viejo, lo dejo por compatibilidad
                if (procesarmultiple) {
                    if (_security && _security.procesartodos && _security.procesartodos == "true" && !view.hideprocesomultiple) {
                        view.down('#procesarmultiple').show()
                    } else if (_security && _security.procesarporlote && _security.procesarporlote == "true" && !view.hideprocesomultiple) {
                        view.down('#procesarmultiple').show()
                    }
                    //lo nuevo
                    else if (_security && _security.procesartodospendientes && _security.procesartodospendientes == "true" && !view.hideprocesomultiple) {
                        view.down('#procesarmultiple').show()
                    } else if (_security && _security.procesarporlotependientes && _security.procesarporlotependientes == "true" && !view.hideprocesomultiple) {
                        view.down('#procesarmultiple').show()
                    }
                }
            }
        }



        //if (recordWebremoto.get('_Security').MonitoreoGuiado === "true" && view.isRealTime===true) {
        //    view.getView().un('itemdblclick', this.onPreOpenItem, this);
        //}

    },

    getFilters: function (view) {
        var myGrid = view,
            myStore = myGrid.store;
        var estados = view.down('#comboEstados');
        var origenes = view.down('#comboOrigenes');
        var tipos = view.down('#comboTipos');
        var fechadesde = view.down('#fechadesde');
        var fechahasta = view.down('#fechahasta');
        var cuenta = view.down('#cuenta');
        var comboeventos = view.down('#feventos');
        var alarma = view.down('#comboalarmas');
        var dealer = view.down('#dealer');
        var prioridad = view.down('#prioridad');
        var filters = [];
        if (getParametro('VISUALIZAEVENTOS') || view.forcehideProcessOperations) {
            if (view.hideOtherOperators) {
                filters.push({
                    property: 'operadorAtendiendoCuentaININT',
                    value: '0,' + view.hideOtherOperators,
                    id: 'operadorAtendiendoCuenta',
                    base: true
                })
            }
        }
        var fehcadesdeValue = '';
        if (fechadesde.getValue() != '') {
            fehcadesdeValue = fechadesde.getValue();
        }
        /*
        //Se comento el 20/09/2016 a pedido de rodrigo
        if(view.FechaDesde) {
            fehcadesdeValue = view.FechaDesde;
        }*/
        var fehcahastaValue = '';
        if (fechahasta.getValue() != null) {
            fehcahastaValue = fechahasta.getValue();
            fehcahastaValue = Ext.Date.add(fehcahastaValue, Ext.Date.DAY, 1);
        }
        /*
        //Se comento el 20/09/2016 a pedido de rodrigo
        else if(view.FechaHasta) {
            fehcahastaValue = view.FechaHasta;
        }*/
        /// HAY QUE REVISAR ESTE CONDICIONAL 
        var cuentaValue = '';
        if (cuenta.getValue() != null && cuenta.getValue() != "") {
            cuentaValue = cuenta.getValue();
        }
        /*else if(view.FechaHasta) {
            cuentaValue = view.Cuentas;
        }*/
        //// REVISARRR CONDICIONAL
        if (view.Cuentas) {
            //params.Cuentas = view.Cuentas;
            filters.push({
                property: 'rec_iidcuenta:ININT',
                value: view.Cuentas,
                id: 'rec_iidcuenta'
            })
        }
        var condiciones = view.condiciones;
        if (condiciones) {
            //params.CondicionCuenta = condiciones;
            filters.push({
                property: 'tip_ncondicion:ININT',
                value: view.condiciones,
                id: 'tip_ncondicion'
            })
        }
        //params.Alertas = alarma;
        //params.Origenes = origenes.getValue().join();
        //TODO: HAY que revisar aca por que en reporte hisitorico si tiene string SMARTPANIC hace una condicion especifica
        if (origenes.getValue() && origenes.getValue() != '') {
            filters.push({
                property: 'rec_norigen:ININT',
                value: origenes.getValue().join(),
                id: 'rec_norigen'
            })
        }
        //params.Estados = estados.getValue().join(); 
        if (estados.getValue() && estados.getValue() != '') {
            filters.push({
                property: 'rec_nestado:ININT',
                value: estados.getValue().join(),
                id: 'rec_nestado',
                base: true
            })
        }
        //params.Tipos = tipos.getValue().join();
        if (tipos.getValue() && tipos.getValue() != '') {
            filters.push({
                property: 'o.[cod_ntipo]:ININT',
                value: tipos.getValue().join(),
                id: 'cod_ntipo'
            })
        }
        if (view.showEvents) {
            //params.CodigosAlarma = view.showEvents
            filters.push({
                property: 'rec_calarma:IN',
                value: view.showEvents,
                id: 'rec_calarma'
            })
        } else {
            if (comboeventos.getValue() && comboeventos.getValue() != '') {
                //params.CodigosAlarma = comboeventos.getValue();  
                filters.push({
                    property: 'rec_calarma:IN',
                    value: comboeventos.getValue(),
                    id: 'rec_calarma'
                })
            } else if (alarma.getValue() && alarma.getValue() != '' && alarma.getValue() != null) {
                //params.CodigosAlarma = alarma.getValue().join();                
                filters.push({
                    property: 'rec_calarma:IN',
                    value: alarma.getValue().join(),
                    id: 'rec_calarma'
                })
            }
        }
        //params.cue_ncuenta = cuentaValue;
        if (cuentaValue) {
            var pad = "0000";
            var n = view.down('#cuenta').getValue();
            var result = (pad + n).slice(-pad.length);
            view.down('#cuenta').setValue(result)
            filters.push({
                property: 'o.cue_ncuenta',
                value: Ext.util.Format.trim(result),
                id: 'cue_ncuenta'
            })
        }
        //params.Operador = view.operador?view.operador:'';
        if (view.operadorId) {
            filters.push({
                property: 'rec_ioperador',
                value: view.operadorId,
                id: 'rec_ioperador'
            })
        }
        /*** HAY QUE VER ESTE PARAMETRO QUE SE ESTE USANDO BIEN !!! */
        //params.OperadorNot = view.operadorNOT?view.operadorNOT:'';
        if (view.operadorNOT) {
            filters.push({
                property: 'ope_clogin:NOT IN',
                value: view.operadorNOT,
                id: 'ope_clogin'
            })
        }
        //params.cue_clinea = dealer.getValue();
        if (dealer.getValue()) {
            filters.push({
                property: 'o.cue_clinea',
                value: dealer.getValue(),
                id: 'cue_clinea'
            })
        }
        //Como paso el limit !
        //params.Mostrar = view.mostrar?view.mostrar:0;
        /*filters.push({
            property:'LIMIT!!!!!!!!!',
            value:  view.mostrar?view.mostrar:0
        })*/
        //params.Prioridad = prioridad.getValue().join();
        if (prioridad.getValue() && prioridad.getValue() != '') {
            filters.push({
                property: 'rec_iprioridadININT',
                value: prioridad.getValue().join(),
                id: 'rec_iprioridad'
            })
        }
        //params.FechaDesde = fehcadesdeValue;
        if (fehcadesdeValue) {
            filters.push({
                property: 'rec_tfechahora:GTE',
                value: fehcadesdeValue,
                id: 'rec_tfechahora'
            })
        }
        //params.FechaHasta = fehcahastaValue;
        if (fehcahastaValue) {
            filters.push({
                property: 'rec_tfechahora:LTE',
                value: fehcahastaValue,
                id: 'rec_tfechahora'
            })
        }
        if (view.soloTareas) {
            filters.push({
                property: 'soloTareas',
                value: 'true',
                id: 'soloTareas'
            })
        }
        return filters;
    },

    onGrupoChange: function (combo, records, options) {
        var view = combo.up('eventospendientestrgridview');
        var value = records[0].get('gru_ccodigo');
        var t = this;
        var codigosAlarmaStore = Ext.create('Ext.data.Store', {
            model: this.getTablasCodigosAlarmaSearchModelModel(),
            pageSize: 200,
            remoteSort: true,
            filters: [
                {
                    property: 'cod.[cod_cGrupo]',
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
        var view = combo.up('eventospendientestrgridview');
        var value = records[0].get('gru_ccodigo');
        var t = this;
        var codigosAlarmaStore = Ext.create('Ext.data.Store', {
            model: this.getTablasCodigosAlarmaSearchModelModel(),
            pageSize: 200,
            remoteSort: true,
            filters: [
                {
                    property: 'cod.[cod_cGrupo]:NOT IN',
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
        var view = combo.up('eventospendientestrgridview');
        this.loadData(view);
    },
    onBuscarClick: function (button, event, options) {
        var panel = button.up('menu');
        var view = button.up('eventospendientestrgridview');
        this.loadData(view);
        panel.hide();
    },

    onPlayClick: function (button, event, options) {
        var view = button.up('eventospendientestrgridview');
        var task = view.task;
        Ext.TaskManager.start(task);
    },

    onStopClick: function (button, event, options) {
        var view = button.up('eventospendientestrgridview');
        var task = view.task;
        Ext.TaskManager.stop(task);
    },

    onGroupAlarmasClick: function (button, event, options) {
        var view = button.up('eventospendientestrgridview');
        var myGrid = view,
            myStore = myGrid.store,
            filters = myStore.filters;
        if (button.pressed) {
            myStore.sorters.clear();
            view.groupingFeature.lastGroupers = null;
            view.groupingFeature.block();
            console.log('view.groupingFeature', view.groupingFeature)
            myStore.remoteGroup = false;
            myStore.remoteSort = false;
            myStore.group('cod_cdescripcion');
            myStore.remoteSort = true;
            //Federico V. Agregado para generar un cuadrado con el color del evento al agrupar por evento.
            view.groupingFeature.groupHeaderTpl = [
                '<div style="display: flex; align-items: center;">',
                '<div style="background-color: {[this.getGroupColor(values)]}; width: 13px; height: 13px;"></div>',
                '<div style="margin-left: 6px;">{name:this.formatName} ({children.length})</div>',
                '</div>',
                {
                    getGroupColor: function (values) {
                        var firstRecord = values.children[0];
                        var codNColor = firstRecord.get('cod_ncolor');
                        return decimalColorToHTMLcolor(codNColor);
                    },
                    formatName: function (name) {
                        return Ext.String.trim(name);
                    }
                }
            ];
            view.groupingFeature.enable();
            view.groupingFeature.pruneGroupedHeader();
            view.groupingFeature.unblock();
            //view.groupingFeature.refreshIf();
        } else {
            view.groupingFeature.disable();
            myStore.clearGrouping();
        }
    },

    onGroupPrioridadClick: function (button, event, options) {
        var view = button.up('eventospendientestrgridview');
        var myGrid = view,
            myStore = myGrid.store;
        view.groupingFeature.groupHeaderTpl = '{name} ({children.length})'
        if (button.pressed) {
            myStore.sorters.clear();
            view.groupingFeature.lastGroupers = null;
            view.groupingFeature.block();
            view.groupingFeature.enable();
            myStore.remoteGroup = false;
            myStore.remoteSort = false;
            myStore.group('rec_iprioridad');
            myStore.remoteSort = true;
            view.groupingFeature.pruneGroupedHeader();
            view.groupingFeature.unblock();
            //view.groupingFeature.refreshIf();
        } else {
            view.groupingFeature.disable();
            myStore.clearGrouping();
        }
    },

    onGroupCuentaClick: function (button, event, options) {
        var view = button.up('eventospendientestrgridview');
        var myGrid = view,
            myStore = myGrid.store;
        view.groupingFeature.groupHeaderTpl = '{name} ({children.length})'

        if (button.pressed) {
            myStore.sorters.clear();
            var sorters = [
                {
                    property: 'rec_iidcuenta',
                    direction: 'ASC'
                }
            ];
            myStore.setSorters(sorters);
            myStore.load(
                {
                    callback: function (records, operation, success) {
                        if (success) {
                            myStore.suspendEvents();
                            view.groupingFeature.lastGroupers = null;
                            view.groupingFeature.block();
                            view.groupingFeature.enable();
                            myStore.remoteGroup = false;
                            myStore.remoteSort = false;
                            myStore.group('rec_iidcuenta');
                            myStore.remoteSort = true;
                            view.groupingFeature.pruneGroupedHeader();
                            view.groupingFeature.unblock();
                            //view.groupingFeature.refreshIf();

                            myStore.resumeEvents();
                            //view.getView().refresh();
                        }
                    }
                });
        } else {
            view.groupingFeature.disable();
            myStore.clearGrouping();
        }
    },
    loadData: function (view, showMask) {
        var controller = this;
        var myGrid = view,
            myStore = myGrid.store;
        var estados = view.down('#comboEstados');
        var origenes = view.down('#comboOrigenes');
        var nombre = view.down('#nombre') ? view.down('#nombre').getValue() : undefined;
        var tipos = view.down('#comboTipos');
        var fechadesde = view.down('#fechadesde');
        var fechahasta = view.down('#fechahasta');
        var cuenta = view.down('#cuenta');
        var comboeventos = view.down('#feventos');
        var alarma = view.down('#comboalarmas');
        var dealer = view.down('#dealer');
        var cod_cGrupo = view.down('#grupos') ? view.down('#grupos').getValue() : undefined;
        var cod_cGrupoExcluir = view.down('#grupos-excluir') ? view.down('#grupos-excluir').getValue() : undefined;
        var prioridad = view.down('#prioridad');
        view.searchFilters = [];
        if (getParametro('VISUALIZAEVENTOS') || view.forcehideProcessOperations) {
            if (view.hideOtherOperators) {
                view.searchFilters.push({
                    property: 'operadorAtendiendoCuentaININT',
                    value: '0,' + view.hideOtherOperators,
                    id: 'operadorAtendiendoCuenta',
                    base: true
                })
            }
        }
        var fechadesdeValue = '';
        if (fechadesde && fechadesde.getValue() != '') {
            fechadesdeValue = fechadesde.getValue();
        }
        /*
        //Se comento el 20/09/2016 a pedido de rodrigo
        if(view.FechaDesde) {
            fehcadesdeValue = view.FechaDesde;
        }*/
        if (view.soloTareas) {
            view.searchFilters.push({
                property: 'soloTareas',
                value: 'true',
                id: 'soloTareas'
            })
        }
        var fechahastaValue = '';
        if (fechahasta && fechahasta.getValue() != null) {
            fechahastaValue = fechahasta.getValue();
            fechahastaValue = Ext.Date.add(fechahastaValue, Ext.Date.DAY, 1);
        }
        /*
        //Se comento el 20/09/2016 a pedido de rodrigo
        else if(view.FechaHasta) {
            fehcahastaValue = view.FechaHasta;
        }
        */
        /// HAY QUE REVISAR ESTE CONDICIONAL 
        var cuentaValue = '';
        if (cuenta && cuenta.getValue() != null && cuenta.getValue() != "") {
            cuentaValue = cuenta.getValue();
        }
        /*else if(view.FechaHasta) {
            cuentaValue = view.Cuentas;
        }*/
        if (cod_cGrupo) {
            //params.Cuentas = view.Cuentas;
            view.searchFilters.push({
                property: 'cod.[cod_cGrupo]:IN',
                value: cod_cGrupo,
                id: 'cod_cGrupo'
            })
        }
        if (nombre) {
            //params.Cuentas = view.Cuentas;
            view.searchFilters.push({
                property: 'o.cue_cnombre:LIKE',
                value: nombre,
                id: 'nombre'
            })
        }
        if (cod_cGrupoExcluir) {
            //params.Cuentas = view.Cuentas;
            view.searchFilters.push({
                property: 'cod.[cod_cGrupo]:NOT IN',
                value: cod_cGrupoExcluir,
                id: 'cod_cGrupoExcluir'
            })
        }
        if (view.Cuentas) {
            //params.Cuentas = view.Cuentas;
            view.searchFilters.push({
                property: 'rec_iidcuenta:ININT',
                value: view.Cuentas,
                id: 'rec_iidcuenta'
            })
        }
        if (view.procesoNot) {
            view.searchFilters.push({
                property: 'pro_nProcesoNOTININT',
                value: view.procesoNot,
                id: 'pro_nProcesoNOTININT',
                base: true
            })
        }
        if (view.proceso) {
            view.searchFilters.push({
                property: 'pro_nProceso:ININT',
                value: view.proceso,
                id: 'pro_nProceso'
            })
        }
        var condiciones = view.condiciones;
        if (condiciones) {
            view.searchFilters.push({
                property: 'tip_ncondicion:ININT',
                value: view.condiciones,
                id: 'tip_ncondicion'
            })
        }
        //params.Alertas = alarma;
        //params.Origenes = origenes.getValue().join();
        //TODO: HAY que revisar aca por que en reporte hisitorico si tiene string SMARTPANIC hace una condicion especifica
        if (origenes && origenes.getValue() && origenes.getValue() != '') {
            view.searchFilters.push({
                property: 'rec_norigen:ININT',
                value: origenes.getValue().join(),
                id: 'rec_norigen'
            })
        }
        //params.Estados = estados.getValue().join(); 
        if (estados && estados.getValue() && estados.getValue() != '') {
            view.searchFilters.push({
                property: 'rec_nestado:ININT',
                value: estados.getValue().join(),
                id: 'rec_nestado',
                base: true
            })

        }
        //params.Tipos = tipos.getValue().join();
        if (tipos && tipos.getValue() && tipos.getValue() != '') {
            view.searchFilters.push({
                property: 'o.[cod_ntipo]:ININT',
                value: tipos.getValue().join(),
                id: 'cod_ntipo'
            })
        }
        if (view.showEvents) {
            //params.CodigosAlarma = view.showEvents
            view.searchFilters.push({
                property: 'rec_calarma:IN',
                value: view.showEvents,
                id: 'rec_calarma'
            })
        } else {
            if (comboeventos && comboeventos.getValue() && comboeventos.getValue() != '') {
                //params.CodigosAlarma = comboeventos.getValue();  
                view.searchFilters.push({
                    property: 'rec_calarma:IN',
                    value: comboeventos.getValue(),
                    id: 'rec_calarma'
                })
            } else if (alarma && alarma.getValue() && alarma.getValue() != '') {
                //params.CodigosAlarma = alarma.getValue().join();                
                view.searchFilters.push({
                    property: 'rec_calarma:IN',
                    value: alarma.getValue().join(),
                    id: 'rec_calarma'
                })
            }
        }
        //params.cue_ncuenta = cuentaValue;
        if (cuentaValue) {
            var pad = "0000";
            var n = view.down('#cuenta').getValue();
            var result = (pad + n).slice(-pad.length);
            view.down('#cuenta').setValue(result)
            view.searchFilters.push({
                property: 'o.cue_ncuenta',
                value: Ext.util.Format.trim(result),
                id: 'cue_ncuenta'
            })
        }
        //params.Operador = view.operador?view.operador:'';
        if (view.operadorId) {
            view.searchFilters.push({
                property: 'rec_ioperador',
                value: view.operadorId,
                id: 'rec_ioperador'
            })
        }
        /*** HAY QUE VER ESTE PARAMETRO QUE SE ESTE USANDO BIEN !!! */
        //params.OperadorNot = view.operadorNOT?view.operadorNOT:'';
        if (view.operadorNOT) {
            view.searchFilters.push({
                property: 'ope_clogin:NOT IN',
                value: view.operadorNOT,
                id: 'ope_clogin'
            })
        }
        //params.cue_clinea = dealer.getValue();
        if (dealer && dealer.getValue()) {
            view.searchFilters.push({
                property: 'o.[cue_clinea]:IN',
                value: dealer.getValue(),
                id: 'cue_clinea'
            })
        }
        //Como paso el limit !
        //params.Mostrar = view.mostrar?view.mostrar:0;
        /*filters.push({
            property:'LIMIT!!!!!!!!!',
            value:  view.mostrar?view.mostrar:0
        })*/
        //params.Prioridad = prioridad.getValue().join();
        if (prioridad && prioridad.getValue() && prioridad.getValue() != '') {
            view.searchFilters.push({
                property: 'rec_iprioridadININT',
                value: prioridad.getValue().join(),
                id: 'rec_iprioridad'
            })
        }
        //params.FechaDesde = fehcadesdeValue;
        if (fechadesdeValue) {
            view.searchFilters.push({
                property: 'rec_tfechahora:GT',
                value: fechadesdeValue,
                id: 'rec_tfechahora:GT'
            })
        }
        //params.FechaHasta = fehcahastaValue;
        if (fechahastaValue) {
            view.searchFilters.push({
                property: 'rec_tfechahora:LT',
                value: fechahastaValue,
                id: 'rec_tfechahora:LT'
            })
        }
        //*operation.params =params;
        view.EventosStore.remoteFilter = false;
        view.EventosStore.clearFilter(true);
        view.EventosStore.remoteFilter = true;
        view.EventosStore.proxy.extraParams = {
            completo: false,
        };
        if (view.noFilterTotal != 1) {
            view.EventosStore.proxy.extraParams.filterTotal = 1
        }
        if (view.excluirOrganizacionUsuarioActual) {
            view.EventosStore.proxy.extraParams.excluirOrganizacionUsuarioActual = view.excluirOrganizacionUsuarioActual
        }
        if (view.iconFilter) {
            var filterSimple = view.searchFilters.filter(function (value) {
                return !view.noConsiderarFiltroParaIcono.includes(value.property)
            })
            if (filterSimple.length > 0) {
                view.down('#filtrostr').setIconCls('icon-filter')
                if (view.tab) {
                    view.tab.setIconCls('icon-filter')
                }
            } else {
                view.down('#filtrostr').setIconCls('')
                if (view.tab) {
                    view.tab.setIconCls('')
                }
            }
        }
        if (view.evaluarNuevosEventosYEnviarAlFrente && !view.isLOADING) {
            view.isLOADING = true;
            //view.EventosStore.filter(view.searchFilters);


            if (view.POSTERIORES == 'POSTERIORES') {
                var postFilter = view.searchFilters;
                postFilter.push({
                    property: 'rec_tfechahora:GT',
                    value: new Date(view.record.get('rec_tfechahora')),
                    id: 'fechadesde_event_posteriores'
                });
                view.EventosStore.filter(postFilter);
                view.EventosStore.load({
                    callback: function (records) {
                        view.isLOADING = false;
                    }
                });
            } else {
                view.EventosStore.load({
                    callback: function () {
                        view.isLOADING = false;
                    }
                });
            }


        } else if ((myGrid.isVisible(true) || myGrid.refreshOnHidden) && !view.isLOADING) {
            view.isLOADING = true;
            if (myGrid.itemId == "tabAutoAsignacion") {
                view.searchFilters.push({
                    property: '_Tagged',
                    value: '1'
                });
            }
            //view.EventosStore.clearFilter( true );
            view.EventosStore.filter(view.searchFilters);
            view.EventosStore.load({
                /*VOLVER ATRAS filters: view.searchFilters, callback: function( records ) {
                    if( !view.opened && view.autoOpen ) {
                        Ext.Array.each( records, function( evento ) {
                            controller.onPreOpenItem( myGrid, evento );
                        })
                        view.opened = true;
                        view.up( 'tabpanel' ).listaIsReady = true;
                    }
                    view.isLOADING = false;
                }*/
                callback: function (records) {
                    if (!view.opened && view.autoOpen) {
                        Ext.Array.each(records, function (evento) {
                            controller.onPreOpenItem(myGrid, evento);
                        })
                        view.opened = true;
                        view.up('tabpanel').listaIsReady = true;
                    }
                    view.isLOADING = false;
                }
            });
        }
    },
    onPreOpenItem: function (grid, record, item, index, e, options) {


        var view = grid.up('eventospendientestrgridview') ? grid.up('eventospendientestrgridview') : grid
        var seurityModuleStore = SecurityModulesStore;
        var recordWebremoto = seurityModuleStore.findRecord('KeyReference', 'WebRemoto');
        if (recordWebremoto.get('_Security').MonitoreoGuiado === "true" && view.isRealTime === true) {
            //si es monitoreo guiado y estoy en tiempo real no dejo abrir eventos desde la lista
            return;
        }
        /** mask de asignar evento */
        // dedalo lo saco porque da sensacion de mas lento... 
        this.application.CARGANDOEVENTO = maskAutoDown.init(grid.up('viewport'), getLocale("Asignando evento"), 2000)
        //console.log(record)
        /** fin mask asignar evento */
        var controller = this;



        var operadorAtendiendoCuenta = record.get('operadorAtendiendoCuenta');
        var currentOper;
        // recibe el operador en variable ope_iid o operadorId tengo que grabar ambas
        if (view.ope_iid && !view.operadorId) {
            currentOper = view.ope_iid
        }
        if (!view.ope_iid && view.operadorId) {
            currentOper = view.operadorId
        }
        if (view.noAbrirEventosGrisados && view.eventEditor && !view.noVerifyAssignedUser) {
            if (operadorAtendiendoCuenta > 0 && currentOper != operadorAtendiendoCuenta) {
                console.log("[PERMITEATENDERCUENTAENPROCESO] en false, " + operadorAtendiendoCuenta + " no es " + currentOper)
                return false;
            }
        }
        // si no tengo editor asignado voy directo al evento de apertura sin testear nada.
        if (!view.eventEditor) {
            controller.onItemClick(grid, record);
            return;
        }
        view.currentOper = currentOper;
        var abrir = false;
        if (view.operadorName ||
            view.operadorName == record.get('ope_cnombre') ||
            record.get('operadorAtendiendoCuenta') <= 0) {
            abrir = true;
        }
        if (view.noVerifyAssignedUser) {
            abrir = true;
        }


        if (abrir) {
            if (record.complete == true) {
                controller.onItemClick(grid, records[0])
            } else {
                var filterTareasVC = [{
                    property: 'rec_iid',
                    value: record.get('rec_iid')
                }];
                if (view.soloTareas) {
                    filterTareasVC.push({
                        property: 'soloTareas',
                        value: 'true',
                        id: 'soloTareas'
                    })
                }
                var EventosStore = Ext.create('Ext.data.Store', {
                    model: controller.getEventosPendientesSearchModelModel(),
                    pageSize: 1,
                    remoteFilter: true,
                    filters: filterTareasVC
                })
                EventosStore.proxy.extraParams = {
                    completo: true,
                    disabledOrganization: true
                };
                EventosStore.load(function (records) {
                    if (records.length > 0) {
                        //deposito el nuevo record en el record que se cargo con pocos campos
                        record = records[0];
                        //defino que el record se cargo completo no hay necesidad de voler a cargarlo TODO: aun no pasa esto se carga simpre que se hace doble click
                        record.complete = true;
                        controller.onItemClick(grid, record)
                    } else {
                        notify('Ocurrio un error no se encuentra el evento seleccionado.');
                    }
                })
            }
        } else {
            notify('Este evento esta siendo atendido por otro operador.')
        }
    },

    onItemClick: function (grid, record, item, index, e, options) {
        // piso el record para que funque con los grupos
        //var record = grid.getStore().data.getByKey(item.viewRecordId);
        var controller = this;
        var view = grid.up('eventospendientestrgridview') ? grid.up('eventospendientestrgridview') : grid;
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var title = record.get('cue_clinea') + '-' +
            Ext.util.Format.trim(record.get('cue_ncuenta')) + ' ' +
            Ext.Date.format(new Date(record.get('rec_isofechahora')), 'D d-m-Y G:i:s');
        if (record.get("cue_nparticion") != 0) {
            title += ' ' + getLocale('PARTICIONADA');
        }

        var storeSecurity = SecurityModulesStore;
        var recordWebremoto = storeSecurity.findRecord('KeyReference', 'WebRemoto');

        console.log('recordWebremoto: ', recordWebremoto);
        var type = view.eventEditor ? view.eventEditor : 'eventoview';


        if (recordWebremoto.get('_Security').MonitoreoGuiado === "true")
            type = 'eventomonitoreoguiadoview';

        var icon = '/handler/getImage?u=/images/codala/' + record.get('rec_calarma') + '.png';
        var widget = Ext.widget(type, {
            title: title,
            tabConfig: { translate: false },
            translate: false,
            header: false,
            record: record,
            excluirOrganizacionUsuarioActual: view.excluirOrganizacionUsuarioActual,
            eventos: grid.getStore().data.items,
            icon: icon,
            closeAction: 'destroy',
            operador: view.operador,
            nombreEvento: view.nombreEvento,
            hideProcessOperations: view.hideProcessOperations ? view.noVerifyAssignedUser : false,
            noVerifyAssignedUser: view.noVerifyAssignedUser ? view.noVerifyAssignedUser : false,
            showSmsSender: view.showSmsSender ? view.showSmsSender : false,
            fireObservacionColaboracion: view.fireObservacionColaboracion ? view.fireObservacionColaboracion : false,
            caller: view,
            condiciones: view.condiciones,
            tabConfig: {
                style: "color: " + record.txtColor + " !important; background-color: " + record.backColor + " !important;background-image: none !important"
            },
            itemIdTabReturn: view.returnTab ? view.returnTab : view.itemId,//esto es para las doble vistas
            eventTabPanel: panel,
            /**
             * BC 390361159 : Agregado personalizacion para mostar / ocultar bitacora, timeline, notas.
             */
            bitacora: view.bitacora,
            timeline: view.timeline,
            notas: view.notas,
            soloTareas: view.soloTareas,
            //Federico V. agregado el 24/10/2023 a pedido de la tarea 982
            listeners: {
                afterrender: function (view) {
                    var view2 = grid.up('eventospendientestrgridview') ? grid.up('eventospendientestrgridview') : grid;
                    if (!view2.openEventCount) {
                        view2.openEventCount = 1;
                    }
                    var EventosStore = Ext.create('Ext.data.Store', {
                        model: controller.getEventosPendientesSearchModelModel(),
                        pageSize: 1,
                        remoteFilter: true,
                        filters: [
                            {
                                property: 'rec_nestado:ININT',
                                value: '1,9,4'
                            },
                            {
                                property: 'rec_ioperador',
                                value: view2.currentOper
                            }
                        ]
                    });
                    EventosStore.load({
                        callback: function (records, store) {
                            var eventosAtendidos = records.length;
                            view2.openEventCount += eventosAtendidos;
                            //VOLVER ATRAS var tabPanel = view.up( 'tabpanel' )
                            //VOLVER ATRAS var tituloActual = tabPanel.initialConfig.title + ' (' + view2.openEventCount + ')';
                            //VOLVER ATRAS tabPanel.setTitle( tituloActual );
                        }
                    });
                }
            }
        })
        //la doble vista me obliga ir a buscar el titulo al parent
        if (panel)
            panel.returnTab = view.returnTab ? view.returnTab : view.title;
        if (view.eventTarget == 'tab') {
            var newTab = panel.down('[title="' + title + '"]');
            if (!newTab) {
                widget.closable = false;
                if (view.showCloseEvent) {
                    widget.closable = true;
                }
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
                width: 800,
                height: 600,
                layout: 'fit',
                items: [widget]
            });
        }
    }
});
Ext.define('WebRemoto.controller.WebRemotoController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['ModuleModel', 'EventosTiempoRealModel', 'EventosPendientesSearchModel'],
    views: ['ExtUxNotification'],

    init: function (config) {
        // genero los eventos
        this.control({
            'viewport': {
                afterrender: this.initview
            }
        });
    }, // cierro init

    initview: function (view) {
        console.log('view de web remoto', view)
        var controller = this;
        this.application._idModule = 2;
        this.application._nameModule = 'Webremoto';
        view.failure = 0;
        var me = this;
        var tab = view.down('tabpanel');
        tab.translate = false;

        //Ext.defer(function () { }, 500, this);

        Ext.Ajax.request({
            url: '/Rest/Search/SGSP_VCAAEnabled', // Ruta al servicio en el backend
            method: 'GET',
            success: function (response) {
                var result = (typeof safeJsonDecode === 'function') ? safeJsonDecode(response.responseText, null) : Ext.decode(response.responseText, true);
                if (result.rows[0].Cuantos > 0) {
                    AutoAsignacion = true;
                    if (AutoAsignacion === true) {
                        var autoasignacion = tab.add(Ext.widget('eventospendientestrgridview', {
                            title: getLocale('AutoAsignacion'),
                            translate: false,
                            noResaltarEventosMismaCuenta: true,
                            showEstadosFilter: true,
                            estados: [0, 1, 2, 4, 9],
                            refreshOnHidden: true,
                            autoOpen: true,
                            itemId: 'tabAutoAsignacion',
                            showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                            condiciones: arrCondicionesValues.join(','),
                            module: view.module,
                            showTipo: arrTiposValues.join(','),
                            showGrupo: arrGruposValues.join(','),
                            showPrioridad: arrPrioridadesValues.join(','),
                            showOrigenes: arrOrigenesValues.join(','),
                        }));
                    }
                }
            },
            failure: function (response) {
                console.log('Error al ejecutar la consulta');
            }
        })

        var record = view.record;
        var module = this.getModuleModelModel().create({
            profile: 3
        });

        var titleOriginal = '';
        var eventos = Ext.widget('tabpanel', {
            title: 'Mis eventos',
            itemId: 'miseventostabpanel',
            listeners: {
                beforeremove: function (tabPanel, newTab, oldTab, index) {
                    if (tabPanel.items.length <= 2) {
                        //VOLVER ATRAS var newTab = tab.down( '[title="' + getLocale( tabPanel.returnTab ) + '"]' );
                        //VOLVER ATRAS tab.setActiveTab( newTab );
                    }
                }
            }
        });

        view.module = module;
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
        var recordWebRemoto = storeSecurity.findRecord('KeyReference', 'WebRemoto');

        var _security = null;
        if (recordWebRemoto != null) {
            _security = recordWebRemoto.get('Security');
        }

        var metadataEstado;
        var metadataOrigen;
        var metadataPrioridad;
        var metadataGrupo;
        var filtroAlarmas;

        if (_security) {
            var json = JSON.parse(_security);
            tab.operador = json.Usuario;
            view.operador = json.Usuario;
            //view.down('eventosmonitorgridview').operador = json.Usuario;
            view.down('webremotonorthview').operadorId = json.ope_iid;
            view.down('webremotonorthview').metadata = json;

            view.operadorId = json.ope_iid;
            view.supervision = json.supervision

            // armo el keep alive
            Ext.Function.defer(controller.setTtl, 3500, controller, [view, controller]);

            var filtrosGuardados = null;
            try {
                filtrosGuardados = Ext.isString(json.Filtros) ? (typeof safeJsonDecode === 'function' ? safeJsonDecode(json.Filtros, null) : Ext.decode(json.Filtros)) : json.Filtros;
            } catch (e) { filtrosGuardados = null; }
            var metadataEstado, metadataOrigen, metadataPrioridad, metadataGrupo;

            if (filtrosGuardados) {
                metadataEstado = filtrosGuardados.Estado;
                metadataOrigen = filtrosGuardados.Origen;
                metadataPrioridad = filtrosGuardados.Prioridad;
                metadataGrupo = filtrosGuardados.Grupo;
                filtroAlarmas = filtrosGuardados.filtroAlarmas;
            }

            var arrCondicionesValues = [];

            //ORIGENES
            var arrOrigenesValues = [];
            Ext.Array.each(metadataOrigen, function (record) {
                if (record) {
                    arrOrigenesValues.push(record.Value)
                }
            })
            arrOrigenesValues.join(',');

            //TIPOS               
            var arrTiposValues = [];
            Ext.Array.each(metadataEstado, function (record) {
                if (record) {
                    arrTiposValues.push(record.Value)
                }
            })

            //PRIORIDADES
            var arrPrioridadesValues = [];
            Ext.Array.each(metadataPrioridad, function (record) {
                if (record) {
                    arrPrioridadesValues.push(record.Value)
                }
            })
            arrPrioridadesValues.join(',');


            //GRUPOS
            var arrGruposValues = [];
            Ext.Array.each(metadataGrupo, function (record) {
                if (record) {
                    arrGruposValues.push(record.Value)
                }
            })
            arrGruposValues.join(',');

            var sorters = [];
            if (json.eventOrderPriority != "false" && json.eventOrderPriority != "") {
                sorters.push({
                    property: 'rec_iPrioridad',
                    direction: 'ASC'
                });
            }

            if (json.eventOrder) {
                sorters.push({
                    property: 'rec_tfechahora',
                    direction: json.eventOrder
                });
            } else if (json.eventOrderPriority != "false" && json.eventOrderPriority != "") {
                sorters.push({
                    property: 'rec_tfechahora',
                    direction: 'ASC'
                });
            }

            /**
             * BC 390361159 : Agregado personalizacion para mostar / ocultar bitacora, timeline, notas.
             */
            var bitacora = false;
            var timeline = false;
            var notas = false;

            if (json.bitacora) {
                bitacora = json.bitacora
            } else {
                // dejo en TRUE si no vino por metadata
                bitacora = true
            }
            if (json.timeline) {
                timeline = json.timeline
            } else {
                // dejo en TRUE si no vino por metadata
                timeline = true
            }
            if (json.notas) {
                notas = json.notas
            } else {
                // dejo en TRUE si no vino por metadata
                notas = true
            }


            if (myQueryString.CondicionCuenta) {
                arrCondicionesValues = JSON.parse(myQueryString.CondicionCuenta)
            }

            if ((!json.AtenderAuto || json.AtenderAuto == 'false') && (!json.MonitoreoGuiado || json.MonitoreoGuiado == 'false')) {

                var pendientes = tab.add(Ext.widget('eventospendientestrgridview', {
                    ignoreState: false,
                    stateId: 'Webremoto_EventosPendientes',
                    title: getLocale('PENDIENTES'),
                    eventTarget: 'tab',
                    translate: false,
                    targetTab: eventos,
                    eventEditor: 'eventomonitoreoview',//'eventomonitoreoguiadoview',//MONITOREO GUIADO esto es temporal. Se debe chequear si el usuario tiene en confg  MonitoreGuiado=true
                    itemId: 'tabpendientes',
                    estados: '0',
                    mostrar: 300,
                    showprocesartodos: true,
                    showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                    module: view.module,
                    showTipo: arrTiposValues.join(','),
                    showGrupo: arrGruposValues.join(','),
                    showPrioridad: arrPrioridadesValues.join(','),
                    showOrigenes: arrOrigenesValues.join(','),
                    showColumns: 'rec_nestado',
                    sorters: sorters,
                    condiciones: arrCondicionesValues.join(','),
                    hideOtherOperators: view.down('webremotonorthview').operadorId, // descomento para probar pedido Dany 28/9/2018
                    operadorName: json.Usuario,
                    ope_iid: json.ope_iid,
                    noAbrirEventosGrisados: true,
                    //manejo los eventos con voz
                    noFilterTotal: 1,
                    iconFilter: true,
                    procesoNot: '40,44,77777777',
                    showEvents: filtroAlarmas,
                    listeners: {
                        activate: function () {
                            //VOLVER ATRAS var monitor = view.down( 'webremotonorthview' );
                            //VOLVER ATRAS monitor.mute = false;
                        },
                        deactivate: function () {
                            //VOLVER ATRAS var monitor = view.down( 'webremotonorthview' );
                            //VOLVER ATRAS monitor.mute = true;
                        },
                    },

                    bitacora: bitacora,
                    timeline: timeline,
                    notas: notas
                }));



            }
            if (pendientes)
                pendientes.setLoading(false);

            tab.add(eventos);
            // ... ya creaste y agregaste `eventos` (itemId: 'miseventostabpanel') y su "Lista" ...

            this.startMisEventosAutoRefresh(view);

            // Limpieza al cerrar la vista
            view.on('beforedestroy', function () {
                this.stopMisEventosAutoRefresh(view);
            }, this);

            this.startListaAutoRefresh(view);

            // Por si el usuario cierra la vista o cambia de módulo, cortamos el task
            view.on('beforedestroy', function () {
                this.stopListaAutoRefresh(view);
            }, this);

            var espera = tab.add(Ext.widget('eventospendientestrgridview', {
                title: getLocale('En espera'),
                refreshOnHidden: true,
                eventTarget: 'tab',
                noFilterTotal: 0,
                itemId: 'tabespera',
                targetTab: eventos,
                tabConfig: {
                    translate: false
                },
                sorters: [
                    {
                        property: 'rec_iPrioridad',
                        direction: 'ASC'
                    }, {
                        property: 'rec_tfechahora',
                        direction: 'ASC'
                    }
                ],
                eventEditor: 'eventomonitoreoview',
                estados: '2',
                procesoNot: '61',
                module: view.module,
                showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                condiciones: arrCondicionesValues.join(','),
                hideOtherOperators: view.down('webremotonorthview').operadorId,
                hideDireccion: true,
                showOperador: true,
                operadorName: json.Usuario,
                ope_iid: json.ope_iid,
                showprocesartodos: true,
                showBtnUltimoEvento: true,
                iconFilter: true
            }));

            //DS-641|adrianlara|20230424 => Se activa momentaneamente la tab de espera para que se inicialice el refresh de la cantidad de eventos en espera
            tab.setActiveTab(espera);
            if (getParametro('PROCESOENESPERA') != 2) {

                var esperapropios = tab.add(Ext.widget('eventospendientestrgridview', {
                    title: getLocale('En espera propios'),
                    translate: false,
                    targetTab: eventos,
                    itemId: 'tabesperapropios',
                    eventTarget: 'tab',
                    //showprocesartodos: true,
                    estados: 2,
                    sorters: [
                        {
                            property: 'rec_iPrioridad',
                            direction: 'ASC'
                        }
                    ],
                    eventEditor: 'eventomonitoreoview',
                    operadorName: json.Usuario,
                    module: view.module,
                    showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                    condiciones: arrCondicionesValues.join(','),
                    operador: json.Usuario,
                    operadorName: json.Usuario,
                    operadorId: view.operadorId,
                    ope_iid: json.ope_iid,
                    showprocesartodos: true,
                    preventEvaluateProcesarTodos: true
                }));

            }

            // lista de mis eventos
            eventos.add(Ext.widget('eventospendientestrgridview', {
                title: getLocale('Lista'),
                translate: false,
                itemId: 'panellista',
                itemId: 'tabpanellista',
                refreshOnHidden: true, // <--- opcional, ayuda a mantener el contador al día
                eventTarget: 'tab',
                targetTab: eventos,
                estados: [1, 9, 4],
                parentTabpanel: eventos,
                sorters: [
                    {
                        property: 'rec_iPrioridad',
                        direction: 'ASC'
                    }
                ],
                eventEditor: 'eventomonitoreoview',
                //autoOpen: true,
                operadorName: json.Usuario,
                operadorId: view.operadorId,
                module: view.module,
                showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                condiciones: arrCondicionesValues.join(','),
                //showprocesartodos: true,
                listaIsReady: false, //se usa para saber cuando termino de carga todo su contenido
                listeners: {
                    storeLoaded: function (viewtabpanel, store) {/*
                    Federico V. anulo porque se paso esta funcion para el itemclick 
                    // eventos.setTitle(viewtabpanel.title)
                    if( titleOriginal == '' ) {
                        titleOriginal = eventos.title;
                    }
                    if( store.totalCount > 0 ) {
                        eventos.setTitle( titleOriginal + ' (' + store.totalCount + ')' )
                    } else {
                        eventos.setTitle( titleOriginal )
                    }
                */}
                }
            }));



            if (json.AtenderAuto != "true" && (!json.MonitoreoGuiado || json.MonitoreoGuiado == 'false')) {
                var dobleV = tab.add(Ext.widget('panel', {
                    title: getLocale('Doble vista (V)'),
                    translate: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    // manejo los eventos con voz
                    listeners: {
                        activate: function () {
                            //VOLVER ATRAS var monitor = view.down( 'webremotonorthview' );
                            //VOLVER ATRAS monitor.mute = false;
                        },
                        deactivate: function () {
                            //VOLVER ATRAS var monitor = view.down( 'webremotonorthview' );
                            //VOLVER ATRAS monitor.mute = true;
                        }
                    },
                    itemId: 'tabDobleV',
                    items: [
                        {
                            xtype: 'eventospendientestrgridview',
                            itemId: 'pendientesDobleV',
                            title: getLocale('Pendientes'),
                            translate: false,
                            eventTarget: 'tab',
                            targetTab: eventos,
                            cls: 'pendientes',
                            eventEditor: 'eventomonitoreoview',
                            sorters: [
                                {
                                    property: 'rec_iPrioridad',
                                    direction: 'ASC'
                                }
                            ],
                            //showEstadosFilter: true,
                            flex: 1,
                            estados: 0,
                            style: {
                                borderColor: 'green',
                                borderStyle: 'solid'
                            },
                            hideColumns: ['rec_nestado'],
                            showprocesartodos: true,
                            showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                            condiciones: arrCondicionesValues.join(','),
                            returnTab: 'tabDobleV',
                            operadorName: json.Usuario,
                            ope_iid: json.ope_iid,
                            showEvents: filtroAlarmas,
                            hideOtherOperators: view.down('webremotonorthview').operadorId,
                            showTipo: arrTiposValues.join(','),
                            showGrupo: arrGruposValues.join(','),
                            showPrioridad: arrPrioridadesValues.join(','),
                            showOrigenes: arrOrigenesValues.join(','),
                        },
                        {
                            xtype: 'eventospendientestrgridview',
                            itemId: 'esperaDobleV',
                            title: getLocale('En espera'),
                            translate: false,
                            eventTarget: 'tab',
                            targetTab: eventos,
                            estados: 2,
                            cls: 'espera',
                            eventEditor: 'eventomonitoreoview',
                            sorters: [
                                {
                                    property: 'rec_iPrioridad',
                                    direction: 'ASC'
                                }
                            ],
                            flex: 1,
                            style: {
                                borderColor: 'yellow',
                                borderStyle: 'solid'
                            },
                            hideColumns: ['rec_nestado'],
                            //showprocesartodos: true,
                            showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                            condiciones: arrCondicionesValues.join(','),
                            returnTab: 'tabDobleV',
                            operadorName: json.Usuario,
                            ope_iid: json.ope_iid,
                            hideOtherOperators: view.down('webremotonorthview').operadorId,
                            showTipo: arrTiposValues.join(','),
                            showGrupo: arrGruposValues.join(','),
                            showPrioridad: arrPrioridadesValues.join(','),
                            showOrigenes: arrOrigenesValues.join(','),
                        }
                    ]
                }));
            }

            if (json.AtenderAuto != "true" && (!json.MonitoreoGuiado || json.MonitoreoGuiado == 'false')) {
                var dobleH = tab.add(Ext.widget('panel', {
                    title: getLocale('Doble vista (H)'),
                    translate: false,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    // manejo los eventos con voz
                    listeners: {
                        activate: function () {
                            //VOLVER ATRAS var monitor = view.down( 'webremotonorthview' );
                            //VOLVER ATRAS monitor.mute = false;
                        },
                        deactivate: function () {
                            //VOLVER ATRAS var monitor = view.down( 'webremotonorthview' );
                            //VOLVER ATRAS monitor.mute = true;
                        }
                    },
                    itemId: 'tabDobleH',
                    items: [
                        {
                            xtype: 'eventospendientestrgridview',
                            itemId: 'pendientesDobleH',
                            title: getLocale('Pendientes'),
                            translate: false,
                            eventTarget: 'tab',
                            targetTab: eventos,
                            cls: 'pendientes',
                            eventEditor: 'eventomonitoreoview',
                            sorters: [
                                {
                                    property: 'rec_iPrioridad',
                                    direction: 'ASC'
                                }
                            ],
                            //showEstadosFilter: true,
                            flex: 1,
                            estados: 0,
                            style: {
                                borderColor: 'green',
                                borderStyle: 'solid'
                            },
                            hideColumns: ['rec_nestado'],
                            showprocesartodos: true,
                            showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                            condiciones: arrCondicionesValues.join(','),
                            returnTab: 'tabDobleH',
                            operadorName: json.Usuario,
                            hideOtherOperators: view.down('webremotonorthview').operadorId,
                            showEvents: filtroAlarmas,
                            showTipo: arrTiposValues.join(','),
                            showGrupo: arrGruposValues.join(','),
                            showPrioridad: arrPrioridadesValues.join(','),
                            showOrigenes: arrOrigenesValues.join(','),
                        },
                        {
                            xtype: 'eventospendientestrgridview',
                            itemId: 'esperaDobleH',
                            title: getLocale('En espera'),
                            translate: false,
                            eventTarget: 'tab',
                            targetTab: eventos,
                            estados: 2,
                            cls: 'espera',
                            eventEditor: 'eventomonitoreoview',
                            sorters: [
                                {
                                    property: 'rec_iPrioridad',
                                    direction: 'ASC'
                                }
                            ],
                            flex: 1,
                            style: {
                                borderColor: 'yellow',
                                borderStyle: 'solid'
                            },
                            hideColumns: ['rec_nestado'],
                            //showprocesartodos: true,
                            showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                            condiciones: arrCondicionesValues.join(','),
                            returnTab: 'tabDobleH',
                            operadorName: json.Usuario,
                            hideOtherOperators: view.down('webremotonorthview').operadorId,
                            showTipo: arrTiposValues.join(','),
                            showGrupo: arrGruposValues.join(','),
                            showPrioridad: arrPrioridadesValues.join(','),
                            showOrigenes: arrOrigenesValues.join(','),
                        }
                    ]
                }));
            }

            if (json.colaborador == 'true') {
                /*
                si es colaborador se abre en tab y con posibilidad de ver toda la info del evento, 
                apesar que ya tenga un usuario asignado.
                
                */
                var otrosoperadores = tab.add(Ext.widget('eventospendientestrgridview', {
                    title: getLocale('Otros operadores'),
                    translate: false,
                    itemId: 'tabotrosoperadores',
                    operadorNOT: json.Usuario,
                    estados: [1, 9, 4],
                    sorters: [
                        {
                            property: 'rec_iPrioridad',
                            direction: 'ASC'
                        }
                    ],
                    module: view.module,
                    showColumns: 'ope_cnombre',
                    //showprocesartodos: true,
                    eventEditor: 'eventomonitoreoview',
                    fireObservacionColaboracion: true,
                    eventTarget: 'tab',
                    targetTab: eventos,
                    hideProcessOperations: true,
                    showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                    condiciones: arrCondicionesValues.join(','),
                    noVerifyAssignedUser: true,
                    showCloseEvent: true,
                    forcehideProcessOperations: true
                }));
            } else {
                var otrosoperadores = tab.add(Ext.widget('eventospendientestrgridview', {
                    title: getLocale('Otros operadores'),
                    translate: false,
                    operadorNOT: json.Usuario,
                    estados: [1, 9, 4],
                    sorters: [
                        {
                            property: 'rec_iPrioridad',
                            direction: 'ASC'
                        }
                    ],
                    module: view.module,
                    showColumns: 'ope_cnombre',
                    showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                    condiciones: arrCondicionesValues.join(','),
                    //showprocesartodos: true
                    forcehideProcessOperations: true
                }));
            }

            var tiemporeal = tab.add(Ext.widget('eventospendientestrgridview', {
                title: getLocale('Tiempo Real'),
                isRealTime: true,
                estados: [0, 1, 2, 4, 9],
                noResaltarEventosMismaCuenta: true,
                showEstadosFilter: true,
                itemId: 'tabtiemporeal',
                showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                condiciones: arrCondicionesValues.join(','),
                module: view.module,
                operadorName: json.Usuario,

                showTipo: arrTiposValues.join(','),
                showGrupo: arrGruposValues.join(','),
                showPrioridad: arrPrioridadesValues.join(','),
                showOrigenes: arrOrigenesValues.join(','),
            }));

            var operadorVirtual = tab.add(Ext.widget('eventospendientestrgridview', {
                title: getLocale('Operador Virtual'),
                isRealTime: true,
                estados: [2],
                proceso: 61,
                noResaltarEventosMismaCuenta: true,
                showEstadosFilter: true,
                itemId: 'tabOperadorVirtual',
                showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                condiciones: arrCondicionesValues.join(','),
                module: view.module,
                operadorName: json.Usuario,

                showTipo: arrTiposValues.join(','),
                showGrupo: arrGruposValues.join(','),
                showPrioridad: arrPrioridadesValues.join(','),
                showOrigenes: arrOrigenesValues.join(','),
            }));

            if (view.supervision == 2) {
                var supervisor = tab.add(Ext.widget('eventospendientestrgridview', {
                    title: getLocale('Supervision'),
                    eventTarget: 'tab',
                    translate: false,
                    targetTab: eventos,
                    eventEditor: 'eventomonitoreoview',
                    itemId: 'tabsupervisor',
                    proceso: '40,44',
                    mostrar: 300,
                    showprocesartodos: false,
                    noshowprocesarporlotes: true,
                    showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                    module: view.module,
                    showTipo: arrTiposValues.join(','),
                    showGrupo: arrGruposValues.join(','),
                    showPrioridad: arrPrioridadesValues.join(','),
                    showOrigenes: arrOrigenesValues.join(','),
                    showColumns: 'rec_nestado',
                    sorters: sorters,
                    //condiciones: arrCondicionesValues.join(','),
                    //hideOtherOperators: view.down('webremotonorthview').operadorId,
                    operadorName: json.Usuario,
                    ope_iid: json.ope_iid,
                    noAbrirEventosGrisados: true,
                    iconFilter: false
                    /* listeners: {
                        activate: function(){
                            var monitor = view.down('webremotonorthview');
                            monitor.mute = false;
                        },
                        deactivate: function(){
                            var monitor = view.down('webremotonorthview');
                            monitor.mute = true;
                        }
                    }*/
                }));
            }

            if (json.otrasorganizaciones == "true") {
                var otrasorganizacionesview = Ext.widget('eventospendientestrgridview', {
                    title: getLocale('Otras organizaciones'),
                    eventTarget: 'tab',
                    translate: false,
                    targetTab: eventos,
                    eventEditor: 'eventomonitoreoview',
                    itemId: 'tabotrasorganizaciones',
                    estados: '0',
                    mostrar: 300,
                    showprocesartodos: true,
                    showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                    module: view.module,
                    showTipo: arrTiposValues.join(','),
                    showGrupo: arrGruposValues.join(','),
                    showPrioridad: arrPrioridadesValues.join(','),
                    showOrigenes: arrOrigenesValues.join(','),
                    showColumns: ['rec_nestado', 'organizacionName'],
                    sorters: sorters,
                    condiciones: arrCondicionesValues.join(','),
                    excluirOrganizacionUsuarioActual: true,
                    operadorName: json.Usuario,
                    ope_iid: json.ope_iid,
                    noAbrirEventosGrisados: true,
                    // manejo los eventos con voz
                    noFilterTotal: 1,
                    iconFilter: true,
                    procesoNot: '40',
                    listeners: {
                        activate: function () {
                            //VOLVER ATRAS var monitor = view.down( 'webremotonorthview' );
                            //VOLVER ATRAS monitor.mute = false;
                        },
                        deactivate: function () {
                            //VOLVER ATRAS var monitor = view.down( 'webremotonorthview' );
                            //VOLVER ATRAS monitor.mute = true;
                        }
                    }
                })

                tab.add(otrasorganizacionesview);
                Ext.defer(function () {
                    if (_UserData.Company == '0') {
                        otrasorganizacionesview.setDisabled(true)
                        //otrasorganizacionesview.tab.on('click', function () { //no pude hacerlo andar
                        notify('Para acceder a esta pestaña de otras organizaciones, debe tener configurada una organizacion en el usuario.')
                        //})
                    }
                }, 500, controller);
            }


            if (json.tareasVC == "true") {

                var tareas = tab.add(Ext.widget('eventospendientestrgridview', {
                    title: getLocale('Tareas VC'),
                    eventTarget: 'tab',
                    translate: false,
                    targetTab: eventos,
                    eventEditor: 'eventomonitoreoview',
                    itemId: 'tabtareas',
                    estados: '0',
                    mostrar: 300,
                    showprocesartodos: true,
                    showSmsSender: json.EnvioSmsSimple ? json.EnvioSmsSimple : false,
                    module: view.module,
                    showTipo: arrTiposValues.join(','),
                    showGrupo: arrGruposValues.join(','),
                    showPrioridad: arrPrioridadesValues.join(','),
                    showOrigenes: arrOrigenesValues.join(','),
                    showColumns: 'rec_nestado',
                    sorters: sorters,
                    condiciones: arrCondicionesValues.join(','),
                    //VOLVER ATRAS hideOtherOperators: view.down( 'webremotonorthview' ).operadorId, // descomento para probar pedido Dany 28/9/2018
                    operadorName: json.Usuario,
                    ope_iid: json.ope_iid,
                    noAbrirEventosGrisados: true,
                    // manejo los eventos con voz
                    noFilterTotal: 0,
                    soloTareas: true,
                    iconFilter: true,
                    procesoNot: '40,44',
                    listeners: {
                        activate: function () {
                            //VOLVER ATRAS var monitor = view.down( 'webremotonorthview' );
                            //VOLVER ATRAS monitor.mute = false;
                        },
                        deactivate: function () {
                            //VOLVER ATRAS var monitor = view.down( 'webremotonorthview' );
                            //VOLVER ATRAS monitor.mute = true;
                        }
                    },
                    /**
                     * BC 390361159 : Agregado personalizacion para mostar / ocultar bitacora, timeline, notas.
                     */
                    bitacora: bitacora,
                    timeline: timeline,
                    notas: notas
                }));
            }

            if (json.asignaciones == 'true') {
                tab.add(Ext.widget('asignacionmovilcuentagridview', {
                    title: getLocale('Asignaciones')
                }))
            }

            if (pendientes) {
                tab.setActiveTab(pendientes);
            }

        } else {
            notifyError('Debe configurar el operador asociado al usuario.')
        }
        var tabpanellista = eventos.down('#tabpanellista');
        tabpanellista.fireEvent('afterrender', tabpanellista);
    },
    // Reemplazá attachMisEventosListeners por esta versión "blindada"
    attachMisEventosListeners: function (eventosTab) {
        var me = this;

        // función para obtener el count "real" de lo que está cargado/visible
        var getSafeCount = function (st) {
            if (!st) return 0;
            // Evita totales globales del backend
            return Ext.isFunction(st.getCount) ? st.getCount() : (Ext.isNumber(st.totalCount) ? st.totalCount : 0);
        };

        // Recalcula y setea el título de "Mis eventos" usando SOLO la tab Lista
        var recomputeAndSetTitle = function () {
            if (!eventosTab || eventosTab.isDestroyed) return;
            if (!eventosTab._baseTitle) eventosTab._baseTitle = eventosTab.title || 'Mis eventos';

            var lista = eventosTab.down('#tabpanellista'); // <- SOLO "Lista"
            var st = lista && lista.getStore && lista.getStore();
            var total = getSafeCount(st);

            var newTitle = total > 0 ? (eventosTab._baseTitle + ' (' + total + ')') : eventosTab._baseTitle;
            if (eventosTab.title !== newTitle) eventosTab.setTitle(newTitle);
        };

        eventosTab._recomputeMisEventosTitle = recomputeAndSetTitle;

        // Escucho el load de TODOS los grids internos para reimponer nuestro título
        // (por si algún grid intenta setear otro número)
        var innerGrids = eventosTab.query('eventospendientestrgridview');
        Ext.Array.each(innerGrids, function (grid) {
            var st = grid && grid.getStore && grid.getStore();
            if (st && !grid._misEventosLoadBound) {
                st.on('load', function () { recomputeAndSetTitle(); });
                grid._misEventosLoadBound = true;
            }
        });

        // Primer cálculo inmediato
        recomputeAndSetTitle();
    },

    startMisEventosAutoRefresh: function (view) {
        var eventosTab = view.down('#miseventostabpanel');
        if (!eventosTab) return;

        this.attachMisEventosListeners(eventosTab);

        // Task: refresca SOLO la tab "Lista" y re-calcula el título
        view._misEventosTask = Ext.TaskManager.start({
            run: function () {
                if (!eventosTab || eventosTab.isDestroyed) return;
                var lista = eventosTab.down('#tabpanellista');
                var st = lista && lista.getStore && lista.getStore();
                if (st && !st.isLoading()) {
                    st.load({
                        callback: function () {
                            if (eventosTab._recomputeMisEventosTitle) {
                                eventosTab._recomputeMisEventosTitle();
                            }
                        }
                    });
                }
            },
            interval: 2000,
            scope: this
        });
    },

    startListaAutoRefresh: function (view) {
        // Busco la tabpanel principal y la "Lista"
        var tabpanelEventos = view.down('#miseventostabpanel');
        var lista = tabpanelEventos && tabpanelEventos.down('#tabpanellista');

        if (!lista) return;

        // Aseguro contador en títulos al cargar
        var ensureTitleCounts = function (store) {
            var total = (Ext.isNumber(store.totalCount) ? store.totalCount : store.getCount());

            // Actualiza título de la propia "Lista"
            var baseListaTitle = getLocale ? getLocale('Lista') : 'Lista';
            lista.setTitle(total > 0 ? (baseListaTitle + ' (' + total + ')') : baseListaTitle);

            // Actualiza título del contenedor "Mis eventos"
            var eventos = lista.up('#miseventostabpanel');
            if (eventos) {
                if (!eventos._baseTitle) eventos._baseTitle = eventos.title || 'Mis eventos';
                var newEventosTitle = total > 0 ? (eventos._baseTitle + ' (' + total + ')') : eventos._baseTitle;
                eventos.setTitle(newEventosTitle);
            }
        };

        // Me engancho al load del store una única vez
        var store = lista.getStore();
        if (store && !lista._attachedLoadListener) {
            store.on('load', function (s) { ensureTitleCounts(s); }, this, { single: false });
            lista._attachedLoadListener = true;
        }

        // Si el componente ya tiene un refresh interno, esto no molesta: sólo dispara load si no hay uno en curso
        // Guardamos el task en la vista para poder pararlo después
        view._listaRefreshTask = Ext.TaskManager.start({
            run: function () {
                if (!lista.rendered || lista.isDestroyed) return;
                var st = lista.getStore && lista.getStore();
                if (!st) return;

                // Evita superponer loads
                if (!st.isLoading()) {
                    // Si tu grid necesita params adicionales, setéalos acá antes del load
                    st.load();
                }
            },
            interval: 2000,   // <--- agregá esto (8s, ajustable)
            scope: this
        });

        // Arranco con un load inicial para que ya actualice los títulos sin esperar el primer tick
        if (store && !store.isLoading()) store.load();
    },

    stopListaAutoRefresh: function (view) {
        if (view && view._listaRefreshTask) {
            Ext.TaskManager.stop(view._listaRefreshTask);
            view._listaRefreshTask = null;
        }
    },

    setTtl: function (view, controller) {
        view.ttl = Ext.TaskManager.start({
            args: [view, controller],
            run: controller.ttl,
            interval: 10000
        });
    },

    ttl: function (view) {
        var controller = this;

        //var url = '/rest/timetolive/service/monitoreo/update';
        var url = '/rest/search/TimeToLiveCreateUpdateByTokenServiceProxy'

        Ext.Ajax.request({
            url: url,
            timeout: 5000,
            params: { operadorName: view.operadorId },
            method: 'GET',
            success: function (response) {
                view.failure = 0;
            },

            failure: function () {
                if (myQueryString.countout != 'false') {
                    view.failure++
                } else {
                    console.log('Se desahabilito failure');
                }

                if (view.failure > 5) {
                    Ext.Msg.alert(getLocale('Sesión del usuario'), getLocale('Perdió conexión, ingrese nuevamente.'));
                    Ext.Function.defer(function () { parent.location.href = "/" }, 5000, this);
                }
            }
        });
    },

    openObjectList: function () {
        /*
        var view = Ext.widget('eventosTRgridview');
        view.closable = false;
    
        var myPanel = Ext.getCmp('center');
        myPanel.add(view);
        myPanel.setActiveTab(view);
        */
    },

    openObjectById: function (objectId) {
        notifyError('Opción no soportada');
    }

});

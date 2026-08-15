// MIGRADO2024
Ext.define('Common.controller.EventoController', {
    extend: 'Ext.app.Controller',

    // =========================
    // Helpers reutilizables
    // =========================
    _ensureProfile: function (v) {
        var n = parseInt(v, 10);
        return (isNaN(n) || n <= 0) ? 1 : n;
    },

    _decodeIf: function (raw) {
        if (!raw) return null;
        if (Ext.isObject(raw)) return raw;
        try { return Ext.JSON.decode(raw); } catch (e) { return null; }
    },

    stores: [
        //'Common.store.EventoModuleStore',
        'Common.store.EventoEstadoStore',
        'Common.store.EventoOrigenStore',
        'Common.store.EventSecurityModuleStore',
        'Common.store.EventoProcesamientoStore'
    ],
    models: [
        'EventoTimeLineFullSearchModel',
        'p_grabacion_mp4SearchModel',
        'EventPhoneSearchModel',
        'EventImagesSearchModel',
        'EventProcesamientoSearchModel',
        'EventObservacionesSearchModel',
        'SmartPanicModel',
        'SmartPanicSearchModel',
        'ModuleModel',
        'EventoTimelineModel',
        'EventSmsSearchModel',
        'SmartPanicGpsModel',
        'GpsHistoricoSearchModel',
        'CuentaRecepcionModel',
        'VehicleSearchModel',
        'SmartTrackSearchModel'
    ],
    views: ['VigiControlGpsView', 'EventoView'],

    init: function (config) {
        this.control({
            'eventoview': {
                afterrender: this.initView
            },
            'llamadahelperview': {
                save: this.onLlamadaSaved
            }
        });
    }, // cierro init

    onLlamadaSaved: function (view, record) {
        if (view.up('tabpanel')) {
            var llamadas = view.up('tabpanel').down('eventphonegridview');
            if (llamadas) {
                llamadas.fireEvent('refresh', llamadas);
            }
            var observaciones = view.up('tabpanel').down('eventobservacionesgridview');
            if (observaciones) {
                observaciones.fireEvent('refresh', observaciones);
            }
        }
    },

    initView: function (view) {
        var record = view.record;
        var controller = this;

        view.timelineStore = Ext.create('Ext.data.Store', {
            model: this.getEventoTimeLineFullSearchModelModel(),
            autoLoad: false,
            remoteSort: true,
            remoteFilter: true
        });

        var west = view.down('moduletreeview');

        var securityTreeStore = Ext.create("Ext.data.TreeStore", {
            root: {
                text: "Datos",
                expanded: false,
                leaf: false,
            },
        });

        west.targetTab = view.down('tabpanel');
        west.bindStore(securityTreeStore);
        west.setRootNode(deepCloneRoot(securityTreeStore.getRootNode()));

        if (
            (view.record.store.model.modelName && view.record.store.model.modelName.indexOf('EventosTiempoRealModel') >= 0) ||
            (view.record.store.model.entityName && view.record.store.model.entityName.indexOf('EventosTiempoRealModel') >= 0)
        ) {
            Ext.create('Ext.data.Store', {
                model: 'Common.model.CuentaRecepcionModel',
                pageSize: 200,
                remoteSort: true,
                listeners: {
                    beforeload: function (store, operation) {
                        store.getProxy().setExtraParams({
                            onlyRec_iid: view.record.get('rec_iid'),
                            mostrar: 1,
                            orden: 'ASC'
                        });
                    }
                },
                sorters: [{ property: 'rec_tfechahora', direction: 'DESC' }]
            }).load({
                callback: function (records) {
                    controller.openModules(view, records[0], controller);
                }
            });
        } else {
            controller.openModules(view, record, controller);
        }

        west.getRootNode().expand();
    },



    setRecord: function (record, viewport) {
        var myPanel = viewport.down('tabpanel');
        var center = viewport.down('#center');
        var rec_iid = record.get('rec_iid');

        var estadoStore = Ext.data.StoreManager.lookup('EventoEstadoStore');
        var estadoRec = estadoStore.findRecord('Value', record.get('rec_nestado'));
        if (estadoRec) var estado = estadoRec.get('Name');

        var rec_nOrigen = record.get('rec_nOrigen');
        var rec_ipuerto = record.get('rec_iPuerto');
        var origenStore = Ext.data.StoreManager.lookup('EventoOrigenStore');
        var origenRec = origenStore.findRecord('Value', rec_nOrigen);
        if (origenRec) {
            var origen = origenRec.get('Name');
        }

        if (rec_nOrigen == 2 && rec_ipuerto < 100) origen = getLocale('PG:');
        if (rec_nOrigen == 2 && rec_ipuerto > 100) origen = getLocale('IR:');
        if (rec_nOrigen == 6 && rec_ipuerto < 0) origen = getLocale('TR:');

        var puerto = (rec_ipuerto < 0) ? 0 : rec_ipuerto;
        origen = origen + ' ' + puerto;

        if (record.get('_origen') == '') record.set('_origen', origen);

        var _win = viewport.up('window');
        if (_win && viewport.nombreEvento) {
            _win.setTitle(record.get('_eventDescripcion') + ' ' + record.get('_FechaHora') + ' ' + viewport.nombreEvento);
        }

        if (center) { center.record = record; }

        var timeline = myPanel.down('eventotimelinefullgridview');
        var fechaProceso = record.get('rec_isoFechaProceso');
        if (timeline && fechaProceso && viewport.timelineStore) {
            timeline.getStore().add({
                fecha: record.get('rec_isoFechaProceso'),
                usuario: record.get('ope_cnombre'),
                comentario: record.get('_resolucion'),
                iconCls: 'icon-door'
            });
        }
    },

    // =========================
    // Nueva lógica de openModules
    // =========================
    openModules: function (view, record, controller) {
        var tabpanel = view.down('tabpanel');
        var ensureProfile = Ext.bind(this._ensureProfile, this);
        var decodeIf = Ext.bind(this._decodeIf, this);

        var addModule = function (_module) {
            if (!_module) return;
            var m = _module.data ? _module.data : _module;
            var profile = ensureProfile(m.profile);

            var moduleModel = controller.getModuleModelModel();
            var mymodule = Ext.create(moduleModel, {
                text: m.text,
                view: m.view,
                iconCls: m.iconCls,
                leaf: true,
                closable: false,
                profile: profile,
                viewConfig: m.viewConfig
            });
            controller.timeLineInitModule(m.view, mymodule, record, tabpanel);
        };

        var addModulesFromArray = function (arr) {
            Ext.Array.each(arr || [], function (m) { addModule(m); });
        };

        // detección de módulos / roles
        var securitymodules = SecurityModulesStore; // store global
        var masterModule = securitymodules.findRecord('KeyReference', 'MasterWebDealer');
        var adminModule = securitymodules.findRecord('KeyReference', 'Administrator');
        var accountModule = securitymodules.findRecord('KeyReference', 'SgAppAccountAdministration');
        var webRemModule = securitymodules.findRecord('KeyReference', 'WebRemoto');

        var isMaster = masterModule ? masterModule.get('Available') : false;
        var isAdmin = adminModule ? adminModule.get('Available') : false;
        var isAccount = accountModule ? accountModule.get('Available') : false;
        var isWebRemoto = webRemModule ? webRemModule.get('Available') : false;

        var adminJson = null;
        if (isAdmin) {
            var adminRaw = adminModule.get('Security');
            console.log('ELSE SECURITY Admin', adminRaw);
            adminJson = decodeIf(adminRaw);
        }
        var adminHasAccountRights = !!(adminJson && adminJson.rights && adminJson.rights.cuenta === true);

        if (isMaster || isAdmin || isAccount || isWebRemoto) {
            if (adminHasAccountRights) {
                console.log('ELSE SECURITY', adminJson);
                addModulesFromArray(adminJson.event || []);
            } else {
                var evStore = Ext.data.StoreManager.lookup('Common.store.EventSecurityModuleStore');
                evStore.each(function (rec) { addModule(rec); });
            }
            tabpanel.setActiveTab(0);
            controller.setRecord(record, view);
            return;
        }

        if (adminHasAccountRights) {
            addModulesFromArray(adminJson.event || []);
            tabpanel.setActiveTab(0);
            controller.setRecord(record, view);
            return;
        }

        // Dealer / apps tipo Dealer
        var secStore = Ext.data.StoreManager.lookup('SecurityModulesStore');
        var appName = controller.application._nameModule;
        var isDealerLike = (appName === 'SmartPanics' || appName === 'Webremoto' || appName === 'SgAppSerTec' || appName === 'SerTec');

        if (isDealerLike) {
            var holder = null;
            if (secStore.isModuleAvailable('WebDealer')) {
                holder = secStore.getModuleAvailable('WebDealer');
            } else if (secStore.isModuleAvailable('Administrator')) {
                holder = secStore.getModuleAvailable('Administrator');
            }

            var parsed = null;
            if (holder) {
                var sec = holder.get('_Security');
                parsed = decodeIf(sec) || sec;
            }

            if (parsed && Ext.isArray(parsed.event) && parsed.event.length > 0) {
                console.log('ELSE SECURITY Dealer', parsed);
                addModulesFromArray(parsed.event);
            } else {
                console.log('ELSE SECURITY Dealer (event vacío) → fallback EventSecurityModuleStore');
                var fallback = Ext.data.StoreManager.lookup('Common.store.EventSecurityModuleStore');
                fallback.each(function (rec) { addModule(rec); });
            }
        } else {
            console.log('ELSE');
            if (secStore.isModuleAvailable(appName)) {
                var Sec = secStore.getModuleAvailable(appName).get('_Security');
                var parsedSec = decodeIf(Sec) || Sec;
                var moduleArray = parsedSec && parsedSec.event ? parsedSec.event : null;

                if (!moduleArray && parsedSec && parsedSec.Security) {
                    var inner = decodeIf(parsedSec.Security);
                    moduleArray = inner ? (inner.event || inner.modules) : null;
                }
                addModulesFromArray(moduleArray || []);
            }
        }

        tabpanel.setActiveTab(0);
        controller.setRecord(record, view);
    },

    timeLineInitModule: function (modulo, _module, record, tabpanel) {
        var view = tabpanel.up('eventoview');
        var table = view.table;
        var west = view.down('moduletreeview');
        var controller = this;
        var activeTab = '';
        var prof = this._ensureProfile(_module.get('profile'));

        switch (modulo) {
            case "llamadahelperview":
                west.store.getRootNode().appendChild({
                    text: getLocale(_module.get('text')),
                    iconCls: _module.get('iconCls'),
                    leaf: true,
                    view: _module.get('view'),
                    closable: true,
                    viewConfig: "{ profile: " + prof + ", llamadoNoAutomatico:true,  posProcesado: true, hideClose:true }"
                });
                break;

            case "eventsoundview":
                if (record.get('rec_cContenido').indexOf('Video') != -1) break;
                Ext.Ajax.request({
                    url: '/Rest/search/p_rximg',
                    params: { rxi_irecid: record.get('rec_iid'), rxi_cTipo: 'mp4,mp3' },
                    method: 'GET',
                    scope: this,
                    success: function (response) {
                        var parametros = Ext.JSON.decode(response.responseText);
                        var total = parametros.total;
                        if (total > 0) {
                            west.store.getRootNode().appendChild({
                                text: getLocale(_module.get('text')),
                                iconCls: _module.get('iconCls'),
                                leaf: true,
                                view: _module.get('view'),
                                closable: true,
                                viewConfig: "{ profile: " + prof + " }"
                            });
                        }
                    }
                });
                break;

            case "speventovideoview":
                if (record.get('rec_cContenido').indexOf('Video') == -1 &&
                    record.get('rec_cContenido').indexOf('MP4') == -1) break;

                Ext.Ajax.request({
                    url: '/Rest/search/p_rximg',
                    params: { rxi_irecid: record.get('rec_iid'), rxi_cTipo: 'mp4' },
                    method: 'GET',
                    scope: this,
                    success: function (response) {
                        var parametros = Ext.JSON.decode(response.responseText);
                        var total = parametros.total;
                        if (total > 0) {
                            west.store.getRootNode().appendChild({
                                text: getLocale(_module.get('text')),
                                iconCls: _module.get('iconCls'),
                                leaf: true,
                                view: _module.get('view'),
                                closable: true,
                                viewConfig: "{ profile: " + prof + " }"
                            });
                        }
                    }
                });
                break;

            case "eventotimelinegridview":
                var newTab = Ext.widget('eventotimelinefullgridview', {
                    iconCls: _module.get('iconCls'),
                    record: record,
                    translate: false,
                    title: getLocale(_module.get('text')),
                    closable: false,
                    store: view.timelineStore,
                    module: _module,
                    profile: prof,
                    table: table
                });

                view.timelineStore = newTab.getStore();
                tabpanel.add(newTab);
                activeTab = newTab;

                west.store.getRootNode().appendChild({
                    text: getLocale(_module.get('text')),
                    iconCls: _module.get('iconCls'),
                    leaf: true,
                    view: _module.get('view'),
                    closable: true,
                    viewConfig: "{ profile: " + prof + " }"
                });
                break;

            case "eventoformview":
                west.store.getRootNode().appendChild({
                    text: getLocale(_module.get('text')),
                    iconCls: _module.get('iconCls'),
                    leaf: true,
                    view: 'eventoformverticalview',
                    closable: true,
                    translate: false,
                    viewConfig: "{ closeAction: 'destroy' }"
                });
                break;

            case "eventoformverticalview":
                west.store.getRootNode().appendChild({
                    text: getLocale(_module.get('text')),
                    iconCls: _module.get('iconCls'),
                    leaf: true,
                    view: _module.get('view'),
                    closable: true,
                    translate: false,
                    closeAction: 'destroy',
                    viewConfig: "{ closeAction: 'destroy' }"
                });
                break;

            case "spreadonlyview":
                if (record.get('tip_nTipo') != 5 && record.get('gps_cIMEI') && record.get('gps_cIMEI') != "") {
                    var mystore = Ext.create('Ext.data.Store', {
                        remoteFilter: true,
                        remoteSort: true,
                        model: controller.getSmartPanicSearchModelModel(),
                        filters: { property: 'Imei', value: record.get('gps_cIMEI') }
                    });
                    mystore.load({ store: mystore, panel: tabpanel, module: _module, callback: controller.showPanel, scope: controller });
                }
                break;

            case "vcreadonlyview":
                if (record.get('tip_nTipo') == 5 && record.get('gps_cIMEI') && record.get('gps_cIMEI') != "") {
                    var mystore = Ext.create('Ext.data.Store', {
                        model: controller.getSmartTrackSearchModelModel(),
                        remoteFilter: true,
                        filters: { property: 'Imei', value: record.get('gps_cIMEI') }
                    });
                    mystore.load({
                        store: mystore,
                        panel: tabpanel,
                        module: _module,
                        callback: function (recordsx, operation, success) {
                            if (success && recordsx.length > 0) {
                                var west = operation.panel.up('eventoview').down('moduletreeview');
                                west.store.getRootNode().appendChild({
                                    text: getLocale(_module.get('text')),
                                    iconCls: _module.get('iconCls'),
                                    leaf: true,
                                    view: _module.get('view'),
                                    closable: true
                                }).viewConfig = { profile: prof, initStore: operation.store, records: recordsx, initModule: _module };
                            }
                        }
                    });
                }
                break;

            case "smartpanicgpsview":
                if (record.get('gps_rLatitud') && record.get('gps_rLatitud') != '0.0'
                    && record.get('gps_rLongitud') && record.get('gps_rLongitud') != '0.0'
                    && (record.get('rxt_nSPIP') == 1 || record.get('rxt_nSPSMS') == 1 || record.get('rec_calarma') == '_TP' || record.get('rec_calarma') == '_TA ' || record.get('rec_calarma') == '_CT' || record.get('rec_calarma') == '_TC' || record.get('rec_calarma') == '_TA' || record.get('rec_cdll') == 'VivecarPacketParser' || record.get('rec_cdll') == 'XMLReceiverDriverPacketParser') // no llego por smartpanics pero son eventos de VC con posicion https://basecamp.com/2249105/projects/14758734/todos/408947845
                ) {
                    var mystore = Ext.create('Ext.data.Store', {
                        model: controller.getSmartPanicSearchModelModel(),
                        filters: { property: 'CuentaId', value: record.get('cue_iid') }
                    });
                    mystore.load({
                        viewConfig: '{eventId:' + record.get('rec_iid') + '}',
                        store: mystore,
                        panel: tabpanel,
                        module: _module,
                        callback: controller.showPanel,
                        scope: controller
                    });
                }
                break;

            case "vehicleslavegpsview":
                if (
                    ((record.get('gps_rLatitud') && record.get('gps_rLatitud') != '0.0' &&
                        record.get('gps_rLongitud') && record.get('gps_rLongitud') != '0.0') ||
                        (record.get('gps_rlatitud') && record.get('gps_rlatitud') != '0.0' &&
                            record.get('gps_rlongitud') && record.get('gps_rlongitud') != '0.0')) &&
                    record.get('tip_nTipo') == 1
                ) {
                    var vehiclestore = Ext.create('Ext.data.Store', {
                        model: controller.getVehicleSearchModelModel(),
                        pageSize: 150,
                        remoteFilter: true,
                        sorters: [{ property: 'Name', direction: 'ASC' }],
                        filters: [{ property: 'cue_iid', value: record.get('cue_iid') }]
                    }).load({
                        callback: function (records) {
                            west.store.getRootNode().appendChild({
                                text: getLocale(_module.get('text')),
                                iconCls: _module.get('iconCls'),
                                leaf: true,
                                view: _module.get('view'),
                                closable: true
                            }).viewConfig = {
                                recordSlaveGps: records[0],
                                hideDatapanel: true,
                                hideToolbar: true,
                                center: record.get('gps_rlatitud') + ',' + record.get('gps_rlongitud'),
                                eventId: record.get('rec_iid'),
                                hidedisplayname: true
                            };
                        }
                    });
                }
                break;

            case "vigicontrolgpsview":
                if (!_module.viewConfig) _module.viewConfig = '{preventPlayer: true}';

                if (
                    ((record.get('gps_rLatitud') && record.get('gps_rLatitud') != '0.0' &&
                        record.get('gps_rLongitud') && record.get('gps_rLongitud') != '0.0') ||
                        (record.get('gps_rlatitud') && record.get('gps_rlatitud') != '0.0' &&
                            record.get('gps_rlongitud') && record.get('gps_rlongitud') != '0.0')) &&
                    record.get('tip_nTipo') == 5
                ) {
                    var mystorex = Ext.create('Ext.data.Store', {
                        model: controller.getGpsHistoricoSearchModelModel(),
                        remoteFilter: true,
                        filters: { property: 'gps_idRec', value: record.get('rec_iid') }
                    });
                    mystorex.load({
                        callback: function (records, operation, success) {
                            if (records.length > 0) {
                                var mystore = Ext.create('Ext.data.Store', {
                                    model: controller.getSmartTrackSearchModelModel(),
                                    remoteFilter: true,
                                    filters: { property: 'Imei', value: records[0].get('gps_cIMEI') }
                                });
                                mystore.load({ store: mystore, panel: tabpanel, module: _module, callback: controller.showPanel, scope: controller });
                            }
                        }
                    });
                }
                break;

            case "eventimagesgridview":
                var rec_iid = record.get('rec_iid');
                Ext.Ajax.request({
                    url: '/Rest/search/SGSP_VideoLinkParser',
                    params: { iRecID: rec_iid, tabla: record.get('tablaDatos') },
                    method: 'GET',
                    scope: this,
                    success: function (response) {
                        var parametros = Ext.JSON.decode(response.responseText);
                        west.store.getRootNode().appendChild({
                            text: getLocale('Multimedia'),
                            iconCls: _module.get('iconCls'),
                            leaf: true,
                            view: 'dguardpanelview',
                            closable: true,
                            viewConfig: "{ profile: " + prof + ", imagenesSoloDelEvento:true, noToolbar:true }"
                        });

                        west.store.getRootNode().appendChild({
                            text: getLocale('Imagenes procesadas'),
                            iconCls: _module.get('iconCls'),
                            leaf: true,
                            view: 'eventimagesgridview',
                            closable: true,
                            viewConfig: "{ profile: " + prof + ", imagenesSoloDelEvento:true, noToolbar:true }"
                        });
                    }
                });
                break;

            case "eventphonegridview":
                var mystore = Ext.create('Ext.data.Store', {
                    model: controller.getEventPhoneSearchModelModel()
                });

                mystore.load({
                    rec_iid: record.get('rec_iid'),
                    store: mystore,
                    panel: tabpanel,
                    module: _module,
                    callback: function (records, operation, success) {
                        if (success && records.length > 0) {
                            if (view.timelineStore) {
                                Ext.Array.each(records, function (r) {
                                    view.timelineStore.add({
                                        fecha: r.get('rec_isoFechaHora'),
                                        usuario: r.get('ope_cnombre'),
                                        comentario: r.get('rec_cObservaciones'),
                                        iconCls: 'icon-telephone'
                                    });
                                });
                            }
                        }
                    }
                });

                west.store.getRootNode().appendChild({
                    text: getLocale(_module.get('text')),
                    iconCls: _module.get('iconCls'),
                    leaf: true,
                    translate: false,
                    view: _module.get('view'),
                    closable: true,
                    viewConfig: "{ profile: " + prof + " }"
                });
                break;

            case "eventobservacionesformview":
            case "eventorecategorizacionformview":
                var idsProcesados = [3, 5, 6, 7];
                if (idsProcesados.indexOf(record.get('rec_nestado')) >= 0) {
                    west.store.getRootNode().appendChild({
                        text: getLocale(_module.get('text')),
                        translate: false,
                        iconCls: _module.get('iconCls'),
                        leaf: true,
                        view: 'eventorecategorizacionformview',
                        closable: true,
                        viewConfig: "{ profile: " + prof + ",procesar: true }"
                    });
                }
                break;

            case "eventobservacionesgridview":
                west.store.getRootNode().appendChild({
                    text: getLocale(_module.get('text')),
                    iconCls: _module.get('iconCls'),
                    leaf: true,
                    view: _module.get('view'),
                    closable: true,
                    viewConfig: "{ profile: " + prof + ",rec_iid: " + record.get('rec_iid') + " }"
                });
                break;

            case "eventsmsgridview":
                var storeSms = Ext.create('Ext.data.Store', {
                    model: controller.getEventSmsSearchModelModel()
                });
                storeSms.load({
                    rec_iid: record.get('rec_iid'),
                    store: storeSms,
                    panel: tabpanel,
                    module: _module,
                    callback: function (records, operation, success) {
                        if (success && records.length > 0) {
                            if (view.timelineStore) {
                                Ext.Array.each(records, function (r) {
                                    view.timelineStore.add({
                                        fecha: r.get('rec_isoFechaHora'),
                                        usuario: r.get('ope_cnombre'),
                                        comentario: r.get('rec_cObservaciones'),
                                        iconCls: 'icon-email'
                                    });
                                });
                            }
                            west.store.getRootNode().appendChild({
                                text: getLocale(_module.get('text')),
                                iconCls: _module.get('iconCls'),
                                leaf: true,
                                view: _module.get('view'),
                                closable: true,
                                viewConfig: "{ profile: " + prof + " }"
                            });
                        }
                    }
                });
                break;

            case "eventprocesamientogridview":
                var storeProc = Ext.create('Ext.data.Store', {
                    model: controller.getEventProcesamientoSearchModelModel()
                });
                storeProc.load({
                    rec_iid: record.get('rec_iid'),
                    store: storeProc,
                    panel: tabpanel,
                    module: _module,
                    callback: function (records, operation, success) {
                        if (success && records.length > 0) {
                            var storeDefs = Ext.data.StoreManager.lookup('EventoProcesamientoStore');
                            Ext.Array.each(records, function (r) {
                                var proc = storeDefs.findRecord('Value', r.get('pro_nProceso'));
                                if (proc) r.set('pro_cProceso', proc.get('Name'));
                                if (view.timelineStore) {
                                    view.timelineStore.add({
                                        fecha: r.get('pro_isofechahora'),
                                        usuario: r.get('ope_cnombre'),
                                        comentario: r.get('pro_cProceso'),
                                        iconCls: 'icon-cog'
                                    });
                                }
                            });

                            west.store.getRootNode().appendChild({
                                text: getLocale(_module.get('text')),
                                iconCls: _module.get('iconCls'),
                                leaf: true,
                                view: _module.get('view'),
                                closable: true,
                                viewConfig: "{ profile: " + prof + " }"
                            });
                        }
                    }
                });
                break;

            case "eventorepautgridview":
                Ext.Ajax.request({
                    url: '/Rest/search/TimelineQ8',
                    params: { IdEvento: record.get('rec_iid') },
                    method: 'GET',
                    scope: this,
                    success: function (response) {
                        var reporte = Ext.JSON.decode(response.responseText).rows[0];
                        if (!reporte) return;

                        west.store.getRootNode().appendChild({
                            text: getLocale(_module.get('text')),
                            iconCls: _module.get('iconCls'),
                            leaf: true,
                            view: _module.get('view'),
                            closable: true,
                            viewConfig: "{ profile: " + prof + " }"
                        });

                        var estados = reporte.rep_mcomentario ? reporte.rep_mcomentario.split('\r\n') : null;
                        var autoridad = reporte.aut_cnombre;

                        if (estados) {
                            Ext.Array.each(estados, function (estado) {
                                var found = estado.match(/\[(..\/..\/.{4} ..:..:..) (.*?)\] (.*)/);
                                if (found) {
                                    var fecha = Ext.Date.parse(found[1], 'd/m/Y H:i:s');
                                    var est = found[2];
                                    var comentario = found[3];
                                    if (view.timelineStore) {
                                        view.timelineStore.add({
                                            fecha: fecha,
                                            usuario: autoridad,
                                            comentario: '[' + est + '] ' + comentario,
                                            iconCls: 'icon-shield'
                                        });
                                    }
                                }
                            });
                        } else if (view.timelineStore) {
                            view.timelineStore.add({
                                fecha: reporte.rep_dresolfechahora,
                                usuario: reporte.aut_cnombre,
                                comentario: '[' + reporte.rep_nestado + '] ' + reporte.rep_mcomentario,
                                iconCls: 'icon-shield'
                            });
                        }
                    }
                });
                break;

            case "eventsmartpanicslogview":
                if (record.get('rxt_nSPIP') == 1 || record.get('rxt_nSPSMS') == 1) {
                    var storeTxt = Ext.create('Ext.data.Store', {
                        model: controller.getP_grabacion_mp4SearchModelModel(),
                        remoteFilter: true,
                        remoteSort: true,
                        filters: [
                            { property: 'grm_cTipo', value: 'TXT' },
                            { property: 'grm_iidRecepcion', value: record.get('rec_iid') }
                        ]
                    });
                    storeTxt.load({ store: storeTxt, panel: tabpanel, module: _module, limit: 1, callback: controller.showPanel, scope: controller });
                }
                break;
        }

        if (activeTab) {
            tabpanel.setActiveTab(activeTab);
        }
    },

    showPanel: function (records, operation, success) {
        if (success) {
            if (records.length > 0) {
                var view = operation.panel;
                var _module = operation.module;
                var viewConfig = operation.viewConfig ? operation.viewConfig : _module.viewConfig;
                var west = view.up('eventoview').down('moduletreeview')

                if (!viewConfig) {
                    viewConfig = {};
                }

                Ext.apply(viewConfig, { profile: _module.get('profile'), initStore: operation.store, records: records, initModule: _module });

                west.store.getRootNode().appendChild({
                    text: getLocale(_module.get('text')),
                    iconCls: _module.get('iconCls'),
                    leaf: true,
                    view: _module.get('view'),
                    closable: true,
                    viewConfig: viewConfig
                }).viewConfig = viewConfig;
            }
        }
    },

    addImagenToTabpanel: function (record, view, tabpanel, module) {
        var controller = this;
        var west = view.down('moduletreeview');
        var prof = this._ensureProfile(module.get('profile'));

        var mystore = Ext.create('Ext.data.Store', {
            model: controller.getEventImagesSearchModelModel()
        });

        mystore.load({
            rec_iid: record.get('rec_iid'),
            store: mystore,
            panel: tabpanel,
            module: module,
            callback: function (records, operation, success) {
                if (success && records.length > 0) {
                    if (view.timelineStore) {
                        Ext.Array.each(records, function (r) {
                            view.timelineStore.add({
                                fecha: r.get('gri_isofechahora'),
                                usuario: '',
                                comentario: r.get('gri_carchivo'),
                                iconCls: 'icon-photo'
                            });
                        });
                    }
                    if (module.get('view') == 'eventimagesgridview') {
                        west.store.getRootNode().appendChild({
                            text: getLocale(module.get('text')),
                            iconCls: module.get('iconCls'),
                            leaf: true,
                            view: module.get('view'),
                            closable: true,
                            viewConfig: "{ profile: " + prof + ", imagenesSoloDelEvento:" + view.imagenesSoloDelEvento + " }"
                        });
                    } else {
                        west.store.getRootNode().appendChild({
                            text: getLocale(module.get('text')),
                            iconCls: module.get('iconCls'),
                            leaf: true,
                            view: module.get('view'),
                            closable: true,
                            viewConfig: "{ profile: " + prof + " }"
                        });
                    }
                }
            }
        });
    }
});

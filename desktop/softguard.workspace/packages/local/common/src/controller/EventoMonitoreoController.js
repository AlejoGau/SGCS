//MIGRADO2024
Ext.define('Common.controller.EventoMonitoreoController', {
    extend: 'Ext.app.Controller',
    stores: ['Common.store.EventoEstadoStore', 'Common.store.EventoOrigenStore', 'Common.store.EventoModuleStore', 'Common.store.EventSecurityModuleStore', 'Common.store.KeyModulesStore', 'Common.store.TablasCategorizacionStore', 'Common.store.TablasResolucionesStore', 'Common.store.SgAppMWStore', 'Common.store.TablasObservacionesStore', 'Common.store.SgAppMWVariableStore'],
    models: ['ModuleModel', 'VehicleSearchModel', 'SoftguardCuentaModel', 'SoftguardNotaModel', 'EstadoItemModel', 'SoftguardZonaModel', 'EventosTiempoRealModel', 'EventImagesSearchModel', 'KeyModulesModel', 'ServTecSearchModel', 'TablasResolucionesSearchModel', 'TablasCategorizacionSearchModel', 'TablasObservacionesSearchModel', 'NotasModel', 'BitacoraSearchModel', 'BitacoraModel', 'ZonaSearchModel', 'BuscoEstadoCuentaSearchModel', 'EventosTiemLineModel', 'EventosPendientesSearchModel'],
    views: ['EventoMonitoreoPanelView', 'EventoMonitoreoView'],
    init: function (config) {
        // genero los eventos
        this.control({
            'eventomonitoreoview': {
                afterrender: this.initView, // saque activate y volvi a afterrender porque repite la paleta, volver a analizar
                beforedestroy: this.beforeDestroy
                //   refreshTimeline: this.onRefreshTimeline
            },
            'eventomonitoreoview #imagePanel': {
                hascontent: this.onImagePanelHasContet,
                aftermaximize: this.onImagePanelAfterMaximize,
                windowclose: this.onWindowClose
            }
        });
    }, // cierro init
    beforeDestroy: function (view) {
        if (view.taskEvaluarEvento) {
            Ext.TaskManager.stop(view.taskEvaluarEvento)
        }
        if (view.up('viewport')) {
            view.up('viewport').down('webremotonorthview').repetirSonido = false
        }
        Ext.Array.each(view.windowsHijas, function (v) {
            if (v) {
                v.close()
            }
        })
    },
    /**
     * Se encarga de evaluar si el evento esta en "en proceso" y si el operador corresponde al usuario logeado
     */
    evaluarEvento: function (view, controller, offCartel) {
        try {
            if (getParametro('PERMITEATENDERCUENTAENPROCESO ') == 1) {
                view.noVerifyAssignedUser = true;
            }
            //console.log('Evaluo evento')
            var store = view.storeEstadoEvento;
            var filters = [
                {
                    property: 'rec_nestado:ININT',
                    value: '1,4' //se saco los eventos en espera (2) a pedido de pablo cas el dia 04/07/2017 por chat
                }, {
                    property: 'rec_iid',
                    value: view.record.get('rec_iid')
                }
            ];
            if (!view.noVerifyAssignedUser) {
                filters.push(
                    {
                        property: 'operadorAtendiendoCuentaININT',
                        value: view.up('viewport').operadorId
                    }
                )
            }
            if (!store) {
                store = Ext.create('Ext.data.Store', {
                    model: controller.getEventosPendientesSearchModelModel(),
                    remoteGroup: false,
                    remoteSort: true,
                    autoDestroy: true,
                    pageSize: 1,
                    remoteFilter: true,
                    filters: filters
                })
            }
            store.proxy.extraParams = {
                disabledOrganization: true
            };

            var loadParams = {};

            if (view.excluirOrganizacionUsuarioActual === true) {
                loadParams.excluirOrganizacionUsuarioActual = 'true';
            }

            if (!store.cargando) {
                store.cargando = true;
                store.load({
                    params: loadParams,
                    callback: function (records, operation) {
                        store.cargando = false;
                        if (operation.success) {
                            if (records.length == 0) {
                                if (!offCartel) {
                                    if (!view.soloTareas) {
                                        //view.close(); //Daniel O. Medina anuldo por https://softguard.atlassian.net/browse/DK-1389
                                    }
                                }
                            }
                        } else {
                            console.log('No se pudo evaluar el evento por falla en la conexion.')
                        }
                    }
                });
            }
        }
        catch (err) {
            console.log("Error al evaluar evento:" + err.message)
        }
    },

    initView: function (view) {
        view.windowsHijas = [];
        Ext.suspendLayouts();
        var record = view.record;
        var rec_iid = record.get('rec_iid');
        var controller = this;
        var module = this.getModuleModelModel().create({
            profile: 3
        });
        var west = view.down('#datoscuentatree');
        //west.setRootNode(deepCloneRoot(this.getSgAppMWStoreStore().getRootNode()));



        var securityTreeStore = Ext.create('Ext.data.TreeStore', {
            //model: controller.getModuleModelModel(),
            //autoLoad: false,
            /*proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: ''
                }
            },*/
            root: {
                text: 'Datos',
                expanded: false,
                leaf: false
            }
        });

        var treeStore = west.getStore && west.getStore();
        if (!treeStore) {
            treeStore = Ext.create('Ext.data.TreeStore', {
                root: { text: 'Datos', expanded: true, leaf: false }
            });
            west.setStore(treeStore);
        }
        var root = treeStore.getRootNode();
        root.removeAll(true);

        // 2) Obtengo SecurityModulesStore (con lookup + fallback)
        var storeSecurity = Ext.data.StoreManager.lookup('SecurityModulesStore') || SecurityModulesStore;

        // 3) Si no cargó todavía: reintento con lock para no duplicar initView
        if (storeSecurity && (
            (storeSecurity.isLoading && storeSecurity.isLoading()) ||
            (storeSecurity.getCount && storeSecurity.getCount() === 0)
        )) {
            if (!view.__initViewRetrying) {
                view.__initViewRetrying = true;
                Ext.defer(function () {
                    view.__initViewRetrying = false;
                    if (!view.destroyed && !view.destroying) {
                        this.initView(view);
                    }
                }, 300, this);
            }
            return;
        }

        // 4) Busco módulos clave
        var administratorModule = storeSecurity.findRecord('KeyReference', 'Administrator', 0, false, false, true);
        var masterModule = storeSecurity.findRecord('KeyReference', 'MasterWebDealer', 0, false, false, true);
        var webDealerModule = storeSecurity.findRecord('KeyReference', 'WebDealer', 0, false, false, true);
        var webRemotoModule = storeSecurity.findRecord('KeyReference', 'WebRemoto', 0, false, false, true);

        view.recordWebremoto = webRemotoModule;

        // 5) Flags (igual concepto que tu CuentaGridController)
        var isMaster = masterModule ? masterModule.get('Available') === true : false;
        var isWebDealer = webDealerModule ? webDealerModule.get('Available') === true : false;
        var isAdmin = administratorModule ? administratorModule.get('Available') === true : false;
        var isAdminCuenta = false;   // "solo admin cuentas"
        var isNeededReadRights = false;

        // 6) Detecto "Administrator pero solo admin cuentas" (rights.cuenta)
        if (isAdmin && administratorModule) {
            var secAdminStr = administratorModule.get('Security');
            var secAdminObj = Ext.decode(secAdminStr, true) || {};
            if (secAdminObj && secAdminObj.rights && secAdminObj.rights.cuenta) {
                isNeededReadRights = true;
                isAdminCuenta = true;
                isAdmin = false; // OJO: como en CuentaGrid, NO lo trato como full admin
            }
        }

        view.isMaster = isMaster;
        view.isAdmin = isAdmin;
        view.isAccount = isAdminCuenta;

        // 7) Construcción del árbol
        if (isAdmin) {
            // FULL ADMIN -> armo desde Administrator.Security.modules
            console.log(webRemotoModule.get('_Security'))
            var secStr = administratorModule.get('Security');
            var secObj = Ext.decode(secStr, true) || {};
            var modules = secObj.modules || [];

            Ext.Array.each(modules, function (m) {
                var nodeCfg = Ext.apply({}, m);
                nodeCfg.checked = null;
                nodeCfg.profile = '0';
                root.appendChild(nodeCfg);
            });

            west.security = secObj;
        } else {
            console.log(('_Security'))
            // NO FULL ADMIN (incluye isAdminCuenta / Master / WebDealer / usuario común)
            // -> armo desde MWStore
            var mwRoot = this.getSgAppMWStoreStore().getRootNode();
            if (mwRoot && mwRoot.childNodes) {
                Ext.Array.forEach(mwRoot.childNodes, function (child) {
                    root.appendChild(child.copy(null));
                });
            }

            // 8) Rights: tomo security según app/rol (misma idea que CuentaGrid)
            var _securityStr = null;

            // si estoy en app Administrator o soy "solo admin cuentas", leo del Administrator
            if ((this.application._nameModule && this.application._nameModule === 'Administrator') || isAdminCuenta) {
                _securityStr = administratorModule ? administratorModule.get('Security') : null;
            } else if (isMaster) {
                _securityStr = masterModule ? masterModule.get('Security') : null;
            } else if (isWebDealer) {
                _securityStr = webDealerModule ? webDealerModule.get('Security') : null;
            }

            // rights generales de la app (si existe)
            if (_securityStr) {
                var secObj2 = Ext.decode(_securityStr, true) || {};
                west.security = secObj2;
            }

            // rights específicos WebRemoto (si querés mantener tu lógica original)
            if (webRemotoModule && webRemotoModule.get('Available') === true) {
                var wrSec = webRemotoModule.get('_Security');
                if (wrSec && wrSec.rights) {
                    if (!west.security) west.security = {};
                    west.security.rights = Ext.JSON.decode(wrSec.rights);
                }
            }
        }

        root.expand(true);

        var nombreEvento = '[' + record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion') + ']';
        view.module = module;
        if (record.get('tip_ntipo') == 13) {
            var array = record.get('rec_cContenido').split('[');
            var matricula = array[0];
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout: 'fit',
                title: 'Ver perfil',
                width: 1100,
                height: 700,
                border: false,
                id: 'winId',
                closable: false,
                closeAction: 'destroy',
                itemId: 'cuentaWin',
                listeners: {
                    afterrender: function (win) {
                        window.addEventListener('message', function (event) {
                            if (event.data === 'insertionCompleted') {
                                win.close();
                                Ext.Msg.alert('Furmulario guardado', 'Los datos fueron guardados correctamente.');
                            }
                        });
                    }
                },
                items: [
                    Ext.create('Slbf.ux.SimpleIFrame', {
                        border: false,
                        itemId: 'iframeperfil'
                    }),
                    {
                        xtype: 'button',
                        text: 'Cambiar'
                    }
                ]
            });
            win.show();
            win.down('#iframeperfil').setSrc('/handler/EventosLPRForm?_dc=1495024081888&matricula=' + matricula + '&token=' + Ext.util.Cookies.get('OAuth_Token') + '&usu=' + _UserData.UserId)



            /*       var myWindow = Ext.widget('window',{
                       title: 'Selector de Cuentas',
                       height: 400,
                       width: 900,
                       closeAction: 'destroy',
                       //autoScroll: true,
                       modal: true, 
                       items: [{
                           xtype: 'webRemotolprview',
                           caller: view,
                       }],
                       layout: 'fit'
                   });
                   myWindow.show();*/
        }
        // tomo el registro para esta terminal, lo saco de pendiente.
        //si fuerzo a no verificar el usuario cuando ingreso tambien saco el atender evento
        if (!view.noVerifyAssignedUser) {
            Ext.Ajax.request({
                url: '/rest/search/AtencionEventoAtender',
                params: { rec_iid: rec_iid },
                method: 'GET',
                scope: this,
                callback: function (options, success, response) {
                    var parametros = Ext.JSON.decode(response.responseText);
                    var rec = parametros.rows[0];
                    if (rec && (rec.Error == 0 || rec.Error == undefined || rec.Error == null)) {
                        this.setRecord(record, view);
                        //inicio evaludar de evento
                        view.taskEvaluarEvento = Ext.TaskManager.start({
                            args: [view, this],
                            run: this.evaluarEvento,
                            interval: 10000
                        });
                        controller.openAtencionEvento(view, record, west)
                    } else if (rec && rec.Error == 10) {
                        //si el evento aun no tiene un operador asignado en eventos pendientes y estado = 1 (atendiendo)
                        // no dejo continuar
                        notify('Hubo un error al atender el evento.')
                        if (controller.application.CARGANDOEVENTO) {
                            controller.application.CARGANDOEVENTO.hide()
                            delete controller.application.CARGANDOEVENTO
                        }
                        view.close()
                    } else {
                        if (!view.noVerifyAssignedUser) {
                            notifyError(rec.Message);
                            view.close();
                        } else {
                            notify('Este evento pertenece a otro operador. Solo tiene permiso de colaboracion.')
                        }
                        if (controller.application.CARGANDOEVENTO) {
                            controller.application.CARGANDOEVENTO.hide()
                            delete controller.application.CARGANDOEVENTO
                        }
                    }
                }
            });
        } else {
            //inicio evaludar de evento
            view.taskEvaluarEvento = Ext.TaskManager.start({
                args: [view, this],
                run: this.evaluarEvento,
                interval: 10000
            });
            controller.openAtencionEvento(view, record, west)
        }
        west.expandAll();
        Ext.resumeLayouts(true);

    },

    openAtencionEvento: function (view, record, west) {
        // Aislamiento agresivo para depuración: permitimos abrir la paleta mínima
        var isolate = false;
        try {
            var qs = (window.location && window.location.search) ? window.location.search : '';
            isolate = (window && window._WR_ISOLATE_LAYOUT === true) ||
                (typeof Ext !== 'undefined' && Ext.global && Ext.global._WR_ISOLATE_LAYOUT === true) ||
                (window.localStorage && localStorage.getItem('WR_ISOLATE') === '1') ||
                (/([?&])ISOLATE=1(?!\d)/i.test(qs));
        } catch (e) { isolate = false; }
        var controller = this;
        var datosVariables = view.down('#datosvariablestree');
        //datosVariables.setRootNode( deepCloneRoot( this.getSgAppMWVariableStoreStore().getRoot() ) )
        var rootOriginal = this.getSgAppMWVariableStoreStore().getRoot();
        var rootDatosVariables = datosVariables.getRootNode();
        Ext.Array.forEach(rootOriginal.childNodes, function (child) {
            rootDatosVariables.appendChild(child.copy(null));
        });

        var title = "Evento";
        var myPanel = view.down('tabpanel');
        /**
         * 
         * ACA ESTYO COMENZADO A UTILIZAR EL NUEVO PROCESAR EVENTOS !!!!!!!! 
         * EL VIEJO ES : eventomonitoreopanelview 
         * 
         * EL NUEVO ES (SMARTPANIC) : atencioneventoview
         * EL NUEVO ES (COMUN) : atencioneventoComunview
         * 9/8/2017 se agrego para que Vigicontroll use la misma vista que Smartpanics a pedido de rodrigo
         */
        if (record.get('rxt_nSPIP') == 1 || record.get('rxt_nSPSMS') == 1) {
            var atencionView = 'atencioneventoview';
        } else if (record.get('rxt_nVCIP') == 1 || record.get('rxt_nVCSMS') == 1 || record.get('tip_ntipo') == 5) {
            var atencionView = 'atencioneventoview';
        } else {
            var atencionView = 'atencioneventoComunview';
        }
        var newTab = Ext.widget(atencionView, {
            record: record,
            evaluarEvento: function () {
                controller.evaluarEvento(view, controller, true)
            },
            module: view.module,
            title: title,
            closable: false,
            itemIdTabReturn: view.itemIdTabReturn,
            atencionAutomatica: view.atencionAutomatica,
            hideProcessOperations: view.hideProcessOperations,
            showSmsSender: view.showSmsSender,
            fireObservacionColaboracion: view.fireObservacionColaboracion,
            eventTabPanel: view.eventTabPanel,
            /**
             * BC 390361159 : Agregado personalizacion para mostar / ocultar bitacora, timeline, notas.
             */
            bitacora: view.bitacora,
            timeline: view.timeline,
            notas: view.notas
        });
        // agrego la paleta creada
        myPanel.add(newTab);
        myPanel.setActiveTab(newTab);
        if (view.fireObservacionColaboracion) {
            var newTabMsg = Ext.widget('textfield', {
                disabled: true,
                translate: false,
                title: getLocale('Modo colaborador'),
                tabConfig: {
                    cls: 'tabmsg'
                }
            });
            myPanel.add(newTabMsg);
            newTabMsg.setDisabled(true)
        }
        //le sumo 1 segundo para que traiga solo posteriores
        var fecha = new Date(record.get('rec_isoFechaHora')).setSeconds(record.get('rec_isoFechaHora').getSeconds() + 1);
        var ultimoEventoReciid;
        var nombreEvento = '[' + record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion') + ']';
        if (!isolate) {
            this.applyKeyData(newTab);
        }
        // si tiene servicio tecnico lo agrego al tree    
        /******************************************************************************/
        if (record.get('stc_iid') > 0 && datosVariables.store.getRootNode()) {
            datosVariables.store.getRootNode().appendChild({
                text: 'ServTec pendientes',
                iconCls: 'icon-servtec-16',
                leaf: true,
                view: 'servtecgridview',
                closable: true,
                viewConfig: "{ estadoFilter: 1,noOpenServtecEditForm:true, readOnly:true }"
            })
        }
        // si es tipo LPR agrego Vehiculos al three   
        /******************************************************************************/
        if (record.get('tip_ntipo') == 13) {
            datosVariables.store.getRootNode().appendChild({
                text: 'Vehiculos',
                iconCls: 'icon-car',
                leaf: true,
                view: 'gridvehicle',
                closable: true,
                viewConfig: ""
            })
        }
        // si es moroso
        /******************************************************************************/
        if (record.get('cli_nsituacion') > 0 && datosVariables.store.getRootNode()) {
            if (record.get('cli_nsituacion') != 1) {
                datosVariables.store.getRootNode().appendChild({
                    text: 'Morosidad',
                    iconCls: 'icon-moneyguard-16',
                    leaf: true,
                    view: 'mgcomprobantesgridview',
                    closable: true,
                    viewConfig: "{ cli_icodigo_ID: " + record.get('cli_icodigo_id') + " }"
                })
            }
        }
        var spPanel = newTab.down('#smartpanics');
        datosVariables.cuenta = record;
        west.cuenta = record;
        view.cuenta = record;
        // verifico que la nota temporal este entre fechas
        var objectId = record.get('cue_iid');
        /***************************************************************/
        record.loadNotaTemporal(function (record) {
            if (record.get('not_dtemporaldesde') < new Date() && record.get('not_dtemporalhasta') > new Date()) {
                var newView = Ext.widget('notatemporalroview', {
                    record: view.record,
                    title: '',
                    module: view.module,
                    tipo: 'win'
                });
                newView.down('toolbar').hide();
                var myWindow = Ext.widget('window', {
                    title: 'Notas temporal ' + nombreEvento,
                    height: 300,
                    width: 600,
                    modal: true,
                    items: newView,
                    closable: true,
                    layout: 'fit',
                }).show();
                //agrego al tree la nota temporal    
                datosVariables.store.getRootNode().appendChild({
                    text: 'Nota temporal',
                    iconCls: 'icon-transmit',
                    leaf: true,
                    view: 'notatemporalroview',
                    closable: true
                })
            }
        })
        // miro el estado de la cuenta si es prueba // CUANDO ES PRUEBA POR ZONAS MIRAR EL CODIGO DE ZONA
        // este ajax es necesario? no viene ya el estado en el record?
        Ext.Ajax.request({
            url: '/rest/search/CuentaById',
            params: { Id: objectId },
            method: 'GET',
            scope: this,
            success: function (response) {
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];
                if (rec.Situacion == 'Prueba') {
                    notify('El estado de la cuenta es: ' + rec.Situacion)
                }
                if (rec.Situacion == 'Prueba x Zonas ') {
                    var items = Ext.create('Ext.data.Store', {
                        model: 'WebRemoto' + '.model.EstadoItemModel'
                    });
                    items.load({
                        ObjectId: objectId, view: view, callback: function (records, operation, success) {
                            Ext.each(records, function () {
                                //   console.log(Ext.util.Format.trim(this.get('est_czona')),Ext.util.Format.trim(record.get('cue_clinea')))           
                                if (Ext.util.Format.trim(this.get('est_czona')) == Ext.util.Format.trim(record.get('rec_czona'))) {
                                    notify('El estado de la zona es: ' + rec.Situacion)
                                }
                            });
                        }
                    });
                }
                // muestro la foto
                if (rec.cue_cfoto != '' && rec.cue_nmostrar == 1 && view.isVisible()) {
                    var newView = Ext.widget('cuentaimagenview', {
                        cue_cfoto: rec.cue_cfoto
                    });
                    var myWindow = Ext.widget('window', {
                        title: getLocale('Imagen de la cuenta'),
                        translate: false,
                        x: 400,
                        y: 100,
                        height: 470,
                        width: 400,
                        modal: false,
                        items: newView,
                        closable: true,
                        layout: 'fit',
                    }).show();
                    //declaro la windo como hija par aque cuando se cierra el evento cierre tambien las ventanas
                    view.windowsHijas.push(myWindow)
                }
            }
        });
        // verifico que tenga imagen de zona para mostrar
        // saco el load porque vienen los campos en el evento (dedalo 17/10/2016)
        if (record.get('zon_cimagen').trim() != '' && record.get('zon_nmostrar') == 1 && view.isVisible()) {
            var newView = Ext.widget('zonaimagenbyeventoview', {
                record: view.record,
                module: view.module
            });
            var myWindow = Ext.widget('window', {
                title: getLocale('Imagen de la zona') + " " + record.get('zon_cdescripcion'),
                height: 470,
                width: 400,
                x: 300,
                y: 50,
                modal: false,
                items: newView,
                closable: true,
                layout: 'fit',
            }).show();
            //declaro la windo como hija par aque cuando se cierra el evento cierre tambien las ventanas
            view.windowsHijas.push(myWindow)
        }
        // aplico la seguridad a los botones de informes
        if (!view.recordWebremoto || !view.recordWebremoto.get) {
            return;
        }
        var _security = view.recordWebremoto.get('_Security');
        if (_security && _security.rights) {
            if (_security.informeLlamada == "true") {
                var btnInformeLlamada = view.down('#informeLlamada');
                if (btnInformeLlamada && btnInformeLlamada.show) btnInformeLlamada.show();
            }
            if (_security.informeNotificaciones == "true") {
                var btnInformeNotificaciones = view.down('#informeNotificaciones');
                if (btnInformeNotificaciones && btnInformeNotificaciones.show) btnInformeNotificaciones.show();
            }
            if (_security.informeMultimedia == "true") {
                var btnInformeMultimedia = view.down('#informeMultimedia');
                if (btnInformeMultimedia && btnInformeMultimedia.show) btnInformeMultimedia.show();
            }
            if (_security.informeHistorico == "true") {
                var btnInformeHistorico = view.down('#informeHistorico');
                if (btnInformeHistorico && btnInformeHistorico.show) btnInformeHistorico.show();
            }
            if (_security.informeSertec == "true") {
                var btnInformeSertec = view.down('#informeSertec');
                if (btnInformeSertec && btnInformeSertec.show) btnInformeSertec.show();
            }
        }

    },
    onEventosnuevosClick: function (button, object, options) {
        var view = button.up('eventomonitoreoview');
        var record = view.record;
        var fecha = new Date(record.get('rec_isoFechaHora')).setSeconds(record.get('rec_isoFechaHora').getSeconds() + 1);
        var newTabUltimosEventos = Ext.widget('eventostrgridview', {
            itemId: 'ultimoseventos',
            title: 'Eventos posteriores',
            showEstadosFilter: false,
            estados: [0, 1, 2, 3, 4, 5, 6, 7, 9],
            showMaximizer: false,
            hiddenDealerFilter: true,
            short: 1,
            evaluarNuevosEventosYEnviarAlFrente: true,
            record: view.record,
            FechaDesde: Ext.Date.format(new Date(fecha), 'Y-m-d\\TH:i:s'),
            condiciones: view.condiciones,
            sorters: [
                {
                    property: 'rec_tfechahora',
                    direction: 'ASC'
                }
            ]
        });
        var myWindow = Ext.widget('window', {
            title: 'Eventos posteriores',
            height: 380,
            width: 600,
            modal: true,
            items: newTabUltimosEventos,
            closable: true,
            layout: 'fit',
            closeAction: 'destroy'
        }).show();
        newTabUltimosEventos.down('toolbar').hide();
    },

    onEnviarSmsClick: function (button, object, options) {
        var view = button.up('eventomonitoreoview')
        var newView = Ext.widget('smsenvioformview', {
            record: view.record,
            caller: view,
        });
        var myWindow = Ext.widget('window', {
            title: 'Enviar Sms',
            height: 380,
            width: 400,
            modal: true,
            items: newView,
            closable: true,
            layout: 'fit',
        }).show();
    },

    onCerrarClick: function (button, object, options) {
        button.up('eventomonitoreoview').close()
    },

    onImagePanelHasContet: function (imagepanel) {
        if (imagepanel.hascontent) {
            var view = imagepanel.up('eventomonitoreoview');
            //view.down('notaroview').hide();
            imagepanel.show();
        }
    },

    onImagePanelAfterMaximize: function (imagepanel) {
        var view = imagepanel.up('eventomonitoreoview');
        // Remuevo las TABs del la view dguardview (Grilla / Video)
        imagepanel.items.items[0].removeAll();
        // Oculto el panel dguardview
        imagepanel.hide();
    },

    onWindowClose: function (imagepanel) {
        var view = imagepanel.up('eventomonitoreoview');
        // Regenero las TABs de la view dguardview
        imagepanel.fireEvent('afterrender', imagepanel);
        // Muestro el panel dguardview
        imagepanel.show();
    },

    onGuardarNotaClick: function (button, object, options) {
        var controller = this;
        var view = button.up('eventomonitoreoview');
        var record = view.record;
        var nombreEvento = '[' + record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion') + ']';
        var newView = Ext.widget('formnote', {
            record: view.record,
            module: view.module,
            tipo: 'win',
            title: ''
        });
        var myWindow = Ext.widget('window', {
            title: 'Modificar notas ' + nombreEvento,
            height: 380,
            width: 400,
            modal: true,
            items: newView,
            closable: true,
            layout: 'fit',
        }).show();
    },

    onLlamadaClick: function (button, object, options) {
        var view = button.up('eventomonitoreoview');
        var operadores = view.up('tabpanel').up('tabpanel').operador;
        var operadorId = view.up('viewport').operadorId;
        var record = view.record;
        var nombreEvento = '[' + record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion') + ']';
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: getLocale('Realizar contacto ') + nombreEvento,
            closeAction: 'destroy',
            itemId: 'contacto',
            translate: false,
            width: 800,
            height: 500,
            border: true,
            modal: false,
            view: view,
            closable: false,
            items: [{
                xtype: 'llamadahelperview',
                record: view.record,
                operador: operadores,
                operadorId: operadorId,
                called: view,
                operadorId: view.up('viewport').operadorId
            }]
        });
        win.show();
    },

    onEstadoClick: function (button, object, options) {
        var view = button.up('eventomonitoreoview');
        var record = view.record;
        var operadores = view.up('tabpanel').operador;
        var hidecontrols = ['#btndeshabilitar', '#btnEliminar'];
        if (record.get('rec_czona').trim() == '') {
            hidecontrols.push('#btnxzonas');
        }
        var nombreEvento = '[' + record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion') + ']';
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: getLocale('Poner en prueba') + ' ' + nombreEvento,
            closeAction: 'destroy',
            translate: false,
            itemId: 'contacto',
            width: 800,
            height: 300,
            border: true,
            modal: false,
            view: view,
            closable: true,
            items: [{
                xtype: 'estadoview',
                module: Ext.create(this.getModuleModelModel(), {
                    profile: 3
                }),
                forceZona: record.get('rec_czona'),
                hideControls: hidecontrols,
                record: view.cuenta,
                called: view,
                operadorId: view.up('viewport').operadorId,
                rec_iid: record.get('rec_iid')
            }]
        });
        win.show();
    },

    onChangeObservacionesClick: function (combo, newvalue, oldvalue) {
        var view = combo.up('eventomonitoreoview');
        var textarea = view.down('#obsfield');
        textarea.setValue(textarea.getValue() + newvalue);
    },

    onAgregarObservacionClick: function (button, object, options) {
        var view = button.up('eventomonitoreoview');
        var record = view.record;
        var rec_iid = record.get('rec_iid');
        var observaciones = view.down('#obsfield');
        var observacion = observaciones.getValue();
        var controller = this;
        if (observacion != '') {
            Ext.Ajax.request({
                url: '/rest/search/AtencionEventoObservacion',
                params: {
                    rec_iid: rec_iid,
                    rec_cObservaciones: observacion
                },
                method: 'GET',
                scope: this,
                success: function (response) {
                    var parametros = Ext.JSON.decode(response.responseText);
                    var rec = parametros.rows[0];
                    if (rec.Error == 0) {
                        //actualizo las pantallas
                        notify('La observacion fue agregada.');
                        observaciones.setValue('');
                        //guardo en eventostimeline
                        controller.getEventosTiemLineModelModel().create({
                            etl_icuenta: record.get('cue_iid'),
                            etl_tfechahora: new Date(),
                            etl_caccion: '%IngresoComentarios%',
                            etl_cobservacion: observacion,
                            etl_cowner: '%MWR%',
                            etl_ioperador: view.up('viewport').operadorId,
                            etl_irecid: rec_iid
                        }).save();
                        view.down('eventotimelinegridview').fireEvent('objectchanged', { record: record, view: view.down('eventotimelinegridview') });
                    } else {
                        notifyError(rec.Message);
                    }
                }
            });
        } else {
            notifyError('Debe completar la observación antes de guardar!');
        }
    },

    onEsperaClick: function (button, object, options) {
        var view = button.up('eventomonitoreoview');
        var minutosEspera = view.down('#minutosEspera').getValue();
        var record = view.record;
        var rec_iid = record.get('rec_iid');
        var observaciones = view.down('#obsfield').getValue();
        Ext.Ajax.request({
            url: '/rest/search/AtencionEventoEspera',
            params: {
                rec_iid: rec_iid,
                rec_iMinutosEspera: minutosEspera,
                rec_cObservaciones: observaciones
            },
            method: 'GET',
            scope: this,
            success: function (response) {
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];
                if (rec.Error == 0) {
                    //actualizo las pantallas
                    notify('El evento se pasó a espera');
                    view.close();
                } else {
                    notifyError(rec.Message);
                }
            }
        });
    },
    onProcesarClick: function (button, object, options) {
        var view = button.up('eventomonitoreoview');
        var record = view.record;
        var categorizacion = view.down('#categorizacion').getValue();
        var observaciones = view.down('#obsfield').getValue();
        var resolucion = view.down('#resolucion').getValue();
        var rec_iid = record.get('rec_iid');
        if (view.isLlamadaOpen) {
            notify('La ventana de llamados debe estar cerrada para poder procesar');
            return false;
        }
        Ext.Ajax.request({
            url: '/rest/search/AtencionEventoProcesar',
            params: {
                rec_iid: rec_iid,
                rec_idResolucion: Ext.String.leftPad(categorizacion, 3, '0'),
                rec_cObservaciones: observaciones,
                rec_cCategorizacion: Ext.String.leftPad(resolucion, 3, '0')
            },
            method: 'GET',
            scope: this,
            success: function (response) {
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];
                if (rec.Error == 0) {
                    //actualizo las pantallas
                    notify('El evento se pasó a procesado');
                    // ver si es el ultimo evento y mandar a pendientes
                    view.close();
                } else {
                    notifyError(rec.Message);
                }
            }
        });
    },
    onPendienteClick: function (button, object, options) {
        var view = button.up('eventomonitoreoview');
        var record = view.record;
        var rec_iid = record.get('rec_iid');
        Ext.Ajax.request({
            url: ' /rest/Search/AtencionEventoDevolver?rec_iid=' + rec_iid,
            method: 'GET',
            scope: this,
            success: function (response) {
                var parametros = Ext.JSON.decode(response.responseText);
                var rec = parametros.rows[0];
                if (rec.Error == 0) {
                    //actualizo las pantallas
                    notify('El evento se pasó a pendiente');
                    view.close();
                } else {
                    notifyError(rec.Message);
                }
            }
        });
    },
    onProcesarTodosClick: function (button, object, options) {
        var view = button.up('eventomonitoreoview');
        var record = view.record;
        var cue_iid = record.get('cue_iid');
        if (view.isLlamadaOpen) {
            notify('La ventan de llamados debe estar cerrada para poder procesar');
            return false;
        }
        var eventostiemporeal = view.down('eventostrgridview');
        var nombreEvento = '[' + record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion') + ']';
        var store = eventostiemporeal.store;
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            translate: false,
            title: getLocale('Procesamiento múltiple'),//getLocale('Se procesaran ')+store.totalCount+getLocale('  elementos')+' '+nombreEvento,
            closeAction: 'hide',
            caller: view,
            fieldName: 'udw_clave',
            modal: true,
            width: 1000,
            height: 400,
            border: false,
            record: record,
            closable: false,
            items: [
                {
                    xtype: 'eventosptgridview',
                    stateId: 'procesartodos',
                    nombreEvento: nombreEvento,
                    showEstadosFilter: true,
                    record: record,
                    cue_iid: cue_iid,
                    operador: view.operador,
                    condiciones: view.condiciones,
                    caller: view
                }
            ]
        });
        win.show();
    },

    onMapguardClick: function (button, object, options) {
        var view = button.up('eventomonitoreoview');
        var tabpanel = button.up('tabpanel')
        var record = view.record;
        var cuenta = view.cuenta;
        var rec_iid = record.get('rec_iid');
        var nombreEvento = '[' + record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion') + ']';
        var title = getLocale('Mapguard');
        var mytab = tabpanel.down('[title=' + title + ']');
        if (!mytab) {
            var newTab = Ext.widget('mapguardeventosview', {
                record: record,
                targetTab: tabpanel,
                cuenta: cuenta,
                title: title,
                keepSelected: true,
                forceCuenta: true,
                closable: true,
                closeAction: 'destroy',
                autoDestroy: true,
                translate: false,
                operadorId: view.up('viewport').operadorId
            });
            tabpanel.add(newTab);
            tabpanel.setActiveTab(newTab);
        } else {
            tabpanel.setActiveTab(mytab);
        }
    },

    onServtecClick: function (button, object, options) {
        var view = button.up('eventomonitoreoview');
        var tabpanel = button.up('tabpanel')
        var record = view.record;
        var cuenta = view.cuenta;
        var rec_iid = record.get('rec_iid');
        var operador = view.up('tabpanel').operador;
        var nombreEvento = '(' + record.get('rec_calarma') + ' - ' + record.get('cod_cdescripcion') + ')';
        var title = getLocale('Servicio técnico') + ' ' + nombreEvento;
        var mytab = tabpanel.down('[title=' + title + ']');
        if (!mytab) {
            var newTab = Ext.widget('servtecgridview', {
                record: cuenta,
                targetTab: tabpanel,
                event: record,
                title: title,
                translate: false,
                closable: true,
                closeAction: 'destroy',
                autoDestroy: true,
                operador: operador,
                operadorId: view.up('viewport').operadorId,
                rec_iid: rec_iid
            });
            tabpanel.add(newTab);
            tabpanel.setActiveTab(newTab);
        } else {
            tabpanel.setActiveTab(mytab);
        }
    },

    onAutoridadClick: function (button, object, options) {
        var view = button.up('eventomonitoreoview');
        var tabpanel = button.up('tabpanel')
        var record = view.record;
        var cuenta = view.cuenta;
        var rec_iid = record.get('rec_iid');
        Ext.Ajax.request({
            url: '/rest/search/ReporteAutoridadesEventosManuales?rec_iid=' + rec_iid,
            success: function (resp, operation) {
                var d = new Date();
                var ticks = d.getTime();
                var response = Ext.JSON.decode(resp.responseText);
                if (response.total > 0) {
                    if (response.rows[0].aut_idestino != '1') {
                        Ext.widget('window', {
                            title: 'Reporte a autoridad',
                            width: 600,
                            height: 600,
                            layout: 'fit',
                            html: "<iframe style='overflow:auto;width:100%;height:100%;' frameborder='0'  src='" + response.rows[0].tad_curl + "?rec_iid=" + rec_iid + "&_dc=" + ticks + "'></iframe>"
                        }).show();
                    } else {
                        button.disable();
                        notify('El evento se reportó con éxito.');
                        //guardo en eventostimeline
                        controller.getEventosTiemLineModelModel().create({
                            etl_icuenta: record.get('cue_iid'),
                            etl_tfechahora: new Date(),
                            etl_caccion: '%ReporteAutoridadesManual%',
                            etl_cobservacion: '%ReporteAutoridadesManual%',
                            etl_cowner: '%MWR%',
                            etl_ioperador: view.up('viewport').operadorId,
                            etl_irecid: rec_iid
                        }).save();
                    }
                } else {
                    notifyError('No hay autoridades configuradas para reportar');
                }
            }
        });
    },

    applyKeyData: function (view) {
        try {
            var qs = (window.location && window.location.search) ? window.location.search : '';
            var isolate = (window && window._WR_ISOLATE_LAYOUT === true) ||
                (typeof Ext !== 'undefined' && Ext.global && Ext.global._WR_ISOLATE_LAYOUT === true) ||
                (window.localStorage && localStorage.getItem('WR_ISOLATE') === '1') ||
                (/([?&])ISOLATE=1(?!\d)/i.test(qs));
            if (isolate) { return; }
        } catch (e) { }

        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
        storeSecurity.each(function (v, k) {
            var btnautoridad = view.down ? view.down('#btnautoridad') : null;
            var btnservtec = view.down ? view.down('#btnservtec') : null;
            if (v.get('KeyReference') == 'WebReporteAut' && v.get('Available') == true) {
                if (btnautoridad && btnautoridad.show) btnautoridad.show();
            }
            if (v.get('KeyReference') == 'ReporteAutoridades' && v.get('Available') == true) {
                if (btnautoridad && btnautoridad.show) btnautoridad.show();
            }
            if (v.get('KeyReference') == 'SgAppSerTec' && v.get('Available') == true) {
                if (btnservtec && btnservtec.show) btnservtec.show();
            }
            if (v.get('KeyReference') == 'SerTec' && v.get('Available') == true) {
                if (btnservtec && btnservtec.show) btnservtec.show();
            }
        })
    },

    setRecord: function (record, viewport) {
        var controller = this;
        var myPanel = viewport.down('tabpanel');
        var center = viewport.down('#center');
        var title = 'Datos del evento';
        //record.set('rec_iid', 3816238); // para usar un registro con datos
        var rec_iid = record.get('rec_iid');
        var estadoStore = Ext.data.StoreManager.lookup('EventoEstadoStore');
        var estadoRec = estadoStore.findRecord('Value', record.get('rec_nestado'));
        if (estadoRec)
            var estado = estadoRec.get('Name');
        var rec_nOrigen = record.get('rec_nOrigen');
        var rec_ipuerto = record.get('rec_iPuerto');
        var origenStore = Ext.data.StoreManager.lookup('EventoOrigenStore');
        var origenRec = origenStore.findRecord('Value', rec_nOrigen);
        if (origenRec)
            var origen = origenRec.get('Name');
        record.set('_eventDescripcion', record.get('rec_calarma') + '-' + record.get('cod_cdescripcion'));
        record.set('_FechaHora', Ext.Date.format(record.get('rec_isoFechaHora'), 'Y-m-d H:i:s'));
        record.set('_estado', estado);
        //record.set('_origen', origen);
        var _win = viewport.up('window');
        if (_win) {
            _win.setTitle(record.get('_eventDescripcion') + ' ' + record.get('_FechaHora'));
        }
        if (center) { center.record = record; }
    },

    openModules: function (tabpanel, record) {
        var controller = this;
        // no tiene datos de seguridad en webdealer, me fijo si es master o admin
        var securitymodules = SecurityModulesStore;//controller.getSecurityModulesStoreStore();
        var masterModule = securitymodules.findRecord('KeyReference', 'MasterWebDealer');
        var administratorModule = securitymodules.findRecord('KeyReference', 'Administrator');
        var accountAdministrationModule = securitymodules.findRecord('KeyReference', 'SgAppAccountAdministration');
        var isMaster = masterModule ? masterModule.get('Available') : false;
        var isAdmin = administratorModule ? administratorModule.get('Available') : false;
        var isAccount = accountAdministrationModule ? accountAdministrationModule.get('Available') : false;
        if (isMaster || isAdmin || isAccount) {
            var modules = Ext.data.StoreManager.lookup('EventSecurityModuleStore');
            modules.each(function (module) {
                var newTab = Ext.widget(module.get('view'), {
                    iconCls: module.get('iconCls'),
                    record: record,
                    title: module.get('text'),
                    closable: false
                });
                // agrego la paleta creada
                tabpanel.add(newTab);
                tabpanel.setActiveTab(newTab);
            })
            tabpanel.setActiveTab(0);
        } else {
            Ext.Ajax.request({
                url: '/Rest/Security/Modules/5/Security', //cambiar id por el modulo
                method: 'GET',
                success: function (resp, operation) {
                    if (resp.responseText.length > 0)
                        var json = JSON.parse(resp.responseText);
                    if (json) {
                        var modules = json.event;
                        Ext.Array.each(modules, function (module) {
                            if (module.profile == 1) {
                                var newTab = Ext.widget(module.view, {
                                    iconCls: module.iconCls,
                                    record: record,
                                    title: module.text,
                                    closable: false
                                });
                                // agrego la paleta creada
                                tabpanel.add(newTab);
                                tabpanel.setActiveTab(newTab);
                            }
                        })
                        tabpanel.setActiveTab(0);
                    }
                }
            })
        }
    }
});

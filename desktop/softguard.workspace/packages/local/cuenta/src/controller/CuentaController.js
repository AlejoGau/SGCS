Ext.define('Cuenta.controller.CuentaController', {
    extend: 'Ext.app.Controller',
    stores: ['CuentaAccesoSecurityModulesStore', 'WebDealerSecurityModulesStore', 'CuentaDealerModuleStore', 'SmartPanicsPCSecurityModulesStore', 'FenceSecurityModulesStore', 'AWCCSecurityModulesStore'],
    models: ['SoftguardCuentaModel'],
    views: ['CuentaView'],
    readonly: false,

    init: function (config) {
        // genero los eventos
        this.control({
            'cuentaview': {
                beforerender: this.initview
            }
        });
    }, // cierro init

    initview: function (view) {
        var objectId = view.objectId;
        var controller = this;

        var nameModule = view.nameModule ? view.nameModule : controller.application._nameModule;

        record = this.getSoftguardCuentaModelModel();

        if (objectId == 0) {
            notifyError('Operación no soportada');
        }
        else {
            record.load(objectId, {
                callback: function (record, operation) {
                    var recordCuenta = view.recordCuenta ? view.recordCuenta : record;
                    if (operation.success) {
                        var me = this;

                        if (view.forceIdModule) {
                            var url = '/Rest/Security/Modules/' + view.forceIdModule + '/Security';
                        } else {
                            var url = '/Rest/Security/Modules/' + controller.application._idModule + '/Security';
                        }
                        var modulesStore = SecurityModulesStore;
                        var reserved = false;
                        var readonly = view.readonly;

                        if (record.get('cue_clinea') == '_SG' && record.get('cue_ncuenta') == 'INTE') {
                            reserved = true;
                        }

                        var securityTreeStore = Ext.create('Ext.data.TreeStore', {
                            model: 'Common.model.ModuleModel',
                            proxy: {
                                type: 'rest',
                                appendId: false,
                                url: url
                            },
                            root: {
                                text: 'Datos',
                                expanded: false,
                                leaf: false
                            }
                        });

                        // cargo la lista de modulos
                        var datos = Ext.widget('moduletreeview', {
                            store: securityTreeStore,
                            targetTab: view.down('#center'),
                            preventHeader: true,
                            record: record,
                            rootVisible: false,
                            bodyPadding: '5 0 5 0',
                            collapsed: false
                        });

                        var west = view.down('#west');
                        if (west.collapsed) { west.toggleCollapse(); }

                        west.insert(0, datos);
                        west.setTitle(getLocale('Cuenta'));

                        if (record.get('cue_clinea') != '_MP' && recordCuenta.get('tip_nCondicion') != 4 && recordCuenta.get('tip_nTipo') != 8) {
                            var masterModule = modulesStore.findRecord('KeyReference', 'MasterWebDealer');
                            var administratorModule = modulesStore.findRecord('KeyReference', 'Administrator');
                            var accountAdministrationModule = modulesStore.findRecord('KeyReference', 'SgAppAccountAdministration');
                            var isMaster = masterModule ? masterModule.get('Available') : false;
                            var isAdmin = administratorModule ? administratorModule.get('Available') : false;
                            var isAccount = accountAdministrationModule ? accountAdministrationModule.get('Available') : false;
                            var isAdminRights = false; //administrador con derechos

                            // ajusto el admin para el caso de operador

                            if (isAdmin) {
                                var security = administratorModule.get('Security');
                                var json;
                                if (security && security != '') {
                                    json = Ext.JSON.decode(security);
                                }

                                if (json && json.rights && json.modules && json.rights.cuenta) {
                                    isAdminRights = true;
                                    isAdmin = false;
                                }
                            }

                            var cuentaModule;

                            if (isAdmin || isAccount) {
                                if (nameModule && nameModule == 'AWCC') {
                                    var masterDealerModules = deepCloneStore(controller.getAWCCSecurityModulesStoreStore());
                                } else if (nameModule && nameModule == 'FenceManager') {
                                    var masterDealerModules = deepCloneStore(controller.getFenceSecurityModulesStoreStore());
                                } else if (nameModule && nameModule == 'SmartPanicsPC') {
                                    var masterDealerModules = deepCloneStore(controller.getSmartPanicsPCSecurityModulesStoreStore());
                                } else {
                                    var masterDealerModules = deepCloneStore(controller.getWebDealerSecurityModulesStoreStore());
                                }
                                var root = datos.getRootNode();
                                root.removeAll();
                                var modulesArray = [];

                                masterDealerModules.each(function (_module) {
                                    if (reserved || readonly) {
                                        if (_module.get('text') == 'Situación' && record.get('Situacion') == "No Habilitado") {
                                            _module.set('profile', 3);
                                        } else {
                                            _module.set('profile', 1);
                                        }
                                    } else {
                                        _module.set('profile', 3);
                                    }

                                    //module.set('profile', 3);
                                    _module.set('checked', null);
                                    modulesArray.push(_module.data);
                                    root.appendChild(_module);
                                    if (_module.get('text') == 'Cuenta') {
                                        cuentaModule = _module;
                                    }
                                });

                                //agrego los rigths para el master
                                if (isMaster) {
                                    var security = masterModule.get('Security');
                                    var json;
                                    if (security && security != '') {
                                        json = Ext.JSON.decode(security);
                                    }
                                    datos.security = json;
                                    view.security = json;
                                    view.security.modules = modulesArray;
                                    datos.rights = json.rights;
                                    view.rights = datos.rights;
                                } else { // es admin no pongo rigths??
                                    view.security = { modules: modulesArray };
                                    datos.security = view.security;
                                }

                                //modulesPanel.rights = rights;
                                me.openTab(record, view, cuentaModule);
                            } else if (isAdminRights) {
                                var security = administratorModule.get('Security');
                                var json;
                                if (security && security != '') {
                                    json = Ext.JSON.decode(security);
                                }
                                if (nameModule && nameModule == 'AWCC') {
                                    var modules = deepCloneStore(controller.getAWCCSecurityModulesStoreStore()).data.items;
                                } else {
                                    var modules = json.modules;
                                }

                                datos.rights = json.rights;
                                view.rights = datos.rights;
                                view.security = json;
                                datos.security = view.security;
                                var root = datos.getRootNode();
                                var cuentaModule;
                                root.removeAll();
                                Ext.Array.each(modules, function (_module) {
                                    if (_module.data) {
                                        _module = _module.data;
                                    }
                                    if (_module.text == 'Cuenta') {
                                        cuentaModule = _module;
                                    }
                                    if (_module.profile != '0' || (nameModule && nameModule == 'AWCC')) {
                                        if (reserved || readonly) {
                                            if (_module.text) {
                                                if (_module.text == 'Situación' && record.get('Situacion') == "No Habilitado") {
                                                    _module.profile = 3
                                                } else {
                                                    _module.profile = 1;
                                                }
                                            } else {
                                                if (_module.get('text') == 'Situación' && record.get('Situacion') == "No Habilitado") {
                                                    _module.set('profile', 3);
                                                } else {
                                                    _module.set('profile', 1);
                                                }
                                            }

                                        }
                                        _module.checked = null;
                                        root.appendChild(_module)
                                    }
                                });
                                datos.record = record;
                                me.openTab(record, view, cuentaModule);
                            } else if (isMaster) {
                                var security = masterModule.get('Security');
                                var json;
                                if (security && security != '') {
                                    json = Ext.JSON.decode(security);
                                }
                                if (nameModule && nameModule == 'AWCC') {
                                    var modules = deepCloneStore(controller.getAWCCSecurityModulesStoreStore()).data.items;
                                } else {
                                    var modules = json.modules;
                                }

                                datos.rights = json.rights;
                                view.rights = datos.rights;
                                view.security = json;
                                datos.security = view.security;
                                var root = datos.getRootNode();
                                var cuentaModule;
                                root.removeAll();
                                Ext.Array.each(modules, function (_module) {
                                    if (_module.data) {
                                        _module = _module.data;
                                    }
                                    if (_module.text == 'Cuenta') {
                                        cuentaModule = _module;
                                    }
                                    if (_module.profile != '0' || (nameModule && nameModule == 'AWCC')) {
                                        if (reserved || readonly) {
                                            if (_module.text != 'Situación')
                                                _module.profile = 1;
                                        }
                                        _module.checked = null;
                                        root.appendChild(_module)
                                    }
                                });
                                datos.record = record;
                                me.openTab(record, view, cuentaModule);
                            } else {
                                Ext.Ajax.request({
                                    url: url,
                                    method: 'GET',
                                    success: function (resp, operation) {
                                        var json = resp.responseText ? JSON.parse(resp.responseText) : null;
                                        if (json) {
                                            var modules = json.modules;
                                            datos.rights = json.rights;
                                            view.rights = datos.rights;
                                            view.security = json;
                                            datos.security = view.security;
                                            var root = datos.getRootNode();
                                            var cuentaModule;
                                            root.removeAll();
                                            if (modules && modules.length > 0) {
                                                Ext.Array.each(modules, function (_module) {

                                                    if (_module.profile != '0') {
                                                        if (reserved || readonly) {
                                                            if (_module.text != 'Situación') {
                                                                _module.profile = 0;
                                                            } else {
                                                                _module.profile = 3;
                                                            }
                                                        }
                                                        _module.checked = null;
                                                        root.appendChild(_module)
                                                        if (_module.text == 'Cuenta') {
                                                            cuentaModule = _module;
                                                        }
                                                    }
                                                });
                                            } else {
                                                var storeWebDealer = controller.getWebDealerSecurityModulesStoreStore()
                                                storeWebDealer.each(function (_module) {

                                                    if (readonly) {
                                                        _module.data.profile = 1;
                                                    } else {
                                                        _module.data.profile = 3;
                                                    }
                                                    _module.data.checked = null;
                                                    root.appendChild(_module.data)
                                                })
                                            }
                                            datos.record = record;
                                            me.openTab(record, view, cuentaModule);
                                        }
                                    }
                                });
                            }

                        } else if (recordCuenta.get('tip_nTipo') == 8 || recordCuenta.get('tip_nTipo') == 13) {
                            console.log("tiene cuenta tipo 8 o 13")
                            var _modules = deepCloneStore(controller.getCuentaAccesoSecurityModulesStoreStore());

                            var root = datos.getRootNode();
                            root.removeAll();
                            var modulesArray = [];

                            _modules.each(function (_module) {
                                console.log("_module", _module)
                                console.log("_module text ", _module.get('text'))
                                _module.set('profile', 3);
                                _module.set('checked', null);
                                modulesArray.push(_module.data);
                                root.appendChild(_module);
                                if (_module.get('text') == 'Cuenta') {
                                    cuentaModule = _module;
                                }
                            });

                            me.openTab(record, view, cuentaModule);
                        } else if (recordCuenta.get('tip_nCondicion') == 4) {
                            var administratorModule = modulesStore.findRecord('KeyReference', 'Administrator');
                            var isAdmin = administratorModule ? administratorModule.get('Available') : false;

                            if (isAdmin) {
                                if (nameModule && nameModule == 'AWCC') {
                                    var masterDealerModules = deepCloneStore(controller.getFenceSecurityModulesStoreStore());
                                } else {
                                    var masterDealerModules = deepCloneStore(controller.getFenceSecurityModulesStoreStore());
                                }
                                var root = datos.getRootNode();
                                root.removeAll();
                                var modulesArray = [];

                                masterDealerModules.each(function (_module) {

                                    _module.set('profile', 3);
                                    _module.set('checked', null);
                                    modulesArray.push(_module.data);
                                    root.appendChild(_module);
                                    if (_module.get('text') == 'Cuenta') {
                                        cuentaModule = _module;
                                    }
                                });

                                me.openTab(record, view, cuentaModule);
                            } else {

                                Ext.Ajax.request({
                                    url: url,
                                    method: 'GET',
                                    success: function (resp, operation) {
                                        var json = resp.responseText ? JSON.parse(resp.responseText) : null;
                                        if (json) {
                                            var modules = json.modules;
                                            datos.rights = json.rights;
                                            view.rights = datos.rights;
                                            view.security = json;
                                            datos.security = view.security;
                                            var root = datos.getRootNode();
                                            var cuentaModule;
                                            root.removeAll();
                                            Ext.Array.each(modules, function (_module) {

                                                if (_module.profile != '0') {
                                                    if (reserved || readonly) {
                                                        if (_module.text != 'Situación')
                                                            _module.profile = 1;
                                                    }
                                                    _module.checked = null;
                                                    root.appendChild(_module)
                                                    if (_module.text == 'Cuenta') {
                                                        cuentaModule = _module;
                                                    }
                                                }
                                            });
                                            datos.record = record;
                                            me.openTab(record, view, cuentaModule);
                                        }
                                    }
                                });
                            }

                        } else {
                            var root = datos.getRootNode();
                            root.removeAll();
                            var modules = [
                                {
                                    text: 'Cuenta',
                                    iconCls: 'icon-cuenta',
                                    view: 'cuentaformview',
                                    profile: 3
                                }, {
                                    text: 'Situación',
                                    iconCls: 'icon-search',
                                    view: 'estadoview'
                                }, {
                                    text: 'Contactos',
                                    iconCls: 'icon-telefonos',
                                    view: 'gridphones'
                                }, {
                                    text: 'Contactos Juridiccionales',
                                    iconCls: 'icon-phone',
                                    view: 'tablastelefonosjuridiccionalesaccgridview'
                                }, {
                                    text: 'Notas',
                                    iconCls: 'icon-notas',
                                    view: 'formnote'
                                }, {
                                    text: 'Informacion Médica',
                                    iconCls: 'icon-medica',
                                    view: 'medicalinfoview'
                                }, {
                                    text: 'Sms',
                                    iconCls: 'icon-sms',
                                    view: 'smsview'
                                }, {
                                    text: 'Reporte Histórico',
                                    iconCls: 'icon-reportes',
                                    view: 'recepcionview'
                                }, {
                                    text: 'Reporte Eventos',
                                    iconCls: 'icon-printer',
                                    view: 'reporteeventosview'
                                }, {
                                    text: 'Sms transmitidos',
                                    iconCls: 'icon-phone-sound',
                                    view: 'notificacionestabpanelview'
                                }, {
                                    text: 'Imagenes de eventos',
                                    iconCls: 'icon-photos',
                                    view: 'imagenesview',
                                }, {
                                    text: 'Bitacora',
                                    iconCls: 'icon-book',
                                    view: 'bitacoraview'
                                }
                            ]
                            Ext.Array.each(modules, function (_module) {
                                var defaultModule = {
                                    checked: null,
                                    class: "",
                                    closable: true,
                                    depth: 1,
                                    iconCls: "icon-zonas",
                                    index: 7,
                                    isFirst: false,
                                    isLast: false,
                                    leaf: true,
                                    opened: false,
                                    parentId: "root",
                                    profile: "3",
                                    text: "Zonas",
                                    url: "",
                                    view: "gridzone",
                                    viewConfig: ""
                                }

                                defaultModule.iconCls = _module.iconCls;
                                defaultModule.text = _module.text;
                                defaultModule.view = _module.view;

                                root.appendChild(defaultModule);

                                if (_module.text == 'Cuenta') {
                                    me.openTab(record, view, _module);
                                }
                            });
                        }
                        
                        this.setRecord(record, view);
                    }
                    else {
                        notifyError('Error al cargar los datos');
                        view.close();
                    }
                },
                scope: this
            });
        }
    },

    setRecord: function (record, view) {
        text = record.get('Name');

        view.record = record;
        view.cuenta = record;
    },

    openTab: function (record, view, _module) {
        text = record.get('Name');

        // Lo agregamos al panel
        var myPanel = view.down('#center');

        // me fijo si el tab existe, si es nuevo lo creo
        // if (!myPanel.getComponent(record.get('text'))) {
        var _config = {
            record: record,
            title: 'Cuenta',
            closable: false,
            module: _module,
            profile: _module ? _module.profile : 0,
            security: view.security,
            rights: view.rights,
            cuentaformProfile: _module ? _module.profile : 0,
            readOnly: view.readonly
        };

        var viewConfig;

        if (typeof (_module) == 'object') {
            viewConfig = _module.viewConfig;
        } else {
            viewConfig = _module.get('viewConfig');
        }

        if (viewConfig) {
            Ext.apply(_config, Ext.JSON.decode(viewConfig));
        }

        var mytab = myPanel.down('[title=' + getLocale('Cuenta') + ']');
        if (!mytab) {
            var newTab = Ext.widget('cuentaformview', _config);

            // agrego la paleta creada
            myPanel.add(newTab);
            myPanel.setActiveTab(newTab);
        }
        // el existe, lo activo
        else {
            myPanel.setActiveTab(mytab);
        }
    }
});
Ext.define('SmartTrack.controller.SmarttrackCuentaController', {
    extend: 'Ext.app.Controller',
    stores: ['CleanAppSecurityModulesStore', 'SmarttrackCuentaModuleStore'],
    models: ['SoftguardCuentaModel'],
    views: ['SmarttrackCuentaView'],
    readonly: false,

    init: function (config) {
        // genero los eventos
        this.control({
            'smartrackcuentaview': {
                beforerender: this.initview
            }
        });
    }, // cierro init

    initview: function (view) {
        var objectId = view.objectId;
        var controller = this;
        var me = this;
        this.application._nameModule == 'Vigicontrol'


        var nameModule = view.nameModule
            ? view.nameModule
            : controller.application._nameModule;
        record = this.getSoftguardCuentaModelModel();

        var myPanel = view.down('#center');
        controller.application._idModule = controller.application.getModuleIdByName(
            controller.application._nameModule
        )
        if (objectId == 0) {
            notifyError("Operación no soportada");
        } else {
            record.load(objectId, {
                callback: function (record, operation) {
                    var url = '/Rest/Security/Modules/' + controller.application._idModule + '/Security';
                    var modules = SecurityModulesStore;
                    //var modules = deepCloneStore(controller.getSecurityModulesStoreStore());
                    //var modules = controller.getSecurityModulesStoreStore();

                    var datos = view.down('#west');
                    modules.load({
                        callback: function () {
                            var masterModule = modules.findRecord('KeyReference', 'MasterWebDealer');
                            var administratorModule = modules.findRecord('KeyReference', 'Administrator');
                            var smarttrackModule = modules.findRecord('KeyReference', 'Smarttrack');
                            Ext.Ajax.request({
                                url: url,
                                method: 'GET',
                                success: function (resp, operation) {
                                    var json = null;
                                    if (resp.responseText && resp.responseText != '')
                                        json = JSON.parse(resp.responseText);
                                    if (json && json.modules && json.modules.length > 0) {
                                        var modules = json.modules;
                                        // datos.rights = json.rights;
                                        view.security = json;

                                        var root = datos.getRootNode();
                                        root.removeAll(); // Limpiar nodos existentes
                                        Ext.Array.each(modules, function (_module) {
                                            var model = controller.getModuleModelModel();
                                            var node = Ext.create(model, _module);
                                            datos.record = record;
                                            if (_module.profile != '0' && _module.text != 'Usuarios AWCC')//17/07/2023 Daniel O. Medina se excluye la carga del módulo según tarea https://softguard.atlassian.net/browse/DSS-617
                                                root.appendChild(node)
                                            if (_module.text == 'Cuenta') {
                                                cuentaModule = _module;
                                                me.openTab(record, view, cuentaModule);
                                            }

                                        })
                                    } else if (masterModule.get('Available') || administratorModule.get('Available')) {
                                        var smarttrackModules;

                                        if (controller.application._nameModule && controller.application._nameModule == 'CleanApp') {
                                            smarttrackModules = deepCloneStore(controller.getCleanAppSecurityModulesStoreStore());
                                        } else {
                                            smarttrackModules = deepCloneStore(controller.getSmarttrackCuentaModuleStoreStore());
                                        }

                                        var root = datos.getRootNode();
                                        root.removeAll(); // Limpiar nodos existentes
                                        smarttrackModules.each(function (_module) {
                                            _module.set('profile', '3');
                                            datos.record = record;
                                            // Crear un nodo del tree con los datos del módulo
                                            var nodeData = _module.getData();
                                            var treeNode = root.appendChild(nodeData);
                                            if (_module.get('text') == 'Cuenta') {
                                                cuentaModule = _module;
                                                me.openTab(record, view, cuentaModule);
                                            }
                                        })
                                    } else {
                                        notifyError('Falta de derechos, configure el módulo.')
                                    }
                                }
                            });
                        }
                    })
                }
            })
        }
    },

    openTab: function (record, view, _module) {
        text = record.get('Name');

        // Lo agregamos al panel
        var myPanel = view.down('#cuentassmarttrack');

        // me fijo si el tab existe, si es nuevo lo creo
        // if (!myPanel.getComponent(record.get('text'))) {
        var mytab = myPanel.down('[title=Cuenta]');
        if (!mytab) {
            var newTab = Ext.widget('smarttrackcuentaformview', {
                record: record,
                title: 'Cuenta',
                closable: false,
                module: _module,
                profile: _module.profile,
                security: view.security,
                filterTipo: view.filterTipo
            });

            // agrego la paleta creada
            myPanel.add(newTab);
            myPanel.setActiveTab(newTab);
        }
        // el existe, lo activo
        else {
            myPanel.setActiveTab(mytab);
        }

    },

    setRecord: function (record, view) {
        text = record.get('Name');
        view.record = record;
        view.cuenta = record;
    }
});
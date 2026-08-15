Ext.define('GestorSim.controller.Sims_CuentaController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['m_simcardSearchModel', 'm_simcardModel', 'ModuleModel'],
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
        var parent_record = view.record;
        var controller = this;
        let record_item = this.getM_simcardModelModel();

        if (objectId == 0) {
            notifyError('Operación no soportada');
        }
        else {
            record_item.load(objectId, {
                callback: function (record, operation) {

                    if (operation.success) {
                        var me = this;
                        record.set("cue_ncuenta", parent_record.get("cue_ncuenta"))
                        record.set("cue_cnombre", parent_record.get("cue_cnombre"));
                        record.set("sim_agente", parent_record.get("sim_agente"));

                        var securityTreeStore = Ext.create('Ext.data.TreeStore', {
                            model: controller.getModuleModelModel(),
                            data: [],
                            rootProperty: {
                                text: 'Datos',
                                expanded: false,
                                leaf: false
                            }
                        });

                        // cargo la lista de modulos
                        var datos = Ext.widget('moduletreeview', {
                            // store: securityTreeStore,
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

                        var root = datos.getRootNode();
                        root.removeAll();
                        var modules = [
                            {
                                text: 'Cuentas',
                                iconCls: 'icon-cuenta',
                                view: 'simnewview',
                                profile: 3
                            }, {

                                text: 'Comandos',
                                iconCls: 'icon-ipod-cast',
                                view: 'comandosgpsconfigview',
                                profile: 3
                            }, {

                                text: 'Informe -> Notificaciones',
                                iconCls: 'icon-ipod-cast',
                                view: 'smsgridview',
                                profile: 3
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

                            if (_module.text == 'Cuentas') {
                                me.openTab(record, view, _module);
                            }
                        });

                        // seteo el registro
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
            itemId: "CuentaTab",
            record: record,
            filterTipo: view.filterTipo,
            title: getLocale('Cuenta'),
            closable: false,
            module: _module,
            profile: _module ? _module.profile : 0,
            security: view.security,
            rights: view.rights,
            cuentaformProfile: _module ? _module.profile : 0,
            readOnly: view.readonly,
            caller: view.caller,
            record: record,
            objectId: view.id,
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
            var newTab = Ext.widget('simnewview', _config);
            // agrego la paleta creada
            myPanel.insert(0, newTab);
            myPanel.setActiveTab(newTab);
        }
        // el existe, lo activo
        else {
            myPanel.setActiveTab(mytab);
        }

    }
});
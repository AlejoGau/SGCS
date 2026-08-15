Ext.define('Cuenta.controller.SoftguardPanelGridController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: ['Cuenta.model.PanelSearchModel', 'Cuenta.model.PanelModel'],
    views: ['Cuenta.view.SoftguardPanelGridView'],

    init: function (config) {
        // genero los eventos
        this.control({
            'panelgridview': {
                afterrender: this.initView,
                refresh: this.onRefresh,
                itemdblclick: this.onItemDblClick,
                eliminar: this.onEliminar
            },
            'panelgridview button[action=search]': {
                click: this.onSearchClick
            },
            'panelgridview button[action=new]': {
                click: this.onNuevoClick
            }
        });
    }, // cierro init

    onEliminar: function (rec, view) {
        const controller = this;
        const model = controller.getPanelModelModel();

        model.load(rec.get('Id'), {
            callback: function (record_devueto) {
                Ext.MessageBox.confirm('Eliminar', 'Esta a punto de eliminar  un panel, desea continuar ?', function (btn) {
                    if (btn === 'yes') {
                        record_devueto.erase({
                            success: function (record) {
                                notify("Panel eliminado con éxito");
                                controller.initView(view);
                            },
                            failure: function (record, operation) {
                                notify("Error al eliminar el panel");
                            }
                        });
                    }
                });
            }
        });
    },

    onItemDblClick: function (view, record, item, index, e, options) {
        var view = view.up('panelgridview')
        const controller = this;
        var module = view.module;
        var profile = module.get('profile');
        const model = controller.getPanelModelModel();

        model.load(record.get('Id'), {
            callback: function (record_devueto) {
                var _config = {
                    record: record_devueto,
                    caller: view,
                    profile: profile,
                    new: false,
                };

                if (view.editorConfig) {
                    Ext.apply(_config, view.editorConfig);
                }
                var newView = Ext.widget('panelformview', _config);

                // Lo agregamos al panel
                var myWindow = Ext.widget('window', {
                    title: getLocale('Panel') + ' (' + record.get('pan_ccodigo') + ')',
                    translate: false,
                    height: 430,
                    width: 800,
                    modal: true,
                    items: newView,
                    closable: true,
                    layout: 'fit'
                }).show();
            }
        });



    },

    onRefresh: function (view) {
        view.store.load()
    },

    onNuevoClick: function (button, event, options) {

        var view = button.up('panelgridview');
        var controller = this;

        var model = this.getPanelModelModel();
        var myobject = model.create({
            pan_iidcuenta: view.record.get('Id')
        });

        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title: 'Nuevo panel',
            closeAction: 'destroy',
            height: 430,
            width: 750,
            border: true,
            modal: true,
            view: view,

            items: [
                {
                    xtype: 'panelformview',
                    record: myobject,
                    new: true,
                    caller: view
                }
            ]
        });
        win.show();

    },


    initView: function (view) {
        var module = view.module;
        var profile = module.get('profile');

        if (profile < 2) {
            view.down('toolbar').hide();
            view.down('#delete').hide();
        }



        var record = view.record;
        var filters = [];


        filters.push({
            property: 'pan_iidcuenta',
            value: record.get('cue_iid')
        });


        var store = Ext.create('Ext.data.Store', {
            model: this.getPanelSearchModelModel(),
            remoteFilter: true,
            autoload: false,
            filters: filters
        });

        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        view.bindStore(store);
        store.load();

    },


    onSearchClick: function (button) {
        var view = button.up('servtecgridview');
        var store = view.getStore();
        var estado = view.down('#estado');

        var filters = [];

        if (estado.getValue()) {
            filters.push({
                property: 'stc_nestado',
                value: estado.getValue(),
                id: 'estado'
            });
        }

        store.filter(filters);
    }

});
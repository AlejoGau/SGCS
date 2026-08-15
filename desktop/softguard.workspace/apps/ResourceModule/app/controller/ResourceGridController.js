Ext.define('ResourceModule.controller.ResourceGridController', {
    extend: 'Ext.app.Controller',
    views: ['ResourceGridView'],
    models: ['ResourceModuleModel', 'ResourceModuleSearchModel', 'ResourceTypeSearchModel'],
    init: function (config) {
        this.control(
            {
                'resourcegridview': {
                    afterrender: this.initView,
                    itemdblclick: this.onItemDblClick,
                    refresh: this.onRefresh
                },
                'resourcegridview menuitem[action=agruparestado]': {
                    click: this.onAgruparEstadoClick
                },
                'resourcegridview menuitem[action=agrupartipo]': {
                    click: this.onAgruparTipoClick
                },
                'resourcegridview menuitem[action=activos]': {
                    click: this.onActivosClick
                },
                'resourcegridview menuitem[action=noactivos]': {
                    click: this.onNoActivosClick
                },
                'resourcegridview button[action=search]': {
                    click: this.onSearchClick
                },
                'resourcegridview button[action=quitarfiltros]': {
                    click: this.onQuitarFiltrosClick
                },
                'resourcegridview button[action=activos]': {
                    click: this.onActivosClick
                },
                'resourcegridview button[action=noactivos]': {
                    click: this.onNoActivosClick
                },
                'resourcegridview segmentedbutton[action=filtroEstado]': {
                    toggle: this.onEstadoToggle
                }
            }
        );
    },
    initView: function (view) {
        var controller = this;
        var resourceModuleStore = Ext.create('Ext.data.Store', {
            model: this.getResourceModuleSearchModelModel(),
            remoteSort: true,
            remoteFilter: true,
            pageSize: 10000,
            groupField: 'estadoStr',
            sorters: [{
                property: 'estadoStr',
                direction: 'ASC'
            }],
            groupDir: 'ASC',

        });
        resourceModuleStore.load();
        view.setStore(resourceModuleStore);

        view.reconfigure(resourceModuleStore);

        var pagingtoolbar = view.down('pagingtoolbar');
        pagingtoolbar.bindStore(resourceModuleStore);
        view.groupingFeature = view.getView().getFeature('groupingRM');
        var resourceTypeStore = Ext.create('Ext.data.Store', {
            model: controller.getResourceTypeSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: 'rmt_itipo',
                value: 2
            }, {
                property: 'rmt_idOrg',
                value: _UserData.Company
            }],

        });
        resourceTypeStore.load();
        var resourceTypeCombo = view.down('#tipoRecursoCombo');
        resourceTypeCombo.bindStore(resourceTypeStore);
    },
    onRefresh: function (view) {
        var store = view.getStore();
        store.load();
    },
    onEstadoToggle: function (segementedbutton, button, isPressed) {
        var view = button.up('resourcegridview');
        if (isPressed) {
            if (button.text === 'Activos') {
                view.toggleActivos = true;
            }
            if (button.text === 'No Activos') {
                view.toggleActivos = false;
            }
        }
        view = button.up("resourcegridview");
        this.aplicarFiltros(view);
    },
    onItemDblClick: function (grid, record, item, index, e, eOpts) {
        var resourceModuleModel = this.getResourceModuleModelModel();
        var view = grid.up('resourcegridview');
        resourceModuleModel.load(record.data.Id, {
            callback: function (recordToEdit, operation, success) {
                if (success) {
                    var win = Ext.widget('window', {
                        title: 'Recurso',
                        width: 600,
                        height: 500,
                        resizable: false,
                        modal: true,
                        items: [
                            {
                                xtype: 'resourceformasignacionview',
                                caller: view,
                                recordEdit: recordToEdit,
                                recordSearch: record
                            }
                        ]
                    });
                    win.show();
                }
            }
        });

    },
    onAgruparEstadoClick: function (button) {
        var view = button.up('resourcegridview');

        var store = view.getStore();
        if (store.groupers)
            store.groupers.clear();
        store.sorters.clear();
        store.sort([{ property: 'estadoStr', direction: 'ASC' }]);
        view.groupingFeature.lastGroupers = null;
        view.groupingFeature.block();
        view.groupingFeature.enable();
        store.group({ property: 'estadoStr', direction: 'ASC' });
        view.groupingFeature.pruneGroupedHeader();
        view.groupingFeature.unblock();
        view.getStore().loadPage(1);
        /*var grouping = view.getView().features[0];
        grouping.enable();
        view.getStore().group('estadoStr', 'ASC');*/
    },
    onAgruparTipoClick: function (button) {
        var view = button.up('resourcegridview');
        var store = view.getStore();
        if (store.groupers)
            store.groupers.clear();
        store.sorters.clear();
        store.sort([{ property: 'rmt_cNombre', direction: 'ASC' }]);
        view.groupingFeature.lastGroupers = null;
        view.groupingFeature.block();
        view.groupingFeature.enable();
        store.group({ property: 'rmt_cNombre', direction: 'ASC' });
        view.groupingFeature.pruneGroupedHeader();
        view.groupingFeature.unblock();
        view.getStore().loadPage(1);
        /*var grouping = view.getView().features[0];
        grouping.enable();
        view.getStore().group('rmo_iTypeId', 'ASC');
        */
    },
    onSearchClick: function (button) {
        var view = button.up('resourcegridview');
        var store = view.getStore();
        this.aplicarFiltros(view);
    },
    aplicarFiltros: function (view) {
        var store = view.getStore();
        var filters = [];
        var nombre = view.down('#nombre').getValue();
        if (nombre) {
            filters.push({
                property: 'rmo_cNombre:LIKE',
                value: nombre
            });
        }
        var estado = view.down('#estado').getValue();
        if (estado) {
            filters.push({
                property: 'rmo_iestado',
                value: estado
            });
        }
        var integrante = view.down('#integrante').getValue();
        if (integrante) {
            filters.push({
                property: 'integrante:LIKE',
                value: integrante
            });
        }
        var cuenta = view.down('#cuenta').getValue();
        if (cuenta) {
            filters.push({
                property: 'account',
                value: cuenta
            });
        }
        var tipoRecurso = view.down('#tipoRecursoCombo').getValue();
        if (tipoRecurso) {
            filters.push({
                property: 'rmo_iTypeId',
                value: tipoRecurso
            });
        }
        if (view.toggleActivos) {
            filters.push({
                property: 'rmo_iestado',
                value: 1
            });
        } else {
            filters.push({
                property: 'rmo_iestado',
                value: 0
            });
        }
        store.clearFilter();
        store.filter(filters);
        store.load();


    },
    onQuitarFiltrosClick: function (button) {
        var view = button.up('resourcegridview');
        var store = view.getStore();
        store.clearFilter();
        store.load();
    },
    onActivosClick: function (button) {
        var view = button.up('resourcegridview');
        this.aplicarFiltros(view);

    },
    onNoActivosClick: function (button) {
        var view = button.up('resourcegridview');
        this.aplicarFiltros(view);


    }

});
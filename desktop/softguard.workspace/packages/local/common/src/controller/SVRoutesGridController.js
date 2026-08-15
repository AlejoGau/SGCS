// MIGRADO2024
// Controlador de la grilla principal de rutas SofIA. Gestiona filtros, apertura de pestañas
// de detalle y restricciones de perfil para los usuarios.
Ext.define('Common.controller.SVRoutesGridController', {
    extend : 'Ext.app.Controller',

    models : ['SVRoutesModel', 'SVRoutesSearchModel'],
    views  : [
        'SVRoutesGridView',
        'SVRoutesView'
    ],

    /**
     * Registra listeners sobre la grilla de rutas y la toolbar asociada.
     */
    init : function () {
        this.control({
            'svroutesgridview': {
                afterrender : this.onInitView,
                recordchange: this.onRecordChange,
                objectedit  : this.onObjectEdit,
                objectchanged: this.onObjectChanged,
                itemdblclick: this.onItemDoubleClick
            },
            'svroutesgridview button[action=search]': {
                click: this.onSearchClick
            },
            'svroutesgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'svroutesgridview button[action=add]': {
                click: this.onAdd
            },
            'svroutesgridview button[action="rebuild"]': {
                click: this.onRebuildClick
            }
        });
    },

    /**
     * Construye el store de la grilla, aplica filtros base y ajusta la UI segun perfil.
     * @param {Common.view.SVRoutesGridView} view
     */
    onInitView: function (view) {
        view.myPanel = view.up('tabpanel');
        view.baseFilters = view.baseFilters || [];

        if (!view.baseFilters.length) {
            var cuentaId = this.resolveCuentaId(view);
            if (cuentaId) {
                view.cuentaId = cuentaId;
                view.baseFilters = [{
                    property: 'svr_iCuentaId',
                    value: cuentaId
                }];
            }
        }

        view.filters = Ext.clone(view.baseFilters);
        // Prepara filtros activos (resultado de filtros base + dinamicos).

        var store = Ext.create('Ext.data.Store', {
            model: this.getSVRoutesSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        });

        view.bindStore(store);
        var pagingToolbar = view.down('pagingtoolbar');
        if (pagingToolbar) {
            pagingToolbar.bindStore(store);
        }

        this.applyFilters(view, view.filters);
        this.applyProfile(view);
    },

    /**
     * Reaplica los filtros base cuando cambia el registro de contexto.
     * @param {Common.view.SVRoutesGridView} view
     */
    onRecordChange: function (view) {
        view.baseFilters = view.baseFilters || [];
        view.filters = Ext.clone(view.baseFilters);
        // Prepara filtros activos (resultado de filtros base + dinamicos).
        this.applyFilters(view, view.filters);
    },

    /**
     * Reacciona a cambios externos (por ejemplo, guardados) refrescando la lista.
     * @param {Common.view.SVRoutesGridView} view
     */
    onObjectChanged: function (view, updatedRecord) {
        var store = view.getStore();
        if (!store) {
            return;
        }

        if (!updatedRecord) {
            store.reload();
            return;
        }

        var recordId = updatedRecord.get ? updatedRecord.get('svr_iid') : updatedRecord.svr_iid;
        var existing = Ext.isFunction(store.getById) ? store.getById(recordId) : null;

        if (existing && existing.set) {
            var data = Ext.isFunction(updatedRecord.getData) ? updatedRecord.getData() : (updatedRecord.data || updatedRecord);
            existing.set(data);
            if (Ext.isFunction(existing.commit)) {
                existing.commit();
            }
            return;
        }

        this.applyFilters(view, view.filters || view.baseFilters || []);
    },

    /**
     * Aplica los filtros solicitados sobre el store (clear + filter/load).
     * @param {Common.view.SVRoutesGridView} view
     * @param {Array} filters
     */
    applyFilters: function (view, filters) {
        var store = view.getStore();
        if (!store) {
            return;
        }

        store.clearFilter(true);
        view.filters = Ext.clone(filters || []);
        if (filters && filters.length) {
            store.filter(filters);
        } else {
            store.load();
        }
    },

    /**
     * Determina el identificador de cuenta asociado a la vista.
     * @param {Common.view.SVRoutesGridView} view
     * @return {Number|null}
     */
    resolveCuentaId: function (view) {
        var record = view.record;
        if (!record && view.caller && view.caller.record) {
            record = view.caller.record;
        }

        if (record) {
            return record.get ? (record.get('cue_iid') || record.get('CuentaId') || record.get('cuentaId')) : (record.cue_iid || record.CuentaId || record.cuentaId);
        }

        return null;
    },

    /**
     * Ajusta la toolbar segun el perfil del modulo (oculta acciones restringidas).
     * @param {Common.view.SVRoutesGridView} view
     */
    applyProfile: function (view) {
        if (!view.module) {
            return;
        }

        view.profile = view.module.profile ? view.module.profile : view.module.get('profile');
        if (view.profile < 2) {
            Ext.Array.each(['#add', '#rebuild'], function (itemId) {
                var button = view.down(itemId);
                if (button) {
                    button.hide();
                }
            });
        }
    },

    /**
     * Ejecuta la busqueda aplicando filtros dinamicos sobre el store.
     * @param {Ext.button.Button} button
     */
    onSearchClick: function (button) {
        var view = button.up('svroutesgridview');
        if (!view) {
            return;
        }

        var store = view.getStore();
        if (!store) {
            return;
        }

        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        var filters = Ext.clone(view.baseFilters || []);

        if (fieldName && query) {
            filters.push({
                property: fieldName + ':LIKE',
                value: query
            });
        }

        this.applyFilters(view, filters);
    },

    /**
     * Limpia la busqueda y reaplica los filtros base.
     * @param {Ext.button.Button} button
     */
    onGetAllClick: function (button) {
        var view = button.up('svroutesgridview');
        if (!view) {
            return;
        }

        view.down('#query').setValue('');
        // Limpiamos el texto de busqueda antes de re-aplicar filtros base.
        this.applyFilters(view, Ext.clone(view.baseFilters || []));
    },

    /**
     * Abre una nueva pestaña de ruta en blanco.
     * @param {Ext.button.Button} button
     */
    onAdd: function (button) {
        var grid = button.up('svroutesgridview');
        if (!grid) {
            return;
        }

        // Determina la cuenta actual para asociar la nueva ruta.
        var cuentaId = grid.cuentaId || this.resolveCuentaId(grid);
        var Model = this.getSVRoutesModelModel();
        var record = Model.create({
            svr_iCuentaId: cuentaId,
            svr_cName: '',
            svr_cDescripcion: '',
            svr_dDateStart: new Date(),
            svr_iid: 0,
            svr_iParallel: 0
        });
        var titleText = 'Nuevo plan de control';
        this.openRouteTab(grid, titleText, record, cuentaId);
    },

    /**
     * Atajo para editar la ruta seleccionada mediante doble click.
     * @param {Ext.grid.Panel} grid
     * @param {Ext.data.Model} record
     */
    onItemDoubleClick: function (grid, record) {
        this.onObjectEdit(record, grid);
    },

    /**
     * Carga desde backend y abre el tab de detalle para la ruta.
     * @param {Ext.data.Model} record
     * @param {Ext.grid.Panel} grid
     */
    onObjectEdit: function (record, grid) {
        if (!grid) {
            return;
        }

        var Model = this.getSVRoutesModelModel();
        var routeId = record.get('svr_iid');
        if (!routeId) {
            notifyError('No se pudo determinar la ruta seleccionada.');
            return;
        }

        // Determina la cuenta actual para asociar la nueva ruta.
        var cuentaId = grid.cuentaId || this.resolveCuentaId(grid);
        var titleSource = record.get('svr_cName') || record.get('Name') || 'Plan de Control';

        // Indicamos carga mientras traemos el registro completo desde backend.
        grid.setLoading(true);
        Model.load(routeId, {
            scope: this,
            success: function (fullRecord) {
                grid.setLoading(false);
                if (cuentaId && !fullRecord.get('svr_iCuentaId')) {
                    fullRecord.set('svr_iCuentaId', cuentaId);
                }
                var resolvedTitle = fullRecord.get('svr_cName') || fullRecord.get('Name') || titleSource;
                this.openRouteTab(grid, resolvedTitle, fullRecord, cuentaId);
            },
            failure: function () {
                grid.setLoading(false);
                notifyError('No se pudo cargar la ruta seleccionada.');
            }
        });
    },

    /**
     * Abre (o reusa) una pestaña de detalle para la ruta indicada.
     * @param {Ext.grid.Panel} grid
     * @param {String} titleText
     * @param {Common.model.SVRoutesModel} record
     * @param {Number} cuentaId
     * @return {Common.view.SVRoutesView|null}
     */
    /**
     * Abre (o reutiliza) una pestana de detalle para la ruta indicada.
     * @param {Ext.grid.Panel} grid
     * @param {String} titleText
     * @param {Common.model.SVRoutesModel} record
     * @param {Number} cuentaId
     * @return {Common.view.SVRoutesView|null}
     */
    openRouteTab: function (grid, titleText, record, cuentaId) {
        var tabPanel = grid.up('tabpanel') || grid.myPanel;

        if (!tabPanel) {
            tabPanel = Ext.getCmp('center');
        }

        if (!tabPanel) {
            notifyError('No se encontro el contenedor de pestanas para abrir la vista.');
            return null;
        }

        var lookupTitle = sanitizarTitulo ? sanitizarTitulo(titleText) : titleText;
        var cuentaRecord = grid.cuentaRecord || grid.record || (grid.caller && grid.caller.record) || null;
        var tab = tabPanel.items.findBy(function (item) {
            return item.title === lookupTitle;
        });

        if (!tab) {
            tab = Ext.widget('svroutesview', {
                caller: grid,
                record: record,
                cuentaId: cuentaId || grid.cuentaId || this.resolveCuentaId(grid),
                cuentaRecord: cuentaRecord,
                title: lookupTitle,
                closable: true
            });
            // Creamos una nueva pestana si no existe.
            tabPanel.add(tab);
        } else {
            tab.cuentaId = cuentaId || tab.cuentaId;
            tab.cuentaRecord = cuentaRecord || tab.cuentaRecord;
            tab.setRecord(record);
        }

        // Guardamos referencias para que el tab pueda avisar cambios al grid.
        tab.caller = grid;
        tab.cuentaRecord = cuentaRecord || tab.cuentaRecord;
        tab.setTitle(lookupTitle);
        tab.originalTitle = lookupTitle;
        tabPanel.setActiveTab(tab);
        return tab;
    },
    /**
     * Fuerza la regeneracion de los planes de control en backend.
     * Invoca el scheduler para recalcular los cronogramas diarios.
     */
    onRebuildClick: function (button) {
        var view = button ? button.up('svroutesgridview') : null;
        if (!view) {
            notifyError('No se pudo localizar la grilla de planes de control.');
            return;
        }

        Ext.Ajax.request({
            url: '/rest/search/SchedulerCreateSofiaRoutes',
            success: function (response) {
                var text = response.responseText;
                var object;

                try {
                    object = Ext.JSON.decode(text);
                } catch (e) {
                    notifyError('No se pudo interpretar la respuesta del servidor.');
                    return;
                }

                if (object && object.success) {
                    notify('Se regeneraron las rutas con éxito.');
                    view.getStore().reload();
                } else {
                    notifyError('El backend no confirmó la regeneración de rutas.');
                }
            },
            failure: function () {
                notifyError('No se pudo regenerar las rutas. Intente nuevamente.');
            }
        });
    }
});










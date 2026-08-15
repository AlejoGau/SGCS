// MIGRADO2024
// Controller for the SofIA route programs grid. Handles CRUD operations for
// scheduling entries linked to a specific route.
Ext.define('Common.controller.SVRouteProgramsGridController', {
    extend: 'Ext.app.Controller',
    models: ['SVRouteProgramModel', 'SVRouteProgramSearchModel'],
    views: [
        'SVRouteProgramsGridView',
        'SVRouteProgramWindow',
        'SVRouteProgramFormView'
    ],

    /**
     * Registers handlers for the programs grid and toolbar buttons.
     */
    init: function() {
        this.control({
            'svrouteprogramsgridview': {
                afterrender: this.onInitView,
                recordchange: this.onRecordChange,
                objectedit: this.onObjectEdit,
                itemdblclick: this.onItemDoubleClick
            },
            'svrouteprogramsgridview button[action=add]': {
                click: this.onAddProgram
            },
            'svrouteprogramsgridview button[action="delete"]': {
                click: this.onDeleteProgram
            }
        });
    },

    /**
     * Initializes the grid store applying base filters by route.
     * @param {Common.view.SVRouteProgramsGridView} view
     */
    onInitView: function(view) {
        view.baseFilters = view.baseFilters || [];
        var routeId = this.resolveRouteId(view);
        if (routeId) {
            // Cache the resolved context so follow-up updates reuse the same route.
            view.routeId = routeId;
        }

        if (!view.baseFilters.length && routeId) {
            view.baseFilters = [{
                property: 'srp_iRouteId',
                value: routeId
            }];
        }

        view.filters = Ext.clone(view.baseFilters);

        var store = Ext.create('Ext.data.Store', {
            model: this.getSVRouteProgramSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            sorters: [
                { property: 'srp_cProgramType', direction: 'ASC' },
                { property: 'srp_iStartHour', direction: 'ASC' },
                { property: 'srp_iStartMinutes', direction: 'ASC' }
            ]
        });

        view.bindStore(store);
        var pagingToolbar = view.down('pagingtoolbar');
        if (pagingToolbar) {
            pagingToolbar.bindStore(store);
        }

        this.applyFilters(view, view.filters);
    },

    /**
     * Reapplies base filters when the route context changes.
     * @param {Common.view.SVRouteProgramsGridView} view
     */
    onRecordChange: function(view) {
        view.baseFilters = view.baseFilters || [];
        var routeId = this.resolveRouteId(view);
        if (routeId) {
            view.baseFilters = [{
                property: 'srp_iRouteId',
                value: routeId
            }];
        } else {
            view.baseFilters = [];
        }
        view.filters = Ext.clone(view.baseFilters || []);
        this.applyFilters(view, view.filters);
    },

    /**
     * Routes the double-click event to the same logic used by toolbar edit actions.
     * @param {Common.view.SVRouteProgramsGridView} grid
     * @param {Common.model.SVRouteProgramSearchModel} record
     */
    onItemDoubleClick: function(grid, record) {
        this.onObjectEdit(record, grid);
    },

    /**
     * Loads the full program record from the server and opens the editor window.
     * @param {Ext.data.Model|Object} record
     * @param {Ext.Component} grid
     */
    onObjectEdit: function(record, grid) {
        var gridView = this.resolveGridView(grid);
        if (!gridView || !record) {
            return;
        }

        var programId = record.get ? record.get('srp_iid') : record.srp_iid;
        if (!programId) {
            notifyError('No se pudo determinar la programacion seleccionada.');
            return;
        }

        var routeId = this.resolveRouteId(gridView);
        var Model = this.getSVRouteProgramModelModel();
        gridView.setLoading(true);
        Model.load(programId, {
            scope: this,
            success: function(fullRecord) {
                gridView.setLoading(false);
                if (routeId && fullRecord && fullRecord.set && !fullRecord.get('srp_iRouteId')) {
                    // Persist the current route so the form submits within the same context.
                    fullRecord.set('srp_iRouteId', routeId);
                }
                var title = 'Editar programacion';
                this.openProgramWindow(gridView, title, fullRecord, routeId);
            },
            failure: function() {
                gridView.setLoading(false);
                notifyError('No se pudo cargar la programacion seleccionada.');
            }
        });
    },

    /**
     * Creates a new program record pre-populated with defaults and opens the form.
     * @param {Ext.button.Button} button
     */
    onAddProgram: function(button) {
        var grid = button.up('svrouteprogramsgridview');
        var gridView = this.resolveGridView(grid);
        if (!gridView) {
            return;
        }

        var routeId = this.resolveRouteId(gridView);
        if (!routeId) {
            notifyError('No se pudo determinar la ruta asociada.');
            return;
        }

        var Model = this.getSVRouteProgramModelModel();
        var record = Model.create({
            srp_iRouteId: routeId,
            srp_cProgramType: '1',
            srp_iStartHour: 0,
            srp_iStartMinutes: 0,
            srp_iDayOfWeek: 0,
            srp_iDayOfMonth: 1
        });

        // Defaults allow the modal to render with a valid record even before edits.
        this.openProgramWindow(gridView, 'Nueva programacion', record, routeId);
    },

    /**
     * Confirms and removes the selected program records from the server.
     * @param {Ext.button.Button} button
     */
    onDeleteProgram: function(button) {
        var grid = button.up('svrouteprogramsgridview');
        if (!grid) {
            return;
        }

        var selectionModel = grid.getSelectionModel ? grid.getSelectionModel() : null;
        var selection = selectionModel ? selectionModel.getSelection() : [];
        if (!selection || !selection.length) {
            notifyError('Seleccione al menos una programacion.');
            return;
        }

        var me = this;
        Ext.Msg.confirm('Eliminar programaciones', 'Desea eliminar las programaciones seleccionadas?', function(choice) {
            if (choice !== 'yes') {
                return;
            }

            var Model = me.getSVRouteProgramModelModel();
            var recordsToDelete = [];
            Ext.Array.each(selection, function(rec) {
                var id = rec && rec.get ? rec.get('srp_iid') : (rec ? rec.srp_iid : null);
                id = Ext.Number.from(id, 0);
                if (id) {
                    recordsToDelete.push({ id: id });
                }
            });

            if (!recordsToDelete.length) {
                notifyError('No se pudo determinar el identificador de las programaciones seleccionadas.');
                return;
            }

            var pending = recordsToDelete.length;
            var failures = [];
            var finalize = function() {
                grid.setLoading(false);
                if (selectionModel) {
                    selectionModel.deselectAll();
                }
                var store = grid.getStore ? grid.getStore() : null;
                if (store && store.reload) {
                    // Reload ensures the grid reflects results of bulk deletion.
                    store.reload();
                }
                grid.fireEvent('objectchanged', grid, null);
                if (failures.length) {
                    notifyError('Algunas programaciones no pudieron eliminarse.');
                } else {
                    notify('Programacion(es) eliminada(s) correctamente.');
                }
            };

            grid.setLoading(true);
            Ext.Array.each(recordsToDelete, function(item) {
                var recordModel = Model.create({ srp_iid: item.id });
                recordModel.setConfig({ proxy: Model.getProxy() });
                recordModel.erase({
                    scope: me,
                    callback: function(rec, operation, success) {
                        if (!success) {
                            failures.push(item.id);
                        }
                        pending -= 1;
                        if (pending <= 0) {
                            finalize();
                        }
                    }
                });
            });
        });
    },

    /**
     * Builds and displays the program editor window.
     * @param {Common.view.SVRouteProgramsGridView} grid
     * @param {String} title
     * @param {Ext.data.Model} record
     * @param {Number} routeId
     * @return {Ext.window.Window}
     */
    openProgramWindow: function(grid, title, record, routeId) {
        var window = Ext.widget('svrouteprogramwindow', {
            title: title,
            caller: grid,
            routeId: routeId,
            record: record
        });

        var form = window.getForm();
        if (form) {
            // Share context so the embedded form can perform saves and reloads.
            form.caller = grid;
            form.routeId = routeId;
            form.setRecord(record);
        }

        window.show();
        return window;
    },

    /**
     * Applies the provided filters to the grid store, reloading as needed.
     * @param {Common.view.SVRouteProgramsGridView} view
     * @param {Array} filters
     */
    applyFilters: function(view, filters) {
        var store = view.getStore();
        if (!store) {
            return;
        }

        store.clearFilter(true);
        if (filters && filters.length) {
            store.filter(filters);
        } else {
            store.load();
        }
        view.fireEvent('objectchanged', view, null);
    },

    /**
     * Normalizes component references into the actual grid view instance.
     * @param {Ext.Component} component
     * @return {Common.view.SVRouteProgramsGridView|null}
     */
    resolveGridView: function(component) {
        if (!component) {
            return null;
        }
        if (component.isXType && component.isXType('svrouteprogramsgridview')) {
            return component;
        }
        if (component.grid && component.grid.isXType && component.grid.isXType('svrouteprogramsgridview')) {
            return component.grid;
        }
        return component;
    },

    /**
     * Extracts the current route identifier from the grid context or bound record.
     * @param {Ext.Component} view
     * @return {Number|null}
     */
    resolveRouteId: function(view) {
        if (!view) {
            return null;
        }
        var gridView = this.resolveGridView(view) || view;
        if (gridView.routeId) {
            return gridView.routeId;
        }
        var record = gridView.record || null;
        if (record) {
            if (record.get) {
                return record.get('svr_iid') || record.get('srp_iRouteId') || null;
            }
            return record.svr_iid || record.srp_iRouteId || null;
        }
        return null;
    }
});

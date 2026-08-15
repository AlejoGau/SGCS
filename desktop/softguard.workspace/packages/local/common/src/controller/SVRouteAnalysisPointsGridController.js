// MIGRADO2024
// Controller for the SofIA route analysis points grid. Orchestrates search,
// editing flow, and synchronization with the route context.
Ext.define('Common.controller.SVRouteAnalysisPointsGridController', {
    extend : 'Ext.app.Controller',
    models : ['SVRouteAnalysisPointModel', 'SVRouteAnalysisPointSearchModel'],
    views  : [
        'SVRouteAnalysisPointsGridView',
        'SVRouteAnalysisPointWindow',
        'SVRouteAnalysisPointFormView'
    ],

    /**
     * Registers event bindings for the grid toolbar and row interactions.
     */
    init: function() {
        this.control({
            'svrouteanalysispointsgridview': {
                afterrender: this.onInitView,
                recordchange: this.onRecordChange,
                objectedit: this.onObjectEdit,
                itemdblclick: this.onItemDoubleClick
            },
            'svrouteanalysispointsgridview button[action=search]': {
                click: this.onSearchClick
            },
            'svrouteanalysispointsgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'svrouteanalysispointsgridview button[action=add]': {
                click: this.onAddPoint
            },
            'svrouteanalysispointsgridview button[action="delete"]': {
                click: this.onDeletePoint
            }
        });
    },

    /**
     * Creates the backing store and applies initial route filters.
     * @param {Common.view.SVRouteAnalysisPointsGridView} view
     */
    onInitView: function(view) {
        view.baseFilters = view.baseFilters || [];
        var routeId = this.resolveRouteId(view);
        if (routeId) {
            // Cache resolved context so later actions reuse the same route id.
            view.routeId = routeId;
        }

        if (!view.baseFilters.length && routeId) {
            view.baseFilters = [{
                property: 'sra_iRouteId',
                value: routeId
            }];
        }

        view.filters = Ext.clone(view.baseFilters);

        var store = Ext.create('Ext.data.Store', {
            model: this.getSVRouteAnalysisPointSearchModelModel(),
            pageSize: 50,
            remoteFilter: true,
            remoteSort: true
        });

        view.bindStore(store);
        var pagingToolbar = view.down('pagingtoolbar');
        if (pagingToolbar) {
            pagingToolbar.bindStore(store);
        }

        this.applyFilters(view, view.filters);
    },

    /**
     * Rebuilds base filters when the parent route context changes.
     * @param {Common.view.SVRouteAnalysisPointsGridView} view
     */
    onRecordChange: function(view) {
        var routeId = this.resolveRouteId(view);
        if (routeId) {
            view.baseFilters = [{
                property: 'sra_iRouteId',
                value: routeId
            }];
        } else {
            view.baseFilters = [];
        }
        view.filters = Ext.clone(view.baseFilters);
        this.applyFilters(view, view.filters);
    },

    /**
     * Reuses edit logic for double-click interactions on grid rows.
     * @param {Ext.grid.Panel} grid
     * @param {Ext.data.Model} record
     */
    onItemDoubleClick: function(grid, record) {
        this.onObjectEdit(record, grid);
    },

    /**
     * Loads the full analysis point record and opens the edit window.
     * @param {Ext.data.Model|Object} record
     * @param {Ext.Component} grid
     */
    onObjectEdit: function(record, grid) {
        var gridView = this.resolveGridView(grid);
        if (!gridView || !record) {
            return;
        }

        var pointId = record.get ? record.get('sra_iid') : record.sra_iid;
        if (!pointId) {
            notifyError('No se pudo determinar la configuracion de camara seleccionada.');
            return;
        }

        var routeId = this.resolveRouteId(gridView);
        var cuentaId = this.resolveCuentaIdFromView(gridView);
        if (cuentaId) {
            gridView.cuentaId = cuentaId;
        }
        var Model = this.getSVRouteAnalysisPointModelModel();
        gridView.setLoading(true);
        Model.load(pointId, {
            scope: this,
            success: function(fullRecord) {
                gridView.setLoading(false);
                if (routeId && fullRecord && fullRecord.set && !fullRecord.get('sra_iRouteId')) {
                    // Ensure the record remembers the active route before persisting changes.
                    fullRecord.set('sra_iRouteId', routeId);
                }
                var title = fullRecord && fullRecord.get ? fullRecord.get('sra_cReference') : record.get('sra_cReference');
                var resolvedTitle = Ext.isEmpty(title) ? 'Editar configuracion de camara' : ('Editar: ' + Ext.String.trim(title));
                this.openPointWindow(gridView, resolvedTitle, fullRecord, routeId, cuentaId);
            },
            failure: function() {
                gridView.setLoading(false);
                notifyError('No se pudo cargar la configuracion seleccionada.');
            }
        });
    },

    /**
     * Creates a new analysis point record with defaults for the current route.
     * @param {Ext.button.Button} button
     */
    onAddPoint: function(button) {
        var grid = button.up('svrouteanalysispointsgridview');
        var gridView = this.resolveGridView(grid);
        if (!gridView) {
            return;
        }

        var routeId = this.resolveRouteId(gridView);
        if (!routeId) {
            notifyError('No se pudo determinar la ruta asociada.');
            return;
        }

        var cuentaId = this.resolveCuentaIdFromView(gridView);
        if (cuentaId) {
            gridView.cuentaId = cuentaId;
        }
        var Model = this.getSVRouteAnalysisPointModelModel();
        var nextOrder = this.nextOrderValue(gridView);
        var record = Model.create({
            sra_iid: 0,
            sra_iRouteId: routeId,
            sra_iAnalysisPointId: 0,
            sra_iOrder: nextOrder,
            sra_cReference: '',
            sra_cCameraType: '',
            sra_iCameraRefId: 0,
            sra_cConfig: ''
        });

        // Provide sane defaults so the modal can render before the user edits fields.
        this.openPointWindow(gridView, 'Nueva configuracion de camara', record, routeId, cuentaId);
    },

    /**
     * Confirms and removes selected analysis points from the server.
     * @param {Ext.button.Button} button
     */
    onDeletePoint: function(button) {
        var grid = button ? button.up('svrouteanalysispointsgridview') : null;
        if (!grid) {
            return;
        }

        var selectionModel = grid.getSelectionModel ? grid.getSelectionModel() : null;
        var selection = selectionModel ? selectionModel.getSelection() : [];
        if (!selection || !selection.length) {
            notifyError('Seleccione al menos una configuracion de camara.');
            return;
        }

        var me = this;
        Ext.Msg.confirm('Eliminar configuraciones', 'Desea eliminar las configuraciones seleccionadas?', function(choice) {
            if (choice !== 'yes') {
                return;
            }

            var Model = me.getSVRouteAnalysisPointModelModel();
            var recordsToDelete = [];
            Ext.Array.each(selection, function(rec) {
                var id = rec && rec.get ? rec.get('sra_iid') : (rec ? rec.sra_iid : null);
                id = Ext.Number.from(id, 0);
                if (id) {
                    recordsToDelete.push({ id: id, original: rec });
                }
            });

            if (!recordsToDelete.length) {
                notifyError('No se pudo determinar el identificador de las configuraciones seleccionadas.');
                return;
            }

            var pending = recordsToDelete.length;
            var failures = [];
            var finalize = function() {
                grid.setLoading(false);
                if (selectionModel) {
                    if (selectionModel.clearSelections) {
                        selectionModel.clearSelections();
                    } else if (selectionModel.deselectAll) {
                        selectionModel.deselectAll();
                    }
                }
                var store = grid.getStore ? grid.getStore() : null;
                if (store && store.reload) {
                    // Reload ensures the grid reflects deletions immediately.
                    store.reload();
                }
                grid.fireEvent('objectchanged', grid, null);
                if (failures.length) {
                    notifyError('Algunas configuraciones no pudieron eliminarse.');
                } else {
                    notify('Configuracion(es) de camara eliminada(s) correctamente.');
                }
            };

            grid.setLoading(true);
            Ext.Array.each(recordsToDelete, function(item) {
                var recordModel = Model.create({ sra_iid: item.id });
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
     * Instantiates the modal editor window for analysis points.
     * @param {Common.view.SVRouteAnalysisPointsGridView} grid
     * @param {String} title
     * @param {Ext.data.Model} record
     * @param {Number} routeId
     * @param {Number} cuentaId
     * @return {Ext.window.Window}
     */
    openPointWindow: function(grid, title, record, routeId, cuentaId) {
        var gridView = this.resolveGridView(grid);
        if (!gridView) {
            return null;
        }
        var window = Ext.widget('svrouteanalysispointwindow', {
            title: title,
            caller: gridView,
            routeId: routeId,
            cuentaId: cuentaId,
            record: record
        });

        var form = window.getForm();
        if (form) {
            // Share context so the form can resolve lookups and submit correctly.
            form.caller = gridView;
            form.routeId = routeId;
            form.cuentaId = cuentaId;
            form.setRecord(record);
        }

        window.show();

        var nameField = form ? form.down('textfield[name="sra_cReference"]') : null;
        if (nameField) {
            nameField.focus(false, 200);
        }

        return window;
    },

    /**
     * Applies a text filter based on the selected field and query value.
     * @param {Ext.button.Button} button
     */
    onSearchClick: function(button) {
        var view = button.up('svrouteanalysispointsgridview');
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
     * Clears manual filters and reverts to the base route filters.
     * @param {Ext.button.Button} button
     */
    onGetAllClick: function(button) {
        var view = button.up('svrouteanalysispointsgridview');
        if (!view) {
            return;
        }

        var field = view.down('#fieldName');
        var queryField = view.down('#query');
        if (field) {
            field.reset();
        }
        if (queryField) {
            queryField.reset();
        }

        this.applyFilters(view, Ext.clone(view.baseFilters || []));
    },

    /**
     * Normalizes different component references into the target grid instance.
     * @param {Ext.Component} source
     * @return {Common.view.SVRouteAnalysisPointsGridView|null}
     */
    resolveGridView: function(source) {
        if (!source) {
            return null;
        }
        if (source.isXType && source.isXType('svrouteanalysispointsgridview')) {
            return source;
        }
        if (source.grid && source.grid.isXType && source.grid.isXType('svrouteanalysispointsgridview')) {
            return source.grid;
        }
        return null;
    },

    /**
     * Applies the given filters to the grid store and reloads results.
     * @param {Common.view.SVRouteAnalysisPointsGridView} view
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
    },

    /**
     * Calculates the next order value based on the current store contents.
     * @param {Common.view.SVRouteAnalysisPointsGridView} view
     * @return {Number}
     */
    nextOrderValue: function(view) {
        var store = view.getStore();
        if (!store || !store.getCount) {
            return 1;
        }
        var maxOrder = 0;
        store.each(function(rec) {
            var current = rec.get ? rec.get('sra_iOrder') : rec.sra_iOrder;
            if (Ext.isNumber(current) && current > maxOrder) {
                maxOrder = current;
            }
        });
        return maxOrder + 1;
    },

    /**
     * Resolves the current route identifier from the grid or bound record.
     * @param {Ext.Component} view
     * @return {Number|null}
     */
    resolveRouteId: function(view) {
        var gridView = this.resolveGridView(view);
        if (!gridView) {
            return null;
        }
        if (gridView.routeId) {
            return gridView.routeId;
        }
        var record = gridView.routeRecord || gridView.record || null;
        if (record) {
            if (record.get) {
                return record.get('svr_iid') || record.get('sra_iRouteId') || null;
            }
            return record.svr_iid || record.sra_iRouteId || null;
        }
        return null;
    },

    /**
     * Extracts the account identifier from a record.
     * @param {Ext.data.Model|Object} record
     * @return {Number|null}
     */
    resolveCuentaId: function(record) {
        if (!record) {
            return null;
        }
        if (record.get) {
            return record.get('svr_iCuentaId') || record.get('cue_iid') || record.get('CuentaId') || null;
        }
        return record.svr_iCuentaId || record.cue_iid || record.CuentaId || null;
    },

    /**
     * Resolves the account identifier using grid-level cached context.
     * @param {Ext.Component} view
     * @return {Number|null}
     */
    resolveCuentaIdFromView: function(view) {
        var gridView = this.resolveGridView(view);
        if (!gridView) {
            return null;
        }
        var cuentaId = gridView.cuentaId || null;
        if (!cuentaId && gridView.cuentaRecord) {
            cuentaId = this.resolveCuentaId(gridView.cuentaRecord);
        }
        if (!cuentaId && gridView.routeRecord) {
            cuentaId = this.resolveCuentaId(gridView.routeRecord);
        }
        if (!cuentaId && gridView.record) {
            cuentaId = this.resolveCuentaId(gridView.record);
        }
        return cuentaId ? Ext.Number.from(cuentaId, 0) : null;
    }
});

// MIGRADO2024
// Este controlador maneja la edición y ciclo de vida del formulario de planes de control (SV_Routes).
// Guías rápidas:
//  - La vista contiene los botones de guardar/eliminar, pero la lógica de habilitación y las
//    validaciones residen aquí para mantener un único punto de decisión.
//  - Se registran los stores hijos (cámaras y programaciones) para impedir eliminaciones con dependencias.
//    Si se agregan nuevos módulos, incorporarlos en evaluateDependencies para considerar sus dependencias antes de eliminar.
//  - Documentación adicional en AGENTS: mantener sincronizado el patrón con otros controllers.
Ext.define('Common.controller.SVRoutesFormController', {
    extend : 'Ext.app.Controller',
    models : ['SVRoutesModel'],
    views  : ['SVRoutesFormView'],

    /**
     * Registra listeners del formulario de rutas y sus botones asociados.
     */
    init : function() {
        this.control({
            'svroutesformview': {
                beforerender: this.onInitView,
                routechange: this.onRouteChange
            },
            'svroutesformview button[action="save"]': {
                click: this.onSaveClick
            },
            'svroutesformview button[action="deleteRoute"]': {
                click: this.onDeleteClick
            }
        });
    },

    /**
     * Inicializa el formulario con un registro existente o genera uno nuevo.
     * Tambien aplica la cuenta asociada cuando corresponde.
     * @param {Common.view.SVRoutesFormView} view
     */
    onInitView: function(view) {
        var record = view.record;
        if (!record) {
            record = Ext.create('Common.model.SVRoutesModel');
            record.set('svr_dDateStart', new Date());
            view.setRecord(record);
        }

        var cuentaId = view.cuentaId || (record.get ? record.get('svr_iCuentaId') : null);
        if (cuentaId) {
            var cuentaField = view.down('hiddenfield[name="svr_iCuentaId"]');
            if (cuentaField) {
                cuentaField.setValue(cuentaId);
            }
            if (record && record.set) {
                record.set('svr_iCuentaId', cuentaId);
            }
        }

        if (record) {
            view.setRecord(record);
        }
        this.updateDeleteButton(view, record);
        this.bindDependencyStores(view);
    },

    /**
     * Persiste los cambios del formulario contra `/Rest/SV_Routes/`.
     * @param {Ext.button.Button} button
     */
    onSaveClick: function(button) {
        var view = button.up('svroutesformview');
        var form = view.getForm();
        var record = form.getRecord();
        if (!record) {
            record = Ext.create('Common.model.SVRoutesModel');
            view.setRecord(record);
        }

        var cuentaField = form.findField('svr_iCuentaId');
        if (cuentaField && view.cuentaId && !cuentaField.getValue()) {
            // Asegura que el plan quede asociado a la cuenta en contexto.
            cuentaField.setValue(view.cuentaId);
        }

        form.updateRecord(record);

        var idProp = record.idProperty || 'svr_iid';
        var currentId = record.get(idProp);
        if (Ext.isEmpty(currentId) || (Ext.isString(currentId) && isNaN(parseInt(currentId, 10)))) {
            currentId = 0;
        } else if (Ext.isString(currentId)) {
            currentId = parseInt(currentId, 10);
        }

        record.set(idProp, currentId);
        record.set('Id', currentId);
        record.id = currentId;
        if (record.data) {
            record.data[idProp] = currentId;
            record.data.Id = currentId;
        }
        record.phantom = currentId === 0;

        if (Ext.isEmpty(record.get('svr_cName')) && !Ext.isEmpty(record.get('Name'))) {
            record.set('svr_cName', record.get('Name'));
        }
        if (!Ext.isEmpty(record.get('svr_cName'))) {
            // Persistimos siempre el nombre sanitizado.
            record.set('svr_cName', Ext.String.trim(record.get('svr_cName')));
        }

        var parallelValue = record.get('svr_iParallel');
        if (Ext.isBoolean(parallelValue)) {
            record.set('svr_iParallel', parallelValue ? 1 : 0);
        }

        var cuentaId = cuentaField ? cuentaField.getValue() : view.cuentaId;
        if (cuentaId) {
            record.set('svr_iCuentaId', cuentaId);
        }

        var model = this.getSVRoutesModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });

        if (!form.isValid()) {
            // Evitamos hacer round-trip si faltan datos requeridos.
            notifyError('Complete los campos requeridos.');
            return;
        }

        var me = this;
        view.setLoading(true);
        record.save({
            scope: this,
            success: function(savedRecord, operation) {
                view.setLoading(false);
                if (!operation.success) {
                    notifyError('No se pudo guardar el plan de control.');
                    return;
                }

                var container = view.up('svroutesview');
                if (container) {
                    container.setRecord(savedRecord);
                    container.fireEvent('routesaved', container, savedRecord);
                } else {
                    view.setRecord(savedRecord);
                    view.fireEvent('routesaved', view, savedRecord);
                }

                var gridCaller = container ? container.caller : view.caller;
                if (gridCaller) {
                    gridCaller.fireEvent('objectchanged', gridCaller, savedRecord);
                }

                notify('Plan de control guardado correctamente.');
                me.updateDeleteButton(view, savedRecord);
            },
            failure: function() {
                view.setLoading(false);
                notifyError('No se pudo guardar el plan de control.');
            }
        });
    },

    /**
     * Re-evalua el boton de eliminacion cuando cambia el registro activo.
     * @param {Common.view.SVRoutesFormView} view
     * @param {Common.model.SVRoutesModel} record
     */
    onRouteChange: function(view, record) {
        this.updateDeleteButton(view, record);
        this.bindDependencyStores(view);
    },

    // Habilita/oculta el botón de eliminar según el estado del registro y sus dependencias.
    updateDeleteButton: function(view, record) {
        var button = view.down('#deleteRouteBtn');
        if (!button) {
            return;
        }
        record = record || (view.getForm ? view.getForm().getRecord() : null);
        var routeId = record && record.get ? record.get('svr_iid') : (record ? record.svr_iid : null);
        routeId = Ext.Number.from(routeId, 0);
        if (!routeId) {
            button.setHidden(true);
            button.setDisabled(true);
            return;
        }
        button.setHidden(false);
        button.setDisabled(true);
        button.setTooltip('Verificando dependencias...');

        var me = this;
        this.evaluateDependencies(view, function(info) {
            if (!button || button.destroyed) {
                return;
            }
            if (info.loading) {
                button.setDisabled(true);
                button.setTooltip('Cargando configuraciones asociadas. Intente nuevamente en unos instantes.');
                if (view && !view.destroyed) {
                    if (!view._dependencyRecheckTask) {
                        view._dependencyRecheckTask = new Ext.util.DelayedTask(function() {
                            if (view.destroyed) {
                                return;
                            }
                            me.updateDeleteButton(view);
                        }, me);
                    }
                    view._dependencyRecheckTask.delay(250);
                }
                return;
            }

            if (info.count > 0) {
                button.setDisabled(true);
                button.setTooltip(me.buildDependencyMessage(info.details));
                return;
            }

            if (view && view._dependencyRecheckTask) {
                view._dependencyRecheckTask.cancel();
            }

            button.setDisabled(false);
            button.setTooltip('Eliminar plan de control');
        });
    },

    bindDependencyStores: function(view) {
        if (!view || view.destroyed) {
            return;
        }
        var container = view.up('svroutesview');
        if (!container) {
            return;
        }

        this.unbindDependencyStores(view);

        var grids = [
            container.down('#analysisPointsGrid'),
            container.down('#programsGrid')
        ];
        var me = this;
        view._dependencyBindings = [];

        var attachStore = function(grid) {
            if (!grid || grid.destroyed) {
                return;
            }
            var store = grid.getStore ? grid.getStore() : null;
            if (!store) {
                grid.on('storechange', function(_, newStore) {
                    if (newStore) {
                        me.bindDependencyStores(view);
                    }
                }, me, { single: true });
                grid.on('afterrender', function(renderedGrid) {
                    var renderedStore = renderedGrid.getStore ? renderedGrid.getStore() : null;
                    if (renderedStore) {
                        me.bindDependencyStores(view);
                    }
                }, me, { single: true });
                return;
            }

            var handler = function() {
                me.updateDeleteButton(view);
            };
            var events = ['load', 'write', 'datachanged', 'remove', 'update', 'refresh'];
            Ext.Array.each(events, function(evt) {
                store.on(evt, handler, me);
            });

            view._dependencyBindings.push({
                store: store,
                handler: handler,
                events: events
            });
        };

        Ext.Array.each(grids, attachStore);

        if (!view._dependencyDestroyBound) {
            view._dependencyDestroyBound = true;
            view.on('destroy', function(component) {
                me.unbindDependencyStores(component);
                if (component._dependencyRecheckTask) {
                    component._dependencyRecheckTask.cancel();
                    component._dependencyRecheckTask = null;
                }
            }, me, { single: true });
        }
    },

    unbindDependencyStores: function(view) {
        if (!view || !view._dependencyBindings) {
            return;
        }

        var bindings = view._dependencyBindings;
        var me = this;
        Ext.Array.each(bindings, function(binding) {
            if (!binding || !binding.store || !binding.handler || !binding.events) {
                return;
            }
            Ext.Array.each(binding.events, function(evt) {
                binding.store.un(evt, binding.handler, me);
            });
        });
        view._dependencyBindings = [];
    },

    /**
     * Evalua los stores dependientes (puntos y programas) para conocer su estado.
     * Llama al callback con `{ loading: bool, count: number }`.
     * @param {Common.view.SVRoutesFormView} view
     * @param {Function} callback
     */
    evaluateDependencies: function(view, callback) {
        var container = view.up('svroutesview');
        if (!container) {
            callback({
                loading: false,
                count: 0,
                details: {
                    analysis: 0,
                    programs: 0
                }
            });
            return;
        }

        var dependencies = [{
            key: 'analysis',
            grid: container.down('#analysisPointsGrid')
        }, {
            key: 'programs',
            grid: container.down('#programsGrid')
        }];
        var me = this;
        var pending = 0;
        var summary = {
            analysis: 0,
            programs: 0
        };
        var hasAsync = false;
        var resolved = false;

        var finalize = function() {
            if (resolved) {
                return;
            }
            resolved = true;
            callback({
                loading: false,
                count: summary.analysis + summary.programs,
                details: summary
            });
        };

        Ext.Array.each(dependencies, function(dep) {
            var grid = dep.grid;
            var store = grid && grid.getStore ? grid.getStore() : null;
            if (!store || store.destroyed) {
                summary[dep.key] = 0;
                return;
            }

            pending += 1;

            var consumeStore = function() {
                var total = me.getStoreTotal(store);
                summary[dep.key] = Ext.Number.from(total, 0);
                pending -= 1;
                if (pending === 0) {
                    finalize();
                }
            };

            if (store.isLoading && store.isLoading()) {
                hasAsync = true;
                var handler = function() {
                    store.un('load', handler, me);
                    consumeStore();
                };
                store.on('load', handler, me);
                if (!store.isLoading()) {
                    handler();
                }
                return;
            }

            var currentTotal = me.getStoreTotal(store);
            if (currentTotal === null) {
                hasAsync = true;
                var loader = function() {
                    store.un('load', loader, me);
                    consumeStore();
                };
                store.on('load', loader, me);
                store.load();
                return;
            }

            consumeStore();
        });

        if (pending === 0) {
            finalize();
        } else if (hasAsync && !resolved) {
            callback({
                loading: true,
                count: summary.analysis + summary.programs,
                details: summary
            });
        }
    },

    /**
     * Genera el mensaje mostrado cuando existen dependencias activas.
     * @param {Object} details
     * @return {String}
     */
    buildDependencyMessage: function(details) {
        var info = details || {};
        var parts = [];
        var analysisCount = Ext.Number.from(info.analysis, 0);
        var programCount = Ext.Number.from(info.programs, 0);

        if (analysisCount > 0) {
            parts.push(analysisCount === 1 ? 'la configuracion de camaras asociada' : 'las configuraciones de camaras asociadas');
        }

        if (programCount > 0) {
            parts.push(programCount === 1 ? 'la programacion SofIA asociada' : 'las programaciones SofIA asociadas');
        }

        if (!parts.length) {
            return 'Elimine las configuraciones de camaras y programaciones asociadas antes de eliminar el plan.';
        }

        if (parts.length === 1) {
            return 'Elimine ' + parts[0] + ' antes de eliminar el plan.';
        }

        var last = parts.pop();
        return 'Elimine ' + parts.join(', ') + ' y ' + last + ' antes de eliminar el plan.';
    },

    /**
     * Determina la cantidad de registros para un store; devuelve null si aun no se conoce.
     * @param {Ext.data.Store} store
     * @return {Number|null}
     */
    getStoreTotal: function(store) {
        if (!store) {
            return 0;
        }
        if (Ext.isFunction(store.isLoaded) && !store.isLoaded()) {
            return null;
        }
        if (store.totalCount !== undefined && store.totalCount !== null) {
            return Ext.Number.from(store.totalCount, 0);
        }
        if (Ext.isFunction(store.getTotalCount)) {
            var total = store.getTotalCount();
            if (Ext.isNumber(total)) {
                return total;
            }
        }
        if (Ext.isFunction(store.getCount)) {
            var count = store.getCount();
            if (Ext.isNumber(count) && count > 0) {
                return count;
            }
            if (count === 0) {
                return 0;
            }
        }
        return null;
    },

    /**
     * Maneja el flujo de eliminacion del plan de control una vez validadas las dependencias.
     * @param {Ext.button.Button} button
     */
    onDeleteClick: function(button) {
        var view = button.up('svroutesformview');
        if (!view) {
            return;
        }
        var form = view.getForm();
        var record = form ? form.getRecord() : null;
        var routeId = record && record.get ? record.get('svr_iid') : (record ? record.svr_iid : null);
        routeId = Ext.Number.from(routeId, 0);
        if (!routeId) {
            notifyError('Debe guardar el plan antes de eliminarlo.');
            return;
        }

        var me = this;
        view.setLoading('Verificando dependencias...');
        this.evaluateDependencies(view, function(info) {
            if (info.loading) {
                return;
            }

            view.setLoading(false);

            if (info.count > 0) {
                notifyError(me.buildDependencyMessage(info.details));
                return;
            }

            // Confirmacion final antes de enviar el DELETE.
            Ext.Msg.confirm('Eliminar plan de control', '¿Desea eliminar este plan de control?', function(choice) {
                if (choice !== 'yes') {
                    return;
                }
                var Model = me.getSVRoutesModelModel();
                var modelInstance = Model.create({ svr_iid: routeId });
                modelInstance.setConfig({ proxy: Model.getProxy() });
                view.setLoading(true);
                modelInstance.erase({
                    scope: me,
                    success: function() {
                        view.setLoading(false);
                        notify('Plan de control eliminado correctamente.');
                        var container = view.up('svroutesview');
                        var gridCaller = container ? container.caller : view.caller;
                        if (gridCaller) {
                            var store = gridCaller.getStore ? gridCaller.getStore() : null;
                            if (store && store.reload) {
                                store.reload();
                            }
                            gridCaller.fireEvent('objectchanged', gridCaller, null);
                        }
                        if (container && container.close) {
                            container.close();
                        } else {
                            var tab = view.up('panel');
                            if (tab && tab.close) {
                                tab.close();
                            }
                        }
                    },
                    failure: function(modelInstance, operation) {
                        view.setLoading(false);
                        var message = 'No se pudo eliminar el plan de control.';
                        var response = operation && operation.getResponse ? operation.getResponse() : null;
                        if (response && response.responseText) {
                            try {
                                var payload = Ext.decode(response.responseText);
                                if (payload && payload.message) {
                                    message = payload.message;
                                }
                            } catch (err) {
                                // Ignore JSON parse issues; fallback to default message.
                            }
                        }
                        if (!message || message === true) {
                            message = me.buildDependencyMessage({
                                analysis: 1,
                                programs: 1
                            });
                        }
                        notifyError(message);
                    }
                });
            });
        });
    }
});

// MIGRADO2024
// Controller for the SofIA route analysis point editor. Handles form wiring,
// camera selector integration, and persistence of point configuration.
Ext.define('Common.controller.SVRouteAnalysisPointFormController', {
    extend: 'Ext.app.Controller',
    models: ['SVRouteAnalysisPointModel'],
    views: ['SVRouteAnalysisPointFormView'],

    /**
     * Wires up events for the form, selector widgets, and toolbar buttons.
     */
    init: function() {
        this.control({
            'svrouteanalysispointformview': {
                beforerender: this.onInitView,
                recordloaded: this.onRecordLoaded
            },
            'svrouteanalysispointformview button[action=save]': {
                click: this.onSaveClick
            },
            'svrouteanalysispointformview #cameraSelector': {
                changeRecord: this.onCameraRecordSelected,
                itemSelected: this.onCameraRecordSelected
            },
            'svrouteanalysispointformview #cameraSelector button#evento': {
                click: this.onCameraSelectorTrigger
            }
        });
    },

    /**
     * Ensures the form has a working record and syncs context (route and account).
     * @param {Common.view.SVRouteAnalysisPointFormView} view
     */
    onInitView: function(view) {
        var record = view.record;
        if (!record) {
            // Build a phantom record so bindings and validation work before save.
            var Model = this.getSVRouteAnalysisPointModelModel();
            record = Model.create({
                sra_iid: 0,
                sra_iRouteId: view.routeId || 0,
                sra_iAnalysisPointId: 0,
                sra_iOrder: view.pointOrder || 0,
                sra_cReference: '',
                sra_cCameraType: '',
                sra_iCameraRefId: null,
                sra_cConfig: '',
                Name: ''
            });
            view.setRecord(record);
        }

        var routeId = this.resolveRouteId(view, record);
        if (routeId) {
            routeId = Ext.Number.from(routeId, 0);
            view.routeId = routeId;
            var routeField = view.down('hiddenfield[name=sra_iRouteId]');
            if (routeField && routeField.getValue() !== routeId) {
                routeField.setValue(routeId);
            }
            if (record && record.set) {
                record.set('sra_iRouteId', routeId);
            }
        }

        var cuentaId = this.resolveCuentaId(view);
        if (cuentaId) {
            view.cuentaId = cuentaId;
        }

        view.setRecord(record);
    },

    /**
     * Configures the camera selector with account filters and current selection.
     * @param {Common.view.SVRouteAnalysisPointFormView} view
     * @param {Ext.data.Model} record
     * @param {Number} cuentaId
     */
    configureCameraSelector: function(view, record, cuentaId) {
        var selector = view.down('#cameraSelector');
        if (!selector) {
            return;
        }

        var resolvedRecord = record || (view ? view.record : null);
        var resolvedCuentaId = Ext.Number.from(cuentaId, 0);
        if (!resolvedCuentaId) {
            resolvedCuentaId = Ext.Number.from(this.resolveCuentaId(view), 0);
        }
        if (resolvedCuentaId) {
            view.cuentaId = resolvedCuentaId;
        }
        this.applyCameraSelectorFilter(selector, resolvedCuentaId);

        var currentCameraId = resolvedRecord && resolvedRecord.get ? resolvedRecord.get('sra_iCameraRefId') : (resolvedRecord ? resolvedRecord.sra_iCameraRefId : null);
        currentCameraId = Ext.Number.from(currentCameraId, 0);
        if (currentCameraId <= 0) {
            currentCameraId = null;
        }
        if (selector.log) {
            selector.log('configureCameraSelector', { routeId: view.routeId || null, cuentaId: resolvedCuentaId, cameraId: currentCameraId });
        }
        var displayName = this.resolveCameraDisplayName(resolvedRecord);
        var displayText = this.buildCameraDisplay(displayName);
        if (!currentCameraId) {
            selector.setValue('');
        }
        this.updateSelectorSummary(selector, currentCameraId, displayText);
    },
    /**
     * Applies account-based filters to the camera selector component.
     * @param {Ext.Component} selector
     * @param {Number} cuentaId
     * @return {Array}
     */
    applyCameraSelectorFilter: function(selector, cuentaId) {
        if (!selector) {
            return [];
        }

        var resolved = Ext.Number.from(cuentaId, 0);
        var filters = [];
        if (resolved) {
            filters.push({
                property: 'cue_iid',
                value: resolved
            });
            filters.push({
                property: 'iidCuenta',
                value: resolved
            });
        }
        var cloned = Ext.Array.clone(filters);
        selector.filter = cloned;
        selector.config = selector.config || {};
        // Also set on config so the selector can rebuild proxy requests consistently.
        selector.config.filter = Ext.Array.clone(cloned);
        selector.cuentaId = resolved || null;
        return cloned;
    },


    /**
     * Normalizes selector responses (model or plain object) into raw data.
     * @param {Ext.data.Model|Object} selection
     * @return {Object|null}
     */
    extractRecordData: function(selection) {
        if (!selection) {
            return null;
        }
        if (selection.isModel) {
            return selection;
        }
        if (selection.items && selection.items.length) {
            return selection.items[0];
        }
        if (Ext.isArray(selection) && selection.length) {
            return selection[0];
        }
        if (selection.data) {
            return selection.data;
        }
        return selection;
    },

    /**
     * Reads a field value from Ext models or plain objects.
     * @param {Ext.data.Model|Object} record
     * @param {String} field
     * @return {*}
     */
    getFieldValue: function(record, field) {
        if (!record) {
            return null;
        }
        if (Ext.isFunction(record.get)) {
            return record.get(field);
        }
        if (!Ext.isEmpty(record[field])) {
            return record[field];
        }
        if (record.data && !Ext.isEmpty(record.data[field])) {
            return record.data[field];
        }
        return null;
    },

    /**
     * Determines the active route id from the view, bound record, or caller.
     * @param {Ext.Component} view
     * @param {Ext.data.Model} record
     * @return {Number|null}
     */
    resolveRouteId: function(view, record) {
        var routeId = 0;
        if (view && view.routeId) {
            routeId = view.routeId;
        }
        record = record || (view ? view.record : null);
        if (!routeId && record) {
            if (record.get) {
                routeId = record.get('sra_iRouteId') || record.get('svr_iid') || 0;
            } else {
                routeId = record.sra_iRouteId || record.svr_iid || 0;
            }
        }
        if (!routeId && view && view.caller) {
            var caller = view.caller;
            if (caller.routeId) {
                routeId = caller.routeId;
            }
            var callerRecord = caller.routeRecord || caller.record || null;
            if (!routeId && callerRecord) {
                if (callerRecord.get) {
                    routeId = callerRecord.get('svr_iid') || callerRecord.get('sra_iRouteId') || 0;
                } else {
                    routeId = callerRecord.svr_iid || callerRecord.sra_iRouteId || 0;
                }
            }
        }
        return Ext.Number.from(routeId, 0);
    },

    /**
     * Returns the associated account id from the view hierarchy.
     * @param {Ext.Component} view
     * @return {Number|null}
     */
    resolveCuentaId: function(view) {
        if (!view) {
            return 0;
        }
        var cuentaId = view.cuentaId || 0;
        if (!cuentaId) {
            var record = view.record || view.routeRecord || view.cuentaRecord || null;
            if (record) {
                if (record.get) {
                    cuentaId = record.get('svr_iCuentaId') || record.get('cue_iid') || record.get('CuentaId') || 0;
                } else {
                    cuentaId = record.svr_iCuentaId || record.cue_iid || record.CuentaId || 0;
                }
            }
        }
        return Ext.Number.from(cuentaId || 0, 0);
    },

    /**
     * Populates dependent UI pieces after a record is loaded into the form.
     * @param {Common.view.SVRouteAnalysisPointFormView} view
     * @param {Ext.data.Model} record
     */
    onRecordLoaded: function(view, record) {
        var resolvedCuentaId = this.resolveCuentaId(view);
        resolvedCuentaId = Ext.Number.from(resolvedCuentaId, 0);
        if (resolvedCuentaId) {
            view.cuentaId = resolvedCuentaId;
        }
        // Keep dropdowns in sync with the freshly loaded record and account.
        this.configureCameraSelector(view, record, resolvedCuentaId || view.cuentaId || 0);
        this.ensurePanelHelperData(view, record);
        this.updateMotionZoneSnapshot(view, record);
    },

    /**
     * Opens the camera selector dialog when the trigger button is pressed.
     * @param {Ext.button.Button} button
     */
    onCameraSelectorTrigger: function(button) {
        var view = button.up('svrouteanalysispointformview');
        if (!view) {
            return;
        }
        var selector = view.down('#cameraSelector');
        if (!selector) {
            return;
        }
        var resolvedCuentaId = this.resolveCuentaId(view);
        if (resolvedCuentaId) {
            view.cuentaId = resolvedCuentaId;
        }
        this.applyCameraSelectorFilter(selector, resolvedCuentaId);
    },

    /**
     * Builds the summary string shown on the selector button.
     * @param {String} name
     * @param {String} type
     * @param {Number} id
     * @return {String}
     */
    buildCameraDisplay: function(name) {
        if (!Ext.isEmpty(name)) {
            return Ext.String.trim(name);
        }
        return '';
    },

    /**
     * Writes the selected camera information back to the selector widget.
     * @param {Ext.Component} selector
     * @param {Number|null} cameraId
     * @param {String} displayText
     */
    updateSelectorSummary: function(selector, cameraId, displayText) {
        if (!selector) {
            return;
        }
        var deleteButton = selector.down('#deleteEvent');
        var numericId = Ext.Number.from(cameraId, 0);
        var hasId = numericId > 0;
        if (deleteButton) {
            deleteButton.setVisible(hasId);
        }
        var codeField = selector.down('#codevento');
        if (codeField) {
            codeField.setValue(hasId ? numericId : '');
        }
        var grid = selector.down('#gridname');
        if (grid) {
            var gridStore = grid.getStore ? grid.getStore() : null;
            if (gridStore) {
                gridStore.removeAll();
                if (!Ext.isEmpty(displayText)) {
                    var modelCtor = Ext.ClassManager.get('Common.model.selecterModel');
                    if (modelCtor && modelCtor.create) {
                        gridStore.add(modelCtor.create({ name: displayText }));
                    } else {
                        gridStore.add({ name: displayText });
                    }
                }
            }
        }
        if (selector.log) {
            selector.log('updateSelectorSummary', { cameraId: cameraId, display: displayText });
        }
    },

    /**
     * Synchronizes camera details when a value is chosen from the selector.
     * @param {Ext.Component} field
     * @param {Ext.data.Model|Object} selection
     */
    onCameraRecordSelected: function(field, selection) {
        var view = field.up('svrouteanalysispointformview');
        if (!view) {
            return;
        }

        // Selector may emit either Ext models or plain objects, normalize once.
        var record = this.extractRecordData(selection);
        var cameraIdField = view.down('#cameraIdField');
        var cameraTypeField = view.down('#cameraTypeField');
        var summaryField = view.down('#cameraSummary');
        var nameField = view.down('textfield[name=sra_cReference]');

        if (!record) {
            if (cameraIdField) {
                cameraIdField.setValue(null);
            }
            if (cameraTypeField) {
                cameraTypeField.setValue('');
            }
            if (summaryField) {
                summaryField.setValue('Sin seleccionar');
            }
            this.persistCameraHelperData(view, null, null, null, null, null);
            return;
        }

        var cameraId = this.getFieldValue(record, 'id');
        if (Ext.isEmpty(cameraId)) {
            cameraId = this.getFieldValue(record, 'video_id');
        }
        cameraId = Ext.Number.from(cameraId, 0);
        if (cameraId <= 0) {
            cameraId = null;
        }
        var cameraType = this.normalizeCameraType(this.getFieldValue(record, 'source'));
        var cameraName = this.getFieldValue(record, 'nombre');
        var cameraZone = this.getFieldValue(record, 'czona');
        if (!Ext.isEmpty(cameraZone)) {
            cameraZone = Ext.String.trim(cameraZone);
        }
        var cameraZone = this.getFieldValue(record, 'czona');

        if (cameraIdField) {
            cameraIdField.setValue(cameraId || null);
        }
        if (cameraTypeField) {
            cameraTypeField.setValue(cameraType || '');
        }
        if (summaryField) {
            var summaryText = this.formatCameraDisplay(cameraName, cameraZone, cameraType);
            summaryField.setValue(summaryText || 'Sin seleccionar');
        }
        // Auto-fill the reference when the form is still blank to speed up setup.
        if (nameField && !Ext.String.trim(nameField.getValue()) && cameraName) {
            nameField.setValue(cameraName);
        }

        this.updateMotionZoneSnapshot(view, record, true);
        this.persistCameraHelperData(view, record, cameraId, cameraType, cameraName, cameraZone);
    },

    /**
     * Validates and persists the analysis point, normalizing required fields.
     * @param {Ext.button.Button} button
     */
    onSaveClick: function(button) {
        var view = button.up('svrouteanalysispointformview');
        if (!view) {
            return;
        }

        var form = view.getForm();
        var record = form.getRecord();
        if (!record) {
            var Model = this.getSVRouteAnalysisPointModelModel();
            record = Model.create({
                sra_iid: 0,
                sra_iRouteId: this.resolveRouteId(view),
                sra_iAnalysisPointId: 0,
                sra_iOrder: 0,
                sra_cReference: '',
                sra_cCameraType: '',
                sra_iCameraRefId: 0,
                sra_cConfig: '',
                Name: ''
            });
            view.setRecord(record);
        }

        var routeId = this.resolveRouteId(view, record);
        if (!routeId) {
            notifyError('No se pudo determinar la ruta asociada.');
            return;
        }

        var routeField = form.findField('sra_iRouteId');
        if (routeField && !routeField.getValue()) {
            routeField.setValue(routeId);
        }
        if (record && record.set) {
            record.set('sra_iRouteId', routeId);
        }

        var configPanel = view.down('#cameraConfigPanel');
        var configField = form.findField('sra_cConfig');
        if (configPanel && configField) {
            var configValue = configPanel.getValue() || {};
            // Persist motion zone settings as encoded JSON alongside the form.
            configField.setValue(Ext.encode(configValue));
        }

        var cameraIdField = form.findField('sra_iCameraRefId');
        if (cameraIdField && !cameraIdField.getValue()) {
            notifyError('Seleccione una camara SofIA.');
            return;
        }

        if (!form.isValid()) {
            notifyError('Complete los campos requeridos.');
            return;
        }

        form.updateRecord(record);

        var referenceValue = record.get ? record.get('sra_cReference') : null;
        if (!Ext.isEmpty(referenceValue)) {
            var trimmedReference = Ext.String.trim(referenceValue);
            record.set('sra_cReference', trimmedReference);
            record.set('Name', trimmedReference);
        } else {
            record.set('Name', '');
        }

        var cameraTypeValue = record.get ? record.get('sra_cCameraType') : null;
        if (!Ext.isEmpty(cameraTypeValue)) {
            record.set('sra_cCameraType', Ext.String.trim(cameraTypeValue));
        }

        var idProp = record.idProperty || 'sra_iid';
        var currentId = record.get(idProp);
        if (Ext.isEmpty(currentId) || (Ext.isString(currentId) && isNaN(parseInt(currentId, 10)))) {
            currentId = 0;
        } else if (Ext.isString(currentId)) {
            currentId = parseInt(currentId, 10);
        }
        record.set(idProp, currentId);
        record.id = currentId;
        if (record.data) {
            record.data[idProp] = currentId;
        }
        record.phantom = currentId === 0;

        var ModelCtor = this.getSVRouteAnalysisPointModelModel();
        record.setConfig({
            proxy: ModelCtor.getProxy()
        });

        view.setLoading(true);
        record.save({
            scope: this,
            success: function(savedRecord, operation) {
                view.setLoading(false);
                if (!operation || operation.success !== true) {
                    notifyError('No se pudo guardar la configuracion de camara.');
                    return;
                }

                var window = view.up('svrouteanalysispointwindow');
                if (window) {
                    window.setRecord(savedRecord);
                } else {
                    view.setRecord(savedRecord);
                }

                var caller = (window && window.caller) || view.caller;
                if (caller) {
                    var store = caller.getStore ? caller.getStore() : null;
                    if (store && store.reload) {
                        store.reload();
                    }
                    caller.fireEvent('objectchanged', caller, savedRecord);
                }

                notify('Configuracion de camara guardada correctamente.');

                if (window) {
                    window.close();
                }
            },
            failure: function() {
                view.setLoading(false);
                notifyError('No se pudo guardar la configuracion de camara.');
            }
        });
    },

    /**
     * Finds a usable snapshot URL within the selected camera record.
     * @param {Ext.data.Model|Object} record
     * @return {String|null}
     */
    resolveCameraSnapshot: function(record) {
        if (!record) {
            return null;
        }
        var candidates = [
            'snapshotUrl',
            'snapshot_url',
            'snapshot',
            'poster',
            'posterUrl',
            'poster_url',
            'image',
            'imageUrl',
            'image_url',
            'thumbnail',
            'thumbnailUrl',
            'thumbnail_url'
        ];
        for (var i = 0; i < candidates.length; i++) {
            var value = this.getFieldValue(record, candidates[i]);
            if (!Ext.isEmpty(value)) {
                return value;
            }
        }
        return null;
    },

    /**
     * Refreshes the motion zone component with the selected camera snapshot.
     * @param {Common.view.SVRouteAnalysisPointFormView} view
     * @param {Ext.data.Model|Object} record
     * @param {Boolean} allowEmpty
     */
    updateMotionZoneSnapshot: function(view, record, allowEmpty) {
        if (!view) {
            return;
        }
        var panel = view.down('#cameraConfigPanel');
        if (!panel || !panel.setMotionZoneSnapshot) {
            return;
        }
        var snapshot = this.resolveCameraSnapshot(record);
        if (Ext.isEmpty(snapshot) && panel.buildSnapshotUrl) {
            var fallback = panel.buildSnapshotUrl();
            if (!Ext.isEmpty(fallback)) {
                snapshot = fallback;
            }
        }
        if (!Ext.isEmpty(snapshot)) {
            panel.setMotionZoneSnapshot(snapshot);
        } else if (allowEmpty === true) {
            panel.setMotionZoneSnapshot(null);
        }
    },

    /**
     * Stores metadata (name, zone, type) about the selected camera inside the config helper data.
     * @param {Common.view.SVRouteAnalysisPointFormView} view
     * @param {Ext.data.Model|Object|null} record
     * @param {Number|null} cameraId
     * @param {String} cameraType
     * @param {String} cameraName
     */
    persistCameraHelperData: function(view, record, cameraId, cameraType, cameraName, cameraZone) {
        var panel = view ? view.down('#cameraConfigPanel') : null;
        if (!panel) {
            return;
        }
        if (!record || !cameraId) {
            panel.setHelperData(null);
            return;
        }
        var helperData = panel.getHelperData() || {};
        helperData.cameraId = cameraId || null;
        helperData.cameraType = cameraType || '';
        helperData.cameraName = cameraName ? Ext.String.trim(cameraName) : '';
        var zoneCode = Ext.isEmpty(cameraZone) ? this.getFieldValue(record, 'czona') : cameraZone;
        if (!Ext.isEmpty(zoneCode)) {
            helperData.cameraZone = Ext.String.trim(zoneCode);
        } else {
            delete helperData.cameraZone;
        }
        helperData.displayName = this.formatCameraDisplay(helperData.cameraName, helperData.cameraZone, helperData.cameraType);
        panel.setHelperData(helperData);
    },

    /**
     * Extracts helper metadata from the persisted config JSON.
     * @param {Ext.data.Model|Object} record
     * @return {Object|null}
     */
    getHelperDataFromRecord: function(record) {
        if (!record) {
            return null;
        }
        var rawConfig = this.getFieldValue(record, 'sra_cConfig');
        if (Ext.isObject(rawConfig) && rawConfig.helperData) {
            return rawConfig.helperData;
        }
        if (Ext.isString(rawConfig) && rawConfig.length) {
            try {
                var parsed = Ext.decode(rawConfig);
                return parsed && parsed.helperData ? parsed.helperData : null;
            } catch (err) {
                return null;
            }
        }
        return null;
    },

    /**
     * Resolves the display name for the selected camera, prioritizing helper metadata.
     * @param {Ext.data.Model|Object} record
     * @return {String}
     */
    resolveCameraDisplayName: function(record) {
        var helperData = this.getHelperDataFromRecord(record);
        if (helperData) {
            if (!Ext.isEmpty(helperData.displayName)) {
                return helperData.displayName;
            }
            if (!Ext.isEmpty(helperData.cameraName)) {
                return this.formatCameraDisplay(helperData.cameraName, helperData.cameraZone, helperData.cameraType);
            }
        }
        return this.getFieldValue(record, 'sra_cReference') || this.getFieldValue(record, 'Name') || '';
    },

    /**
     * Formats the camera display name, adding zone information only for link (CVL) sources.
     * @param {String} cameraName
     * @param {String} cameraZone
     * @param {String} cameraType
     * @return {String}
     */
    formatCameraDisplay: function(cameraName, cameraZone, cameraType) {
        var name = Ext.String.trim(cameraName || '');
        var zone = Ext.String.trim(cameraZone || '');
        if (name && zone && this.isLinkCameraType(cameraType)) {
            return '(' + zone + ') ' + name;
        }
        return name;
    },

    /**
     * Normalizes the camera type label for downstream comparisons.
     * @param {String} rawType
     * @return {String}
     */
    normalizeCameraType: function(rawType) {
        var type = Ext.String.trim(rawType || '');
        if (!type) {
            return '';
        }
        var upper = type.toUpperCase();
        if (upper === 'CUENTAS_VIDEO_LINKS') {
            return 'CVL';
        }
        return type;
    },

    /**
     * Determines if the given camera type represents a link camera.
     * @param {String} cameraType
     * @return {Boolean}
     */
    isLinkCameraType: function(cameraType) {
        var type = Ext.String.trim(cameraType || '').toUpperCase();
        return type === 'CVL' || type === 'CUENTAS_VIDEO_LINKS';
    },

    ensurePanelHelperData: function(view, record) {
        if (!view) {
            return;
        }
        var panel = view.down('#cameraConfigPanel');
        if (!panel || !panel.setHelperData) {
            return;
        }
        var helperData = panel.getHelperData ? panel.getHelperData() : null;
        var cameraId = Ext.Number.from(this.getFieldValue(record, 'sra_iCameraRefId'), 0);
        if (!cameraId) {
            return;
        }
        if (helperData && Ext.Number.from(helperData.cameraId, 0) === cameraId) {
            return;
        }
        helperData = helperData || {};
        helperData.cameraId = cameraId;
        helperData.cameraType = this.normalizeCameraType(
            this.getFieldValue(record, 'sra_cCameraType') || helperData.cameraType || ''
        );
        if (Ext.isEmpty(helperData.cameraName)) {
            helperData.cameraName = this.resolveCameraDisplayName(record);
        }
        panel.setHelperData(helperData);
    }
});

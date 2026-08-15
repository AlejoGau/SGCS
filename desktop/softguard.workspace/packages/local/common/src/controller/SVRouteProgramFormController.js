// MIGRADO2024
// Controller for the SofIA route program form. Manages schedule configuration
// and keeps hour/minute fields synchronized with the backend API.
Ext.define('Common.controller.SVRouteProgramFormController', {
    extend: 'Ext.app.Controller',
    models: ['SVRouteProgramModel'],
    views: ['SVRouteProgramFormView'],

    /**
     * Register event handlers on the program form view.
     */
    init: function() {
        this.control({
            'svrouteprogramformview': {
                beforerender: this.onInitView,
                recordloaded: this.onRecordLoaded
            },
            'svrouteprogramformview button[action=save]': {
                click: this.onSaveClick
            },
            'svrouteprogramformview #programTypeField': {
                change: this.onProgramTypeChange
            },
            'svrouteprogramformview #startTimeField': {
                change: this.onStartTimeChange
            }
        });
    },

    /**
     * Initialize the form with defaults when no record is provided.
     * @param {Common.view.SVRouteProgramFormView} view
     */
    onInitView: function(view) {
        var record = view.record;
        if (!record) {
            var Model = this.getSVRouteProgramModelModel();
            record = Model.create({
                srp_iRouteId: view.routeId || 0,
                srp_cProgramType: '1',
                srp_iStartHour: 0,
                srp_iStartMinutes: 0,
                srp_iDayOfWeek: 0,
                srp_iDayOfMonth: 1
            });
            view.setRecord(record);
        }
        this.applyProgramTypeUI(view, record.get('srp_cProgramType'));
        this.populateTimeFields(view, record);
    },

    /**
     * Called when an existing record is injected into the form.
     * @param {Common.view.SVRouteProgramFormView} view
     * @param {Common.model.SVRouteProgramModel} record
     */
    onRecordLoaded: function(view, record) {
        this.applyProgramTypeUI(view, record.get('srp_cProgramType'));
        this.populateTimeFields(view, record);
    },

    /**
     * Reacts to type selection updates adjusting dependent fields.
     * @param {Ext.form.field.Field} field
     * @param {String} value
     */
    onProgramTypeChange: function(field, value) {
        var view = field.up('svrouteprogramformview');
        this.applyProgramTypeUI(view, value);
    },

    /**
     * Show/hide optional fields based on the current program type.
     * @param {Common.view.SVRouteProgramFormView} view
     * @param {String} programType
     */
    applyProgramTypeUI: function(view, programType) {
        var dayOfWeekField = view.down('#dayOfWeekField');
        var dayOfMonthField = view.down('#dayOfMonthField');
        programType = programType || '1';
        if (programType === '3') {
            if (dayOfWeekField) { dayOfWeekField.show(); dayOfWeekField.setDisabled(false); }
            if (dayOfMonthField) { dayOfMonthField.hide(); dayOfMonthField.setDisabled(true); }
        } else if (programType === '4') {
            if (dayOfWeekField) { dayOfWeekField.hide(); dayOfWeekField.setDisabled(true); }
            if (dayOfMonthField) { dayOfMonthField.show(); dayOfMonthField.setDisabled(false); }
        } else {
            if (dayOfWeekField) { dayOfWeekField.hide(); dayOfWeekField.setDisabled(true); }
            if (dayOfMonthField) { dayOfMonthField.hide(); dayOfMonthField.setDisabled(true); }
        }
    },

    /**
     * Populates the visible time selector and hidden hour/minute fields.
     * @param {Common.view.SVRouteProgramFormView} view
     * @param {Common.model.SVRouteProgramModel} record
     */
    populateTimeFields: function(view, record) {
        var hour = Ext.Number.from(record ? record.get('srp_iStartHour') : 0, 0);
        var minutes = Ext.Number.from(record ? record.get('srp_iStartMinutes') : 0, 0);
        this.applyTimeToFields(view, hour, minutes, true);
        var dayOfWeekField = view.down('#dayOfWeekField');
        if (dayOfWeekField) {
            dayOfWeekField.setValue(record.get('srp_iDayOfWeek'));
        }
        var dayOfMonthField = view.down('#dayOfMonthField');
        if (dayOfMonthField) {
            dayOfMonthField.setValue(record.get('srp_iDayOfMonth'));
        }
    },

    /**
     * Persists the program changes and notifies parent grids.
     * @param {Ext.button.Button} button
     */
    onSaveClick: function(button) {
        var view = button.up('svrouteprogramformview');
        if (!view) { return; }
        var form = view.getForm();
        if (!form.isValid()) {
            notifyError('Complete los campos requeridos.');
            return;
        }

        var record = form.getRecord();
        if (!record) {
            var Model = this.getSVRouteProgramModelModel();
            record = Model.create();
            view.setRecord(record);
        }

        var window = view.up('svrouteprogramwindow');
        var routeId = view.routeId;
        if (Ext.isEmpty(routeId)) {
            routeId = window ? window.routeId : null;
        }
        if (Ext.isEmpty(routeId) && record) {
            routeId = record.get('srp_iRouteId');
        }
        var routeField = form.findField ? form.findField('srp_iRouteId') : null;
        if (!routeField && view.down) {
            routeField = view.down('hiddenfield[name="srp_iRouteId"]');
        }
        if (routeField && Ext.isFunction(routeField.setValue)) {
            routeField.setValue(Ext.Number.from(routeId, 0));
        }

        this.writeTimeFields(view);
        form.updateRecord(record);
        var programType = record.get('srp_cProgramType');
        var dayOfWeekField = view.down('#dayOfWeekField');
        var dayOfMonthField = view.down('#dayOfMonthField');
        if (programType !== '3' && dayOfWeekField) {
            record.set('srp_iDayOfWeek', 0);
        }
        if (programType !== '4' && dayOfMonthField) {
            record.set('srp_iDayOfMonth', 0);
        }

        this.normalizeNumeric(record, 'srp_iStartHour');
        this.normalizeNumeric(record, 'srp_iStartMinutes');
        this.normalizeNumeric(record, 'srp_iDayOfWeek');
        this.normalizeNumeric(record, 'srp_iDayOfMonth');

        var summary = this.buildSummary(record);
        record.set('Summary', summary);

        var ModelCtor = this.getSVRouteProgramModelModel();
        record.setConfig({ proxy: ModelCtor.getProxy() });

        record.set('srp_iRouteId', Ext.Number.from(routeId, 0));

        view.setLoading(true);
        record.save({
            scope: this,
            success: function(savedRecord, operation) {
                view.setLoading(false);
                if (!operation || operation.success !== true) {
                    notifyError('No se pudo guardar la programacion.');
                    return;
                }

                var container = view.caller || (window ? window.caller : null);
                if (container) {
                    container.fireEvent('objectchanged', container, savedRecord);
                    var store = container.getStore ? container.getStore() : null;
                    if (store && store.reload) {
                        store.reload();
                    }
                }

                notify('Programacion guardada correctamente.');
                if (window) {
                    window.close();
                }
            },
            failure: function() {
                view.setLoading(false);
                notifyError('No se pudo guardar la programacion.');
            }
        });
    },

    /**
     * Coerces numeric fields stored as strings into integers.
     */
    normalizeNumeric: function(record, field) {
        var value = record.get(field);
        if (Ext.isString(value)) {
            var parsed = parseInt(value, 10);
            record.set(field, isNaN(parsed) ? 0 : parsed);
        }
    },

    /**
     * Builds a human readable summary string for list display.
     * @param {Common.model.SVRouteProgramModel} record
     * @return {String}
     */
    buildSummary: function(record) {
        var type = parseInt(record.get('srp_cProgramType'), 10);
        var hour = Ext.util.Format.leftPad(record.get('srp_iStartHour') || 0, 2, '0');
        var minutes = Ext.util.Format.leftPad(record.get('srp_iStartMinutes') || 0, 2, '0');
        var timeText = hour + ':' + minutes;
        if (type === 1) {
            return 'Todos los dias a las ' + timeText;
        }
        if (type === 2) {
            return 'Lunes a viernes a las ' + timeText;
        }
        if (type === 3) {
            var map = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
            var dow = record.get('srp_iDayOfWeek');
            var dowText = map[dow] || 'Dia';
            return 'El ' + dowText + ' a las ' + timeText;
        }
        if (type === 4) {
            var dom = record.get('srp_iDayOfMonth');
            return 'El dia ' + dom + ' de cada mes a las ' + timeText;
        }
        return timeText;
    },

    /**
     * Reacts to manual changes on the time field, syncing hidden inputs.
     */
    onStartTimeChange: function(field, newValue) {
        var view = field.up('svrouteprogramformview');
        if (!view) {
            return;
        }
        var parts = this.resolveTimeParts(newValue, field);
        this.applyTimeToFields(view, parts.hour, parts.minute);
    },

    /**
     * Applies hour/minute values to both hidden fields and the time selector.
     * @param {Common.view.SVRouteProgramFormView} view
     * @param {Number} hour
     * @param {Number} minutes
     * @param {Boolean} fromRecord
     */
    applyTimeToFields: function(view, hour, minutes, fromRecord) {
        hour = Ext.Number.constrain(Ext.Number.from(hour, 0), 0, 23);
        minutes = Ext.Number.constrain(Ext.Number.from(minutes, 0), 0, 59);

        var startHourField = view.down('#startHourField');
        if (startHourField) {
            startHourField.setValue(hour);
        }
        var startMinutesField = view.down('#startMinutesField');
        if (startMinutesField) {
            startMinutesField.setValue(minutes);
        }

        if (fromRecord === true) {
            this.updateTimeFieldValue(view, hour, minutes);
        }
    },

    /**
     * Captures the current time selector value into hidden hour/minute fields.
     * @param {Common.view.SVRouteProgramFormView} view
     */
    /**
     * Captures the current value of the timefield into hour/minute hidden inputs.
     * @param {Common.view.SVRouteProgramFormView} view
     */
    writeTimeFields: function(view) {
        var timeField = view.down('#startTimeField');
        if (!timeField) {
            return;
        }
        var parts = this.resolveTimeParts(timeField.getValue(), timeField);
        var startHourField = view.down('#startHourField');
        if (startHourField) {
            startHourField.setValue(parts.hour);
        }
        var startMinutesField = view.down('#startMinutesField');
        if (startMinutesField) {
            startMinutesField.setValue(parts.minute);
        }
        this.updateTimeFieldValue(view, parts.hour, parts.minute);
    },

    /**
     * Normalizes a time value (string/date) returning hour/minute integers.
     * @param {String|Date} value
     * @param {Ext.form.field.Time} field
     * @return {{hour:Number, minute:Number}}
     */
    /**
     * Normalizes a time (string/date) returning hour/minute integers.
     * @param {String|Date} value
     * @param {Ext.form.field.Time} field
     * @return {{hour:Number, minute:Number}}
     */
    resolveTimeParts: function(value, field) {
        var format = (field && field.format) ? field.format : 'H:i';
        var dateValue = null;
        if (Ext.isDate(value)) {
            dateValue = value;
        } else if (Ext.isString(value)) {
            dateValue = Ext.Date.parse(value, format);
        }
        if (!dateValue) {
            dateValue = this.buildDateFromParts(0, 0);
        }
        return {
            hour: dateValue.getHours(),
            minute: dateValue.getMinutes()
        };
    },

    /**
     * Constructs a Date instance using provided hour/minute components.
     * @param {Number} hour
     * @param {Number} minutes
     * @return {Date}
     */
    /**
     * Constructs a Date using provided hour and minute components.
     * @param {Number} hour
     * @param {Number} minutes
     * @return {Date}
     */
    buildDateFromParts: function(hour, minutes) {
        var date = Ext.Date.clearTime(new Date(), true);
        date.setHours(Ext.Number.from(hour, 0));
        date.setMinutes(Ext.Number.from(minutes, 0));
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    },

    /**
     * Updates the visible time selector without firing extra change events.
     * @param {Common.view.SVRouteProgramFormView} view
     * @param {Number} hour
     * @param {Number} minutes
     */
    /**
     * Updates the visible time selector without triggering additional change events.
     * @param {Common.view.SVRouteProgramFormView} view
     * @param {Number} hour
     * @param {Number} minutes
     */
    updateTimeFieldValue: function(view, hour, minutes) {
        var timeField = view.down('#startTimeField');
        if (!timeField) {
            return;
        }
        if (timeField.blockSync === true) {
            return;
        }
        timeField.blockSync = true;
        timeField.setValue(this.buildDateFromParts(hour, minutes));
        timeField.blockSync = false;
    }
});





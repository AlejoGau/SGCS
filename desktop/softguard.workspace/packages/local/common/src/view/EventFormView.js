Ext.define('Common.view.EventFormView', {
    extend: 'Ext.form.Panel',
    alias: ['widget.eventformview'],
    title: 'Propiedades',
    preventHeader: true,
    layout: 'anchor',
    autoScroll: true,
    bodyPadding: 5,
    fieldDefaults: {
        labelWidth: 120,
        anchor: '100%',
        labelAlign: 'left'
    },
    items: [
        {
            xtype: 'fieldset',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Tipo',
                    name: 'EventType',
                    store: 'EventTypeStore',
                    forceSelection: true,
                    editable: false,
                    displayField: 'Name',
                    valueField: 'Id',
                    queryMode: 'local',
                    listeners: {
                        change: function (combo, newValue) {
                            var form = combo.up('form');
                            var record = form.getRecord && form.getRecord();
                            if (record) {
                                record.set('TypeId', newValue);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    name: 'Name',
                    fieldLabel: 'Nombre',
                    flex: 1,
                    allowBlank: false
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'datefield',
                        name: 'StartDate',
                        fieldLabel: 'Comienzo',
                        itemId: 'startdate',
                        margin: '0 10 0 0',
                        format: 'd/m/Y',
                        submitFormat: 'Y-m-d',
                        listeners: {
                            change: function(field, newvalue, oldvalue, event){
                                var form = field.up('eventformview');
                                if (!form) return;

                                var endDate = form.down('#enddate');
                                var endTime = form.down('#endtime');
                                var startTime = form.down('#starttime');

                                if (!endDate || !endTime || !startTime) return;
                                if (!newvalue || !endDate.getValue() || !endTime.getValue() || !startTime.getValue()) return;

                                // Establecer la fecha mínima para el campo de fecha fin
                                endDate.setMinValue(newvalue);

                                // Validar que la fecha/hora fin no sea anterior a la fecha/hora inicio
                                var startDateObj = Ext.isDate(newvalue) ? newvalue : Ext.Date.parse(newvalue, 'd/m/Y');
                                var startTimeObj = Ext.isDate(startTime.getValue()) ? startTime.getValue() : new Date(startTime.getValue());
                                var fechahoradesde = new Date(
                                    startDateObj.getFullYear(),
                                    startDateObj.getMonth(),
                                    startDateObj.getDate(),
                                    startTimeObj.getHours(),
                                    startTimeObj.getMinutes(),
                                    startTimeObj.getSeconds()
                                );

                                var endDateObj = Ext.isDate(endDate.getValue()) ? endDate.getValue() : Ext.Date.parse(endDate.getValue(), 'd/m/Y');
                                var endTimeObj = Ext.isDate(endTime.getValue()) ? endTime.getValue() : new Date(endTime.getValue());
                                var fechahorahasta = new Date(
                                    endDateObj.getFullYear(),
                                    endDateObj.getMonth(),
                                    endDateObj.getDate(),
                                    endTimeObj.getHours(),
                                    endTimeObj.getMinutes(),
                                    endTimeObj.getSeconds()
                                );

                                if (fechahorahasta < fechahoradesde) {
                                    endDate.markInvalid('La fecha de fin debe ser posterior al inicio');
                                    endTime.markInvalid('La fecha de fin debe ser posterior al inicio');
                                } else {
                                    endDate.clearInvalid();
                                    endTime.clearInvalid();
                                }
                            }
                        }
                    }, {
                        xtype: 'timefield',
                        fieldLabel: 'Hora',
                        itemId: 'starttime',
                        listeners: {
                            change: function(field, newvalue, oldvalue, event){
                                var form = field.up('eventformview');
                                if (!form) return;

                                var startDate = form.down('#startdate');
                                var endDate = form.down('#enddate');
                                var endTime = form.down('#endtime');

                                if (!startDate || !endDate || !endTime) return;
                                if (!newvalue || !startDate.getValue() || !endDate.getValue() || !endTime.getValue()) return;

                                // Validar que la fecha/hora fin no sea anterior a la fecha/hora inicio
                                var startDateObj = Ext.isDate(startDate.getValue()) ? startDate.getValue() : Ext.Date.parse(startDate.getValue(), 'd/m/Y');
                                var startTimeObj = Ext.isDate(newvalue) ? newvalue : new Date(newvalue);
                                var fechahoradesde = new Date(
                                    startDateObj.getFullYear(),
                                    startDateObj.getMonth(),
                                    startDateObj.getDate(),
                                    startTimeObj.getHours(),
                                    startTimeObj.getMinutes(),
                                    startTimeObj.getSeconds()
                                );

                                var endDateObj = Ext.isDate(endDate.getValue()) ? endDate.getValue() : Ext.Date.parse(endDate.getValue(), 'd/m/Y');
                                var endTimeObj = Ext.isDate(endTime.getValue()) ? endTime.getValue() : new Date(endTime.getValue());
                                var fechahorahasta = new Date(
                                    endDateObj.getFullYear(),
                                    endDateObj.getMonth(),
                                    endDateObj.getDate(),
                                    endTimeObj.getHours(),
                                    endTimeObj.getMinutes(),
                                    endTimeObj.getSeconds()
                                );

                                if (fechahorahasta < fechahoradesde) {
                                    endDate.markInvalid('La fecha de fin debe ser posterior al inicio');
                                    endTime.markInvalid('La fecha de fin debe ser posterior al inicio');
                                } else {
                                    endDate.clearInvalid();
                                    endTime.clearInvalid();
                                }
                            }
                        }
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 5 0',
                    items: [{
                        xtype: 'datefield',
                        name: 'EndDate',
                        fieldLabel: 'Fin',
                        itemId: 'enddate',
                        margin: '0 10 0 0',
                        format: 'd/m/Y',
                        submitFormat: 'Y-m-d',
                        validator: function(value) {
                            var form = this.up('eventformview');
                            if (!form) return true;

                            var startDate = form.down('#startdate');
                            var startTime = form.down('#starttime');
                            var endTime = form.down('#endtime');

                            if (!startDate || !startTime || !endTime) return true;

                            var startDateVal = startDate.getValue();
                            var startTimeVal = startTime.getValue();
                            var endTimeVal = endTime.getValue();

                            if (!value || !startDateVal || !startTimeVal || !endTimeVal) return true;

                            // ExtJS ya retorna Date objects, solo necesitamos combinarlos
                            var startDateObj = Ext.isDate(startDateVal) ? startDateVal : Ext.Date.parse(startDateVal, 'd/m/Y');
                            var startTimeObj = Ext.isDate(startTimeVal) ? startTimeVal : new Date(startTimeVal);
                            var endDateObj = Ext.isDate(value) ? value : Ext.Date.parse(value, 'd/m/Y');
                            var endTimeObj = Ext.isDate(endTimeVal) ? endTimeVal : new Date(endTimeVal);

                            var fechahoradesde = new Date(
                                startDateObj.getFullYear(),
                                startDateObj.getMonth(),
                                startDateObj.getDate(),
                                startTimeObj.getHours(),
                                startTimeObj.getMinutes(),
                                startTimeObj.getSeconds()
                            );

                            var fechahorahasta = new Date(
                                endDateObj.getFullYear(),
                                endDateObj.getMonth(),
                                endDateObj.getDate(),
                                endTimeObj.getHours(),
                                endTimeObj.getMinutes(),
                                endTimeObj.getSeconds()
                            );

                            if (fechahorahasta < fechahoradesde) {
                                return 'La fecha de fin debe ser posterior al inicio';
                            }
                            return true;
                        },
                        listeners: {
                            change: function(field, newvalue, oldvalue, event){
                                var form = field.up('eventformview');
                                if (!form) return;

                                var startDate = form.down('#startdate');
                                var startTime = form.down('#starttime');
                                var endTime = form.down('#endtime');

                                if (!startDate || !startTime || !endTime) return;
                                if (!newvalue || !startDate.getValue() || !startTime.getValue() || !endTime.getValue()) return;

                                // Validar que la fecha/hora fin no sea anterior a la fecha/hora inicio
                                var startDateObj = Ext.isDate(startDate.getValue()) ? startDate.getValue() : Ext.Date.parse(startDate.getValue(), 'd/m/Y');
                                var startTimeObj = Ext.isDate(startTime.getValue()) ? startTime.getValue() : new Date(startTime.getValue());
                                var fechahoradesde = new Date(
                                    startDateObj.getFullYear(),
                                    startDateObj.getMonth(),
                                    startDateObj.getDate(),
                                    startTimeObj.getHours(),
                                    startTimeObj.getMinutes(),
                                    startTimeObj.getSeconds()
                                );

                                var endDateObj = Ext.isDate(newvalue) ? newvalue : Ext.Date.parse(newvalue, 'd/m/Y');
                                var endTimeObj = Ext.isDate(endTime.getValue()) ? endTime.getValue() : new Date(endTime.getValue());
                                var fechahorahasta = new Date(
                                    endDateObj.getFullYear(),
                                    endDateObj.getMonth(),
                                    endDateObj.getDate(),
                                    endTimeObj.getHours(),
                                    endTimeObj.getMinutes(),
                                    endTimeObj.getSeconds()
                                );

                                if (fechahorahasta < fechahoradesde) {
                                    field.markInvalid('La fecha de fin debe ser posterior al inicio');
                                    endTime.markInvalid('La fecha de fin debe ser posterior al inicio');
                                } else {
                                    field.clearInvalid();
                                    endTime.clearInvalid();
                                }
                            }
                        }
                    }, {
                        xtype: 'timefield',
                        fieldLabel: 'Hora',
                        itemId: 'endtime',
                        validator: function(value) {
                            var form = this.up('eventformview');
                            if (!form) return true;

                            var startDate = form.down('#startdate');
                            var startTime = form.down('#starttime');
                            var endDate = form.down('#enddate');

                            if (!startDate || !startTime || !endDate) return true;

                            var startDateVal = startDate.getValue();
                            var startTimeVal = startTime.getValue();
                            var endDateVal = endDate.getValue();

                            if (!value || !startDateVal || !startTimeVal || !endDateVal) return true;

                            // ExtJS ya retorna Date objects, solo necesitamos combinarlos
                            var startDateObj = Ext.isDate(startDateVal) ? startDateVal : Ext.Date.parse(startDateVal, 'd/m/Y');
                            var startTimeObj = Ext.isDate(startTimeVal) ? startTimeVal : new Date(startTimeVal);
                            var endDateObj = Ext.isDate(endDateVal) ? endDateVal : Ext.Date.parse(endDateVal, 'd/m/Y');
                            var endTimeObj = Ext.isDate(value) ? value : new Date(value);

                            var fechahoradesde = new Date(
                                startDateObj.getFullYear(),
                                startDateObj.getMonth(),
                                startDateObj.getDate(),
                                startTimeObj.getHours(),
                                startTimeObj.getMinutes(),
                                startTimeObj.getSeconds()
                            );

                            var fechahorahasta = new Date(
                                endDateObj.getFullYear(),
                                endDateObj.getMonth(),
                                endDateObj.getDate(),
                                endTimeObj.getHours(),
                                endTimeObj.getMinutes(),
                                endTimeObj.getSeconds()
                            );

                            if (fechahorahasta < fechahoradesde) {
                                return 'La fecha de fin debe ser posterior al inicio';
                            }
                            return true;
                        },
                        listeners: {
                            change: function(field, newvalue, oldvalue, event){
                                var form = field.up('eventformview');
                                if (!form) return;

                                var startDate = form.down('#startdate');
                                var startTime = form.down('#starttime');
                                var endDate = form.down('#enddate');

                                if (!startDate || !startTime || !endDate) return;
                                if (!newvalue || !startDate.getValue() || !startTime.getValue() || !endDate.getValue()) return;

                                // Validar que la fecha/hora fin no sea anterior a la fecha/hora inicio
                                var startDateObj = Ext.isDate(startDate.getValue()) ? startDate.getValue() : Ext.Date.parse(startDate.getValue(), 'd/m/Y');
                                var startTimeObj = Ext.isDate(startTime.getValue()) ? startTime.getValue() : new Date(startTime.getValue());
                                var fechahoradesde = new Date(
                                    startDateObj.getFullYear(),
                                    startDateObj.getMonth(),
                                    startDateObj.getDate(),
                                    startTimeObj.getHours(),
                                    startTimeObj.getMinutes(),
                                    startTimeObj.getSeconds()
                                );

                                var endDateObj = Ext.isDate(endDate.getValue()) ? endDate.getValue() : Ext.Date.parse(endDate.getValue(), 'd/m/Y');
                                var endTimeObj = Ext.isDate(newvalue) ? newvalue : new Date(newvalue);
                                var fechahorahasta = new Date(
                                    endDateObj.getFullYear(),
                                    endDateObj.getMonth(),
                                    endDateObj.getDate(),
                                    endTimeObj.getHours(),
                                    endTimeObj.getMinutes(),
                                    endTimeObj.getSeconds()
                                );

                                if (fechahorahasta < fechahoradesde) {
                                    field.markInvalid('La fecha de fin debe ser posterior al inicio');
                                    endDate.markInvalid('La fecha de fin debe ser posterior al inicio');
                                } else {
                                    field.clearInvalid();
                                    endDate.clearInvalid();
                                }
                            }
                        }
                    }]
                }

            ]
        },
        {
            xtype: 'fieldset',
            title: 'Lugar',
            collapsible: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'PlaceAddress',
                    fieldLabel: 'Dirección'
                },
                {
                    xtype: 'container',
                    hidden: true,
                    layout: {
                        type: 'hbox'
                    },
                    margin: '0 0 5 0',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'PlaceLat',
                            margin: '0 10 0 0',
                            fieldLabel: 'Latitud',
                            flex: 1,
                            labelWidth: 120
                        },
                        {
                            xtype: 'textfield',
                            name: 'PlaceLong',
                            fieldLabel: 'Longitud',
                            flex: 1,
                            labelWidth: 60
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'textfield',
            name: 'Country',
            hidden: true
        }, {
            xtype: 'textfield',
            name: 'State',
            hidden: true
        }, {
            xtype: 'textfield',
            name: 'City',
            hidden: true
        }, {
            // Campo Schedule oculto para preservar el valor al guardar
            xtype: 'textfield',
            name: 'Schedule',
            hidden: true
        }
    ],
    listeners: {
        afterrender: function(form) {
            // Validación inicial después de que se carga el formulario
            setTimeout(function() {
                var startDate = form.down('#startdate');
                var startTime = form.down('#starttime');
                var endDate = form.down('#enddate');
                var endTime = form.down('#endtime');

                if (startDate && startTime && endDate && endTime) {
                    if (startDate.getValue() && startTime.getValue() && endDate.getValue() && endTime.getValue()) {
                        var startDateObj = Ext.isDate(startDate.getValue()) ? startDate.getValue() : Ext.Date.parse(startDate.getValue(), 'd/m/Y');
                        var startTimeObj = Ext.isDate(startTime.getValue()) ? startTime.getValue() : new Date(startTime.getValue());
                        var fechahoradesde = new Date(
                            startDateObj.getFullYear(),
                            startDateObj.getMonth(),
                            startDateObj.getDate(),
                            startTimeObj.getHours(),
                            startTimeObj.getMinutes(),
                            startTimeObj.getSeconds()
                        );

                        var endDateObj = Ext.isDate(endDate.getValue()) ? endDate.getValue() : Ext.Date.parse(endDate.getValue(), 'd/m/Y');
                        var endTimeObj = Ext.isDate(endTime.getValue()) ? endTime.getValue() : new Date(endTime.getValue());
                        var fechahorahasta = new Date(
                            endDateObj.getFullYear(),
                            endDateObj.getMonth(),
                            endDateObj.getDate(),
                            endTimeObj.getHours(),
                            endTimeObj.getMinutes(),
                            endTimeObj.getSeconds()
                        );

                        if (fechahorahasta < fechahoradesde) {
                            endDate.markInvalid('La fecha de fin debe ser posterior al inicio');
                            endTime.markInvalid('La fecha de fin debe ser posterior al inicio');
                        }
                    }

                    // Establecer la fecha mínima para el campo de fecha fin
                    if (startDate.getValue()) {
                        endDate.setMinValue(startDate.getValue());
                    }
                }
            }, 100);
        }
    },
    initComponent: function () {
        this.callParent();

        // agrego la toolbar
        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save'
                }, {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',
                    scope: this
                }, '-'/*, {
    				xtype : 'button',
					text : 'Foto',
					iconCls : 'icon-photo',
					action: 'photo'
				}*/, {
                    xtype: 'button',
                    text: 'Mapa',
                    iconCls: 'icon-map',
                    action: 'map'

                }/*,'-', {
    				xtype : 'button',
					text : 'Nueva acción',
					iconCls : 'icon-Action',
                    action: 'newAction'
				}*/
            ]// cierro items
        });
        this.addDocked(toolbar);
    } // cierro init

});

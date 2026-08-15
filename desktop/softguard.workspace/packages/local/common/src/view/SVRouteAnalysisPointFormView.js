Ext.define('Common.view.SVRouteAnalysisPointFormView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.svrouteanalysispointformview',
    requires: [
        'Common.view.SelecterField',
        'Common.view.SofiaCameraConfigPanel'
    ],
    bodyPadding: 10,
    border: false,
    defaults: {
        anchor: '100%',
        labelAlign: 'left',
        labelWidth: 180,
        allowBlank: true
    },
    scrollable: {
        x: false,
        y: true,
        reserveScrollbar: true
    },
    layout: {
        type: 'anchor',
        reserveScrollbar: true
    },

    items: [
        {
            xtype: 'hiddenfield',
            name: 'sra_iid',
            allowBlank: true
        },
        {
            xtype: 'hiddenfield',
            name: 'sra_iRouteId',
            allowBlank: true
        },
        {
            xtype: 'hiddenfield',
            name: 'sra_iAnalysisPointId',
            allowBlank: true
        },
        {
            xtype: 'hiddenfield',
            name: 'sra_iOrder',
            allowBlank: true
        },
        {
            xtype: 'hiddenfield',
            name: 'Name',
            itemId: 'nameField',
            allowBlank: true
        },
        {
            xtype: 'textfield',
            name: 'sra_cReference',
            fieldLabel: 'Nombre de la configuracion',
            allowBlank: false,
            maxLength: 150,
            listeners: {
                change: function(field, newValue) {
                    var form = field.up('form');
                    if (!form) {
                        return;
                    }
                    var hidden = form.down('#nameField');
                    if (hidden) {
                        hidden.setValue(newValue);
                    }
                    var record = form.getRecord ? form.getRecord() : null;
                    if (record && record.set) {
                        record.set('Name', newValue);
                    }
                }
            }
        },
        {
            xtype: 'selecterfield',
            itemId: 'cameraSelector',
            title: 'Camara SofIA',
            simpleSelect: true,
            filter: [],
            config: {
                disponible: {
                    title: 'Camaras disponibles',
                    field: 'nombre',
                    searchField: 'nombre'
                },
                selecionado: {
                    title: 'Camara seleccionada',
                    field: 'nombre'
                },
                valueField: 'video_id',
                filterValueField: 'id',
                autoLoadSelected: false,
                buildSelectedDisplay: function(values, field) {
                    var form = field.up('svrouteanalysispointformview');
                    if (!form) {
                        return values;
                    }
                    var summaryField = form.down('#cameraSummary');
                    var summaryText = summaryField ? summaryField.getValue() : '';
                    if (!Ext.isEmpty(summaryText)) {
                        return [{ name: summaryText }];
                    }
                    var cameraNameField = form.down('textfield[name="sra_cReference"]');
                    var fallback = cameraNameField ? cameraNameField.getValue() : null;
                    if (!Ext.isEmpty(fallback)) {
                        return [{ name: fallback }];
                    }
                    return values;
                },
                modelItems: 'Common.model.SofiaVideoDataSearchModel',
                nuevoView: null,
                editorView: null
            }
        },
        {
            xtype: 'hiddenfield',
            itemId: 'cameraSummary',
            fieldLabel: 'Camara seleccionada',
            value: 'Sin seleccionar',
            labelWidth: 180
        },
        {
            xtype: 'textfield',
            name: 'sra_cCameraType',
            itemId: 'cameraTypeField',
            hidden: true,
            allowBlank: true
        },
        {
            xtype: 'numberfield',
            name: 'sra_iCameraRefId',
            itemId: 'cameraIdField',
            hidden: true,
            allowBlank: true,
            allowDecimals: false
        },
        {
            xtype: 'hiddenfield',
            name: 'sra_cConfig',
            itemId: 'configField',
            allowBlank: true
        },
        {
            xtype: 'sofiacameraconfigpanel'
        }
    ],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            iconCls: 'icon-table-save',
            text: 'Guardar',
            formBind: true,
            action: 'save'
        }]
    }],

    setRecord: function(record) {
        this.record = record;
        if (record) {
            this.getForm().loadRecord(record);
            var nameField = this.down('#nameField');
            if (nameField) {
                var recordName = record.get ? record.get('Name') : record.Name;
                var reference = record.get ? record.get('sra_cReference') : record.sra_cReference;
                var resolvedName = Ext.isEmpty(recordName) ? reference : recordName;
                nameField.setValue(resolvedName || '');
                if (record.set) {
                    record.set('Name', resolvedName || '');
                }
            }
            this.syncCameraSummary(record);
            this.syncConfigPanel(record);
            this.fireEvent('recordloaded', this, record);
        }
    },

    syncCameraSummary: function(record) {
        var summaryField = this.down('#cameraSummary');
        if (!summaryField) {
            return;
        }
        var helperData = this.getConfigHelperData(record);
        var display = 'Sin seleccionar';
        if (helperData) {
            if (!Ext.isEmpty(helperData.displayName)) {
                display = helperData.displayName;
            } else if (!Ext.isEmpty(helperData.cameraName)) {
                display = Ext.String.trim(helperData.cameraName);
            }
        }
        if (display === 'Sin seleccionar') {
            var name = record ? (record.get ? record.get('sra_cReference') : record.sra_cReference) : '';
            if (!Ext.isEmpty(name)) {
                display = Ext.String.trim(name);
            }
        }
        summaryField.setValue(display);
    },

    syncConfigPanel: function(record) {
        var panel = this.down('#cameraConfigPanel');
        if (!panel) {
            return;
        }
        var rawConfig = record && record.get ? record.get('sra_cConfig') : (record ? record.sra_cConfig : null);
        var parsed = {};
        if (rawConfig) {
            try {
                parsed = Ext.isString(rawConfig) ? Ext.decode(rawConfig) : rawConfig;
            } catch (err) {
                parsed = {};
            }
        }
        panel.setValue(parsed);
    },

    getConfigHelperData: function(record) {
        if (!record) {
            return null;
        }
        var raw = record.get ? record.get('sra_cConfig') : record.sra_cConfig;
        if (!raw) {
            return null;
        }
        if (Ext.isObject(raw) && raw.helperData) {
            return raw.helperData;
        }
        if (Ext.isString(raw)) {
            try {
                var parsed = Ext.decode(raw);
                return parsed && parsed.helperData ? parsed.helperData : null;
            } catch (err) {
                return null;
            }
        }
        return null;
    }
});

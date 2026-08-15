Ext.define('Common.view.SofiaCameraConfigPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sofiacameraconfigpanel',
    requires: [
        'Common.view.SofiaCameraZoneEditor',
        'Common.view.UploadButton',
        'Ext.layout.container.Anchor'
    ],
    itemId: 'cameraConfigPanel',
    title: 'Configuracion de camaras',
    cls: 'sofia-camera-config-panel',
    collapsible: false,
    border: true,
    bodyPadding: 10,
    layout: {
        type: 'anchor',
        reserveScrollbar: true
    },
    defaults: {
        anchor: '100%',
        labelAlign: 'left',
        labelWidth: 240,
        allowBlank: true
    },

    helperData: null,

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'fieldset',
                title: 'Analitica de video',
                layout: {
                    type: 'anchor',
                    reserveScrollbar: true
                },
                defaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    labelWidth: 240,
                    allowBlank: true
                },
                items: [
                    {
                        xtype: 'checkboxfield',
                        boxLabel: 'Detectar personas con IA',
                        itemId: 'peopleEnabled'
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'peopleConfidence',
                        fieldLabel: 'Confianza minima personas (%)',
                        minValue: 0,
                        maxValue: 100,
                        allowDecimals: false,
                        value: 50
                    },
                    {
                        xtype: 'checkboxfield',
                        boxLabel: 'Deteccion de aforo habilitada',
                        itemId: 'occupancyEnabled'
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'occupancyMax',
                        fieldLabel: 'Maximo de personas (aforo)',
                        minValue: 1,
                        maxValue: 999999,
                        allowDecimals: false,
                        allowBlank: true
                    },
                    {
                        xtype: 'checkboxfield',
                        boxLabel: 'Detectar vehiculos con IA',
                        itemId: 'vehiclesEnabled'
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'vehiclesConfidence',
                        fieldLabel: 'Confianza minima vehiculos (%)',
                        minValue: 0,
                        maxValue: 100,
                        allowDecimals: false,
                        value: 50
                    },
                    {
                        xtype: 'checkboxfield',
                        boxLabel: 'Zona de deteccion habilitada',
                        itemId: 'motionZoneEnabled'
                    },
                    {
                        xtype: 'component',
                        itemId: 'motionZoneInstructions',
                        cls: 'motion-zone-instructions',
                        html: '<p>Haga clic sobre la imagen para agregar vertices, arrastre para moverlos y use doble clic para eliminarlos.</p>',
                        margin: '0 0 10 0'
                    },
                    {
                        xtype: 'toolbar',
                        itemId: 'snapshotToolbar',
                        ui: 'plain',
                        cls: 'sofia-camera-snapshot-toolbar',
                        margin: '0 0 10 0',
                        items: [
                            {
                                xtype: 'uploadbutton',
                                itemId: 'snapshotUploadButton',
                                iconCls: 'icon-photo',
                                text: 'Subir imagen de la camara',
                                disabled: true,
                                plugins: [{
                                    ptype: 'uploadwindow',
                                    title: 'Subir imagen de la camara',
                                    width: 360,
                                    height: 420
                                }],
                                uploader: {
                                    url: '/rest/upload/new?search=softguardMiscFile',
                                    uploadpath: '',
                                    multi_selection: false,
                                    autoStart: true,
                                    maxFileSize: '25mb',
                                    filters: [{
                                        title: 'Imagen JPG',
                                        extensions: 'jpg,jpeg'
                                    }],
                                    statusQueuedText: 'Listo para subir',
                                    statusUploadingText: 'Subiendo ({0}%)',
                                    statusFailedText: '<span style="color: red">Error</span>',
                                    statusDoneText: '<span style="color: green">Completo</span>',
                                    statusInvalidSizeText: 'Archivo demasiado largo',
                                    statusInvalidExtensionText: 'Formato invalido'
                                },
                                listeners: {
                                    filesadded: function(uploader) {
                                        var panel = uploader.owner.up('sofiacameraconfigpanel');
                                        if (!panel || !panel.canUploadSnapshot()) {
                                            notifyError('Seleccione una camara antes de subir una imagen.');
                                            if (uploader && uploader.removeAll) {
                                                uploader.removeAll();
                                            }
                                            return false;
                                        }
                                    },
                                    beforeupload: function(uploader, pluploadInstance, file) {
                                        var panel = uploader.owner.up('sofiacameraconfigpanel');
                                        if (!panel) {
                                            return false;
                                        }
                                        var fileName = panel.buildSnapshotFileName();
                                        if (!fileName) {
                                            notifyError('No se pudo determinar el nombre de la imagen.');
                                            if (pluploadInstance && pluploadInstance.stop) {
                                                pluploadInstance.stop();
                                            }
                                            return false;
                                        }
                                        file.name = fileName;
                                        if (pluploadInstance && pluploadInstance.settings) {
                                            pluploadInstance.settings.url = panel.getSnapshotUploadUrl(fileName);
                                            pluploadInstance.settings.multipart_params = Ext.apply({}, pluploadInstance.settings.multipart_params);
                                            pluploadInstance.settings.multipart_params.filename = fileName;
                                        }
                                    },
                                    uploadcomplete: function(uploader, success, failed) {
                                        var panel = uploader.owner.up('sofiacameraconfigpanel');
                                        if (panel) {
                                            panel.handleSnapshotUploadComplete(success, failed);
                                        }
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'snapshotClearButton',
                                iconCls: 'icon-bin-empty',
                                text: 'Quitar imagen',
                                disabled: true,
                                handler: function(button) {
                                    var panel = button.up('sofiacameraconfigpanel');
                                    if (panel) {
                                        panel.clearSnapshotImage();
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'sofiacamerazoneeditor',
                        itemId: 'motionZoneEditor',
                        height: 360,
                        margin: '0 0 10 0'
                    },
                    {
                        xtype: 'toolbar',
                        itemId: 'motionZoneToolbar',
                        items: [
                            {
                                text: 'Limpiar zona',
                                iconCls: 'icon-bin-empty',
                                handler: function(button) {
                                    var toolbar = button.up('toolbar');
                                    if (!toolbar) {
                                        return;
                                    }
                                    var panel = toolbar.up('sofiacameraconfigpanel');
                                    if (!panel) {
                                        return;
                                    }
                                    var editor = panel.down('#motionZoneEditor');
                                    if (editor && editor.resetPolygon) {
                                        editor.resetPolygon();
                                    }
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'checkboxfield',
                        boxLabel: 'Deteccion de humo/fuego',
                        itemId: 'smokeEnabled'
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'smokeConfidence',
                        fieldLabel: 'Sensibilidad humo/fuego (%)',
                        minValue: 0,
                        maxValue: 100,
                        allowDecimals: false,
                        value: 50
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Integridad de video',
                layout: {
                    type: 'anchor',
                    reserveScrollbar: true
                },
                defaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    labelWidth: 240,
                    allowBlank: true
                },
                items: [
                    {
                        xtype: 'checkboxfield',
                        boxLabel: 'Monitorizar conexion de camara',
                        itemId: 'connectionEnabled'
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'obstructionThreshold',
                        fieldLabel: 'Umbral obstruccion (%)',
                        minValue: 0,
                        maxValue: 100,
                        allowDecimals: false,
                        value: 60
                    },
                    {
                        xtype: 'checkboxfield',
                        boxLabel: 'Difuminado o fuera de foco',
                        itemId: 'outOfFocusEnabled'
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'outOfFocusThreshold',
                        fieldLabel: 'Umbral de foco (%)',
                        minValue: 0,
                        maxValue: 100,
                        allowDecimals: false,
                        value: 20
                    },
                    {
                        xtype: 'checkboxfield',
                        boxLabel: 'Comparacion de video',
                        itemId: 'differenceEnabled'
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'differenceThreshold',
                        fieldLabel: 'Umbral de diferencia (%)',
                        minValue: 0,
                        maxValue: 100,
                        allowDecimals: false,
                        value: 10
                    },
                    {
                        xtype: 'checkboxfield',
                        boxLabel: 'Camara tapada',
                        itemId: 'coverEnabled'
                    }
                ]
            }
        ];

        me.callParent(arguments);
        me.linkToggle(me.down('#peopleEnabled'), me.down('#peopleConfidence'));
        me.linkToggle(me.down('#occupancyEnabled'), me.down('#occupancyMax'));
        me.linkToggle(me.down('#vehiclesEnabled'), me.down('#vehiclesConfidence'));
        me.linkToggle(me.down('#motionZoneEnabled'), me.down('#motionZoneEditor'));
        me.linkToggle(me.down('#smokeEnabled'), me.down('#smokeConfidence'));
        me.linkToggle(me.down('#outOfFocusEnabled'), me.down('#outOfFocusThreshold'));
        me.linkToggle(me.down('#differenceEnabled'), me.down('#differenceThreshold'));
        me.linkToggle(me.down('#coverEnabled'), me.down('#obstructionThreshold'));
    },

    linkToggle: function(toggleField, targetField) {
        if (!toggleField || !targetField) {
            return;
        }
        targetField.setDisabled(!toggleField.getValue());
        toggleField.on('change', function(cb, checked) {
            targetField.setDisabled(!checked);
        });
    },

    mergeDefaults: function(config, key, defaults) {
        var value = config && config[key] ? config[key] : {};
        return Ext.apply({}, value, defaults);
    },

    setValue: function(config) {
        config = config || {};
        var analytics = this.mergeDefaults(config, 'analytics', {});
        var integrity = this.mergeDefaults(config, 'integrity', {});
        this.setHelperData(config && config.helperData ? config.helperData : null);

        var people = this.mergeDefaults(analytics, 'people', {
            enabled: false,
            minConfidence: 50,
            occupancyEnabled: false,
            maxOccupancy: null
        });
        var vehicles = this.mergeDefaults(analytics, 'vehicles', { enabled: false, minConfidence: 50 });
        var motionZone = this.mergeDefaults(analytics, 'motionZone', { enabled: false, polygon: [], snapshotUrl: config.snapshotUrl || null });
        var smoke = this.mergeDefaults(analytics, 'smokeFire', { enabled: false, sensitivity: 50 });

        var connection = this.mergeDefaults(integrity, 'connection', { enabled: false });
        var obstruction = this.mergeDefaults(integrity, 'obstruction', { threshold: null });
        var focus = this.mergeDefaults(integrity, 'outOfFocus', { enabled: false, threshold: 20 });
        var difference = this.mergeDefaults(integrity, 'difference', { enabled: false, threshold: 10 });
        var cover = this.mergeDefaults(integrity, 'cover', { enabled: false });

        this.down('#peopleEnabled').setValue(people.enabled === true);
        this.down('#peopleConfidence').setValue(Ext.Number.from(people.minConfidence, 50));
        this.down('#occupancyEnabled').setValue(people.occupancyEnabled === true);
        this.down('#occupancyMax').setValue(
            Ext.isNumber(people.maxOccupancy) && people.maxOccupancy > 0
                ? people.maxOccupancy
                : null
        );
        this.syncPeopleControls(people.enabled === true);

        this.down('#vehiclesEnabled').setValue(vehicles.enabled === true);
        this.down('#vehiclesConfidence').setValue(Ext.Number.from(vehicles.minConfidence, 50));

        this.down('#motionZoneEnabled').setValue(motionZone.enabled === true);
        this.setMotionZoneSnapshot(motionZone.snapshotUrl || config.snapshotUrl || null);
        var motionZoneEditor = this.down('#motionZoneEditor');
        if (motionZoneEditor) {
            motionZoneEditor.setPolygon(motionZone.polygon || []);
            motionZoneEditor.setDisabled(motionZone.enabled !== true);
        }

        this.down('#smokeEnabled').setValue(smoke.enabled === true);
        this.down('#smokeConfidence').setValue(Ext.Number.from(smoke.sensitivity, 50));

        this.down('#connectionEnabled').setValue(connection.enabled === true);
        this.down('#obstructionThreshold').setValue(
            Ext.isNumber(obstruction.threshold) && obstruction.threshold >= 0
                ? Math.round(obstruction.threshold * 100)
                : 60
        );

        this.down('#outOfFocusEnabled').setValue(focus.enabled === true);
        this.down('#outOfFocusThreshold').setValue(Ext.Number.from(focus.threshold, 20));

        this.down('#differenceEnabled').setValue(difference.enabled === true);
        this.down('#differenceThreshold').setValue(Ext.Number.from(difference.threshold, 10));

        this.down('#coverEnabled').setValue(cover.enabled === true);
    },

    getValue: function() {
        var value = {
            analytics: {
                people: {
                    enabled: this.down('#peopleEnabled').getValue() === true,
                    minConfidence: Ext.Number.from(this.down('#peopleConfidence').getValue(), 50),
                    occupancyEnabled: this.down('#occupancyEnabled').getValue() === true,
                    maxOccupancy: (function() {
                        var raw = Ext.Number.from(
                            this.down('#occupancyMax').getValue(),
                            NaN
                        );
                        if (!Ext.isNumber(raw) || raw <= 0) {
                            return null;
                        }
                        return raw;
                    }).call(this)
                },
                vehicles: {
                    enabled: this.down('#vehiclesEnabled').getValue() === true,
                    minConfidence: Ext.Number.from(this.down('#vehiclesConfidence').getValue(), 50)
                },
                motionZone: this.buildMotionZoneConfig(),
                smokeFire: {
                    enabled: this.down('#smokeEnabled').getValue() === true,
                    sensitivity: Ext.Number.from(this.down('#smokeConfidence').getValue(), 50)
                }
            },
            integrity: {
                connection: {
                    enabled: this.down('#connectionEnabled').getValue() === true
                },
                obstruction: {
                    enabled: this.down('#coverEnabled').getValue() === true,
                    threshold: (function() {
                        var raw = Ext.Number.from(
                            this.down('#obstructionThreshold').getValue(),
                            NaN
                        );
                        if (!Ext.isNumber(raw) || raw < 0) {
                            return null;
                        }
                        return raw / 100;
                    }).call(this)
                },
                outOfFocus: {
                    enabled: this.down('#outOfFocusEnabled').getValue() === true,
                    threshold: Ext.Number.from(this.down('#outOfFocusThreshold').getValue(), 20)
                },
                difference: {
                    enabled: this.down('#differenceEnabled').getValue() === true,
                    threshold: Ext.Number.from(this.down('#differenceThreshold').getValue(), 10)
                },
                cover: {
                    enabled: this.down('#coverEnabled').getValue() === true
                }
            }
        };
        if (this.helperData) {
            value.helperData = Ext.clone(this.helperData);
        }
        return value;
    },

    buildMotionZoneConfig: function() {
        var enabled = this.down('#motionZoneEnabled').getValue() === true;
        var editor = this.down('#motionZoneEditor');
        var polygon = [];
        var snapshot = null;
        if (editor) {
            polygon = editor.getPolygon ? editor.getPolygon() : [];
            snapshot = editor.getSnapshot ? editor.getSnapshot() : null;
            editor.setDisabled(!enabled);
        }
        var deterministicSnapshot = this.buildSnapshotUrl ? this.buildSnapshotUrl() : null;
        if (!Ext.isEmpty(snapshot) && deterministicSnapshot && snapshot === deterministicSnapshot) {
            snapshot = null;
        }
        return {
            enabled: enabled,
            polygon: polygon,
            snapshotUrl: snapshot
        };
    },

    setMotionZoneSnapshot: function(url) {
        var editor = this.down('#motionZoneEditor');
        if (editor && editor.setSnapshot) {
            editor.setSnapshot(url);
        }
        this.syncSnapshotButtons();
    },

    setHelperData: function(data) {
        this.helperData = data ? Ext.clone(data) : null;
        this.syncSnapshotButtons();
    },

    getHelperData: function() {
        return this.helperData ? Ext.clone(this.helperData) : null;
    },

    afterRender: function() {
        this.callParent(arguments);
        var peopleField = this.down('#peopleEnabled');
        if (peopleField) {
            this.mon(peopleField, 'change', this.onPeopleToggle, this);
        }
        this.syncPeopleControls();
        this.syncSnapshotButtons();
    },

    onPeopleToggle: function(field, newValue) {
        this.syncPeopleControls(newValue === true);
    },

    syncPeopleControls: function(forceEnabled) {
        var enabled = Ext.isBoolean(forceEnabled)
            ? forceEnabled
            : (function(scope) {
                var field = scope.down('#peopleEnabled');
                return field ? field.getValue() === true : false;
            }(this));
        var occupancyToggle = this.down('#occupancyEnabled');
        var occupancyField = this.down('#occupancyMax');
        if (occupancyToggle) {
            if (!enabled && occupancyToggle.getValue()) {
                occupancyToggle.setValue(false);
            }
            occupancyToggle.setDisabled(enabled !== true);
        }
        if (occupancyField) {
            if (enabled !== true) {
                occupancyField.setValue(null);
            }
            occupancyField.setDisabled(enabled !== true);
        }
    },

    canUploadSnapshot: function() {
        var helper = this.helperData;
        var cameraId = helper ? Ext.Number.from(helper.cameraId, 0) : 0;
        return cameraId > 0;
    },

    getSnapshotUploadUrl: function(fileName) {
        var base = '/rest/upload/new?search=softguardMiscFile';
        if (!Ext.isEmpty(fileName)) {
            return base + '&filename=' + encodeURIComponent(fileName);
        }
        return base;
    },

    buildSnapshotFileName: function() {
        var helper = this.helperData;
        if (!helper) {
            return null;
        }
        var cameraId = Ext.Number.from(helper.cameraId, 0);
        if (!cameraId) {
            return null;
        }
        return this.resolveSnapshotPrefix(helper.cameraType) + '_' + cameraId + '.jpg';
    },

    buildSnapshotUrl: function() {
        var fileName = this.buildSnapshotFileName();
        if (Ext.isEmpty(fileName)) {
            return null;
        }
        return '/gallery/' + fileName;
    },

    resolveSnapshotPrefix: function(type) {
        var normalized = this.normalizeCameraType(type);
        if (normalized === 'CVL') {
            return 'CVL';
        }
        return 'CUV';
    },

    normalizeCameraType: function(type) {
        var raw = Ext.String.trim(type || '');
        if (!raw) {
            return '';
        }
        var upper = raw.toUpperCase();
        if (upper === 'CUENTAS_VIDEO_LINKS') {
            return 'CVL';
        }
        return upper;
    },

    handleSnapshotUploadComplete: function(success, failed) {
        if (failed && failed.length) {
            notifyError('No se pudo subir la imagen de la camara.');
            return;
        }
        if (!success || !success.length) {
            notifyError('No se pudo subir la imagen de la camara.');
            return;
        }
        var snapshotUrl = this.buildSnapshotUrl();
        if (!snapshotUrl) {
            notifyError('La camara seleccionada no es valida.');
            return;
        }
        this.setMotionZoneSnapshot(snapshotUrl);
        notify('Imagen de la camara actualizada.');
    },

    clearSnapshotImage: function() {
        this.setMotionZoneSnapshot(null);
        notify('Imagen de la camara eliminada.');
    },

    hasSnapshotImage: function() {
        var editor = this.down('#motionZoneEditor');
        if (!editor || !editor.getSnapshot) {
            return false;
        }
        var snapshot = editor.getSnapshot();
        return !Ext.isEmpty(snapshot);
    },

    syncSnapshotButtons: function() {
        if (!this.rendered) {
            return;
        }
        var uploadButton = this.down('#snapshotUploadButton');
        var clearButton = this.down('#snapshotClearButton');
        var canUpload = this.canUploadSnapshot();
        if (uploadButton) {
            uploadButton.setDisabled(!canUpload);
        }
        if (clearButton) {
            clearButton.setDisabled(!this.hasSnapshotImage());
        }
    }
});

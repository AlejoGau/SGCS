//MIGRADO2024
Ext.define('Common.view.SVRoutesView', {
    extend : 'Ext.panel.Panel',
    alias  : 'widget.svroutesview',
    requires: [
        'Common.view.SVRoutesFormView',
        'Common.view.SVRouteAnalysisPointsGridView',
        'Common.view.SVRouteProgramsGridView'
    ],
    layout : {
        type : 'vbox',
        align: 'stretch'
    },
    border : false,
    defaults: {
        margin: '0 0 0 0'
    },

    initComponent: function() {
        var cuentaRecord = this.cuentaRecord || null;
        if (!cuentaRecord && this.caller && this.caller.record) {
            cuentaRecord = this.caller.record;
        }

        var cuentaId = this.cuentaId || this.resolveCuentaIdFromRecord(this.record) || this.resolveCuentaIdFromRecord(cuentaRecord);
        this.cuentaRecord = cuentaRecord || null;
        this.cuentaId = cuentaId || null;

        this.items = [{
            xtype: 'svroutesformview',
            itemId: 'routeForm',
            record: this.record || null,
            cuentaId: this.cuentaId || null,
            cuentaRecord: this.cuentaRecord || null,
            caller: this,
            flex: 0
        }, {
            xtype: 'svrouteanalysispointsgridview',
            itemId: 'analysisPointsGrid',
            title: 'Configuración de Cámaras',
            record: this.record || null,
            cuentaId: this.cuentaId || null,
            cuentaRecord: this.cuentaRecord || null,
            caller: this,
            flex: 1,
            hidden: true,
            disabled: true
        }, {
            xtype: 'svrouteprogramsgridview',
            itemId: 'programsGrid',
            title: 'Programaciones SofIA',
            record: this.record || null,
            cuentaId: this.cuentaId || null,
            cuentaRecord: this.cuentaRecord || null,
            caller: this,
            flex: 1,
            hidden: true,
            disabled: true
        }];

        this.callParent(arguments);
    },

    resolveCuentaIdFromRecord: function(record) {
        if (!record) {
            return null;
        }
        if (Ext.isFunction(record.get)) {
            return record.get('svr_iCuentaId') || record.get('sap_iCuentaId') || record.get('CuentaId') || record.get('cue_iid') || record.get('cuentaId') || null;
        }
        return record.svr_iCuentaId || record.sap_iCuentaId || record.CuentaId || record.cue_iid || record.cuentaId || null;
    },

    setRecord: function(record) {
        this.record = record;

        var cuentaId = this.resolveCuentaIdFromRecord(record) || this.cuentaId || this.resolveCuentaIdFromRecord(this.cuentaRecord);
        if (cuentaId) {
            this.cuentaId = cuentaId;
        }

        var titleText = 'Plan de Control';
        if (record && record.get) {
            var rawTitle = record.get('svr_cName') || record.get('Name');
            if (!Ext.isEmpty(rawTitle)) {
                titleText = Ext.String.trim(rawTitle);
            }
        }
        var displayTitle = (typeof sanitizarTitulo === 'function') ? sanitizarTitulo(titleText) : titleText;
        if (this.setTitle) {
            this.setTitle(displayTitle);
        }
        this.originalTitle = displayTitle;

        var form = this.down('#routeForm');
        if (form) {
            form.caller = this;
            form.cuentaRecord = this.cuentaRecord;
            if (cuentaId) {
                form.cuentaId = cuentaId;
            } else if (this.cuentaId) {
                form.cuentaId = this.cuentaId;
            }
            form.setRecord(record);
        }

        var analysisGrid = this.down('#analysisPointsGrid');
        var programsGrid = this.down('#programsGrid');
        if (analysisGrid) {
            analysisGrid.caller = this;
            analysisGrid.cuentaRecord = this.cuentaRecord;
            if (cuentaId) {
                analysisGrid.cuentaId = cuentaId;
            }
            analysisGrid.setRecord(record);
        }
        if (programsGrid) {
            programsGrid.caller = this;
            programsGrid.cuentaRecord = this.cuentaRecord;
            if (cuentaId) {
                programsGrid.cuentaId = cuentaId;
            }
            programsGrid.setRecord(record);
        }

        if (record && record.get && !record.phantom && record.get('svr_iid')) {
            this.enableDetailGrids(record);
        }
    },

    enableDetailGrids: function(record) {
        var cuentaId = this.cuentaId || this.resolveCuentaIdFromRecord(record) || this.resolveCuentaIdFromRecord(this.cuentaRecord);
        var analysisGrid = this.down('#analysisPointsGrid');
        var programsGrid = this.down('#programsGrid');
        var form = this.down('#routeForm');

        if (record && form && form.fireEvent) {
            form.fireEvent('routechange', form, record);
        }

        if (analysisGrid && analysisGrid.isHidden()) {
            analysisGrid.setDisabled(false);
            analysisGrid.show();
        }
        if (programsGrid && programsGrid.isHidden()) {
            programsGrid.setDisabled(false);
            programsGrid.show();
        }

        if (analysisGrid) {
            analysisGrid.caller = this;
            if (cuentaId) {
                analysisGrid.cuentaId = cuentaId;
            }
            analysisGrid.cuentaRecord = this.cuentaRecord;
            analysisGrid.setRecord(record);
        }
        if (programsGrid) {
            programsGrid.caller = this;
            if (cuentaId) {
                programsGrid.cuentaId = cuentaId;
            }
            programsGrid.cuentaRecord = this.cuentaRecord;
            programsGrid.setRecord(record);
        }
    }
});

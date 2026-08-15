Ext.define('Common.view.SofiaCheckPointsTabView', {
    extend : 'Ext.panel.Panel',
    alias  : 'widget.sofiacheckpointstabview',
    requires: [
        'Common.view.SVRouteAnalysisPointsGridView'
    ],
    layout : 'fit',
    border : false,

    initComponent: function() {
        this.items = [{
            xtype: 'svrouteanalysispointsgridview',
            itemId: 'analysisPointsGrid',
            record: this.record || null,
            cuentaRecord: this.cuentaRecord || this.record || null,
            caller: this
        }];

        this.callParent(arguments);
    },

    setRecord: function(record) {
        this.record = record;
        this.cuentaRecord = record;
        var grid = this.down('svrouteanalysispointsgridview');
        if (grid) {
            grid.caller = this;
            grid.cuentaRecord = record;
            grid.setRecord(record);
        }
    },

    listeners: {
        afterrender: function(view) {
            if (view.record) {
                view.setRecord(view.record);
            }
        }
    }
});

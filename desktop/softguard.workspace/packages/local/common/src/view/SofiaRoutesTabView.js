//MIGRADO2024
Ext.define('Common.view.SofiaRoutesTabView', {
    extend : 'Ext.panel.Panel',
    alias  : 'widget.sofiaroutestabview',
    requires: [
        'Common.view.SVRoutesGridView'
    ],
    layout : 'fit',
    border : false,

    initComponent: function() {
        this.items = [{
            xtype: 'svroutesgridview',
            itemId: 'svRoutesGrid',
            record: this.record || null,
            cuentaRecord: this.record || null,
            caller: this
        }];

        this.callParent(arguments);
    },

    setRecord: function(record) {
        this.record = record;
        var grid = this.down('svroutesgridview');
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

Ext.define('Common.view.SVRouteProgramWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.svrouteprogramwindow',
    requires: [
        'Common.view.SVRouteProgramFormView'
    ],
    width: 420,
    minWidth: 360,
    height: 320,
    modal: true,
    resizable: false,
    layout: 'fit',
    closeAction: 'destroy',

    initComponent: function() {
        this.items = [{
            xtype: 'svrouteprogramformview',
            itemId: 'programForm',
            record: this.record || null,
            caller: this.caller || null,
            routeId: this.routeId || null
        }];

        this.callParent(arguments);
    },

    setRecord: function(record) {
        this.record = record;
        var form = this.down('#programForm');
        if (form) {
            form.setRecord(record);
        }
    },

    getForm: function() {
        return this.down('#programForm');
    }
});

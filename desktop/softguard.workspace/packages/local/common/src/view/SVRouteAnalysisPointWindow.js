Ext.define('Common.view.SVRouteAnalysisPointWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.svrouteanalysispointwindow',
    requires: [
        'Common.view.SVRouteAnalysisPointFormView'
    ],
    width: 760,
    minWidth: 520,
    height: 540,
    minHeight: 480,
    modal: true,
    resizable: true,
    layout: 'fit',
    closeAction: 'destroy',

    initComponent: function() {
        this.items = [{
            xtype: 'svrouteanalysispointformview',
            itemId: 'pointForm',
            record: this.record || null,
            caller: this.caller || null,
            cuentaId: this.cuentaId || null,
            routeId: this.routeId || null
        }];

        this.callParent(arguments);
    },

    setRecord: function(record) {
        this.record = record;
        var form = this.down('#pointForm');
        if (form) {
            form.setRecord(record);
        }
    },

    getForm: function() {
        return this.down('#pointForm');
    }
});

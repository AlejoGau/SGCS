Ext.define('Common.view.CuentaSofIAView', {
    extend : 'Ext.tab.Panel',
    alias  : 'widget.cuentasofiaview',
    title  : 'SofIA VideoVerificación',
    iconCls: 'icon-eye',
    border : false,
    items: [
        {
            xtype: 'sofiaroutestabview',
            title: 'Planes de Control',
            caller: null,
            record: null,
            cuentaRecord: null
        },
        {
            xtype: 'sofiacalendartabview',
            title: 'Calendario',
            hidden: true,
            caller: null,
            record: null,
            cuentaRecord: null
        }
    ],

    initComponent: function() {
        var me = this;
        Ext.Array.each(me.items, function(tabCfg) {
            tabCfg.caller = me;
            tabCfg.record = me.record || null;
            tabCfg.cuentaRecord = me.record || null;
        });
        me.callParent(arguments);
    },

    setRecord: function(record) {
        this.record = record;
        Ext.Array.each(this.items.items, function(tab) {
            if (tab) {
                tab.caller = this;
                tab.cuentaRecord = record;
                if (Ext.isFunction(tab.setRecord)) {
                    tab.setRecord(record);
                } else {
                    tab.record = record;
                }
            }
        }, this);
    }
});


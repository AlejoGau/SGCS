Ext.define('iOT.view.iOTEnergyDevicesDashboardView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.iotenergydevicesdashboardview',
    autoHeight: true,
    layout : {
        type : 'hbox',
        align: 'stretch'
    },
    items : [
        {
            xtype: 'uxiframe',
            itemId: 'Iframe',
            height: 0,
            border : false,
            width:'100%'
        }
    ],
    activeHelp: true,
    initComponent: function () {
        this.callParent(arguments);

        var toolbar = Ext.create('Ext.toolbar.Toolbar', {
            items: []
        });

        this.addDocked(toolbar);
    }
});

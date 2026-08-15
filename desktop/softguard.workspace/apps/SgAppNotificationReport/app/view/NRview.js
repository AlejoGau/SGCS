Ext.define('SgAppNotificationReport.view.NRview', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.nrview',    
    layout: 'border',
    items: [{
        xtype: 'moduletreeview', //implied by default
        title: 'Reporte de notificaciones',
        store : 'NRModuleStore',
        region:'west',
        margins: '5 0 0 5',
        width: 200,
        collapsible: true,
        layout: 'fit',
        split: true
    },{
        //title: 'Center Region',
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'center',
        layout: 'fit',
        margins: '5 0 0 0'
    }],
    
    initComponent: function () {
        this.callParent();
        var moduletreeview = this.down('moduletreeview');
        
        moduletreeview.targetTab = this.down('tabpanel');
        moduletreeview.down('treeview').targetTab = moduletreeview.targetTab;
    }
});
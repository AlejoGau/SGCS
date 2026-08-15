Ext.define('Common.view.VehicleView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.vehicleview',
   // title: 'Border Layout',
    layout: 'border',
    items : [{
        xtype: 'moduletreeview', 
        title: 'Datos',
        region:'west',
        margins: '5 0 0 5',
        width: 200,
        collapsible: true,
        layout: 'fit',
        split: true,
        itemId: 'west'
    },{
        title: 'Center Region',
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'dmtab',
        layout: 'fit',
        margins: '5 0 0 0'
    }],
    // cierro items
    initComponent: function(){
        this.callParent();
        
        var moduletreeview = this.down('moduletreeview');
        moduletreeview.targetTab = this.down('#dmtab');
        moduletreeview.down('treeview').targetTab = moduletreeview.targetTab;

    }
});

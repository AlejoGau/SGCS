
Ext.define('GestorSim.view.GestorSimView',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.gestorsim',
    layout: 'fit',    
    items: [{
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'center',
        margins: '5 0 0 0'
    }],
    
    initComponent: function () {
        this.callParent();
    }
});

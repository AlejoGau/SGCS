//MIGRADO2024
Ext.define('Common.view.ContratoTabPanelView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.contratotabpanelview',    
    layout: 'border',
    items: [{
        //title: 'Center Region',
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'center',
        layout: 'fit',
        margins: '5 0 0 0'
    }],
    
    initComponent: function () {
        this.callParent();
      
    }
});
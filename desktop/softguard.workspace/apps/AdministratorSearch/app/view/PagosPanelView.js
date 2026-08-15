Ext.define('AdministratorSearch.view.PagosPanelView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.pagospanelview',    
    layout: 'border',
    activeHelper:true,
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
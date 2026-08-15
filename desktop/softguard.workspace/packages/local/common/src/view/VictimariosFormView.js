//MIGRADO2024
Ext.define('Common.view.VictimariosFormView', {
    extend : 'Ext.panel.Panel',
    alias : ['widget.victimariosformview'],
    title: 'Border Layout',
    layout: 'border',
    items: [{
            xtype: 'tabpanel',
            region: 'center',
            itemId: 'center',
            layout: 'fit',
            margins: '5 0 0 0'
    }],
    initComponent: function () {
       
        this.callParent(arguments);     
        
        
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'save',
                    text: 'Guardar',
                    scope: this,
                    action: 'save',
                    itemId:'save'
                },
                {
                    iconCls: 'icon-delete',
                    text: 'Eliminar',
                    action: 'delete',
                    itemId: 'delete'
                },                
            ]// cierro items
         });    
        
        this.addDocked(toolbar);
        
    }
});
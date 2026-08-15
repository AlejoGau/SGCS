Ext.define('SgAppMapGuardWeb.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    items: [
        
        
        
        
        
            {
                xtype: 'tabpanel',
                id: 'center',
                itemId: 'center',
                region: 'center'
            }
        
    ]
});
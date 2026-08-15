Ext.define('SgAppNotificationReport.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    items: [
        
        
        
        
        
            ,{
                xtype: 'nrview',
                id: 'center',
                itemId: 'center',
                region: 'center'
            }
        
    ]
});
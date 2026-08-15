Ext.define('Video.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    items: [
            {
                xtype: '',
                itemId: 'north',
                id: 'north',
                region: 'north'
            }
        
        
        
        
        
            ,{
                xtype: 'videotabpanelview',
                id: 'center',
                itemId: 'center',
                region: 'center'
            }
        
    ]
});
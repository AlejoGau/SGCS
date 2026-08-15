Ext.define('Logger.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    items: [
        {
            xtype: 'multicuentallamadasgrabadasview',
            id: 'center',
            itemId: 'center',
            region: 'center'
        }
        
    ]
});
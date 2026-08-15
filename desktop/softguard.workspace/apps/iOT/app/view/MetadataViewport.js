Ext.define('iOT.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    items: [
        {
            xtype: 'iot',
            id: 'center',
            itemId: 'center',
            region: 'center'
        }
    ]
});
Ext.define('AccessControl.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    items: [
        {
            xtype: 'accesscontrol',
            id: 'center',
            itemId: 'center',
            region: 'center'
        }
    ]
});
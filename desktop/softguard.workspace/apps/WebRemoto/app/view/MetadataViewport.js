Ext.define('WebRemoto.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    items: [
        {
            xtype: 'webremotonorthview',
            itemId: 'north',
            id: 'north',
            region: 'north'
        },
        {
            xtype: 'tabpanel',
            itemId: 'center',
            id: 'center',
            region: 'center'
        }
    ]
});
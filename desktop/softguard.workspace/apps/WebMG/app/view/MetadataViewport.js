Ext.define('WebMG.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    items: [

        {
            xtype: 'moduletoolbar',
            region: 'north'
        },{
            xtype: 'tabpanel',
            id: 'center',
            itemId: 'center',
            region: 'center',

        }
    ]
});
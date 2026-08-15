Ext.define('DealerSearch.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    items: [
            {
                xtype: 'moduletoolbar',
                itemId: 'north',
                id: 'north',
                region: 'north'
            }
        
        
        
        
        
            ,{
                xtype: 'tabpanel',
                id: 'center',
                itemId: 'center',
                region: 'center'
            }
        
    ]
});
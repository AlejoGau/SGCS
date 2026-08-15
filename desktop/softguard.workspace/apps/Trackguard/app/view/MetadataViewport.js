Ext.define('Trackguard.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    items: [
            {
                xtype: 'trackguardtoolbar',
                id: 'north',
                region: 'north'
            }
        
        
        
        
        
            ,{
                xtype: 'tabpanel',
                id: 'center',
                region: 'center'
            }
        
    ]
});
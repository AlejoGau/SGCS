Ext.define('Awcc.view.MetadataViewport', {
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
                xtype: 'awccpanelview',
                id: 'center',
                region: 'center'
            }
        
    ]
});
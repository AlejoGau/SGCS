Ext.define('SgAppSerTec.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    items: [
        
        
        
        
        
            ,{
                xtype: 'sertecview',
                id: 'center',
                itemId: 'center',
                region: 'center'
            }
        
    ]
});
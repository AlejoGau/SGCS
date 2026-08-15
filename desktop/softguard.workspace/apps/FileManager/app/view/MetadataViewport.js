Ext.define('FileManager.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    items: [   
                {
                    xtype: 'panel',
                    region: 'west',
                    id: 'west', // see Ext.getCmp() below
                    itemId: 'west',
                    split: true,
                    width: 250,
                    minWidth: 175,
                    layout:'accordion',
                    maxWidth: 400,
                    collapsible: true,
                    collapsed : true,
                    animCollapse: false
                }
        
        
        
           ,{
                xtype: 'filegridview',
                id: 'center',
                itemId: 'center',
                region: 'center'
            }
        
    ]
});
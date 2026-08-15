//MIGRADO2024
Ext.define('Audit.view.MetadataViewport', {
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
                xtype: '',
                region: 'south',
                itemId: 'south',
                id: 'south'
            }
        
        
        
            ,{
                xtype: 'auditgridview',
                id: 'center',
                itemId: 'center',
                region: 'center'
            }
        
    ]
});
Ext.define('GestorSim.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: ['widget.viewport'],
    id: 'viewport',
    layout: 'border',
    items: [
        {
            xtype: '',
            region: 'south',
            itemId: 'south',
            id: 'south'
        },
        {
            xtype: 'gestorsim',
            id: 'center',
            itemId: 'center',
            region: 'center'
        }
    ]
});
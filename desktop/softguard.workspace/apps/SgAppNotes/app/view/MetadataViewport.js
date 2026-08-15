Ext.define('SgAppNotes.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    items: [
        {
            xtype: 'sgappnotes',
            id: 'center',
            itemId: 'center',
            region: 'center'
        }
    ]
});
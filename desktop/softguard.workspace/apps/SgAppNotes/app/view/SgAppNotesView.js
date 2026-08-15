
Ext.define('SgAppNotes.view.SgAppNotesView',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.sgappnotes',
    layout: 'fit',
    items: [{
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'center',
        margins: '5 0 0 0'
    }],
    
    initComponent: function () {
        this.callParent();
    }
});

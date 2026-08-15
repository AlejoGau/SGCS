Ext.define('Trackguard.view.GeocercasProgramadasView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.geocercasprogramadasview',    
    title: 'Border Layout',
    forceClose: false,
    layout: 'border',
    items: [{
        title: 'Center Region',
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'centerroutes',
        layout: 'fit',
        margins: '5 0 0 0'
    }]
});
Ext.define('GestorSim.view.CuentaView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.cuentaview',    
    title: 'Border Layout',
    forceClose: false,
    layout: 'border',
    items: [{
        xtype: 'panel', //implied by default
        itemId: 'west',
        region:'west',
        margins: '5 0 0 5',
        width: 200,
        collapsible: true,
        layout: 'fit',
        split: true
    },{
        //title: 'Center Region',
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'center',
        layout: 'fit',
        margins: '5 0 0 0'
    }]
});
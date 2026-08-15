Ext.define('SGWebCrm.view.ProductView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.productview',    
    title: 'Border Layout',
    layout: 'border',
    items: [{
        xtype: 'moduletreeview', //implied by default
        title: 'Información del Producto',
        store : 'ProductModuleStore',
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
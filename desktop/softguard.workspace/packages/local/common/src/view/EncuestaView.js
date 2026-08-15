Ext.define('Common.view.EncuestaView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.encuestaview',    
    title: 'Border Layout',
    layout: 'border',
    items: [{
        xtype: 'moduletreeview', //implied by default
        title: 'Opciones',
        //store: 'SgAppMWStore',
        rootVisible: false, // solo para hacer pruebas debe estar en false
        collapsed: false,
        itemId: 'treewest',
        region: 'west',
        margins: '5 0 0 5',
        width: 250,
        collapsible: true,
        layout: 'fit',
        split: true
    },{
        //title: 'Center Region',
        xtype: 'tabpanel',
        region: 'center',     // center region is required, no width/height specified
        itemId: 'center',
        //xtype: 'panel',
        layout: 'fit',
        margins: '5 0 0 0'
    }]
});

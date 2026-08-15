//MIGRADO2024
Ext.define('Common.view.EventoView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.eventoview',    
    title: 'Border Layout',
    layout: 'border',
    items: [{
        xtype: 'moduletreeview', //implied by default
        title: 'Opciones',
        //store : 'SgAppMWStore',
        rootVisible: false, // solo para hacer pruebas debe estar en false
        width: 200,
        collapsed : false,
        itemId: 'treewest',
        region:'west',
        margins: '5 0 0 5',
        width: 200,
        collapsible: true,

        split: true
    },{
       // title: 'Center RegionXXXXX',
        xtype: 'tabpanel',
        region: 'center',     // center region is required, no width/height specified
        itemId: 'center',
        //xtype: 'panel',

        margins: '5 0 0 0'
    }]
});
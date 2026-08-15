//MIGRADO2024
Ext.define('Common.view.OrganizationView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.organizationview',    
    title: 'Border Layout',
    layout: 'border',
    items: [{
        xtype: 'moduletreeview', //implied by default
        title: 'Información de la Organización',
        store : 'Common.store.OrganizationModuleStore',
        itemId:'leftnav',
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
Ext.define('WebMG.view.OrganizationMGView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.organizationmgview',    
    title: 'Border Layout',
    layout: 'border',
    items: [{
        xtype: 'moduletreeview',
        title: 'Información del cliente',
        store : 'OrganizationMGModuleStore',
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

Ext.define('WebMG.view.OrganizationMGPROVView', {
    extend : 'WebMG.view.OrganizationMGView',
    alias : 'widget.organizationmgprovview',    
    title: 'Border Layout',
    layout: 'border',
    items: [{
        xtype: 'moduletreeview',
        title: 'Datos del proveedor',
        store : 'OrganizationMGPROVModuleStore',
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
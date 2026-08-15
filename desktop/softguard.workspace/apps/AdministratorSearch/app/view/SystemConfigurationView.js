Ext.define('AdministratorSearch.view.SystemConfigurationView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.systemconfigurationview',    
    layout: 'border',
    items: [{
        xtype: 'moduletreeview', //implied by default
        title: getLocale('Configuracion del sistema'),
        store : 'SystemConfigurationModuleStore',
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
        margins: '5 0 0 0',
        closeAll:true
    }],
    
    initComponent: function () {
        this.callParent();
        var moduletreeview = this.down('moduletreeview');
        
        moduletreeview.targetTab = this.down('tabpanel');
        moduletreeview.down('treeview').targetTab = moduletreeview.targetTab;
    }
});


Ext.define('AdministratorSearch.view.SystemTableView', {
    extend : 'AdministratorSearch.view.SystemConfigurationView',
    alias : 'widget.systemtablesview',    
    layout: 'border',
    items: [{
        xtype: 'moduletreeview', //implied by default
        title: 'Tablas del sistema',
        store : 'SystemTablesModuleStore',
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
    }],
    
    initComponent: function () {
        this.callParent();
        var moduletreeview = this.down('moduletreeview');
        
        moduletreeview.targetTab = this.down('tabpanel');
        moduletreeview.down('treeview').targetTab = moduletreeview.targetTab;
    }
});

Ext.define('AdministratorSearch.view.SystemParametersView', {
    extend : 'AdministratorSearch.view.SystemConfigurationView',
    alias : 'widget.systemparametersview',    
    layout: 'border',
    items: [{
        xtype: 'moduletreeview', //implied by default
        title: getLocale('Parametros del sistema'),
        store : 'SystemParametersModuleStore',
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
    }],
    
    initComponent: function () {
        this.callParent();
        var moduletreeview = this.down('moduletreeview');
        
        moduletreeview.targetTab = this.down('tabpanel');
        moduletreeview.down('treeview').targetTab = moduletreeview.targetTab;
    }
});
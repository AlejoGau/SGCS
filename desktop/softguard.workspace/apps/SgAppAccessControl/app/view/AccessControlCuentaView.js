Ext.define('SgAppAccessControl.view.AccessControlCuentaView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.accesscontrolcuentaview',    
    title: 'Border Layout',
    forceClose: false,
    layout: 'border',
    items: [{
         xtype: 'moduletreeview', //implied by default
        title: getLocale('Unidad Funcional'),
       // store : 'SmarttrackCuentaModuleStore',
        region:'west',
        margins: '5 0 0 5',
        width: 200,
        collapsible: true,
        layout: 'fit',
        split: true,
        itemId:'west',
        
    },{
        //title: 'Center Region',
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'cuentasaccesscontrol',
        layout: 'fit',
        margins: '5 0 0 0'
    }],
    
    // cierro items
    initComponent: function(){
        this.callParent();
        
        var moduletreeview = this.down('moduletreeview');
        
        moduletreeview.targetTab = this.down('#cuentasaccesscontrol');
        moduletreeview.down('treeview').targetTab = moduletreeview.targetTab;

    }
});
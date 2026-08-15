Ext.define('SgAppSerTec.view.SerTecView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.sertecview',    
    layout: 'border',
    items: [/*{
        xtype: 'moduletreeview', //implied by default
        title: 'Reportes',
        store : 'SerTecModuleStore',
        region:'west',
        margins: '5 0 0 5',
        width: 200,
        collapsible: true,
        layout: 'fit',
        split: true
    },*/{
        title: '',
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'center',
        layout: 'fit',
        margins: '5 0 0 0'
    }],
    
    initComponent: function () {
        this.callParent();
        //var moduletreeview ;//= this.down('moduletreeview');
        
        //moduletreeview.targetTab = this.down('tabpanel');
        //moduletreeview.down('treeview').targetTab = moduletreeview.targetTab;
    }
});
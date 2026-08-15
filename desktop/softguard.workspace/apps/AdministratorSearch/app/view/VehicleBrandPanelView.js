Ext.define('AdministratorSearch.view.VehicleBrandPanelView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.vehiclebrandpanelview',    
    layout: 'border',
    items: [{
        xtype: 'panel', //implied by default
     //  title: 'Datos',
        region:'west',
        margins: '5 0 0 5',
        width: 200,
        collapsible: true,
        layout: 'fit',
        split: true,
        items:[
            {
                xtype:'brandgridview'
            }
            ]
    },{
        //title: 'Center Region',
        xtype: 'tabpanel',
        region: 'center',
        itemId: 'center-brand',
        layout: 'fit',
        margins: '5 0 0 0'
    }],
    
    initComponent: function () {
        this.callParent();
        
        //moduletreeview.targetTab = this.down('tabpanel');
        //moduletreeview.down('treeview').targetTab = moduletreeview.targetTab;
    }
});
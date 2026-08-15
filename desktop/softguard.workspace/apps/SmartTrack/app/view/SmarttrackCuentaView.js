Ext.define('SmartTrack.view.SmarttrackCuentaView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.smartrackcuentaview',    
    title: 'Border Layout',
    forceClose: false,
    layout: 'border',
    items: [{
         xtype: 'moduletreeview', //implied by default
        title: getLocale('Objetivo'),
        store : {
            type: 'tree',
            root: {
                expanded: true,
                children: [] // Se llenará dinámicamente
            }
        },
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
        itemId: 'cuentassmarttrack',
        layout: 'fit',
        margins: '5 0 0 0'
    }],
    
    // cierro items
    initComponent: function(){
        this.callParent();
        
        var moduletreeview = this.down('moduletreeview');
        
        moduletreeview.targetTab = this.down('#cuentassmarttrack');
        moduletreeview.down('treeview').targetTab = moduletreeview.targetTab;

    }
});
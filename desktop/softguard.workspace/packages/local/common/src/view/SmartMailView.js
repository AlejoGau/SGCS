 
Ext.define('Common.view.SmartMailView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.smartmailview',    
    title: 'Border Layout',
    layout: 'border',
    items: [{
        xtype: 'moduletreeview', //implied by default
        title: 'SmartMail',
        //store : 'Common.store.SmartMailModuleStore',
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


Ext.define('iOT.view.iOTView',{
    extend: 'Ext.container.Container',
    alias: 'widget.iot',
    forceClose: false,
    layout: 'border',
    items: [
        {
            xtype: 'panel', //implied by default
            itemId: 'west',
            region:'west',
            margins: '5 0 0 5',
            width : 250,
            collapsible: true,
            layout: 'fit',
            split: true,
            items: [

            ]
        },        
        {
            xtype: 'tabpanel',
            fullscreen: true,
            region: 'center',
            itemId: 'center',
            layout: 'fit',
            margins: '5 0 0 0'
        }

    ],
    
    initComponent: function () {
        this.callParent();
    }
});

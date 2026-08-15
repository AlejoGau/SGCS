Ext.define('WebMG.view.iOTView',{
    extend: 'Ext.container.Container',
    alias: 'widget.webmg',
    forceClose: false,
    layout: 'border',
    items: [
        {

            xtype: 'moduletoolbar',
            region: 'north'
        },        
        {
            xtype: 'tabpanel',
            //fullscreen: true,
            region: 'center',
            itemId: 'center',
            layout : 'fit',
            margins: '5 0 0 0'
            
        }

    ],
    
    initComponent: function () {
        this.callParent();
    }
});

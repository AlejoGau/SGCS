//MIGRADO2024
Ext.define('Common.view.EventSmartpanicsLogView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.eventsmartpanicslogview',
    mute: false,
    layout : {
        type : 'fit'
    },
    tbar:[
        { 
            xtype: 'button',
            text : 'Descargar',
            iconCls : 'icon-attach',
            itemId:'logDownload'
        }
    ],
    items : [
        {
            xtype:'box',
            autoScroll:true,
            margin: '5 5 5 5',
            itemId: 'log'
        }
    ]
});
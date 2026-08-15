//MIGRADO2024
Ext.define('Common.view.EventosMonitorGridView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.eventosmonitorgridview',
    mute: false,
    layout : {
        type : 'hbox',
        align: 'stretch'
	},
	items : [
        
     /*Ext.create('Ext.ux.IFrame', {
        itemId: 'sound',
        height: 0,
        border : false
	})*/
    ],
    
    initComponent: function(){
        this.callParent();
        this.DSSSONIDO = getParametro('DSSSONIDO');
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    iconCls: 'icon-bell',
                    text: 'Eventos con voz',
                    enableToggle: true,
                    action: 'play',
                    itemId:'play',
                    pressed: true
                }
            ]
         }); 
        this.addDocked(toolbar);
    }
});
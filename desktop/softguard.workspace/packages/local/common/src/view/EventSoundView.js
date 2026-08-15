//MIGRADO2024
Ext.define('Common.view.EventSoundView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.eventsoundview',
    mute: false,
    layout : {
        type : 'vbox'
    },
	items : [
     
        
   
    ],
    
    initComponent: function () {
        
        this.callParent(arguments);     
        var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            displayInfo: true
        });
        this.addDocked(pagingtoolbar);
        
    
        
    } 
});
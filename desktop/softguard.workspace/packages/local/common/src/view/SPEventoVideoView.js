//MIGRADO2024
Ext.define('Common.view.SPEventoVideoView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.speventovideoview',
    mute: false,
    autoScroll: true,
    /*VOLVER ATRAS layout : {
        type : 'vbox'
    },*/
    items : [
     
        
   
    ],
    
    initComponent: function () {
        
        this.callParent(arguments);     
        
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
               items: [
                ]
             }); 
         this.addDocked(toolbar);
        
    } 
});
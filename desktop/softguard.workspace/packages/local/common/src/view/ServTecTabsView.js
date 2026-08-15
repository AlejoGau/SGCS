//MIGRADO2024
Ext.define('Common.view.ServTecTabsView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.sertectabsview'],
    title : 'SmartPanic',
    preventHeader: true,
    layout: 'anchor',
    autoScroll: true,    
    fieldDefaults : {
        labelWidth : 150,
        anchor : '100%',
        labelAlign: 'left'  
        
    },
    bodyPadding :0,
    items : [
        {
                xtype: 'tabpanel',
                resizeTabs: true,
                enableTabScroll: true,
        		deferredRender: false,
    			layoutOnTabChange: true,
                flex:1,
                itemId: 'tabhijas',
                height:'100%'
        }        
    ],
    initComponent : function() {
        this.callParent();
        
        
        // agrego la toolbar
         var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                 
            ]// cierro items
         }); 
         this.addDocked(toolbar);
       
    } // cierro init
});
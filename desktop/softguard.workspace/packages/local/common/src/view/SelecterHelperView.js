//MIGRADO2024
Ext.define('Common.view.SelecterHelperView', {
    extend : 'Ext.form.Panel',
    alias : 'widget.selecterhelperview',
    title : '',
    ignoreDirty: true,
    autoHeight : true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
   
    bodyStyle: {
        background: '#efefef'
    },
    items : [
    ],
    
    
    
    initComponent: function () {
        this.callParent(arguments);
        //this.addEvents('selectedEvents');      
        console.log(this)
        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    xtype: 'button',
                    text:'Listo',
                    iconCls: 'icon-accept',               
                    itemId:'listo'
                }
            ]// cierro items
         }); 
         this.addDocked(toolbar);
         console.log("initComponent")
         var pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            itemId: 'pagingtoolbar',
            displayInfo: true
        });
         this.addDocked(pagingtoolbar);
    } // cierro init
});
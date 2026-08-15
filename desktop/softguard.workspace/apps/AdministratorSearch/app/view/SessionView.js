Ext.define('AdministratorSearch.view.SessionView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.sessionview',
    layout : {
        type : 'hbox',
        align: 'stretch'
    },
    items : [
        {
            xtype: 'uxiframe',
            itemId: 'Iframe',
            height: 0,
            border : false,
            width:'100%'
        }
    ],
    
    initComponent: function(){

        this.callParent();
       
         
           var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text: 'Actualizar',
                    iconCls : 'x-tbar-loading',
                    itemId: 'refresh'
                }
            ]// cierro items
         }); 



        this.addDocked(toolbar);
    }
});
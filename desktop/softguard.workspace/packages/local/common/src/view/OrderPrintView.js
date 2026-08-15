Ext.define('Common.view.OrderPrintView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.orderprintview',
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
            width:'100%',
            name:'name-iframe'
        }
    ],
    
    initComponent: function(){

        this.callParent();
       
         
           var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text: 'Imprimir',
                    iconCls : 'icon-printer',
                    handler: function(button){
                        var iframe = button.up('orderprintview').down('#Iframe');
                        var ele = iframe.getEl();
                        
                        //document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                        iframe.iframeEl.dom.contentWindow.printMe();
                        //target.getFrame().contentDocument.body.getFrame().contentDocument.body.
                        
                    }
                }
            ]// cierro items
         }); 



        this.addDocked(toolbar);
    }
});
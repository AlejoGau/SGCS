Ext.define('WebMG.view.FacturaPrintView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.facturaprintview',
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

    tryPrintIframe: function(){
        var iframe = this.down('#Iframe');
        var frameWindow = iframe && iframe.getWin && iframe.getWin();

        if (!frameWindow) {
            return false;
        }

        if (typeof frameWindow.printMe === 'function') {
            frameWindow.printMe();
            return true;
        }

        return false;
    },

    queuePrintOnLoad: function(){
        var iframe = this.down('#Iframe');

        if (!iframe || !iframe.on || iframe.pendingPrintOnLoad) {
            return;
        }

        iframe.pendingPrintOnLoad = true;
        iframe.on('load', function(frame){
            frame.pendingPrintOnLoad = false;

            var frameWindow = frame && frame.getWin && frame.getWin();
            if (!frameWindow) {
                return;
            }

            if (typeof frameWindow.printMe === 'function') {
                frameWindow.printMe();
                return;
            }

            if (typeof frameWindow.print === 'function') {
                frameWindow.print();
            }
        }, null, { single: true });
    },
    
    initComponent: function(){
        this.callParent();

        var toolbar = Ext.create('Ext.toolbar.Toolbar', { 
            items: [
                {
                    text: 'Imprimir',
                    iconCls : 'icon-printer',
                    handler: function(button){
                        var view = button.up('facturaprintview');

                        if (!view.tryPrintIframe()) {
                            view.queuePrintOnLoad();
                        }
                    }
                },{
                    text: 'Enviar',
                    iconCls : 'icon-email',
                    action: 'print'
                }
            ]
        }); 

        this.addDocked(toolbar);
    }
});
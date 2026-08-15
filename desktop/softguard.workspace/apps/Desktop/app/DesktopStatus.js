Ext.define('Desktop.DesktopStatus', {
    extend: 'Ext.form.Panel',

    alias: 'widget.desktopstatus',

    cls: 'ux-desktop-desktopstatus',

    html: '&#160;',

    frame: false,
    border: false,
    bodyStyle: 'background:transparent;',
    
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    
    items:[{
        xtype: 'container',
        layout: 'vbox',
        margin: '0 30px 0 0',
        items : [{
            xtype: 'button',
            itemId: 'messages',
            cls: 'ux-desktop-status',
            text: 'Mensajes',
            width : 180,
            handler: function(btn){
                var view = btn.up('desktopstatus');
                view.fireEvent('showMessages');
            }
        },{
            xtype: 'button',
            itemId: 'alerts',
            cls: 'ux-desktop-status',
            text: 'Alertas',
            hidden:true,
            width : 180,
            margin:'15px 0 0 0',
            handler: function(btn){
                var view = btn.up('desktopstatus');
                view.fireEvent('showAlerts');
            }
        }]
    }],

    initComponent: function () {
        var me = this;
        me.callParent();        
        if (desktopData.isAdmin){
            me.down('#alerts').show();
        }
    }
    ,
    afterRender: function () {
        var me = this;
        
        me.callParent();
        if ((typeof window.orientation !== "undefined") 
                || (navigator.userAgent.indexOf('IEMobile') !== -1)) {        
            me.down('#messages').hide();
            me.down('#alerts').hide();
        }
    }    
});

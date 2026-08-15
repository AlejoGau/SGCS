Ext.define('Desktop.Message6Window', {
    extend: 'Ext.window.Window',

    layout: 'fit',
    modal: false,
    width: 800,
    height:400,
    border: false,
    autoScroll: true,
    items: [{
        xtype: 'Desktopmessagegridview'
    }],
    
    initComponent: function () {
        this.title = getLocale('Mensajes');
        this.callParent();
    }

});
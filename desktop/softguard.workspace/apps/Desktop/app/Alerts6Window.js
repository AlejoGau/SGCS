Ext.define('Desktop.Alerts6Window', {
    extend: 'Ext.window.Window',

    layout: 'fit',
    modal: false,
    width: 800,
    height:400,
    border: false,
    autoScroll: true,
    items: [{
        xtype: 'systemtest6gridview'
    }],
    
    initComponent: function () {
        this.title = getLocale('Alertas');
        this.callParent();
    }

});
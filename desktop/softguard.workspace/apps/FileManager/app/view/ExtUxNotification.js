Ext.define('FileManager.view.ExtUxNotification', {
    extend: 'Ext.window.Window',
    alias: ['widget.uxNotification'],

    autoDestroy: true,
    autoHeight: true,
    cls: 'ux-notification-window',

    initComponent: function () {
        this.callParent(arguments);
    }
});
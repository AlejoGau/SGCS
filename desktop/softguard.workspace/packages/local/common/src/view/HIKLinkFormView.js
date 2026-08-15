//MIGRADO2024
Ext.define('Common.view.HIKLinkFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.hiklinkformview'], 
    items : [
        {xtype: 'textfield', labelWidth: 100,fieldLabel: 'Uri', name: '_uri', allowBlank: false},
        {xtype: 'numberfield', labelWidth: 100, fieldLabel: 'Port', name: '_port',maxValue: 65535, allowBlank: false},
        {xtype: 'textfield', labelWidth: 100, fieldLabel: 'Usuario', name: '_user', allowBlank: false},
        {xtype: 'textfield', labelWidth: 100, fieldLabel: 'Clave', name: '_password', inputType: 'password', allowBlank: false},
        {xtype: 'numberfield', labelWidth: 100, fieldLabel: 'Cámara', maxValue: 128,name: '_camara', allowBlank: false},
        {xtype: 'hiddenfield', labelWidth: 100, name: 'gridConfig', itemId: 'gridconfig'},
        {
            xtype:'button',
            text:'Grid',
            handler: function (button) {
                var view = button.up('hiklinkformview');
                var win = Ext.create('Ext.window.Window', {
                    title: 'GRID HIK',
                    height: 500,
                    width: 600,
                    closeAction: 'destroy',
                    layout: 'fit',
                    items: {  
                        xtype: 'hiklinkgridview',
                        record: view.up('form').getRecord(),
                        callerParent:view.caller,
                        caller: view 
                    }
                }).show(); 
            }
        }  
    ]
});
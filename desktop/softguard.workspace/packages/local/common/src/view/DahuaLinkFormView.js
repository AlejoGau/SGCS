//MIGRADO2024
Ext.define('Common.view.DahuaLinkFormView', {
    extend : 'Ext.form.Panel',
    alias : ['widget.dahualinkformview'], 
    items:[{xtype: 'textfield', fieldLabel: 'Uri', name: '_uri',allowBlank: false},
    	   {xtype: 'numberfield', fieldLabel: 'Port', name: '_port',maxValue: 65535,minValue: 1},
		   {xtype: 'textfield', fieldLabel: 'Usuario', name: '_user',allowBlank: false},
		   {xtype: 'textfield', fieldLabel: 'Clave', name: '_password',inputType:'Password',allowBlank: false},
		   {xtype: 'numberfield', fieldLabel: 'Cámara', name: '_camara',maxValue: 128,minValue: 0},
		   {xtype: 'combobox', fieldLabel: 'Subtipo', name: '_subtype',store:[[0,'Main Stream'],[1,'Sub Stream']], value:0},
		   {xtype: 'hiddenfield', labelWidth: 100, name: 'gridConfig', itemId: 'gridconfig'},
        {
            xtype:'button',
            text:'Grid',
            handler: function (button) {
                var view = button.up('dahualinkformview');
                var win = Ext.create('Ext.window.Window', {
                    title: 'GRID DAHUA',
                    height: 500,
                    width: 600,
                    closeAction: 'destroy',
                    layout: 'fit',
                    items: {  
                        xtype: 'dahualinkgridview',
                        record: view.up('form').getRecord(),
                        callerParent:view.caller,
                        caller: view 
                    }
                }).show(); 
            }
        }  
	]
});
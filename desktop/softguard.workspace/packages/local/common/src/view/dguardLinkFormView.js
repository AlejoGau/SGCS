//MIGRADO2024
Ext.define('Common.view.dguardLinkFormView', {
    extend : 'Ext.container.Container',
    alias : ['widget.dguardlinkformview'], 
    items : [
        {xtype: 'textfield', fieldLabel: 'Uri', name: '_uri', width:'100%',
            labelWidth:50, allowBlank: false},
        {xtype: 'numberfield', fieldLabel: 'Port', name: '_port', width:'100%',
            minValue: 1,
            labelWidth:50, allowBlank: false},
        {xtype: 'textfield', fieldLabel: 'Usuario', name: '_user', width:'100%',
            labelWidth:50, allowBlank: false},
        {xtype: 'textfield', fieldLabel: 'Clave', name: '_password', inputType: 'password', width:'100%',
            labelWidth:50, allowBlank: false},
        {xtype: 'textfield', fieldLabel: 'Cámara', name: '_camara', width:'100%',
            labelWidth:50, allowBlank: false},
        {xtype: 'textfield', fieldLabel: 'Layout', name: '_layout', width:'100%',labelWidth:50, allowBlank: false},
        {
            xtype : 'numberfield',
    		fieldLabel : 'Monitor',
            name: '_monitor',
            value: 1,
            labelWidth:50,
			minValue: 1,
            maxValue: 2,
            width:'100%'
		},
        {xtype: 'hiddenfield', name: 'gridConfig', itemId: 'gridconfig'},
        {
            xtype:'button',
            text:'Grid',
            itemId:'vistas',
            handler: function (button) {
                var view = button.up('dguardlinkformview');
                var win = Ext.create('Ext.window.Window', {
                    title: 'GRID',
                    height: 500,
                    width: 600,
                    closeAction: 'destroy',
                    layout: 'fit',
                    
                    items: {  
                        xtype: 'videolinkgridview',
                        record: view.up('form').getRecord(),
                        caller: view,
                        callerParent:view.caller,
                    }
                }).show(); 
            }
        }  
    ]
});
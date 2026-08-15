Ext.define('IPRSManager.view.WebSocketTestView', {
    extend : 'Ext.panel.Panel',
    alias : ['widget.websockettestview'],
    layout: 'anchor',
	items : [{
            xtype: 'panel' ,
        	title: 'Conección' ,
    		itemId: 'connection' ,
            items: [
                {
                	xtype: 'textfield' ,
            		width: '400' ,
                    itemId: 'url',
            		fieldLabel: 'URL',
                    value:'wss://gcs.softguard.com:9001'
            	}
            ],
            
			dockedItems: {
				xtype: 'toolbar' ,
				dock: 'top' ,
				defaults: {
					xtype: 'button'
				} ,
				items: [{
					// Registers to Ext.ux.WebSocketManager
					text: 'Register' ,
					action: 'register'
				} , {
					text: 'Close' ,
					action:'close'
				}]
			}
	    },
        {
    		xtype: 'panel' ,
    		title: 'Datos' ,
    		itemId: 'stream' ,
    		layout: {
    			type: 'vbox' ,
    			align: 'stretch'
    		},
            items:[
                {
    			    xtype: 'textarea' ,
    				itemId: 'rx',
                    labelAlign: 'top' ,
        			fieldLabel: 'Mensajes recibidos' ,
    				anchor: '100%'
    			} , {
    				xtype: 'textarea' ,
                    itemId: 'tx',
    				labelAlign: 'top' ,
    				fieldLabel: 'Enviar mensaje' ,
    				anchor: '100%'
    			}] ,
    			
    			buttons: [{
    				text: 'Send' ,
    				action: 'send'
    			}
    	    ] 
    	}
    ]
    
});
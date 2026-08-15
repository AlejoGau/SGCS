Ext.define('IPRSManager.controller.WebSocketTestController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'WebSocketTestView' ],

    init : function(config) {
    	this.control({
			'websockettestview' : {
				afterrender : this.initview,
                
			},
    		'websockettestview button[action="register"]' : {
				click : this.onRegisterClick
			},
        	'websockettestview button[action="send"]' : {
				click : this.onSendClick
			}
        });
	},
    
	initview : function(view) {
        
          
	},
    
    onSendClick: function(button, event, options) {
        var view = button.up('websockettestview');
        var tx = view.down('#tx');
        var ws = view.ws;
        
        ws.send(tx.getValue());
    },
    
    
    onRegisterClick : function(button, event, options) {
        var view = button.up('websockettestview');
        var urlfield = view.down('#url');
        
        var url = urlfield.getValue();
        var rx = view.down('#rx');
        view.ws = Ext.create ('websocket', {
    		url: url ,
			listeners: {
				open: function (ws) {
					rx.setValue(rx.getValue() + '> WebSocket just open!\r\n');
				} ,
				message: function (ws, data) {
					rx.setValue(rx.getValue() +  data + '\r\n');
				} ,
				close: function (ws) {
					
				}
			}
		});
    }
    
    //btn.up('panel').ws.send(btn.up('panel').down('textarea').getValue());
});
//MIGRADO2024
Ext.define('Common.controller.PasswordFormController', {
    extend : 'Ext.app.Controller',
	stores : [  ],
	models : [  ],
	views : [ 'PasswordFormView' ],
	init : function(config) {
		// genero los eventos
		this.control({
			'passwordformview button[action="save"]' : {
				click : this.saveObject
			},
            'passwordformview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'passwordformview' : {
                beforerender : this.initview
			}
		});
	}, // cierro init
	initview : function(myview) {
        //var myform = myview.getForm();
        //myform.loadRecord(myview.record);
	},
	saveObject : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var form = button.up('form').getForm();
        
        if (form.isValid()){
            var view = button.up('passwordformview');
            var win =  button.up('window');
            var pass1 = form.findField('pass1');
            var pass2 = form.findField('pass2');
            
            var value1 = pass1.getRawValue();
            var value2 = pass2.getRawValue();
    
            if (value1 == value2){
                win.caller.fireEvent('passwordchanged', value1, win, view.caller);
                win.close();
            } else {
                pass2.markInvalid('Las claves deben ser iguales');
            }
        }
        
        
	},
    
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        myWin.close();
    }
});
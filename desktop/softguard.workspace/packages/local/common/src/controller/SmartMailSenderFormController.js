//MIGRADO2024
Ext.define('Common.controller.SmartMailSenderFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SmartMailSenderModel' ],
    views : [ 'SmartMailSenderFormView' ],
    init : function(config) {
        // genero los eventos
        this.control({
					'smartmailsenderformview' : {
						beforerender : this.initview
					},
					'smartmailsenderformview button[action="save"]' : {
						click : this.onSaveClick
					},
    				'smartmailsenderformview #puerto' : {
    					change : this.onPuertoChange
					},
                });
	}, // cierro init
	initview : function(view) {
        
        view.loadRecord(view.record);
	
	},
    
    
    onPuertoChange: function (field, newVal, oldVal) {
        
        var seteoField =  field.up('form').down('#seteo');
        if(newVal >= 1 && newVal <= 15) {
            seteoField.setValue('57600,N,8,1');
            
        } else {
            seteoField.setValue('');
        }
        
        
    },
	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('smartmailsenderformview');
        var win = button.up('window');
		var record = myform.getRecord();
		myform.updateRecord(record);
        
      
        if (myform.isValid()){
    		record.save({
    			scope : this,
               
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                        view.close();
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			},
    			button : button
    		});
        }
	}
});
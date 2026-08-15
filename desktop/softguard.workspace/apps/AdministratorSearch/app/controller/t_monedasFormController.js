Ext.define('AdministratorSearch.controller.t_monedasFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_monedasModel' ],
    views : [ 't_monedasFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
        	't_monedasformview' : {
				beforerender : this.initview,
                selectedEvents: this.eventsSelected
			},
			't_monedasformview button[action="save"]' : {
				click : this.onSaveClick
			}
			
        });
	}, // cierro init
  

	initview : function(view) {
        var controller = this;
      
        view.loadRecord(view.record);
        
      
	},

    
	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('t_monedasformview');
        var win = button.up('window');
		var record = myform.getRecord();


		myform.updateRecord(record);
        
        
        var model = this.getT_monedasModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });
        
        if (myform.isValid()){
            
           
    		record.save({
    			scope : this,
               
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                        win.close();
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			},
    			button : button
    		});
        }
	}
});
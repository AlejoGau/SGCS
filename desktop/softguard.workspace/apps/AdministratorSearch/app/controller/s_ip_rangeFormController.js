Ext.define('AdministratorSearch.controller.s_ip_rangeFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'SiNoStore' ],
    models : [ 's_ip_rangeModel' ],
    views : [ 's_ip_rangeFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
                    's_ip_rangeformview' : {
						beforerender : this.initview,
                        selectedEvents: this.eventsSelected
					},
					's_ip_rangeformview button[action="save"]' : {
						click : this.onSaveClick
					}
    				
                });
	}, // cierro init
   


   

	initview : function(view) {
        view.loadRecord(view.record);
	},

    
	onSaveClick : function(button, event, options) {
	
		var myform = button.up('form').getForm();
        var view = button.up('s_ip_rangeformview');
        var win = button.up('window');
		var record = myform.getRecord();


		myform.updateRecord(record);
        
        
        var model = this.getS_ip_rangeModelModel();
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
                        if (win){win.close();}
                        
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			},
    			button : button
    		});
        }

	}
    
   

	
   
});
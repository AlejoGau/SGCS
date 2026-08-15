Ext.define('AdministratorSearch.controller.T_SimCard_APNFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'T_SimCard_APNModel' ],
    views : [ 'T_SimCard_APNFormView' ],

    init : function(config) {
        // genero los eventos

    	this.control({
					't_simcard_apnformview' : {
						beforerender : this.initview
					},
					't_simcard_apnformview button[action="save"]' : {
						click : this.onSaveClick
					},
    				
                });
	}, // cierro init

	initview : function(view) {


        view.loadRecord(view.record);

	
	},


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		
        var view = button.up('t_simcard_apnformview');
		var myform = button.up('form').getForm();
        var win = button.up('window');
		var record = view.getForm().getRecord();

		// var atd_iPideVto = view.down('#atd_iPideVto').getValue();
		// var atd_iUploadFile = view.down('#atd_iUploadFile').getValue()

		myform.updateRecord(record);

		
      	
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

	},
    
   

	
   
});
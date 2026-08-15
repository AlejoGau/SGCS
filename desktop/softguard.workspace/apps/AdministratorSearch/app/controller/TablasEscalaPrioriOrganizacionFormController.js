Ext.define('AdministratorSearch.controller.TablasEscalaPrioriOrganizacionFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_escalamientoprioridadesorganizacionModel' ],
    views : [ 'TablasEscalaPrioriOrganizacionFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
    				'tablasescalamientoprioridadesorganizacionesformview' : {
						beforerender : this.initview
					},
					'tablasescalamientoprioridadesorganizacionesformview button[action="save"]' : {
						click : this.onSaveClick
					}
    				
                });
	}, // cierro init

	initview : function(view) {
        
        view.loadRecord(view.record);
	
	},


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('tablasescalamientoprioridadesorganizacionesformview');
        var win = button.up('window');
		var record = myform.getRecord();


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

	}
    
   

	
   
});
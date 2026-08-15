Ext.define('AdministratorSearch.controller.TablasAccesosCategoriaProveedorFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'TablasAccesosCategoriaProveedorFormView' ],

    init : function(config) {
        // genero los eventos

    	this.control({
					'tablasaccesoscategoriaproveedorformview' : {
						beforerender : this.initview
					},
					'tablasaccesoscategoriaproveedorformview button[action="save"]' : {
						click : this.onSaveClick
					},
    				
                });
	}, // cierro init

	initview : function(view) {
		
		//view.record.set('atd_iPideVto',1);
		//view.record.set('atd_iPideVto',atd_iPideVto);
		view.record.setDirty();

        view.loadRecord(view.record);

	
	},


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		
        var view = button.up('tablasaccesoscategoriaproveedorformview');
		var myform = button.up('form').getForm();
        var win = button.up('window');
		var record = view.getForm().getRecord();


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
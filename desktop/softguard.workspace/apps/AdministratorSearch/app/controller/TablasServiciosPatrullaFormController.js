Ext.define('AdministratorSearch.controller.TablasServiciosPatrullaFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasServiciosPatrullaModel' ],
    views : [ 'TablasServiciosPatrullaFormView' ],

    init : function(config) {
        // genero los eventos

    	this.control({
					'tablasserviciospatrullaformview' : {
						beforerender : this.initview
					},
					'tablasserviciospatrullaformview button[action="save"]' : {
						click : this.onSaveClick
					},
                    'tablasserviciospatrullaformview #pathicon' : {
            			change : this.onIconChange
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
        var view = button.up('tablasserviciospatrullaformview');
        var win = button.up('window');
		var record = myform.getRecord();

        if (myform.isValid()){
    		myform.updateRecord(record);
            
          
    
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

    onIconChange : function(combo, value, old, options) {
        var view = combo.up('tablasserviciospatrullaformview');
        var imagen = view.down('#imagen');
        
        if (value){
            imagen.setSrc('/gallery/'+value);
            imagen.show();
        }
         
    }
    
   

	
   
});
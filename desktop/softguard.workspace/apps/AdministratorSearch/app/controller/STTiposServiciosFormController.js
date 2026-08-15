Ext.define('AdministratorSearch.controller.STTiposServiciosFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'tip_ntipoStore' ],
    models : [ 'TipoServicioModel', 'TipoServicioSearchModel' ],
    views : [ 'STTiposServiciosFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
					'sttiposserviciosformview' : {
						beforerender : this.initview
					},
					'sttiposserviciosformview button[action="save"]' : {
						click : this.onSaveClick
					},
                    'sttiposserviciosformview #tiposervicio':{
                        change: this.onTipoServicioChange
                    }
    				
                });
	}, // cierro init

	initview : function(view) {
        
        view.loadRecord(view.record);
	
	},
    onTipoServicioChange: function(field, newValue, oldValue, options){
        
        var campo = field.up('sttiposserviciosformview').down('#dias');
        if(newValue == 2) {            
        	campo.show();
        } /*else {
            campo.hide();
        }*/    //comentado para que la opcion se vea en todo momento segun la tarea DS-759  
    },


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('sttiposserviciosformview');
        var win = button.up('window');
		var record = myform.getRecord();
        
        var model = this.getTipoServicioModelModel();
        
        record.setConfig({
            proxy: model.getProxy()
        });


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
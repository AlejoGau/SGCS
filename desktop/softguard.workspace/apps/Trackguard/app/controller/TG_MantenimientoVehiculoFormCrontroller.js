Ext.define('Trackguard.controller.TG_MantenimientoVehiculoFormCrontroller', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TG_MantenimientoHistoricoVehicularModel' ],
    views : [ 'TG_MantenimientoVehiculoFormView' ],

    init : function(config) {  // genero los eventos
        this.control({
    		'mantvehiculoformview' : {
				beforerender : this.initview
			},
			'mantvehiculoformview button[action="save"]' : {
				click : this.onSaveClick
			},
			
        });
	}, // cierro init


	initview : function(view) {  
        view.loadRecord(view.record);
        
        /* Armo el titulo del formulario en base al Servicio que se esta haciendio */
        var servicioLabel = view.down('#serviceLabel');
        servicioLabel = servicioLabel.setText(view.serviceName+' : '+view.serviceDescription)
        
        /* Actualizo el campo de Kilometraje por el actual del vehículo */
        var tgmh_iodometro = view.down('#tgmh_iodometro');
        tgmh_iodometro = tgmh_iodometro.setValue(view.odometer);
        
        /* Actualizo los campos ocultos con el dato del ServiceId y VehicleId */
        var tgmh_idservicio = view.down('#tgmh_idservicio');
        var tgmh_idispositivomovil = view.down('#tgmh_idispositivomovil');
        tgmh_idservicio = tgmh_idservicio.setValue(view.serviceId);
        tgmh_idispositivomovil = tgmh_idispositivomovil.setValue(view.vehicleId);
        
	},

	onSaveClick : function(button, event, options) {
        /* Obtengo el form y los datos del form dentro de la Window */
        var myform = button.up('form').getForm();
        var win = button.up('window');
        var view = button.up('mantvehiculoformview');
        var record = myform.getRecord();
        
        /* Obtengo los record de la view principal (datos del auto e ID Servicio) 
        var recordCaller = view.caller.record;
        
        var idservicioValor = recordCaller.get('tgms_idkey');
        record.set('tgmh_idservicio', idservicioValor);

        var idispositivomovilValor = recordCaller.get('OwnerId');
        record.set('tgmh_idispositivomovil', idispositivomovilValor);
        */
        
        
        
        /* Hago el Update de record segun lo que esta en el formulario */
		myform.updateRecord(record);
                
        /* Genero el Historico del vehiculo */
        var model = this.getTG_MantenimientoHistoricoVehicularModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });                
        /* Prueba de impresion */
        console.log(record);
        
        /**/
        if (myform.isValid()){
    		record.save({
    			scope : this,
                view: view,
    			callback : function(record, operation) {
                    if (operation.success) {
                        var win = view.up('window');           
                            notify('Los datos se guardaron correctamente');
                            view.caller.fireEvent('objectchanged', view.caller, record);
                        if (win) {
                            win.close();
                        }                        
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			},
    			button : button
    		});
        }
        

	}   

	
   
});
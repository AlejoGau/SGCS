//MIGRADO2024
Ext.define('Common.controller.TG_MantenimientoVehicularServiciosFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TG_MantenimientoVehicularServiciosModel' ],
    views : [ 'TG_MantenimientoVehicularServiciosFormView' ],
    init : function(config) {  // genero los eventos
        this.control({
			'mantvehicularserviciosformview' : {
				beforerender : this.initview
			},
			'mantvehicularserviciosformview button[action="save"]' : {
				click : this.onSaveClick
			},
			
        });
	}, // cierro init
	initview : function(view) {
        view.loadRecord(view.record);
        
        /* Guardo el ID de Organizacion en el campo oculto */
        view.down('#organizacion').setValue(this.application.UserData.Company);
        
	},
	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
        var myform = button.up('form').getForm();
        var view = button.up('mantvehicularserviciosformview');
        var win = button.up('window');
    	var record = myform.getRecord();
		myform.updateRecord(record);
        
        
        var model = this.getTG_MantenimientoVehicularServiciosModelModel();
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
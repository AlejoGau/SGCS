Ext.define('AdministratorSearch.controller.AdministradorTareasFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'AdministratorTareasEstadoStore' ],
    models : [ 'TaskStatusModel' ],
    views : [ 'AdministradorTareasFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
			'administradortareasformview' : {
				beforerender : this.initview
			},
			'administradortareasformview button[action="save"]' : {
				click : this.onSaveClick
			}
			
		});
	}, // cierro init

	initview : function(view) {
        console.log(view.record);
        view.loadRecord(view.record);
	
	},


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('administradortareasformview');
        var win = button.up('window');
		var record = myform.getRecord();


		myform.updateRecord(record);
        
      

		record.save({
			scope : this,
           
            view: view,
			callback : function(record, operation) {
                if (operation.success){
                    notify('Los datos se guardaron correctamente');
                    
                    win.close();
                } else {
                    notifyError('Hubo un error al guardar los datos');
                }
                
			},
			button : button
		});

	}
   
});
Ext.define('AdministratorSearch.controller.TablasTecnicosFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TecnicosModel' ],
    views : [ 'TablasTecnicosFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
					'tablastecnicosformview' : {
						beforerender : this.initview
					},
					'tablastecnicosformview button[action="save"]' : {
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
        var view = button.up('tablastecnicosformview');
        var win = button.up('window');
		var record = myform.getRecord();

        

		myform.updateRecord(record);
        console.log()
        
        var model = this.getTecnicosModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });
      
        record.set('tec_ningreso',view.down('#ingreso').getValue()?1:0);
        record.set('tec_negreso',view.down('#egreso').getValue()?1:0);
        record.set('tec_nestado',view.down('#disponible').getValue()?1:0);
        
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
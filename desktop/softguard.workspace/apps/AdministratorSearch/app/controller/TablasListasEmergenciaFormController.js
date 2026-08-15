Ext.define('AdministratorSearch.controller.TablasListasEmergenciaFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasListasEmergenciaModel' ],
    views : [ 'TablasListasEmergenciaFormView' ],

    init : function(config) {
        // genero los eventos

    	this.control({
					'tablaslistasemergenciaformview' : {
						beforerender : this.initview
					},
					'tablaslistasemergenciaformview button[action="save"]' : {
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
		var myform = button.up('form').getForm();
        var view = button.up('tablaslistasemergenciaformview');
        var win = button.up('window');
		var record = myform.getRecord();
		
		if(record.data.lis_ccodigo == 0){
			record.id = 0;
			record.data.Id = 0;
		}
		

		myform.updateRecord(record);
        
        record.set('lis_ccodigo',Ext.String.leftPad(parseInt(record.get('lis_ccodigo')), 3, '0'));
        
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
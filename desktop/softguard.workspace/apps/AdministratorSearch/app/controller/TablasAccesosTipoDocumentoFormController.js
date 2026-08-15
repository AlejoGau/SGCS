Ext.define('AdministratorSearch.controller.TablasAccesosTipoDocumentoFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasAccesosTipoDocumentoModel' ],
    views : [ 'TablasAccesosTipoDocumentoFormView' ],

    init : function(config) {
        // genero los eventos

    	this.control({
					'tablasaccesostipodocumentoformview' : {
						beforerender : this.initview
					},
					'tablasaccesostipodocumentoformview button[action="save"]' : {
						click : this.onSaveClick
					},
    				
                });
	}, // cierro init

	initview : function(view) {
		var atd_iPideVto=view.record.get('atd_iPideVto');
		//view.record.set('atd_iPideVto',1);
		//view.record.set('atd_iPideVto',atd_iPideVto);
		view.record.setDirty();

        view.loadRecord(view.record);

	
	},


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		
        var view = button.up('tablasaccesostipodocumentoformview');
		var myform = button.up('form').getForm();
        var win = button.up('window');
		var record = view.getForm().getRecord();

		var atd_iPideVto = view.down('#atd_iPideVto').getValue();
		var atd_iUploadFile = view.down('#atd_iUploadFile').getValue()

		myform.updateRecord(record);
		if(atd_iPideVto)
        	record.set('atd_iPideVto',1);
		else
			record.set('atd_iPideVto',0);	
		if(atd_iUploadFile)	
			record.set('atd_iUploadFile',1);
		else
			record.set('atd_iUploadFile',0);	
		
      	
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
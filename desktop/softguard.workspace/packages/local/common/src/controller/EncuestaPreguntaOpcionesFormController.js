//MIGRADO2024
Ext.define('Common.controller.EncuestaPreguntaOpcionesFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'EncuestaPreguntaOpcionesFormView' ],
    init : function(config) {
        // genero los eventos
        this.control({
            		'encuestaspreguntaopcionesformview' : {
						beforerender : this.initview
					},
					'encuestaspreguntaopcionesformview button[action="save"]' : {
						click : this.onSaveClick
					},
    				'encuestaspreguntaopcionesformview #epg_tipo' : {
						change : this.onTipoChange
					},
        		
                    
                    
    				
                });
	}, // cierro init
    
 
    
    
    onTipoChange: function (combo, value) {
        var view = combo.up('encuestaspreguntaopcionesformview')  
        view.down('#opcionesMultiples').show()
        
    },
	initview : function(view) {
        view.loadRecord(view.record);
        
        
	},
    
	onSaveClick : function(button, event, options) {
		var myform = button.up('form').getForm();
        var view = button.up('encuestaspreguntaopcionesformview');        
		var record = myform.getRecord();
    	var controller = this
		myform.updateRecord(record);
              
        if (myform.isValid()){            
    		record.save({
    			callback : function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        notify('Los datos se guardaron correctamente');
                       
                       //comente el fireevent por que no lo pude hacer andar                       
                        view.caller.fireEvent('refreshopciones',view.caller,record);
                        view.loadRecord(record);
                        win.close()
                      
                        
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			}
    		});
        }
	},
    
	
   
});
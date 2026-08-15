//MIGRADO2024
Ext.define('Common.controller.SmartMailTemplateTextareaController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SmartMailTemplateModel' ],
    views : [ 'SmartMailTemplateTextareaView' ],
    init : function(config) {
        // genero los eventos
		this.control({
					'smartmailtemplatetextareaview' : {
						beforerender : this.initview,
                                       
					},
    				'smartmailtemplatetextareaview button[action="bundlesave"]' : {
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
        var view = button.up('smartmailtemplatetextareaview');
        var win = button.up('window');
    	var record = myform.getRecord();
    
    	myform.updateRecord(record);
    
    	record.save({
    		scope : this,
            win: win,
            view: view,
    		callback : function(record, operation) {
                if (operation.success){
                    notify('Los datos se cuardaron correctamente');
                  
                    var view = operation.view;
                    if (view){
                        view.fireEvent('objectchanged',operation);
                        
                        
                    }
                    else {console.log(view);}
                } else {
                    notifyError('Hubo un error al guardar los datos');
                }
                
    		},
    		button : button
	    });
    }
    
  
    
   
});
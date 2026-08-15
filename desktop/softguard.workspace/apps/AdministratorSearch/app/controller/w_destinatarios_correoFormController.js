Ext.define('AdministratorSearch.controller.w_destinatarios_correoFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'w_destinatarios_correoModel' ],
    views : [ 'w_destinatarios_correoFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
            'w_destinatarios_correoformview' : {
                afterrender : this.initview
            },
            'w_destinatarios_correoformview button[action="save"]' : {
                click : this.onSaveClick
            }
            
        });
	}, // cierro init

	initview : function(view) {
        view.loadRecord(view.record);
	},
    
	onSaveClick : function(button, event, options) {
		var myform = button.up('form').getForm();
        var view = button.up('w_destinatarios_correoformview');
        var win = button.up('window');
		var record = myform.getRecord();

		myform.updateRecord(record);

        var model = this.getW_destinatarios_correoModelModel();
        
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
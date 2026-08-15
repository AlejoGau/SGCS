Ext.define('SmartTrack.controller.RoutesProgramFormWizarController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'RoutesProgramModel' ],
    views : [ 'RoutesProgramFormWizarView' ],

    init : function(config) {
        // genero los eventos

        this.control({
        			'routesprogramformwizarview' : {
						beforerender : this.initview
					},
					'routesprogramformwizarview button[action="save"]' : {
						click : this.onSaveClick
					}
    				
                });
	}, // cierro init

	initview : function(view) {
        var controller = this;
	    view.loadRecord(view.record);
	},


	onSaveClick : function(button, event, options) {
		var myform = button.up('form').getForm();
        var view = button.up('routesprogramformwizarview');
		var record = myform.getRecord();

        var model = this.getRoutesProgramModelModel();        
        record.setProxy(model.getProxy());
		myform.updateRecord(record);

        if (myform.isValid()){
    	/*	record.save({
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
    		});*/
        }

	}

});
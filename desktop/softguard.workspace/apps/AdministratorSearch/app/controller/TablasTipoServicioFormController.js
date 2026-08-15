Ext.define('AdministratorSearch.controller.TablasTipoServicioFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'ActivadoDesactivadoStore' ],
    models : [  ],
    views : [ 'TablasTipoServicioFormView' ],

    init : function(config) {
        this.control({
					'tablastiposervicioformview' : {
						beforerender : this.initview
					},
					'tablastiposervicioformview button[action="save"]' : {
						click : this.onSaveClick
					},
                });
	},

	initview : function(view) {
        view.loadRecord(view.record);
        if (view.record.data.Id == 0){
            var comboEstado = view.down('#comboEstado');
            comboEstado.setValue(1);
        }
	},


	onSaveClick : function(button, event, options) {
		var myform = button.up('form').getForm();
        var view = button.up('tablastiposervicioformview');
        var win = button.up('window');
		var record = myform.getRecord();
		myform.updateRecord(record);
        
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
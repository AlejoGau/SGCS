Ext.define('AdministratorSearch.controller.ComoNosConocioFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TaxonomyModel' ],
    views : [ 'ComoNosConocioFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
			'comonosconocioformview' : {
				afterrender : this.initview,
                changedform: this.changedForm
			},
        	'comonosconocioformview button[action="save"]' : {
				click : this.onSaveClick
			}
        });
	}, 

	initview : function(view) {
        var record = view.record;
        var controller = this;
        view.loadRecord(record);
	},    
   
	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		myform = button.up('form').getForm();
        var view = button.up('comonosconocioformview');
		mymodel = myform.getRecord();
        var record = mymodel;

        myform.updateRecord(mymodel);
      
        if(myform.isValid()){
    		mymodel.save({
    			scope : this,
    			callback : function(record, operation) {
                    notify('Los datos se guardaron correctamente');
                    if(view.caller) {
                        
                        view.caller.fireEvent('refresh',view.caller)
                    }
                    
    			},
    			button : button
    		});
        }else{
            notify('No se ha guardado. Hay datos inválidos.');
        }
	},


});
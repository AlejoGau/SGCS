Ext.define('WebMG.controller.mg_maestrocuentasFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'mg_maestrocuentasFormView' ],

    init : function(config) {
		// genero los eventos

		this.control({
					'mg_maestrocuentasformview' : {
						afterrender : this.initview
					},

					'mg_maestrocuentasformview #btnGuardar' : {
						click : this.onSaveClick
					}
                });
	}, // cierro init

	initview : function(view) {
        if (!view.record){
            //creo un registro nuevo
            console.log('sin registro');
        } 
        view.loadRecord(view.record);
	},

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('mg_maestrocuentasformview');
        var win = button.up('window');
        
        caller = win.caller;
		var mymodel = myform.getRecord();
		var oldname = mymodel.get('Name');
		myform.updateRecord(mymodel);
		var newname = mymodel.get('Name');

		mymodel.save({
			scope : this,
            win: win,
            view: view,
			callback : function(record, operation, success) {
                
                if (operation.success){
                    notify('Los datos se cuardaron correctamente');
                    var mywin = operation.win;
                    var view = operation.view;
                    if (caller){
                       
                        caller.fireEvent('objectchanged',caller);
                        mywin.close();
                    }
                } else{
                    notifyError('Hubo un error al guardar');
                }
			},
			button : button
		});

	},


    
    deleteObject: function(record){
        record.destroy();
		//location.href = location.pathname;
    }
    
});
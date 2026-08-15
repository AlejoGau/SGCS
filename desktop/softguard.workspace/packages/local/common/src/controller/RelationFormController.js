Ext.define('Common.controller.RelationFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
	views : [ 'RelationFormView' ],

	init : function(config) {
		// genero los eventos

		this.control({

			'relationformview button[text="Guardar"]' : {
				click : this.saveObject
			},
            'relationformview button[text="Cancelar"]' : {
				click : this.onCancelClick
			},
            'relationformview' : {
                beforerender : this.initview
			}
		});
	}, // cierro init

	initview : function(myview) {
        var myform = myview.getForm();
        myform.loadRecord(myview.record);
	},

	saveObject : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
		var mymodel = myform.getRecord();
        var view = button.up('relationformview');
        var win =  button.up('window');

		myform.updateRecord(mymodel);
        
		mymodel.save({
            win: win,
            view: view,
            scope: myform.scope,
            ObjectId: mymodel.get('ObjectId'),
            ObjectTypeName: mymodel.get('ObjectTypeName'),
			callback : function(records, operation) {
                if (operation.success){
                    var win = operation.win;
                    var view = operation.view;
                    if (view){
                        //console.log(win,view);
                        view.fireEvent('objectchanged',view.grid);
                        win.close();
                    }
                }else{
                    console.log(operation);
                }
			},
			button : button
				});

	},

	deleteObject : function(button, event, options) {
		var myform = button.up('form').getForm();
		var mymodel = myform.getRecord();
        var view = button.up('relationformview');
		mymodel.destroy({
					scope : this.application
				});
		view.fireEvent('objectchanged'); // debiera ser en el callback del destroy
        win.close()
	},
    
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        myWin.close();
    }
});
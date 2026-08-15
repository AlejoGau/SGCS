//MIGRADO2024
Ext.define('Common.controller.VehicleBrandNewController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'VehicleBrandModel' ],
	views : [ 'VehicleBrandNewView' ],
	init : function(config) {
		// genero los eventos
		this.control({
			'vehiclebrandnewview button[action="create"]' : {
				click : this.saveObject
			},
            'vehiclebrandnewview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'vehiclebrandnewview' : {
                beforerender : this.initview
			}
		});
	}, // cierro init
	initview : function(view) {
        var form = view.getForm();
        var fecha = new Date();
        // cambio a hora local
        fecha.setHours(fecha.getHours()-(fecha.getTimezoneOffset()/60));
        var record = this.getVehicleBrandModelModel().create();
        view.record = record;
        form.loadRecord(record);
	},
	saveObject : function(button, event, options) {
        var view = button.up('vehiclebrandnewview');
		var myform = view.getForm();
		var record = view.record;
        var win =  button.up('window');
        
        if (myform.isValid()){
            myform.updateRecord(record);
            record.save({
    			callback : function(record, operation) {
                    if (operation.success){
                        view.caller.store.load();
                        win.close();
                    }
                    else{
                        console.log(operation);
                    }
    			}
    		});
            
        }
	},
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        myWin.close();
    }
});
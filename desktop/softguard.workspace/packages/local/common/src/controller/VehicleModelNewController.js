//MIGRADO2024
Ext.define('Common.controller.VehicleModelNewController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'VehicleModelModel' ],
    views : [ 'VehicleModelNewView' ],
	init : function(config) {
		// genero los eventos
		this.control({
			'vehiclemodelnewview button[action="create"]' : {
				click : this.saveObject
			},
            'vehiclemodelnewview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'vehiclemodelnewview' : {
                beforerender : this.initview
			}
		});
	}, // cierro init
	initview : function(view) {
        var form = view.getForm();
        var brand = view.caller.record;
        var record = this.getVehicleModelModelModel().create({VehicleBrand: brand.get('Id')});
        view.record = record;
        form.loadRecord(record);
	},
	saveObject : function(button, event, options) {
        var view = button.up('vehiclemodelnewview');
		var myform = view.getForm();
		var record = view.record;
        var win =  button.up('window');
        
        if (myform.isValid()){
            myform.updateRecord(record);
            record.save({
    			callback : function(record, operation) {
                    if (operation.success){
                        view.caller.fireEvent('objectcreated',view);
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
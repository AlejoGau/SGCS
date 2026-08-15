//MIGRADO2024
Ext.define('Common.controller.VehicleBrandFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'VehicleBrandModel' ],
    views : [ 'VehicleBrandFormView' ],
	init : function(config) {
		// genero los eventos
		this.control({
			'vehiclebrandformview button[action="save"]' : {
				click : this.saveObject
			},
            'vehiclebrandformview button[action=delete]': {
                click: this.onDeleteClick
            },
            'vehiclebrandformview' : {
                beforerender : this.initview
			}
		});
	}, // cierro init
	initview : function(view) {
        var form = view.getForm();
        form.loadRecord(view.record);
	},
	saveObject : function(button, event, options) {
        var view = button.up('vehiclebrandformview');
		var myform = view.getForm();
		var record = view.record;
        myform.updateRecord(record);
        view.up('vehiclebrandview').setTitle(record.get('Name'));
	},
    onCancelClick: function(button, event, options){
        myWin = button.up('window');
        myWin.close();
    },
    
    onDeleteClick: function(button, object, options){
        var view= button.up('vehiclebrandformview');
        var record = view.record;
        var panel = view.up('vehiclebrandview');
        
        record.destroy({callback: function(records, operation){
                panel.caller.fireEvent('objectdeleted', panel);
                panel.close(); 
            }
        });
    }
});
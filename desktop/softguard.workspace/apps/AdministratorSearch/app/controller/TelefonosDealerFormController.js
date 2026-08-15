Ext.define('AdministratorSearch.controller.TelefonosDealerFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasLineasModel' ],
    views : [ 'TelefonosDealerFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
            'telefonodealerformview' : {
                beforerender : this.initview
            },
            'telefonodealerformview button[action="save"]' : {
                click : this.onSaveClick
            }
        });
	}, // cierro init

	initview : function(view) {
        view.oldRecord = Ext.clone (view.record.copy().data)
        view.loadRecord(view.record);
        view.down('#nombre').setValue(view.record.get('nombre'))
        view.down('#telefono').setValue(view.record.get('telefono'))
        view.down('#descripcion').setValue(view.record.get('descripcion'))
	},

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('telefonodealerformview');
        var win = button.up('window');
		var record = myform.getRecord();

        record.set('nombre', view.down('#nombre').getValue())
        record.set('telefono', view.down('#telefono').getValue())
        record.set('descripcion', view.down('#descripcion').getValue())
        
        view.caller.fireEvent('save', record,view.oldRecord, view.caller)
        view.up('window').close()
	}	
});
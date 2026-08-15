Ext.define('AdministratorSearch.controller.TablasTelefonosJuridiccionalesFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.TablaListasEmergenciaStore', 'TelefonoDiscadoStore', 'ProvinciasStore' ],
    models : [ 'TablasTelefonosJuridiccionalesModel' ],
    views : [ 'TablasTelefonosJuridiccionalesFormView' ],

    init : function(config) {
        // genero los eventos

		this.control({
            'tablastelefonosjuridiccionalesformview' : {
                afterrender : this.initview
            },
            'tablastelefonosjuridiccionalesformview button[action="save"]' : {
                click : this.onSaveClick
            }
        });
	}, // cierro init

	initview : function(view) {
        view.loadRecord(view.record);
        this.getProvinciasStoreStore().load();
	},

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('tablastelefonosjuridiccionalesformview');
        var win = button.up('window');
		var record = myform.getRecord();
        var controller = this;

		myform.updateRecord(record);
        
        if (record.get('DateCreated') == null){
            record.set('DateCreated',new Date(-62135586000000));
        }

        if (myform.isValid()){

            record.setConfig({
                proxy: controller.getTablasTelefonosJuridiccionalesModelModel().getProxy()
            });

    		record.save({
    			scope : this,
                win: win,
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
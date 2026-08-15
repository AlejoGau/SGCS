Ext.define('AdministratorSearch.controller.t_comprobantes_fcFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'TipoComprobanteStore' ],
    models : [ 't_comprobantes_fcModel', 't_organizacion_fcSearchModel' ],
    views : [ 't_comprobantes_fcFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
        			't_comprobantes_fcformview' : {
						beforerender : this.initview
					},
					't_comprobantes_fcformview button[action="save"]' : {
						click : this.onSaveClick
					}
    				
                });
	}, // cierro init
   
	initview : function(view) {
        view.loadRecord(view.record)
        var organizacionFacturadoraStore = Ext.create('Ext.data.Store',{
            model: this.getT_organizacion_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
        })
        
        view.down('#comboorganizacionfacturadora').bindStore(organizacionFacturadoraStore)
        organizacionFacturadoraStore.load({callback:function (records) {
            if(view.record.get('cbt_idOrganizacionFacturadora') == 0) {
                view.down('#comboorganizacionfacturadora').setValue(records[0])
            }
        }})
	},

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('t_comprobantes_fcformview');
        var win = button.up('window');
		var record = myform.getRecord();

		myform.updateRecord(record);

        var model = this.getT_comprobantes_fcModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });
        
        if (myform.isValid()){
            record.set('cbt_cletra',record.get('cbt_cletra').toUpperCase())
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

	}
    
   

	
   
});
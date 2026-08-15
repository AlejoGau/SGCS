//MIGRADO2024
Ext.define('Common.controller.t_impuestos_fcFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_impuestos_fcModel', 't_organizacion_fcSearchModel', 'mg_maestrocuentasSearchModel' ],
    views : [ 't_impuestos_fcFormView' ],
    init : function(config) {
        // genero los eventos
        this.control({
            't_impuestos_fcfromview' : {
				beforerender : this.initview,
                selectedEvents: this.eventsSelected
			},
			't_impuestos_fcfromview button[action="save"]' : {
				click : this.onSaveClick
			}
			
        });
	}, // cierro init
  
	initview : function(view) {
        var controller = this;
        
        var organizacionFacturadoraStore = Ext.create('Ext.data.Store',{
            model: this.getT_organizacion_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        })
        
        view.down('#organizacionfacturadora').bindStore(organizacionFacturadoraStore);
        organizacionFacturadoraStore.load();
        
        var mgmcStore = Ext.create('Ext.data.Store',{
            model: this.getMg_maestrocuentasSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: 'mgmc_ctipo',
                value:'IMPD'
            }]
        })
        
        view.down('#imp_mgmcidkey').bindStore(mgmcStore);
        mgmcStore.load();
        
        view.loadRecord(view.record);
        
        
      
	},
    
	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('t_impuestos_fcfromview');
        var win = button.up('window');
		var record = myform.getRecord();
		myform.updateRecord(record);
        
        
        var model = this.getT_impuestos_fcModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });        
        if (myform.isValid()){
            /*
            if(record.get('imp_idorganizacion') == 0 || record.get('imp_idorganizacion') == '') {
                record.set('imp_idorganizacion',  this.application.UserData.Company)
            }
            */
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
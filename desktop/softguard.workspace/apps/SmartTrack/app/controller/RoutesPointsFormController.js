Ext.define('SmartTrack.controller.RoutesPointsFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'RoutesPointsModel', 'CheckPointsSearchModel' ],
    views : [  ],

    init : function(config) {
        // genero los eventos

        this.control({
    				'routespointformview' : {
						beforerender : this.initview
					},
					'routespointformview button[action="save"]' : {
						click : this.onSaveClick
					}
    				
                });
	}, // cierro init

	initview : function(view) {
        
        view.loadRecord(view.record);
        view.filters = [{
            property: 'chp_iCuenta',
            value: view.caller.record.get('cuentaId')
        }]
         view.store =Ext.create('Ext.data.Store',{
            model: this.getCheckPointsSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.down('#checkpoints').bindStore(view.store);
        view.store.load();
       
	
	},
    
    doBindStore: function(records,operation,success){
        if (success){
            operation.view.down('#usuarios').bindStore(operation.store);
        }
    },


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('routespointformview');
        var win = button.up('window');
		var record = myform.getRecord();

        var model = this.getRoutesPointsModelModel();        
        record.setProxy(model.getProxy());
        
		myform.updateRecord(record);
        
        record.set('checkpointId',view.down('#checkpoints').getValue());
        if(record.get('checkpointId') == null) {
            record.set('checkpointId',0);
        }
      
        if (myform.isValid()){
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
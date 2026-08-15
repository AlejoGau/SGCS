Ext.define('Trackguard.controller.GeocercasProgramasFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'tg_routesModel', 'tg_routesSearchModel', 'SoftguardUsuarioModel' ],
    views : [ 'GeocercasProgramasFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
    				'geocercasprogramadasformview' : {
						beforerender : this.initview
					},
					'geocercasprogramadasformview button[action="save"]' : {
						click : this.onSaveClick
					}
    				
                });
	}, // cierro init

	initview : function(view) {
        var controller = this;
        
        
        var mystore =Ext.create('Ext.data.Store',{
            model: this.getSoftguardUsuarioModelModel()
        });
        
        var _ObjectId = view.record.get('cuentaId');
        
        if(view.record.get('Id') != 0) {
            view.down('#pointsgrid').setDisabled(false);
            view.down('#programgrid').setDisabled(false);
            
        }
        view.down('#usuarios').bindStore(mystore);
        
        mystore.load({ObjectId:_ObjectId,view:view,store:mystore});
        
        view.loadRecord(view.record);  
	
	},


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('geocercasprogramadasformview');
		var record = myform.getRecord();

        var model = this.getTg_routesModelModel();        
        record.setConfig({
            proxy: model.getProxy()
        });
        
		myform.updateRecord(record);
        
        
        
        if (myform.isValid()){
            record.set('userId',view.down('#usuarios').getValue());
            if(!record.get('userId')) {
                record.set('userId',0);
            }
            if(record.get('userId') == 0) {
                notify ("No se realizará control sobre los usuarios que intervengan en la ronda");
            }
            
    		record.save({
    			scope : this,
               
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                        //view.close();
                        
                        var pointsgrid= view.down('#pointsgrid')
                        pointsgrid.record = record;
                        pointsgrid.fireEvent('afterrecord', pointsgrid);
                        pointsgrid.setDisabled(false);
                        
                        view.down('#programgrid').record = record;
                        
                		view.down('#programgrid').setDisabled(false);
                        
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			},
    			button : button
    		});
        }

	}
    
   

	
   
});
Ext.define('AdministratorSearch.controller.t_mailConnectorFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_mailConnectorModel', 'TablasIpConSearchModel' ],
    views : [ 't_mailConnectorFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
        			't_mailconnectorformview' : {
						beforerender : this.initview
					},
					't_mailconnectorformview button[action="save"]' : {
						click : this.onSaveClick
					}
    				
                });
	}, // cierro init
    
   

	initview : function(view) {
        view.record.set('aut_cautoprocesados',view.record.get('aut_cAutoProcesados'))
        view.loadRecord(view.record);
        
        if(view.record.get('mcn_ipconid') == 0) {
            view.down('#comboipcon').setRawValue('')
        }
        
        var comboIpcon = view.down('#comboipcon');
             var comboIpconStore =Ext.create('Ext.data.Store',{
            model: this.getTablasIpConSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true
        })
        
        comboIpcon.bindStore(comboIpconStore)
        comboIpconStore.load()

        view.loadRecord(view.record);
	},

   

	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('t_mailconnectorformview');
        var win = button.up('window');
		var record = myform.getRecord();


		myform.updateRecord(record);
        
        
        var model = this.getT_mailConnectorModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });
        
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
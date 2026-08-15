Ext.define('AdministratorSearch.controller.TablasPuertosFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'ReceptoresStore' ],
    models : [ 'TablasPuertosModel', 'ReceptoresSearchModel' ],
    views : [ 'TablasPuertosFormView' ],

    init : function(config) {
        // genero los eventos

    	this.control({
					'tablaspuertosformview' : {
						beforerender : this.initview
					},
					'tablaspuertosformview button[action="save"]' : {
						click : this.onSaveClick
					},
    				
                });
	}, // cierro init

	initview : function(view) {
        
        

        var comboReceptores = view.down('#receptor');
        storeReceptores =Ext.create('Ext.data.Store',{
            model: this.getReceptoresSearchModelModel(),
            pageSize: 1000,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property : "rec_ntcpip",
                value : 2
            }],
            sorters: [{
                property: 'rec_cdescripcion', direction:'ASC'
            }]
            
        })
        
        
        comboReceptores.bindStore(storeReceptores);          
        storeReceptores.load();
        
        
        view.loadRecord(view.record);
	
	},


	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('tablaspuertosformview');
        var win = button.up('window');
		var record = myform.getRecord();
        var proxy = this.getTablasPuertosModelModel().getProxy();

		myform.updateRecord(record);
        
        record.setConfig({
            proxy: proxy
        });
      
        if (!myform.hasInvalidField()){
    		record.save({
    			scope : this,
               
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        notify('Los datos se guardaron correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    view.close();
    			},
    			button : button
    		});
        }

	},
    
   

	
   
});
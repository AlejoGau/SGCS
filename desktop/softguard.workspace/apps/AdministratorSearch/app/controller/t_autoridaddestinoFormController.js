Ext.define('AdministratorSearch.controller.t_autoridaddestinoFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_redirectorautoridadesSearchModel', 't_redirectordestinoSearchModel', 't_autoridaddestinoModel' ],
    views : [ 't_autoridaddestinoFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
    		't_autoridaddestinoformview' : {
				beforerender : this.initview,
			},
			't_autoridaddestinoformview button[action="save"]' : {
				click : this.onSaveClick
			},
            't_autoridaddestinoformview #redirector' : {
                change: this.onRedirectorChange
            }

        });
	}, // cierro init

    onRedirectorChange: function(combo, newValue,oldValue, options){
        var view = combo.up('t_autoridaddestinoformview');
        //rrd_cconfig tiene el config de items
        //rrd_cmetadata tiene la metada
        var newRecord = combo.findRecordByValue(newValue);
        var config = newRecord.get('rrd_cconfig');
        var metadata = newRecord.get('rrd_cmetadata');
        this.addMetadataToConfigFields(config,metadata,view);
            
    },

    
	initview : function(view) {
        var controller = this;
        var record = view.record;
        var config = record.get('tad_cconfig');
        var metadata = record.get('tad_cmetadata');
        controller.addMetadataToConfigFields(config,metadata,view);

        /*var config = record.get('tad_cconfig');
        if (config && config != ""){
            //tiene configuracion de campos muestro el form
            var json = Ext.JSON.decode(config);
            items = json.formitems;

            var configcontainer = view.down('#configfields');
            
            //defaultcontainer.hide();
            configcontainer.add(items);
            configcontainer.show();
            
            // cargo los valores de linkdss en el form
            var metadata = record.get('tad_cmetadata');
            if (metadata && metadata != ''){
                var jsonmdata = Ext.JSON.decode(metadata);
                var formdata = jsonmdata.formdata;
                if (formdata){
                    for (var propertyName in formdata){
                        var field = view.getForm().findField(propertyName);
                        if (field){
                            field.setValue(formdata[propertyName]);
                        }
                        
                    }
                }
            } 
        }*/
	},

    addMetadataToConfigFields: function(config,metadata,view){
        //var config = record.get('tad_cconfig');
        if (config && config != ""){
            //tiene configuracion de campos muestro el form
            var json = Ext.JSON.decode(config);
            items = json.formitems;

            var configcontainer = view.down('#configfields');
            
            //defaultcontainer.hide();
            configcontainer.add(items);
            configcontainer.show();
            
            // cargo los valores de linkdss en el form
            //var metadata = record.get('tad_cmetadata');
            if (metadata && metadata != ''){
                var jsonmdata = Ext.JSON.decode(metadata);
                var formdata = jsonmdata.formdata;
                if (formdata){
                    for (var propertyName in formdata){
                        var field = view.getForm().findField(propertyName);
                        if (field){
                            field.setValue(formdata[propertyName]);
                        }
                        
                    }
                }
            } 

            /*var redirectorCombo = view.down('#redirector');
            if (redirectorCombo){
                var redirectorStore =Ext.create('Ext.data.Store',{
                    //getT_redirectorautoridadesSearchModelModel
                    model: this.getT_autoridaddestinoSearchModelModel(),
                    pageSize: 1000,
                    remoteSort: true,
                    remoteFilter: true
                })
                view.down('#destino').bindStore(redirectorStore);
                redirectorStore.load();
                
            }*/
        }

    },

	onSaveClick : function(button, event, options) {
	        
		var myform = button.up('form').getForm();
        var view = button.up('t_autoridaddestinoformview');
        var win = button.up('window');
		var record = view.record;
        
        myform.updateRecord(record);
        var jsonmdata = {};
        
        // tomo los valores del form y los cargo en formdata del linkdss
        var metadata = record.get('tad_cmetadata');
        
        if(metadata && metadata!=""){
            jsonmdata = Ext.JSON.decode(metadata);
        }
        
        record.setConfig({
            proxy: this.getT_autoridaddestinoModelModel().getProxy()
        });
        var data = myform.getValues();
        delete data.metadata; // se hace recursivo despues...
        jsonmdata.formdata = data;
        
        
        record.set('tad_cmetadata',Ext.JSON.encode(jsonmdata));
      
        if (myform.isValid()){
    		record.save({
    			scope : this,
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                           
                        notify('Los datos se guardaron correctamente');
                       
                        var win = view.up('window'); 
                       if(win) {
                            view.caller.fireEvent('objectchanged',view.caller,record);
                            win.close();
                       }
                    } else {
                        notifyError('Hubo un error al guardar los datos');
                    }
                    
    			},
    			button : button
    		});
        }

	}   
});
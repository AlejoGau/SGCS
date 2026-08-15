Ext.define('AdministratorSearch.controller.t_redirectordestinoFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_redirectordestinoModel' ],
    views : [ 't_redirectodestinoFormView' ],

    init : function(config) {
        // genero los eventos

        this.control({
        	't_redirectordestinoformview' : {
				beforerender : this.initview,
			},
			't_redirectordestinoformview button[action="save"]' : {
				click : this.onSaveClick
			}

        });
	}, // cierro init

    
	initview : function(view) {
        var controller = this;
        var record = view.record;
        
        var config = record.get('rrd_cconfig');
        if (config && config != ""){
            //tiene configuracion de campos muestro el form
            /*var straux=straux+",{xtype: 'textfield', fieldLabel: getLocale('CO'), name: 'CO', allowBlank: false}";
            straux=straux+",{xtype: 'textfield', fieldLabel: getLocale('COMMERCIAL'), name: 'COMMERCIAL', allowBlank: false}";
            straux=straux+",{xtype: 'textfield', fieldLabel: getLocale('PERSONAL'), name: 'PERSONAL', allowBlank: false}";
            straux=straux+",{xtype: 'textfield', fieldLabel: getLocale('RESIDENTIAL'), name: 'RESIDENTIAL', allowBlank: false}";
            straux=straux+",{xtype: 'textfield', fieldLabel: getLocale('VEHICLE'), name: 'VEHICLE', allowBlank: false}]}";

            config=config.replace(",{xtype: 'textfield', fieldLabel: getLocale('CO'), name: 'CO', allowBlank: false}]}",straux);
            */
            var json = Ext.JSON.decode(config);
            items = json.formitems;

            var configcontainer = view.down('#configfields');

            //defaultcontainer.hide();
            configcontainer.add(items);
            configcontainer.show();
            
            // cargo los valores de linkdss en el form
            var metadata = record.get('rrd_cmetadata');
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
        }
	},

	onSaveClick : function(button, event, options) {
	        
		var myform = button.up('form').getForm();
        var view = button.up('t_redirectordestinoformview');
        var win = button.up('window');
		var record = view.record;
        
        myform.updateRecord(record);
        var jsonmdata = {};
        
        /*for(var field in myform.getFields().items){
            console.log(field);
        }*/

        // tomo los valores del form y los cargo en formdata del linkdss
        var metadata = record.get('rrd_cmetadata');
        
        if(metadata && metadata!=""){
            jsonmdata = Ext.JSON.decode(metadata);
        }
        
        record.setConfig({
            proxy: this.getT_redirectordestinoModelModel().getProxy()
        });
        var data = myform.getValues();
        delete data.metadata; // se hace recursivo despues...
        jsonmdata.formdata = data;
        
        
        record.set('rrd_cmetadata',Ext.JSON.encode(jsonmdata));
      
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
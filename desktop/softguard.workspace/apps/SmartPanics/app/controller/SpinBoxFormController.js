
Ext.define('SmartPanics.controller.SpinBoxFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SpinBoxMessageModel', 'HtmlUserModuleSearchModel' ],
    views : [ 'SpinBoxFormView' ],

    init : function(config) {
        // genero los eventos
        this.control({
            'spinboxformview' : {
    			afterrender : this.initview
            },
            'spinboxformview button[action=save]': {
                click: this.onSaveClick
            }
            
		});
        
	}, // cierro init

initview : function(view) {        
       var controller = this;
       
       view.model = controller.getSpinBoxMessageModelModel()
       
       if(view.cuenta) {
         view.down('#to').hide();
         view.down('#toFijo').show();
         
         view.down('#toFijo').setValue(view.cuenta.get('Nombre')+" "+view.cuenta.get('Telefono'))
         view.down('#toFijoId').setValue(view.cuenta.get('Id'))
         
         
         view.record = view.model.create ({            
                            FromId: view.cuenta.get('udw_idKey'),
                            Status: 0
                        
                        })
                        
        view.loadRecord(view.record);
         
         
       } else {
           
       
        Ext.Ajax.request({
            url : '/Rest/Security/UserData',        
        	success: function(response, action){
    					var infoUser = Ext.decode(response.responseText);
                        
                        console.log(infoUser);
                        
                        view.record = view.model.create ({            
                            FromId: infoUser.udw_idKey
                        
                        })
                        
                        view.loadRecord(view.record);
                        
                        if(view.down('#to').getValue() == 0) {
                            view.down('#to').setRawValue('')
                        }
                        
                        
                        var userModel = controller.getHtmlUserModuleSearchModelModel() //Ext.ModelManager.getModel('desktop'+'.model.HtmlUserModuleSearchModel');
        
                         var store =Ext.create('Ext.data.Store',{
                            model: userModel,
                            pageSize: 1000,
                            filters: [
                                {
                                    property: 'udw_empresa',
                                    value: infoUser.Company
                                }
                            ]
                        });
                        
                        
                        //view.down('#to').store.clearData();
                        view.down('#to').bindStore(store)
                        var comboUsuarios = view.down('#to').store;
                        
                        store.load({callback:function(records) {
                            

                            Ext.Array.each(records, function (record) {
                                   		
								   var rec = record.data;
                            	   var added = false;
								   comboUsuarios.each (function (recordx) {
										
										if(recordx.data.udw_idKey == record.data.udw_idKey) {
											added = true;
										}
								
									    
								   });
                                   
									if(!added) {
								   		comboUsuarios.add({
											  udw_idKey:rec.udw_idKey,
											  udw_usuario: rec.udw_usuario
										   }); 
									}

                          		
                          	})
							
                            
                        }});
    				
    		}    		
    	});
        
       }
        
        
	},


	onSaveClick : function(button, event, options) {
        var view = button.up('spinboxformview');
		var myform = view.getForm();
        
		var record = view.getRecord();

       
        record.set('DateCreated', new Date());
        
        record.set('ToTypeId', 3067);

        


		myform.updateRecord(record);
        
        
        if(view.cuenta) {
            
            record.set('ToId', view.down('#toFijoId').getValue());
            
        }
        
      
        if (myform.isValid()){
            
            
    		record.save({
    			scope : this,
               
                view: view,
    			callback : function(record, operation) {
                    if (operation.success){
                        var win = view.up('window');           
                        notify('El mensaje fue enviado correctamente');
                        view.caller.fireEvent('objectchanged',view.caller,record);
                        win.close();
                    } else {
                        notifyError('Hubo un error al enviar el mensaje');
                    }
                    
    			},
    			button : button
    		});
        }

	}


})




 
//MIGRADO2024
Ext.define('Common.controller.STDepositoFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.SiNoStore'],
    models : [ 't_stock_depositosModel', 'STDepositoModel' ],
    views : [ 'STDepositoFormView' ],
    init : function(config) {
        // genero los eventos
        this.control({
            		'stdepositoformview' : {
						beforerender : this.initview,
                        organizationchanged : this.onOrganizationChanged
					},
					'stdepositoformview button[action="save"]' : {
						click : this.onSaveClick
					},
                    'stdepositoformview button[action="organizationChange"]' : {
        				click : this.onOrganizationChangeClick
        			}
    				
                });
	}, // cierro init
    
    
    onOrganizationChanged : function(record, view) {
        if(record) {
            view.record.set('tsd_idorganizacion', record.get('Id').toString());
            view.getForm().findField('_organization').setValue(record.get('Name'));
        } else {
            view.record.set('tsd_idorganizacion', '');
            view.getForm().findField('_organization').setValue('');
        }
       
    },
    
    onOrganizationChangeClick: function(button, event, options){
        var view = button.up('stdepositoformview');
        
        var controller = this;
        
        var filter = [];
        this.isMasterWebDealer(function (isMaster) {
        
            if(isMaster) {
            Ext.Ajax.request({
              url: '/rest/security/UserData',
              success: function(resp,operation) {
                
                  
                  if(resp.responseText)  {                 
                  
                        var metadata = Ext.JSON.decode(resp.responseText);
                        if (metadata) {
                            
                            var modules = SecurityModulesStore;//controller.getSecurityModulesStoreStore();
                            var administratorModule = modules.findRecord('KeyReference','Administrator');
                            
                            if (!administratorModule.get('Available')){
                                
                                 filter.push(
                                    {
                                        property: 'Organization:RelationParent',
                                        value: metadata.Company
                                    }
                                );
                                
                            }
                            
                            
                            
                           
                                
                            var win = Ext.create('Ext.Window', {
                                layout : 'fit',
                                title : 'Seleccione una entidad',
                        		closeAction : 'destroy',
                                caller: view,
                                modal: true,
                    			width : 600,
                    			height : 400,
                    			border : false,
                    			items : {
                                    xtype: 'organizationhelperview',
                                    title: '',
                                    forceStatus: '7,8,9',
                                    hideTaxo: true,
                                    caller: view,
                                    filter:filter
                    			}
                    		});
                    		win.show();
                            
                        } 
                  }
              }
            });
            
            } else {
                
                 var win = Ext.create('Ext.Window', {
                        layout : 'fit',
                        title : 'Seleccione una entidad',
                		closeAction : 'destroy',
                        caller: view,
                        modal: true,
            			width : 600,
            			height : 400,
            			border : false,
            			items : {
                            xtype: 'organizationhelperview',
                            title: '',
                            forceStatus: '7,8,9',
                            hideTaxo: true,
                            caller: view
            			}
            		});
            		win.show();
                
            }
        
        })
        
        
    },
    
    
    isMasterWebDealer: function (callback) {
        var modules = SecurityModulesStore;//this.getSecurityModulesStoreStore();
        
        modules.load({callback: function(){
              var masterModule = modules.findRecord('KeyReference','MasterWebDealer');
 
              if(masterModule.get('KeyReference') == 'MasterWebDealer') {    
                  
                  callback(true);
              } else {
                  callback(false);
              }
              
        }});
        
    },
	initview : function(view) {
        
        view.loadRecord(view.record);
        
        view.down('#organizationName').setValue(view.record.get('organizationName'))
        view.down('#tsd_estado').setValue(view.record.get('tsd_estado'))
        
        //si es depsotio de un tecnico esconda organizacion y nombre
        if(view.record.get('tsd_idtecnico') != 0) {
            view.down('#organizacion').hide()
            view.down('#Name').setDisabled(true)
        }
        
        if(view.idOrganizacion) {
            view.down('#organizacion').hide()
            view.down('#Name').setDisabled(true)
        }
	
	},
	onSaveClick : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var myform = button.up('form').getForm();
        var view = button.up('stdepositoformview');
        var win = button.up('window');
		var record = myform.getRecord();
        
        var model = this.getT_stock_depositosModelModel();
        
        record.setConfig({
            proxy: model.getProxy()
        });
		myform.updateRecord(record);
        
      
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
	},
    
   
	
   
});
Ext.define('Common.controller.OrganizationNuevaFormController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'RelationModel', 'OrganizationModel', 'OrganizationSearchModel' ],
    views : [ 'OrganizationNuevaFormView' ],

    init : function(config) {
    	// genero los eventos

		this.control({
			'organizationnuevaformview' : {
				afterrender : this.initview
			},
			'organizationnuevaformview button[action="save"]' : {
				click : this.onSaveClick
			}
			
        });
	}, 

	initview : function(view) {
        var controller = this;
        var status = 0;
        if(view.record) {
            status = view.record.get('Status')
        }
        
        var record = this.getOrganizationModelModel().create({
            Name:getLocale('Nueva organizacion'),
            Status: status
        })
        
        view.loadRecord(record)
	},    
    
    
    

	onSaveClick : function(button, event, options) {
	
		myform = button.up('form').getForm();
        view = button.up('organizationnuevaformview');
		mymodel = myform.getRecord();
		
        oldname = mymodel.get('Name');
		myform.updateRecord(mymodel);
		newname = mymodel.get('Name');
        
        var controller = this;
        
		mymodel.save({
			scope : this,
			callback : function(record, operation) {
                if (operation.wasSuccessful()){
                    view.fireEvent('objectchanged', record)
                    notify('Los datos se guardaron correctamente');
                    var organizationview = view.caller;

                    var organizationgridview = view.caller.up('tabpanel').down('organizationgridview');
                    
                    if (organizationgridview){
                        var paging = organizationgridview.down('pagingtoolbar');
                        //paging.moveFirst();
                        paging.doRefresh();
                    }
                    
                    /*if (view.tab){
                        view.tab.setText(mymodel.get('Name'));
                    }*/
                    
                  
                    
                    if(view.caller) {
                        view.caller.fireEvent('objectedit', record, view.caller)
                    }
                    
                    controller.isMasterWebDealer(function (isMaster) {
                    
                        if(isMaster) {
                            
                       
                            Ext.Ajax.request({
                              url: '/rest/security/UserData',
                              success: function(resp,operation) {
                                  
                                  
                                  if(resp.responseText)  {                 
                                  
                                        var metadata = Ext.JSON.decode(resp.responseText);
                                        if (metadata) {
                                            
                                            var relacion = controller.getRelationModelModel();
                                           // relacion.create = ;
                                             var store = Ext.create('Ext.data.Store',{
                                                    model: controller.getRelationModelModel()
                                                })
                                            store.add({
                                                'Id': 0,
                                                'ObjectTypeId': '600',
                                                'ObjectTypeName':'',
                                                'RelationObjectTypeId':'600',
                                                'ObjectId': metadata.Company,
                                                'RelationObjectId': record.get('Id')
                                            });
                                            store.sync();
                                        } else {
                                            notify('No se peude generar la relacion por falta de infomacion.');
                                        }
                                  }
                              }
                            });
                        } 
                        
                        
                    });
                    
                    
                    if(view.up('window')) {
                        view.up('window').close()
                    }
                } else {
                    notifyError('No se permiten nombres de organizacines duplicados');
                }
                
			},
			button : button
		});

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
        
    }

});
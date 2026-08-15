Ext.define('TrackguardMonitoreo.controller.TrackguardMonitoreoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'VehicleGpsModel', 'PortletModel', 'VehicleSearchModel' ],
    views : [ 'ExtUxNotification', 'UploadButton', 'UploadBasic', 'UploadPluginWindow', 'TrackguardMonitoreoToolbar' ],

	init : function(config) {
		// genero los eventos
		this.control({
            'viewport' : {
                beforerender : this.initview,
                afterrender: this.afterInit
			},
           /* 'viewport button[action="savevehiculos"]' : {
                click : this.onClickSaveVehiculo
    		},*/
            'viewport button[action="saveactual"]' : {
                click : this.onClickSaveActual
        	},
            /*
            'viewport #combovistas' : {
                change : this.onChangeCombo
            'viewport button[action="borrarvista"]' : {
                click : this.onClickBorrarVista
        	},*/
            'viewport button[action="vervista"]' : {
                click : this.onClickVerVista
            },
            'window button[action="savenueva"]' : {
                click : this.onClickSaveNueva
            },
            'viewport button[action="addPanel"]' : {
                click : this.onAddPanelClick
            }
            
            
		});
	}, // cierro init
    
    
    afterInit: function(view){
        var controller = this;
        var tabpanel = view.down('tabpanel');
        this.application._nameModule = 'TrackguardMonitoreo'
        
        if (myQueryString.eventId)
            return ;

        var storeSecurity = Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordTGMonitoreo = storeSecurity.findRecord('KeyReference', 'TrackguardMonitoreo')
        if(recordTGMonitoreo && recordTGMonitoreo.get('Available') == true) {  
            var _security = recordTGMonitoreo.get('_Security');
            if(_security && _security.modules) {
               Ext.Array.each(_security.modules,function (r) {
                    if(r.view == 'geocercagridview' && r.profile < 1) {
                        view.down('#geocercastoolbar').hide()
                    } else if (r.view == 'rutagridview' && r.profile < 1) {
                        view.down('#rutastoolbar').hide()
                        
                    }
               })
               
            }
        }
        
            
        view.url =  '/Rest/Security/Modules/17/Security/'+_UserData.UserId;
        var security;
        Ext.Ajax.request({
          url: view.url,
          method: 'GET',
          success: function(resp,operation) {
            if (resp.responseText)
                var json = JSON.parse(resp.responseText);
            if (json)
                security = json;
            
            if(!security) {
                security = {modules:[],rights:[], event:[]};
            }
            view.security = security;

            Ext.Object.each(view.security.vehicle, function(key, value, myself) {
             if(value && value.predefinido == 1) {
                view.down('#vistaactual').setValue(value.nombre);
                view.down('#savevista').setText('Guardar vista: '+value.nombre);

                Ext.Object.each(value.vehiculos, function(key, value, myself) {
                    var store =  Ext.create('Ext.data.Store',{
                        pageSize: 500,
                        filters: [{
                            property: 'Id',
                            value: value
                        }
                        ],
                        model: controller.getVehicleSearchModelModel()
                    });
                    store.load({
                        callback: function (recordx) {
                            //   var view = button.up('dispositivomovilwidgetview');
                            setTimeout(function(){
                                var record = recordx[0];
                                
                                var title = record.get('cue_clinea') 
                                    + "-" 
                                    + record.get('cue_ncuenta').replace(/^\s+|\s+$/g, '') 
                                    + " " 
                                    + record.get('cue_cnombre');
                                
                                var tab = tabpanel.add(Ext.widget('vehicleslavegpsview', {
                                    title: title,
                                    record: record,
                                    closable: true,
                                    closeAction: 'hide'
                                }));
                        
                                tabpanel.setActiveTab(tab);
                            
                            },(2000*key)+1000);
                        }
                    });   
                });
             }  
            });
          }
        });
    },
    
    initview: function(view){
        /* ANULADO 24/04/2023
        if (!myQueryString.eventId){
            var controller = this;
            var tabpanel = view.down('tabpanel');

            var newTab = Ext.widget('vehiclegridview',{
                title: 'Dispositivos Móviles',
                hideControls:['#crear'],
                noRefresh: false,
                closable: false
            });
            
            tabpanel.add(newTab);

            var tab = tabpanel.add(Ext.widget('flotagpsview',{
                title: 'Flota'
            }));
            
            tabpanel.setActiveTab(tab); 
        }
        
        */
    },
    
    onClickVerVista : function (button) {
        var topview = button.up('viewport'); 
        
        var panel = Ext.widget('vistahelperview', {
                security:topview.security,
        		border : false
    		});
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
			title : 'Vistas',
			width : 500,
            maximizable: true,
			height : 200,
			border : false,
			items : panel
		});
		win.show(); 
    },
    
    /*onChangeCombo: function (combo, newvalue, oldvalue) {
      
      var view = combo.up('viewport');
      var controller = this;
      var tabpanel = view.down('tabpanel');
      
      var tabAbiertos = Ext.ComponentQuery.query('vehicleslavegpsview');
        
      
      Ext.Object.each(tabAbiertos, function(key, value, myself) {
            tabpanel.remove(value.el.id);        
      });
       
         Ext.Object.each(view.security.vehicle, function(key, value, myself) {
                var value = JSON.parse(value);
                if(view.down('#combovistas').getValue() == value.nombre) {
                
                    Ext.Object.each(value.vehiculos, function(key, value, myself) {
                        
                                        
                        var store =  Ext.create('Ext.data.Store',{
                            pageSize: 500,
                            filters: [{
                                property: 'Id',
                                value: value
                            }
                            ],
                            model: controller.getVehicleSearchModelModel()
                        });
                      
                        
                        store.load({
                            callback: function (recordx) {
                           
                             //   var view = button.up('dispositivomovilwidgetview');
                                setTimeout(function(){
                                   
                                    var record = recordx[0];
                                    
                                    var title = record.get('cue_clinea') 
                                        + "-" 
                                        + record.get('cue_ncuenta').replace(/^\s+|\s+$/g, '') 
                                        + " " 
                                        + record.get('cue_cnombre');
                                    
                                    var tab = tabpanel.add(Ext.widget('vehicleslavegpsview', {
                                        title: title,
                                        record: record,
                                        closable: true,
                                        closeAction: 'hide'
                                    }));
                            
                                    tabpanel.setActiveTab(tab);
                                
                                 },(2000*key)+1000);
                        
                            }
                        
                        });   
                    
                    });
                }
            });
        
    },*/
    
    openObjectList: function(view){
         if (!myQueryString.eventId){
            var controller = this;
            var tabpanel = view.down('tabpanel');

            var newTab = Ext.widget('vehiclegridview',{
                title: 'Dispositivos Móviles',
                hideControls:['#crear'],
                noRefresh: false,
                closable: false
            });
            
            tabpanel.add(newTab);

            var tab = tabpanel.add(Ext.widget('flotagpsview',{
                title: 'Flota'
            }));
            
            tabpanel.setActiveTab(tab); 
        }       
    },
    
  /*  onClickSaveVehiculo: function (button) {
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
        	title : 'Ingrese un nombre',
			width : 450,
			height : 90,
			border : false,
            tbar:[
                { text: 'Guardar vista de vehiculos' , action: 'save'}
            ],
			items : [
                    { 
                        xtype: 'textfield',
                        itemId: 'nombre'
                    }
                ]
		});
		win.show();
    },
    */
    
    onClickSaveActual: function (button, event, options) {
        
        
        
        
        var view = Ext.getCmp('viewport');//button.up('viewport');
        var win = button.up('window');
        var security = view.security;
        var tabAbiertos = Ext.ComponentQuery.query('vehicleslavegpsview');
        var vistaactual = view.down('#vistaactual').getValue();
        var listaTabAbiertos = new Array();
        
        if(vistaactual == '') {
            var win = Ext.create('Ext.Window', {
            layout : 'fit',
            title : 'Ingrese un nombre',
    		width : 450,
			height : 90,
			border : false,
            tbar:[
                { text: 'Guardar vista de vehiculos' , action: 'savenueva'}
            ],
			items : [
                    { 
                        xtype: 'textfield',
                        itemId: 'nombre',
                        validator: function(valuex){
                            var t = this;
                            var security;
                            Ext.Ajax.request({
                              url:  '/Rest/Security/Modules/17/Security/'+_UserData.UserId,
                              method: 'GET',
                              success: function(resp,operation) {  
                                  if(resp.responseText) {
                                      var json = JSON.parse(resp.responseText);
                                      var error = 0 ;
                                      Ext.Object.each(json.vehicle, function(key, value, myself) {
                                         if(value) {
                                             if(value.nombre == valuex) {
                                               
                                                
                                                error = 1
                                                 
                                             }
                                             
                                         }
                                         
                                      });
                                      
                                      if(error == 1 ) {                                      
                                         t.markInvalid('El nombre ya existe');
                                         t.textValid = 'El nombre ya existe';
                                      } else {
                                         t.clearInvalid();
                                         t.textValid = true;
                                      }
                                      return t.textValid;
                                  }
                              }
                            });
                            
                            
                        }
                    }
                    
                ]
    		});
    		win.show();
            
            return false;
        }
        
        Ext.Object.each(tabAbiertos, function(key, value, myself) {
            listaTabAbiertos.push(value.record.get('Id'));
            
        });
        
        
        Ext.Object.each(view.security.vehicle, function(key, value, myself) {
            if(value) {
               // var value = JSON.parse(value);
                if(vistaactual == value.nombre) {
                    
                
                    view.security.vehicle[key].vehiculos = listaTabAbiertos;
                    
                }
            }
            
        });
        
        //security.vehicle.push(Ext.encode(objetoVehiculo));

        var json = Ext.encode(view.security);
       
        Ext.Ajax.request({
          url: view.url,
          method: 'PUT',
          params: json,
          success: function(resp,operation) {
            notify('Los datos se guardaron con éxito');
          }
        });
        
       
        
        
    },
    
    onAddPanelClick: function (button, event, options) { 
        var tabpanel = button.up('viewport').down('tabpanel');
        var portalPanel = Ext.widget('portalpanelview',{
            title: 'multiView',
            iconCls: 'icon-images',
            closable: 'true'
        });
        
        tabpanel.add(portalPanel);
        tabpanel.setActiveTab(portalPanel);
        
            var column = portalPanel.down('portalcolumn');
    		// genero un registro portlet
			var portlet = Ext.create(this.getPortletModelModel(), {
				Name : 'test',
				iconCls : 'icon-map',
				Column : 0,
				Position : column.items.length,
				Config : '{CustomStatisticsId: ' + 0
						+ '}',
				Panel : portalPanel.title,
				//PanelId : portalPanel.record.get('Id'),
				View : 'flotagpsview'
			});
            
            portalPanel.portletAdd(portlet)
            
            /*

			// guardo el registro en la base
			record.save({
				scope : this,
				callback : function() {
					currentpanel.down('portalpanel').portletAdd(record)
				}
			});
            */
    },
    
    onClickSaveNueva: function (button, event, options) {        
        
       // var view = Ext.getCmp('viewport');
        var view = Ext.getCmp('viewport');//button.up('viewport');
        var win = button.up('window');
        var security = view.security;
        var tabAbiertos = Ext.ComponentQuery.query('vehicleslavegpsview');
        
        var listaTabAbiertos = new Array();
        
        Ext.Object.each(tabAbiertos, function(key, value, myself) {
            listaTabAbiertos.push(value.record.get('Id'));
            
        });
       
        
        
        var objetoVehiculo = {
            nombre: win.down('#nombre').getValue(),
            predefinido: 0,
            vehiculos: listaTabAbiertos
        }
        
       // view.mystore.add({'nombre':win.down('#nombre').getValue()});
        
        view.down('#vistaactual').setValue(win.down('#nombre').getValue());
        view.down('#savevista').setText('Guardar vista: '+win.down('#nombre').getValue());
        
      
        if (security.vehicle instanceof Array) {
            
        } else {
            security.vehicle = new Array();
        }
    
        security.vehicle.push(objetoVehiculo);

        var json = Ext.encode(security);
       
        Ext.Ajax.request({
          url: view.url,
          method: 'PUT',
          params: json,
          success: function(resp,operation) {
            notify('Los datos se guardaron con éxito');
          }
        });
        
        win.close();
        
        
    },
    
   /* onClickBorrarVista : function (button, event, options) {
                
        var view = Ext.getCmp('viewport');//button.up('viewport');
        var win = button.up('window');
        var security = view.security;
        var tabAbiertos = Ext.ComponentQuery.query('vehicleslavegpsview');
        var tabpanel = view.down('tabpanel');
        var combo = view.down('#combovistas');
        
         Ext.Object.each(view.security.vehicle, function(key, value, myself) {
                var value = JSON.parse(value);
                if(view.down('#combovistas').getValue() == value.nombre) {
                   
                    var recordCombo = combo.findRecord('field1',combo.getValue());
                    combo.getStore().remove(recordCombo);
                    
                    var tabAbiertos = Ext.ComponentQuery.query('vehicleslavegpsview');        
      
                    Ext.Object.each(tabAbiertos, function(key, value, myself) {
                        tabpanel.remove(value.el.id);        
                    });
                    
                    security.vehicle.splice(key, 1);
                }
         });
            
        

        var json = Ext.encode(security);
       
        Ext.Ajax.request({
          url: view.url,
          method: 'PUT',
          params: json,
          success: function(resp,operation) {
            notify('Los datos se guardaron con éxito');
          }
        });
        
        
        
        
    },*/

	openObjectById : function(objectId) {
		var store =Ext.create('Ext.data.Store',{
            model: this.getVehicleSearchModelModel(),
            pageSize: 150,
            sorters: [
                {
                    property : 'Name',
                    direction: 'ASC'
                }
            ],
            filters: [
                {
                    property: 'cue_iid', 
                    value: objectId
                }
            ]
        });

        store.load({
            callback: function(records, operation, success){
                var record = records[0];
                var viewport = Ext.getCmp('viewport');

                var tabpanel = viewport.down('tabpanel');
        
                var title = record.get('cue_clinea') 
                    + "-" 
                    + record.get('cue_ncuenta').replace(/^\s+|\s+$/g, '') 
                    + " " 
                    + record.get('cue_cnombre');
                
                var tab = tabpanel.add(Ext.widget('vehicleslavegpsview', {
                    title: title,
                    record: record,
                    eventId: myQueryString.eventId,
                    closable: true,
                    closeAction: 'destroy'
                }));
        
                tabpanel.setActiveTab(tab);
            }
        });
	}
});
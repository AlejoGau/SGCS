//MIGRADO2024
Ext.define('Common.controller.VistaHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'VistasModel', 'VehicleSearchModel' ],
    views : [ 'VistasHelperView' ],
    init : function(config) {
		// genero los eventos
		this.control({
            'vistahelperview' : {
                beforerender : this.initview,
                itemdblclick: this.onItemClick,
                sacarPredeterminada: this.sacarPredeterminada
			},
            'vistahelperview button[action="borrarvista"]' : {
                click : this.onClickBorrarVista
            },
            'vistahelperview button[action="nuevavista"]' : {
                click : this.onClickNuevaVista
            },
            'vistahelperview button[action="definirdefault"]' : {
                click : this.onClickDefinirDefault
            },
            'window button[action="savevista"]' : {
                click : this.onClickSave
            }
            
            
		});
	}, // cierro init
    
    initview: function(view){
        
        var controller = this;
        
        view.mystore =Ext.create('Ext.data.Store',{
            model: 'Common.model.VistasModel'
         });
     
        Ext.Object.each( view.security.vehicle, function(key, value, myself) {
            if(value) {
                //var json  = JSON.parse(value);
                view.mystore.add(value);
            }
        });
        
        view.bindStore(view.mystore);
       
        view.url =   '/Rest/Security/Modules/17/Security/'+_UserData.UserId;
        
    },
    
    sacarPredeterminada: function (record,view) {
        var viewport = Ext.ComponentQuery.query('viewport');
       
       Ext.Object.each(view.security.vehicle, function(key, value, myself) {
            if(value) {
                view.security.vehicle[key].predefinido = 0;
                record.set('predefinido', 0);
            }
       })
    
        var json = Ext.encode(view.security);
       
        Ext.Ajax.request({
          url: view.url,
          method: 'PUT',
          params: json,
          success: function(resp,operation) {
            notify('Los datos se guardaron con éxito.');
          }
        });
        
    },
    
    onClickDefinirDefault: function (button, event, options) {
        var viewport = Ext.ComponentQuery.query('viewport');
        var vistaactual = viewport[0].down('#vistaactual').getValue();
        var view = button.up('vistahelperview');
        
        var selected = view.selModel.getSelection(); 
        var record = selected[0];
        
         Ext.Object.each(view.security.vehicle, function(key, value, myself) {
            if(value) {
               // var value = JSON.parse(value);
                if(record.get('nombre') == value.nombre) {                   
                
                    view.security.vehicle[key].predefinido = 1;
                    record.set('predefinido', 1);
                } else {
                    var store = view.getStore()
                    
                    var rec = store.findRecord('nombre',value.nombre)
                    
                    view.security.vehicle[key].predefinido = 0;
                    rec.set('predefinido', 0);
                }
            }
            
        });
        
        //view.down('grid').refresh();
    
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
    
    onItemClick: function(grid,record,item,index,e,options){
        
        
      
      
        
      var win = grid.up('window');
      var view = grid.up('vistahelperview');
        
      
        
      var viewport = Ext.ComponentQuery.query('viewport');
      var controller = this;
      var tabpanel = viewport[0].down('tabpanel');
      
      var tabAbiertos = Ext.ComponentQuery.query('vehicleslavegpsview');
        
      console.log(view.security.vehicle);
      Ext.Object.each(tabAbiertos, function(key, value, myself) {
            tabpanel.remove(value.el.id);        
      });
       
         Ext.Object.each(view.security.vehicle, function(key, value, myself) {
             if(value) {
               // var value = JSON.parse(value);
                if(record.get('nombre') == value.nombre) {
                    
                    viewport[0].down('#vistaactual').setValue(record.get('nombre'));
                    viewport[0].down('#savevista').setText('Guardar vista: '+record.get('nombre'));
                    
                    Ext.Object.each(value.vehiculos, function(key, value, myself) {
                        
                                        
                        var store =  Ext.create('Ext.data.Store',{
                            pageSize: 500,
                            remoteFilter: true,
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
             }  
            });
        
        
        
        win.close();
        
    },
    
    
    onClickBorrarVista : function (button, event, options) {
        var viewport = Ext.ComponentQuery.query('viewport');    
        var view = button.up('vistahelperview');
        var win = button.up('window');
        
        var tabAbiertos = Ext.ComponentQuery.query('vehicleslavegpsview');
        var tabpanel = viewport[0].down('tabpanel');
       
        
        
        var selected = view.selModel.getSelection(); 
        var record = selected[0];
        
         Ext.Object.each(view.security.vehicle, function(key, value, myself) {
              //  var value = JSON.parse(value);
                if(record.get('nombre') == value.nombre) {
                   
                    view.mystore.remove(record);
                    var tabAbiertos = Ext.ComponentQuery.query('vehicleslavegpsview');        
      
                    Ext.Object.each(tabAbiertos, function(key, value, myself) {
                        tabpanel.remove(value.el.id);        
                    });
                    
                    view.security.vehicle.splice(key, 1);
                }
         });
            
       
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
    
    
    onClickNuevaVista: function (button, event, options) {
        
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
            title : 'Ingrese un nombre',
			width : 450,
			height : 90,
			border : false,
            tbar:[
                { text: 'Guardar vista de vehiculos' , action: 'savevista'}
            ],
			items : [
                    { 
                        xtype: 'textfield',
                        itemId: 'nombre',
                        validator: function(valuex){
                            var t = this;
                            var security;
                            Ext.Ajax.request({
                              url: '/Rest/Security/Modules/17/Security',
                              method: 'GET',
                              success: function(resp,operation) {   
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
                            });
                            
                            
                        }
                    }
                ]
		});
		win.show();
        
    },
    
     onClickSave: function (button, event, options) {        
        
       // var view = Ext.getCmp('viewport');
        var win = button.up('window');
        var view = Ext.ComponentQuery.query('vistahelperview');
        //var view = button.up('vistahelperview');
        var security = view[0].security;
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
        
        view[0].mystore.add({'nombre':win.down('#nombre').getValue()});
        
 
      
        if (security.vehicle instanceof Array) {
            
        } else {
            security.vehicle = new Array();
        }
    
        security.vehicle.push(objetoVehiculo);
        var json = Ext.encode(security);
       
        Ext.Ajax.request({
          url: view[0].url,
          method: 'PUT',
          params: json,
          success: function(resp,operation) {
            notify('Los datos se guardaron con éxito');
          }
        });
        
        win.close();
        
        
    }
  
	
});
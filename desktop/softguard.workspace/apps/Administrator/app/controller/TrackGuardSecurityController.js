Ext.define('Administrator.controller.TrackGuardSecurityController', {
    extend : 'Ext.app.Controller',
    stores : [ 'TrackGuardSecurityModuleStore', 'EventSecurityModuleStore' ],
    models : [ 'ModuleModel' ],
    views : [ 'TrackGuardSecurityView', 'TrackGuardSettingsView', 'EventSecurityView' ],

    init : function(config) {
        // this.initConfig(config);
        // genero los eventos

		this.control({
            'TrackGuardSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'TrackGuardSecurity' : {
                beforerender : this.initview,
                objectchanged: this.onObjectChanged
			},
            'TrackGuardSettingsView' : {
                beforerender : this.initSettingview
    		},
            'TrackGuardSecurity button[action=refreshModulesTrackguard]': {
                click: this.onRefreshModulesClick
            },
            'TrackGuardSecurity button[action=applyPerfil]': {
                click: this.onApplyPerfilClick
            },
            'EventSecurity[moduleFlag=trackguard] button[action=applyPerfilEventos]': {
                click: this.onApplyPerfilEventClick
            },
            'EventSecurity[moduleFlag=trackguard]' : {
                beforerender : this.initEventView
        	},
            'EventSecurity[moduleFlag=trackguard] button[action=saveEvent]': {
                click: this.onSaveEventClick
            },
            'TrackGuardSettingsView[moduleFlag=trackguard] button[action=saveSetting]': {
                click: this.onSaveEventClick
            },
            
            'EventSecurity[moduleFlag=trackguard] button[action=refreshModulesEvent]': {
                click: this.onRefreshModulesEventClick
            }
		});
	}, // administratormoduleformview

    onRefreshModulesEventClick : function(button, event, options) {
        var view = button.up('EventSecurity')?button.up('EventSecurity'):button;
        var gridstore = view.getStore();
        var store = this.getEventSecurityModuleStoreStore();
        var cantidad = store.data.length-1;
       
        store.each(function(pstore,i)  
            {  
                gridstore.each(function(gstore)  
                {  
                  if(pstore.get('text') == gstore.get('text')) {
                      var profile = gstore.get('profile')?gstore.get('profile'):0;
                      pstore.set('profile', profile);
                     
                  }
                  
                },this);
                
            },this); 
            
        view.bindStore(store);
        
    },
    
    initSettingview: function (view) {
        view.down('#cantidadcuentas').setValue(view.security.rights.CantidadCuentas);
        view.down('#chkGenerarEventos').setValue(view.security.rights.GenerarEventos);
        
        this.limpiarSettingConMasterWebDealer(view)
    },    
	initview : function(view) {
        var me = this;
        var security = {modules:[],rights:[], event:[]}
        var record = view.record; 
        var modules = view.modules;
        var moduleId= 7;
        var userName = record.get('Name');
        var url = '/Rest/Security/Modules/'+moduleId+'/Security/'+userName;
        
        view.securityLoading= true;
        Ext.Ajax.request({
          url: url,
          method: 'GET',
          success: function(resp,operation) {
            if (resp.responseText)
                var json = JSON.parse(resp.responseText);
            if (json)
                security = json;
            
            
            view.securityLoading= false;
            view.security = security;
            view.url = url;

            me.setSecurity.call(me,view);
            
            me.onRefreshModulesClick(view);

          }
        });

	},
    
    
    showEventos : function(view) {
        var record = view.record; 
        var modules = view.modules;
        var tabpanel = view.up('tabpanel');
        var me = this;
        
        if (view.securityLoading){
            Ext.Function.defer(me.showEventos, 500, me, arguments);
        } else{
            if (!tabpanel.down('EventSecurity')){
                var tab = tabpanel.add(Ext.widget('EventSecurity',{
                    record: view.record,
                    modules: view.modules,
                    security: view.security,
                    url: view.url,                    
                    moduleFlag:'trackguard'
                }));
            }
            
        }
        
        if (!tabpanel.down('TrackGuardSettingsView')){
            var tab = tabpanel.add(Ext.widget('TrackGuardSettingsView',{
                record: view.record,
                modules: view.modules,
                security: view.security,
                url: view.url, 
                moduleFlag:'trackguard'
            }));
         }

    },
    
    
    onSaveEventClick : function(button, event, options) {
        var me = this;
        var view = button.up('EventSecurity')?button.up('EventSecurity'):button.up('tabpanel').down('EventSecurity');
        var security = view.security;
        var record =  view.record;
        
        var store = view.getStore();
        var url = view.url;//+'/'+userId;
        var chkClaves = view.up('tabpanel').down('TrackGuardSecurity').down('#chkClaves');
        security.event = Ext.pluck(store.data.items, 'data');
        security.rights={
            claves: chkClaves.checked,
            CantidadCuentas: view.up('tabpanel').down('TrackGuardSettingsView').down('#cantidadcuentas').getValue(),
            GenerarEventos: view.up('tabpanel').down('TrackGuardSettingsView').down('#chkGenerarEventos').getValue()
        }
        
        var json = Ext.encode(security);
        //var json = Ext.encode(Ext.pluck(store.data.items, 'data'));
        
        Ext.Ajax.request({
          url: url,
          method: 'PUT',
          params: json,
          success: function(resp,operation) {
              me.initEventView(view);
            notify('Los datos se guardaron con éxito');
          }
        });
    },
    
    initEventView: function(view){
        
        var store = deepCloneStore(this.getEventSecurityModuleStoreStore());
       
        var security = view.security;
        
        if (security && security.event && security.event.length>0) {
            store.loadData(Ext.Array.clone(security.event));
        }
        
        view.bindStore(store);
        
        this.limpiarEventosConMasterWebDealer(view)
        
    },
    
    
    limpiarEventosConMasterWebDealer: function (view) {
        
        //Limpio el Store segun lo que tiene el MASTER WEBDEALER
        var isAdmin = false;
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordMaster = storeSecurity.findRecord('KeyReference', 'TrackGuard',0,false,false,true)
        var recordAdmin = storeSecurity.findRecord('KeyReference', 'Administrator',0,false,false,true)
        if (recordAdmin && recordAdmin.get('Available') == true){
            isAdmin= true;
        }
        if(recordMaster && recordMaster.get('Available') == true && !isAdmin) {
            var viewStore = view.getStore()                                
            var securityMaster = recordMaster.get('_Security');
            if(securityMaster && securityMaster.event) {  
                Ext.Array.each(securityMaster.event, function (v,k) {
                    if(v.profile == 0) {
                        viewStore.remove(viewStore.findRecord('view', v.view))
                    }
                }) 
            } else {
                viewStore.removeAll()
            }
        }
    
    },
    
    onApplyPerfilClick : function(button, event, options) {
        var view = button.up('TrackGuardSecurity');
        var selmodel = view.getSelectionModel();
        var selection = selmodel.getSelection();
        
        var profile = view.down('#comboPerfil').getValue();
        
        Ext.Array.each(selection, function(_module){
            _module.set('profile',profile);
        })
    },
    
    onApplyPerfilEventClick : function(button, event, options) {
        var view = button.up('EventSecurity[moduleFlag=trackguard]');
        var selmodel = view.getSelectionModel();
        var selection = selmodel.getSelection();
        
        var profile = view.down('#comboPerfilEventos').getValue();
        
        Ext.Array.each(selection, function(_module){
            _module.set('profile',profile);
        })
    },
    
    setSecurity: function(view){
        var security = view.security;
        var trackguardStore =  this.getTrackGuardSecurityModuleStoreStore();
        
        // muestro la paleta de eventos
        this.showEventos(view);
        
        var store = Ext.create('Ext.data.Store',{
            model: this.getModuleModelModel()
        });
        
        if (security){
            
            //Proceso modules
           if (security.modules && security.modules.length>0){
                store.loadData(Ext.Array.clone(security.modules));
                view.bindStore(store);
            }
            else{
                //Actualizo si es viejo
                
                view.bindStore(trackguardStore);
                var gridStore = view.getStore();
                Ext.Array.each(security, function(_module){
                    var coincide = gridStore.findRecord('text', _module.text, 0, false, true, true);
                    if (coincide){
                        coincide.set('profile', _module.profile)
                    }
                });
                
                view.security.modules = [];
                view.security.rights = [];
                view.security.event = [];
                
            }
                    
            if (security.rights){
                
                var chkClaves = view.down('#chkClaves');
                chkClaves.setChecked(security.rights.claves)

                var chkCrearMantenimiento = view.down('#chkCrearMantenimiento');
                chkCrearMantenimiento.setChecked(security.rights.crearMantenimiento)
                
            }
        } else{
            view.bindStore(trackguardStore);
        }
        
        
    },

	onSaveClick : function(button, event, options) {
		var view = button.up('TrackGuardSecurity');
        var security = view.security;
        var record =  view.record;
        var store = view.getStore();
        var url = view.url;//+'/'+userId;
        var me = this;
    
        security.modules = Ext.pluck(store.data.items, 'data');
       
        var chkClaves = view.down('#chkClaves');
        var chkCrearMantenimiento = view.down('#chkCrearMantenimiento');
    
        security.modules = Ext.pluck(store.data.items, 'data');
        security.rights={
            claves: chkClaves.checked,
            crearMantenimiento : chkCrearMantenimiento.checked,
            CantidadCuentas: view.up('tabpanel').down('TrackGuardSettingsView').down('#cantidadcuentas').getValue(),
            GenerarEventos: view.up('tabpanel').down('TrackGuardSettingsView').down('#chkGenerarEventos').getValue()
        }

        var json = Ext.encode(security);
        
        Ext.Ajax.request({
          url: url,
          method: 'PUT',
          params: json,
          success: function(resp,operation) {
            me.initview(view);
            notify('Los datos se guardaron con éxito');
          }
        });
    }, 

    /*onRefreshModulesClick : function(button, event, options) {
    	var view = button.up('TrackGuardSecurity');
        var store = this.getTrackGuardSecurityModuleStoreStore();
        
        view.bindStore(store);
    },*/
    
    
    onRefreshModulesClick : function(button, event, options) {
        var view = button.up('TrackGuardSecurity')?button.up('TrackGuardSecurity'):button;
        var gridstore = view.getStore();

        var store = this.getTrackGuardSecurityModuleStoreStore();
       
       
        var cantidad = store.data.length-1;
       
        store.each(function(pstore,i)  
            {  
                gridstore.each(function(gstore)  
                {  
                  if(pstore.get('text') == gstore.get('text')) {
                      var profile = gstore.get('profile')?gstore.get('profile'):0;
                      pstore.set('profile', profile);
                     
                  }
                  
                },this);
                
            },this); 
            
        view.bindStore(store);
        
        this.limpiarSecurityConMasterWebDealer(view)
        
    },

    limpiarSecurityConMasterWebDealer: function (view) {
        
        //Limpio el Store segun lo que tiene el MASTER WEBDEALER
        var isAdmin = false;
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordMaster = storeSecurity.findRecord('KeyReference', 'TrackGuard',0,false,false,true)
        var recordAdmin = storeSecurity.findRecord('KeyReference', 'Administrator',0,false,false,true)
        if (recordAdmin && recordAdmin.get('Available') == true){
            isAdmin= true;
        }
        if(recordMaster && recordMaster.get('Available') == true && !isAdmin) {
                //console.log(recordMaster.get('_Security').modules)
                var viewStore = view.getStore()
                
                var securityMaster = recordMaster.get('_Security');
                
                if(securityMaster && securityMaster.modules) {
                    
                    Ext.Array.each(securityMaster.modules, function (v,k) {
                        if(v.profile == 0) {
                            if(viewStore.findRecord('view', v.view)) {
                                viewStore.remove(viewStore.findRecord('view', v.view))
                            }
                        }
                    })
                } else {
                    viewStore.removeAll()
                }
                    
                if(securityMaster && securityMaster.rights) { 
                    //constroll de checkbox
                    if(!securityMaster.rights.claves) {
                        view.down('#chkClaves').hide()
                        view.down('#permisosespeciales').hide()
                        
                    }
                    
                } else {                    
                    view.down('#chkClaves').hide()
                    view.down('#permisosespeciales').hide()
                }
                    
                
            }
    
    },
    
    limpiarSettingConMasterWebDealer: function (view) {
        
        //Limpio el Store segun lo que tiene el MASTER WEBDEALER
        var isAdmin = false;
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordMaster = storeSecurity.findRecord('KeyReference', 'TrackGuard',0,false,false,true)
        var recordAdmin = storeSecurity.findRecord('KeyReference', 'Administrator',0,false,false,true)
        if (recordAdmin && recordAdmin.get('Available') == true){
            isAdmin= true;
        }
        if(recordMaster && recordMaster.get('Available') == true && !isAdmin) {
                //console.log(recordMaster.get('_Security').modules)
               
                
                var securityMaster = recordMaster.get('_Security');
                if(securityMaster && securityMaster.rights) { 
                    if(securityMaster.rights.CantidadCuentas) {
                        view.down('#cantidadcuentas').setDisabled(true)
                        view.down('#cantidadcuentas').setValue(securityMaster.rights.CantidadCuentas)
                        
                        
                    }
                    
                    if(securityMaster.rights.GenerarEventos) {
                        view.down('#chkGenerarEventos').setValue(securityMaster.rights.GenerarEventos)
                        
                        
                    }
                } else {                    
                   
                    view.down('#cantidadcuentas').setDisabled(true)
                }
                    
                
            }
    
    },
    
    openFormWindow: function(title,record,grid){
        var newView = Ext.widget('administratormoduleformview',{
            record: record,            
            scope: this,
            grid: grid
        }
        );
        // Lo agregamos al panel
        var myWindow = Ext.widget('window',{
            title: title,
            height: 250,
            width: 400,
            modal: true, 
            items: newView,
            layout: 'fit'
        }).show();
    },

    onObjectChanged: function(event){
        var view = event.view;
        var store = view.getStore();
        
        // una vez que cargue el store hago el binding con la view
        store.load({
            ObjectId: view.record.get('Id'),
            Module: 'TrackGuardMonitoreo'
        });
    }
});
Ext.define('Administrator.controller.FenceManagerSecurityController', {
    extend : 'Ext.app.Controller',
    stores : [ 'FenceManagerSecurityStore', 'EventSecurityModuleStore' ],
    models : [ 'ModuleModel' ],
    views : [ 'FenceManagerSecurityView', 'FenceEventSecurityView' ],

    init : function(config) {
        // this.initConfig(config);
    	// genero los eventos

		this.control({
            'FenceManagerSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'FenceManagerSecurity' : {
                beforerender : this.initview,
                objectchanged: this.onObjectChanged
			},
            'FenceEventSecurityView[moduleFlag=fence]' : {
                beforerender : this.initEventView
    		},
            'FenceEventSecurityView[moduleFlag=fence] button[action=saveEvent]': {
                click: this.onSaveEventClick
            },
            'FenceEventSecurityView[moduleFlag=fence] button[action=refreshModulesEvent]': {
                click: this.onRefreshModulesEventClick
            },
            'FenceEventSecurityView[moduleFlag=fence] button[action=applyPerfilEventos]': {
                click: this.onApplyPerfilEventClick
            },
            'FenceManagerSecurity button[action=refreshModules]': {
                click: this.onRefreshModulesClick
            },
            'FenceManagerSecurity button[action=applyPerfil]': {
                click: this.onApplyPerfilClick
            }
		});
	}, // administratormoduleformview
    
    
    
    onRefreshModulesEventClick : function(button, event, options) {
        var view = button.up('FenceEventSecurityView')?button.up('FenceEventSecurityView'):button;
        var gridstore = view.getStore();
        var store = deepCloneStore(this.getEventSecurityModuleStoreStore());
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
        
        this.limpiarEventosConMasterWebDealer(view)
        
    },
    
    onRefreshModulesClick : function(button, event, options) {
        var view = button.up('FenceManagerSecurity')?button.up('FenceManagerSecurity'):button;
        var gridstore = view.getStore();

        var store = this.getFenceManagerSecurityStoreStore();
       
       
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
    
    onApplyPerfilClick : function(button, event, options) {
        var view = button.up('FenceManagerSecurity');
        var selmodel = view.getSelectionModel();
        var selection = selmodel.getSelection();
        
        var profile = view.down('#comboPerfil').getValue();
        
        Ext.Array.each(selection, function(_module){
            _module.set('profile',profile);
        })
    },
    
    initEventView: function(view){
        var store = deepCloneStore(this.getEventSecurityModuleStoreStore());
        var security = view.security;
        var id = view.record.get('Id');
        
        if (security && security.event && security.event.length>0) {
            
            store.loadData(Ext.Array.clone(security.event));
            
        }

        view.bindStore(store);
        
        
       this.limpiarEventosConMasterWebDealer(view)
 

    },
    
    limpiarEventosConMasterWebDealer: function (view) {
        
        //Limpio el Store segun lo que tiene el MASTER WEBDEALER
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordMaster = storeSecurity.findRecord('KeyReference', 'MasterWebDealer')
        if(recordMaster && recordMaster.get('Available') == true) {            
            var viewStore = view.getStore()
            if(recordMaster.get('_Security')) {  
                Ext.Array.each(recordMaster.get('_Security').event, function (v,k) {
                    if(v.profile == 0) {
                        viewStore.remove(viewStore.findRecord('view', v.view))
                    }
                })
            } else {
                viewStore.removeAll()
            }
            
        }
    
    },
    
    
    
	initview : function(view) {
        var security = {modules:[],rights:[], event:[]}
        var record = view.record; 
        var modules = view.modules;
        var moduleId= modules.getAt(0).get('dwm_idModules');
        var userName = record.get('Name');
        var url = '/Rest/Security/Modules/'+moduleId+'/Security/'+userName;
        var me=this;

        view.securityLoading= true;
        Ext.Ajax.request({
          url: url,
          method: 'GET',
          success: function(resp,operation) {
            if (resp.responseText)
                var json = JSON.parse(resp.responseText);
            if (json)
                security = json;
            
            view.security = security;
            view.securityLoading= false;
            view.url = url;
            
            me.setSecurity.call(me,view);
            
            view.up('tabpanel').setActiveTab(view);

            me.onRefreshModulesClick(view);    

          }
        });

	},
    
    
    limpiarSecurityConMasterWebDealer: function (view) {
        //Limpio el Store segun lo que tiene el MASTER WEBDEALER
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
        var recordMaster = storeSecurity.findRecord('KeyReference', 'MasterWebDealer')
        if(recordMaster && recordMaster.get('Available') == true) {
            //console.log(recordMaster.get('_Security').modules)
            var viewStore = view.getStore()
            
            var securityMaster = recordMaster.get('_Security');
            
            if(securityMaster && securityMaster.modules) {
                
                Ext.Array.each(securityMaster.modules, function (v,k) {
                    if(v.profile == 0) {
                        viewStore.remove(viewStore.findRecord('view', v.view))
                    }
                })
            } else {
                viewStore.removeAll()
            }
                
            if(securityMaster && securityMaster.rights) { 
                //constroll de checkbox
                if(!securityMaster.rights.create) {
                    view.down('#chkCreate').hide()
                }                 
                if(!securityMaster.rights.copy) {
                    view.down('#chkCopy').hide()
                }
                if(!securityMaster.rights.delete) {
                    view.down('#chkDelete').hide()
                }
                if(!securityMaster.rights.multicuenta) {
                    view.down('#chkMulticuenta').hide()
                }
                if(!securityMaster.rights.tiemporeal) {
                    view.down('#chkTiempoReal').hide()
                }
                if(!securityMaster.rights.claves) {
                    view.down('#chkClaves').hide()
                }
                if(!securityMaster.rights.changedealer) {
                    view.down('#changeDealer').hide()
                }
                if(!securityMaster.rights.exportar) {
                    view.down('#exportar').hide()
                }
                
                if(!securityMaster.rights.cambionumerocuenta) {
                    view.down('#chkCambioNumero').hide()
                }
            } else {
                view.down('#chkCreate').hide()
                view.down('#chkCopy').hide()
                view.down('#chkMulticuenta').hide()
                view.down('#chkTiempoReal').hide()
                view.down('#chkClaves').hide()
                view.down('#changeDealer').hide()
                view.down('#exportar').hide()
                view.down('#chkCambioNumero').hide()          
            }
        }
    },
    
    setSecurity: function(view){
        var security = view.security;
        var webdealerStore =  deepCloneStore(this.getFenceManagerSecurityStoreStore());
        
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
                
                view.bindStore(webdealerStore);
                var gridStore = view.getStore();
                Ext.Array.each(security, function(_module){
                    var coincide = gridStore.findRecord('text', _module.text, 0, false, true, true);
                    if (coincide){
                        coincide.set('profile', _module.profile)
                    }
                });
                
                view.security = {modules:[],rights:[], event:[]};
            }
     
            if (security.rights){
                
                var chkCreate = view.down('#chkCreate');
                chkCreate.setChecked(security.rights.create);
                
                var chkCopy = view.down('#chkCopy');
                chkCopy.setChecked(security.rights.copy);
                
                var chkDelete = view.down('#chkDelete');
                chkDelete.setChecked(security.rights.delete);
                
                var chkMulticuenta = view.down('#chkMulticuenta');
                chkMulticuenta.setChecked(security.rights.multicuenta)
                
                var chkTiempoReal = view.down('#chkTiempoReal');
                chkTiempoReal.setChecked(security.rights.tiemporeal)
                
                var chkClaves = view.down('#chkClaves');
                chkClaves.setChecked(security.rights.claves)
                
                var changeDealer = view.down('#changeDealer');
                changeDealer.setChecked(security.rights.changedealer)
                
                var exportar = view.down('#exportar');
                exportar.setChecked(security.rights.exportar)
                
                var exportar = view.down('#chkCambioNumero');
                exportar.setChecked(security.rights.cambionumerocuenta)
                
                
            }
        } else{
            view.bindStore(webdealerStore);
        }

	},
    
    showEventos : function(view) {
        var record = view.record; 
        var modules = view.modules;
        var tabpanel = view.up('tabpanel');
        var me = this;
        
        if (view.securityLoading){
            Ext.Function.defer(me.showEventos, 500, me, arguments);
        } else{
            if (!tabpanel.down('FenceEventSecurityView')){
                var tab = tabpanel.add(Ext.widget('FenceEventSecurityView',{
                    record: view.record,
                    modules: view.modules,
                    security: view.security,
                    url: view.url,
                    moduleFlag:'fence'
                }));
            }
            
        }

    },
    
    
    onSaveEventClick : function(button, event, options) {
       /* var me = this;
        var view = button.up('FenceManagerSecurity');
        var viewParent = view.up('tabpanel').down('WebDealerSecurity');
        var security = viewParent.security;
        var record =  view.record;
        
        var store = view.getStore();
        var url = view.url;//+'/'+userId;
    
        security.event = Ext.pluck(store.data.items, 'data');
        
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
        });*/
        
        this.onSaveClick(button.up('tabpanel').down('FenceManagerSecurity'))
    },

	onSaveClick : function(button, event, options) {
        
        var view = button.up('FenceManagerSecurity')?button.up('FenceManagerSecurity'):button;

        var me =this;
        var security = view.security;
        var record =  view.record;
        //var userId = record.get('Id');
        var store = view.getStore();
        var url = view.url;//+'/'+userId;
        var chkCreate = view.down('#chkCreate');
        var chkCopy = view.down('#chkCopy');
        var chkDelete = view.down('#chkDelete');
        var chkMulticuenta = view.down('#chkMulticuenta');
        var chkTiempoReal = view.down('#chkTiempoReal');
        var chkClaves = view.down('#chkClaves');
        var changeDealer = view.down('#changeDealer');
        var exportar = view.down('#exportar');
        var cambionumerocuenta = view.down('#chkCambioNumero');
    
        security.modules = Ext.pluck(store.data.items, 'data');
        security.rights={
            create: chkCreate.checked,
            copy: chkCopy.checked,
            delete: chkDelete.checked,
            multicuenta: chkMulticuenta.checked,
            tiemporeal: chkTiempoReal.checked,
            claves: chkClaves.checked,
            changedealer: changeDealer.checked,
            exportar: exportar.checked,
            cambionumerocuenta: cambionumerocuenta.checked
        }

        var viewEvent = view.up('tabpanel').down('FenceEventSecurityView[moduleFlag=fence]');
        
        var store = viewEvent.getStore();
    
        security.event = Ext.pluck(store.data.items, 'data');

        var json = Ext.encode(security);
        //var json = Ext.encode(Ext.pluck(store.data.items, 'data'));
        
        Ext.Ajax.request({
          url: url,
          method: 'PUT',
          params: json,
          success: function(resp,operation) {
            //me.initview(view);
            notify('Los datos se guardaron con éxito');
          }
        });
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
            Module: 'WebDealer'
        });
    },
    
    onApplyPerfilEventClick : function(button, event, options) {
        var view = button.up('FenceEventSecurityView');
        var selmodel = view.getSelectionModel();
        var selection = selmodel.getSelection();
        
        var profile = view.down('#comboPerfilEventos').getValue();
        
        Ext.Array.each(selection, function(_module){
            _module.set('profile',profile);
        })
    },
});
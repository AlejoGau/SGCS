Ext.define('Administrator.controller.VigiControlSecurityController', {
    extend : 'Ext.app.Controller',
    stores : [ 'VigiControlSecurityModulesStore', 'EventSecurityModuleStore' ],
    models : [ 'ModuleModel' ],
    views : [ 'VigiControlSecurityView', 'EventSecurityView' ],

    init : function(config) {
        // this.initConfig(config);
        // genero los eventos

    	this.control({
            'VigiControlSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'VigiControlSecurity' : {
                beforerender : this.initview,
                objectchanged: this.onObjectChanged
			},
            'VigiControlSecurity[moduleFlag=vigicontrol] button[action=refreshModules]': {
                click: this.onRefreshModulesClick
            },
            'VigiControlSecurity button[action=applyPerfil]': {
                click: this.onApplyPerfilClick
            },
            'EventSecurity[moduleFlag=vigicontrol]' : {
                beforerender : this.initEventView
        	},
            'EventSecurity[moduleFlag=vigicontrol] button[action=saveEvent]': {
                click: this.onSaveEventClick
            },
            'EventSecurity[moduleFlag=vigicontrol] button[action=applyPerfilEventos]': {
                click: this.onApplyPerfilEventClick
            },
            'EventSecurity[moduleFlag=vigicontrol] button[action=refreshModulesEvent]': {
                click: this.onRefreshModulesEventClick
            }
		});
	}, // administratormoduleformview
    
    
    
    onApplyPerfilEventClick : function(button, event, options) {
        var view = button.up('EventSecurity[moduleFlag=trackguard]');
        var selmodel = view.getSelectionModel();
        var selection = selmodel.getSelection();
        var profile = view.down('#comboPerfilEventos').getValue();
        
        Ext.Array.each(selection, function(_module){
            _module.set('profile',profile);
        })
    },
    
    
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
    
    onRefreshModulesClick : function(button, event, options) {
        var view = button.up('VigiControlSecurity')?button.up('VigiControlSecurity'):button;
        var gridstore = view.getStore();
        var store = this.getVigiControlSecurityModulesStoreStore();
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
    
    onApplyPerfilClick : function(button, event, options) {
        var view = button.up('VigiControlSecurity');
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
    },
    
    onSaveEventClick : function(button, event, options) {
        this.onSaveClick(button.up('tabpanel').down('VigiControlSecurity'))
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
    
    setSecurity: function(view){
        var security = view.security;
        var securityStore =  this.getVigiControlSecurityModulesStoreStore();
        
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
                view.bindStore(securityStore);
                var gridStore = view.getStore();
                Ext.Array.each(security, function(_module){
                    var coincide = gridStore.findRecord('text', _module.text, 0, false, true, true);
                    if (coincide){
                        coincide.set('profile', _module.profile)
                    }
                });
                
                view.security = {modules:[],rights:[], event:[]};
            }
            
            
            if(security.chkDispositivosActivos) {
                view.down('#chkDispositivosActivos').setChecked(security.chkDispositivosActivos) 
            }
            if(security.chkDispositivosSinAsignar) {
                view.down('#chkDispositivosSinAsignar').setChecked(security.chkDispositivosSinAsignar) 
            }
            if(security.chkEventos) {
                view.down('#chkEventos').setChecked(security.chkEventos) 
            }
            if(security.chkObjetivos) {
                view.down('#chkObjetivos').setChecked(security.chkObjetivos) 
            }
            if(security.chkSeguimiento) {
                view.down('#chkSeguimiento').setChecked(security.chkSeguimiento) 
            }
            if(security.chkCambioNumero) {
                view.down('#chkCambioNumero').setChecked(security.chkCambioNumero) 
            }

            /**
             * 28/05 - Se agrega a la metadata de seguridad del modulo, la posibilidad de ver la solapa de Vigiladores Conectados
             * Se permite enviar notificaciones push.
             */ 
            if(security.chkPushNotificaciones) {
                view.down('#chkPushNotificaciones').setChecked(security.chkPushNotificaciones) 
            }
      
        } else{
            view.bindStore(securityStore);
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
            if (!tabpanel.down('EventSecurity')){
                var tab = tabpanel.add(Ext.widget('EventSecurity',{
                    record: view.record,
                    modules: view.modules,
                    security: view.security,
                    url: view.url,
                    moduleFlag:'vigicontrol'
                }));
            } 
        }
    },

	onSaveClick : function(button, event, options) {
        var view = button.up('VigiControlSecurity')?button.up('VigiControlSecurity'):button;
		//var view = button.up('VigiControlSecurity');
        var me =this;
        var security = view.security;
        var record =  view.record;
        //var userId = record.get('Id');
        var store = view.getStore();
        var url = view.url;//+'/'+userId;

        var changeDealer = view.down('#changeDealer');
        
        security.chkObjetivos =  view.down('#chkObjetivos').checked
        security.chkDispositivosActivos =  view.down('#chkDispositivosActivos').checked
        security.chkDispositivosSinAsignar =  view.down('#chkDispositivosSinAsignar').checked
        security.chkEventos =  view.down('#chkEventos').checked
        security.chkSeguimiento =  view.down('#chkSeguimiento').checked
        security.chkCambioNumero =  view.down('#chkCambioNumero').checked
        
        /**
         * 28/05 - Se agrega a la metadata de seguridad del modulo, la posibilidad de ver la solapa de Vigiladores Conectados
         * Se permite enviar notificaciones push.
         */        
        security.chkPushNotificaciones = view.down('#chkPushNotificaciones').checked
           
    
        security.modules = Ext.pluck(store.data.items, 'data');
        
        
        var viewEvent = view.up('tabpanel').down('EventSecurity[moduleFlag=vigicontrol]');
        
        var store = viewEvent.getStore();
    
        security.event = Ext.pluck(store.data.items, 'data');
        security.rights = {create:true}

        var json = Ext.encode(security);
        //var json = Ext.encode(Ext.pluck(store.data.items, 'data'));
        
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
        var view = button.up('EventSecurity');
        var selmodel = view.getSelectionModel();
        var selection = selmodel.getSelection();
        
        var profile = view.down('#comboPerfilEventos').getValue();
        
        Ext.Array.each(selection, function(_module){
            _module.set('profile',profile);
        })
    }
});
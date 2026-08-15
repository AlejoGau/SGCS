Ext.define('Administrator.controller.TrackguardMonitoreoSecurityController', {
    extend : 'Ext.app.Controller',
    stores : [ 'TrackGuardMonitoreoSecurityModuleStore' ],
    models : [  ],
    views : [ 'TrackGuardMonitoreoSecurityView', 'EventSecurityView' ],

    init : function(config) {
        // this.initConfig(config);
    	// genero los eventos

		this.control({
            'TrackGuardMonitoreoSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'TrackGuardMonitoreoSecurity' : {
                beforerender : this.initview,
                objectchanged: this.onObjectChanged
			},
            'TrackGuardMonitoreoSecurity button[action=refreshModules]': {
                click: this.onRefreshModulesClick
            },
            'TrackGuardMonitoreoSecurity button[action=applyPerfil]': {
                click: this.onApplyPerfilClick
            }
		});
	}, // administratormoduleformview
    
	initview : function(view) {
        var me = this;
        var security = {modules:[],rights:[], event:[]}
        var record = view.record; 
        var modules = view.modules;
        var moduleId= 17;
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
                
                me.showEventos(view);
                me.onRefreshModulesClick(view);
            }
        });
	},

     onApplyPerfilClick: function(button, event, options ) {
        var view = button.up( 'TrackGuardMonitoreoSecurity' );
        var selmodel = view.getSelectionModel();
        var selection = selmodel.getSelection();
        var profile = view.down( '#comboPerfil' ).getValue();

        Ext.Array.each( selection, function( _module ) {
            _module.set( 'profile', profile );
        })
    },
    
    showEventos : function(view) {
        var tabpanel = view.up('tabpanel');
        var store = Ext.create('Ext.data.Store',{
            model: 'Common.model.ModuleModel',
        })
        view.bindStore(store);
        
        var securityStore = this.getTrackGuardMonitoreoSecurityModuleStoreStore();
        var security = view.security;
        
        if (security && security.modules.length>0){
            store.loadData(Ext.Array.clone(security.modules));
        } else{
            store.loadData(Ext.Array.clone(Ext.pluck(securityStore.data.items, 'data')));   
        }
    },

	onSaveClick : function(button, event, options) {
		var view = button.up('TrackGuardMonitoreoSecurity');
        var security = view.security;
        var record =  view.record;
        //var userId = record.get('Id');
        var store = view.getStore();
        var url = view.url;//+'/'+userId;
        var me = this;
    
        security.modules = Ext.pluck(store.data.items, 'data');

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

    onRefreshModulesClick : function(button, event, options) {
        var view = button.up('TrackGuardMonitoreoSecurity')?button.up('TrackGuardMonitoreoSecurity'):button;
        var gridstore = view.getStore();
        var store = this.getTrackGuardMonitoreoSecurityModuleStoreStore();
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
        var recordMaster = storeSecurity.findRecord('KeyReference', 'TrackGuardMonitoreo',0,false,false,true)
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
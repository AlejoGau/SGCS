Ext.define('Administrator.controller.DesktopSecurityController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ModuleModel' ],
    views : [ 'EventSecurityView' ],

    init : function(config) {
        // this.initConfig(config);
    	// genero los eventos

		this.control({
            'DesktopSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'DesktopSecurity' : {
                added: this.showEventos
			},
            'EventSecurity[moduleFlag=desktop]' : {
                beforerender : this.initEventView
    		},
            'EventSecurity[moduleFlag=desktop] button[action=saveEvent]': {
                click: this.onSaveEventClick
            },
            'EventSecurity[moduleFlag=desktop] button[action=refreshModulesEvent]': {
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

    showEventos : function(view, tabpanel) {
        var security = {modules:[],rights:[], event:[]}
        var record = view.record; 
        var modules = view.modules;
        var moduleId= 8;
        var userName = record.get('Name');
        var url = '/Rest/Security/Modules/'+moduleId+'/Security/'+userName;
        var tab = tabpanel.add(Ext.widget('EventSecurity',{
            record: view.record,
            modules: view.modules,
            moduleFlag:'desktop'
        }));
        
        Ext.Ajax.request({
          url: url,
          method: 'GET',
          success: function(resp,operation) {
            if (resp.responseText)
                var json = JSON.parse(resp.responseText);
            if (json)
                security = json;
            
            view.security = security;
            tab.security = security;
            
            view.url = url;
            tab.url = url;
          }
        });
    },
    
    
    initEventView: function(view){
        var store = view.getStore();
        var security = view.security;
        
        if (security && security.event && security.event.length>0)
        store.loadData(Ext.Array.clone(security.event));
    },
    
    onSaveEventClick : function(button, event, options) {
        var me = this;
    	var view = button.up('EventSecurity');
        var security = view.security;
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
        });
    },
    

	onSaveClick : function(button, event, options) {
		var view = button.up('WebDealerSecurity');
        var me =this;
        var security = view.security;
        var record =  view.record;
        //var userId = record.get('Id');
        var store = view.getStore();
        var url = view.url;//+'/'+userId;
        var chkCreate = view.down('#chkCreate');
        var chkDelete = view.down('#chkDelete');
        var chkMulticuenta = view.down('#chkMulticuenta');
        var chkTiempoReal = view.down('#chkTiempoReal');
        var chkClaves = view.down('#chkClaves');
    
        security.modules = Ext.pluck(store.data.items, 'data');
        security.rights={
            create: chkCreate.checked,
            delete: chkDelete.checked,
            multicuenta: chkMulticuenta.checked,
            tiemporeal: chkTiempoReal.checked,
            claves: chkClaves.checked
        }
        
        
        
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
    }
});
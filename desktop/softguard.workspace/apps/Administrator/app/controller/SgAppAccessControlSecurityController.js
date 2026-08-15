Ext.define('Administrator.controller.SgAppAccessControlSecurityController', {
    extend : 'Ext.app.Controller',
    stores : [ 'SgAppAccessControlSecurityStore' ],
    models : [ 'ModuleModel' ],
    views : [ 'SgAppAccessControlSecurityView', 'SgAppAccessControlSecurityFormView' ],

    init : function(config) {
        // this.initConfig(config);
        // genero los eventos

        this.control({
            'SgAppAccessControlSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'SgAppAccessControlSecurity' : {
                beforerender : this.initview,
                objectchanged: this.onObjectChanged
			},
            'SgAppAccessControlSecurity button[action=refreshModules]': {
                click: this.onRefreshModulesClick
            },
            'SgAppAccessControlSecurity button[action=applyPerfil]': {
                click: this.onApplyPerfilClick
            },
            'SgAppAccessControlSecurityFormView #acssave': {
                click: this.onSaveACSaveClick
            },
       
		});
	}, 

    onRefreshModulesClick : function(button, event, options) {
        var view = button.up('SgAppAccessControlSecurity')?button.up('SgAppAccessControlSecurity'):button;
        var gridstore = view.getStore();
        var store = this.getSgAppAccessControlSecurityStoreStore();
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
        var view = button.up('SgAppAccessControlSecurity');
        var selmodel = view.getSelectionModel();
        var selection = selmodel.getSelection();
        var profile = view.down('#comboPerfil').getValue();
        
        Ext.Array.each(selection, function(_module){
            _module.set('profile',profile);
        })
    },
    
    
    onSaveACSaveClick : function(button, event, options) {
        this.onSaveClick(button.up('tabpanel').down('SgAppAccessControlSecurity'))
        
    },
    
	initview : function(view) {
        var security = {modules:[],rights:{}, event:[]}
        var record = view.record; 
        var modules = view.modules;
        var moduleId= modules.getAt(0).get('dwm_idModules');
        var userName = record.get('Name');
        var url = '/Rest/Security/Modules/'+moduleId+'/Security/'+userName;
        var me=this;
        console.log("Cargando permisos....");
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

            view.up('tabpanel').setActiveTab(view);
            me.onRefreshModulesClick(view);

            if(!view.up('tabpanel').down('SgAppAccessControlSecurityFormView')) {
                var tab = view.up('tabpanel').add(Ext.widget('SgAppAccessControlSecurityFormView',{}));
            }

            me.setSecurity(view);

          }
        });
	},
    
    setSecurity: function(view){
        var security = view.security;
        var securityStore =  this.getSgAppAccessControlSecurityStoreStore();
        var tabpanel = view.up('tabpanel');

        // muestro la paleta de eventos
       // this.showEventos(view);
        
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

            if(security.rights.nuevoUsuario) {
                tabpanel.down('SgAppAccessControlSecurityFormView').down('#chkNuevoUsuario').setValue(security.rights.nuevoUsuario) 
            }  
            /**
             * Daniel Orlando Medina
             * 03/12/2020
             * https://basecamp.com/2249105/projects/17543484/todos/424647755
             * 
             */   
            if(security.rights.nuevoProveedor) {
                tabpanel.down('SgAppAccessControlSecurityFormView').down('#chkNuevoProveedor').setValue(security.rights.nuevoProveedor) 
            }                        
            if(security.rights.tabBienvenido){
                tabpanel.down('SgAppAccessControlSecurityFormView')
                        .down('#chkTabBienvenido').setValue(security.rights.tabBienvenido);
            } 
            if(security.rights.tabBienvenido){
                tabpanel.down('SgAppAccessControlSecurityFormView')
                        .down('#chkTabIntegrantesUsuarios').setValue(security.rights.tabIntegrantesUsuarios);
            }        
            if(security.rights.tabBienvenido){
                tabpanel.down('SgAppAccessControlSecurityFormView')
                        .down('#chkTabAccesosIO').setValue(security.rights.tabAccesosIO);
            }     
            if(security.rights.tabBienvenido){
                tabpanel.down('SgAppAccessControlSecurityFormView')
                        .down('#chkTabUnidadesFuncionales').setValue(security.rights.tabUnidadesFuncionales);
            }                             
            /*****************************************************************************************/
            if(security.rights.tabProveedores){
                tabpanel.down('SgAppAccessControlSecurityFormView')
                        .down('#chkTabProveedores').setValue(security.rights.tabProveedores);
            }
        } else{
            view.bindStore(securityStore);
        }
	},
    
    showEventos : function(view) {
      

    },

	onSaveClick : function(button, event, options) {
        var view = button.up('SgAppAccessControlSecurity')?button.up('SgAppAccessControlSecurity'):button;
        var me =this;
        var security = view.security;
        var record =  view.record;
        var store = view.getStore();
        var url = view.url;//+'/'+userId;        
        var tabpanel = view.up('tabpanel')

        security.rights = { nuevoUsuario :  tabpanel.down('#chkNuevoUsuario').checked,
                                    /**
                                     * Daniel Orlando Medina
                                     * 03/12/2020
                                     * https://basecamp.com/2249105/projects/17543484/todos/424647755
                                     * 
                                     */
                            nuevoProveedor : tabpanel.down('#chkNuevoProveedor').checked,
                            tabBienvenido : tabpanel.down('#chkTabBienvenido').checked,
                            tabIntegrantesUsuarios : tabpanel.down('#chkTabIntegrantesUsuarios').checked,
                            tabAccesosIO : tabpanel.down('#chkTabAccesosIO').checked,
                            tabUnidadesFuncionales: tabpanel.down('#chkTabUnidadesFuncionales').checked,
                            tabProveedores: tabpanel.down('#chkTabProveedores').checked
                                    /**************************************************/ 
                          };
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
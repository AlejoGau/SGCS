Ext.define('Administrator.controller.SgAppSerTecSecurityController', {
    extend : 'Ext.app.Controller',
    stores : [ 'TecGuardSecurityModulesStore', 'ServTecPanelModuleStore', 'ServTecPanelModuleModelStore' ],
    models : [ 'TablasInstaladoresSearchModel', 'TecnicosSearchModel', 'ModuleModel', 'InstaladoresByTokenSearchModel' ],
    views : [ 'SgAppSerTecSecurity', 'TecGuardSecurityView', 'SgAppSerTecSecurityModuleView', 'ClearButton' ],

    init : function(config) {
        this.control({
            'SgAppSerTecSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'SgAppSerTecSecurity' : {
                beforerender : this.initview
			},
            'SgAppSerTecSecurity #supervisor': {
                change: this.onChangeModo
            },
            'SgAppSerTecSecurityModuleView' : {
                beforerender : this.initEventView
            },
            'SgAppSerTecSecurityModuleView button[action=refreshModulesEvent]': {
                click: this.onRefreshModulesEventClick
            },
            'SgAppSerTecSecurityModuleView button[action=applyPerfilEventos]': {
                click: this.onApplyPerfilEventClick
            },
            'SgAppSerTecSecurityModuleView button[action=saveEvent]': {
                click: this.onSaveEventClick
            },
            'TecGuardSecurityView button[action=refreshModules]': {
                click: this.onRefreshTecGuardClick
            },
            'TecGuardSecurityView #applyPerfilTecGuard': {
                click: this.onApplyPerfilTecGuardClick
            },
            'TecGuardSecurityView button[action=saveSecurity]': {
                click: this.onSaveTecGuardClick
            }
		});
	}, // administratormoduleformview
    
    initEventView: function(view){
        var store = view.getStore();
        var security = view.security;
        var id = view.record.get('Id');
        
        if (security && security.event && security.event.length>0)
        store.loadData(Ext.Array.clone(security.event));  
    },
    
    onChangeModo: function (combo,newValue) {
        var view = combo.up('SgAppSerTecSecurity')
        view.down('#tecnicocontainer').hide()
        if(newValue == 0) {
            view.down('#tecnicocontainer').show()
        }
    },

    initview : function(view) {
        var record = view.record; 
        var modules = view.modules;
        var moduleId= 3;
        var userName = record.get('Name');
        var url = '/Rest/Security/Modules/'+moduleId+'/Security/'+userName;
        var combo = view.down('#instaladorCombo');
        var supervisor = view.down('#supervisor');
        //var cambiocuentaAWDM = view.down('#cambiocuentaAWDM');
        //var cambioestadoserviciodealermobile = view.down('#cambioestadoserviciodealermobile');
        var depositos = view.down('#depositos');
        var nuevoserviciotecnico = view.down('#nuevoserviciotecnico');7
                /**
                 * Daniel O. Medina 28/05/2023
                 * field set agregado según tarea https://softguard.atlassian.net/browse/DS-711
                 */        
        var seguimientoDisponible = view.down('#seguimientoDisponible');
        var seguimientoFrecuencia = view.down('#seguimientoFrecuencia');
        /********************************************************************** */
        var security = {modules:[],rights:[], event:[]}
        view.security = security;
        var me = this;
        
        view.url = url;
        view.tabPanel = view.up('tabpanel');

        view.metadata = Ext.define('metadata', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'Instalador',  type: 'string'},
                {name: 'Supervisor',  type: 'bool'},
                //{name: 'cambiocuentaAWDM',  type: 'bool'},                
                {name: 'Security',  type: 'string'},                
                {name: 'profile',  type: 'string'},
                //{name: 'cambioestadoserviciodealermobile',  type: 'bool'},
                {name: 'depositos',  type: 'bool'},
                {name: 'nuevoserviciotecnico',  type: 'bool'},
                /**
                 * Daniel O. Medina 28/05/2023
                 * field set agregado según tarea https://softguard.atlassian.net/browse/DS-711
                 */                  
                {name: 'seguimientodisponible', type: 'int'},
                {name: 'seguimientofrecuencia', type: 'int'},
                /************************************* */
                {name: 'empresa', type: 'int'} // Daniel O. Medina 29/01/2025 https://softguard.atlassian.net/browse/DK-621
            ],
            proxy: {
                type: 'rest',
                url: view.url,
                appendId: false
            }
        });
        
        var store = Ext.create('Ext.data.Store',{
            model: this.getInstaladoresByTokenSearchModelModel(),
            remoteFilter: true,
            pageSize: 10000,
            sorters: [{
                 property: 'ins_cnombre',
                 direction: 'ASC'
             }],
            filters:[
            {
                property: 'ins_iTipo:ININT',
                value: '1,2'
            }]
        });
        
        combo.bindStore(store);
        store.load();

        var comboEmpresa = view.down('#empresa');
        organizacionStore = Ext.create('Ext.data.Store',{
            model: this.getOrganizationSearchModelModel(),
            remoteFilter: true,
            paseSize: 10000,
            filters:[
                {
                    property: 'OrganizationType',
                    value: 'PROV'
                }
            ]
        });   
        organizacionStore.load();   

        comboEmpresa.bindStore(organizacionStore);
        var metadata = view.metadata;
        var tabpanel = view.up('tabpanel');
         //setTimeout(function(){ 
            
        //}, 100);
        
        metadata.load(0,{callback: function(record){
            tabpanel.add(Ext.widget('SgAppSerTecSecurityModuleView',{
                itemId:'aaa',
                title:'Procesos',
                record: view.record,
                modules: view.modules,
                security: view.security
            }));

            if (!tabpanel.down('TecGuardSecurityView')){
                tabpanel.add(Ext.widget('TecGuardSecurityView'));   
            }
                
            if(record.get('Security')) {
                view.security =  Ext.JSON.decode(record.get('Security'));
                me.setSecurity.call(me,view);
            }
            
            combo.setValue(record.get('Instalador'));
            supervisor.setValue(record.get('Supervisor'));
            //cambiocuentaAWDM.setValue(record.get('cambiocuentaAWDM'));
            
            //cambioestadoserviciodealermobile.setValue(record.get('cambioestadoserviciodealermobile'));
            depositos.setValue(record.get('depositos'));
                /**
                 * Daniel O. Medina 28/05/2023
                 * field set agregado según tarea https://softguard.atlassian.net/browse/DS-711
                 */              
            nuevoserviciotecnico.setValue(record.get('nuevoserviciotecnico'));
            seguimientoDisponible.setValue(record.get('seguimientodisponible'));
            /***************************************** */
            if (record.get('seguimientofrecuencia')>0)
                seguimientoFrecuencia.setValue(record.get('seguimientofrecuencia'));     



                console.log("record.get('profile')",record.get('profile'))       
            view.down('#profile').setValue(record.get('profile'));
            if (record.get('empresa')>0)
                comboEmpresa.setValue(record.get('empresa'));
        }});

    },

	onSaveClick : function(button, event, options) {
		var view = button.up('SgAppSerTecSecurity')?button.up('SgAppSerTecSecurity'):button;
        var url = view.url;
        var model = view.metadata; 
        var combo = view.down('#instaladorCombo');
        var supervisor = view.down('#supervisor');
        //var cambiocuentaAWDM = view.down('#cambiocuentaAWDM');
        //var cambioestadoserviciodealermobile = view.down('#cambioestadoserviciodealermobile');
        
        
        if(supervisor.getValue() == true) {
            combo.setValue('')
            //cambiocuentaAWDM.setValue(false)
        }
        
        var viewEvent = view.up('tabpanel').down('SgAppSerTecSecurityModuleView');        
        var store = viewEvent.getStore();    
        view.security.modules = Ext.pluck(store.data.items, 'data');

        var tecguard = view.up('tabpanel').down('TecGuardSecurityView');        
        var modulesstore = tecguard.getStore();    
        view.security.tecguard = Ext.pluck(modulesstore.data.items, 'data');

        
        var metadata = model.create({
            Instalador: combo.getValue(),
            Supervisor: supervisor.getValue(),
            //cambiocuentaAWDM: cambiocuentaAWDM.getValue(),
            Security: Ext.encode(view.security),
            profile: view.down('#profile').getValue(),
            //cambioestadoserviciodealermobile: view.down('#cambioestadoserviciodealermobile').getValue(),
            depositos: view.down('#depositos').getValue(),
            nuevoserviciotecnico: view.down('#nuevoserviciotecnico').getValue(),
            seguimientodisponible: view.down('#seguimientoDisponible').getValue(),
            seguimientofrecuencia: view.down('#seguimientoFrecuencia').getValue()
        });

        var json = Ext.encode(metadata.data);
        console.log("json json metadata ser tec",metadata.data)
        console.log("url sertec",url)
        Ext.Ajax.request({
            url: url,
            method: 'PUT',
            params: json,
            success: function(resp,operation) {
                notify('Los datos se guardaron con éxito');
            }
        });
    },

    onRefreshModulesEventClick : function(button, event, options) {
        var view = button.up('SgAppSerTecSecurityModuleView')?button.up('SgAppSerTecSecurityModuleView'):button;
        var gridstore = view.getStore();
        var store = this.getServTecPanelModuleModelStoreStore();
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

    onRefreshTecGuardClick: function(button, event, options) {
        var view = button.up('TecGuardSecurityView')?button.up('TecGuardSecurityView'):button;
        var gridstore = view.getStore();
        var store = this.getTecGuardSecurityModulesStoreStore();
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
    
    setSecurity: function(view){
        var security = view.security;
        var moduleView = view.up('tabpanel').down('SgAppSerTecSecurityModuleView');
        //var webdealerStore =  this.getWebDealerSecurityModulesStoreStore();
        var store = Ext.create('Ext.data.Store',{
            model: this.getModuleModelModel()
        });

        var tecguardmoduleView = view.up('tabpanel').down('TecGuardSecurityView');
        //var webdealerStore =  this.getWebDealerSecurityModulesStoreStore();
        var tecguardstore = Ext.create('Ext.data.Store',{
            model: this.getModuleModelModel()
        });
        
        if (security && moduleView){
            //Proceso modules
            if (security.modules && security.modules.length>0){
                store.loadData(Ext.Array.clone(security.modules));
                moduleView.bindStore(store);
            }else{
                //Actualizo si es viejoyy
                //view.bindStore(webdealerStore);
                var gridStore = moduleView.getStore();
                Ext.Array.each(security.event, function(_module){
                    var coincide = gridStore.findRecord('text', _module.text, 0, false, true, true);
                    if (coincide){
                        coincide.set('profile', _module.profile)
                    }
                });
            }

            if (security.tecguard && security.tecguard.length>0){
                tecguardstore.loadData(Ext.Array.clone(security.tecguard));
                tecguardmoduleView.bindStore(tecguardstore);
            }
        }
    },
    
    onApplyPerfilTecGuardClick : function(button, event, options) {
        var view = button.up('TecGuardSecurityView');
        var selmodel = view.getSelectionModel();
        var selection = selmodel.getSelection();
        var profile = view.down('#comboPerfilTecGuard').getValue();
        
        Ext.Array.each(selection, function(_module){
            _module.set('profile',profile);
        })
    },

    onApplyPerfilEventClick: function(button, event, options) {
        var view = button.up('SgAppSerTecSecurityModuleView');
        var selmodel = view.getSelectionModel();
        var selection = selmodel.getSelection();
        var profile = view.down('#comboPerfilEventos').getValue();
        
        Ext.Array.each(selection, function(_module){
            _module.set('profile',profile);
        })
    },
    
    onSaveEventClick : function(button, event, options) {
        var me = this;
        var view = button.up('SgAppSerTecSecurityModuleView');
        this.onSaveClick(view.up('tabpanel').down('SgAppSerTecSecurity'))
    },
    
    onSaveTecGuardClick : function(button, event, options) {
        var me = this;
        var view = button.up('TecGuardSecurityView');
        this.onSaveClick(view.up('tabpanel').down('SgAppSerTecSecurity'))
    }
});
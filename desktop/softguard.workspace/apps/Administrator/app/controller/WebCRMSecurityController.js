Ext.define('Administrator.controller.WebCRMSecurityController', {
    extend : 'Ext.app.Controller',
    stores : [ 'CrmStoreSecurityModulesStore' ],
    models : [ 'ModuleModel' ],
    views : [ 'WebCRMSecurityView' ],

    init : function(config) {
        this.control({
            'WebCRMSecurity' : {
                beforerender : this.initview
    		},
            'WebCRMSecurity button[action=saveSecurity]': {
                click: this.onSaveSecurityClick
            },
            'WebCRMSecurity #organizaciones': {
                change: this.onOrganizacionChange
            }
            
		});
	},
    
    onOrganizacionChange: function (check,value) {
        var view = check.up('WebCRMSecurity')
        
        if(value) {
            view.down('#organizacionesitems').show()
        } else {
            view.down('#organizacionesitems').hide()
            
            view.down('#contactos').setValue(false)
            view.down('#productos').setValue(false)
            view.down('#calendario').setValue(false)
            view.down('#cotizaciones').setValue(false)
            view.down('#smartmail').setValue(false)
            view.down('#grupos').setValue(false)
            view.down('#contratos').setValue(false)
        }
    },    

    
    initview : function(view) {
        var record = view.record; 
        var modules = view.modules;
        var module = view.module;
        var moduleId= module.get('udm_idKey');
        var userName = record.get('Name');
        var url = '/Rest/Security/Modules/'+moduleId+'/Security/'+userName;
        var security = {modules:[],rights:[], event:[]},
        me = this;
        view.url = url;
        view.security = security;
        
        
        Ext.Ajax.request({
          url: url,
          method: 'GET',
          success: function(resp,operation) {
            if (resp.responseText) {
                // Parseo el JSON de respuesta
                var json = JSON.parse(resp.responseText);
            }
            if (json) {
                // Si existe el JSON, se lo asigno a Security
                security = json;
            }
            if (security.rights) {
                // Leo los derechos que traigo del JSON y asigno a los elementos correspondientes
                var chkEliminarTodo = view.down('#eliminarTodo');
                chkEliminarTodo.setValue(security.rights.eliminarTodo);
                
                view.down('#encuesta').setValue(security.rights.encuesta);
                view.down('#organizaciones').setValue(security.rights.organizaciones);
                view.down('#contactos').setValue(security.rights.contactos);
                view.down('#productos').setValue(security.rights.productos);
                view.down('#calendario').setValue(security.rights.calendario);
                view.down('#cotizaciones').setValue(security.rights.cotizaciones);
                view.down('#contratos').setValue(security.rights.contratos);
                view.down('#smartmail').setValue(security.rights.smartmail);
                view.down('#grupos').setValue(security.rights.grupos);
                view.down('#smartpanics').setValue(security.rights.smartpanics);
                view.down('#calendarioVerTodos').setValue(security.rights.calendarioVerTodos);
                
                
                
                // Actualizo la propiedad rights de la View para posteriormente leerlo.
                view.security.rights = security.rights;
            }
            
            
            // Para esta view no uso seguridad de Modules ni de Event
            if (security.modules) {
                view.security.modules = security.modules;
            }
            if (security.event) {
                view.security.event = security.event;
            }
            
            
        }});
          
    },
    
    onSaveSecurityClick : function(button, event, options) {
        var view = button.up('tabpanel').down('WebCRMSecurity');
        var btn = view.down('button[action=saveSecurity]');
        
        this.onSaveClick(btn);
    },

    onSaveClick : function(button, event, options) {
		var view = button.up('WebCRMSecurity');
        var url = view.url;
        
        // Obtengo los valores de los elementos a guardar como objeto a encodear como JSON y guardar.
        var chkeliminarTodo = view.down('#eliminarTodo');
        view.security.rights = {
            eliminarTodo: chkeliminarTodo.checked,
            encuesta: view.down('#encuesta').checked,
            organizaciones: view.down('#organizaciones').checked,
            contactos: view.down('#contactos').checked,
            productos: view.down('#productos').checked,
            calendario: view.down('#calendario').checked,
            cotizaciones: view.down('#cotizaciones').checked,
            contratos: view.down('#contratos').checked,
            smartmail: view.down('#smartmail').checked,
            grupos: view.down('#grupos').checked,
            smartpanics: view.down('#smartpanics').checked,
            calendarioVerTodos: view.down('#calendarioVerTodos').checked
        }
        
        // Encodeo en formato JSON la seguridad creada.
        var json = Ext.encode(view.security);
        
        Ext.Ajax.request({
          url: url,
          method: 'PUT',
          params: json,
          success: function(resp,operation) {
            notify('Los datos se guardaron con éxito');
          }
        });
        
    },
});
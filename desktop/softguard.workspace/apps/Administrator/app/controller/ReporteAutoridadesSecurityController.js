Ext.define('Administrator.controller.ReporteAutoridadesSecurityController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'RAAutoridadesModel' ],
    views : [ 'ReporteAutoridadesSecurityView' ],

    init : function(config) {
        // this.initConfig(config);
    	// genero los eventos

		this.control({
            'WebReporteAutSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'WebReporteAutSecurity' : {
                beforerender : this.initview
			},
            'WebReporteAutSecurity combo' : {
                afterrender : this.loadCombo
    		}
		});
	}, // administratormoduleformview
    
    initview : function(view) {
        var record = view.record; 
        var modules = view.modules;
        var moduleId= 15;
        var userName = record.get('Name');
        var url = '/Rest/Security/Modules/'+moduleId+'/Security/'+userName;
        var combo = view.down('#autoridadCombo');
        view.url = url;
        view.urlMetaData = '/rest/security/UserData/'+record.get('Id')+'/MetaData';
        
        
        view.autoridad = Ext.define('autoridad', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'Autoridad',  type: 'string'},
                {name: 'tiempodisponible',  type: 'string'}
            ],
            proxy: {
                type: 'rest',
                url: view.url,
                appendId: false
            }
        });
        
       /* 
        Ext.Ajax.request({
            url: view.urlMetaData,
            method: 'GET',
            success: function(resp,operation) {
                console.log(resp);
                 if(resp.responseText)  {
                    view.metadata = Ext.JSON.decode(resp.responseText);
                    if(view.metadata.tiempodisponible) {
                        
                    } else {
                        view.metadata.tiempodisponible = 0;
                    }
                    
                    view.down('#tiempodisponible').setValue(view.metadata.tiempodisponible)
                 }
            }
        });*/
    },
/*
	initview : function(view) {
        var record = view.record; 
        var modules = view.modules;
        var combo = view.down('#autoridadCombo');
        
        var moduleId= modules.getAt(0).get('dwm_idModules');
        view.url = '/Rest/Security/Modules/'+moduleId+'/Security';
        
        // { "Autoridad": "1" }
        
        view.autoridad = Ext.define('autoridad', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'Autoridad',  type: 'string'}
            ],
            proxy: {
                type: 'rest',
                url: view.url,
                appendId: false
            }
        });
        
	},*/
    
    loadCombo: function(combo){
        var view = combo.up('WebReporteAutSecurity');
        var store = Ext.create('Ext.data.Store',{
            model: this.getRAAutoridadesModelModel()
        });
        
        combo.bindStore(store);
        store.load({callback: function(){
            var autoridad = view.autoridad;
            autoridad.load(0,{callback: function(record){
                combo.setValue(record.get('Autoridad'));
                
                view.down('#tiempodisponible').setValue(record.get('tiempodisponible'))
                
            }});
        }});
    },

	onSaveClick : function(button, event, options) {
		var view = button.up('WebReporteAutSecurity');
        var url = view.url;
        var model = view.autoridad; 
        var combo = view.down('#autoridadCombo');
        var tiempo = view.down('#tiempodisponible');
        var value = combo.getValue();
        var autoridad = model.create({
            Autoridad: value,
            tiempodisponible : tiempo.getValue()
        });
        
        
        
        var json = Ext.encode(autoridad.data);
        
        Ext.Ajax.request({
          url: url,
          method: 'PUT',
          params: json,
          success: function(resp,operation) {
            notify('Los datos se guardaron con éxito');
          }
        });
        
       
       /* var json = Ext.encode(view.metadata);
        Ext.Ajax.request({
            url: view.urlMetaData,
            method: 'PUT',
            params: json,
            success: function(resp,operation) {
                // sin funcionalidad x ahora
            }
        });*/
        
    }
});
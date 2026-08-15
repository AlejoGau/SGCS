Ext.define('Administrator.controller.VideoSecurityController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'VideoSecurityView' ],

    init : function(config) {
		this.control({
            'VideoSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'VideoSecurity' : {
                beforerender : this.initview
			}
		});
	}, // administratormoduleformview
    
    initview : function(view) {
        var record = view.record; 
        var modules = view.modules;
        var module = view.module;
        var moduleId= module.get('udm_idKey');
        var userName = record.get('Name');
        var url = '/Rest/Security/Modules/'+moduleId+'/Security/'+userName;
        var chckmodificar = view.down('#chckmodificar');
        view.url = url;
        
        
        view.metadata = Ext.define('metadata', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'modificar',  type: 'string'}
            ],
            proxy: {
                type: 'rest',
                url: view.url,
                appendId: false
            }
        });
        
        
        var metadata = view.metadata;
        metadata.load(0,{callback: function(record){
            chckmodificar.setValue(record.get('modificar'));
        }});
    },

	onSaveClick : function(button, event, options) {
		var view = button.up('VideoSecurity');
        var url = view.url;
        var model = view.metadata; 
        var chckmodificar = view.down('#chckmodificar');
        var value = chckmodificar.getValue();
        var metadata = model.create({modificar: value});
        
        var json = Ext.encode(metadata.data);
        
        Ext.Ajax.request({
          url: url,
          method: 'PUT',
          params: json,
          success: function(resp,operation) {
            notify('Los datos se guardaron con éxito');
          }
        });
    }
});
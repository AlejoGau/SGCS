Ext.define('Administrator.controller.AWDMobileSecurityController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'AWDMobileSecurityView' ],

    init : function(config) {
    	this.control({
            'AWDMobileSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'AWDMobileSecurity' : {
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
        var combo = view.down('#awccCombo');
        view.url = url;
        
        
        view.metadata = Ext.define('metadata', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'Usuario',  type: 'string'}
            ],
            proxy: {
                type: 'rest',
                url: view.url,
                appendId: false
            }
        });
        
        
        
        var metadata = view.metadata;
        metadata.load(0,{callback: function(record){
            //combo.setValue(record.get('Usuario'));
        }});
    },

	onSaveClick : function(button, event, options) {
		var view = button.up('AWDMobileSecurity');
        var url = view.url;
        var model = view.metadata; 


        var value = 'test';
        var metadata = model.create({Usuario: value});
        
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
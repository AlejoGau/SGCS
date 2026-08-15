Ext.define('Administrator.controller.AWCCBPSecurityController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'soperadoresSearchModel', 'w_usuariosModel' ],
    views : [ 'AWCCBPSecurityView' ],

    init : function(config) {
		this.control({
            'AWCCBPSecurity button[action=saveSecurity]': {
                click: this.onSaveClick
            },
            'AWCCBPSecurity' : {
                beforerender : this.initview
			}
		});
	}, // administratormoduleformview
    
    initview : function(view) {
        var record = view.record; 
        var modules = view.modules;
        var moduleId= 12;
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
        
        var store = Ext.create('Ext.data.Store',{
            model: this.getSoperadoresSearchModelModel(),
            remoteFilter: true,
            pageSize: 10000,
            sorters: [{
                 property: 'ope_clogin',
                 direction: 'ASC'
             }],
            filters:[{
                property: 'ope_nsupervisor',
                value: "1"
            }]
        });
        
        combo.bindStore(store);
        store.load();
        
        var metadata = view.metadata;
        metadata.load(0,{callback: function(record){
            combo.setValue(record.get('Usuario'));
        }});
    },

	onSaveClick : function(button, event, options) {
		var view = button.up('AWCCBPSecurity');
        var url = view.url;
        var model = view.metadata; 
        var combo = view.down('#awccCombo');
        var value = combo.getValue();
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
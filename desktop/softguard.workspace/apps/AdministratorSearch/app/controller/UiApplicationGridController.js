Ext.define('AdministratorSearch.controller.UiApplicationGridController', {
    extend : 'Ext.app.Controller',
    stores : [ ],
    models : [ 'UiApplicationSearchModel', 'BundleSearchModel', 'UiApplicationModel' ],
    views : [ 'UiApplicationGridView' ],

    init : function(config) {
		// genero los eventos
		this.control({
			'uiapplicationgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick
			}
		});
	}, //

	initView : function(view) {
        var store =Ext.create('Ext.data.Store',{
            model: this.getUiApplicationSearchModelModel(),
            pageSize: 200,
            remoteFilter: false
        });
        
        var keyModules = KeyModulesStore;//this.getKeyModulesStoreStore();
        
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);       
        store.load({callback: function(){
            store.filterBy(function(record){
                return keyModules.isModuleAvailable(record.get('Name'));
            })
        }});
	},
    
    onItemClick: function(view,record,item,index,e,options){
        var id = record.get('Id');
        var panel = view.up('#center');
        var title = record.get('Name');
        
        var model = this.getUiApplicationModelModel();
        
        record.setConfig({
            proxy: model.getProxy()
        });

        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
		if (!mytab) {
            var newTab = Ext.widget('uiapplicationconfigview', {
    			title : title,
                record: record,
    			closable : true
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
        
    }

});
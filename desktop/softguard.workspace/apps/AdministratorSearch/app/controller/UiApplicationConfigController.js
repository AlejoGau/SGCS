Ext.define('AdministratorSearch.controller.UiApplicationConfigController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'BundleSearchModel' ],
    views : [ 'UiApplicationConfigView', 'UiApplicationConfigFormview' ],

    init : function(config) {
		// genero los eventos
		this.control({
			'uiapplicationconfigview' : {
				afterrender : this.initView
			},
            'uiapplicationconfigformview' : {
				afterrender : this.initFormView
			},
    		'uiapplicationconfigformview button[action="save"]' : {
				click : this.onSaveClick
			}
		});
	}, //

	initView : function(view) {
        /*
        var store =Ext.create('Ext.data.Store',{
            model: this.getUiApplicationSearchModelModel(),
            pageSize: 200
        })
        view.bindStore(store);
        
        store.load({callback: function(){
        }});
        */
	}, //

    initFormView : function(view) {
        var record = view.record;
        var combo = view.down('#comboVersion');
        view.loadRecord(record);
        
         var bundleStore = Ext.create('Ext.data.Store',{
            model:  this.getBundleSearchModelModel(),
            filters: [{
                 property: 'ObjectId',
                 value: record.get('Id')
             }]
        });
        combo.bindStore(bundleStore);
        bundleStore.load({params:{list:true}});
	},
    
    onSaveClick : function(button, event, options) {
        var view = button.up('uiapplicationconfigformview');
        var record = view.record;
        form =view.getForm();
        form.updateRecord(record);
        
		record.save({
			callback : function(record, operation) {
                if (operation.successs){
                    notify('Los cambios se guardaron con éxito.');
                }
			}
		});
	}

});
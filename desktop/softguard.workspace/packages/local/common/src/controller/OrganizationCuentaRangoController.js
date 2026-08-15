Ext.define('Common.controller.OrganizationCuentaRangoController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.TablaLineasStore' ],
    models : [ 'OrganizationCuentaRangoListModel', 'OrganizationCuentaRangoModel', 'OrganizationRangoSearchModel' ],
    views : [ 'OrganizationCuentaRangoView', 'CuentaRangoFormView' ],

    init : function(config) {

		this.control({
            'organizationcuentarangoview button[action=rangoDelete]': {
                click: this.onDeleteClick
            },
            'organizationcuentarangoview button[action=rangoAdd]': {
                click: this.onAddClick
            },
            'cuentarangoformview button[action=save]': {
                click: this.onSaveClick
            },
            'organizationcuentarangoview' : {
                afterrender : this.initview
			}
		});
	}, // administratormoduleformview

	initview : function(view) {
        //var grid = view.down('#gridModules');
        var record = view.record; 
        
        var store = Ext.create('Ext.data.Store',{
            model : this.getOrganizationRangoSearchModelModel(),
            filters:[{
                property: 'IdEntidad',
                value: record.get('Id')
            }]
        })
        
        view.bindStore(store);
        view.down('pagingtoolbar').bindStore(store);
        store.load();
	},

	onAddClick : function(button, event, options) {
		var view = button.up('organizationcuentarangoview');
        var record =  view.record;
        
        var module = this.getOrganizationCuentaRangoModelModel();

        this.openFormWindow('Rango', module.create({
            IdEntidad: record.get('Id')
        }),view);
    },

    onSaveClick : function(button, event, options) {
		var view = button.up('cuentarangoformview');
        var win = button.up('window');
        var caller = win.view;
        var record =  view.record;
        
        view.getForm().updateRecord(record);
        
        record.save({success: function(){
            notify('El rango se guardó con éxito');
            caller.down('pagingtoolbar').doRefresh();
            win.close();
        }})
    }, 
    
    
     openFormWindow: function(title,record,grid){
        var newView = Ext.widget('cuentarangoformview',{
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
            view: grid,
            items: newView,
            layout: 'fit'
        }).show();
    },

	onDeleteClick : function(button, event, options) {
        var win =  button.up('window');
        var view = button.up('organizationcuentarangoview');
        var model = this.getOrganizationCuentaRangoModelModel();
        var record = view.getSelectionModel().getSelection()[0];
        
        var object = model.create({Id: record.get('Id')});
        
		object.destroy({success: function(){
            notify('El rango se eliminó con éxito');
            view.down('pagingtoolbar').doRefresh();
		}});
		
	}
});
//MIGRADO2024
Ext.define('Common.controller.VehicleModelGridController', {
    extend: 'Ext.app.Controller',
    	stores : [ 'Common.store.VehicleModelStore' ],
		models : [ 'VehicleModelSearchModel', 'VehicleModelModel' ],
		views : [ 'VehicleModelGridView' ],
    init: function () {
        // genero los eventos
        this.control({
            'vehiclemodelgridview': {
                beforerender: this.loadData,
                objectcreated: this.onModelCreated
            },
            'vehiclemodelgridview button[action=delete]': {
                click: this.onDeleteClick
            },
            'vehiclemodelgridview button[action=add]': {
                click: this.onAddClick
            }
        });
    }, // cierro init
    
    loadData: function (view) {
        var mystore =Ext.create('Ext.data.Store',{
            model: this.getVehicleModelSearchModelModel(),
            autoSync: true
        });
        
        var _ObjectId = view.record.get('Id');
        // una vez que cargue el store hago el binding con la view
        mystore.load({
            params: {query:_ObjectId},
            store:mystore,
            panel:view,
            callback: this.doBindStore
        });
    },
    
    doBindStore: function(records,operation,success){
        if (success){
           operation.panel.bindStore(operation.store);
        }
    },
    
    onDeleteClick: function(button, object, options){
        var view= button.up('vehiclemodelgridview');
        var selection = view.getSelectionModel().getSelection()[0];
        if (selection) {
            view.store.remove(selection);
        }
    },
    
    onModelCreated: function(view){
        var record = view.record;
        var grid = view.caller;
        var _ObjectId = grid.record.get('Id');
        grid.store.load({
            params: {query:_ObjectId}
        });
    },
    
    
    onAddClick: function(button, event, options){
        var grid = button.up('grid');
            
        var view = Ext.widget('vehiclemodelnewview',{
            caller: grid
        });
        
        var win = Ext.create('Ext.Window', {
            layout : 'fit',
			title : 'Nuevo Modelo',
			width : 450,
			height : 200,
			border : false,
			items : view
		});
		win.show();
    },
    
});
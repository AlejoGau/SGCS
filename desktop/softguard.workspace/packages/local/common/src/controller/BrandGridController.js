//MIGRADO2024
Ext.define('Common.controller.BrandGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'VehicleBrandSearchModel', 'VehicleBrandModel' ],
    views : [ 'BrandGridView' ],
    init : function(config) {
		// genero los eventos
		this.control({
			'brandgridview' : {
				afterrender : this.initView,
                itemclick: this.onItemClick,
                objectcreated: this.onBrandCreated,
                objectdeleted: this.onBrandDeleted
			},
            'brandgridview button[action=add]': {
                click: this.onAddClick
            },
            'brandgridview button[action=save]': {
                click: this.onSaveClick
            }
		});
	}, // cierro init
	initView : function(view) {
        var store =Ext.create('Ext.data.Store',{
            model: 'Common.model.VehicleBrandSearchModel',
            autoSync: true
        })
        view.down('pagingtoolbar').bindStore(store);
        view.bindStore(store);
        
        store.load();
	},
    
    onItemClick: function(view,record,item,index,e,options){
        var panel = view.up('tabpanel')?view.up('tabpanel').down('#center-brand'):Ext.getCmp('center');
        var title = record.get('Name')?record.get('Name'):'Marca:'+record.get('Id');
    	// me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
		if (!mytab) {
			var newTab = Ext.widget('vehiclebrandview', {
        		title : title,
                translate: false,
    			closable : true,
                caller: view,
                record: record
    	    }); 
			// agrego la paleta creada
			panel.add(newTab);
			panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
			panel.setActiveTab(mytab);
		}
    },
    
    
    onAddClick: function(button, event, options){
        var grid = button.up('grid');
            
        var view = Ext.widget('vehiclebrandnewview',{
            caller: grid
        });
        
        var win = Ext.create('Ext.Window', {
        	layout : 'fit',
			title : 'Nueva marca',
			width : 450,
			height : 200,
			border : false,
			items : view
		});
		win.show();
    },
    
    onBrandCreated: function(view){
        var record = view.record;
        var grid = view.caller;
        grid.store.load();
        this.onItemClick(grid, record);
    },
    
    onBrandDeleted: function(view){
        var grid = view.caller;
        grid.getStore().load();
    },
    
    onSaveClick: function (button,event,options) {
        var view = button.up('brandgridview');
        
        var myStore = view.store;
        //guardo los nuevos
        var newRec = myStore.getNewRecords();
        Ext.Array.each(newRec, function (rec) {
            //console.log('nuevos: ',this.application);
            rec.save();
        },this);
        //guardo los modificados
        var modRec = myStore.getUpdatedRecords();
        Ext.Array.each(modRec, function (rec) {
            rec.save();
        },this);
        //borro los eliminados
        var delRec = myStore.getRemovedRecords();
        Ext.Array.each(delRec, function (rec) {
            var record = Ext.create('AdministratorSearch'+ '.model.VehicleBrandModel',{
                Id: rec.get('Id')
            });
            record.destroy();
        },this);
    } // cierro saveobject
});
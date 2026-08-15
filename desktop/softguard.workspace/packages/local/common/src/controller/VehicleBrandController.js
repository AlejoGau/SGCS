//MIGRADO2024
Ext.define('Common.controller.VehicleBrandController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [ 'VehicleBrandView' ],
    init : function(config) {
		// genero los eventos
		this.control({
            'brandform' : {
                beforerender : this.initview
			}
		});
	}, // cierro init
    
    initview: function(view){
        view.loadRecord(view.record);
    },
    openObjectList: function(){
        var west = Ext.getCmp('west');
        if (west.collapsed){west.toggleCollapse();}
	},
	openObjectById : function(objectId) {
    
		record = this.getBrandModelModel();
        
        var north = Ext.getCmp('north');
        north.hide();
        var south = Ext.getCmp('south');
        south.hide();
        
        if (objectId == 0) {
			var myobject = record.create({
				Name : 'Nueva marca',
			});
                    
            this.setRecord(myobject);
            
            /*
			myobject.save({
						scope : this,
						callback : function(record, operation) {
							this.setRecord(record);
						}
					});*/
		}
        else {
		    record.load(objectId, {
					callback : function(record,operation) {
                        if (operation.success){
                            
                            // cargo la lista de modulos
                            /*
                            var modules = Ext.widget('moduletreeview', {
                                store : 'CuentaDealerModuleStore'
                    		});
                            var west = Ext.getCmp('west');
                            if (west.collapsed){west.toggleCollapse();}
                            west.add(modules);
                            */
                            // seteo el registro
						    this.setRecord(record);
                        }
					},
					scope : this
				});
        }
		
	},
    
    setRecord: function(record){
        text = record.get('Name');
        document.title = text;
        
        var viewport =  Ext.getCmp('viewport');
        viewport.record = record;
        
		// Lo agregamos al panel
		var myPanel = Ext.getCmp('center');
        
        // me fijo si el tab existe, si es nuevo lo creo
		// if (!myPanel.getComponent(record.get('text'))) {
        /*
		var mytab = myPanel.down('[title=Cuenta]');
		if (!mytab) {
			var newTab = Ext.widget('cuentaformview',{record: record});
			newTab.title = 'Cuenta';//record.get('Name');
			newTab.closable = true;
			newTab.record = record;
			// agrego la paleta creada
			myPanel.add(newTab);
			myPanel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
			myPanel.setActiveTab(mytab);
		}
        */
    }
    
});
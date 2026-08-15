//MIGRADO2024
Ext.define('Common.controller.AuditController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [  ],
    views : [  ],

	init : function(config) {
		// genero los eventos
		this.control({
            'viewport' : {
                beforerender : this.initview
			}
		});
	}, // cierro init
    
    initview: function(view){
        //console.log(view);
    },

    openObjectList: function(){

	},

	openObjectById : function(objectId) {
        var viewport = Ext.getCmp('viewport');
		record = this.getVehicleModelModel();
        /*
        var north = Ext.getCmp('north');
        north.hide();
        var south = Ext.getCmp('south');
        south.hide();
        */
        if (objectId == 0) {
            // no hay altas en audit
            console.log('ERROR: no se puede acceder al registro 0');
		}
        else {
		    record.load(objectId, {
				callback : function(record,operation) {
                    if (operation.success){
					    this.setRecord(record);
                        this.setCuenta(record);
                    }
				},
				scope : this
			});
        }
	},
    
    setRecord: function(record){
        var text = 'Datos del dispositivo';
        
        var viewport =  Ext.getCmp('viewport');
        viewport.record = record;
		// Lo agregamos al panel
		var myPanel = viewport.down('tabpanel');
        

		// si el modulo es una view
		if (record.get.data.view != '') {
			var newTab = Ext.widget('vehicleformview',{
                record: record,
             	title: 'Dispositivo Móvil',
    		    closable: false,
			    record: record
			});
			

		} // cierro if
		// agrego la paleta creada
		myPanel.add(newTab);
		myPanel.setActiveTab(newTab);

        
    }
});
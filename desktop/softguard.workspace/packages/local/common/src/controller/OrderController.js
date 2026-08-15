Ext.define('Common.controller.OrderController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'OrderModel' ],
    views : [  ],

    init : function(config) {
        // genero los eventos
    	this.control({
            'orderview' : {
                beforerender : this.initView
    		}
            
		});
	}, // cierro init
    
    initView: function(view){
        var objectId = view.objectId;
        this.loadRecord(objectId,view);
    },
    
    loadRecord: function(objectId,view){
        if (objectId == 0) {    
            var now = new Date();
        	var myobject = record.create({
				Name : 'Nuevo'
			});            
			myobject.save({
    			scope : this,
    			callback : function(record, operation) {
    				this.setRecord(record,view);
    			}
			});
		} else {      
            var model = this.getOrderModelModel();
		    model.load(objectId, {
				callback : function(record,operation) {
                    if (operation.success){
					    this.setRecord(record,view);
                    }
				},
				scope : this
			});
        }
    },
    
    setRecord: function(record,view){
        var myPanel = view.down('tabpanel');
        var targetTab = view.targetTab;
        view.record = record;
        var title = record.get('Id');
        
        if (myPanel){
            var mytab = myPanel.down('orderform2view');
            if (!mytab) {
        		var newTab = Ext.widget('orderform2view',{
                    record: record,
                    title: title,
                    targetTab: targetTab,
                    closable: false
            	});
    
    			// agrego la paleta creada
    			myPanel.add(newTab);
    			myPanel.setActiveTab(newTab);
    		}
    		// el existe, lo activo
    		else {
                mytab.setRecord(record);
    			myPanel.setActiveTab(mytab);
    		}
        }
    }
});
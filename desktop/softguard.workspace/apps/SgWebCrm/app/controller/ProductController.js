Ext.define('SGWebCrm.controller.ProductController', {
    extend : 'Ext.app.Controller',
    stores : [ 'ProductModuleStore' ],
    models : [ 'ProductModel' ],
    views : [ 'ExtUxNotification', 'ProductView' ],

    init : function(config) {
    	// genero los eventos
		this.control({
            'productview' : {
                beforerender : this.initView
    		}
		});
	}, // cierro init
    
    initView: function(view){
        var objectId = view.objectId;
        record = this.loadRecord(objectId,view);
    },


    loadRecord: function(objectId,view){
        record = this.getProductModelModel();
        if (objectId == 0) {    
            var now = new Date();
    		var myobject = record.create({
				Name : 'Nuevo producto'
			});            
			myobject.save({
    			scope : this,
    			callback : function(record, operation) {
    				this.setRecord(record,view);
    			}
			});
		} else {            
		    record.load(objectId, {
				callback : function(record,operation) {
                    if (operation.success){
					    this.setRecord(record,view);
                    }
				},
				scope : this
			});
        }
    },
    
    setRecord: function(record,viewport){
        var myPanel = viewport.down('tabpanel');
        var center = viewport.down('#center');
        var targetTab = viewport.targetTab;
        center.record = record;
        var title = record.get('Name');
        
        // si center es un tabpanel agrego el tab, 
        // sino supongo que el form esta cargado y le agrego el record
        if (myPanel){
            var mytab = myPanel.down('[title='+title+']');
            if (!mytab) {
    			var newTab = Ext.widget('productformview',{
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
    			myPanel.setActiveTab(mytab);
    		}
        } else {
            var form = viewport.down('productformview');
            form.record = record;
            form.loadRecord(record);
            
            // cambio el titulo del padre
            var center = window.parent.Ext.getCmp('center');
            if (center){
                center.getActiveTab().setTitle(record.get('Name'));
            }
        };

        var _module = viewport.down('moduletreeview');
        if (_module) {
            _module.down('treeview').record= record;
            _module.record = record;
            _module.targetTab = center;
            _module.down('treeview').targetTab = center;
        }
    
    }
});
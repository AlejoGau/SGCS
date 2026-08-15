Ext.define('Administrator.controller.ModuleDetailController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'DesktopModuleDetailByUserModel', 'AdministratorModuleModel' ],
    views : [ 'ModuleDetailView' ],

	init : function(config) {
		// this.initConfig(config);
		// genero los eventos

		this.control({

			'moduledetail button[action="save"]' : {
				click : this.saveObject
			},
            'moduledetail button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'moduledetail button[action="deleteModule"]' : {
    			click : this.onDeleteClick
			},
            'moduledetail' : {
                afterrender : this.initview
			}
		});
	}, // cierro init

	initview : function(view) {
        var record = view.record; 
        
        var modules = Ext.create('Ext.data.Store', {
                model: this.getDesktopModuleDetailByUserModelModel(),
                autoLoad: false});
           
        view.modules = modules;
        //grid.bindStore(modulesAvailable);
        console.log('initView ModuleDetailController');
        modules.load({
            object: record,
            modules: modules,
            ObjectId: record.get('Id'),
            Module: view.Module, 
            moduleRecord: view.moduleRecord,
            callback: function(records, operation, success){
                
                if (Ext.ClassManager.getNameByAlias('widget.'+operation.Module + 'Detail')){
                	var detailTab = Ext.widget(view.Module + 'Detail',{
                        record: operation.object,
                        modules: operation.modules,
                        module: operation.moduleRecord,
                        closable: false
                    });
                
                    // agrego la paleta creada
                    view.add(detailTab);
                    console.log("detailTab: "+detailTab);
                    view.setActiveTab(detailTab);
                    
                    view.down('#footer').hide();
                }
                
                
                
                if (Ext.ClassManager.getNameByAlias('widget.'+operation.Module + 'Security')){
                    var segTab = Ext.widget(view.Module + 'Security',{
                        record: operation.object,
                        modules: operation.modules,
                        module: operation.moduleRecord,
                        closable: false
                    });
                
                    // agrego la paleta creada
                    view.add(segTab);
                } else {
                    //console.log('widget.'+operation.Module + 'Security');
                }
            }
        });
	},

	saveObject : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var form = button.up('form').getForm();
		var model = form.getRecord();
        var view = button.up('moduledetail');
        var win =  button.up('window');

        if (form.isValid()){
    		form.updateRecord(model);
            model.save({callback: function(){
                view.grid.fireEvent('objectchanged',{win: win,view: view});
                win.close();
            }})
            
        };

	},

	onDeleteClick : function(button, event, options) {
        var win =  button.up('window');
        var view = button.up('moduledetail');
        var modules = view.modules;
        var model = this.getAdministratorModuleModelModel();
        var module = view.moduleRecord;
        
        
        var object = model.create({Id: modules.first().get('dwm_idKey')});
        
		object.destroy({success: function(){
            view.grid.fireEvent('objectchanged',{win: win,view: view.grid}); 
            win.close()  	
		}});
        
		
	},
    
    onCancelClick: function(button, event, options){
        Win = button.up('window');
        Win.close();
    }
});
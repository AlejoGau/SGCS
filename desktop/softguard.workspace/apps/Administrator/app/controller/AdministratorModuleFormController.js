Ext.define('Administrator.controller.AdministratorModuleFormController', {
    extend : 'Ext.app.Controller',
    stores : [ 'TablaLineasStore' ],
    models : [ 'KeyModulesModel', 'AdministratorModulesModel', 'AdministratorModuleModel', 'DesktopModulesAvailableByUserModel' ],
	views : [ 'AdministratorModuleFormView' ],

	init : function(config) {
		// this.initConfig(config);
		// genero los eventos

		this.control({

			'administratormoduleformview button[action="save"]' : {
				click : this.saveObject
			},
            'administratormoduleformview button[action="cancel"]' : {
				click : this.onCancelClick
			},
            'administratormoduleformview #comboModulo' : {
                change : this.onModuloChange
			},
            'administratormoduleformview' : {
                afterrender : this.initview
    		}
		});
	}, // cierro init

	initview : function(view) {
        var form = view.getForm();
        var combo = view.down('#comboModulo');
        var record = view.record;
        var t = this;
        form.loadRecord(record);
        
        if (record.get('dwm_idModules')>0){
            view.dwm_idModules = record.get('dwm_idModules');
            combo.hide();
        }else{
            view.down('#webdealer').hide()
            
            
            var recordsKey = view.recordsKey;
           
                 
                    var modulesAvailable = Ext.create('Ext.data.Store', {
                            model: t.getDesktopModulesAvailableByUserModelModel(), 
                            autoLoad: false});
                                            
                    combo.store.removeAll(true);
                    modulesAvailable.load({ObjectId: view.grid.record.get('udw_idKey'), callback: function (records, operations, success){
                        
                                            
                        Ext.Array.each(records, function(record){
                            
                           
                             Ext.Array.each(recordsKey, function(recordKey){
                                 
                                 if(recordKey.get('Module').toLowerCase() == record.get('udm_key_reference').toLowerCase()) {

                                     if(recordKey.get('QuantityOfUsers') == 0) {
                                         combo.store.add(record);
                                         return false; // ya encontre salgo del each
                                     } else if (recordKey.get('QuantityOfUsers') > record.get('QuantityOfUsers')) {
                                         combo.store.add(record);
                                         return false;
                                     }
                                 }
                                 
                             })
                        })
                        
                    
                    }});            
         
        }
        
        this.onModuloChange(combo, record.get('dwm_idModules'));
        
	},

	saveObject : function(button, event, options) {
		// cambio la cantidad de columnas al panel
		// accedo al registro y lo salvo
		var form = button.up('form').getForm();
		var model = form.getRecord();
        var view = button.up('administratormoduleformview');
        var win =  button.up('window');
        win.module = model;

        if (form.isValid()){
    		form.updateRecord(model);
            
            model.set('dwm_cuenta_desde',Ext.String.leftPad(model.get('dwm_cuenta_desde'),4,'0').toUpperCase());
            model.set('dwm_cuenta_hasta',Ext.String.leftPad(model.get('dwm_cuenta_hasta'),4,'0').toUpperCase());
            if (view.dwm_idModules){model.set('dwm_idModules', view.dwm_idModules)};
            model.save({callback: function(){
                view.grid.fireEvent('objectchanged',{win: win,view: view.grid,create:true, module: model});
                win.close();
            }})
            
        };

	},
    
    onModuloChange: function(combo, newValue, oldValue, options){
        var form = combo.up(form);
        
        switch(newValue)
            {
            case 5:
              form.down('#webdealer').show();
              form.down('#rango').show();
              break;
            case 9:
              form.down('#webdealer').show()
              form.down('#rango').hide()
              break;
            case 7:
              form.down('#webdealer').show()
              form.down('#rango').hide()
              break;
            case 17:
              form.down('#webdealer').show();
              form.down('#rango').show();
              break;
            default:
              form.down('#webdealer').hide();
             // console.log('default',newValue);
        }
    },
    
    onCancelClick: function(button, event, options){
        Win = button.up('window');
        Win.close();
    }
});
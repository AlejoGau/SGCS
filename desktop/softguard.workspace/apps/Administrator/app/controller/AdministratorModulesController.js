Ext.define('Administrator.controller.AdministratorModulesController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'KeyModulesModel', 'DesktopModulesAvailableByUserModel', 'UsersDesktopWebModulosModel', 'AdministratorModulesByUserModel', 'AdministratorModuleModel', 'DesktopModuleDetailByUserModel' ],
    views : [ 'AdministratorModulesView' ],

    init : function(config) {
		// genero los eventos
		this.control({
            'administratormodulesview' : {
                afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectchanged: this.onObjectChanged,
                objectedit: this.onObjectEdit,
                tiposuauriochange: this.onTipoUsuarioChange
            },
            'administratormodulesview button[action=addModulo]' : {
                click: this.onAddModuleClick
            },
            'administratormodulesview button[action=delModulo]' : {
                click: this.onDelModuleClick
            }
        });
	}, //
    
    onTipoUsuarioChange: function (view, valor) {
          view.tipoUsuario = valor
          this.fillModulesAvailable(view,this)
    },

	initView : function(view) {
        var viewport = Ext.getCmp('viewport');
        var controller = this;
        var id = view.record.get('Id');
        view.tipoUsuario = view.record.get('udw_tipo');
        
        /**
         * BC 371734102 - Edicion SGWebCrm
         */
        view.editableModules = [
            'Administrator',
            'WebDealer', 
            'TrackGuardMonitoreo',
            'WebRemoto',
            'WebReporteAut',
            'AWCCBP',
            'AWCC',
            'SerTec',
            'SgAppMapGuardWeb',
            'TrackGuard',
            'MasterWebDealer',
            'VigiControl',
            'SmartPanics',
            'SgAppWebReport',
            'SgAppMultiMonitorWeb',
            'SgIPRSManager',
            'WebCRM',
            'FenceManager',
            'SgAppAccessControl',
            'Video',
            'CleanApp',
            'SmartPanicsPC',
            'WebRemotoMobile'
        ];
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getAdministratorModulesByUserModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
        })
        view.bindStore(store);
        
        if (id==0){
            view.down('#addModulo').disable();
        } 
        
        store.load({ObjectId:id, callback:function (records) {
            var gridStore = view.getStore();
            gridStore.removeAll(false);
            Ext.Array.each(records,function (record) {
                if(record.get('Name') != "Desktop") {
                    gridStore.add(record);
                }
            })
        }});

        var keyStore = Ext.create('Ext.data.Store', {
            model: KeyModulesStore//this.getKeyModulesModelModel()
        });    
             
        keyStore.load({callback: function (recordsKey, operationsKey, successKey){
           //console.log(recordsKey)
            view.recordsKey = recordsKey;
            controller.fillModulesAvailable(view, controller);
        }});
     
    },
    
    fillModulesAvailable: function(view, controller){
        /// cargo el combo de modules available
        
        var recordsKey = view.recordsKey;
        view.modulesAvailable = Ext.create('Ext.data.Store', {
            model: controller.getDesktopModulesAvailableByUserModelModel(),
            remoteSort: true,
            sorters:[
                {
                    property: 'udm_modulo',
                    direction: 'ASC'
                }
            ],
            autoLoad: false
        });
        
        var combo = view.down('#comboModulo');
        
        combo.clearValue();
        combo.applyEmptyText();
        combo.getPicker().getSelectionModel().doMultiSelect([], false);
        combo.store.removeAll(false);
        view.modulesAvailable.load({ObjectId: view.record.get('udw_idKey'), callback: function (records, operations, success){
            //si es usuario final o bundle producto filtro los modulos
            if(view.tipoUsuario == 2|| view.tipoUsuario == 21) {  
                Ext.Array.each(records, function(record){
                    if (record.get('udm_key_reference')=='TrackGuardMonitoreo' || 
                        record.get('udm_key_reference')=='AWCC'|| 
                        record.get('udm_key_reference')=='Video'|| 
                        record.get('udm_key_reference')=='SgAppWebReport'|| 
                        record.get('udm_key_reference')=='SgAppMapGuardWeb'){

                        Ext.Array.each(recordsKey, function(recordKey){
                            if(
                                recordKey.get('Module').toLowerCase() == record.get('udm_key_reference').toLowerCase()
                                || recordKey.get('Dependencies').toLowerCase().indexOf(record.get('udm_key_reference').toLowerCase()) > 0
                                ) {
                                if(recordKey.get('QuantityOfUsers') == 0 || recordKey.get('QuantityOfUsers') == '') {
                                    combo.store.add(record);
                                    return false; // ya encontre salgo del each
                                } else if (recordKey.get('QuantityOfUsers') > record.get('QuantityOfUsers')||record.get('udm_key_reference')=='SerTec' 
                                                        ||record.get('udm_key_reference')=='VigiControl'||record.get('udm_key_reference')=='WebRemoto'
                                                        ||record.get('udm_key_reference')=='SmartPanics' 
                                                        ||record.get('udm_key_reference')=='SgNotes'
                                                        ) {
                                    combo.store.add(record);
                                    return false;
                                }
                            }
                        });   
                    }
                })
            } else {
                Ext.Array.each(records, function(record){
                    // saco administrador de cuentas de los disponibles
                    if (record.get('udm_idKey')==43){
                        console.log('SgNotes module' );
                    }

                    if (record.get('udm_idKey')!=23){
                        Ext.Array.each(recordsKey, function(recordKey){
                            if(
                                recordKey.get('Module').toLowerCase() == record.get('udm_key_reference').toLowerCase()
                                || recordKey.get('Dependencies').toLowerCase().indexOf(record.get('udm_key_reference').toLowerCase()) > 0
                                ) {
                                if(recordKey.get('QuantityOfUsers') == 0 || recordKey.get('QuantityOfUsers') == '') {
                                    combo.store.add(record);
                                    return false; // ya encontre salgo del each // dedalo 28/02/2020 se saca sertec para que controle por cantidad en la llave ||record.get('udm_key_reference')=='SerTec'
                                } else if (recordKey.get('QuantityOfUsers') > record.get('QuantityOfUsers') ||record.get('udm_key_reference')=='VigiControl'||record.get('udm_key_reference')=='WebRemoto'||record.get('udm_key_reference')=='SmartPanics' ) { 
                                    combo.store.add(record);
                                    return false;
                                } else {
                                	console.log(record);
                                	console.log(recordKey)
                                }
                            }
                        });
                    }
                })
            }
        }});
    },

    onItemClick: function(grid,record,item,index,e,options){
        var view = grid.up('administratormodulesview');
        var title = record.get('udm_modulo');
        var _module = record.get('udm_key_reference');
        var objectId = view.record.get('Id');
        
        if (Ext.Array.contains(view.editableModules,_module)){
            var detail = Ext.widget('moduledetail', {
                record: view.record,
                Module: _module,
                moduleRecord: record,
                grid: view
            });
            
            // trabajo las dimensiones de las ventanas
            var widthStd =  600;
            var heigthStd = 350;
            
            if(_module == 'WebRemoto') {
                widthStd = 1000;
                heigthStd = 480;
            }
            if(_module == 'SerTec'){
                var heigthStd = 480;
            }
            
            
            Ext.create('Ext.Window', {
                title: title,
                height: heigthStd,
                width: widthStd,
                closeAction: 'hide',
                border: false,
                layout: 'fit',
                modal: true,
                items: [detail]
                
            }).show();
        } else {
            notify('El módulo no posee configuración');
        }
    },
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    
    onAddModuleClick: function(button,event,options){
        var view = button.up('administratormodulesview');
        var record =  view.record;
        var combo = view.down('#comboModulo');
        var comboValue = combo.getValue();
        var selModule = combo.findRecordByValue(comboValue);
        
        if (selModule){
            
            var moduleModel = this.getAdministratorModuleModelModel();
            if(selModule.get('udm_key_reference') != 'Administrator') {
                //si no tengo rangos evaluo si el modulo lo necesita
                if(view.up('tabpanel').down('#rangegrid').store.data.length >= 0) {
                    //evaluo si tiene el modulo adminitrator
                    var noty = true;
                    view.store.each(function(record){
                        
                        if(record.get('Name') == 'Administrador') {
                            noty = false;                        
                        }
                    });
                    
                    // me fijo si tiene rangos
                    var rangeview = view.up('administratorview').down('rangedetail');
                    var rangestore = rangeview.getStore();
                    
                    if (rangestore.count() > 0)
                        noty = false
                   
                   if(noty) {
                       notify('txt-usuario-sin-rangos');
                   }
                    
                } else {
                   // view.up('tabpanel').getTabBar().items.items[1].el.dom.style.background ='transparent';
                }
            }
            
            var _module = moduleModel.create({
                dwm_idWeb: record.get('Id'),
                dwm_idModules: selModule.get('udm_idKey'),
                dwm_idKey: comboValue
            });
            
            _module.save({success: function(mod){
                notify('El módulo se agregó con éxito.');
                view.fireEvent('objectchanged',{view: view});
            }});
        } else {
            notifyError('Debe seleccionar un módulo');
        }
        
    },
    
    onDelModuleClick: function(button,event,options){
        var view = button.up('administratormodulesview');
        var record =  view.record;
        
        var model = this.getAdministratorModuleModelModel();
        
        var selModel = view.getSelectionModel();
        var _module = selModel.getSelection()[0];
        
        
        //console.log(module.get('udm_key_reference'))
    	var object = model.create({Id: _module.get('dwm_idKey')});
       
        if(_module.get('udm_key_reference') == 'Administrator') {
        	Ext.MessageBox.confirm('Delete', getLocale('Esta a punto de borrar el permiso de adminitrador, esta seguro?'), function(btn){
			   if(btn === 'yes'){
				  object.destroy({success: function(){
					view.fireEvent('objectchanged',{view: view});
					notify('El módulo se eliminó con éxito.');
				   }});
			   }
			   else{
				  
			   }
			 });
        } else {
        	object.destroy({success: function(){
				view.fireEvent('objectchanged',{view: view});
				notify('El módulo se eliminó con éxito.');
			}});
        }
    }, 
    
    
     openFormWindow: function(title,record,grid){
         var view = grid;
        var newView = Ext.widget('administratormoduleformview',{
            record: record,            
            scope: this,
            grid: grid,
            recordsKey : view.recordsKey
        }
        );
        // Lo agregamos al panel
        var myWindow = Ext.widget('window',{
            title: title,
            height: 200,
            width: 400,
            modal: true, 
            closeAction: 'destroy',
            items: newView,
            layout: 'fit'
        }).show();
    },
    
    onObjectChanged: function(event){
        var view = event.view;
        var store = view.getStore();
        var _ObjectId = view.record.get('Id');
        var controller = this;
        
        // una vez que cargue el store hago el binding con la view
        store.load({ObjectId:_ObjectId, callback: function(){
            if(event.create){
                var udm_idKey = event.module.get('dwm_idModules');
                var _module = store.findRecord('udm_idKey', udm_idKey);
                controller.onItemClick(view.down('gridview'),_module);
            }
            
            store.findRecord('udm_key_reference', 'Desktop');
        }});
        controller.fillModulesAvailable(view, controller);
    }

});
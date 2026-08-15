//MIGRADO2024
Ext.define('Common.controller.TablasLineasGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'TablaLineasStore'],
    models : [ 'TablasLineasModel', 'TablasLineasSearchModel' ],
    views : [ 'TablasLineasGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'tablaslineasgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                openphones: this.onOpenPhones,
                openinstaladores: this.onOpenInstaladores,
                openmonitoreo: this.onOpenMonitoreo,
                notificacionencuesta: this.onNotificacionEncuesta,
                configsmartpanic : this.onSmartpanicsConfig,
                configtrackguard : this.onTrackGuardConfig,
                configsmarttrack : this.onSmarttrackConfig,
                configcleanapp : this.onCleanAppConfig,
				organizationchanged: this.onOrganizationChanged,
                selectionchange: this.onSelectionChange
			},
            'tablaslineasgridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablaslineasgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablaslineasgridview button[action=add]': {
                click: this.onAdd
            },
            'tablaslineasgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
		});
	},
    
    /**
     * Configuracion de Vigicontrol para Dealer
     * 
     */
    onNotificacionEncuesta : function(record, view){
        var notifform = Ext.widget('notificacionencuestaview',{
            caller: view,
            record: record
        });
        var win = Ext.create('Ext.Window', {
            layout: 'hbox',
            title : 'Modificar Servicio Técnico',
            closeAction : 'destroy',
            itemId: 'notifEncuentasForm',
            width : 620,
            height : 350,
            border : true,
            modal: true,
            items : [notifform]
        });
        win.show();        
    },
    onSmarttrackConfig : function(record, view) {
        var stform = Ext.widget('smarttrackconfigview',{
            caller: view,
            record: record,
            applicationId: 52,
            apptype: 'VIGICONTROL',
            showcontrolhorario: true,
            byDealer: true,
            showDelete: true
        });
       
          var win = Ext.create('Ext.Window', {
                layout: 'fit',
                title : 'Modificar SmartTrack',
    			closeAction : 'destroy',
                itemId: 'smarttrackDealerForm',
    			width : 1000,
    			height : 450,
    			border : true,
                modal: true,
    			items : [stform]
    		});
    		win.show();
    },
    onCleanAppConfig : function(record, view) {
        var stform = Ext.widget('smarttrackconfigview',{
            caller: view,
            record: record,
            byDealer: true,
            applicationId: 112,
            apptype: 'CLEANAPP',
            showDelete: true
        });
       
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Modificar CleanApp',
            closeAction : 'destroy',
            itemId: 'smarttrackDealerForm',
            width : 1000,
            height : 450,
            border : true,
            modal: true,
            items : [stform]
        });
        win.show();
    },
    onTrackGuardConfig: function (record,view){
        var stform = Ext.widget('trackguardconfigview',{
            caller: view,
            record: record,
            applicationId: 52,
            apptype: 'TRACKGUARD',
            byDealer: true,
            showDelete: true
        });
       
          var win = Ext.create('Ext.Window', {
                layout: 'fit',
                title : 'Parking TrackGuard',
    			closeAction : 'destroy',
                itemId: 'trackguardDealerForm',
    			width : 500,
    			height : 450,
    			border : true,
                modal: true,
    			items : [stform]
    		});
    		win.show();
    },
    onSmartpanicsConfig: function (record,view) {
        var panel = view.up('tabpanel');
        var title = '('+record.get('lin_ccodigo')+') '+getLocale('SmartPanics');
        title = sanitizarTitulo(title);
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
            var newTab = Ext.widget('smartpanicconfigview',{
                caller: view,
                record: record,            
                targetTab: panel,
                title : title,
                translate: false,
                closable : true,
                byDealer:true,
                showDelete:true
            });
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
    },
    
    onOpenMonitoreo: function(record,view){
        var id = record.get('Id');
        var view = view.up('tablaslineasgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('lin_ccodigo')+') '+getLocale('Monitoreo');
        title = sanitizarTitulo(title);
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
            var newTab = Ext.widget('t_monitoreo_dealergridview', {
                iconCls: 'icon-table-edit',
            	title : title,
                parent: view.record,
                translate: false,
                record: record,
                targetTab: panel,
    			objectId : id,
    			closable : true,
                caller:view
                
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
    },
    
    onOpenInstaladores: function(record,view){
        var id = record.get('Id');
        var view = view.up('tablaslineasgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('lin_ccodigo')+') '+getLocale('Instaladores');
        title = sanitizarTitulo(title);
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
            var newTab = Ext.widget('tablasinstaladoresgridview', {
                iconCls: 'icon-table-edit',
        		title : title,
                parent: view.record,
                translate: false,
                record: record,
                targetTab: panel,
    			objectId : id,
    			closable : true,
                caller:view,
                readOnly: view.readOnly?view.readOnly:false,
                filters: [{
                    property: 'ins_cDealer',
                    value: record.get('lin_ccodigo')
                }],
                createDealer: record.get('lin_ccodigo')
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
    },
	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasLineasSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
        
        if(view.readOnly) {
            view.down('#delete').hide()
            view.down('#add').hide()
            view.down('#actioncolumnedit').hide()
        }
        /**
         * 17/07 : JUAN, cuando se abre desde AdminCuentas debemos ocultar action button de SP y VC
         * Desde AccountAdministratorToolbarView, envio la config de la view hiddenSPVC : true
         */
        if (view.hiddenSPVC) {
            view.down('#configVC').hide();
            view.down('#configSP').hide();
            view.down('#configCLEANAPP').hide();
        }
        // controlo llave para ocultar las columnas que no corresponden
        var storeLlave = KeyModulesStore;//this.getKeyModulesStoreStore();
        if(!storeLlave.isModuleAvailable('SmartPanics')) {
            view.down('#configSP').hide();
        }
        if(!storeLlave.isModuleAvailable('SmartTrack')) {
            view.down('#configVC').hide();
        }
        if(!storeLlave.isModuleAvailable('CleanApp')) {
            view.down('#configCLEANAPP').hide();
        }
        
	},
    
    objectChanged: function (view) { 
        var controller = this;   
        view.down('pagingtoolbar').doRefresh();       
        controller.reloadLineasCombo();
    },
    /**
     * BC 374644148 : Agregado al momento del cambio en la tabla de Dealer, que se refresque el Store que pre-carga el combo con el listado de Dealers
     */
    reloadLineasCombo : function() {
        var tablaLineasStore = this.getTablaLineasStoreStore();// Ext.data.StoreManager.lookup('Common.store.TablaLineasStore'); 
        tablaLineasStore.reload();
    },
    
    onAdd: function(grid,record,item,index,e,options){    
        var id = 0;
        var view = grid.up('tablaslineasgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo Dealer';
        
        record = this.getTablasLineasModelModel();
            
    	var myobject = record.create({
            'lin_ccodigo' : ''
		}); 
        myobject.set("Id",0);     
        
        var newTab = Ext.widget('tablaslineasformview', {
            iconCls: 'icon-table-add',
        	title : title,
            parent: view.record,
            record: myobject,
            targetTab: panel,
        	objectId : id,
            closable : true,
            caller:view
        });
        
        panel.add(newTab);
        panel.setActiveTab(newTab);
    },    
    
    
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('tablaslineasgridview');
        var lineasModel = this.getTablasLineasModelModel();
        lineasModel.load(record.get('Id'), {
            scope: this,
            callback: function(rec, operation, success) {   
                if (success) {
                    var mytab = panel.down('[objectId="' + id + '"]');
                    if (!mytab) {
                        var newTab = Ext.widget('tablaslineasformview', {
                            iconCls: 'icon-table-edit',
                            title : title,
                            parent: view.record,
                            translate: false,
                            record: rec,
                            targetTab: panel,
                            objectId : id,
                            closable : true,
                            caller:view,
                            readOnly:view.readOnly?view.readOnly:false
                        });
                        
                        panel.add(newTab);
                        panel.setActiveTab(newTab);
                    }
                    // el existe, lo activo
                    else {
                        mytab.show();
                    }

                }
            }});
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('lin_ccodigo')+') '+record.get('lin_crazonsocial');
        title = sanitizarTitulo(title);
        // me fijo si el tab existe, si es nuevo lo creo
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    
    onOpenPhones: function(record,view){
        var id = record.get('Id');
        var view = view.up('tablaslineasgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('lin_ccodigo')+') '+getLocale('Teléfonos');
        title = sanitizarTitulo(title);
        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
            var newTab = Ext.widget('telefonodealergridview', {
                iconCls: 'icon-table-edit',
    			title : title,
                parent: view.record,
                translate: false,
                record: record,
                targetTab: panel,
    			objectId : id,
    			closable : true,
                caller:view,
                readOnly: view.readOnly?view.readOnly:false
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
    },
    onGetAllClick: function(button, event, options) {    
        var view = button.up('tablaslineasgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('tablaslineasgridview');
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        var filters = Ext.clone(view.filters);
        if (fieldName != ''){
            filters.push({ 
                property: fieldName+':LIKE',
                value: query
            });
        }
        
        if (filters.length>0){
        	store.clearFilter(true);
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
    },
    
    onDeleteClick : function(button, event, options) {
        var view = button.up('tablaslineasgridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if (selection) {
            /*
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                rec.setConfig({
                    proxy: controller.getTablasLineasModelModel().getProxy()
                });

                rec.destroy({callback: function(record, operation){
                    if (operation.success)
                    {
                        notify('Se eliminio exitosamente');
                        controller.reloadLineasCombo();                            
                    }
                    else
                    {
                        notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                    }                    
                    view.store.load();
                }
            });
            },this);
            */
            var model = controller.getTablasLineasModelModel();
            Ext.Array.each(selection, function (rec) {
                model.load(rec.get('Id'), {   
                    scope: this,
                    callback: function(recordToErase, operation, success) {   
                        if (success) {
                            recordToErase.erase( {callback: function(record, operation){
                                if (operation.success)
                                {
                                    notify('Se eliminó exitosamente');
                                    controller.reloadLineasCombo();                            
                                }else{
                                    notify('No se puede eliminar el registro, está siendo utilizado en el sistema.');
                                }                    
                                view.store.load();
                            }});
                        }
                    }
                });
            });
        }		
	},
    onSelectionChange:function (model, selected, eOpts) {
           model.view.up('tablaslineasgridview').down('[action="delete"]').setDisabled(selected.length == 0);
    }
});
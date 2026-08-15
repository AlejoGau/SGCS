Ext.define('AdministratorSearch.controller.AdministradorTareasGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'AdministratorTareasEstadoStore' ],
    models : [ 'TaskStatusModel', 'TaskStatusSearchModel' ],
    views : [ 'AdministradorTareasGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'administradortareasgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
               
			},
            'administradortareasgridview button[action=search]': {
                click: this.onSearchClick
            },
            'administradortareasgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'administradortareasgridview button[action=add]': {
                click: this.onAdd
            },
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getTaskStatusSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        store.load();
	},
    
  
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('administradortareasgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva Tarea';
        
        
         record = this.getTaskStatusModelModel();
         
            
        	var myobject = record.create({
                  LastExecutionDate: new Date()
			});            
			myobject.save({
    			scope : this,
    			callback : function(record, operation) {
                    
                           
    		
                    
                    
                    // me fijo si el tab existe, si es nuevo lo creo
                    var mytab = panel.down('[title="' + title + '"]');
                    if (!mytab) {
                        var newTab = Ext.widget('administradortareasformview', {
                            iconCls: 'icon-table-add',
                    		title : title,
                            parent: view.record,
                            record: record,
                            targetTab: panel,
                    		objectId : id,
                            closable : true
                		});
                        
                        panel.add(newTab);
                        panel.setActiveTab(newTab);
            		}
            		// el existe, lo activo
            		else {
                        mytab.show();
            		}
                    
                    
    			}
			});

        
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var view = grid.up('administradortareasgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+id+') Tarea';

        // me fijo si el tab existe, si es nuevo lo creo
      /* var mytab = panel.down('[title="' + title + '"]');
    	if (!mytab) {
            var newTab = Ext.widget('administradortareasformview', {
                iconCls: 'icon-table-edit',
    			title : title,
                parent: view.record,
                record: record,
                targetTab: panel,
    			objectId : id,
    			closable : true
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}*/
        
        var win = Ext.create('Ext.Window', {
                        layout: 'fit',
                    	title : 'Seleccione una Cuenta',
            			closeAction : 'destroy',
                        itemId: 'cuentaWin',
            			width : 750,
            			height : 250,
            			border : true,
                        modal: true,
                        view : view,
            			items : [
                            {
                                xtype: 'administradortareasformview',
                                caller: view,
                                record: record
                            }
                        ]
            		});
            		win.show(); 
        
     
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('administradortareasgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('administradortareasgridview');
        
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
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
        
       
    },

});
Ext.define('AdministratorSearch.controller.TablasPuertosGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasPuertosModel', 'TablasPuertosSearchModel' ],
    views : [ 'TablasPuertosGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'tablaspuertosgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'tablaspuertosgridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablaspuertosgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablaspuertosgridview button[action=add]': {
                click: this.onAdd
            },
            'tablaspuertosgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasPuertosSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
	},
    
    objectChanged: function (view) {    
        view.down('pagingtoolbar').doRefresh();        
    },
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('tablaspuertosgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo Puerto';
        
        
         record = this.getTablasPuertosModelModel();
         
            
        	var myobject = record.create({
                'pue_ireceptor':null,
                'pue_npuerto':null
			});            
		/*	myobject.save({
    			scope : this,
    			callback : function(record, operation) {*/
    		
                    
                    
                    // me fijo si el tab existe, si es nuevo lo creo
            var mytab = panel.down('[title="' + title + '"]');
            if (!mytab) {
                var newTab = Ext.widget('tablaspuertosformview', {
                    iconCls: 'icon-table-add',
            		title : title,
                    parent: view.record,
                    record: myobject,
                    targetTab: panel,
                    //translate: false,
            		objectId : id,
                    closable : true,
                    caller: view
        		});
                
                panel.add(newTab);
                panel.setActiveTab(newTab);
    		}
    		// el existe, lo activo
    		else {
                mytab.show();
    		}
                    

    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var view = grid.up('tablaspuertosgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('pue_icodigo');

        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
    	if (!mytab) {
            var newTab = Ext.widget('tablaspuertosformview', {
                iconCls: 'icon-table-edit',
    			title : title,
                parent: view.record,
                record: record,
                translate: false,
                targetTab: panel,
    			objectId : id,
    			closable : true,
                caller: view
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('tablaspuertosgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('tablaspuertosgridview');
        
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
    
    onDeleteClick : function(button, event, options) {
            
        var view = button.up('tablaspuertosgridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                
                rec.setConfig({
                    proxy: controller.getTablasPuertosModelModel().getProxy()
                });
                rec.destroy({callback: function(record, operation){
                   
                   
                        if (operation.success)
                        {
                            notify('Se eliminio exitosamente');
                            
                        }
                        else
                        {
                           notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                        }                    
                        view.store.load();
                }
                
            });
            
            },this);
            
            
        }
        		
	}

});
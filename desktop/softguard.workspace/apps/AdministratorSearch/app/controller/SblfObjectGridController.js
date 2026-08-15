Ext.define('AdministratorSearch.controller.SblfObjectGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'SblfObjectSearchModel', 'SlbfObjectModel' ],
    views : [ 'SblfObjectGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'sblfobjectgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit
			},
            'sblfobjectgridview button[action=search]': {
                click: this.onSearchClick
            },
            'sblfobjectgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'sblfobjectgridview button[action=add]': {
                click: this.onAdd
            },
            'sblfobjectgridview button[action=dataapplicationdelete]' : {
    			click : this.onDeleteClick
			}
		});
	},

	initView : function(view) {
        view.filters = [];
        
        view.controller = this;
        
        if (view.record){
            view.filters = [
                {
                    property: 'Id',
                    value: view.record.get('Id')
                }
            ]
        }
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getSblfObjectSearchModelModel(),
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
        var view = grid.up('sblfobjectgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo data aplicacion';
        
        
         record = this.getSblfObjectModelModel();
         
            var now = new Date();
            var myobject = record.create({
                DateCreated: new Date(),
                DateUpdated: new Date(),
                MimeType:'text/sql'
			});            
           // record.set('MimeType','text/sql');
			myobject.save({
    			scope : this,
    			callback : function(record, operation) {
    			//	this.setRecord(record,view);
                    
                    
                    // me fijo si el tab existe, si es nuevo lo creo
                    var mytab = panel.down('[title="' + title + '"]');
                    if (!mytab) {
                        var newTab = Ext.widget('dataapplicationview', {
                            iconCls: 'icon-database',
                    		title : title,
                            parent: view.record,
                            record: record,
                            targetTab: panel,
                    		objectId : id,
                            itemId: 'template',
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
        var view = grid.up('sblfobjectgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+id+') '+record.get('Name');

        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
            var newTab = Ext.widget('dataapplicationview', {
                iconCls: 'icon-database',
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
        
    },    
    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


     onGetAllClick: function(button, event, options) {    
        
        var view = button.up('sblfobjectgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('sblfobjectgridview');
        
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
    
    onDeleteClick: function(button, event, options){
        var view = button.up('sblfobjectgridview');
        var controller = view.controller;
        var selected = view.selModel.getSelection();
        Ext.Array.each(selected,function(bundle){
            var bundleModel = controller.getSblfObjectModelModel();
            record.setConfig({
				proxy: bundleModel.getProxy()
			});
            bundle.destroy();
        });
        
        view.getStore().load({params:{list: true}});
    },
    

});
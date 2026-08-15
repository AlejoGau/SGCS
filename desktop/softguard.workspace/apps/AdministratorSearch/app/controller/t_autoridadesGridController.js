Ext.define('AdministratorSearch.controller.t_autoridadesGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_autoridadesModel', 't_autoridadesSearchModel' ],
    views : [ 't_autoridadesGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            't_autoridadesgridview' : {
    			afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            't_autoridadesgridview button[action=search]': {
                click: this.onSearchClick
            },
            't_autoridadesgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            't_autoridadesgridview button[action=add]': {
                click: this.onAdd
            },
            't_autoridadesgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getT_autoridadesSearchModelModel(),
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
        var view = grid.up('t_autoridadesgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva Autoridad';
        
        
         record = this.getT_autoridadesModelModel();
         
            
        	var myobject = record.create({
                aut_cprovincia:''
			});            
	
                    
             var viewWidget = Ext.widget('t_autoridadesformview',{
                caller: view,
                record: myobject,
                objectId : id,
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
        		width : 450,
    			height : 550,
    			border : false,
    			items : viewWidget
    		});
    		win.show();
                    
        
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('t_autoridadesgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = ''+record.get('aut_cnombre')+'';
        
        

         var view = Ext.widget('t_autoridadesformview',{
            caller: view,
            record: record,
            objectId : id,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
    		width : 450,
			height : 550,
			border : false,
			items : view
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('t_autoridadesgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('t_autoridadesgridview');
        
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
            
        var view = button.up('t_autoridadesgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                var model = this.getT_autoridadesModelModel();
                rec.setConfig({
                    proxy: model.getProxy()
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
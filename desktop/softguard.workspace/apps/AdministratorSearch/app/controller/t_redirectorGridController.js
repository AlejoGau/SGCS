Ext.define('AdministratorSearch.controller.t_redirectorGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_redirectorModel', 't_redirectorSearchModel' ],
    views : [ 't_redirectorGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            't_redirectorgridview' : {
        		afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            't_redirectorgridview button[action=search]': {
                click: this.onSearchClick
            },
            't_redirectorgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            't_redirectorgridview button[action=add]': {
                click: this.onAdd
            },
            't_redirectorgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getT_redirectorSearchModelModel(),
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
        var view = grid.up('t_redirectorgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva Redirector';
        
        
         record = this.getT_redirectorModelModel();
         
            
        	var myobject = record.create({
                trd_cnombre:''
			});            
	
                    
             var viewWidget = Ext.widget('t_redirectorformview',{
                caller: view,
                record: myobject,
                objectId : id,
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
        		width : 450,
    			height : 450,
    			border : false,
    			items : viewWidget
    		});
    		win.show();
                    
        
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('t_redirectorgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = sanitizarTitulo(record.get('trd_cnombre'));

         var view = Ext.widget('t_redirectorformview',{
            caller: view,
            record: record,
            objectId : id,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            translate: false,
    		width : 450,
			height : 450,
			border : false,
			items : view
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('t_redirectorgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('t_redirectorgridview');
        
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
            
        var view = button.up('t_redirectorgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                var model = this.getT_redirectorModelModel();
                record.setConfig({proxy: model.getProxy()});
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
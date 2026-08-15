Ext.define('AdministratorSearch.controller.t_categorias_impositivas_fcGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_categorias_impositivas_fcSearchModel', 't_categorias_impositivas_fcModel' ],
    views : [ 't_categorias_impositivas_fcGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            't_categorias_impositivas_fcgridview' : {
                afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
    		},
            't_categorias_impositivas_fcgridview button[action=search]': {
                click: this.onSearchClick
            },
            't_categorias_impositivas_fcgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            't_categorias_impositivas_fcgridview button[action=add]': {
                click: this.onAdd
            },
            't_categorias_impositivas_fcgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getT_categorias_impositivas_fcSearchModelModel(),
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
        
        var view = grid.up('t_categorias_impositivas_fcgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva categoria impositiva';
        
        
         record = this.getT_categorias_impositivas_fcModelModel();
         
            
        	var myobject = record.create({
               cat_nTipoResp:0
			});            
	
                    
             var viewWidget = Ext.widget('t_categorias_impositivas_fcformview',{
                caller: view,
                record: myobject
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
        		width : 450,
    			height : 300,
    			border : false,
    			items : viewWidget
    		});
    		win.show();
    },    

    onItemClick: function(grid,record,item,index,e,options){
        var view = grid.up('t_categorias_impositivas_fcgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('cat_cdescripcion');

         var view = Ext.widget('t_categorias_impositivas_fcformview',{
            caller: view,
            record: record
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            translate: false,
    		width : 450,
			height : 300,
			border : false,
			items : view
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('t_categorias_impositivas_fcgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('t_categorias_impositivas_fcgridview');
        
        var store = view.getStore();
        store.clearFilter(true)
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
            
        var view = button.up('t_categorias_impositivas_fcgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                var model = this.getT_categorias_impositivas_fcModelModel();

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
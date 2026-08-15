Ext.define('AdministratorSearch.controller.w_destinatarios_correoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'w_destinatarios_correoModel', 'w_destinatarios_correoSearchModel' ],
    views : [ 'w_destinatarios_correoGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'w_destinatarios_correogridview' : {
        		afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'w_destinatarios_correogridview button[action=search]': {
                click: this.onSearchClick
            },
            'w_destinatarios_correogridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'w_destinatarios_correogridview button[action=add]': {
                click: this.onAdd
            },
            'w_destinatarios_correogridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getW_destinatarios_correoSearchModelModel(),
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
        var view = grid.up('w_destinatarios_correogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo Destinatario';
        
        
        record = this.getW_destinatarios_correoModelModel();
         
            
        var myobject = record.create({
              
        });            
        
         var view = Ext.widget('w_destinatarios_correoformview',{
            caller: view,
            record: myobject,
            objectId : id,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
        	width : 450,
        	height : 300,
        	border : false,
        	items : view
        });
        win.show();

    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var view = grid.up('w_destinatarios_correogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = getLocale('Destinatario');

         var view = Ext.widget('w_destinatarios_correoformview',{
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
        
        var view = button.up('w_destinatarios_correogridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('w_destinatarios_correogridview');
        
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
        var controller = this;
        var view = button.up('w_destinatarios_correogridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                record.setConfig({
                    proxy: controller.getW_destinatarios_correoModelModel().getProxy()
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
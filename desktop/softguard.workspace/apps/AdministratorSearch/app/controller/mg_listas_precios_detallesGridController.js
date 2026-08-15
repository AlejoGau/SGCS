Ext.define('AdministratorSearch.controller.mg_listas_precios_detallesGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'mg_listas_precios_detalleSearchModel', 'mg_listas_precios_detalleModel' ],
    views : [ 'mg_listas_precios_detallesGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'mg_listas_precios_detallesgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'mg_listas_precios_detallesgridview button[action=search]': {
                click: this.onSearchClick
            },
            'mg_listas_precios_detallesgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'mg_listas_precios_detallesgridview button[action=add]': {
                click: this.onAdd
            },
            'mg_listas_precios_detallesgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [{
            property:'mglpd_idlista',
            value:view.record.get('Id')
        }];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getMg_listas_precios_detalleSearchModelModel(),
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
       view.store.load()
    },
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('mg_listas_precios_detallesgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo precio';
        
        
         record = this.getMg_listas_precios_detalleModelModel();
         
            
        	var myobject = record.create({
                mglpd_idlista: view.record.get('Id')
			});            
	
                    
                     var view = Ext.widget('mg_listas_precios_detallesformview',{
                        caller: view,
                        record: myobject,
                        objectId : id,
                    });
                    
                    var win = Ext.create('Ext.Window', {
                        iconCls: 'icon-table-add',
                        layout : 'fit',
                        title : title,
                		width : 450,
            			height : 200,
            			border : false,
            			items : view
            		});
            		win.show();
                    
                    
    
        
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('mg_listas_precios_detallesgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Precio';

        record.setConfig({
            proxy: this.getMg_listas_precios_detalleModelModel().getProxy()
        });
        var view = Ext.widget('mg_listas_precios_detallesformview',{
            caller: view,
            record: record
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            translate: false,
    		width : 450,
			height : 200,
			border : false,
			items : view
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('mg_listas_precios_detallesgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('mg_listas_precios_detallesgridview');
        
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
            
        var view = button.up('mg_listas_precios_detallesgridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this

        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                rec.setConfig({
                    proxy: controller.getMg_listas_precios_detalleModelModel().getProxy()
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
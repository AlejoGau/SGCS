Ext.define('AdministratorSearch.controller.TablasCategorizacionGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasCategorizacionModel', 'TablasCategorizacionSearchModel' ],
    views : [ 'TablasCategorizacionGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'tablascategorizaciongridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'tablascategorizaciongridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablascategorizaciongridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablascategorizaciongridview button[action=add]': {
                click: this.onAdd
            },
            'tablascategorizaciongridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasCategorizacionSearchModelModel(),
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
        var view = grid.up('tablascategorizaciongridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva Resolución';
        
        
         record = this.getTablasCategorizacionModelModel();
         
            
        	var myobject = record.create({
			});            
		/*	myobject.save({
    			scope : this,
    			callback : function(record, operation) {
    		
                    */
                    
                     var view = Ext.widget('tablascategorizacionformview',{
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
                    
                    
    	/*		}
			});
*/
        
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('tablascategorizaciongridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('cat_cDescripcion');

        var view = Ext.widget('tablascategorizacionformview',{
            caller: grid,
            record: record,
            objectId : id,
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
        
        var view = button.up('tablascategorizaciongridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('tablascategorizaciongridview');
        
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
            
        var view = button.up('tablascategorizaciongridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
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
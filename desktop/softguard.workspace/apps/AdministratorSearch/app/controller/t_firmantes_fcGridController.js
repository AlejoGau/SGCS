Ext.define('AdministratorSearch.controller.t_firmantes_fcGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_firmante_fcSearchModel', 't_firmantes_fcModel' ],
    views : [ 't_firmantes_fcGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            't_firmantes_fcgridview' : {
            	afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            't_firmantes_fcgridview button[action=search]': {
                click: this.onSearchClick
            },
            't_firmantes_fcgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            't_firmantes_fcgridview button[action=add]': {
                click: this.onAdd
            },
            't_firmantes_fcgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getT_firmante_fcSearchModelModel(),
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
        var view = grid.up('t_firmantes_fcgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva firmante';
        
        
         record = this.getT_firmantes_fcModelModel();
         
            
        	var myobject = record.create({
                fir_cnombre:'',
                fir_nestado:0
			});            
	
                    
             var viewWidget = Ext.widget('t_firmantes_fcformview',{
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
        var view = grid.up('t_firmantes_fcgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('fir_cnombre');

         var view = Ext.widget('t_firmantes_fcformview',{
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
        
        var view = button.up('t_firmantes_fcgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('t_firmantes_fcgridview');
        
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
            
        var view = button.up('t_firmantes_fcgridview');
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
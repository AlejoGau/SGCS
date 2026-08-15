Ext.define('AdministratorSearch.controller.TablasLineasXPuertoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasLineasXPuertoModel', 'TablasLineasXPuertoSearchModel' ],
    views : [ 'TablasLineasXPuertoGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
    		'tablaslineasxpuertogridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
               
			},
            'tablaslineasxpuertogridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablaslineasxpuertogridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablaslineasxpuertogridview button[action=add]': {
                click: this.onAdd
            },
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasLineasXPuertoSearchModelModel(),
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
    
  
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('tablaslineasxpuertogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo Lineas x puerto';
        
        
         record = this.getTablasLineasXPuertoModelModel();
         
            
        	var myobject = record.create({
			});            
			myobject.save({
    			scope : this,
    			callback : function(record, operation) {
    		
                    
                    
                    var view = Ext.widget('tablaslineasxpuertoformview',{
                        caller: grid,
                        record: record,
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
                    
                    
    			}
			});

        
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var view = grid.up('tablaslineasxpuertogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+id+') Lineas X puerto';

        var view = Ext.widget('tablaslineasxpuertoformview',{
            caller: grid,
            record: record,
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
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('tablaslineasxpuertogridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('tablaslineasxpuertogridview');
        
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
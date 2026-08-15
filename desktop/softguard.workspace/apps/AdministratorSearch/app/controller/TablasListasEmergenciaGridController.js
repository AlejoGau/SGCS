Ext.define('AdministratorSearch.controller.TablasListasEmergenciaGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasListasEmergenciaModel', 'TablasListasEmergenciaSearchModel' ],
    views : [ 'TablasListasEmergenciaGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'tablaslistasemergenciagridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'tablaslistasemergenciagridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablaslistasemergenciagridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablaslistasemergenciagridview button[action=add]': {
                click: this.onAdd
            },
            'tablaslistasemergenciagridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasListasEmergenciaSearchModelModel(),
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
        var view = grid.up('tablaslistasemergenciagridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo lista de emergencia';
        
        
        model = this.getTablasListasEmergenciaModelModel();
         
        var now = new Date();
        var record = model.create({
            lis_ccodigo : 0
        });            
        
        var viewwin = Ext.widget('tablaslistasemergenciaformview',{
            caller: view,
            record: record,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
        	title : title,
        	width : 450,
        	height : 200,
        	border : false,
        	items : viewwin
        });
        win.show();

                
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var view = grid.up('tablaslistasemergenciagridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('lis_cdescripcion');

        var view = Ext.widget('tablaslistasemergenciaformview',{
            caller: view,
            record: record,
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
        
        var view = button.up('tablaslistasemergenciagridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('tablaslistasemergenciagridview');
        
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
            
        var view = button.up('tablaslistasemergenciagridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                rec.destroy({callback: function(record, operation){
                   
                   
                        if (operation.success)
                        {
                            notify('Se eliminio exitosamente');
                            view.store.load();
                        }
                        else
                        {
                           notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                        }                    
                   
                }
                
            });
            
            },this);
        }
        		
	}

});
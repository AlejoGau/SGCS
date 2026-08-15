Ext.define('AdministratorSearch.controller.TablasMovilesPatrullaGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasMovilesPatrullaModel', 'TablasMovilesPatrullaSearchModel' ],
    views : [ 'TablasMovilesPatrullaGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'tablasmovilespatrullagridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'tablasmovilespatrullagridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablasmovilespatrullagridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablasmovilespatrullagridview button[action=add]': {
                click: this.onAdd
            },
            'tablasmovilespatrullagridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [{
                property:'tmp_cnumero:LIKENOT',
                value: 'ST'
            }];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasMovilesPatrullaSearchModelModel(),
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
        var view = grid.up('tablasmovilespatrullagridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo Moviles patrulla';
        
        
         record = this.getTablasMovilesPatrullaModelModel();
         
            
        	var myobject = record.create({
                tmp_icuenta: null,
                tmp_cflota: null
			});            
			
                    
            var view = Ext.widget('tablasmovilespatrullaformview',{
                caller: view,
                record: myobject
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
        		width : 450,
    			height : 400,
    			border : false,
    			items : view
    		});
    		win.show();
                    


        
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var view = grid.up('tablasmovilespatrullagridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('tmp_iid')+') Moviles patrulla';

        var view = Ext.widget('tablasmovilespatrullaformview',{
            caller: view,
            record: record,
            objectId : id,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
    		width : 450,
			height : 400,
			border : false,
			items : view
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('tablasmovilespatrullagridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('tablasmovilespatrullagridview');
        
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
            
        var view = button.up('tablasmovilespatrullagridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                var modelAux = this.getTablasMovilesPatrullaModelModel();
                rec.setConfig({
                    proxy: modelAux.getProxy()
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
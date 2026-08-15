Ext.define('AdministratorSearch.controller.STFormaViajeGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ServTecFormaViajeSearchModel', 'ServTecFormaViajeVisitasModel' ],
    views : [ 'STFormaViajeGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'stformaviajeview' : {
            	afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'stformaviajeview button[action=search]': {
                click: this.onSearchClick
            },
            'stformaviajeview button[action=getall]': {
                click: this.onGetAllClick
            },
            'stformaviajeview button[action=add]': {
                click: this.onAdd
            },
            'stformaviajeview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
       
       view.filters = []; 
        view.store =Ext.create('Ext.data.Store',{
            model: this.getServTecFormaViajeSearchModelModel(),
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
    
    onAdd: function(button, event, options) {
        
        var id = 0;
        var view = button.up('stformaviajeview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = getLocale('Servicio tecnico formas de viaje');

                        
         record = this.getServTecFormaViajeVisitasModelModel();
         
            
        	var myobject = record.create({
                		});            
                 
		    var viewwin = Ext.widget('stformaviajeformview',{
                caller: view,
                record: myobject,
                objectId : id
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
                width : 450,
        		height : 130,
    			border : false,
    			items : viewwin
    		});
    		win.show();
   
    },    
    

    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('stformaviajeview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Servicio Tecnico Formas viaje';
        
        
        var cabecera = this.getServTecFormaViajeVisitasModelModel().load(record.get('Id'), {callback:function (recordx,operation,success) {       
                var viewwin = Ext.widget('stformaviajeformview',{
                    caller: view,
                    record: recordx,
                    objectId : id
                });
                
                var win = Ext.create('Ext.Window', {
                    iconCls: 'icon-table-add',
                    layout : 'fit',
                    title : title,
                    width : 450,
            		height : 130,
        			border : false,
        			items : viewwin
        		});
        		win.show();
                    
          }})

        
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('stformaviajeview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('stformaviajeview');
        
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
            
        var view = button.up('stformaviajeview');
        var selection = view.getSelectionModel().getSelection()[0];
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
                   
                }
                
            });
            
            },this);
            view.store.load();
            
        }
        		
	}

});
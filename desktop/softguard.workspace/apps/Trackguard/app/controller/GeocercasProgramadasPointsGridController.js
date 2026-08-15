Ext.define('Trackguard.controller.GeocercasProgramadasPointsGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'tg_route_geofencesModel', 'tg_route_geofencesSearchModel' ],
    views : [ 'GeocercasProgramadasPointsGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'geocercasprogramadaspointsgridview' : {
        		afterrender : this.initView,
                afterrecord : this.initView,
                objectedit: this.onObjectEdit,
                objectchanged: this.onObjectChanged,
                objectdelete: this.objectDelete
			},
            'geocercasprogramadaspointsgridview button[action=search]': {
                click: this.onSearchClick
            },
            'geocercasprogramadaspointsgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'geocercasprogramadaspointsgridview button[action=vermapa]': {
                click: this.onVerMapaClick
            },
            'geocercasprogramadaspointsgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			},
            'geocercasprogramadaspointsgridview button[action="agregar"]' : {
        		click : this.onAgregarClick
			},
            'geocercasprogramadaspointsgridview button[action="savepoint"]' : {
            	click : this.onSaveClick
			}
            
		});
	},
    
    

	initView : function(view) {
        view.routeId  = view.record.get('Id');
        if(view.routeId) {
            view.filters = [
                {
                    property: 'routeId',
                    value: view.routeId
                }
            ];
            view.sorters = [
                    {
                        property : 'time',
                        direction: 'ASC'
                    }
                ];
            
            view.store =Ext.create('Ext.data.Store',{
                model: this.getTg_route_geofencesSearchModelModel(),
                pageSize: 50,
                remoteSort: false,
                remoteFilter: false,
                filters: view.filters,
                sorters: view.sorters
            })
            view.bindStore(view.store);
            var toolbar = view.down('pagingtoolbar');
            toolbar.bindStore(view.store);
           
            view.oldProxy = view.store.getProxy();
            
            view.store.load();
            
            view.mod = this.getTg_route_geofencesModelModel();
        }
        
	},
    
    onObjectChanged: function (view) {    
        view.store.setConfig({
            proxy: view.oldProxy
        });
        view.down('pagingtoolbar').doRefresh();        
    },


    objectDelete: function (rec,view) {    
             
        var model = this.getTg_route_geofencesModelModel();        
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
           
        }})


    },
    
    onSaveClick: function(grid,record,item,index,e,options){
        var view = grid.up('geocercasprogramadaspointsgridview');
        view.store.setConfig({
            proxy: view.mod.getProxy()
        });
        view.store.sync({callback:function () {
            
            
            view.store.sort({property : 'time', direction: 'ASC'});
           
            notify('Se guardo con exito.');
        },
        success:function () {
             view.store.setConfig({
                proxy: view.oldProxy
            });
             view.store.load()
            
        }
        });
        
    
    },
    
    onAgregarClick: function(grid,record,item,index,e,options){
        
     
        var view = grid.up('geocercasprogramadaspointsgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo checkpoint';

         record = this.getTg_route_geofencesModelModel();
                    
             var viewform = Ext.widget('geocercasprogramadasgeocercashelperview',{
                caller: view,
                record: view.record
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
        		width : 450,
    			height : 500,
    			border : false,
    			items : viewform
    		});
    		win.show();
                    
 
        
    },
    
    onVerMapaClick: function(grid,record,item,index,e,options){
    
        var view = grid.up('geocercasprogramadaspointsgridview');
     
       
                    
             var viewform = Ext.widget('geocercasprogramadasmapview',{
                caller: view,
                records: view.getStore().data.items
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : 'Mapa',
        		width : 500,
    			height : 500,
    			border : false,
    			items : viewform
    		});
    		win.show();
                    
        
    },
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('geocercasprogramadaspointsgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('Id')+') checkpoint';
        

        var viewForm = Ext.widget('routespointformview',{
            caller: view,
            record: record,
            objectId : id
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
    		width : 450,
			height : 300,
			border : false,
			items : viewForm
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('geocercasprogramadaspointsgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('geocercasprogramadaspointsgridview');
        
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
            
        var view = button.up('geocercasprogramadaspointsgridview');
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
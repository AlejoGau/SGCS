Ext.define('Trackguard.controller.GeocercasProgramadasProgramGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'tg_route_programsModel', 'tg_route_programsSearchModel' ],
    views : [ 'GeocercasProgramadasProgramGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'geocercasprogramadasprogramgridview' : {
        		afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,                
                objectdelete: this.objectDelete
               
			},
            'geocercasprogramadasprogramgridview button[action=search]': {
                click: this.onSearchClick
            },
            'geocercasprogramadasprogramgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'geocercasprogramadasprogramgridview button[action=add]': {
                click: this.onAdd
            },
            'geocercasprogramadasprogramgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
		});
	},

	initView : function(view) {
        view.myPanel = view.up('tabpanel');  
       // view.cuentaId  = view.record.get('cue_iid');
      
        view.filters = [
            {
                property: 'routeId',
                value: view.record.get('Id'),
                id:'routeId'
            }
        ];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTg_route_programsSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        if(view.record.get('Id') != 0) {
            view.store.load();
        }
	},
    
     objectChanged: function (view) {    
        view.store.clearFilter(true);
        view.store.filter([{
            property: 'routeId',
            value: view.record.get('Id'),
            id:'routeId'
        }]);
    },


    objectDelete: function (rec,view) {    
             
        var model = this.getTg_route_programsModelModel();        
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
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('geocercasprogramadasprogramgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo programa';
        
        
         record = this.getTg_route_programsModelModel();
         
            
            var myobject = record.create({
                    'routeId': view.record.get('Id')
			});            
		
                    
             var viewform = Ext.widget('geocercasprogramadasprogramformview',{
                caller: view,
                record: myobject,
                objectId : id,
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
        		width : 650,
    			height : 400,
    			border : false,
    			items : viewform
    		});
    		win.show();
                    
 
        
    },    
    
    
   
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('geocercasprogramadasprogramgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('Id')+') Programa';
        
        
        
        

        var viewForm = Ext.widget('geocercasprogramadasprogramformview',{
            caller: view,
            record: record,
            objectId : id,
            edit:true
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
    		width : 1150,
            height : 200,
			border : false,
			items : viewForm
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('geocercasprogramadasprogramgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('geocercasprogramadasprogramgridview');
        
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
            
        var view = button.up('geocercasprogramadasprogramgridview');
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
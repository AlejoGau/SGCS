Ext.define('Trackguard.controller.GeoCercasProgramadasGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'tg_routesSearchModel', 'tg_routesModel', 'SoftguardUsuarioModel' ],
    views : [ 'GeocercasProgramadasGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'geocercasprogramadasgridview' : {
    			afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                openpoints: this.openPoints,
                selectionchange : this.onSelectionChange
                
               
			},
            'geocercasprogramadasgridview button[action=search]': {
                click: this.onSearchClick
            },
            'geocercasprogramadasgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'geocercasprogramadasgridview button[action=add]': {
                click: this.onAdd
            },
            'geocercasprogramadasgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			},
            'geocercasprogramadasgridview button[action="rebuild"]' : {
        		click : this.onRebuildClick
			}
            
            
		});
	},

	initView : function(view) {
        view.myPanel = view.up('tabpanel');  
        view.cuentaId  = view.record.get('cue_iid')?view.record.get('cue_iid'):view.record.get('CuentaId');
        view.filters = [
            {
                property: 'cuentaId',
                value: view.cuentaId
            }
        ];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTg_routesSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        if(view.cuentaId != 0) {
            view.store.load();
        }
        
        
        if(view.precentHeader) {
            toolbar.hide();
        }
        
	},
    
    objectChanged: function (view) {    
        view.down('pagingtoolbar').doRefresh();        
    },


    openPoints: function (view) {    
       
        var viewform = Ext.widget('routespointsformview',{
                caller: view,
                objectId : view.cuentaId,
            });
            
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : 'CheckPoint',
        	width : 700,
			height : 600,
			border : false,
			items : viewform
		});
		win.show();


    },
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('geocercasprogramadasgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva ruta';
        
        
        var mytab = view.myPanel.down('[title='+title+']');
        
        if (!mytab) {
        
            record = this.getTg_routesModelModel();
        	var myobject = record.create({
                    'cuentaId': view.cuentaId
			});            
		
                    
             var newTab = Ext.widget('geocercasprogramadasformview',{
                caller: view,
                record: myobject,
                objectId : id,
                title:title,
    		    closable: true
            });
            
    			
			

			// agrego la paleta creada
			view.myPanel.add(newTab);
			view.myPanel.setActiveTab(newTab);
    	}
            
          /*  var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
        		width : 700,
    			height : 600,
    			border : false,
    			items : viewform
    		});
    		win.show();*/
                    
 
        
    },    
    
    
    onSelectionChange: function(selectionModel, records, options){

        var view = selectionModel.view.up('geocercasprogramadasgridview');
        if(view.eventFireOnSelect) {
            view.caller.fireEvent(view.eventFireOnSelect, records, view.caller)
        }
    },
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('geocercasprogramadasgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('Name');
        var mytab = view.myPanel.down('[title='+title+']');
        
        
        if(view.eventFireOnSelect) {
           // view.caller.fireEvent(view.eventFireOnSelect, record)
        } else {
            
        
            if (!mytab) {
                var newTab = Ext.widget('geocercasprogramadasformview',{
                    caller: view,
                    record: record,
                    translate: false,
                    objectId : id,
                    title: title,
        		    closable: true
                });
    
    			// agrego la paleta creada
    			view.myPanel.add(newTab);
    			view.myPanel.setActiveTab(newTab);
        	}
        }
        
        
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('geocercasprogramadasgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('geocercasprogramadasgridview');
        
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
            
        var view = button.up('geocercasprogramadasgridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                
                var model = controller.getTg_routesModelModel();        
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
        		
	},
    
    onRebuildClick : function(button, event, options) {    
        var view = button.up('geocercasprogramadasgridview');
        
        Ext.Ajax.request({
            url : '/rest/search/SchedulercreateVCRoutes',
            success: function(response){
                var text = response.responseText;
                var object = Ext.JSON.decode(text);
                
                if (object.success){
                    notify('Se regeneraron las rutas con éxito.')
                }
            }
        });
            	
	}
    
    
    
    

});
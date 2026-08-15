Ext.define('Trackguard.controller.RestriccionGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'GeocercaModel', 'GeocercaCuentaModel', 'GeoFenseRestriccionesSearchModel' ],
    views : [ 'RestriccionGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'restriccionesgridview' : {
    			afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                selectionchange : this.onSelectionChange
                
               
			},
            'restriccionesgridview button[action=search]': {
                click: this.onSearchClick
            },
            'restriccionesgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'restriccionesgridview button[action=add]': {
                click: this.onAdd
            },
            'restriccionesgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			},
            'restriccionesgridview button[action="rebuild"]' : {
        		click : this.onRebuildClick
			}
            
            
		});
	},

	initView : function(view) {
        view.myPanel = view.up('tabpanel');  
      /*  view.cuentaId  = view.record.get('cue_iid')?view.record.get('cue_iid'):view.record.get('CuentaId');
        view.filters = [
            {
                property: 'cuentaId',
                value: view.cuentaId
            }
        ];   */   
        
        view.filters = []
        view.store =Ext.create('Ext.data.Store',{
            model: this.getGeoFenseRestriccionesSearchModelModel(),
            pageSize: 5000,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        console.log('prueba');
        view.store.load();
        
        
     
        
	},
    
    objectChanged: function (view) {    
        view.down('pagingtoolbar').doRefresh();        
    },

    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('restriccionesgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva Restricción';
        
        
        var mytab = view.myPanel.down('[title='+title+']');
        
        if (!mytab) {
        
            record = this.getGeocercaModelModel();
        	var myobject = record.create({
                    'GeoType': 'D'
			});            
		
                    
             var newTab = Ext.widget('restriccionformview',{
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

        var view = selectionModel.view.up('restriccionesgridview');
        if(view.eventFireOnSelect) {
            view.caller.fireEvent(view.eventFireOnSelect, records, view.caller)
        }
    },
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('restriccionesgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('Name');
        var mytab = view.myPanel.down('[title='+title+']');
        
        
        if(view.eventFireOnSelect) {
           // view.caller.fireEvent(view.eventFireOnSelect, record)
        } else {
            
        
            if (!mytab) {
                var newTab = Ext.widget('restriccionformview',{
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
        
        var view = button.up('restriccionesgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('restriccionesgridview');
        
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
            store.clearFilter(true)
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
        
       
    },
    
    onDeleteClick : function(button, event, options) {
            
        var view = button.up('restriccionesgridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                
                var model = controller.getGeocercaModelModel();        
                record.setConfig({proxy: model.getProxy()});
                
                rec.destroy({callback: function(record, operation){
                   
                   
                        if (operation.success)
                        {
                            
                            
                             var storeCuentas =Ext.create('Ext.data.Store',{
                                model: controller.getGeocercaCuentaModelModel(),
                                pageSize: 5000,
                                remoteSort: true,
                                remoteFilter: true,
                                filters: [
                                    {
                                        property:'GeoFenseId',
                                        value: rec.get('Id')
                                    }
                                    ]
                            })
                      
                            storeCuentas.load({callback:function (records,k) {
                                
                                if(records.length>0) {
                                    storeCuentas.each(function (c) {
                                      //  storeCuentas.remove(c)
                                        c.destroy()
                                    })
                                }
                                
                            }})
                            
                            
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
    
 
    
    
    
    

});
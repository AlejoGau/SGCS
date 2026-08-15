Ext.define('AdministratorSearch.controller.TablasPlantillasNotificacionManualGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasPlantillasNotificacionManualSearchModel', 'TablasPlantillasNotificacionManualModel' ],
    views : [ 'TablasPlantillasNotificacionManualGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'tablasplantillasnotificacionmanualgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'tablasplantillasnotificacionmanualgridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablasplantillasnotificacionmanualgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablasplantillasnotificacionmanualgridview button[action=add]': {
                click: this.onAdd
            },
            'tablasplantillasnotificacionmanualgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [{
            property:'pls_iTipo ',
            value: 1
        }];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasPlantillasNotificacionManualSearchModelModel(),
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
        var view = grid.up('tablasplantillasnotificacionmanualgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo Plantillas Notificación Manual';
        
        
         record = this.getTablasPlantillasNotificacionManualModelModel();
         
            
        	var myobject = record.create({
                //'pls_ccodigo':0,
                'pls_iTipo':1
			});            
		// me fijo si el tab existe, si es nuevo lo creo
                    var mytab = panel.down('[title="' + title + '"]');
                    if (!mytab) {
                        var newTab = Ext.widget('tablasplantillasnotificacionmanualformview', {
                            iconCls: 'icon-table-add',
                            title : title,
                            parent: view.record,
                            record: myobject,
                            targetTab: panel,
                    		objectId : id,
                            closable : true,
                            caller: view
                		});
                        
                        panel.add(newTab);
                        panel.setActiveTab(newTab);
            		}
            		// el existe, lo activo
            		else {
                        mytab.show();
            		}

        
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('tablasplantillasnotificacionmanualgridview');
                            
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('pls_cdescripcion');

        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
            var newTab = Ext.widget('tablasplantillasnotificacionmanualformview', {
                iconCls: 'icon-table-edit',
    			title : title,
                parent: view.record,
                record: record,
                translate: false,
                targetTab: panel,
    			objectId : id,
    			closable : true,
                caller: view
    		});
            
            panel.add(newTab);
            panel.setActiveTab(newTab);
		}
		// el existe, lo activo
		else {
            mytab.show();
		}
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('tablasplantillasnotificacionmanualgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('tablasplantillasnotificacionmanualgridview');
        
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
            
        var view = button.up('tablasplantillasnotificacionmanualgridview');
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
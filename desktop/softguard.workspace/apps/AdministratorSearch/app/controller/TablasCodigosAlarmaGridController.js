Ext.define('AdministratorSearch.controller.TablasCodigosAlarmaGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasCodigosAlarmaModel', 'TablasCodigosAlarmaSearchModel' ],
    views : [ 'TablasCodigosAlarmaGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'tablascodigosalarmagridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'tablascodigosalarmagridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablascodigosalarmagridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablascodigosalarmagridview button[action=add]': {
                click: this.onAdd
            },
            'tablascodigosalarmagridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasCodigosAlarmaSearchModelModel(),
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
        var view = grid.up('tablascodigosalarmagridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo codigo alarma';
        
        
         record = this.getTablasCodigosAlarmaModelModel();
         
            
        	var myobject = record.create({
                cod_nWebCliente:1
			});    
            
            
             // me fijo si el tab existe, si es nuevo lo creo
                    var mytab = panel.down('[title="' + title + '"]');
                    if (!mytab) {
                        var newTab = Ext.widget('tablascodigosalarmasformview', {
                            iconCls: 'icon-table-add',
                        	title : title,
                            parent: view.record,
                            record: myobject,
                            targetTab: panel,
                    		objectId : id,
                            closable : true,
                            closeAction: 'destroy',
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
        var view = grid.up('tablascodigosalarmagridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('cod_ccodigo')+') ' + getLocale('Alarma');

        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
    	if (!mytab) {
            var newTab = Ext.widget('tablascodigosalarmasformview', {
                iconCls: 'icon-table-edit',
    			title : title,
                translate: false,
                parent: view.record,
                record: record,
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
        
        var view = button.up('tablascodigosalarmagridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('tablascodigosalarmagridview');
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        
        //var filters = Ext.clone(view.filters);
        var filters = [];
        
        if (fieldName != ''){
            filters.push({ 
                property: fieldName+':LIKE',
                id: fieldName,
                value: query
            });
            
        }
        
        if (filters.length>0){
         /*   var filtrosString = '';
            var filtrosEstructurados = new Array();
            
            Ext.each(filters, function(filtro, index) {
               filtrosEstructurados[filtro.property] = filtro.value;
            });
             
            Ext.each(filtrosEstructurados, function(filtro, index) {
               console.log(key, filtro);
            });*/
            
            
           // view.down('#filtros').setValue(
            store.clearFilter(true);
            store.filter(filters);
            
        }
        else{
            store.clearFilter();
        }
        
       
    },
    
    onDeleteClick : function(button, event, options) {
        var controller = this
        var view = button.up('tablascodigosalarmagridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
           var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                rec.setConfig({
                    proxy: controller.getTablasCodigosAlarmaModelModel().getProxy()
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
Ext.define('AdministratorSearch.controller.TablasTipoServicioGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasTipoServicioModel', 'TablasTipoServicioSearchModel' ],
    views : [ 'TablasTipoServicioGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'tablastiposerviciogridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'tablastiposerviciogridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablastiposerviciogridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablastiposerviciogridview button[action=add]': {
                click: this.onAdd
            },
            'tablastiposerviciogridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasTipoServicioSearchModelModel(),
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
        var view = grid.up('tablastiposerviciogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo tipo de servicio';
        
        
         record = this.getTablasTipoServicioModelModel();
         
            
        	var myobject = record.create({
			});            

            var view = Ext.widget('tablastiposervicioformview',{
                caller: view,
                record: myobject,
                objectId : id,
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
                width : 450,
                height : 145,
                border : false,
                items : view
            });
            win.show();
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var view = grid.up('tablastiposerviciogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = getLocale('Tipo de servicio');

         var view = Ext.widget('tablastiposervicioformview',{
            caller: grid,
            record: record,
            objectId : id,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            translate: false,
			width : 450,
			height : 145,
			border : false,
			items : view
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('tablastiposerviciogridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('tablastiposerviciogridview');
        
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
        var view = button.up('tablastiposerviciogridview');
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
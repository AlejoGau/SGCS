Ext.define('AdministratorSearch.controller.p_lista_correoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'p_lista_correosSearchModel', 'p_lista_correosModel' ],
    views : [ 'p_lista_correoGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'plistacorreogridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'plistacorreogridview button[action=search]': {
                click: this.onSearchClick
            },
            'plistacorreogridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'plistacorreogridview button[action=add]': {
                click: this.onAdd
            },
            'plistacorreogridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getP_lista_correosSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters,
            sorters: [
                    { 
                        property: 'plc_name',
                        direction:'ASC'
                    }
                ]
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
        var view = grid.up('plistacorreogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva lista';
        
        
        record = this.getP_lista_correosModelModel();
         
            
    	var myobject = record.create({
           
		});            
  
        var view = Ext.widget('plistacorreoformview',{
            caller: view,
            record: myobject,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
			title : title,
			width : 450,
			height : 250,
			border : false,
			items : view
		});
		win.show();
                    
          
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var view = grid.up('plistacorreogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('plc_name');

        var view = Ext.widget('plistacorreoformview',{
            caller: view,
            record: record,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
			title : title,
			width : 450,
			height : 250,
            translate: false,
			border : false,
			items : view
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('plistacorreogridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('plistacorreogridview');
        
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
            
        var view = button.up('plistacorreogridview');
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
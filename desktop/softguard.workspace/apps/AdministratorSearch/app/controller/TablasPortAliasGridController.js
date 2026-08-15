Ext.define('AdministratorSearch.controller.TablasPortAliasGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasPortAliasModel', 'TablasPortAliasSearchModel' ],
    views : [ 'TablasPortAliasGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'tablasportaliasgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'tablasportaliasgridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablasportaliasgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablasportaliasgridview button[action=add]': {
                click: this.onAdd
            },
            'tablasportaliasgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        //view.filters = [{property:'tpa_ipuerto',value:0,id:'tpa_ipuerto'}]; -- lo saco pedido por Fer 11/10/2019
        view.filters = [];
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasPortAliasSearchModelModel(),
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
        var view = grid.up('tablasportaliasgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo Port alias';

        record = this.getTablasPortAliasModelModel();

        var myobject = record.create({
            'tpa_icodigo':0,
            'tpa_cdealer':'',
            'tpa_ipuerto':'',
            'tpa_iportip':null
        });           

        var view = Ext.widget('tablasasignacionpuertoformview',{
            caller: view,
            record: myobject,
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

    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var view = grid.up('tablasportaliasgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+id+') '+getLocale('Port alias');

        var viewwiget = Ext.widget('tablasasignacionpuertoformview',{
            caller: view,
            record: record,
            objectId : id,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            translate: false,
        	width : 500,
			height : 400,
			border : false,
			items : viewwiget
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        var view = button.up('tablasportaliasgridview');
        var store = view.getStore();
        store.clearFilter();
        //store.filter(view.filters);
        view.down('#query').setValue('');
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('tablasportaliasgridview');
        
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
        var controller = this;
            
        var view = button.up('tablasportaliasgridview');
        var selection = view.getSelectionModel().getSelection();
        
        // 04-01 JUAN : Cambio la URL del Proxy, porque llamaba al Search y daba error de 404 Endpoint not found. Habria que dejarlo mas limpio. 
        view.getStore().getProxy().url = '/Rest/t_port_alias'
        
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                rec.destroy({callback: function(record, operation){
    				if (operation.success)
					{
						notify('Se eliminio exitosamente');
						view.getStore().getProxy().url = '/Rest/Search/t_port_alias'
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
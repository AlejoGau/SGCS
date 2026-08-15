Ext.define('AdministratorSearch.controller.TablasIpConGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasIpConModel', 'TablasIpConSearchModel' ],
    views : [ 'TablasIPRSConexionPanelView', 'TablasIpConGridView', 'TablaIpconPanelView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'tablasipconexgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
			},
            'tablasipconexgridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablasipconexgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablasipconexgridview button[action=add]': {
                click: this.onAdd
            },
            'tablasipconexgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			},
            'tablasipcongridview' : {
    			afterrender : this.initPanelView,
			},
            'tablasipconexgridview migrateIprs' : {
    			click : this.onMigrateIprsClick
			}
		});
	},

    initPanelView: function () {
    
    },

	initView : function(view) {
        view.filters = [];
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasIpConSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters,
            listeners:{
                beforeload: function(store){
                    store.getProxy().setExtraParam("onlyConnIP", 1);
                }
            }
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
        var view = grid.up('tablasipcongridview');
        var panel = view;
        var title = 'Nueva Conexion Ip';

        record = this.getTablasIpConModelModel();

        var myobject = record.create({
            'ipc_nport':8023,
            'ipc_nestado':1,
            'ipc_nprotocolo':1,
            'ipc_imodemsms':null,
            'ipc_crespondeack':0,
            'ipc_itiempoinactividad':0,
            'ipc_cresetxhb':0
        });            

        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
            var newTab = Ext.widget('tablasipconformview', {
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
        var view = grid.up('tablasipcongridview');
        var panel = view;
        var title = record.get('ipc_cdescripcion');

        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
    	if (!mytab) {
            var newTab = Ext.widget('tablasipconformview', {
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
        var view = button.up('tablasipconexgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('tablasipconexgridview');
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

    onMigrateIprsClick: function(button, event, options) {
        var view = button.up('tablasipconexgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            console.log(selection);
        }		
	},
    
    onDeleteClick : function(button, event, options) {
        var view = button.up('tablasipconexgridview');
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
                }});
            },this);
        }		
	}
});
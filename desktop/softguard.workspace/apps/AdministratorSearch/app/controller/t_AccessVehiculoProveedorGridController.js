Ext.define('AdministratorSearch.controller.t_AccessVehiculoProveedorGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_AccessVehiculoProveedorSearchModel', 't_AccessVehiculoProveedorModel' ],
    views : [ 't_AccessVehiculoProveedorGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	't_accessvehiculoproveedorgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                refresh: this.refresh
               
			},
            't_accessvehiculoproveedorgridview button[action=search]': {
                click: this.onSearchClick
            },
            't_accessvehiculoproveedorgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            't_accessvehiculoproveedorgridview button[action=add]': {
                click: this.onAdd
            },
            't_accessvehiculoproveedorgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getT_AccessVehiculoProveedorSearchModelModel(),
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

    refresh: function (view) {
        view.getStore().load()
    },    
    
    onAdd: function(grid,record,item,index,e,options){
        
        var view = grid.up('t_accessvehiculoproveedorgridview'); 
        record = this.getT_AccessVehiculoProveedorModelModel();
        var myobject =  record.create({
                
			});           
        myobject.setId(0);

        var viewWidget = Ext.widget('t_accesosvehiculoproveedorformview', {
            caller: view,
            record: myobject,
        });

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            //layout: 'fit',
            title: 'Vehículo',
            with: 600,
            height: 650,   
            resizable: false,         
            //width: 450,
            border: true,
            items: viewWidget
        });
        win.show();
        
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var view = grid.up('t_accessvehiculoproveedorgridview') ? grid.up('t_accessvehiculoproveedorgridview') : grid;
        var panel = view.targetTab ? view.targetTab : Ext.getCmp('center');
        var vProvModel = this.getT_AccessVehiculoProveedorModelModel();
        var titleV = record.get('Brand')+' - '+record.get('Model');
        console.log("onItemClick record",record)
        vProvModel.load(record.get('Id'),{
            success: function(record){
                var tabUser = Ext.widget('t_accesosvehiculoproveedorformview', {
                    caller: view,
                    //closable: true,
                    title:titleV,
                    //iconCls:'icon-email-edit',
                    record: record,
                });
        
                var win = Ext.create('Ext.Window', {
                    iconCls: 'icon-table-add',
                    layout: 'fit',
                    title: titleV,
                    translate: false,
                    width: 800,
                    height: 650,
                    border: false,
                    modal: true,
                    items: tabUser            
                });
                win.show();
            }
        });


        var title = getLocale('Ficha') + ': ' + record.get('apr_cNombre');
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('t_accessvehiculoproveedorgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#brand').setValue('');
        view.down('#model').setValue('');
        store.load();
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('t_accessvehiculoproveedorgridview');
        var store = view.getStore();
        var filters = Ext.clone(view.filters);
        store.clearFilter(true);

        if (view.down('#brand').getValue()) {
            filters.push({
                property: 'vb.[NAME]:LIKE',
                value: view.down('#brand').getValue()
            });

        }
        if (view.down('#model').getValue()) {
            filters.push({
                property: 'vm.[NAME]:LIKE',
                value: view.down('#model').getValue()
            });

        }



        view.down('#brand').setValue('')
        view.down('#model').setValue('')
        store.filter(filters);
        store.load();
        
       
    },

    
    onDeleteClick : function(button, event, options) {
            
        var view = button.up('tablasaccesstipodocumentogridview');
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
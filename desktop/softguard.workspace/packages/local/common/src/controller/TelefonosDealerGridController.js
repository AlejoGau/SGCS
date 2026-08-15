//MIGRADO2024
Ext.define('Common.controller.TelefonosDealerGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasLineasModel', 'TablasLineasSearchModel', 'TelefonosDealerModel' ],
    views : [ 'TelefonosDealerGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'telefonodealergridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                deleteItem: this.onDeleteItem,
                save: this.onSave
			},
            'telefonodealergridview button[action=search]': {
                click: this.onSearchClick
            },
            'telefonodealergridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'telefonodealergridview button[action=add]': {
                click: this.onAdd
            },
            'telefonodealergridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
		});
	},
	initView : function(view) {
        var model = this.getTelefonosDealerModelModel()
        var storeTelefonos =Ext.create('Ext.data.Store',{
            model: this.getTablasLineasSearchModelModel()          
        })
        
        view.bindStore(storeTelefonos)
        var storeLinea =Ext.create('Ext.data.Store',{
            model: this.getTablasLineasSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property:'lin_ccodigo',
                value: view.record.get('lin_ccodigo') 
            }]
        })
        
        storeLinea.load({callback:function(records) {
            var record = records[0]
            view.telefonos = []
            if(record.get('lin_cMetaData') != ''){
                view.metadata = Ext.JSON.decode(record.get('lin_cMetaData'));
                if(view.metadata && view.metadata.telefonos) {
                    view.telefonos = view.metadata.telefonos;
                    
                    Ext.Array.each(view.telefonos,function (v,k) {
                        //agrego al store de la grilla
                        storeTelefonos.add(model.create(v))
                    })
                }
            }
        }});
        
        if(view.readOnly) {
            view.down('toolbar').hide()
            view.down("actioncolumn").setVisible(false)
        } 
	},
    
    objectChanged: function (view) {    
        view.down('pagingtoolbar').doRefresh();        
    },
    onAdd: function(grid,record,item,index,e,options){
        var view = grid.up('telefonodealergridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo teléfono';
        model = this.getTelefonosDealerModelModel();
    	var myobject = model.create({
           
		});    
        myobject.set('Id',0);     
   
        var view = Ext.widget('telefonodealerformview',{
            caller: view,
            record: myobject,
            recordLinea: record
        });
                
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
        	width : 450,
			height : 200,
			border : false,
			items : view
		});
		win.show();
    },   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('telefonodealergridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('telefono')+') '+getLocale('Teléfono');
        var view = Ext.widget('telefonodealerformview',{
            caller: view,
            record: record,
            objectId : id,
            viewLinea: view.record
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            translate: false,
            title : title,
    		width : 450,
			height : 200,
			border : false,
			items : view
		});
		win.show();
    },  
    
    onDeleteItem: function (record,view) {
        var controller = this;
        view.telefonosUpdated = [];
        Ext.Array.each(view.telefonos, function (v,k) {
            if(v.telefono == record.get('telefono') && v.nombre == record.get('nombre')) {
               
            } else {
                view.telefonosUpdated.push(v)
            }       
        })
        var meta = view.metadata
        meta.telefonos = view.telefonosUpdated;
        view.telefono = view.telefonosUpdated;

        var model = this.getTablasLineasModelModel();
        model.load(view.record.get('Id'), {
            callback: function(rec, operation) {
                if (operation.success) {
                    rec.set('lin_cMetaData', Ext.JSON.encode(meta));
                    rec.save({callback:function (){
                        controller.initView(view)
                    }});
                }   
            }
        });

    },
    
    onSave: function (record,oldRecord,view){
        var controller = this;
        var updated = false;
        view.telefonosUpdated = [];
        Ext.Array.each(view.telefonos, function (v,k) {
            if(v.telefono == oldRecord.telefono && v.nombre == oldRecord.nombre) {
               
                updated = true;
                view.telefonosUpdated.push(record.data)
            } else {
                view.telefonosUpdated.push(v)
            }       
        })
        if(updated == false) {
            view.telefonosUpdated.push(record.data)
        }
        
        console.log(view.record)
        
        var meta = view.metadata
        if(!meta || meta == '') {
            meta = {};
        }
        meta.telefonos = view.telefonosUpdated;
        view.telefono = view.telefonosUpdated;
        
        var model = this.getTablasLineasModelModel();
        model.load(view.record.get('Id'), {
            callback: function(rec, operation) {
                if (operation.success) {
                    rec.set('lin_cMetaData', Ext.JSON.encode(meta));
                    rec.save({callback:function (){
                        controller.initView(view)
                    }});
                }   
            }
        });

        
    },
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    onGetAllClick: function(button, event, options) {    
        var view = button.up('telefonodealergridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('telefonodealergridview');
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
        var view = button.up('telefonodealergridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                rec.destroy({callback: function(record, operation){
                    if (operation.success)
                    {
                        notify('Se eliminó exitosamente');
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
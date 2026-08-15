//MIGRADO2024
Ext.define('Common.controller.TablasInstaladoresGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasInstaladoresModel', 'TablasInstaladoresSearchModel', 'InstaladoresByTokenSearchModel' ],
    views : [ 'TablasInstaladoresGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'tablasinstaladoresgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                selectionchange: this.onSelectionChange
               
			},
            'tablasinstaladoresgridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablasinstaladoresgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablasinstaladoresgridview button[action=add]': {
                click: this.onAdd
            },
            'tablasinstaladoresgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			},
            /*'tablasinstaladoresgridview button[action="searchtecnicos"]' : {
        		click : this.onSearchTecnicosClick
			},
            'tablasinstaladoresgridview button[action="searchinstaladores"]' : {
            	click : this.onSearchInstaladoresClick
			}*/
            
            
            
		});
	},
    
    
  /*  onSearchTecnicosClick: function (button, event, options) {
        var view = button.up('tablasinstaladoresgridview');
        var store = view.getStore();
        store.clearFilter();
        
        var filters = {
            property: 'ins_iTipo',
            value: 1
            
        }
        store.filter(filters);
        
    },
    onSearchInstaladoresClick: function (button, event, options) {
        var view = button.up('tablasinstaladoresgridview');
        var store = view.getStore();
        store.clearFilter();
        
        var filters = {
            property: 'ins_iTipo',
            value: 0
            
        }
        store.filter(filters);
    },*/
	initView : function(view) {
        view.filters = view.filters?view.filters:[];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasInstaladoresSearchModelModel(),
            pageSize: 100,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        //view.store.load();
        
        
        if(view.readOnly) {
            view.down('#delete').hide()
            view.down('#add').hide()
            view.down('[xtype=actioncolumn]').hide()
            
            
        }
        
        if(view.hideTipoFilter) {
            view.down('#tecnicoscheck').hide()
            view.down('#instaldorescheck').hide()
            view.down('#tecnicosinstaldorescheck').hide()
            view.down('#deshabilitadoscheck').hide()
        }
        
        if(view.soloInstaladores) {
            view.down('#tecnicoscheck').setValue(false)
            view.down('#instaldorescheck').setValue(true)
            view.down('#tecnicosinstaldorescheck').setValue(true)
            view.down('#deshabilitadoscheck').setValue(false)
        }
        
        if(view.checkSoloInstaladores) {
            view.down('#tecnicoscheck').hide()            
            view.down('#deshabilitadoscheck').hide()
        }
        
        this.onSearchClick(view)
        
	},
    
    objectChanged: function (view) {    
        view.down('pagingtoolbar').doRefresh();        
    },
    
  
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('tablasinstaladoresgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo Instalador';
        
        
        // Crear un nuevo record completamente limpio sin reutilizar instancias previas
        var myobject = Ext.create('Common.model.TablasInstaladoresModel', {
            Id: 0
        });

        // Forzar que sea phantom y limpio
        myobject.phantom = true;
        myobject.dirty = false;

        console.log('DEBUG - Creando nuevo record para formulario:', myobject.data);            
			
        var viewwin = Ext.widget('tablasinstaladoresformview',{
            caller: view,
            record: myobject,
            objectId : id,
            createDealer: view.createDealer?view.createDealer:null
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            width : 450,
            height : 400,
            border : false,
            items : viewwin
        });
        win.show();
                    
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
        
        
        
         var id = record.get('Id');
        var view = grid.up('tablasinstaladoresgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('ins_cnombre');
        
        
        if(view.readOnly) {
            return false;
        }
         var view = Ext.widget('tablasinstaladoresformview',{
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
			height : 510,
			border : false,
			items : view
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('tablasinstaladoresgridview')?button.up('tablasinstaladoresgridview'):button;
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        
        view.down('#query').setValue('');
        
        if(view.soloInstaladores) {
            view.down('#tecnicoscheck').setValue(false)
            view.down('#instaldorescheck').setValue(true)
            view.down('#tecnicosinstaldorescheck').setValue(true)
            view.down('#deshabilitadoscheck').setValue(false)
            this.onSearchClick(button)
        } else {
            view.down('#tecnicoscheck').setValue(true);
            view.down('#instaldorescheck').setValue(true);
            store.load()
        }
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('tablasinstaladoresgridview')?button.up('tablasinstaladoresgridview'):button;
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        
        var tecnicoscheck = view.down('#tecnicoscheck').getValue();
        var instaldorescheck = view.down('#instaldorescheck').getValue();
        var tecnicosinstaldorescheck = view.down('#tecnicosinstaldorescheck').getValue();
        var deshabilitadoscheck = view.down('#deshabilitadoscheck').getValue();
        
        //var dealer = view.down('#dealer').getValue();
        
        var filters = Ext.clone(view.filters);
        
        
        if (fieldName != '' && fieldName != null){
            filters.push({ 
                property: fieldName+':LIKE',
                value: query
            });
            
        }
        
     
        
        
        
        var tipos = []
        
        if (tecnicoscheck != ''){            
             tipos.push('1')            
        }
        
        if (instaldorescheck != ''){            
             tipos.push('0')            
        } 
        
        if (tecnicosinstaldorescheck != ''){            
             tipos.push('2')            
        } 
        
        if (deshabilitadoscheck != ''){            
             tipos.push('3')            
        } 
        
        if(tipos != '') {
            filters.push({
                property: 'ins_iTipo:ININT',
                id: 'ins_iTipo',
                value: tipos.join(',')
            });
        }
        store.clearFilter(true);
        if (filters.length>0){
            store.filter(filters);
        }
        
       
    },
    
    onDeleteClick : function(button, event, options) {
            
        var view = button.up('tablasinstaladoresgridview');
        var selection = view.getSelectionModel().getSelection();
        var t = this;
        if (selection.length > 0) {
            var modelMonitoreo = this.getTablasInstaladoresModelModel();
            modelMonitoreo.load(selection[0].get('Id'),{
                callback:function (record, operation) {
                    record.erase({
                        callback: function(record, operation){
                            if (operation.success){
                                notify('Se eliminio exitosamente');
                                view.store.load();
                            }else{
                                notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');     
                            }
                        }
                    });
                }
            });
        }
        /*if (selection) {
            
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                
                rec.setConfig({
                    proxy: t.getTablasInstaladoresModelModel().getProxy()
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
            
            
            
        }*/
        		
	},
    onSelectionChange:function (model, selected, eOpts) {
           model.view.up('tablasinstaladoresgridview').down('[action="delete"]').setDisabled(selected.length == 0);
    }    
});
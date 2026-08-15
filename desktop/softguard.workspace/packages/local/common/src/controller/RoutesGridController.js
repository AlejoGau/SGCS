//MIGRADO2024
Ext.define('Common.controller.RoutesGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'RoutesModel', 'RoutesSearchModel' ],
    views : [ 'RoutesGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'routesgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                openpoints: this.openPoints,
                selectionchange : this.onSelectionChange,
                viewagenda: this.onViewAgenda
			},
            'routesgridview button[action=search]': {
                click: this.onSearchClick
            },
            'routesgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'routesgridview button[action=add]': {
                click: this.onAdd
            },
            'routesgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			},
            'routesgridview button[action="rebuild"]' : {
        		click : this.onRebuildClick
			}
		});
	},
	initView : function(view) {
        view.myPanel = view.up('tabpanel');  
        view.cuentaId  = view.record.get('cue_iid')?view.record.get('cue_iid'):view.record.get('CuentaId');
        view.filters = [
            {
                property: 'cuentaId',
                value: view.cuentaId
            }
        ];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getRoutesSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
        
        if(view.precentHeader) {
            toolbar.hide();
        }
        
        if (view.module){
            view.profile = view.module.profile?view.module.profile:view.module.get('profile');
            if (view.profile < 2){
                view.down('#add').hide();
                view.down('#delete').hide();
                view.down('#rebuild').hide();
            }
        }
	},
    
    objectChanged: function (view) {    
        view.down('pagingtoolbar').doRefresh();        
    },
    openPoints: function (view) {    
        var viewform = Ext.widget('routespointsformview',{
            caller: view,
            objectId : view.cuentaId,
        });
            
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : 'CheckPoint',
        	width : 700,
			height : 600,
			border : false,
			items : viewform
		});
		win.show();
    },
    
    onAdd: function(grid,record,item,index,e,options){
        var id = 0;
        var view = grid.up('routesgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva ruta';
        var mytab = view.myPanel.down('[title='+title+']');
        
        if (!mytab) {
            record = this.getRoutesModelModel();
        	var myobject = record.create({
                    'cuentaId': view.cuentaId
			});            
  
             var newTab = Ext.widget('routesformview',{
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
    },    
    onSelectionChange: function(selectionModel, records, options){
        var view = selectionModel.view.up('routesgridview');
        if(view.eventFireOnSelect) {
            view.caller.fireEvent(view.eventFireOnSelect, records, view.caller)
        }
    },
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('routesgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = sanitizarTitulo(record.get('Name'));
        var mytab = view.myPanel.down('[title='+title+']');
        
        var readOnly = false;
        if (view.profile < 2){
            /*notify('No tiene permisos para editar.')
            return false;*/
            var readOnly = true;
        }
        if(view.eventFireOnSelect) {
           // view.caller.fireEvent(view.eventFireOnSelect, record)
        } else {
            if (!mytab) {
                var newTab = Ext.widget('routesformview',{
                    caller: view,
                    record: record,
                    translate: false,
                    objectId : id,
                    title: title,
        		    closable: true,
                    readOnly:readOnly
                });
    
    			// agrego la paleta creada
    			view.myPanel.add(newTab);
    			view.myPanel.setActiveTab(newTab);
        	}
        }
    },    
    onViewAgenda: function(record,grid){
        var id = record.get('Id');
        var view = grid.up('routesgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = sanitizarTitulo('Agenda '+record.get('Name'));
        var mytab = view.myPanel.down('[title='+title+']');
        
        var readOnly = false;
        if (view.profile < 2){
            /*notify('No tiene permisos para editar.')
            return false;*/
            var readOnly = true;
        }
        if(view.eventFireOnSelect) {
           // view.caller.fireEvent(view.eventFireOnSelect, record)
        } else {
            if (!mytab) {
                var newTab = Ext.widget('routesagendaformview',{
                    caller: view,
                    record: record,
                    translate: false,
                    objectId : id,
                    title: title,
        		    closable: true,
                    readOnly:readOnly
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
        var view = button.up('routesgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('routesgridview');
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
        var view = button.up('routesgridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                var model = controller.getRoutesModelModel();        
                rec.setConfig({
                    proxy: model.getProxy()
                });                rec.destroy({callback: function(record, operation){
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
	},
    
    onRebuildClick : function(button, event, options) {    
        var view = button.up('routesgridview');
        
        Ext.Ajax.request({
            url : '/rest/search/SchedulercreateVCRoutes',
            success: function(response){
                var text = response.responseText;
                var object = Ext.JSON.decode(text);
                
                if (object.success){
                    notify('Se regeneraron las rutas con éxito.')
                }
            }
        });  	
	}
});
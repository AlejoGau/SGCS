//MIGRADO2024
Ext.define('Common.controller.RoutesProgramGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'RoutesProgramModel', 'RoutesProgramSearchModel' ],
    views : [ 'RoutesProgramGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'routesprogramgridview' : {
    			afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,                
                objectdelete: this.objectDelete
			},
            'routesprogramgridview button[action=search]': {
                click: this.onSearchClick
            },
            'routesprogramgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'routesprogramgridview button[action=add]': {
                click: this.onAdd
            },
            'routesprogramgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
		});
	},
	initView : function(view) {  
       // view.cuentaId  = view.record.get('cue_iid');
        view.store =Ext.create('Ext.data.Store',{
            model: this.getRoutesProgramSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            sorters : [{
                property:'dayofmonth',
                direction:'ASC'
            },{
                property:'dayofweek',
                direction:'ASC'
            },{
                property:'starthour',
                direction:'ASC'
            },{
                property:'startminutes',
                direction:'ASC'
            }]
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        if (view.record.get('Id')!=0){
            view.setRecord(view.record);
        }
        
        if(view.readOnly) {
            view.down('#actionColumn').hide()
        }
	},
    
    
     objectChanged: function (view) {    
        view.down('pagingtoolbar').doRefresh();        
    },
    
    objectDelete: function (rec,view) {    
        var model = this.getRoutesProgramModelModel();        
        rec.setConfig({
            proxy: model.getProxy()
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
        }})
    },
    
    onAdd: function(grid,record,item,index,e,options){
        var id = 0;
        var view = grid.up('routesprogramgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo programa';
        
         record = this.getRoutesProgramModelModel();
            var myobject = record.create({
                    'routeId': view.record.get('Id')
			});            
                    
            var viewform = Ext.widget('routesprogramformview',{
                caller: view,
                record: myobject,
                objectId : id,
                cuentaId: view.record.get('cuentaId')
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
        		width : 450,
    			height : 450,
    			border : false,
    			items : viewform
    		});
    		win.show();
    },    
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('routesprogramgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('Id')+') Programa';
        
        if(view.readOnly) {
            return false;
        }
        var viewForm = Ext.widget('routesprogramformview',{
            caller: view,
            record: record,
            objectId : id,
            cuentaId: view.record.get('cuentaId'),
            edit:true
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
    		width : 370,
            height : 200,
			border : false,
			items : viewForm
		});
		win.show();
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view);
    },
    onGetAllClick: function(button, event, options) {    
        var view = button.up('routesprogramgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('routesprogramgridview');
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
        var view = button.up('routesprogramgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                rec.destroy({callback: function(record, operation){
                    if (operation.success)
                    {
                        notify('Se eliminio exitosamente');
                        Ext.Ajax.request({
                            url : '/rest/search/SchedulercreateVCRoutes?days=0',
                            success: function(response){
                                var text = response.responseText;
                                var object = Ext.JSON.decode(text);
                                
                                if (object.success){
                                    notify('Se regeneraron las rutas con éxito.')
                                }
                            }
                        });
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
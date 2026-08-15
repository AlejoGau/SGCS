Ext.define('AdministratorSearch.controller.TablasEscalaPrioriOrganizacionGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_escalamientoprioridadesorganizacionModel', 't_escalamientoprioridadesorganizacionSearchModel' ],
    views : [ 'TablasEscalaPrioriOrganizacionGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'tablasescalarprioridadesorganizaciongridview' : {
    			afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
			},
            'tablasescalarprioridadesorganizaciongridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablasescalarprioridadesorganizaciongridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablasescalarprioridadesorganizaciongridview button[action=add]': {
                click: this.onAdd
            },
            'tablasescalarprioridadesorganizaciongridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getT_escalamientoprioridadesorganizacionSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters,
            sorters: [
                {
                    property : 'teo_iid',
                    direction: 'ASC'
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
        var view = grid.up('tablasescalarprioridadesorganizaciongridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva Escalamiento prioridades organizacion';

        record = this.getT_escalamientoprioridadesorganizacionModelModel();
        var myobject = record.create({
            'teo_itiempo': 3
        });            

        var view = Ext.widget('tablasescalamientoprioridadesorganizacionesformview',{
            caller: view,
            record: myobject,
            objectId : id,
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
        var view = grid.up('tablasescalarprioridadesorganizaciongridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = getLocale('Escalamiento prioridades organizacion');
        
        var model = this.getT_escalamientoprioridadesorganizacionModelModel().load(id, {callback:function (recordx,operation) {
            if(operation.success) {
                var viewwin = Ext.widget('tablasescalamientoprioridadesorganizacionesformview',{
                    caller: view,
                    record: recordx,
                    objectId : id,
                });
                
                var win = Ext.create('Ext.Window', {
                    iconCls: 'icon-table-add',
                    layout : 'fit',
                    title : title,
            		width : 450,
        			height : 200,
        			border : false,
        			items : viewwin
        		});
        		win.show();
            }
        }}) 
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        var view = button.up('tablasescalarprioridadesorganizaciongridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('tablasescalarprioridadesorganizaciongridview');      
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
        var view = button.up('tablasescalarprioridadesorganizaciongridview');
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
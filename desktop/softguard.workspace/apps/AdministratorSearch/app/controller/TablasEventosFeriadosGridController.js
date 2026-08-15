Ext.define('AdministratorSearch.controller.TablasEventosFeriadosGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasEventosFeriadosModel', 'TablasEventosFeriadosSearchModel' ],
    views : [ 'TablasEventosFeriadosGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'tablaseventosferiadosgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged 
			},
            'tablaseventosferiadosgridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablaseventosferiadosgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablaseventosferiadosgridview button[action=add]': {
                click: this.onAdd
            },
            'tablaseventosferiadosgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasEventosFeriadosSearchModelModel(),
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
        var view = grid.up('tablaseventosferiadosgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo Evento feriados';

        record = this.getTablasEventosFeriadosModelModel();

        var myobject = record.create({
            'eve_ccodigo' : 0
        });            

        var viewForm = Ext.widget('tablaseventosferiadosformview',{
            caller: view,
            record: myobject,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            width : 450,
            height : 300,
            border : false,
            items : viewForm
        });
        win.show();
    },    

    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('tablaseventosferiadosgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('eve_cdescripcion');
        var view = Ext.widget('tablaseventosferiadosformview',{
            caller: grid,
            record: record,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
			title : title,
            translate: false,
			width : 450,
			height : 300,
			border : false,
			items : view
		});
		win.show();
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },

    onGetAllClick: function(button, event, options) {    
        var view = button.up('tablaseventosferiadosgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('tablaseventosferiadosgridview');
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        var filters = Ext.clone(view.filters);

        if (fieldName != ''){
            filters.push({ 
                property: fieldName,
                value: query
            });
        }
        
        if (filters.length>0){
            store.filter(filters);
        }
        
        store.clearFilter();
    },
    
    onDeleteClick : function(button, event, options) {
        var view = button.up('tablaseventosferiadosgridview');
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
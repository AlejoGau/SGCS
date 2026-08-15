Ext.define('AdministratorSearch.controller.t_comprobantes_fcGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_comprobantes_fcSearchModel', 't_comprobantes_fcModel' ],
    views : [ 't_comprobantes_fcGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            't_comprobantes_fcgridview' : {
        		afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
			},
            't_comprobantes_fcgridview button[action=search]': {
                click: this.onSearchClick
            },
            't_comprobantes_fcgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            't_comprobantes_fcgridview button[action=add]': {
                click: this.onAdd
            },
            't_comprobantes_fcgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getT_comprobantes_fcSearchModelModel(),
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
        var view = grid.up('t_comprobantes_fcgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo tipo comprobante';

        record = this.getT_comprobantes_fcModelModel();

        var myobject = record.create({
            cbt_ntipo:1,
            cbt_ncopias: 1,
            cbt_inumero: 0,
            cbt_cprefijo: '0000',
            cbt_ccodigo: '000',
            cbt_nCbteCAE:'0',
            cbt_casociado: '000',
            cbt_idOrganizacionFacturadora: ''
        });            

        var viewWidget = Ext.widget('t_comprobantes_fcformview',{
            caller: view,
            record: myobject
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            width : 450,
            height : 300,
            border : false,
            items : viewWidget
        });
        win.show();
    },    

    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('t_comprobantes_fcgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = ''+record.get('cbt_cdescripcion')+'';

        this.getT_comprobantes_fcModelModel().load(record.get('Id'), {callback:function (record) {
            var viewform = Ext.widget('t_comprobantes_fcformview',{
                caller: view,
                record: record
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
            	width : 450,
    			height : 300,
                translate: false,
    			border : false,
    			items : viewform
    		});
    		win.show();
        }})
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },

    onGetAllClick: function(button, event, options) {    
        var view = button.up('t_comprobantes_fcgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('t_comprobantes_fcgridview');
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
        store.clearFilter(true)
        if (filters.length>0){
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
    },
    
    onDeleteClick : function(button, event, options) {
            
        var view = button.up('t_comprobantes_fcgridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if (selection) {
            Ext.MessageBox.confirm('Confirmar', 'Está seguro que desea borrar?', function(btn){
        		if (btn=="yes"){
                    view.store.remove(selection);
                    var delRec = view.store.getRemovedRecords();
                    Ext.Array.each(delRec, function (rec) {
                        var model = controller.getT_comprobantes_fcModelModel();

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
                        }
                    });
                    },this);
        		}
            })            
        }		
	}
});
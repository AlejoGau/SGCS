Ext.define('AdministratorSearch.controller.MoneyGuardOrganizacionGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_organizacion_fcModel', 't_organizacion_fcSearchModel' ],
    views : [ 'MoneyGuardOrganizacionGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'moneyguardorganizaciongridview' : {
                afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged : this.onEventChanged
               
    		},
            'moneyguardorganizaciongridview button[action=search]': {
                click: this.onSearchClick
            },
            'moneyguardorganizaciongridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'moneyguardorganizaciongridview button[action=add]': {
                click: this.onAdd
            },
            'moneyguardorganizaciongridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},
    
    onEventChanged: function(view){
        view.store.load();
    },

	initView : function(view) {
        if(view.readOnly) {
            view.down('toolbar').hide()
        }

        view.filters = [];
        
        if(view.record) {
            view.filters.push({
                property:'stc_referencia',
                value: view.record.get('Id')
            })
            view.filters.push({
                property:'stc_comprobante',
                value: 'SERTEC'
            })
        }

        view.store =Ext.create('Ext.data.Store',{
            model: this.getT_organizacion_fcSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters:view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
	},

    onAdd: function(grid,record,item,index,e,options){
        var id = 0;
        var view = grid.up('moneyguardorganizaciongridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva Organizacion';

        record = this.getT_organizacion_fcModelModel();

        var myobject = record.create({
            org_cinicioactividades: Ext.Date.format(new Date(), 'Y-m-d')
        });            
            
		 var view = Ext.widget('moneyguardorganizacionformview',{
            caller: view,
            record: myobject,
            objectId : id,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            width : 450,
            height : 500,
            border : false,
            items : view
        });
        win.show();
    },    

    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('moneyguardorganizaciongridview');
        
        if(view.readOnly) {
            return false;
        }

        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Organización facturación';

        var view = Ext.widget('moneyguardorganizacionformview',{
            caller: view,
            record: record,
            objectId : id,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            width : 600,
			height : 600,
			border : false,
			items : view
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },

    onGetAllClick: function(button, event, options) {    
        var view = button.up('moneyguardorganizaciongridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('moneyguardorganizaciongridview');
        var store = view.getStore();
        var nombre = view.down('#nombre').getValue()
        
        store.clearFilter(true);
        
        var filters = Ext.clone(view.filters);
        
        if (nombre){
            filters.push({ 
                property: 'org_cnombre:LIKE',
                value: nombre
            });
        }
        store.filter(filters);
    },
    
    onDeleteClick : function(button, event, options) {
        var controller = this;
        var view = button.up('moneyguardorganizaciongridview');
        var selection = view.getSelectionModel().getSelection()[0];
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.MessageBox.confirm('Confirmar', 'Está seguro que desea borrar?', function(btn){
    			if (btn=="yes"){
					Ext.Array.each(delRec, function (rec) {
                        rec.setConfig({
                            proxy: controller.getT_organizacion_fcModelModel().getProxy()
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
                        }
                    });
                    
                    },this);
                    view.store.load();
				}
			});
        }	
	}
});
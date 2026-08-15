Ext.define('Common.controller.mg_listas_preciosGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'mg_listas_preciosModel', 'mg_listas_preciosSearchModel' ],
    views : [ 'mg_listas_preciosGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'mg_listas_preciosgridview' : {
				afterrender : this.initView,
                loaddetalle: this.onLoadDetalle,
                refresh: this.onRefresh,
                delete: this.onDelete,
                itemdblclick: this.onItemClick
			},
            
            'mg_listas_preciosgridview #todaslistas' : {
            	click: this.onTodasListaClick
			},
            'mg_listas_preciosgridview button[action="new"]' : {
                click: this.onNewListaPrecioClick
            },
            'mg_listas_preciosgridview button[action=search]': {
                click: this.onSearchClick
            },
            'mg_listas_preciosgridview button[action=getall]': {
                click: this.onGetAllClick
            }
		});
	},
    
    onGetAllClick: function(button, event, options) {    
        var view = button.up('mg_listas_preciosgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },

    onSearchClick: function(button, event, options) {  
        var view = button.up('mg_listas_preciosgridview');
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
    
    onDelete: function(record,view){
        var controller = this;
        Ext.Msg.confirm('Borrar lista de precios', 'Esta a punto de eliminar un lista de precios y todos los precios relacionados. Quiere continuar ?', function (id, value) { 
            if (id === 'yes') { 
                var store = record.store

                record.setConfig({
                    proxy: controller.getMg_listas_preciosModelModel().getProxy()
                });
                
                //este remove es por un bug que tiene sencha al moento de guardar por el strip
                //https://www.sencha.com/forum/showthread.php?268135-Grid-error-on-delete-selected-row/page2
                store.remove(record, true);
                record.destroy({callback:function () {
                    notify('Se elimino la lista.')
                    store.load()
                }})
            } 
        }, this); 

    },
    
    onRefresh: function (view) {
        view.listaPreciosStore.load()
    },

    onTodasListaClick: function (btn) {
        var view = btn.up('mg_listas_preciosgridview')
        var filters = Ext.clone(view.filters);
        //Se quito ALL al final de mglpd_idproducto
        filters.push({
            property:'mglpd_idproducto',
            value: view.record.get('Id')
        })
        
        view.listaPreciosStore.clearFilter(true)       
        view.listaPreciosStore.filter(filters)
    },

    onLoadDetalle:function (rec,view) {
        var panel = view.up('tabpanel');
        var title = 'Detalle de lista '+ rec.get('mglp_nombre');
        var mytab = panel.down('[title="' + title + '"]');

        if (!mytab) {
            var newTab = Ext.widget('mg_listas_precios_detallesgridview', {
                iconCls: 'icon-table-add',
            	title : title,
                record: rec,
                translate: false,
                targetTab: panel,
                closable : true,
                closeAction: 'destroy',
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

	initView : function(view) {
        view.filters = []

    	view.listaPreciosStore = Ext.create('Ext.data.Store', {
            model : this.getMg_listas_preciosSearchModelModel(),
            remoteFilter: true,
            remoteSort: true,
            filters: view.filters,
            sorters: [{
                property:'mglp_tipo',
                direction:'ASC'
            },{
                property:'mglp_nombre',
                direction:'ASC'
            }],
        	autoload: false
        });

        view.bindStore(view.listaPreciosStore);
        view.listaPreciosStore.load();
	},

    onNewListaPrecioClick: function(button, event, options) {        
        var view = button.up('mg_listas_preciosgridview')
        var model = this.getMg_listas_preciosModelModel();
        
        var record = model.create({
            Id: 0,
            mglp_nombre: '',
            mglp_tipo: 1,
            mglp_multiplicador: 0,
            mglp_idorganizacion: _UserData.Company,
            mglp_currency:''
        })

        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : 'Nueva lista',
            width : 500,
            height : 300,
            border : false,
            items : [{
                xtype:'mg_listas_preciosformview',
                record:record,
                caller: view
            }]
        });
        win.show();
    }, 

    onItemClick: function(grid,record,item,index,e,options){
        var view = grid.up('mg_listas_preciosgridview')
        var model = this.getMg_listas_preciosModelModel();
        record.setConfig({
            proxy: model.getProxy()
        });
        var title = 'Lista '+ record.get('mglp_nombre')
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            width : 500,
            height : 300,
            border : false,
            items : [{
                xtype:'mg_listas_preciosformview',
                record:record,
                caller: view,
            }]
        });
        win.show();
    }    
});
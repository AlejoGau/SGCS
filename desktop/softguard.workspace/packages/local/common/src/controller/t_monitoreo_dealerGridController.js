//MIGRADO2024
Ext.define('Common.controller.t_monitoreo_dealerGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_monitoreo_dealerModel', 't_monitoreo_dealerSearchModel', 'OrganizationSearchModel' ],
    views : [ 't_monitoreo_dealerGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            't_monitoreo_dealergridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                selectionchange: this.onSelectionChange
			},
            't_monitoreo_dealergridview button[action=search]': {
                click: this.onSearchClick
            },
            't_monitoreo_dealergridview button[action=getall]': {
                click: this.onGetAllClick
            },
            't_monitoreo_dealergridview button[action=add]': {
                click: this.onAdd
            },
            't_monitoreo_dealergridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
		});
	},
	initView : function(view) {
        view.filters = [{
            property:'tmd_clinea',
            value:view.record.get('lin_ccodigo')
        }];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getT_monitoreo_dealerSearchModelModel(),
            pageSize: 50,
            remoteSort: false,
            remoteGroup: false,
            remoteFilter: true,
            filters: view.filters,
            sorters: [{
                property:'org.Name',
                direction: 'DESC'
            },{
                property:'tmd_diasemana',
                direction: 'ASC'
            }]
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
                
        view.store.load();
        view.groupingFeature = view.getView().getFeature('groupingOrg');
        view.store.sorters.clear();
        //view.store.groupers.clear();
        view.store.group('organizacion','ASC');
        view.groupingFeature.enable();
        view.groupingFeature.pruneGroupedHeader();
        view.groupingFeature.unblock();
        //view.groupingFeature.refreshIf();
	},
    
    objectChanged: function (view) {    
        view.down('pagingtoolbar').doRefresh();        
    },
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('t_monitoreo_dealergridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo monitoreo';
        
        /*
        record = this.getT_monitoreo_dealerModelModel();
        var myobject = record.create({
            tmd_clinea: view.record.get('lin_ccodigo')
        });            
	    */
         
        var view = Ext.widget('t_monitoreo_dealerformextendedview',{
            caller: view,
            record: view.record
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            width : 450,
            height : 400,
            border : false,
            items : view
        });
        win.show();  
    },    
    onItemClick: function(grid,recordSearch,item,index,e,options){
        var view = grid.up('t_monitoreo_dealergridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Monitoreo';

        Common.model.t_monitoreo_dealerModel.load(recordSearch.get('Id'),{
            callback:function (record, operation) {

                var viewWin = Ext.widget('t_monitoreo_dealerformview',{
                    caller: view,
                    record: record
                });

                var win = Ext.create('Ext.Window', {
                    iconCls: 'icon-table-add',
                    layout : 'fit',
                    title : title,
                    translate: false,
                    width : 450,
                    height : 400,
                    border : false,
                    items : viewWin
                });
                win.show();

            }
        })
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('t_monitoreo_dealergridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('t_monitoreo_dealergridview');
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        store.clearFilter(true);
        var filters = Ext.clone(view.filters);
        if ( fieldName != null && fieldName != ''){
            filters.push({ 
                property: fieldName+':LIKE',
                value: query
            });
            
        }
        store.filter(filters);
    },
    
    onDeleteClick : function(button, event, options) { 
        var view = button.up('t_monitoreo_dealergridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if (selection.length > 0) {
            var modelMonitoreo = this.getT_monitoreo_dealerModelModel();
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
            /*view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                
                rec.setConfig({
                    proxy: controller.getT_monitoreo_dealerModelModel().getProxy()
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

            },this);*/
        }	
	},
    onSelectionChange:function (model, selected, eOpts) {
           model.view.up('t_monitoreo_dealergridview').down('[action="delete"]').setDisabled(selected.length == 0);
    }
});
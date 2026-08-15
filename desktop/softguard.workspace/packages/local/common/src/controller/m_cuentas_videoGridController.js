//MIGRADO2024
Ext.define('Common.controller.m_cuentas_videoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_cuentas_videoSearchModel' ],
    views : [ 'm_cuentas_videoGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'videoxgridview' : {
    			afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
			},
            'videoxgridview button[action=search]': {
                click: this.onSearchClick
            },
            'videoxgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'videoxgridview button[action=addvideo]': {
                click: this.onAdd
            },
            'videoxgridview button[action="deletevideo"]' : {
    			click : this.onDeleteClick
			}
		});
	},
	initView : function(view) {
        view.cuenta = view.record;
         if(view.all) {
            view.filters = [];
            view.columns[1].setVisible(true);
            //view.columns[4].setVisible(true);
            view.down('#fieldName').getStore().insert(0, {
                field1:'cue_ncuenta',
                field2:getLocale('Cuenta')
            })
            view.down('#fieldName').getStore().insert(0, {
                field1:'cue_clinea',
                field2:getLocale('Dealer')
            })
            view.down('#fieldName').getStore().insert(0, {
                field1:'codigoCuenta',
                field2:getLocale('Dealer-Cuenta')
            })
            view.down('#fieldName').getStore().insert(0, {
                field1:'cue_cnombre',
                field2:getLocale('Nombre cuenta')
            })
        } else {
            view.filters = [
                {
                    property: 'cuv_iidCuenta',
                    value: view.record.get('cue_iid')
                }
            ];     
        }
        
        if (view.hideControls){
            Ext.Array.each(view.hideControls,function(query){
                var control = view.down(query);
                if (control)
                    control.hide();
            })
        }
        var storeVideo =Ext.create('Ext.data.Store',{
            model: this.getM_cuentas_videoSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(storeVideo);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(storeVideo);
        
        storeVideo.load();
        
        view.profile = view.module.profile?view.module.profile:view.module.get('profile');
        if(view.profile < 2) {
            view.down('#addvideo').hide()
            view.down('#deletevideo').hide()
        }
	},
    
   objectChanged: function (view) {    
        view.down('pagingtoolbar').doRefresh();        
    },
    
    onAdd: function(grid,record,item,index,e,options){
        var id = 0;
        var view = grid.up('videoxgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo Video';
        record = this.getM_cuentas_videoModelModel();
        var myobject = record.create({
            'cvl_iidcuenta' : view.record.get('cue_iid')
        });            
        var viewwin = Ext.widget('cuentavideoformview',{
            caller: view,
            record: myobject,
            cuenta: view.cuenta,
            objectId : id,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            width : 450,
            height : 500,
            border : false,
            items : viewwin
        });
        win.show();
    },    
    onItemClick: function(grid,record,item,index,e,options){
        var view = grid.up('videoxgridview');
        var id = record.get('Id');
        // me fijo si tengo derechos de edicion
        if (view.module.profile ==1){
            notifyError('No posee derechos para la operación.');
            return false;
        }
        
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Video';
        var view = Ext.widget('cuentavideoformview',{
            caller: view,
            cuenta: view.cuenta,
            record: record,
            objectId : id,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            
            //anchor : '100%',
            title : title,
            width : 600,
            height : 500,
            border : false,
            items : [
                {
                    xtype: 'container',
                    layout: 'vbox',
                    anchor: '80%',
                    items: [view]
                }
            ]
        });
        win.show();
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    onGetAllClick: function(button, event, options) {    
        var view = button.up('videoxgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        store.load();
    },
    
    onSearchClick: function(button, event, options) {  
        var view = button.up('videoxgridview');
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        
        store.clearFilter(true);
        var filters = Ext.clone(view.filters);
        
        if (fieldName != ''){
            if(fieldName == 'codigoCuenta') {
                var values = query.split('-');
                
                filters.push({ 
                    property: 'cue_clinea',
                    value: values[0]
                });
                
                filters.push({ 
                    property: 'cue_ncuenta',
                    value: values[1]
                });
                
            } else {
                filters.push({ 
                    property: fieldName+':LIKE',
                    value: query
                });
            }
        }
        
        if (filters.length>0){
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
    },
    
    onDeleteClick : function(button, event, options) {
        var view = button.up('videoxgridview');
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
Ext.define('AdministratorSearch.controller.GatewayGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'GatewaySearchModel', 'GatewayModel' ],
    views : [ 'GatewayGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
			'gatewaygridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
			},
            'gatewaygridview button[action=search]': {
                click: this.onSearchClick
            },
            'gatewaygridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'gatewaygridview button[action=add]': {
                click: this.onAdd
            },
            'gatewaygridview button[action="delete"]' : {
        		click : this.onDeleteClick
			}
		});
	},

	initView : function(view) {
        view.filters = [];
        var record = view.record;
        
        
        var store =Ext.create('Ext.data.Store',{
            model: this.getGatewaySearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(store);
        
        store.load();

        
        
	},
    objectChanged: function (view) {    
        view.down('pagingtoolbar').doRefresh();        
    },
    
    onAdd: function(grid,record,item,index,e,options){
        var view = grid.up('gatewaygridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo Gateway';
        record = this.getGatewayModelModel();
 
        var myobject = record.create({
            'Id':0
        });      
        
         var win = Ext.create('Ext.Window', {
            layout: 'fit',
        	title : title,
        	closeAction : 'destroy',
            itemId: 'cuentaWin',
        	width : 600,
        	height : 550,
        	border : true,
            modal: true,
            view : view,
        	items : [
                {
                    xtype: 'gatewayformview',
                    caller: view,
                    record: myobject
                }
            ]
        });
        win.show();
    },    
    
    
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('gatewaygridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('tgm_cdescripcion');       
        
        if(record.get('tgm_ntipo') == 0 && record.get('tgm_cConfig') == '') {
            notify('Este registro no es editable.')
        } else {
            this.getGatewayModelModel().load(record.get('Id'), {callback:function (recordx) {
                var win = Ext.create('Ext.Window', {
                    layout: 'fit',
                	title : title,
        			closeAction : 'destroy',
                    itemId: 'cuentaWin',
                    translate: false,
        			width : 600,
        			height : 300,
        			border : true,
                    modal: true,
                    view : view,
        			items : [
                        {
                            xtype: 'gatewayformview',
                            caller: view,
                            record: recordx
                        }
                    ]
        		});
        		win.show();
            }})
        }
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('gatewaygridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('gatewaygridview');
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        
        //var filters = Ext.clone(view.filters);
        
        
        if (fieldName != ''){
            store.filter({ 
                property: fieldName+':LIKE',
                value: query,
                id: fieldName
            });
        }
    },
    
    
     onDeleteClick : function(button, event, options) {
        var model = this.getGatewayModelModel();
        var view = button.up('gatewaygridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                if (rec.get('tgm_iescliente')==1){
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
                }
            },this);  
        }
            	
	}
    


});
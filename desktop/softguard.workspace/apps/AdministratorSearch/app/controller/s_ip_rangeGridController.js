Ext.define('AdministratorSearch.controller.s_ip_rangeGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 's_ip_rangeModel', 's_ip_rangeSearchModel' ],
    views : [ 's_ip_rangeGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            's_ip_rangegridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            's_ip_rangegridview button[action=add]': {
                click: this.onAdd
            },
            's_ip_rangegridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getS_ip_rangeSearchModelModel(),
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
        var view = grid.up('s_ip_rangegridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo rango';
        
        
        record = this.getS_ip_rangeModelModel();
    	var myobject = record.create({
		});            

        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
        if (!mytab) {
            var newTab = Ext.widget('s_ip_rangeformview', {
                iconCls: 'icon-table-add',
        		title : title,
                parent: view.record,
                record: myobject,
                targetTab: panel,
        		objectId : id,
                closable : true,
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
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var view = grid.up('s_ip_rangegridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = sanitizarTitulo(record.get('ipr_name'));

        // me fijo si el tab existe, si es nuevo lo creo
        var mytab = panel.down('[title="' + title + '"]');
    	if (!mytab) {
            var newTab = Ext.widget('s_ip_rangeformview', {
                iconCls: 'icon-table-edit',
    			title : title,
                parent: view.record,
                translate: false,
                record: record,
                targetTab: panel,
    			objectId : id,
    			closable : true,
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
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    
    onDeleteClick : function(button, event, options) {
        var controller = this;
        var view = button.up('s_ip_rangegridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                rec.setConfig({
                    proxy: controller.getS_ip_rangeModelModel().getProxy()
                });

                rec.destroy({callback: function(record, operation){
                   
                   
                        if (operation.success)
                        {
                            notify('Se eliminó exitosamente');
                            
                        }
                        
                        view.store.load();                
                   
                }
                
            });
            
            },this);
            
        }
        		
	}
});
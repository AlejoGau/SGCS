//MIGRADO2024
Ext.define('Common.controller.TablasTelefonosJurisdiccionalesAccGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasTelefonosJuridiccionalesSearchModel' ],
    views : [ 'TablasTelefonosJurisdiccionalesAccGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
        	'tablastelefonosjuridiccionalesaccgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
               // objectchanged: this.objectChanged
			},
            'tablastelefonosjuridiccionalesaccgridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablastelefonosjuridiccionalesaccgridview button[action=getall]': {
                click: this.onGetAllClick
            },
         /*   'tablastelefonosjuridiccionalesaccgridview button[action=add]': {
                click: this.onAdd
            },
            'tablastelefonosjuridiccionalesaccgridview button[action="delete"]' : {
				click : this.onDeleteClick
			}*/
            
            
		});
	},
	initView : function(view) {
        
       var record = view.record;
       var provincia = record.get('cue_cprovincia');
       
       view.filters = [{
        property : "tel_cprovincia",
        value : provincia
       }];
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasTelefonosJuridiccionalesSearchModelModel(),
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
    
     objectChanged: function () {
        var view = button.up('tablastiposgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        mytab.down('pagingtoolbar').doRefresh();
        
    },
    
    /*onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('tablastelefonosjuridiccionalesaccgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo telefono';
        
        
         record = this.getTablasTelefonosJuridiccionalesModelModel();
         
            var now = new Date();
        	var myobject = record.create({
                'tip_ccodigo' : 0
			});  
            
            var view = Ext.widget('tablastelefonosjuridiccionalesformview',{
                        caller: grid,
                        record: myobject,
                        objectId : id,
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
    
    */
   
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var view = grid.up('tablastelefonosjuridiccionalesgridview');
       // var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('Id')+') '+record.get('tel_cnombre');
        var view = Ext.widget('tablastelefonosjuridiccionaleshelperview',{
            caller: grid,
            record: record,
            objectId : id,
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
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('tablastelefonosjuridiccionalesaccgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('tablastelefonosjuridiccionalesaccgridview');
        
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
        
       
    }/*,
    
    onDeleteClick : function(button, event, options) {
            
        var view = button.up('tablastelefonosjuridiccionalesgridview');
        var selection = view.getSelectionModel().getSelection()[0];
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
                    
                   
                }
                
            });
            
            },this);
            
       
            view.store.load();
            
        }
    			
	}*/
});
Ext.define('AdministratorSearch.controller.TablasFormaDePagoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasFormaDePagoSearchModel', 't_formas_pago_fcModel' ],
    views : [ 'TablasFormaDePagoGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'tablasformadepagogridview' : {
    			afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'tablasformadepagogridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablasformadepagogridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablasformadepagogridview button[action=add]': {
                click: this.onAdd
            },
            'tablasformadepagogridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasFormaDePagoSearchModelModel(),
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
        var controller = this;
        var id = 0;
        var view = grid.up('tablasformadepagogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva forma de pago';
        
        
        model = this.getT_formas_pago_fcModelModel();
        
        Ext.Ajax.request({
            url: '/rest/search/t_formas_pagoCreateByToken',
            success: function(response){
                var json = Ext.JSON.decode(response.responseText);
                var id = json.rows[0].fpg_idkey;
                var record = model.load(id, {
                    callback: function(_record, operation, success) {
                        controller.onItemClick(grid,_record);
                    }
                }); 
            }
        });

    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('tablasformadepagogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Forma de pago';
        
        var model = this.getT_formas_pago_fcModelModel().load(id, {callback:function (recordx,operation) {
            
            if(operation.success) {
                var viewwin = Ext.widget('tablasformadepagoformview',{
                    caller: view,
                    record: recordx,
                    objectId : id,
                });
                
                var win = Ext.create('Ext.Window', {
                    iconCls: 'icon-table-add',
                    layout : 'fit',
                    title : title,
            		width : 300,
        			height : 300,
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
        
        var view = button.up('tablasformadepagogridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('tablasformadepagogridview');
        
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
            store.clearFilter(true);
            store.filter(filters);
        }
        else{
            store.clearFilter();
        }
        
       
    },
    
    onDeleteClick : function(button, event, options) {
            
        var view = button.up('tablasformadepagogridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if (selection) {
            Ext.MessageBox.confirm('Confirmar', 'Está seguro que desea borrar?', function(btn){
        		if (btn=="yes"){
                    view.store.remove(selection);
                    var delRec = view.store.getRemovedRecords();
                    Ext.Array.each(delRec, function (rec) {
                        rec.setConfig({
                            proxy: controller.getT_formas_pago_fcModelModel().getProxy()
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
        		}})
            
            
        }
        		
	}

});
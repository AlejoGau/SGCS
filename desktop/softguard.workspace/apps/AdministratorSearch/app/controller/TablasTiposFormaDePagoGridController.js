Ext.define('AdministratorSearch.controller.TablasTiposFormaDePagoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 't_tipos_formapago_fcSearchModel', 't_tipos_formapago_fcModel' ],
    views : [ 'TablasTiposFormaDePagoGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'tablastipoformadepagogridview' : {
        		afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'tablastipoformadepagogridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablastipoformadepagogridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablastipoformadepagogridview button[action=add]': {
                click: this.onAdd
            },
            'tablastipoformadepagogridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
        view.filters = [];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getT_tipos_formapago_fcSearchModelModel(),
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
        view.store.load()    
    },
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('tablastipoformadepagogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nueva forma de pago';
        
        
         record = this.getT_tipos_formapago_fcModelModel();
         
            
        	var myobject = record.create({
         
			});            
		
                    
             var view = Ext.widget('tablastipoformadepagoformview',{
                caller: view,
                record: myobject,
                objectId : id,
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                layout : 'fit',
                title : title,
        		width : 300,
    			height : 300,
    			border : false,
    			items : view
    		});
    		win.show();
                    
 
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('tablastipoformadepagogridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('Id')+') Forma de pago';
        
        var model = this.getT_tipos_formapago_fcModelModel().load(id, {callback:function (recordx,operation) {
            
            if(operation.success) {
                var viewwin = Ext.widget('tablastipoformadepagoformview',{
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
        
        var view = button.up('tablastipoformadepagogridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('tablastipoformadepagogridview');
        
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
            
        var view = button.up('tablastipoformadepagogridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if (selection) {
            Ext.MessageBox.confirm('Confirmar', 'Está seguro que desea borrar?', function(btn){
            	if (btn=="yes"){
                    view.store.remove(selection);
                    var delRec = view.store.getRemovedRecords();
                    Ext.Array.each(delRec, function (rec) {
                        rec.setConfig({
                            proxy: controller.getT_tipos_formapago_fcModelModel().getProxy()
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
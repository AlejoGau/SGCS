Ext.define('AdministratorSearch.controller.STMovilGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasMovilesPatrullaModel', 'TablasMovilesPatrullaSearchModel' ],
    views : [ 'STMovilGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'stmovilview' : {
        		afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
               
			},
            'stmovilview button[action=search]': {
                click: this.onSearchClick
            },
            'stmovilview button[action=getall]': {
                click: this.onGetAllClick
            },
            'stmovilview button[action=add]': {
                click: this.onAdd
            },
            'stmovilview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},

	initView : function(view) {
       
       view.filters = [{
                property:'tmp_cnumero:LIKE',
                value: 'ST'
            }]; 
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasMovilesPatrullaSearchModelModel(),
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
    
    onAdd: function(button, event, options) {
        
        var id = 0;
        var view = button.up('stmovilview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Servicio Tecnico Movil';
        
        
        
        Ext.Ajax.request({
                  url: '/rest/search/MaxStMovil',
                  method: 'GET',
                  scope: this,
                  success: function(response){
                    var parametros = Ext.JSON.decode(response.responseText);
                    
                
                    
                    var nuevoNumero = 0;
                    
                    var ultimo = 0;
                    var ultimoNumero = 0;
                    if(parametros.total>0) {
        				ultimo = Ext.util.Format.trim(parametros.rows[0].tmp_cnumero);
    					var ultimoNumero = parseInt(ultimo.replace("ST", ""));
                    } 
                    
                    
                    nuevoNumero = ultimoNumero + 1;
                    
                    nuevoNumero = "ST"+Ext.String.leftPad( nuevoNumero, 3, '0' );
         
            
                        
                     record = this.getTablasMovilesPatrullaModelModel();
                     
                        
                    	var myobject = record.create({
                                        tmp_cnumero:nuevoNumero
                            		});            
                             
            		    var viewwin = Ext.widget('tablasmovilespatrullaformview',{
                                    caller: view,
                                    record: myobject,
                                    objectId : id,
                                    servtec: true
                                });
                                
                                var win = Ext.create('Ext.Window', {
                                    iconCls: 'icon-table-add',
                                    layout : 'fit',
                                    title : title,
                                    width : 450,
                            		height : 420,
                        			border : false,
                        			items : viewwin
                        		});
                        		win.show();
                    
                  }})

            
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('stmovilview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = '('+record.get('tmp_cnumero')+') '+getLocale('Servicio Tecnico Movil');

        var view = Ext.widget('tablasmovilespatrullaformview',{
            caller: view,
            record: record,
            objectId : id,
            servtec: true
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
            translate: false,
            width : 450,
			height : 420,
			border : false,
			items : view
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('stmovilview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('stmovilview');
        
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
    
    onDeleteClick : function(button, event, options) {
            
        var view = button.up('stmovilview');
        var selection = view.getSelectionModel().getSelection()[0];
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                
                var model = this.getTablasMovilesPatrullaModelModel();        
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
                   
                }
                
            });
            
            },this);
            view.store.load();
            
        }
        		
	}

});
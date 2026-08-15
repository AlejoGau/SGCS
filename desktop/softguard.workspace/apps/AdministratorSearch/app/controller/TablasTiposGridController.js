Ext.define('AdministratorSearch.controller.TablasTiposGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'TablasTiposModel', 'TablasTiposSearchModel' ],
    views : [ 'TablasTiposGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
			'tablastiposgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged
			},
            'tablastiposgridview button[action=search]': {
                click: this.onSearchClick
            },
            'tablastiposgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'tablastiposgridview button[action=add]': {
                click: this.onAdd
            },
            'tablastiposgridview button[action="delete"]' : {
				click : this.onDeleteClick
			},
            'tablastiposgridview #fieldName' : {
                change : this.onBusquedaChange
    		}
            
            
		});
	},
    
    
    onBusquedaChange: function(combo, newvalue, oldvalue){
        var view = combo.up('tablastiposgridview');
        if(newvalue == 'tip_nTipo') {
            view.down('#query').hide();
            view.down('#combocondiciones').show();
        } else {
            view.down('#query').show();
            view.down('#combocondiciones').hide();
        }
    },

	initView : function(view) {
        view.filters = [];
       
       
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getTablasTiposSearchModelModel(),
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
       // var view = view.up('tablastiposgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        view.down('pagingtoolbar').doRefresh();
        
    },

    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('tablastiposgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo tipo';
        
        
         record = this.getTablasTiposModelModel();
         
            var now = new Date();
        	var myobject = record.create({
                'tip_ccodigo' : ''
			});  
            
            var view = Ext.widget('tablastiposformview',{
                        caller: view,
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
		/*	myobject.save({
    			scope : this,
    			callback : function(record, operation) {
    			//	this.setRecord(record,view);
                    
                    
                    
                    
                    
    			}
			});*/

        
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var view = grid.up('tablastiposgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('tip_cdescripcion');
        
        if (record.get('tip_ccodigo').charAt(0)!='_'){
            var view = Ext.widget('tablastiposformview',{
                caller: grid,
                record: record,
                objectId : id,
            });
            
            var win = Ext.create('Ext.Window', {
                iconCls: 'icon-table-add',
                translate:false,
                layout : 'fit',
                translate: false,
                title : title,
    			width : 450,
    			height : 300,
    			border : false,
    			items : view
    		});
    		win.show();
        } else {
            notifyError('El código es reservado del sistema.')
        }

        
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('tablastiposgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').show();
        view.down('#combocondiciones').hide();
        
        var combo =  view.down('#fieldName');
        combo.setValue('');
        
        
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('tablastiposgridview');
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        
        store.clearFilter();
        var filters = Ext.clone(view.filters);
        
        
        if (fieldName != ''){
            
            if(fieldName == 'tip_nTipo') {                
                query = view.down('#combocondiciones').getValue();                
            } else {
                var query = view.down('#query').getValue();
            }
            
            filters.push({ 
                property: fieldName+':LIKE',
                value: query
            });
            
        }
        
        if (filters.length>0){
            store.filter(filters);
        }
        
       
    },
    
    onDeleteClick : function(button, event, options) {
            
        var view = button.up('tablastiposgridview');
        var selection = view.getSelectionModel().getSelection()[0];
        
        if (selection) {
            view.store.remove(selection);
          /*  view.store.sync({ 
                    success : function (record) {                        
                        notify('Se eliminio exitosamente');
                    },
                    failure: function(){
                        notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                    },
                    scope: this
            
            });
            */
            
            
            var delRec = view.store.getRemovedRecords();
            
            Ext.Array.each(delRec, function (rec) {

                console.log(rec)
                var model = this.getTablasTiposModelModel();
				record.setConfig({proxy: model.getProxy()});

                rec.destroy({callback: function(record, operation){
                   
                   
                        if (operation.success)
                        {
                            notify('Se eliminio exitosamente');
                            view.store.load();
                            
                        }
                        else
                        {
                           notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                        }
                    
                   
                }
                
            });
            
            },this);
            
            
           /* view.store.sync({callback: function(batch){
                Ext.Array.each(batch.operations, function(operation, index, array){
                    if (operation.success)
                    {
                        notify('Se eliminio exitosamente');

                    }
                    else
                    {
                       notify('No se puede eliminar el registro, esta siendo utilizado en el sistema.');
                    }
            
            
            }});*/
            
            
        }
    			
	}
});
Ext.define('AdministratorSearch.controller.FormatosGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'FormatosGridModel', 'FormatosGridSearchModel', 'FormatosModel' ],
    views : [ 'FormatosGridView' ],

    init : function(config) {
        // genero los eventos
    	this.control(
            {
			'formatosgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.onObjectChanged
			},
            'formatosgridview button[action=search]': {
                click: this.onSearchClick
            },
            'formatosgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'formatosgridview button[action=add]': {
                click: this.onAdd
            },
            'formatosgridview button[action="delete"]' : {
        		click : this.onDeleteClick
			},
            'formatosgridview #evento': {
                click: this.onEventoClick
            },
            'formatosgridview #limpiarevento': {
                click: this.onLimpiarEventoClick
            }
		});
	},
    onEventoClick: function (btn) {
        var view = btn.up('formatosgridview');
        
        
         var myWindow = Ext.widget('window',{
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true, 
            items: [{
                xtype: 'eventselecterhelperview',
                caller: view,
                filter: [{property:'cod_nManual', value:1}],
                simpleSelect: true
                
            }],
            layout: 'fit'
        }).show();
        
        
        
        myWindow.on('selectedEvents',function () {
         console.log(arguments)
        })
        
            
        
    },
    onLimpiarEventoClick: function (btn) {
        var view = btn.up('formatosgridview');
        view.down('#nombreevento').setValue('')
        view.down('#codevento').setValue('')
    },
    eventsSelected: function(record, view) {
        view.down('#nombreevento').setValue(record.get('Descripcion')+" - "+record.get('cod_ccodigo'))
        view.down('#codevento').setValue(record.get('cod_ccodigo'))
    }, 

    onObjectChanged : function (view,record) {
        
        view.store.load();
    },
	initView : function(view) {
        view.filters = [];
        var record = view.record;
        
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getFormatosGridSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
        
        
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getFormatosGridSearchModelModel(),
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
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('formatosgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo formato';
        
        
         record = this.getFormatosModelModel();
         
            var myobject = record.create({
               'for_idKey': 0,
               'for_ccodigo': 0
			});	    
            
             // me fijo si el tab existe, si es nuevo lo creo
            var mytab = panel.down('[title="' + title + '"]');
            if (!mytab) {
                var newTab = Ext.widget('formatosformview', {
                    iconCls: 'icon-table-add',
                	title : title,
                    parent: record,
                    record: myobject,
                    targetTab: panel,
            		objectId : id,
                    closable : true,
                    caller:view
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
        var id = record.get('for_cdescripcion');
        var view = grid.up('formatosgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('for_cformato');       
        

        record.setConfig({
            proxy: model.getProxy()
        });        
        this.getFormatosGridModelModel().load(record.get('Id'), {callback:function (recordx) {

            // me fijo si el tab existe, si es nuevo lo creo
            var mytab = panel.down('[title="' + title + '"]');
        	if (!mytab) {
                var newTab = Ext.widget('formatosformview', {
                    iconCls: 'icon-page-white-code',
        			title : title,
                    parent: view.record,
                    targetTab: panel,
                    translate: false,
                    record: recordx,
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
        }})
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },


    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('formatosgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('formatosgridview');
        
        var store = view.getStore();
        var fieldName = view.down('#fieldName').getValue();
        var query = view.down('#query').getValue();
        
        //var filters = Ext.clone(view.filters);
        var filters = []
        
        
        if (fieldName != ''){
            filters.push({ 
                property: fieldName+':LIKE',
                value: query,
                id: fieldName
            });
        }
        
        if (view.down('#codevento').getValue() != ''){
            filters.push({ 
                property: 'for_calarma',
                value: view.down('#codevento').getValue()
                
            });
        }
        
        store.filter(filters);
        
    },
    
    
     onDeleteClick : function(button, event, options) {
        var model = this.getFormatosModelModel();
        var view = button.up('formatosgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
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
            
            },this);
            
            
        }
            	
	}
    


});
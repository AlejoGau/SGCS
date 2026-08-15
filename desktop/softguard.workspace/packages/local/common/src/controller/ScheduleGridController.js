//MIGRADO2024
Ext.define('Common.controller.ScheduleGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'ScheduleSearchModel', 'ScheduleModel', 'ScheduleProgramSearchModel', 'ScheduleProgramModel' ],
    views : [ 'ScheduleGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'schedulegridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                selectionchange: this.onSelectionChange
			},
            'schedulegridview button[action=search]': {
                click: this.onSearchClick
            },
            'schedulegridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'schedulegridview button[action=add]': {
                click: this.onAdd
            },
            'schedulegridview button[action="delete"]' : {
				click : this.onDeleteClick
			}
            
            
		});
	},
	initView : function(view) {
        
       var record = view.record;
       
       
       view.filters = [{
        property : "cuentaId",
        value : record.get('cue_iid')
       }];
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getScheduleProgramSearchModelModel(),
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
    
     objectChanged: function (view,record) {
       
      
        view.down('pagingtoolbar').doRefresh();
        
    },
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('schedulegridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = getLocale('Nuevo')+ ' schedule';
        
        
         record = this.getScheduleProgramModelModel();
         
            var now = new Date();
        	var myobject = record.create({
                cuentaId: view.record.get('cue_iid')
			});  
            myobject.set('Id',0);
            
            var view = Ext.widget('scheduleformview',{
                        caller: view,
                        scroll: 'auto',
                        autoScroll: true,
                        record: myobject
                    });
                    
                    var win = Ext.create('Ext.Window', {
                        iconCls: 'icon-table-add',
                        layout : 'fit',
                        title : title,
                        translate: false,
            			width : 500,
            			height : 450,
                        //scroll: 'auto',
            			border : false,
            			items : view,
                        closeAction:'destroy'
            		});
            		win.show();
        
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
        var id = record.get('Id');
        var view = grid.up('schedulegridview');
        var title = record.get('Name');
        var view = Ext.widget('scheduleformview',{
            caller: view,
            record: record,
            objectId : id,
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
        	title : title,
            translate: false,
			width : 500,
			height : 550,
			border : false,
			items : view,
            closeAction:'destroy'
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('schedulegridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('schedulegridview');
        
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
        var controller = this;    
        var view = button.up('schedulegridview');
        Ext.MessageBox.confirm(
            getLocale('Confirmación'),
            getLocale('Está seguro?'),
            function (btn) {
              if (btn == 'yes') {
                button.disable();
                var selection = view.getSelectionModel().getSelection()
                if (selection.length > 0) {
     
                  
                  var scheduleModel = controller.getScheduleProgramModelModel();
                  for(var key in selection) {
                    scheduleModel.load(selection[key].get('Id'),{
                          callback: function(recordErase){
                              recordErase.erase({
                                  callback: function(record, operation){
                                      if (!operation.success) {
                                        notify(
                                          'No se pudo eliminar la zona. Verifique no tenga un video relacionado.'
                                        )
                                      }else{
                                        view.getStore().load();
                                      }                         
                                  }
                              });
                          }
                      });
      
                  }             
                }
              }
            }
          )
    			
	},
    onSelectionChange: function(selModel, selections){
        var grid = selModel.view;
        var view = grid.up('schedulegridview');
        view.down('button[action=delete]').setDisabled(selections.length === 0);
    }    
});
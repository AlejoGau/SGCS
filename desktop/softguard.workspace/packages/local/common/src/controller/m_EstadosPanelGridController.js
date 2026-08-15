//MIGRADO2024
Ext.define('Common.controller.m_EstadosPanelGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_EstadosPanelModel', 'm_EstadosPanelSearchModel' ],
    views : [ 'm_EstadosPanelGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'm_estadospanelgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                selectionchange: this.onSelectionChange
			},
            'm_estadospanelgridview button[action=search]': {
                click: this.onSearchClick
            },
            'm_estadospanelgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'm_estadospanelgridview button[action=add]': {
                click: this.onAdd
            },
            'm_estadospanelgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			}
            
            
		});
	},
	initView : function(view) {
        // funcionalidad solo disponible si el parametro TIMEREXECUTE esta activo
        // pedido pablo 10/04/2019
        var record = view.record;
        var module = view.module;
        var profile = module.get('profile');
        view.profile = profile;
        
        if (profile < 2 ){
            view.down('toolbar').hide();
        }
        
        if (profile == 4){
            view.down('#save').hide();
            view.down('#delete').hide();
        } 
        var TIMEREXECUTE = getParametro('TIMEREXECUTE',true,true);
        if (TIMEREXECUTE.get('par_ivalor') != 1){
            view.down('toolbar').hide();
            notifyError('Configure el parámetro TIMEREXECUTE para activar esta funcionalidad');
            return;
        }
        view.filters = [];
        if (view.record){
            view.filters.push({property:"mep_idCuenta", value:view.record.get("cue_iid"), id:'mep_idCuenta'});
        }
        view.store =Ext.create('Ext.data.Store',{
            model: this.getM_EstadosPanelSearchModelModel(),
            pageSize: 999,
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
        var view = grid.up('m_estadospanelgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo estado de alarma';
        record = this.getM_EstadosPanelModelModel();
    	var myobject = record.create({
            'mep_idCuenta' : view.record.get('cue_iid'),
            'mep_iAutoProcesa': 1
		});       
        myobject.set(0);     
        var view = Ext.widget('m_estadospanelformview',{
            caller: view,
            record: myobject,
            recordCuenta: view.record
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
            title : title,
    		width : 450,
			height : 500,
			border : false,
			items : view
		});
		win.show();
                    
        
        
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var m_EstadosPanelModel = this.getM_EstadosPanelModelModel();
        m_EstadosPanelModel.load(id,{
            callback: function(rec){
                var view = grid.up('m_estadospanelgridview');
                var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
                var title = 'Estado de alarma';
                 var view = Ext.widget('m_estadospanelformview',{
                    caller: view,
                    record: rec,
                    recordCuenta: view.record
                });
                
                var win = Ext.create('Ext.Window', {
                    iconCls: 'icon-table-add',
                    layout : 'fit',
                    title : title,
                    translate: false,
                    width : 450,
                    height : 500,
                    border : false,
                    items : view
                });
                win.show();
            }
        });

        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('m_estadospanelgridview');
        var store = view.getStore();
        store.clearFilter();
        store.filter(view.filters);
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('m_estadospanelgridview');
        
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
    
   
    onSelectionChange: function(selModel, selections){
        var grid = selModel.view;
        var view = grid.up('m_estadospanelgridview');
        view.down('button[action=delete]').setDisabled(selections.length === 0);
    },
    onDeleteClick : function(button, event, options) {
        var controller = this;    
        var view = button.up('m_estadospanelgridview');
        Ext.MessageBox.confirm(
            getLocale('Confirmación'),
            getLocale('Está seguro?'),
            function (btn) {
              if (btn == 'yes') {
                button.disable();
                var selection = view.getSelectionModel().getSelection()
                if (selection.length > 0) {
     
                  
                  var scheduleModel = controller.getM_EstadosPanelModelModel();
                  for(var key in selection) {
                    scheduleModel.load(selection[key].get('Id'),{
                          callback: function(recordErase){
                              recordErase.erase({
                                  callback: function(record, operation){
                                      if (!operation.success) {

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
});
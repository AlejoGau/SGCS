//MIGRADO2024
Ext.define('Common.controller.CheckPointsGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'CheckPointsSearchModel', 'CheckPointsModel', 'SoftguardZonaModel' ],
    views : [ 'CheckPointsGridView', 'PhotoPanelView', 'UploadButton' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'checkpointsgridview' : {
				afterrender : this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.onObjectChanged,
                openqr: this.openQR,
                selectionchange : this.onSelectionChange,
                cuentachanged : this.onCuentaSelected
               
			},
            'checkpointsgridview button[action=search]': {
                click: this.onSearchClick
            },
            'checkpointsgridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'checkpointsgridview button[action=add]': {
                click: this.onAdd
            },
            'checkpointsgridview button[action="delete"]' : {
    			click : this.onDeleteClick
			},
            'checkpointsgridview button[action=copycheck]': {
                click: this.onCopyChecksClick
            }
            
            
		});
	},
    
    
    onCuentaSelected:  function (cuenta,view) {
        var controller = this;
        var dialog = Ext.create('Ext.window.MessageBox', {
            buttons: [
                { 
                    text: 'Solo copiar',
                    handler: function() {
                        Ext.Ajax.request({
                              url: '/rest/search/CopiarCheckPoints',
                              params: { cuentaDesde:cuenta.get('cue_iid'), 
                                        cuentaHasta: view.record.get('cue_iid'),
                                        remplazarDuplicados: 0},
                              method: 'GET',
                              scope: this,
                              success: function(response){
                                var parametros = Ext.JSON.decode(response.responseText);
                                var rec = parametros.rows[0];
                                
                                
                                view.fireEvent('objectchanged',view)
                                    dialog.close();
                                
                                
                              }
                        });
                        
                    } 
                },
                { 
                    text: 'Remplazar duplicados',
                    handler: function() {
                        Ext.Ajax.request({
                              url: '/rest/search/CopiarCheckPoints',
                              params: { cuentaDesde:cuenta.get('cue_iid'), 
                                        cuentaHasta: view.record.get('cue_iid'),
                                        remplazarDuplicados: 1},
                              method: 'GET',
                              scope: this,
                              success: function(response){
                                var parametros = Ext.JSON.decode(response.responseText);
                                var rec = parametros.rows[0];
                                
                                
                                view.fireEvent('objectchanged',view)
                                    dialog.close();
                                
                                
                              }
                        });
                        
                    } 
                },
                { 
                    text: 'Cancelar',
                    handler: function() {
                        dialog.close();
                    } 
                }
            ]
        });
        dialog.show({
            title:getLocale('Copiar checkpoints?'),
            msg: getLocale('Desea remplazar los checkpoints que se encuentran duplicados?'),
            icon: Ext.Msg.QUESTION
        });
        
        
        
    },
    
    
    onCopyChecksClick: function(button,event,options){
         var view = button.up('checkpointsgridview');
         var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Seleccione Cuentas',
			closeAction : 'destroy',
            itemId: 'cuentaWin',
			width : 750,
			height : 550,
			border : true,
            modal: true,
            view : view,
			items : [
                {
                    xtype: 'cuentahelperview',                    
                    caller: view,                    
                    multiSelect: false,
                    tip_nCondicion: 3,
                    selectionEvent: 'cuentachanged'
                }
            ]
		});
		win.show();
        
    },
    
    onSelectionChange: function(selectionModel, records, options){
        var view = selectionModel.view.up('checkpointsgridview');
        if(view.eventFireOnSelect) {
            view.caller.fireEvent(view.eventFireOnSelect, records, view.caller)
        }
    },
    
    openQR: function (rec, view) {
        
        var win = Ext.create('Ext.Window', {
                        iconCls: 'icon-table-add',
                        layout : 'fit',
                    	title : 'QR Code',
            			width : 390,
            			height : 450,
            			border : false,
            			items : [
                                 {
                                    xtype: 'uxiframe',
                                    itemId: 'Iframe',
                                    height: 0,
                                    border : false,
                                    width:'100%',
                                    src: '/handler/QrCodeHandler?title='+rec.get('zon_cdescripcion')+'&code='+rec.get('chp_cReference')
                                }
                            ],
                        tbar: [  
                        	{
                                text:'Imprimir',
                                iconCls : 'icon-printer',
                                handler: function(button){
                                    var iframe = button.up('window').down('#Iframe');
                                    var ele = iframe.getEl();
                                    
                                    document.getElementById('iframe-'+ele.id).contentWindow.printMe();
                                    
                                }
                            }
                    	],
                        caller: view
            		});
            		win.show();
        
    },
	initView : function(view) {
        
        view.filters = [ {
                property: 'cue_iid',
                value: view.record.get('cue_iid')
            } ];      
        
        view.store =Ext.create('Ext.data.Store',{
            model: this.getCheckPointsSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: Ext.clone(view.filters)
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        view.store.load();
        
        
        // no esta module en mapguardweb voy a poca seguridad por defecto
        if (view.module){
            view.profile = view.module.profile?view.module.profile:view.module.get('profile');
            if (view.profile < 2){
                view.down('#add').hide();
                view.down('#delete').hide();
                view.down('#copycheck').hide();
            }
        }else {
            view.down('#add').hide();
            view.down('#delete').hide();
            view.down('#copycheck').hide();
        }
        
        
	},
    
    onObjectChanged: function (view) {    
        view.down('pagingtoolbar').doRefresh();        
    },  
    
    onAdd: function(grid,record,item,index,e,options){
        
        var id = 0;
        var view = grid.up('checkpointsgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo';
        
        
         record = this.getCheckPointsModelModel();
         
            var latylong = view.record.get('cue_cLatLng').split(',');
            if(latylong[0] == "") {
                latylong[0] = 0;
                latylong[1] = 0;
            }
            
        	var myobject = record.create({
                'chp_idKey' : 0,
                'chp_iCuenta' : view.record.get('cue_iid'),
                'chp_rLatitud' : parseFloat(latylong[0]).toFixed(6),
                'chp_rLongitud': parseFloat(latylong[1]).toFixed(6),
                'chp_nTipo' : ''
                    
			});            
		/*	myobject.save({
    			scope : this,
    			callback : function(record, operation) {
    		                  
                    */
                    var viewForm = Ext.widget('checkpointsformview',{
                        caller: view,
                        record: myobject,
                        objectId : id,
                    });
                    
                    var win = Ext.create('Ext.Window', {
                        iconCls: 'icon-flag-green',
                        layout : 'fit',
                		title : title,
            			width : 450,
            			height : 350,
            			border : false,
            			items : viewForm,
                        caller: view
            		});
            		win.show();
                    
    		/*	}
			});*/
        
        
    },    
    
    
   
    onItemClick: function(grid,record,item,index,e,options){
         var id = record.get('Id');
        var view = grid.up('checkpointsgridview');
        var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = record.get('zon_cdescripcion');
        
        if (view.profile < 2){
            notify('No tiene permisos para editar.')
            return false;
        }
        var viewForm = Ext.widget('checkpointsformview',{
            caller: view,
            objectId : id,
            record:record
        });
        
        var win = Ext.create('Ext.Window', {
            iconCls: 'icon-table-add',
            layout : 'fit',
    		title : title,
			width : 450,
			height : 350,
            translate: false,
			border : false,
			items : viewForm,
            caller: view
		});
		win.show();
        
    },    
    
    onObjectEdit: function(record,view){
        this.onItemClick(view,record);
    },
    onGetAllClick: function(button, event, options) {    
        
        var view = button.up('checkpointsgridview');
        var store = view.getStore();
        store.clearFilter(true);
        store.filter(Ext.clone(view.filters));
        view.down('#query').setValue('');
        
    },
    
    onSearchClick: function(button, event, options) {  
        
        var view = button.up('checkpointsgridview');
        
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
    },
    
    onDeleteClick : function(button, event, options) {
            
        var view = button.up('checkpointsgridview');
        var selection = view.getSelectionModel().getSelection();
        if (selection) {
            
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
               /* var model = this.getCheckPointsModelModel();
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
                
            });*/
                Ext.Ajax.request({
                          url: '/rest/search/CheckPointDelete',
                          params: { 
                            'Id': rec.get('chp_idKey')                           
                          },
                          method: 'GET',
                          scope: this,
                          success: function(response){
                            var parametros = Ext.JSON.decode(response.responseText);
                            var rec = parametros.rows[0];
                                notify('Se elimino con exito el checkpoint')
                          },
                          
                          failure: function(response){
                                notify('NO se puede eliminar el checkpoint si está asociado a una ruta.');
                                view.down('pagingtoolbar').doRefresh();
                          }
                            
                    });
            
            },this);
            
            
        }
        		
	}
});
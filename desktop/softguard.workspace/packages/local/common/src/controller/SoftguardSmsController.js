//MIGRADO2024
/*
 * NO SE USA MAS DESDE 17/11/2014
 */
Ext.define('Common.controller.SoftguardSmsController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.TablaModemsSmsStore', 'Common.store.CuentaReporteFrecuenciaStore' ],
    models : [ 'CuentaReporteModel', 'TablasModemsSmsSearchModel', 'NotificacionesSearchModel', 'SoftguardSmsModel', 'TablaModemsSmsModel' ],
    views : [ 'SoftguardSmsPanelView', 'SoftguardSmsView', 'NotificacionesTabpanelView' ], 
    init: function (config) {
        var me=this;
        // genero los eventos
        this.control({
           /* 'softguardsmsgridview button[action=delete]': {
                click: this.onDeleteClick
            },
            'softguardsmsgridview button[action=addsms]': {
                click: this.onAddSmsClick
            },
            'softguardsmsgridview button[action=addemail]': {
                click: this.onAddEmailClick
            },
            'softguardsmsgridview button[action=addpush]': {
                click: this.onAddPushClick
            },
            'softguardsmsgridview button[action=save]': {
                cick: this.onSaveClick
            },
            'softguardsmsgridview': {
                itemdblclick: this.onItemDblClick,
                objectedit: this.onObjectEdit,
                afterrender: this.initView,
            },*/
            'smsview': {
                beforerender: this.loadData
            },
            'smsview #enviados': {
                click: this.onEnviadosClick
            },
            'smsview #recibidos': {
                click: this.onRecibidosClick
            }
        });
    }, // cierro init
    
    onEnviadosClick: function (button,event,options) {
        var view = button.up('smsview');
        
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Sms enviados',
        	closeAction : 'hide',
			width : 750,
			height : 550,
			border : true,
            modal: false,
            view: view,
			items : [
                {
                    xtype: 'smsgridview',
                    caller: view,
                    showMaximizer: false,
                    record: view.record
                    
                }
            ]
		});
        
        win.show();
    },
    
    onRecibidosClick: function (button,event,options) {
        var view = button.up('smsview');
        
        var win = Ext.create('Ext.Window', {
            layout: 'fit',
            title : 'Sms recibidos',
            closeAction : 'hide',
			width : 750,
			height : 550,
			border : true,
            modal: false,
            view: view,
			items : [
                {
                    xtype: 'smsrecibidosgridview',
                    caller: view,
                    showMaximizer: false,
                    record: view.record
                    
                }
            ]
		});
        
        win.show();
    },
    
    initView: function (view) {
        var record = view.record;
        if(view.showMaximizer != false) {
             view.addTool({
                    type: 'maximize', 
                    itemId: 'maximizer',
                    handler: function(event,img,view,tool){
                        var view = tool.up('softguardsmsgridview');
                        var tabpanel = tool.up('tabpanel');
                        
                                                
                        var win = Ext.create('Ext.Window', {
                            layout: 'fit',
                            title : 'Sms',
                    		closeAction : 'hide',
                			width : 750,
                			height : 550,
                			border : true,
                            modal: false,
                            view: view,
                			items : [
                                {
                                    xtype: 'softguardsmsgridview',
                                    caller: view,
                                    showMaximizer: false,
                                    record: record
                                    
                                }
                            ]
                		});
                        
                        win.show();
                        
                    }
                });
                
                
                    
              
                
         }
         
         
 /*        var filters = [];
                
                    if(view.type == 'SMS') {
                        filters.push({
                            property:'sms_csmsparaeventos:NOTNULL',
                            vale:''
                        })
                    } else if(view.type == 'MAIL') {
                        filters.push({
                            property:'sms_cmailparaeventos:NOTNULL',
                            vale:''
                        })
                        
                    } else if(view.type == 'PUSH') {
                        filters.push({
                            property:'sms_cmailparaeventos:NOTNULL',
                            vale:''
                        })
                    }*/
         
        /*    var mystore =Ext.create('Ext.data.Store',{
                model: 'Common.model.SoftguardSmsModel',
             //   filters:filters
                
            });
            
            var _ObjectId = record.get('cue_iid');
            
            // una vez que cargue el store hago el binding con la view
            mystore.proxy.ObjectId = _ObjectId;
            mystore.load({ObjectId:_ObjectId,view:view,store:mystore,callback: this.doBindStore});*/
    },
    loadData: function (view) {
        var viewgrid = view;
        var record = view.record;
        var module = view.module;
        var profile = module.profile?module.profile:module.get('profile');
        viewgrid.profile = profile;
        viewgrid.record = record;
        var cuenta = view.record;
        if (profile < 2){
            viewgrid.down('toolbar').hide();
            
            
            var forms = view.query('form');
            
            Ext.Array.each(forms, function(form){
                form.disableForm();
            })
        }
        
        
    /*    var filters = [];
                
                    if(view.type == 'SMS') {
                        filters.push({
                            property:'sms_csmsparaeventos:NOTNULL',
                            vale:''
                        })
                    } else if(view.type == 'MAIL') {
                        filters.push({
                            property:'sms_cmailparaeventos:NOTNULL',
                            vale:''
                        })
                        
                    } else if(view.type == 'PUSH') {
                        filters.push({
                            property:'sms_cmailparaeventos:NOTNULL',
                            vale:''
                        })
                    }
        
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        var mystore =Ext.create('Ext.data.Store',{
            model: this.getNotificacionesSearchModelModel(),
            filters:filters
        });
        
        //var _ObjectId = record.get('cue_iid');
        
        // una vez que cargue el store hago el binding con la view
        mystore.proxy.ObjectId = _ObjectId;
        mystore.load({ObjectId:_ObjectId,view:viewgrid,store:mystore,callback: this.doBindStore});*/
        
        var modules = SecurityModulesStore;//this.getSecurityModulesStoreStore();
      
    
    },
    
    onObjectEdit: function(record,view){
        this.onItemDblClick(view,record);
    },
    
   /* doBindStore: function(records,operation,success){
        if (success){
            var view = operation.view.down('softguardsmsgridview')?operation.view.down('softguardsmsgridview'):operation.view;
            view.bindStore(operation.store);
            view.down('pagingtoolbar').bindStore(operation.store)
        }
    },*/
     onDeleteClick: function(button,event,options){
        var view = button.up('softguardsmsgridview');
        var selection = view.getSelectionModel().getSelection()[0];
        if (selection) {
            view.store.remove(selection);
        }
        
    },
    onAddSmsClick: function(button,event,options){
        var view = button.up('softguardsmsgridview');
        var cuenta =  view.record;
		
        var records = view.getStore().add({
                sms_iidcuenta: cuenta.get('cue_iid'),
                sms_icodigo: null
            });
        
        this.openFormWindow('SMS',records[0],view, 'sms',490);
        
    },
    
    onAddEmailClick: function(button,event,options){
        var view = button.up('softguardsmsgridview');
        var cuenta =  view.record;
    	
        var records = view.getStore().add({
                sms_iidcuenta: cuenta.get('cue_iid'),
                sms_icodigo: null
            });
        
        this.openFormWindow('EMAIL',records[0],view, 'email',420);
        
    },
    
   /* onAddPushClick: function(button,event,options){
        var view = button.up('softguardsmsgridview');
        var cuenta =  view.record;
        
        var records = view.getStore().add({
                sms_iidcuenta: cuenta.get('cue_iid'),
                sms_icodigo: null
            });
        
        this.openFormWindow('PUSH',records[0],view, 'push',420);
        
    },
    onSaveClick: function (button,event,options) {
        var view = button.up('softguardsmsgridview');
        var store = view.getStore();
        store.sync();
        notify('Los cambios se guardaron con éxito');
        
    },
    
    onItemDblClick: function(view,record,item,index,e,options){
        if (record.get('sms_imodemsms')>0 || record.get('sms_csmsparaeventos')!=''){
            this.openFormWindow('SMS',record,view,'sms', 500);
        } else if (record.get('sms_cmailparaeventos')!=''){
            this.openFormWindow('EMAIL',record,view, 'email',420);
        } else {
            this.openFormWindow('PUSH',record,view, 'push',420);        
        }
        
        
    },*/
    
    openFormWindow: function(title,record,grid,addType, heigthwin){
        var view = grid.up('softguardsmsgridview')?grid.up('softguardsmsgridview'):grid;
        if (view.profile < 2){
            notifyError('No posee derechos para esta operación');
            return false;
        }
        
        var newView = Ext.widget('smsformview',{
            record: record,
            module: view.module,
            //closeAction: 'destroy',
            addType: addType
        });
        // Lo agregamos al panel
        var myWindow = Ext.widget('window',{
            title: title,
            height: heigthwin,
            width: 500,
            modal: true, 
            items: newView,
            layout: 'fit',
            //closeAction: 'destroy',
            closable: false
        }).show();
    }
});
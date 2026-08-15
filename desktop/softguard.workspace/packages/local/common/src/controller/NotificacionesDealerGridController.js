//MIGRADO2024
Ext.define('Common.controller.NotificacionesDealerGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'NotificacionesDealerModel', 'NotificacionesDealerSearchModel' ],
    views : [ 'NotificacionesDealerGridView' ],
    init : function(config) {
        // genero los eventos
        this.control(
            {
            'notificacionesdealergridview' : {
    			afterrender : this.initView,
                itemdblclick: this.onItemDblClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                openphones: this.onOpenPhones,
                selectionchange: this.onSelectionChange
			},
            'notificacionesdealergridview #addsms': {
                click: this.onAddSmsClick
            },
            'notificacionesdealergridview #addemail': {
                click: this.onAddEmailClick
            },
            'notificacionesdealergridview #addpush': {
                click: this.onAddPushClick
            },
            'notificacionesdealergridview #delete': {
                click: this.onDeleteClick
            }
		});
	},
    
    onItemDblClick: function(view,record,item,index,e,options){
        /**
         * Si este formulario se abrio desde AdminCuentas debo bloquear el doble click
         * */
        var principalForm = view.up('tablaslineasformview');
        if (principalForm && principalForm.readOnly) {
            return false;    
        }
        this.openFormWindow('SMS',record,view,'sms', 530);        
    },
    
    onObjectEdit: function(record,view){
        this.onItemDblClick(view,record);
    },
    
    onAddEmailClick: function(button,event,options){
        var view = button.up('notificacionesdealergridview');
        var cuenta =  view.record;
        
       /* var records = view.getStore().add({
                sms_iidcuenta: cuenta.get('cue_iid'),
                sms_icodigo: null
            });*/
            
        var record = this.getNotificacionesDealerModelModel().create({
                
                tnd_cDealer: cuenta.get('lin_ccodigo')
            })
        record.set("Id",0);
        
        this.openFormWindow('EMAIL', record, view, 'email', 490);
        
    },    
    
    openFormWindow: function(title, record, grid, addType, heigthwin){
        var view = grid.up('notificacionesdealergridview')?grid.up('notificacionesdealergridview'):grid;
        if (view.profile < 2){
            notifyError('No posee derechos para esta operación');
            return false;
        }
        
        
        /**
         * Se duplica el generador de Email a uno propio para el Dealer
         * Corresponde al Controller SoftguardDealerSMSFormController
         * 
         * */
        var model = this.getNotificacionesDealerModelModel();
        if(record.getId() == 0){
                        var newView = Ext.widget('smsdealerformview',{
                            record: record,
                            closeAction: 'destroy',
                            addType: addType,
                            caller: view,
                            hideComponents: ['#tnd_iNotificarSP']
                        });
                        var myWindow = Ext.widget('window',{
                            title: title,
                            height: heigthwin,
                            width: 500,
                            modal: true, 
                            items: newView,
                            layout: 'fit',
                            closeAction: 'destroy',
                            closable: false
                        }).show();            
        }else{
            model.load(record.getId(), {
                success: function(rec, operation) {
                    
                        var newView = Ext.widget('smsdealerformview',{
                            record: rec,
                            closeAction: 'destroy',
                            addType: addType,
                            caller: view,
                            hideComponents: ['#tnd_iNotificarSP']
                        });
                        var myWindow = Ext.widget('window',{
                            title: title,
                            height: heigthwin,
                            width: 500,
                            modal: true, 
                            items: newView,
                            layout: 'fit',
                            closeAction: 'destroy',
                            closable: false
                        }).show();
            }});
        }
    },
	initView : function(view) {
        view.filters = [];  
        
        view.filters.push(
            {
                property: 'tnd_cDealer',
                value: view.record.get('lin_ccodigo')
            },{
                property: 'tnd_iTipo',
                value: 0
            }
        )
                
        if(view.type == 'MAIL') {          
            view.down('#addemail').show()
        }
        
        view.store = Ext.create('Ext.data.Store',{
            model: this.getNotificacionesDealerSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);
        
        if ( view.record.get('lin_ccodigo')!=''){
            view.store.load();
        }
        
        
       /**
         * Si este formulario se abrio desde AdminCuentas debo bloquear la toolbar
         * */
        var principalForm = view.up('tablaslineasformview');
        if (principalForm && principalForm.readOnly) {
            var docked = view.getDockedItems();
            Ext.each(docked, function(item){
                if(item.xtype == "toolbar") {
                    item.hide();
                }
            });
            view.down('actioncolumn').setVisible(false);
        }
 
	},
    
    objectChanged: function (view) {    
        view.down('pagingtoolbar').doRefresh();        
    },
    onDeleteClick : function(button, event, options) {
        var view = button.up('notificacionesdealergridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if (selection) {

            /*
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {

                rec.setConfig({
                    proxy: controller.getNotificacionesDealerModelModel().getProxy()
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
            */
           model = controller.getNotificacionesDealerModelModel();
           Ext.Array.each(selection, function (rec) {
               model.load(rec.getId(), {
                     success: function(recordToErase, operation) {
                        recordToErase.erase({
                            callback: function(record, operation){
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
                    }
                });
            });

        }		
	},
    onSelectionChange:function (model, selected, eOpts) {
           model.view.up('notificacionesdealergridview').down('[action="delete"]').setDisabled(selected.length == 0);
    }

});
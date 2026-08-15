Ext.define('AdministratorSearch.controller.NotificacionesPushDealerGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'NotificacionesPushDealerModel', 'NotificacionesPushDealerSearchModel' ],
    views : [ 'NotificacionesPushDealerGridView' ],

    init : function(config) {
        // genero los eventos
        this.control(
            {
            'notificacionespushdealergridview' : {
    			afterrender : this.initView,
                itemdblclick: this.onItemDblClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                openphones: this.onOpenPhones,
                hideAddBtn: this.hideAddBtn
			},
            'notificacionespushdealergridview #addsms': {
                click: this.onAddSmsClick
            },
            'notificacionespushdealergridview #addemail': {
                click: this.onAddEmailClick
            },
            'notificacionespushdealergridview #addpush': {
                click: this.onAddPushClick
            },
            'notificacionespushdealergridview #delete': {
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
        
        this.openFormWindow('Notificacion Push', record, view, 'push', 490);
                
    },
    
    onObjectEdit: function(record,view){
        this.onItemDblClick(view, record);
    },
    
    onAddEmailClick: function(button,event,options){
        var view = button.up('notificacionespushdealergridview');
        var cuenta =  view.record;

        var record = this.getNotificacionesPushDealerModelModel().create({
            tnd_cDealer: cuenta.get('lin_ccodigo')
        });
        record.set("Id",0);
 
        
        this.openFormWindow('Notificacion Push', record, view, 'push', 490);
        
    },    
    
    openFormWindow: function(title, record, grid, addType, heigthwin){
        var view = grid.up('notificacionespushdealergridview')?grid.up('notificacionespushdealergridview'):grid;
        if (view.profile < 2){
            notifyError('No posee derechos para esta operación');
            return false;
        }
        var controller = this;
        
        /**
         * Se duplica el generador de Email a uno propio para el Dealer
         * Corresponde al Controller SoftguardDealerSMSFormController
         * 
         * */
        
        var newView = Ext.widget('smsdealerformview',{
            record: record,
            closeAction: 'destroy',
            addType: addType,
            caller: view,
        });
        var myWindow = Ext.widget('window',{
            title: title,
            height: heigthwin,
            width: 500,
            modal: true, 
            items: newView,
            layout: 'fit',
            closeAction: 'destroy',
            closable: false,
            scrollable : true
        }).show();

    },

	initView : function(view) {
        view.filters = [];  
        
        view.filters.push({
            property: 'tnd_cDealer',
            value: view.record.get('lin_ccodigo')
        },{
            property: 'tnd_iTipo',
            value: 1
        })
                
        if(view.type == 'MAIL') {          
            view.down('#addemail').show()
        }

        view.store = Ext.create('Ext.data.Store',{
            model: this.getNotificacionesPushDealerSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore(view.store);
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(view.store);

        /**
         * BC 390792274 : Al ser la notificaion PUSH unica, se bloquea el boton Agregar dado que es 1 sola notificacion por dealer.
         */
        /*
        * se libera para saint thomas
        */

        if ( view.record.get('lin_ccodigo')!=''){
            view.store.load({callback:function (records) {
                //if(records.length>0) { view.down('#addemail').hide() } else { view.down('#addemail').show() } 
                view.down('#addemail').show();
            } });
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
        var view = button.up('notificacionespushdealergridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if (selection) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                rec.setConfig({
                    proxy: controller.getNotificacionesPushDealerModelModel().getProxy()
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
                    view.store.load({callback:function (records) {
                        if(records.length>0) { view.down('#addemail').hide() } else { view.down('#addemail').show() } 
                    } });
                }
            });
            
            },this);
        }		
	},

    hideAddBtn : function(button, event, options) {
        var controller = this;
        button.down('#addemail').hide();
    }
});
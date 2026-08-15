Ext.define('AdministratorSearch.controller.m_reportes_automaticos_dealerGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'm_reportes_automaticos_dealerGridSearchModel', 'm_reportes_automaticos_dealerGridModel' ],
    views : [ 'm_reportes_automaticos_dealerGridView' ],

    init : function(config) {
        // genero los eventos
        console.log('init en la grilla de reportes automaticos');
        this.control(
            {
            'm_reportes_automaticos_dealergridview' : {
    			afterrender : this.initView,
                itemdblclick: this.onItemDblClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                
                

			},

            'm_reportes_automaticos_dealergridview #addreport': {
                click: this.onAddReportClick
            },
            'm_reportes_automaticos_dealergridview #delete': {
                click: this.onDeleteClick
            }
		});
	},


    
    onItemDblClick: function(view,record,item,index,e,options){
        /**
         * Si este formulario se abrio desde AdminCuentas debo bloquear el doble click
         * */
        //var principalForm = view.up('m_reportes_automaticos_dealergridview');
        //if (principalForm && principalForm.readOnly) {
        //    return false;    
        //}

        this.openFormWindow('Reporte',record,view,400);        
    },
    
    onObjectEdit: function(record,view){
        this.onItemDblClick(view,record);
    },
    
    onAddReportClick: function(button,event,options){
        var view = button.up('m_reportes_automaticos_dealergridview');
        var reportesRecord =  view.record;
        
       /* var records = view.getStore().add({
                sms_iidcuenta: cuenta.get('cue_iid'),
                sms_icodigo: null
            });*/
            
        var record = this.getM_reportes_automaticos_dealerGridModelModel().create({
                Id: null,
                //tnd_cDealer: cuenta.get('lin_ccodigo')
                rad_linidkey: reportesRecord.get('Id')
            })
            
        
        this.openFormWindow('Reporte', record, view, 400);
        
    },    
    
    openFormWindow: function(title, record, grid, heigthwin){
        var view = grid.up('m_reportes_automaticos_dealergridview')?grid.up('m_reportes_automaticos_dealergridview'):grid;
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
        
        var newView = Ext.widget('mreportesautomaticosdealerformview',{
            record: record,
            closeAction: 'destroy',
            caller: view//,
            //hideComponents: ['#tnd_iNotificarSP']
        });
        var myWindow = Ext.widget('window',{
            title: title,
            height: heigthwin,
            width: 700,
            modal: true, 
            items: newView,
            layout: 'fit',
            closeAction: 'destroy',
            closable: true,
            listeners:{
                        close:function(){
                            view.getStore().load();
                        }
            }
        }).show();

    },

	initView : function(view) {
        view.filters = [];  
        
        view.filters.push(
            {
                property: 'rad_linidkey',
                value: view.record.get('Id')
            }/*,{
                property: 'tnd_iTipo',
                value: 0
            }*/
        )
                
        //if(view.type == 'MAIL') {          
        //    view.down('#addemail').show()
        //}
        
        view.store = Ext.create('Ext.data.Store',{
            model: this.getM_reportes_automaticos_dealerGridSearchModelModel(),
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
        var view = button.up('m_reportes_automaticos_dealergridview');
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if (selection.length>0) {
            view.store.remove(selection);
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each(delRec, function (rec) {
                rec.setConfig({
                    proxy: controller.getM_reportes_automaticos_dealerGridModelModel().getProxy()
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
        }else
            notifyError('Seleccione un registro de la grilla para poder eliminar');		
	}
});
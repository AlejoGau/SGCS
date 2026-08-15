//MIGRADO2024
Ext.define('Common.controller.MedicoGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Common.store.ComboObrasSocialesStore', 'Common.store.TablaMedicosStore', 'Common.store.SoftguardGeneroStore' ],
    models : [ 'MedicoInfoModel', 'TablaMedicosModel', 'Common.model.MedicoInfoSearchModel' ],
    views : [ 'MedicoInfoGridView' ],
    
    init: function (config) {
        var me=this;
        // genero los eventos
        this.control({
            'medicalinfoview button[action=delete]': {
                click: this.onDeleteClick
            },
            'medicalinfoview button[action=add]': {
                click: this.onAddClick
            },
            /*'medicalinfoview button[action=save]': {
                click: this.onSaveClick
            },*/
            'medicalinfoview':{
                beforerender: this.loadData,
                itemdblclick: this.onItemDblClick,
                refresh: this.refresh,
                selectionchange: this.onSelectionChange
            }
        });
    }, // cierro init
    
    refresh: function (view, record) {
       view.getStore().load();
    },
    loadData: function (view) {
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
        
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        var mystore =Ext.create('Ext.data.Store',{
            model: 'Common.model.MedicoInfoSearchModel',//model: 'Common.model.MedicoInfoModel',
            remoteFilter: true,
            pageSize: 1000,
            filters: [{
                /*filterFn: function(item) {

                    return (
                        item.get('mnf_iid') != "0"
                    );
                }*/
                property: "mnf_iidcuenta",
                value: record.get('cue_iid')

            }]
        });
        
        //var _ObjectId = record.get('cue_iid');
        
        // una vez que cargue el store hago el binding con la view
        mystore.load();//mystore.load({ObjectId:_ObjectId,view:view,store:mystore,callback: this.doBindStore});
        view.bindStore(mystore);
    },
    
    /*doBindStore: function(records,operation,success){
        if (success){
            operation.view.bindStore(operation.store);
        }
    },*/
    onDeleteClick: function(button,event,options){
        var view = button.up('medicalinfoview');
        var selection = view.getSelectionModel().getSelection();
        button.disable();
        if (selection.length>0) {
            var len = selection.length-1;

            var medicInfoModel = this.getMedicoInfoModelModel();

            for(var key in selection) {
                medicInfoModel.load(selection[key].get('mnf_idKey'),{
                    callback: function(recordErase){
                        recordErase.erase({
                            callback: function(record){
                                console.log(key , len);
                                if(key >= len) {
                                    var paging = view.down('pagingtoolbar');
                                    paging.doRefresh();
                                }                                 
                            }
                        });
                    }
                });

                    

            } 
        }
    },
    
    onAddClick: function(button,event,options){
        var view = button.up('medicalinfoview');
        var cuenta =  view.record;
        var store = view.getStore();
        var idcuenta =0;
	/*	
        var records = store.add({
                mnf_iidcuenta: cuenta.get('Id'),
                mnf_nsexo: 1,
                mnf_ndiscapacitado: 2,
                mnf_nambulancia: 2,
                mnf_nvivesolo: 2,
                mnf_dfechanacimiento: new Date(1900,1,1)
            });*/
        
        if (cuenta.get('ObjectTypeId') == 3045){
            idcuenta = cuenta.get('cue_iid');
        } else {
            idcuenta = cuenta.get('Id');
        }
            
        var record = this.getMedicoInfoModelModel().create({
            mnf_iidcuenta: idcuenta,
            mnf_nsexo: 1,
            mnf_ndiscapacitado: 2,
            mnf_nambulancia: 2,
            mnf_nvivesolo: 2,
            mnf_dfechanacimiento: new Date(1900,1,1)
        })
        record.set("Id",0);
        this.openFormWindow('Nueva información',record,view);
    },
    /*
    onSaveClick: function (button,event,options) {
        var view = button.up('medicalinfoview');
        var store = view.store;
        store.sync();
        notify('Los cambios se guardaron con éxito');
    },*/
    
    onItemDblClick: function(view,record,item,index,e,options){
        var model = this.getMedicoInfoModelModel()
        var controller = this;
        //5249
        model.load(record.get("mnf_idKey"),{
            callback: function(recInfo){
                controller.openFormWindow(recInfo.get('mnf_cdoctor'),recInfo,view);
            }
        });
        

        
        
    },
    
    openFormWindow: function(title,record,grid){
        var view = grid.up('medicalinfoview')?grid.up('medicalinfoview'):grid;
        if (view.profile < 2){
            notifyError('No posee derechos para esta operación');
            return false;
        }
        var newView = Ext.widget('medicoformview',{
                record: record,
                callback: this.onFormEdit,
                scope: this,
                grid: grid,
                profile: view.profile,
                caller:view
            }
        );
        // Lo agregamos al panel
        var myWindow = Ext.widget('window',{
            title: title,
            height: 400,
            width: 400,
            modal: true, 
            items: newView,
            closable: false,
            layout: 'fit'
        }).show();
    },
    onSelectionChange: function(selModel, selections){
        var grid = selModel.view;
        var view = grid.up('medicalinfoview');
        view.down('button[action=delete]').setDisabled(selections.length === 0);
    }
});
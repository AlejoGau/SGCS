Ext.define('Cuenta.controller.MedicoGridController', {
    extend : 'Ext.app.Controller',
    stores : [ 'Cuenta.store.SoftguardGeneroStore', 'Tablas.store.TablaMedicosStore' ],
    models : [ 'Cuenta.model.MedicoInfoModel', 'Cuenta.model.MedicoInfoSearchModel'],
    views : [ 'Cuenta.view.MedicoInfoGridView' ],
    

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
            'medicalinfoview button[action=save]': {
                click: this.onSaveClick
            },
            'medicalinfoview':{
                beforerender: this.loadData,
                itemdblclick: this.onItemDblClick,
                refresh: this.refresh
            }
            
        });


    }, // cierro init
    
    refresh: function (view, record) {
       this.loadData(view)
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
            model: this.getMedicoInfoSearchModelModel(),
            remoteFilter: true,
            filters: [{
                property: 'mnf_iidcuenta',
                value: record.get('cue_iid')
            }]
        });
               
        // una vez que cargue el store hago el binding con la view
        mystore.load({
            view: view,
            store: mystore,
            callback: this.doBindStore
        });
    },
    
    doBindStore: function(records,operation,success){
        if (success){
            operation.view.bindStore(operation.store);
        }
    },


    onDeleteClick: function(button,event,options){
        var view = button.up('medicalinfoview');
        var selection = view.getSelectionModel().getSelection()[0];
        if (selection) {
            view.store.remove(selection);
        }
        
    },

    onAddClick: function(button,event,options){
        var view = button.up('medicalinfoview');
        var cuenta =  view.record;
        var store = view.getStore();
	/*	
        var records = store.add({
                mnf_iidcuenta: cuenta.get('Id'),
                mnf_nsexo: 1,
                mnf_ndiscapacitado: 2,
                mnf_nambulancia: 2,
                mnf_nvivesolo: 2,
                mnf_dfechanacimiento: new Date(1900,1,1)
            });*/
        
        var record = this.getMedicoInfoModelModel().create({
                mnf_iidcuenta: cuenta.get('Id'),
                mnf_nsexo: 1,
                mnf_ndiscapacitado: 2,
                mnf_nambulancia: 2,
                mnf_nvivesolo: 2,
                mnf_dfechanacimiento: new Date(1900,1,1)
            })
                 
        record.setId(0);
        this.openFormWindow('Nueva información',record,view);
    },
    
    onSaveClick: function (button,event,options) {
        var view = button.up('medicalinfoview');
        var store = view.store;
        store.sync();

        notify('Los cambios se guardaron con éxito');
    },
    
    onItemDblClick: function(view,record,item,index,e,options){
        this.openFormWindow(record.get('mnf_cdoctor'), record, view);
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
            caller: view
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
    }

});
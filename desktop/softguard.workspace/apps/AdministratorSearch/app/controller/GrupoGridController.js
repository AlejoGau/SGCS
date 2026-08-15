Ext.define('AdministratorSearch.controller.GrupoGridController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'GrupoCuentaSearchModel', 'GrupoCuentasModel' ],
    views : [ 'GrupoGridView' ],
    

    init: function (config) {
        var me=this;
        // genero los eventos

        this.control({
            'grupogridview button[action=delete]': {
                click: this.onDeleteClick
            },
            'grupogridview button[action=add]': {
                click: this.onAddClick
            },
            'grupogridview button[action=save]': {
                click: this.onSaveClick
            },
            
            'grupogridview':{
                beforerender: this.loadData/*,
                itemdblclick: this.onItemDblClick*/
            },
            'grupogridview button[action=filterText]' : {
                click: this.onFiltertextClick
            },                    
            'grupogridview button[action=removefilter]' : {
                click: this.onRemovefilterClick
        	}
            
        });


    }, // cierro init

    loadData: function (view) {
        /*
        if (profile != '2'){
            view.down('toolbar').hide();
        }
        */
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        var mystore =Ext.create('Ext.data.Store',{
            remoteFilter: true,
            model: this.getGrupoCuentaSearchModelModel()
        });
        
        var toolbar = view.down('pagingtoolbar');
        toolbar.bindStore(mystore);
        
        view.bindStore(mystore);
        // una vez que cargue el store hago el binding con la view
        mystore.load();
    },


    onDeleteClick: function(button,event,options){
        var view = button.up('grupogridview');
        var selection = view.getSelectionModel().getSelection()[0];
        var model = this.getGrupoCuentasModelModel();
        selection.setConfig({
            proxy: model.getProxy()
        });
        if (selection) {
            view.store.remove(selection);
        }
        
    },

    
    onAddClick: function(button,event,options){
        var view = button.up('grupogridview');
        var cuenta =  view.record;
        var store = view.getStore();
    
        var records = store.add({tgc_cdescripcion: 'Nuevo grupo'});

        //this.openFormWindow('Nueva información',records[0],view);
    },
    
    onSaveClick: function (button,event,options) {
        var view = button.up('grupogridview');
        var store = view.store;
        var model = this.getGrupoCuentasModelModel();
        var oldproxy = store.model.getProxy();

        store.model.setConfig({
            proxy: model.getProxy()
        });

        store.sync({
            success: function(batch){
                    notify('Los cambios se guardaron con éxito');
                    store.model.setProxy(oldproxy);
                    store.reload();
                    
            }
        });
        
    },
    
    onItemDblClick: function(view,record,item,index,e,options){
        this.openFormWindow(record.get('mnf_cdoctor'),record,view);
    },

    
    openFormWindow: function(title,record,grid){
        var view = grid.up('grupogridview')?grid.up('grupogridview'):grid;
        if (view.profile != '2'){
            notifyError('No posee derechos para esta operación');
            return false;
        }
        var newView = Ext.widget('grupoformview',{
            record: record,
            callback: this.onFormEdit,
            scope: this,
            grid: grid
        }
        );
        // Lo agregamos al panel
        var myWindow = Ext.widget('window',{
            title: title,
            height: 400,
            width: 400,
            modal: true, 
            items: newView,
            layout: 'fit'
        }).show();
    },
    
    onFiltertextClick: function(button, event, options){
        var view = button.up('grupogridview');
        var store = view.getStore();
        var query = view.down('#query');

        store.currentPage = 1;
        store.filter('tgc_cdescripcion:LIKE',query.getValue());
    },
    
    onRemovefilterClick: function(button, event, options){
        var view = button.up('grupogridview');
        var store = view.getStore();
        store.currentPage = 1;
        store.clearFilter();
        view.down('#query').setValue('');
    }

});
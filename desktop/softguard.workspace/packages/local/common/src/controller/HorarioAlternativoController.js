//MIGRADO2024
Ext.define('Common.controller.HorarioAlternativoController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'HorarioAlternativoSearchModel', 'HorarioAlternativoModel' ],
    views : [ 'HorarioAlternativoGridView' ],
    init: function (config) {
        var me = this;
        // genero los eventos

        this.control({
            'horarioalternativogridview button[action=save]': {
                click: this.onSaveClick
            },
            'horarioview': {
                //beforerender: this.loadData
            },
			
            'horarioalternativogridview button[action=delete]': {
                click: this.onDeleteClick
            },
            'horarioalternativogridview button[action=add]': {
                click: this.onAddClick
            },
            'horarioalternativogridview': {
                //validateedit: this.validateHorario,
                itemdblclick: this.onItemDblClick,
                beforerender: this.loadData,
                refresh: this.onRefresh,
                selectionchange: this.onSelectionChange

            }
        });

    }, // cierro init
    
    onRefresh: function (view) {
        view.getStore().load()
    },

	loadData: function(view){
        var record = view.record;
        
        var module = view.module;
        var profile = module.get('profile');
        view.profile = profile;

        if (profile < 2){
            view.down('toolbar').hide();
        }
/*
       var mystore =Ext.create('Ext.data.Store',{
            model: 'DealerSearch'+'.model.HorarioModel'
        });
        
        if (record){
            var _ObjectId = record.get('cue_iid');
            // una vez que cargue el store hago el binding con la view
           // mystore.load({ObjectId:_ObjectId,view:view,store:mystore,callback: this.doBindStore});
        }*/
       var mystore =Ext.create('Ext.data.Store',{
            model: this.getHorarioAlternativoSearchModelModel(),
            remoteFilter:true,
            filters:[{
                property:'alt_iidcuenta',
                value:record.get('cue_iid')
            }]
        });
        view.bindStore(mystore);
        mystore.load()
    },
    
  /*  doBindStore: function(records,operation,success){
        if (success){
            operation.view.bindStore(operation.store);
        }
    },*/

    onDeleteClick: function(button, object, options){
        var view= button.up('horarioalternativogridview');
        var controller = this;
        button.disable();
        var selection = view.getSelectionModel().getSelection();
        /*if (selection) {

            

        
            var model = this.getHorarioAlternativoModelModel();
            model.load(selection.get("Id"),{
                callback: function(record){
                    record.erase({
                        callback: function(){
                            controller.loadData(view);
                        }
                    });
                }
            });      

            view.getSelectionModel().clearSelections();          
        }*/
        

        if (selection.length>0) {
            var len = selection.length-1;

            var model = this.getHorarioAlternativoModelModel();

            for(var key in selection) {
                model.load(selection[key].get('Id'),{
                    callback: function(recordErase){
                        recordErase.erase({
                            callback: function(record){
                                console.log(key , len);
                                if(key >= len) {
                                    view.getStore().load();
                                }                                 
                            }
                        });
                    }
                });

                    

            } 
        }        
    },
	

    onAddClick: function(button, object, options){
        var view= button.up('horarioalternativogridview');
        var cuenta = view.record;
        /*var store = view.getStore();

        var records = store.add({
            alt_iidcuenta: cuenta.get('Id')
        });*/

        var model = this.getHorarioAlternativoModelModel();
        var record = model.create({
            alt_iidcuenta: cuenta.get('Id')
        });
        record.set("Id",0);
        this.openFormWindow('Horario Alternativo',record,view);
        
    },

    onSaveClick: function (button,event,options) {
        var view = button.up('horarioalternativogridview');
        var store = view.store;
        store.sync();
        notify('Los cambios se guardaron con éxito');

    },
    
    onItemDblClick: function(view,record,item,index,e,options){
        if(view.profile>1) {
            this.openFormWindow('Horario Alternativo',record,view);
        }
    },

    
    openFormWindow: function(title,record,grid){
        var newView = Ext.widget('horarioformview',{
            record: record,
            callback: this.onFormEdit,
            scope: this,
            grid: grid,
            caller: grid
        }
        );
        // Lo agregamos al panel
        var myWindow = Ext.widget('window',{
            title: title,
            height: 200,
            width: 400,
            modal: true, 
            items: newView,
            layout: 'fit'
        }).show();
    },
    onSelectionChange: function (selModel, selections) {
        var grid = selModel.view;
        var view = grid.up('horarioalternativogridview');
        view.down('button[action=delete]').setDisabled(selections.length === 0);
    }    
});
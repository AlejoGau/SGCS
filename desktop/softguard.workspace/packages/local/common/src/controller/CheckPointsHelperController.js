//MIGRADO2024
Ext.define('Common.controller.CheckPointsHelperController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'CheckPointsMemoryModel', 'CheckPointsSearchModel', 'RoutesPointsModel' ],
    views : [ 'CheckPointsHelperView' ],
    init : function(config) {
        // genero los eventos
        this.control({
            'checkpointshelpview': {
                beforerender: this.initview
            },
            'checkpointshelpview button[action="buscar"]':{
                click: this.onBuscarClick
            },
            'checkpointshelpview button[action="save"]' : {
                click : this.onSaveClick
            },
            'checkpointshelpview button[action="todos"]' : {
                click: this.onTodosClick
            },
            'checkpointshelpview button[action="map"]' : {
            //	click : this.onMapClick
            }
            
        });
	}, // cierro init
 
    
	initview : function(view) {
        var record = view.record || null,
            grid = view.down('#gridcheckpoints');

        view.filters = [];
        if (record) {
            view.filters.push({
                property: 'cue_iid',
                value: record.get('cuentaId')
            });
        }

        if (!grid) {
            Ext.raise('CheckPointsHelperView requires a grid with itemId "gridcheckpoints".');
            return;
        }

    	var shouldLoad = false;

            if (!view.store) {
                view.store = Ext.create('Ext.data.Store', {
                    model: this.getCheckPointsSearchModelModel(),
                    pageSize: 200,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: Ext.Array.clone(view.filters)
                });
                shouldLoad = true;
            } else {
                view.store.clearFilter(true);
                if (view.filters.length) {
                    view.store.filter(Ext.Array.clone(view.filters));
                } else {
                    shouldLoad = true;
                }
            }

        grid.bindStore(view.store);

        var pagingtoolbar = grid.down('pagingtoolbar');
        if (!pagingtoolbar) {
            pagingtoolbar = Ext.create('Ext.toolbar.Paging', {
                dock: 'bottom',
                store: view.store,
                displayInfo: true
            });
            grid.addDocked(pagingtoolbar);
        } else {
            pagingtoolbar.bindStore(view.store);
        }

        if (shouldLoad) {
            view.store.load();
        }
	},
	onSaveClick : function(button, event, options) {
        var view = button.up('checkpointshelpview');
        var win = button.up('window');
        var controller = this;
        var selectionModel = view.down('#gridcheckpoints').getSelectionModel();   
        var selectedRecords = selectionModel.getSelection();
        var selectedRecordsLen = selectedRecords.length;
        var recordsToSync = [];
        var pointmodel = controller.getRoutesPointsModelModel();
        
        Ext.Array.each(selectedRecords, function(r){
            var newpoint = pointmodel.create({
                'checkpointId': r.get('chp_idKey'),
                'aftertolerance': view.down('#toleranciapost').getValue(),
                'beforetolerance': view.down('#toleranciapre').getValue(),
                'routeId':view.record.get('Id')
            });
            recordsToSync.push(newpoint);
        })
        saveSync(recordsToSync, function(){
            view.caller.fireEvent('objectchanged',view.caller,view.record);
            /** 16-11-2020 - Daniel O. Medina
             *  tarea: https://basecamp.com/2249105/projects/14758734/todos/393800986
            */
            //win.close();
            
            view.down('#gridcheckpoints').getSelectionModel().deselectAll();
            view.down('#gridcheckpoints').getStore().load();
            view.down('#toleranciapre').reset();
            view.down('#toleranciapost').reset();
            
            view.down('#textofiltro').setValue('');
            var store = view.down('#gridcheckpoints').getStore();        
            var filter = view.filters?Ext.Array.clone(view.filters):[];
            store.filters.clear(false);
            store.filter(filter);            
            /*var msgText = getLocale('%Checkpoints agregados.%');
             Ext.MessageBox.show({
                    title: getLocale('Mensaje'),
                    //buttons: Ext.MessageBox.YESNO,
                    msg: msgText
             });*/
            /*------------------------------------------------------------------------------- */            
        })
        win.close();
	},
    onBuscarClick : function(button, event, options) {
        var view = button.up('checkpointshelpview');
        var store = view.down('#gridcheckpoints').getStore();        
        var filter = view.filters?Ext.Array.clone(view.filters):[];
      
        Ext.Array.push(filter,{
            property:'zon_cdescripcion:LIKE',
            id: 'zon_cdescripcion',
            value:view.down('#textofiltro').getValue()
        })
        
        store.filter(filter);        
    },  
    onTodosClick: function(button,event, options){
        var view = button.up('checkpointshelpview');
        view.down('#textofiltro').setValue('');
        var store = view.down('#gridcheckpoints').getStore();        
        var filter = view.filters?Ext.Array.clone(view.filters):[];
        store.filters.clear(false);
        store.filter(filter);
        
    }
});
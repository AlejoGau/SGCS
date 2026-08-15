//MIGRADO2024
Ext.define('Common.controller.EventosImagesController', {
    extend: 'Ext.app.Controller',
            stores : [  ],
            models : [ 'grabacionimgSearchModel' ],
    		views : [ 'EventosImagesView' ],
    init: function () {
        // genero los eventos
        this.control({
            'eventosimagesgridview': {
                afterrender: this.loadData
            },
            'eventosimagesgridview button[action=refresh]': {
                click: this.onRefreshClick
            }
        });
    }, // cierro init
    
    loadData: function (view) {
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        var records = view.recordList;
        var idArray = [];
        var pending = 0;
        
        Ext.Array.each(records, function(record){
            if (record.get('rec_cContenido').match(/IMG|JPG/g))
                idArray.push(record.get('rec_iid'));
                pending++;
                Ext.Ajax.request({
                      url: '/handler/AgilityHandler',
                      params: { rec_iid: record.get('rec_iid'), force: 'true'},
                      method: 'GET',
                      scope: this,
                      success: function(response){
                        pending--;  
                      }
                })   
        })
        
        if (idArray.length > 0){
            var idList = idArray.join(",");
                    
            var store =Ext.create('Ext.data.Store',{
                model: this.getGrabacionimgSearchModelModel(),
                remoteFilter: true,
                filters: [{
                    property: 'gri_iidrecepcion:ININT',
                    value: idList
                    }
                ]
            });
            view.bindStore(store)
            store.load();
            
        } else {
            notifyError('No hay imágenes para mostrar');
            var win = view.up('window');
            // cerrar luego de un tiempo porque si cierra cuando aun no sibujo da errores
            Ext.Function.defer(function(){win.close()}, 100, this);
        }
    },
    
    onRefreshClick: function(button, object, options){
        var view= button.up('eventosimagesgridview');
        this.doRefresh(view);
    },
    
    doRefresh: function(view){
        if(!view){
            view = Ext.ComponentQuery.query('eventosimagesgridview')[0];
        }
        
        var _rec_iid = view.record.get('rec_iid');
        var store = view.getStore();
        
        store.load();
    }
});
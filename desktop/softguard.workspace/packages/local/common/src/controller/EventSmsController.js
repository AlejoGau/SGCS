//MIGRADO2024
Ext.define('Common.controller.EventSmsController', {
    extend: 'Ext.app.Controller',
            stores : [  ],
            models : [ 'EventSmsSearchModel' ],
        	views : [ 'EventSmsGridView' ],
    init: function () {
        // genero los eventos
        this.control({
            'eventsmsgridview': {
                afterrender: this.loadData
            },
            'eventsmsgridview button[action=refresh]': {
                click: this.onRefreshClick
            }
        });
    }, // cierro init
    
    loadData: function (panel) {
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        var mystore =Ext.create('Ext.data.Store',{
            model: this.getEventSmsSearchModelModel()
        });
        
        var record = panel.record;
        if (record){
            var _rec_iid = panel.record.get('rec_iid');
            
            // una vez que cargue el store hago el binding con la view
            mystore.load({rec_iid:_rec_iid,store:mystore,panel:panel,callback: this.doBindStore});
        }
        
    },
    
    doBindStore: function(records,operation,success){
        if (success){
            var view = operation.panel;
            view.bindStore(operation.store);
            
            var timeline = view.up('tabpanel').down('eventotimelinegridview');
            
            Ext.Array.each(records, function(record){
                timeline.store.add({
                    fecha: record.get('rec_isoFechaHora'),
                    usuario: record.get('ope_cnombre'),
                    comentario: record.get('rec_cObservaciones'),
                    iconCls: 'icon-email'
                });
            })
        }
    },
    
    onRefreshClick: function(button, object, options){
        var view= button.up('eventsmsgridview');
        this.doRefresh(view);
    },
    
    doRefresh: function(view){
        if(!view){
            view = Ext.ComponentQuery.query('eventsmsgridview')[0];
        }
        
        var _rec_iid = view.record.get('rec_iid');
        var store = view.getStore();
        
        store.load({
            rec_iid:_rec_iid,
            store:store,
            panel:view
        });
    }
});
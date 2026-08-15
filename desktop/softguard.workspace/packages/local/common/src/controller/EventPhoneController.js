//MIGRADO2024
Ext.define('Common.controller.EventPhoneController', {
    extend: 'Ext.app.Controller',
    stores : [  ],
    models : [ 'EventoTimeLineFullSearchModel', 'EventPhoneSearchModel', 'EventoTimelineModel' ],
    views : [ 'EventPhoneGridView', 'TimelineFormView' ],
    init: function () {
        // genero los eventos
        this.control({
            'eventphonegridview': {
                afterrender: this.loadData,
                itemdblclick: this.onItemClick,
                refresh: this.onRefresh
                
            }
        });
    }, // cierro init
    onRefresh: function (view) {
        view.mystore.load({rec_iid:view.record.get('rec_iid'),store:view.mystore,panel:view,callback: this.doBindStore});
    },
    
    onItemClick: function(view,record){
        var tlrecord = Ext.create(this.getEventoTimeLineFullSearchModelModel(),{
            ope_clogin: record.get('ope_cnombre'),
            etl_tFechaHora: record.get('rec_isoFechaHora'),
            etl_cObservacion: record.get('rec_cObservaciones')
        })
        
        var timelineform = Ext.widget('timelineformview',{
            record: tlrecord
        })
        
        Ext.widget('window',{
            title: 'Procesamiento',
            width: 400,
            height: 400,
            layout: 'fit',
            items: timelineform
        }).show();
        
        timelineform.loadRecord(tlrecord);
    }, // cierro init
    
    loadData: function (panel) {
        if(panel.initStore) {
            panel.bindStore(panel.initStore);
            panel.mystore = panel.initStore; 
            
        } else {
            // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
            panel.mystore =Ext.create('Ext.data.Store',{
                model: this.getEventPhoneSearchModelModel()
            });
            
            var record = panel.record;
            if (record){
                var _rec_iid = panel.record.get('rec_iid');
                
                // una vez que cargue el store hago el binding con la view
                panel.mystore.load({rec_iid:_rec_iid,store:panel.mystore,panel:panel,callback: this.doBindStore});
            }
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
                    iconCls: 'icon-telephone'
                });
            })
        }
    }
});
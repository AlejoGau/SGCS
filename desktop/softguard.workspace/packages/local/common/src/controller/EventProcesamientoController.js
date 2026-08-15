//MIGRADO2024
Ext.define('Common.controller.EventProcesamientoController', {
    extend: 'Ext.app.Controller',
            stores : [ 'Common.store.EventoProcesamientoStore' ],
            models : [ 'EventProcesamientoSearchModel' ],
        	views : [ 'EventProcesamientoGridView' ],
    init: function () {
        // genero los eventos
        this.control({
            'eventprocesamientogridview': {
                afterrender: this.loadData
            },
            'eventprocesamientogridview button[action=refresh]': {
                click: this.onRefreshClick
            }
        });
    }, // cierro init
    
    loadData: function (panel) {
         if(panel.initStore) {
            panel.bindStore(panel.initStore);
            
        } else {
            // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
            var mystore =Ext.create('Ext.data.Store',{
                model: this.getEventProcesamientoSearchModelModel()
            });
            
            var record = panel.record;
            if (record){
                var _rec_iid = panel.record.get('rec_iid');
                
                // una vez que cargue el store hago el binding con la view
                mystore.load({rec_iid:_rec_iid,store:mystore,panel:panel,callback: this.doBindStore});
            }
        }
        
    },
    
    doBindStore: function(records,operation,success){
        if (success){
            var view = operation.panel;
            var timeline = view.up('tabpanel').down('eventotimelinegridview');
            var store = Ext.data.StoreManager.lookup('EventoProcesamientoStore');
            
            Ext.Array.each(records, function(record){
                
                var text = '';
                var proc = store.findRecord('Value', record.get('pro_nProceso'));
                if (proc)
                    record.set('pro_cProceso',proc.get('Name'));
                /*
                timeline.store.add({
                    fecha: record.get('pro_isofechahora'),
                    usuario: record.get('ope_cnombre'),
                    comentario: record.get('pro_cProceso'),
                    iconCls: 'icon-cog'
                });
                */
            })
            
            view.bindStore(operation.store);
        }
    },
    
    onRefreshClick: function(button, object, options){
        var view= button.up('eventprocesamientogridview');
        this.doRefresh(view);
    },
    
    doRefresh: function(view){
        if(!view){
            view = Ext.ComponentQuery.query('eventprocesamientogridview')[0];
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
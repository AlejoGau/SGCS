//MIGRADO2024
Ext.define('Common.controller.EventObservacionesController', {
    extend: 'Ext.app.Controller',
            stores : [  ],
            models : [ 'EventoTimeLineFullSearchModel', 'EventObservacionesSearchModel', 'EventoTimelineModel' ],
    		views : [ 'EventObservacionesGridView', 'TimelineFormView' ],
    init: function () {
        // genero los eventos
        this.control({
            'eventobservacionesgridview': {
                afterrender: this.loadData,
                itemdblclick: this.onItemClick,
                refresh: this.onRefresh
            }
        });
    }, // cierro init3
    onRefresh: function (view) {
        var record = view.record;
        var _rec_iid = view.rec_iid;
        view.initStore.load({rec_iid:_rec_iid,store:view.mystore,panel:view,controller: this,callback: this.doBindStore});
    },
    
    
    onItemClick: function(view,record){
        
        var timelineform = Ext.widget('timelineformview',{
            record: record
        })
        
        Ext.widget('window',{
            title: 'Observaciones',
            width: 400,
            height: 400,
            layout: 'fit',
            items: timelineform
        }).hide();
        
        //timelineform.loadRecord(record);
        timelineform.down('#etl_cObservacion').setValue(record.get('comentario'))
        timelineform.down('#ope_clogin').setValue(record.get('usuario'))
        timelineform.down('#etl_tFechaHora').setValue(record.get('fecha'))
        
    }, // cierro init
    
    loadData: function (panel) {
        
         var _rec_iid = panel.rec_iid;
         
         
         
         var now = new Date();       
         var fechaRecepcion = new Date(panel.record.get('rec_isoFechaHora'));  // dedalo, camboi por fechahora porque los eventos internos no tienen fecha recepcion
         //si estamos en el mismo mes y año lo mando a p_recepcion
         if(fechaRecepcion.getMonth() == now.getMonth() && fechaRecepcion.getFullYear() == now.getFullYear()) {
             var table = 'p_recepcion'
         } else {
             var table = 'p_recepcion'+fechaRecepcion.getFullYear()+''+Ext.String.leftPad(fechaRecepcion.getMonth()+1, 2, '0');
         }
         
        
        if(panel.initStore) {
            var record = panel.record;
            panel.initStore.proxy.extraParams = {
                table:table
            };
            panel.initStore.load({rec_iid:_rec_iid,store:panel.mystore,panel:panel,controller: this,callback: this.doBindStore});
            
        } else {
            // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
            panel.mystore =Ext.create('Ext.data.Store',{
                model: this.getEventObservacionesSearchModelModel()
            });
            panel.mystore.proxy.extraParams = {
                table:table
            };
            var record = panel.record;
            if (record){
                var _rec_iid = panel.record.get('rec_iid');
                // una vez que cargue el store hago el binding con la view
                panel.mystore.load({rec_iid:_rec_iid,store:panel.mystore,panel:panel,controller: this,callback: this.doBindStore});
            }
        } 
        
        
        /*panel.mystore =Ext.create('Ext.data.Store',{
                model: this.getEventoTimeLineFullSearchModelModel()
            });
            
        panel.mystore.proxy.extraParams = {IdEvento:_rec_iid};
        panel.mystore.load({store:panel.mystore,panel:panel,controller: this,callback: this.doBindStore});
        */
        
        
    },
    
    doBindStore: function(records,operation,success){
        
        
        Ext.Array.each(records, function (record) {
            
        /*   if(record.get('etl_cAccion') == 'IngresoComentarios' || record.get('etl_cAccion') == 'Procesamiento') {
                if (record.get('etl_cObservacion').length == 0)
                    return false   */
                    
                if (record.get('cObs') && record.get('cObs')!=' ') {
                        var store = operation.store;
                        var view = operation.panel;
                        var comments = record.get('cObs').split('r[');
                        Ext.Array.each(comments, function(comment){
                            var found = comment.match(/[(.*?)] [(.*?)] ([Ss.]*)/);
                            if (!new RegExp("/[(.*?)] [(.*?)] ([Ss.]*)/").test(comment)){
                                found = comment.match(/\[(.*?)\] \[(.*?)\] (.*)/);
                            }
                            if (found){
                                
                                var fechaString = found[1].replace('[','').replace(']','')
                                
                                var fecha = Ext.Date.parse(fechaString,'d/m/Y H:i');
                                if(!fecha) {
                                    fecha = Ext.Date.parse(fechaString,'M d Y g:iA');
                                }
                                if(!fecha) {
                                    fecha = Ext.Date.parse(fechaString,'d/m/Y H:i:s');
                                }
                                
                                //fecha = Ext.Date.format(fecha,'d/m/y g:i');
                               // var fecha = Ext.Date.parse(timestamp,'d/m/Y H:i:s');//found[1];// Ext.Date.parse(found[1],'d/m/Y H:i:s');
                                var usuario = found[2];
                                var comentario = found[3];
                                
                                view.store.add({
                                    fecha : fecha,
                                    usuario : usuario,
                                    comentario : comentario
                                });
                            }
                            
                        });
                       /* view.store.add({
                                    fecha : record.get('etl_tFechaHora'),
                                    usuario : record.get('ope_clogin'),
                                    comentario : record.get('etl_cObservacion')
                                });*/
                        
                 }
                    
                
           // }
        })
        
        
       /* if (success && records.length >0){
            var record = records[0];
            
            if (record.get('cObs').length == 0)
                return false
            
            if (record.get('cObs') && record.get('cObs')!=' ') {
                var store = operation.store;
                var view = operation.panel;
                var comments = record.get('cObs').split('\r\[');
                Ext.Array.each(comments, function(comment){
                    var found = comment.match(/(.*?)\] \[(.*?)\] ([\S\s.]*)/);
                    if (found){
                        
                        var fecha = Ext.Date.parse(found[1],'d/m/Y H:i');
                        if(!fecha) {
                            fecha = Ext.Date.parse(found[1],'M d Y g:iA');
                        }
                        if(!fecha) {
                            fecha = Ext.Date.parse(found[1],'d/m/Y H:i:s');
                        }
                        
                        //fecha = Ext.Date.format(fecha,'d/m/y g:i');
                       // var fecha = Ext.Date.parse(timestamp,'d/m/Y H:i:s');//found[1];// Ext.Date.parse(found[1],'d/m/Y H:i:s');
                        var usuario = found[2];
                        var comentario = found[3];
                        
                        view.store.add({
                            fecha : fecha,
                            usuario : usuario,
                            comentario : comentario
                        });
                    }
                    
                });
         }
        }*/
    }
});
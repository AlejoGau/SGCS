//MIGRADO2024
Ext.define('Common.controller.EventRepAutController', {
    extend: 'Ext.app.Controller',
            stores : [  ],
            models : [  ],
        	views : [ 'EventRepAutoGridView' ],
    init: function () {
        // genero los eventos
        this.control({
            'eventorepautgridview': {
                afterrender: this.loadData
            }
        });
    }, // cierro init
    
    loadData: function (panel) {
        var record = panel.record;
        if (record){
            var _rec_iid = panel.record.get('rec_iid');
            Ext.Ajax.request({
                  url: '/Rest/search/TimelineQ8',
                  params: {IdEvento: _rec_iid},
                  method: 'GET',
                  scope: this,
                  success: function(response){
                    var reporte = Ext.JSON.decode(response.responseText).rows[0];
                    
                    if (!reporte)
                        return false
                    
                    var estados = reporte.rep_mcomentario.split('\r\n');
                    var autoridad = reporte.aut_cnombre;
                    var timeline = panel.up('tabpanel').down('eventotimelinegridview');
            
                    Ext.Array.each(estados, function(estado){
                        var found = estado.match(/\[(..\/..\/.{4} ..:..:..) (.*?)\] (.*)/);
                        //19/09/2012 09:41:26
                        
                        if (found){
                            var fecha = Ext.Date.parse(found[1],'d/m/Y H:i:s');
                            var estado = found[2];
                            var comentario = found[3];
                            
                            panel.store.add({
                                fecha : fecha,
                                estado : estado,
                                autoridad: autoridad,
                                comentario : comentario
                            });
                        }
                        
                        
                        /*
                        timeline.store.add({
                            fecha: fecha,
                            usuario: autoridad,
                            comentario: '['+estado+'] '+comentario,
                            iconCls: 'icon-shield'
                        });
                        */
                    });
                  }
            });
        }
        
        
        
    },
    
    doBindStore: function(records,operation,success){
        if (success && records.length >0){
            var record = records[0];
            
            if (record.get('cObs').length = 0)
                return false
            
            var comments = record.get('cObs').split('\r');
            var store = operation.store;
            var view = operation.panel;
            
            var timeline = view.up('tabpanel').down('eventotimelinegridview');
            
            Ext.Array.each(comments, function(comment){
                var found = comment.match(/\[(.*?)\] \[(.*?)\] (.*)/);
                
                var fecha = Ext.Date.parse(found[1],'d/m/Y H:i:s');
                var usuario = found[2];
                var comentario = found[3];
                
                view.store.add({
                    fecha : fecha,
                    usuario : usuario,
                    comentario : comentario
                });
                
                timeline.store.add({
                    fecha: fecha,
                    usuario: usuario,
                    comentario: comentario,
                    iconCls: 'icon-book-open'
                });
            });
        }
    }
});
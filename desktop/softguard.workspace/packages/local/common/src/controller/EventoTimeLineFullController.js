//MIGRADO2024
Ext.define('Common.controller.EventoTimeLineFullController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'EventoTimeLineFullSearchModel' ],
    views : [ 'EventoTimeLineFullView' ],
    init : function(config) {
        // genero los eventos
        this.control({
            'eventotimelinefullgridview' : {
                afterrender : this.initView,
                objectchanged : this.objectChange,
                itemdblclick: this.onItemClick
    		},
            'eventotimelinefullgridview #refresh' : {
                click : this.onRefreshClick
            }
		});
	}, // cierro init
    
    onRefreshClick: function (btn) {
        var view = btn.up('eventotimelinefullgridview')
        
        view.noSwitchView = true
        this.objectChange(view)
    },
    
    initView: function(view){
        var record = view.record;
        // Agrego la consulta de Tabla Historica de TimeLine en base a lo filtrado en el Combo
        var table = view.table;
        if(view.showMaximizer != false) { 
            view.down('#maximizer').show()    
            view.showMaximizer = false
        } else {
            //escondo el header para que no quede feo
            view.getHeader().hide();
        }
        var nombreEvento = '['+record.get('rec_calarma') +  ' - ' +record.get('cod_cdescripcion')+']';
        var mystore = Ext.create('Ext.data.Store',{
            model: this.getEventoTimeLineFullSearchModelModel(),
            autoDestroy: true,
            remoteFilter:true
        })
        view.bindStore(mystore);
        
        // Agrego el parámetro a la URL de Consulta del SP [EventoTimeLineFullSearch] de table= en base a lo que tenga el combo de Tabla Historica
        /**
         * 29/10/2018 ADRIAN
         * Saque el parametro //,table:table por que no estaba trayendo los timeline, 
         * pero cuando no se pasaba este parametro funcionaba todo bien
         * 
         * 
         * 27/11/2018
         * Se agrega NUEVAMENTE el envío del parámetro table, en base al combo de tabla historica seleccionado
         * Para poder hacer la consulta en la tabla historica de TimeLineYYYYMM en el SP EventoTimeLineFullSearch
         * Al quitarlo, no se consultan tablas historicas y no figuran los TimeLines de los eventos
         * 
         */
        mystore.load({params:{IdEvento:view.record.get('rec_iid'), table:table}}); 
         
       
    },
    objectChange: function (view) {
      if(view.noSwitchView){
            var timeline = view;  
        } else {
            var timeline = view.view;  
        }
      
      if(timeline.getStore().storeId != 'ext-empty-store') {
        timeline.getStore().load({params:{IdEvento:view.record.get('rec_iid')}, callback:function () {}})
      }
    },
    onItemClick: function(view,record){
        var timelineform = Ext.widget('timelineformview',{
            record: record
        })
        
        Ext.widget('window',{
            title: 'Procesamiento',
            width: 500,
            height: 400,
            layout: 'fit',
            items: timelineform
        }).show();
        
        timelineform.loadRecord(record);
    }
});
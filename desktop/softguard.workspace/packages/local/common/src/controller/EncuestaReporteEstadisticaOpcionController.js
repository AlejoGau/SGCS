

Ext.define('Common.controller.EncuestaReporteEstadisticaOpcionController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'p_encuesta_preguntaSearchModel', 'EncuestaReporteEstadisticaOpcionSearchModel' ],
    views : [ 'EncuestaReporteEstadisticaOpcionView', 'EncuestaReporteEstadisticaOpcionChartView' ],
    //requires: ['Ext.chart.Cartesian'],
        
    init : function(config) {
        // genero los eventos
        this.control({
    		'encuestasestadisticaopcionview' : {
				afterrender : this.initview
			}
    				
        });
	}, // cierro init

    initview : function(view) {
        var graph = view.down('#grafico');
        var encuesta = view.up('encuestaview').down('encuestasformview').record; // El record viene de la solapa principal, correspondiente a la Encuesta consultada
        var controller = this;
        console.log('Ingresando a EncuestaReporteEstadisticaOpcionController');
        /**
         * El grafico se genera en base al Ajax.Request de Preguntas de la encuesta abrierta.
         * Cada pregunta por medio de su Id, filtrará el Store de datos que llama al Stored Procedure SearchReporteEncuestaPorOpcion
         * De este se obtendran las opciones especificas a cada pregunta y se hara un .add(chart) para cada una.
         */
         
        
        /**
         * Creo el Store de Datos con el modelo pertinente a las preguntas p_encuesta_preguntaSearchModel
         * Lo filtro por el Id de encuesta obtenida en la variable encuesta
         * Por cada record, traigo las respuestas brindadas
         * Por cada pregunta, grafico lo correspondiente
         */
        var pregId = [];
        var preguntasDeLaEncuesta = Ext.create('Ext.data.Store',{ 
            model: this.getP_encuesta_preguntaSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            sorters : [{
                property : 'epg_name',
                value : 'DESC'
            },{
                property : 'epg_idkey',
                value : 'DESC'
            }],
            filters: [{
                property: "epg_encidkey",
                value: encuesta.get('Id')
            }]
        }).load({callback: function(records){
            
            /**
             * Obtuve las preguntas de la encuesta
             * Filtro el Store de Respuestas por el Id de cada pregunta obteniendo sus respuestas.
             * 
             */
            
            records.forEach(function(record) {

                var respuestasStore = Ext.create('Ext.data.Store',{
                    model: controller.getEncuestaReporteEstadisticaOpcionSearchModelModel(),
                    pageSize: 500,
                    remoteSort: true,
                    remoteFilter: true,
                    filters: [{
                        property: "epg_idkey",
                        value: record.get('Id')
                    }]
                }).load();
                
                /**
                 * Realizo un grafico con la información de respuestas por cada pregunta
                 * ToDo : Pasar a elemento Widget y volver a utilizar la view EncuestaReporteEstadisticaOpcionChartView
                 * 
                 */
                
                var chart = Ext.create('Ext.chart.CartesianChart', {
                    animate: true,
                    store: respuestasStore,
                    width : 750,
                    height : 300,
                    axes: [{
                        title: getLocale('Cantidad'),
                        type: 'numeric',
                        position: 'left',
                        fields: ['Cantidad']
                    },
                    {
                        title: record.get('epg_name'),
                        type: 'category',
                        position: 'bottom',
                        fields: ['NombreOpcion']
                    }],
                    series: [{
                        type: 'bar',
                        axis : 'left',
                        xField: 'NombreOpcion',
                        yField: 'Cantidad'
                    }]
                });
                graph.add(chart);
                
                

            })
        }})    
        
    }
});

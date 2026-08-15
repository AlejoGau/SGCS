Ext.define('Common.controller.EncuestaReporteNoCompletasController', {
    extend : 'Ext.app.Controller',
    stores : [  ],
    models : [ 'EncuestaReporteNoCompletasSearchModel' ],
    views : [ 'EncuestaReporteNoCompletasView' ],

    init : function(config) {
        // genero los eventos

        this.control({
    		'encuestasnocompletasview' : {
				afterrender : this.initview
			}
    				
        });
	}, // cierro init

    initview : function(view) {
        var graph = view.down('#grafico');
        var encuesta = view.up('encuestaview').down('encuestasformview').record; // El record viene de la solapa principal, correspondiente a la Encuesta consultada
        var controller = this;
        
        /**
         * El grafico se genera en base al Ajax.Request al SP p_encuesta_estadoFinalCheck por medio del Model .
         * Cada encuesta traerá sus 3 estados disponibles
         * 0 Pendiente de realizar
         * 1 La inicio y no la finalizo 
         * 2 Finalizada
         * 
         */
         
         /**
         * Creo el Store de Datos con el modelo pertinente al estado de la encuesta.
         * Lo filtro por el Id de encuesta obtenida en la variable encuesta
         */
        var estadoFinalEncuesta = Ext.create('Ext.data.Store',{ 
            model: this.getEncuestaReporteNoCompletasSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            filters: [{
                property: "enr_encidkey",
                value: encuesta.get('Id')
            }]
        }).load();
        
        /**
         * Realizo un grafico con la información de respuestas por cada pregunta
         * ToDo : Pasar a elemento Widget y volver a utilizar la view EncuestaReporteEstadisticaOpcionChartView
         * 
         */
         var chart = Ext.create('Ext.chart.PolarChart', {
            reference: 'chart', 
            width: 760,
            height: 500,
            animate: true,
            store: estadoFinalEncuesta,
            series: [{
                type: 'pie',
                angleField: 'cantidad',
                showInLegend: true,
                tips: {
                    trackMouse: true,
                    width: 180,
                    height: 28,
                    renderer: function(storeItem, item) {
                        // calculate and display percentage on hover
                        var total = 0;
                        estadoFinalEncuesta.each(function(rec) {
                            total += rec.get('cantidad');
                        });
                        this.setTitle(storeItem.get('estado') + ': ' + Math.round(storeItem.get('cantidad') / total * 100) + '%');
                    }
                },
                highlight: {
                    segment: {
                        margin: 20
                    }
                },
                label: {
                    field: 'estado',
                    display: 'rotate',
                    contrast: true,
                    font: '12px Arial',
                    hideLessThan: 18
                },
                showInLegend: true
                
            }],
            legend: {
    			type: 'dom',
				position: 'right'
			}

         });
         graph.add(chart);
        
    }
});

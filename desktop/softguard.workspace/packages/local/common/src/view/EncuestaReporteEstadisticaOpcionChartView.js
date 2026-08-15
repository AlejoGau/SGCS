//MIGRADO2024
Ext.define('Common.view.EncuestaReporteEstadisticaOpcionChartView', {
    extend : 'Ext.chart.Chart',
    alias : 'widget.encuestasestadisticaopcionchartview',
    
    animate: true,
    store : [],
    
    axes: [
        {
            title: 'Cantidad',
            type: 'Numeric',
            position: 'left',
            fields: ['Cantidad'],
            minimum: 0,
            maximum: 100
        },
        {
            title: 'Pregunta',
            type: 'string',
            position: 'bottom',
            fields: ['NombreOpcion']
        }
    ]
    
});
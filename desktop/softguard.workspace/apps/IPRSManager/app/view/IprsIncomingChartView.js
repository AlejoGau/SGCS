Ext.define('IPRSManager.view.IprsIncomingChartView', {
    extend : 'Ext.chart.CartesianChart',
    alias : 'widget.iprsincomingchartview',

    width: '100%',
    height: '100%',

    legend: {
        type: 'dom',
        width: 300,
        docked: 'right',
        scrollable: 'y',
        tpl: [
            '<div class="IprsManager ', Ext.baseCSSPrefix, 'legend-inner">', // for IE8 vertical centering 
                '<div class="IprsManager ', Ext.baseCSSPrefix, 'legend-container">',
                    '<tpl for=".">',
                        '<div class="IprsManager ', Ext.baseCSSPrefix, 'legend-item">',
                            '<span ',
                                'class="IprsManager ', Ext.baseCSSPrefix, 'legend-item-marker {[ values.disabled ? Ext.baseCSSPrefix + \'legend-item-inactive\' : \'\' ]}" ',
                                'style="background:{mark};">',
                            '</span>{name}',
                        '</div>',
                    '</tpl>',
                '</div>',
            '</div>'
        ],
        blockRefresh: false
    },
    axes: [
        {
            type: 'numeric',
            grid: true,
            position: 'left',
            minimum: 0,
            title: getLocale('Paquetes recibidos')
        }, {
            type: 'numeric',
            grid: false,
            fields: ['valorX'],
            position: 'bottom',
            title: getLocale('Segundos'),
            renderer : function () {
                return '';
            }
        }
    ],
    series: [/*{
        type: 'area',
        title: 'Segundos',
        xField: 'xValue',
        yField: 'yValue'
    }*/]
});
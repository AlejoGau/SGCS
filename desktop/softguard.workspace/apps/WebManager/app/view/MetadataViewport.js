Ext.define('WebManager.view.MetadataViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.viewport',
    id: 'viewport',
    layout: 'border',
    requires: [
        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Area',
        'Ext.chart.series.Pie',
        'Ext.chart.series.Line',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.CartesianChart',
        'Ext.chart.PolarChart',
        'Ext.chart.series.Bar',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.tip.ToolTip'
    ],
    items: [
        
        
        
        
        
            {
                xtype: 'webmanagermainview',
                id: 'center',
                itemId: 'center',
                region: 'center'
            }
        
    ]
});
Ext.define('IPRSManager.view.IprsMonitorView', {
    extend : 'Ext.panel.Panel',
    alias : ['widget.iprsmonitorview'],
    translate:false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
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
            xtype:'panel',
            items: [
                
                {
                    xtype: 'iprsincomingchartview',
                    itemId:'grafico',
                    height: 300        
                }
            ]
        },{
            xtype:'tabpanel',
            flex:1,
            items: [
                {xtype:'iprseventgridview', itemId:'eventos'},
                {xtype:'iprscommgridview', itemId:'comm'},
                {xtype:'iprseventgridview', title: 'Buffer', itemId:'buffer'}
            ]
        }
     ],
     initComponent: function () {                
        this.callParent(arguments);   
        this.down('#eventos').record = this.record;
        this.down('#buffer').record = this.record;
     }
});
//MIGRADO2024
Ext.define('Common.view.EncuestaReporteNoCompletasView', {
    extend : 'Ext.panel.Panel',
    alias : 'widget.encuestasnocompletasview',
    
    translate:false,
    
    autoScroll : true,
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    requires: [
        'Ext.draw.Component',
        'Ext.draw.Surface',
        'Ext.chart.Chart',
        'Ext.chart.series.Pie',
        'Ext.tip.ToolTip'
    ],
    
    items: [
        {
            xtype: 'panel',
            itemId:'grafico',
            padding: 20,
            border : false,
            items : []
        }        
    ],
    
    initComponent: function () {
        this.callParent(arguments);
        console.log(this);
        
    }
});
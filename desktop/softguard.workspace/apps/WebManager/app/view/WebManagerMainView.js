Ext.define('WebManager.view.WebManagerMainView', {
    extend: 'Ext.tab.Panel',
    alias : 'widget.webmanagermainview',
    
    requires: [     
        'Ext.chart.CartesianChart',
        'Ext.chart.PolarChart',

        'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category',
        'Ext.chart.series.Polar',
        'Ext.chart.series.Bar',
        'Ext.chart.series.Area',
        'Ext.chart.series.Pie',
        'Ext.chart.series.Line',
        
        /* Graficos en 3D */
        'Ext.chart.series.Bar3D',
        'Ext.chart.series.Pie3D',
        'Ext.chart.axis.Numeric3D',
        'Ext.chart.axis.Category3D',
        'Ext.chart.grid.HorizontalGrid3D',
        'Ext.chart.grid.VerticalGrid3D',
        'Ext.draw.gradient.Radial',
        'Ext.draw.gradient.Linear',
        'Ext.draw.PathUtil',
        
        /* Interacciones */
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.tip.ToolTip'
        
        
        
    ],
    
    ui: 'navigation',
    cls: 'exec-menu-navigation',
    
    /*
     * Coloco en posición 'left' el tabBar para que se visualice arriba de todo y se dibuje a la izquierda.
     * Dejo la tabRotation en 0 para no girar el texto
     */
    tabPosition: 'left',
    tabRotation: 0,
    
    /*
     * Importo los default del template original
     */
    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },
    
    defaults: {
        tabConfig: {
            //plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left',
                    flex: 0
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    flex: 1
                },
                'width < 768 && tall': {
                    visible: false
                },
                'width >= 768': {
                    visible: true
                }
            }
        }
    }
    
});
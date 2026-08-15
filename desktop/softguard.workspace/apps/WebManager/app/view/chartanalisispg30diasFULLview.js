Ext.define('WebManager.view.chartanalisispg30diasFULLview', {
    extend : 'Ext.chart.PolarChart',
    alias : 'widget.chartanalisispg30diasFULLview',
       
    interactions: ['itemhighlight', 'rotate'],
            
    /* ajusto el padding para que no se corte el grafico */
    insetPadding: '30 0 30 0',
    innerPadding: 40,
    height: '100%',
    width: '100%',

    series: [{
        type: 'pie',
        angleField: 'cantidad',
        colors: coloresvarios(),
        label: {
            field: 'label',
            display: 'outside',
            font: 10,
            calloutLine: {
                length: 40
            }
        },
        highlight: {
          segment: { margin: 20 }
        },
        tooltip: {
            trackMouse: true,
            style: 'background: #fff',
            renderer: function(tt, storeItem, item) {
                tt.setHtml(storeItem.get('descripcion') + ': ' + storeItem.get('cantidad'));
            }
        },
        showInLegend: true,
        donut: 20
    }],
    
    //configure the legend.
    legend: {
        type: 'dom',
        width: 300,
        docked: 'right',
        scrollable: 'y',
        blockRefresh: false
    },
    
    listeners: {
        refreshData: function() {
            this.getStore().reload();
        }
    },

    initComponent: function () {
        this.callParent(arguments);
        
        var myModel = Ext.define('chartanalisispg30diasModel', {
            extend: 'Ext.data.Model',
            fields: [
                'puerto',
                {name: 'cantidad',type: 'int'},
                'descripcion',
                {name: 'label',type: 'string', convert:function(newValue, model){
                    var result = model.get('descripcion') + ':  ' + model.get('cantidad');
                    return result;
                }}
            ]        
        });
        
        var myStore = Ext.create('Ext.data.Store', {
            alias: 'store.chartanalisispg30dias',
    
            model: myModel,
            remoteFilter: true,
        
            proxy: {
                type: 'rest',
                reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
                },
                url: '/Rest/search/AnalisisPG30Dias'
            } 
        });
        
        this.bindStore(myStore);
        myStore.load();
    }
});
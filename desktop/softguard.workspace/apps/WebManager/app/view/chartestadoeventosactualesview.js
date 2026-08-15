Ext.define('WebManager.view.chartestadoeventosactualesview', {
    extend : 'Ext.chart.PolarChart',
    alias : 'widget.chartestadoeventosactualesview',
                           
    interactions: ['rotate'],
    
    /* ajusto el padding para que no se corte el grafico */
    insetPadding: 30,
    innerPadding: 20,                 

    series: [{
        type: 'pie3d',
        angleField: 'cantidad',
        colors: coloresvarios(),
        label: {
            field: 'label',
            display: 'none'
        },
        highlight: {
          segment: { margin: 20 }
        },
        tooltip: {
            trackMouse: true,
            style: 'background: #fff',
            renderer: function(tt, storeItem, item) {
                tt.setHtml(storeItem.get('situacion') + ': ' + storeItem.get('cantidad'));
            }
        },
        showInLegend: true,
        distortion: 0.6,
        Thickness: 2,
        donut: 30, 
        style: {
            bevelWidth : 10,
            colorSpread : 2
        }
    }],
    
    //configure the legend.
    legend: {
        type: 'dom',
        docked: 'bottom',
        scrollable: 'x',
        blockRefresh: false
    },
    
    listeners: {
        refreshData: function() {
            this.getStore().reload();
        },
        loadHelp: function() {
            var t = this;
            //soporta keyhelp es para definir a mano una key
            var alias = '';
            if(this.keyHelp){
                alias = this.keyHelp;
            } else {
                alias = Ext.ClassManager.getAliasesByName(Ext.getClass(this).getName())[0].replace('widget.',''); 
            }
            
            //defino idioma
            var Language = 'es-ar';
            if (myQueryString.Language){
                Language = myQueryString.Language;
            } else if (_UserData && _UserData.metadata && _UserData.metadata.language){
                Language=_UserData.metadata.language;
            }
            
            helpWebmanger(t, alias, Language);
        }
    },

    initComponent: function () {
        this.callParent(arguments);
        
        var myModel = Ext.define('chartestadoeventosactualesModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'cantidad',type: 'int'},
                'situacion',
                {name: 'label',type: 'string', convert:function(newValue, model){
                    var result = getLocale(model.get('situacion')) + ':  ' + model.get('cantidad');
                    return result;
                }}
            ]        
        });
        
        var myStore = Ext.create('Ext.data.Store', {
            alias: 'store.chartestadoeventosactuales',
    
            model: myModel,
            remoteFilter: true,
        
            proxy: {
                type: 'rest',
                reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
                },
                url: '/Rest/search/EstadoDeEventosActuales'
            } 
        });
        
        this.bindStore(myStore);
        myStore.load();
    }
    
});
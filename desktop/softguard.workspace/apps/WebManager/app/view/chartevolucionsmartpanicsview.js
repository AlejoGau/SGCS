Ext.define('WebManager.view.chartevolucionsmartpanicsview', {
    extend : 'Ext.chart.CartesianChart',
    alias : 'widget.chartevolucionsmartpanicsview',
    itemId: 'chartevolucionsmartpanicsview',

    //cls: 'kpi-main-chart',
    height: '100%',
    animation: true,
    
    reference: 'mainChart',

    insetPadding: '40px 40px 20px 30px',
    
    border: false,
    //flex: 1,
 
    tbar: {
        cls: 'kpi-toolbar',
        
        items: [
             '->', 
             {
                ui: 'kpi',
                text: getLocale('30 Días'),
                filter: '30',
                reference: '30',
                toggleGroup: 'sp',
                allowDepress: false,
                dataIndex: 0,
                handler: function(btn){
                    var view = btn.up('chartevolucionsmartpanicsview');
                    var store = view.getStore();
                    var date = Ext.Date.add(new Date(), Ext.Date.DAY, -30);
                    store.filter({
                        property: 'sts_tfechahora:GT', 
                        value: date
                    });
                }
            },{
                ui: 'kpi',
                text: getLocale('60 Días'),
                filter: '60',
                reference: '60',
                toggleGroup: 'sp',
                allowDepress: false,
                dataIndex: 1,
                handler: function(btn){
                    var view = btn.up('chartevolucionsmartpanicsview');
                    var store = view.getStore();
                    var date = Ext.Date.add(new Date(), Ext.Date.DAY, -60);
                    store.filter({
                        property: 'sts_tfechahora:GT', 
                        value: date
                    });
                }
            },{
                ui: 'kpi',
                text: getLocale('12 Meses'),
                filter: '365',
                reference: '365',
                toggleGroup: 'sp',
                pressed: true,
                allowDepress: false,
                dataIndex: 2,
                handler: function(btn){
                    var view = btn.up('chartevolucionsmartpanicsview');
                    var store = view.getStore();
                    var date = Ext.Date.add(new Date(), Ext.Date.DAY, -365);
                    store.filter({
                        property: 'sts_tfechahora:GT', 
                        value: date
                    });
                }
            }
        ]
    },
    axes: [{
        type: 'numeric',
        position: 'left',
        fields: ['cantidad'],
        fontSize: 12,
        grid: true,
        minimum: 0,
        title: {
           text: getLocale('Cantidad'),
           fontSize: 15
        }
    }, {
        type: 'category',
        position: 'bottom',
        fields: ['fecha_format'],
        title: {
           text: getLocale('Fecha'),
           fontSize: 15
        }
    }],
    series: [{
        type: 'area',
        subStyle: {
            stroke: ['rgb(34,198,239)', 'rgb(241,73,91)'],
            fill: ['rgba(34,198,239,0.25)', 'rgba(241,73,91,0.25)'],
            'stroke-width': 3
        },
        xField: 'fecha_format',
        yField: 'cantidad',
        marker: {
            opacity: 0,
            scaling: 0.01,
            fx: {
                duration: 200,
                easing: 'easeOut'
            }
        },
        highlightCfg: {
            opacity: 1,
            scaling: 1.5
        },
        tooltip: {
            trackMouse: true,
            renderer: function (tooltip, record, item) {
                tooltip.setHtml(record.get('fecha_format') + ': ' + record.get('cantidad'));
            }
        }
    }],
    
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
        
        var myModel = Ext.define('chartevolucionsmartpanicsview1', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'fecha'},
                {name: 'cantidad', type: 'int'},
                {name: 'tipo', type:'string'},
                {name: 'fecha_format'}
            ]        
        });
        
        var myStore = Ext.create('Ext.data.Store', {
            alias: 'store.chartevolucionsmartpanicsview',
    
            model: myModel,
            remoteFilter: true,
            autoLoad: false,
        
            proxy: {
                type: 'rest',
                reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
                },
                url: '/Rest/search/evolucionsmartpanics'
            },
            
            /* Inicio por default el Store con un filtro de 12 meses atras en adelante */
            filters: [{
                property: 'sts_tfechahora:GT', 
                value: Ext.Date.add(new Date(), Ext.Date.DAY, -365)
            }]
            
        });
        
        this.bindStore(myStore);
        /*myStore.load();*/
    }
});
Ext.define('WebManager.view.chartestadoeventospendientesporprioridadview', {
    extend : 'Ext.chart.CartesianChart',
    alias : 'widget.chartestadoeventospendientesporprioridadview',

    animation: true,
    insetPadding: '10 40 10 20',
    border: false,
 
    tbar: {
        cls: 'kpi-toolbar',
    
        items: [
            '->',
            {
                ui: 'kpi',
                text: 'Pendientes',
                filter: '0',
                reference: '0',
                toggleGroup: 'eventosp',
                allowDepress: false,
                dataIndex: 0,
                handler: function(btn){
                    var view = btn.up('chartestadoeventospendientesporprioridadview');
                    var store = view.getStore();
                    store.filter({
                        property: 'rec_nestado:ININT',
                        value: 0
                    });
                }
            },{
                ui: 'kpi',
                text: 'En Espera',
                filter: '2',
                reference: '2',
                toggleGroup: 'eventosp',
                allowDepress: false,
                dataIndex: 1,
                handler: function(btn){
                    var view = btn.up('chartestadoeventospendientesporprioridadview');
                    var store = view.getStore();
                    store.filter({
                        property: 'rec_nestado:ININT',
                        value: 2
                    });
                }
            },{
                ui: 'kpi',
                text: 'En Proceso',
                filter: '1,4,9',
                reference: '1,4,9',
                toggleGroup: 'eventosp',
                allowDepress: false,
                dataIndex: 2,
                handler: function(btn){
                    var view = btn.up('chartestadoeventospendientesporprioridadview');
                    var store = view.getStore();
                    store.filter({
                        property: 'rec_nestado:ININT',
                        value: '1,4,9'
                    });
                }
            },{
                ui: 'kpi',
                text: 'Todos',
                filter: '',
                reference: '',
                pressed: true,
                toggleGroup: 'eventosp',
                allowDepress: false,
                dataIndex: 3,
                handler: function(btn){
                    var view = btn.up('chartestadoeventospendientesporprioridadview');
                    var store = view.getStore();
                    store.clearFilter();
                }
            }
        ]
    },
    axes: [{
        type: 'numeric3d',
        position: 'left',
        fontSize: 12,
        
        title: {
           text: getLocale('Cantidad'),
           fontSize: 15
        },
    
        minimum: 0,
        maximum: 'cantidad',
        //majorTickSteps: 10,
        
        grid: {
            /* impar */
           odd: {
               fillStyle: 'rgba(255, 255, 255, 0.06)'
           },
           /* par */
           even: {
               fillStyle: 'rgba(0, 0, 0, 0.03)'
           }
       }
    }, {
        type: 'category3d',
        position: 'bottom',
        title: {
           text: getLocale('Prioridad'),
           fontSize: 15
       }
    }],
    series: [{
        type: 'bar3d',                   
        xField: 'Prioridad',
        yField: 'cantidad',
        subStyle: {
            fill: ["#FF601F"]
        },
        label: {
            display: 'inside',
            orientation : 'horizontal',
            field: 'cantidad'
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
        
        var myModel = Ext.define('chartestadoeventospendientesporprioridadModel', {
            extend: 'Ext.data.Model',
            fields: [        
                'prioridad',
                {name: 'cantidad',type: 'int'}
            ]   
        });
        
        var myStore = Ext.create('Ext.data.Store', {
            alias: 'store.chartestadoeventospendientesporprioridad',
    
            model: myModel,
            remoteFilter: true,
        
            proxy: {
                type: 'rest',
                reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
                },
                url: '/Rest/search/EventosPendientesPorPrioridad' 
            },
            filters: [{
                property: 'rec_nestado:ININT',
                value: ''
            }]
        });
        
        this.bindStore(myStore);
        myStore.load();
    }
});
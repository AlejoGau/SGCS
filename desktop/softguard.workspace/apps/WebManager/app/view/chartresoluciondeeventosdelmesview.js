Ext.define('WebManager.view.chartresoluciondeeventosdelmesview', {
    extend : 'Ext.chart.PolarChart', //'Ext.chart.PolarChart',
    alias : 'widget.chartresoluciondeeventosdelmesview',
       
    interactions: ['rotate'],
            
    /* ajusto el padding para que no se corte el grafico */
    insetPadding: 30,
    innerPadding: 20,
    
    /* Agrego captions para dejar leyenda de doble clic en aquellos graficos que son con mucha informacion
     * esto se suma el listener de dblClick
     */
    captions: {
        credits: {
            text: getLocale('Doble clic para mas informacion'),
            align: 'center'
        }
    },
   
    series: [{
        type: 'pie3d',
        angleField: 'cantidad',
        colors: coloresvarios(),        
        label: {
            field: 'label',
            display: 'inside',
            font: 10,
            calloutLine: {
                length: 70
            },
            renderer: function (sprite, record, attributes, index, store) {
                
                if (store > 1) {
                    return (attributes.hidden = true);    
                }
                
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
        distortion: 0.6,
        Thickness: 2,
        donut: 30, 
        style: {
            bevelWidth : 10,
            colorSpread : 2
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
        },
        
        /* Genero el evento de doble click para aquellos graficos los cuales tienen demasida informacion y se necesita mostrar a pantalla completa para verlos bien
         * Se crea al darle doble clic un modal, con la misma estructura de la View actual, pero con legendas y en un tamanio de width y height del 80%
         */
        dblclick: {
            element: 'body', //bind to the underlying body property on the panel
            scope: this,
            fn: function(){ 
                var myWindow = Ext.widget('window',{
                    title: getLocale('Informacion detallada'),
                    translate: false,
                    
                    height: '80%',
                    width: '80%',
                    modal: true,                                                    
                    layout: 'fit',
                    autoScroll: true,
                    
                    resizable: false,
                                                                        
                    items:[{
                        xtype: 'container',
                        layout: {
                            type: 'vbox'
                            //align: 'stretch'
                        },
                        items: [{
                            xtype: 'label',
                            html: getLocale('Podra agregar y/o quitar opciones visuales del grafico dando clic en la opcion deseada sobre la leyenda izquierda'),
                            margin: '20px 0 0 20px'
                        },{
                            xtype: 'chartresoluciondeeventosdelmesFULLview'
                        }]
                    }]
                }).show();
            }
        }
    },

    initComponent: function () {
        this.callParent(arguments);
        
        var myModel = Ext.define('chartresoluciondeeventosdelmesModel', {
            alias: 'model.chartresoluciondeeventosdelmes',
            extend: 'Ext.data.Model',
            fields: [
                {name: 'cantidad',type: 'int'},
                'descripcion',
                {name: 'label',type: 'string', convert:function(newValue, model){
                    var result = model.get('descripcion') + ':  ' + model.get('cantidad');
                    return result;
                }}
            ]        
        });
        
        var myStore = Ext.create('Ext.data.Store', {
            alias: 'store.chartresoluciondeeventosdelmes',
    
            model: myModel,
            remoteFilter: true,
        
            proxy: {
                type: 'rest',
                reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
                },
                url: '/Rest/search/ResolucionDeEventosPorMes'
            } 
        });
        
        this.bindStore(myStore);
        myStore.load();   
        
    }
});
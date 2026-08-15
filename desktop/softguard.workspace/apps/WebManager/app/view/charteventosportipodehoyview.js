Ext.define('WebManager.view.charteventosportipodehoyview', {
    extend : 'Ext.chart.CartesianChart',
    alias : 'widget.charteventosportipodehoyview',
    
    animation: true,
    insetPadding: '20 50 20 20',
    
    width: '100%',
    
    axes: [{
        type: 'numeric3d',
        position: 'bottom',
        fontSize: 10,
        
        minimum: 0,
        maximum: 'cant',
        majorTickSteps: 10,    
        
        grid: {
           odd: {
               fillStyle: 'rgba(255, 255, 255, 0.06)'
           },
           even: {
               fillStyle: 'rgba(0, 0, 0, 0.03)'
           }
       }
        
    },{
        type: 'category3d',
        position: 'left',
        label: {
            textAlign: 'right',
            textBaseline: 'middle',
            fontSize: 12
        }
    }],
    flipXY: true,
    series: [{
        type: 'bar3d',                   
        xField: 'label',
        yField: 'cant',
        colors: coloresvarios(),
        style: {
            maxBarWidth: 40,
            maxGapWidth: 20
        },
        label: {
            display: 'inside',
            orientation : 'horizontal',
            field: 'cant',
            fontSize: 10,
            fontWeight: 300
        },
        tooltip: {
            trackMouse: true,
            style: 'background: #fff',
            renderer: function(tt, storeItem, item) {
                tt.setHtml(storeItem.get('tipo') + ': ' + storeItem.get('cant'));
            }
        }
    }],
            
    listeners: {
        beforerender: function(sprite, record, attr, index, store, rendererData){ 
            /* Genero el alto de la grafica, en base a la cantidad de registros
             * que se vean en el Store, en este caso cuando es mayor a 10, hago que la
             * grafica sea de un alto de 1200px para que se vean todos los labels
             * y se genere el Scroll pertinente para verse bien.
             */

            /**
             * Por asincronismo a veces sprite.store.getTotalCount() devolvia 0 
             * cuando no era asi y se rompia. Puse un time out de 2000ms
             *  para que nos devuelva siempre la cantidad real 
             */
            Ext.defer(function() {
                sprite.setHeight(sprite.store.getTotalCount() * 75); 
            }, 2000);

            /*
            
            if ( sprite.store.getTotalCount() == 0 ) {
                sprite.height = 100 * 75;
            } else {
                sprite.height = sprite.store.getTotalCount() * 75;
            }

             */ 
             
            /*
            if ( sprite.store.totalCount > 29 ) {
                sprite.height = '100vh';
            }else if (sprite.store.totalCount > 20) { 
                sprite.height = 1300; 
            } else if (sprite.store.totalCount > 15) {
                sprite.height = 900;
            } else if (sprite.store.totalCount > 10) {
                sprite.height = 700;
            } else {
                sprite.height = 350;
            }
            */
            
         },
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
        
        var myModel = Ext.define('charteventosportipodehoyModel', {
            extend: 'Ext.data.Model',
            fields: [        
                'cant',
                'tipo',
                {name: 'label',type:'string',convert:function(newValue, model){
                    var start = 0,
                        end = 40,
                        result = model.get('tipo');
                    
                    if (result.length > 40) {
                        result = result.substring(start,end);
                        result = result+'...';    
                    }
                    return result;
                }}
            ]
        });
        
        var myStore = Ext.create('Ext.data.Store', {
            alias: 'store.sgwebmanagereventospordia',

            model: myModel,
            remoteFilter: true,
        
            proxy: {
                type: 'rest',
                reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
                },
                url: '/Rest/search/EventosPorTipoDeHoy'
            }
        });
        
        this.bindStore(myStore);
        myStore.load();        
        
    }
});
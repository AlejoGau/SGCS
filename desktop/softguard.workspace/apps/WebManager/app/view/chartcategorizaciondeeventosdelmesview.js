Ext.define('WebManager.view.chartcategorizaciondeeventosdelmesview', {
    extend : 'Ext.chart.CartesianChart',
    alias : 'widget.chartcategorizaciondeeventosdelmesview',
                       
    animation : true,
    insetPadding: '20 30 20 20',

    height: 500,
    
    axes: [{
        type: 'numeric3d',
        position: 'left',
        fontSize: 10,
        
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
        
    },{
        type: 'category3d',
        position: 'bottom',
        label: {
            fontSize: 13,
            textAlign: 'end',
            textBaseline: 'hanging',
            x: -10,
            y: -90,
            rotation: {
                degrees: -90,
                centerX: 0
            }
        }
    }],
    //flipXY: true,
    series: [{
        type: 'bar3d',                   
        xField: 'descripcion',
        yField: 'cantidad',
        colors: coloresvarios(),
        style: {
            maxBarWidth: 60
        },
        label: {
            display: 'inside',
            orientation : 'horizontal',
            field: 'cantidad',
            font: 10
        },
        tooltip: {
            trackMouse: true,
            style: 'background: #fff',
            renderer: function(tt, storeItem, item) {
                tt.setHtml(storeItem.get('descripcion') + ': ' + storeItem.get('cantidad'));
            }
        }
    }],
    
    listeners: {
        beforerender: function(sprite, record, attr, index, store, rendererData){ 
            /* Genero el ancho de la grafica, en base a la cantidad de registros
             * que se vean en el Store, en este caso cuando es mayor a 10, hago que la
             * grafica sea de un alto de 1200px para que se vean todos los labels
             * y se genere el Scroll pertinente para verse bien.
             */
            
            if ( sprite.store.totalCount < 5 ) { 
                sprite.width = sprite.store.totalCount * 250;
            } else if ( sprite.store.totalCount < 10 ) {
                sprite.width = sprite.store.totalCount * 100;
            } else {
                sprite.width = sprite.store.totalCount * 50;
            }
            
            
            
            /*
            if (sprite.store.totalCount > 20) { 
                sprite.width = 1500; 
            } else if (sprite.store.totalCount > 15) {
                sprite.width = 1000;
            } else if (sprite.store.totalCount > 10) {
                sprite.width = 700;
            } else {
                sprite.width = 400;
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
        
        var myModel = Ext.define('chartcategorizaciondeeventosdelmesModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'cantidad', type: 'int'},
                'descripcion',
                {name: 'label',type: 'string', convert:function(newValue, model){
                    var result = model.get('descripcion');
                    var start = 0, end = 35;

                    if (result.length > end) {
                        result = result.substring(start,end);
                        result = result+'...';    
                    }
                    return result;

                }}
            ]        
        });
        
        var myStore = Ext.create('Ext.data.Store', {
            alias: 'store.chartcategorizaciondeeventosdelmes',
    
            model: myModel,
            remoteFilter: true,
        
            proxy: {
                type: 'rest',
                reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
                },
                url: '/Rest/search/CategorizacionDeEventosDelMes'
            } 
        });
        
        this.bindStore(myStore);
        myStore.load();
    }
});
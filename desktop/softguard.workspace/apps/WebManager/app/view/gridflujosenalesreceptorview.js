Ext.define('WebManager.view.gridflujosenalesreceptorview', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.gridflujosenalesreceptorview',
    itemId : 'gridflujosenalesreceptorview',
            
    columns: [
      { text: getLocale('Receptor'),  dataIndex: 'Receptor', flex : 1 },
      { text: getLocale('Cantidad de Eventos'), dataIndex: 'Cantidad_Eventos', flex : 1},
      { text: getLocale('Cantidad de Cuentas'), dataIndex: 'Cantidad_Cuentas', flex : 1},
      { text: getLocale('Promedio de Eventos'), dataIndex: 'Promedio_Eventos', flex : 1}
    ],
    
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
        var controller = this;
        
        var cantidadTotalEventos = 0;
        var cantidadTotalCuentas = 0;
        var cantidadPromedio = 0;
        
        var myModel = Ext.define('gridflujosenalesreceptorModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'Receptor', type: 'string'},
                {name: 'Cantidad_Eventos', type: 'int'},
                {name: 'Cantidad_Cuentas', type: 'int'},
                {name: 'Promedio_Eventos', type: 'int'}
            ]
        });
        
        var myStore = Ext.create('Ext.data.Store', {
            alias: 'store.sgwebmanagercantidadEventosPorReceptorPorCuenta',

            model: myModel,
            autoload : true,
            remoteFilter: true,
        
            proxy: {
                type: 'rest',
                reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
                },
                url: '/Rest/search/CantidadEventosPorReceptorPorCuenta'
            }            
        });
        this.bindStore(myStore);
        myStore.load({callback: function(records, operation, success){
                // Recorro los records y voy generando los valores para el encabezado
                Ext.Array.each(records,function(record){
                    cantidadTotalEventos = parseInt(cantidadTotalEventos) + parseInt(record.get('Cantidad_Eventos'));
                    cantidadTotalCuentas = parseInt(cantidadTotalCuentas) + parseInt(record.get('Cantidad_Cuentas'));
                });
                
                /*
                console.log("cantidadTotalEventos", cantidadTotalEventos);
                console.log("cantidadTotalCuentas", cantidadTotalCuentas);
                */
                
                // Calculo el promedio en base a la cantidad de Eventos
                if ( parseInt(cantidadTotalEventos)/1440 >= 1 ) {
                    cantidadPromedio = parseInt(cantidadTotalEventos)/1440
                };
                
                // Genero el encabezado por medio de un panel e insertandole HTML + los valores que obtube de los records.
                var encabezado = Ext.create('Ext.panel.Panel', {
                    bodyPadding: 15,
                    bodyStyle: {"background-color":"#FFF","color":"#000"},
                    layout : [{
                        type: 'vbox',
                        align : 'stretch'
                    }],
                    items : [{
                        xtype: 'label',
                        html: '<div><p style="display:inline-block;width:50%;">Cantidad de conexiones : '+records.length+'</p><p style="display:inline-block;width:50%;">Cantidad total de Eventos : '+cantidadTotalEventos+'</p></div><div><p style="display:inline-block;width:50%;">Cantidad total de Cuentas : '+cantidadTotalCuentas+'</p><p style="display:inline-block;width:50%;font-weight:bold">Promedio de señales por minuto : '+cantidadPromedio+'</p></div>'
                    }]
                });
                controller.addDocked(encabezado);
                
            }
        });       
        

        
    }
});
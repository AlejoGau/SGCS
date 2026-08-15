Ext.define('WebManager.view.gridultimos25eventosalertaview', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.gridultimos25eventosalertaview',

    columns: [
      { text: getLocale('Fecha'),  dataIndex: 'rec_tfechahora_format'},
      { text: getLocale('Dealer'), dataIndex: 'cue_clinea'},
      { text: getLocale('Numero'), dataIndex: 'cue_ncuenta'},
      { text: getLocale('Cuenta'), dataIndex: 'cue_cnombre', flex : 1 },
      { text: getLocale('Descripcion'), dataIndex: 'descripcion', flex : 1 },
      { text: getLocale('Estado'), dataIndex: 'rec_nestado' }
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
        
        var myModel = Ext.define('chartresoluciondeeventosdeldiaModel2', {
            extend: 'Ext.data.Model',
            fields: [
                'rec_tfechahora_format',
                'rec_thora',
                'cod_ccodigo',
                'descripcion',
                'color_fondo',
                'color_letra',
                'cod_nColorLetra',
                'cue_clinea',
                'cue_ncuenta',
                'cue_cnombre',
                'rec_calarma',
                'rec_nestado'
            ]
        });
        
        
        var myStore = Ext.create('Ext.data.Store', {
            alias: 'store.sgwebmanagereventosultimos25eventosalertas',

            model: myModel,
            remoteFilter: true,
        
            proxy: {
                type: 'rest',
                reader: {
                    type : 'json',
                    rootProperty : 'rows',
                    totalProperty : 'total'
                },
                url: '/Rest/search/Ultimos25EventosAlertas'
            }
        });
        
        this.bindStore(myStore);
        myStore.load();
        
    }
    
});
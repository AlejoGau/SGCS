Ext.define('WebManager.view.gridflujosenalesreceptortotalview', {
    extend : 'Ext.grid.GridPanel',
    alias : 'widget.gridflujosenalesreceptortotalview',
    itemId : 'gridflujosenalesreceptortotalview',

    columns: [
      { text: getLocale('Total'),  dataIndex: 'Titulo', flex : 1 },
      { text: getLocale('Cantidad de Eventos'), dataIndex: 'CantidadEventosTotales', flex : 1}
    ],
        
    initComponent: function () {
        this.callParent(arguments);
        
        var myModel = Ext.define('gridflujosenalesreceptorModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'Titulo', type: 'string'},
                {name: 'CantidadEventosTotales', type: 'int'}
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
                url: '/Rest/search/CantidadTotalEventosPorReceptorPorCuenta'
            }            
        });
        this.bindStore(myStore);
        myStore.load();
    }
});
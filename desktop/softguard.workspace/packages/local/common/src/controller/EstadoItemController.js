//MIGRADO2024
Ext.define( 'Common.controller.EstadoItemController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'EstadoItemModel', 'ZonaSearchModel' ],
views: [ 'EstadoItemGridView' ],
init: function (config ) {
    var me = this;
    // genero los eventos
    this.control( {
        'estadoitemgridview': {
            afterrender: this.loadData,
            deselect: this.onDeselect,
            select: this.onSelect,
            selectionchange: this.onSelectionChange
        }
    });
}, // cierro init
loadData: function (view ) {
    var record = view.record;
    var controller = this;
    // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
    var mystore = Ext.create( 'Ext.data.Store', {
        model: this.getZonaSearchModelModel(),
        pageSize: 500,
        remoteFilter: false,
        remoteSort: false,
        sorters: {
            property: 'orderCodigo',
            id: 'orderCodigo',
            direction: 'ASC'
        },
        filters: [ {
            property: 'zon_iidcuenta',
            //Se modifica el llamado a cue_iid para que funcione correctamente en web remoto y en admin de cuentas
            value: record.data ? record.get( 'cue_iid' ) : record.cue_iid
        }]
    });
    // una vez que cargue el store hago el binding con la view
    mystore.load( {
        callback: function( records, operation, success ) {
            controller.doBindStore( records, success, view, controller, mystore );
        }
    });
},
    
doBindStore: function(records, success, view, controller, store ) {
    if( success ) {
        var record = view.record;
        //Si se modifica el llamado a cue_iid para que funcione correctamente en web remoto y en admin de cuentas
        //var _ObjectId =  record.get( 'cue_iid' );
        var _ObjectId = record.data ? record.get( 'cue_iid' ) : record.cue_iid
        
        store.filterBy( function( zona ) {
            var text = zona.get( 'zon_ccodigo' ).substr( 0, 3 ).toUpperCase();
            if( text == 'VAR' || text == 'PAR' || text == 'LOC' || text == 'FWD' )
                return false
            else
                return true
        });
        view.bindStore( store );
        var zonas = Ext.create( 'Ext.data.Store', {
            model: controller.getEstadoItemModelModel()
        });
        zonas.load( {
            ObjectId: _ObjectId, view: view, store: zonas, callback: function( records, operation, success ) {
                var selmodel = view.getSelectionModel();
                view.zonas = zonas;
                view.zonas.each( function() {
                    //this.store.remove(this);
                    var index = view.getStore().find( 'zon_ccodigo', this.get( 'est_czona' ) );
                    if( index >= 0 )
                        selmodel.select( index, true, true );
                });
            }
        });
    }
},
    
onSelectionChange: function(selModel, records, options ) {
    console.log( records );
},
    
onSelect: function(row, record, index, options ) {
    var view = row.view.up( 'estadoitemgridview' );
    var store = view.zonas;
    var cuenta = view.record;
    var model = this.getEstadoItemModelModel();
    var record = model.create( {
        est_czona: record.get( 'zon_ccodigo' ),
        //Se modifica el llamado a cue_iid para que funcione correctamente en web remoto y en admin de cuentas
        est_iidcuenta: cuenta.data ? cuenta.get( 'cue_iid' ) : cuenta.cue_iid
    });
    record.save();
    store.add( record );
},
    
onDeselect: function(row, record, index, options ) {
    var view = row.view.up( 'estadoitemgridview' );
    var store = view.zonas;
    var record = store.findRecord( 'est_czona', record.get( 'zon_ccodigo' ) );
    record.destroy();
    store.remove( record );
}
});
//MIGRADO2024
Ext.define( 'Common.controller.ImpuestoItemGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'MG_product_impuestoSearchModel', 'MG_product_impuestoModel' ],
views: [ 'ImpuestoItemGridView' ],
init: function(config ) {
    // genero los eventos
    this.control(
        {
            'impuestoitemgridview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.onObjectChanged,
                deleteitem: this.onDeleteItem,
                beforedestroy: this.onDestroy
            },
            'impuestoitemgridview button[action=add]': {
                click: this.onAddClick
            },
            'impuestoitemgridview button[action=search]': {
                click: this.onSearchClick
            },
            'impuestoitemgridview button[action=getall]': {
                click: this.onGetAllClick
            }
        });
},
initView: function(view ) {
    var record = view.record;
    var parentorderid = record.get( 'Id' );
    // Si el producto aun no fue salvado, su Id es phantom (string).
    // Creamos el store igual (para que objectchanged/loadAll no crasheen) pero
    // sin disparar load() al backend con un filter corrupto que tira 500.
    var isPhantomParent = !parentorderid || isNaN( parseInt( parentorderid, 10 ) );
    var store = Ext.create( 'Ext.data.Store', {
        model: this.getMG_product_impuestoSearchModelModel(),
        pageSize: 500,
        filters: isPhantomParent ? [] : [ {
            property: 'mpi_idproduct',
            value: parentorderid
        }],
        remoteSort: true,
        remoteFilter: true
    });
    view.store = store;
    view.bindStore( store );
    if( !isPhantomParent ) {
        store.load();
    }
},
    
onDestroy: function(view ) {
    view.store = null;
},
    
onAddClick: function(button, event, options ) {
    var panel = button.up( 'tabpanel' );
    var view = button.up( 'impuestoitemgridview' );
    var record = view.record;
    var mpi_idproduct = record.get( 'Id' );
    var model = this.getMG_product_impuestoModelModel();
    var newrecord = Ext.create( model, {
        Name: getLocale( 'Seleccione un impuesto...' ),
        mpi_idproduct: mpi_idproduct
    });
    // //var store = view.getStore();
    // //store.add(newrecord);
    this.openObject( newrecord, view );
},
    
onItemClick: function(view, record, item, index, e, options ) {
    this.openObject( record, view );
},    
    
onObjectEdit: function(record, view ) {
    this.onItemClick( view, record );
},
openObject: function(record, view ) {
    //this.openWindow(record,view);
    var model = this.getMG_product_impuestoModelModel();
    var grid = view.up( 'impuestoitemgridview' );
    if( !grid ) {
        grid = view;
    }
    var title = record.get( 'Name' ); //reemplazar por config
    var viewWin = Ext.widget( 'impuestoitemformview', {
        record: record,
        //callback: this.onEdit,
        scope: this,
        recordOrganizacion: view.recordOrganizacion,
        caller: grid
    }
    );
    var myWindow = Ext.widget( 'window', {
        title: title,
        height: 300,
        width: 400,
        modal: true,
        items: viewWin,
        layout: 'fit',
        caller: grid
    }).show();
    // if( record.get( 'mpi_idproduct' ) > 0 ) {
    //     model.load( record.get( 'mpi_idproduct' ), {
    //         callback: function( _record ) {
    //             var viewWin = Ext.widget( 'impuestoitemformview', {
    //                 record: _record,
    //                 //callback: this.onEdit,
    //                 scope: this,
    //                 recordOrganizacion: view.recordOrganizacion,
    //                 caller: grid
    //             }
    //             );
    //             var myWindow = Ext.widget( 'window', {
    //                 title: title,
    //                 height: 400,
    //                 width: 400,
    //                 modal: true,
    //                 items: viewWin,
    //                 layout: 'fit',
    //                 caller: grid
    //             }).show();
    //         }
    //     });
    // }
    // else {
    //     var viewWin = Ext.widget( 'impuestoitemformview', {
    //         record: record,
    //         //callback: this.onEdit,
    //         scope: this,
    //         recordOrganizacion: view.recordOrganizacion,
    //         caller: grid
    //     }
    //     );
    //     var myWindow = Ext.widget( 'window', {
    //         title: title,
    //         height: 400,
    //         width: 400,
    //         modal: true,
    //         items: viewWin,
    //         layout: 'fit',
    //         caller: grid
    //     }).show();
    // }
},
    
onObjectChanged: function(view ) {
    var store = view.store;
    var filters = [ {
        property: 'mpi_idproduct',
        value: view.record.get( 'Id' )
    }];
    store.clearFilter( true );
    store.filter( filters );
    store.load();
},
    
onDeleteItem: function(record, view ) {
    var recId = parseInt( record.get( 'Id' ), 10 );
    // Si es phantom (no fue salvado al servidor) lo removemos solo del store local.
    if( record.phantom || !recId || isNaN( recId ) ) {
        view.store.remove( record );
        view.view.refresh();
        return;
    }
    // Construyo una instancia del model real con el Id, sin GET previo,
    // y disparo erase() => DELETE /Rest/MG_product_impuesto/{id}
    var Model = this.getMG_product_impuestoModelModel();
    var rec = new Model( { Id: recId } );
    rec.phantom = false;
    rec.erase( {
        success: function() {
            view.store.remove( record );
            view.view.refresh();
            notify( getLocale( 'Impuesto eliminado' ) );
        },
        failure: function() {
            notifyError( getLocale( 'No se pudo eliminar el impuesto' ) );
        }
    });
},
onGetAllClick: function(button, event, options ) {
    var view = button.up( 'impuestoitemgridview' );
    var store = view.getStore();
    store.clearFilter();
},
    
onSearchClick: function(button, event, options ) {
    var view = button.up( 'impuestoitemgridview' );
    var store = view.getStore();
    var query = view.down( '#query' );
    var field = view.down( '#fieldName' );
    var taxonomytree = view.query( 'taxonomiesmastertree' )[ 0 ];
    var taxonomiesSelected = taxonomytree.getStore().getUpdatedRecords();
    var taxonomiesArray = [];
    var filters = [];
    var fechaDesde = view.down( '#fechaDesde' ).getValue();
    var fechaHasta = view.down( '#fechaHasta' ).getValue();
    if( fechaDesde )
        filters.push( {
            property: 'FechaPrimeraIntervencion:GT',
            value: fechaDesde,
            id: 'fechaDesde'
        });
    if( fechaHasta )
        filters.push( {
            property: 'FechaPrimeraIntervencion:LT',
            value: fechaHasta,
            id: 'fechaHasta'
        });
    var orChk = view.down( '#or' );
    var or = orChk.checked ? ':OR' : '';
    Ext.Array.each( taxonomiesSelected, function( rec ) {
        if( rec.get( 'checked' ) )
            taxonomiesArray.push( rec.get( 'Id' ) );
    }, this );
    var taxonomies = taxonomiesArray.join();
    if( field.getValue() && query.getValue() ) {
        filters.push( {
            property: field.getValue() + ':Like',
            value: query.getValue(),
            id: 'query'
        });
    }
    if( taxonomiesArray.length > 0 ) {
        filters.push( {
            property: 'Taxonomy' + or,
            value: taxonomies,
            id: 'taxonomy'
        });
    }
    if( filters )
        store.filter( filters );
    else
        store.clearFilter();
}
});
//MIGRADO2024
Ext.define( 'Common.controller.ImpuestosHelperController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 't_impuestos_fcSearchModel', 'MG_product_impuestoSearchModel' ],
views: [ 'ImpuestosHelperView' ],
init: function(config ) {
    // genero los eventos
    this.control(
        {
            'impuestoshelperview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick
            },
            'impuestoshelperview #btnBuscar': {
                click: this.onSearchClick
            },
            'impuestoshelperview #listas': {
                change: this.onListasChange
            }/*,
            'impuestoshelperview #btnLista' : {
                click: this.onCambioListaClick
            }*/
        });
},
    
/*  onCambioListaClick: function(button, event){
      var view = button.up('impuestoshelperview');
      
      var idLista = view.down('#listas').getValue()
      
      view.productosStore.clearFilter(true)        
      view.productosStore.filter({
                      property:'id_lista',
                      value: idLista
                  })
      
  },*/
onListasChange: function (combo, value ) {
    var view = combo.up( 'impuestoshelperview' )
    var filters = Ext.clone( view.filters )
    filters.push( {
        property: 'id_lista',
        value: value
    })
    view.productosStore.clearFilter( true )
    view.productosStore.filter( filters )
},
initView: function(view ) {
    view.storeImpuestos = Ext.create( 'Ext.data.Store', {
        model: this.getT_impuestos_fcSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
            sorters: [
                {
                    property : 'Name',
                    direction: 'ASC'
                }
            ],
        
        filters: [ {
            property: 'org_organizacionId', // filtro por la organizacion facturadora seleccionada (recordOrganizacion), o por la del usuario si no hay seleccion.
            value: view.recordOrganizacion ? view.recordOrganizacion.get( 'Id' ) : _UserData.Company
        }]
    })
    view.bindStore( view.storeImpuestos );
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.bindStore( view.storeImpuestos );
    view.storeImpuestos.load( {
        callback: ( record ) => {
            console.log( "record storeImpuestos -->o%", record );
        }
    });
},
onSelectedClick: function(button, event, options ) {
    var view = button.up( 'impuestoshelperview' );
    var selected = view.getSelectionModel().getSelection();
    var win = view.up( 'window' );
    var caller = win.view;
    caller.fireEvent( 'ImpuestoSelected', selected, caller );
    win.close();
},
    
onItemClick: function(view, record, item, index, e, options ) {
    if( !view.up( 'panel' ).multiSelect ) {
        var win = view.up( 'window' );
        var caller = win.view;
        caller.fireEvent( 'ImpuestoSelected', record, caller );
        win.close();
    }
},
    
onSearchClick: function(button, event ) {
    var view = button.up( 'impuestoshelperview' );
    var store = view.getStore();
    var query = view.down( '#query' );
    var code = view.down( '#querycode' );
    var filter = [];
    if( query )
        filter.push( {
            property: 'Name:Like',
            value: query.getValue(),
            id: 'Name'
        })
    if( code )
        filters.push( {
            property: 'code',
            value: code.getValue(),
            id: 'code'
        })
    store.filter( filter );
},
    
onObjectEdit: function(record, view ) {
    this.onItemClick( view, record );
},
    
openObjectTab: function(tabpanel, objectId, objectTypeName, title ) {
    var container = objectTypeName.toLowerCase() + 'view';
    var newTab = tabpanel.down( '[title="' + title + '"]' );
    if( !newTab ) {
        var newTab = Ext.widget( container, {
            title: title,
            border: false,
            closable: true,
            objectId: objectId,
            targetTab: tabpanel,
            autoDestroy: true
        });
        tabpanel.add( newTab );
    }
    tabpanel.setActiveTab( newTab );
}
});
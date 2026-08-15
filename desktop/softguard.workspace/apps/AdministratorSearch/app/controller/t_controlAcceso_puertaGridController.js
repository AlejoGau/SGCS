Ext.define( 'AdministratorSearch.controller.t_controlAcceso_puertaGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 't_controlAcceso_puertaSearchModel', 't_controlAcceso_puertaModel' ],
views: [ 't_controlAcceso_puertaGridView' ],

init: function(config ) {
    // genero los eventos
    this.control(
        {
            't_controlacceso_puertagridview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                refresh: this.refresh
            },
            't_controlacceso_puertagridview button[action=search]': {
                click: this.onSearchClick
            },
            't_controlacceso_puertagridview button[action=getall]': {
                click: this.onGetAllClick
            },
            't_controlacceso_puertagridview button[action=add]': {
                click: this.onAdd
            },
            't_controlacceso_puertagridview button[action="delete"]': {
                click: this.onDeleteClick
            }
        });
},

initView: function(view ) {
    view.filters = [];

    view.store = Ext.create( 'Ext.data.Store', {
        model: this.getT_controlAcceso_puertaSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: view.filters,
        reader: {
            type: 'json',
            rootProperty: 'raw'
        }
    })
    view.bindStore( view.store );
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.bindStore( view.store );

    view.store.load();
},
    
refresh: function (view ) {
    view.getStore().load()
},
    
onAdd: function(grid, record, item, index, e, options ) {
    var view = grid.up( 't_controlacceso_puertagridview' );
    var panel = view.targetTab ? view.targetTab : Ext.getCmp( 'center' );
    var title = 'Nueva puerta';


    record = this.getT_controlAcceso_puertaModelModel();


    var myobject = record.create({});
    // myobject.setId(0);
    var viewWidget = Ext.widget( 't_controlaccesopuertaformview', {
        caller: view,
        record: myobject
    });

    var win = Ext.create( 'Ext.Window', {
        iconCls: 'icon-table-add',
        layout: 'fit',
        title: title,
        width: 300,
        height: 150,
        border: false,
        items: viewWidget
    });
    win.show();
},    
    
    
   
onItemClick: function(grid, record, item, index, e, options ) {
    var view = grid.up( 't_controlacceso_puertagridview' );
    var panel = view.targetTab ? view.targetTab : Ext.getCmp( 'center' );
    var title = getLocale( 'Puerta' ) + ': ' + record.get( 'cap_nombre' );

    var view = Ext.widget( 't_controlaccesopuertaformview', {
        caller: view,
        record: record
    });

    var win = Ext.create( 'Ext.Window', {
        iconCls: 'icon-table-add',
        layout: 'fit',
        title: title,
        translate: false,
        width: 500,
        height: 250,
        border: false,
        modal: true,
        items: view
    });
    win.show();
},    
    
onObjectEdit: function(record, view ) {
    this.onItemClick( view, record );
},


onGetAllClick: function(button, event, options ) {
    var view = button.up( 't_controlacceso_puertagridview' );
    var store = view.getStore();
    store.clearFilter( true );
    store.filter( view.filters );
    view.down( '#query' ).setValue( '' );
},
    
onSearchClick: function(button, event, options ) {
    var view = button.up( 't_controlacceso_puertagridview' );

    var store = view.getStore();
    var fieldName = view.down( '#fieldName' ).getValue();
    var query = view.down( '#query' ).getValue();

    var filters = Ext.clone( view.filters );
    store.clearFilter( true );

    if( fieldName != '' ) {
        filters.push( {
            property: fieldName + ':LIKE',
            value: query
        });
    }
    store.filter( filters );
},
    
onDeleteClick: function(button, event, options ) {
    var view = button.up( 't_controlacceso_puertagridview' );
    var selection = view.getSelectionModel().getSelection();
    if( selection ) {
        view.store.remove( selection );
        var delRec = view.store.getRemovedRecords();
        Ext.Array.each( delRec, function( rec ) {
            var model = this.getT_controlAcceso_puertaModelModel();
			rec.setConfig({
				proxy: model.getProxy()
			});           
             rec.destroy( {
                callback: function( record, operation ) {
                    if( operation.success ) {
                        notify( 'Se eliminio exitosamente' );
                    }
                    else {
                        notify( 'No se puede eliminar el registro, esta siendo utilizado en el sistema.' );
                    }
                    view.store.load();
                }
            });
        }, this );
    } else {
        notify( 'Debe seleccionar un registro para eliminarlo' );
    }
}

});
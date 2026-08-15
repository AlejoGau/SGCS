//MIGRADO2024
Ext.define( 'Common.controller.IprServiciosGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'IprServiciosModel', 'IprServiciosSearchModel' ],
views: [ 'IprServiciosGridView', 'ExtUxNotification' ],
init: function(config ) {
    // genero los eventos
    this.control(
        {
            'iprserviciosgridview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.objectChanged,
                refresh: this.onRefresh,
                deleteservicio: this.onDelete
            },
            'iprserviciosgridview button[action=search]': {
                click: this.onSearchClick
            },
            'iprserviciosgridview button[action=getall]': {
                click: this.onGetAllClick
            }
        });
},
    
    
onRefresh: function (view, record ) {
    view.getStore().load();
},
initView: function(view ) {
    view.filters = [];
    
    view.store = Ext.create( 'Ext.data.Store', {
        model: this.getIprServiciosSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: view.filters
    })
    view.bindStore( view.store );
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.bindStore( view.store );
    view.store.load();
},
    
objectChanged: function (view ) {
    view.down( 'pagingtoolbar' ).doRefresh();
},
    
    
   
onItemClick: function(grid, record, item, index, e, options ) {
    var id = record.get( 'Id' );
    var view = grid.up( 'iprserviciosgridview' );
    var panel = view.targetTab ? view.targetTab : Ext.getCmp( 'center' );
    var title = getLocale( 'Servicio IPReader' );
    
    var model = this.getIprServiciosModelModel().load( id, {
        callback: function( recordx, operation ) {
            if( operation.success ) {
                var viewwin = Ext.widget( 'iprservicioformview', {
                    caller: view,
                    record: recordx,
                    objectId: id,
                });
                var win = Ext.create( 'Ext.Window', {
                    iconCls: 'icon-table-add',
                    layout: 'fit',
                    title: title,
                    width: 900,
                    height: 600,
                    border: false,
                    items: viewwin
                });
                
                win.show();
            }
        }
    })
},    
    
onObjectEdit: function(record, view ) {
    this.onItemClick( view, record );
},
onGetAllClick: function(button, event, options ) {
    var view = button.up( 'iprserviciosgridview' );
    var store = view.getStore();
    store.clearFilter();
    store.filter( view.filters );
    view.down( '#query' ).setValue( '' );
},
    
onSearchClick: function(button, event, options ) {
    var view = button.up( 'iprserviciosgridview' );
    var store = view.getStore();
    var fieldName = view.down( '#fieldName' ).getValue();
    var query = view.down( '#query' ).getValue();
    var filters = Ext.clone( view.filters );
    if( fieldName != '' ) {
        filters.push( {
            property: fieldName + ':LIKE',
            value: query
        });
    }
    if( filters.length > 0 ) {
        store.filter( filters );
    }
    else {
        store.clearFilter();
    }
},
    
onDelete: function (record, view ) {
    var controller = this;
    Ext.MessageBox.confirm( 'Confirmar', 'Está seguro que desea borrar?', function( btn ) {
        if( btn == "yes" ) {
            controller.getIprServiciosModelModel().load( record.get( 'Id' ), {
                callback: function( record ) {
record.destroy({callback:function () {
                        view.getStore().load()
                    }
                })                }})
			}
		});        
    },
});
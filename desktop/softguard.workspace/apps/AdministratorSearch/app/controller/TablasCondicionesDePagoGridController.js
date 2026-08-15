Ext.define( 'AdministratorSearch.controller.TablasCondicionesDePagoGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 't_condiciones_pago_fcSearchModel', 't_condiciones_pago_fcModel' ],
    views: [ 'TablasCondicionesDePagoView' ],

    init: function(config ) {
        // genero los eventos
        this.control(
            {
                'tablascondicionesdepagogridview': {
                    afterrender: this.initView,
                    itemdblclick: this.onItemClick,
                    objectedit: this.onObjectEdit,
                    objectchanged: this.objectChanged
                },
                'tablascondicionesdepagogridview button[action=search]': {
                    click: this.onSearchClick
                },
                'tablascondicionesdepagogridview button[action=getall]': {
                    click: this.onGetAllClick
                },
                'tablascondicionesdepagogridview button[action=add]': {
                    click: this.onAdd
                },
                'tablascondicionesdepagogridview button[action="delete"]': {
                    click: this.onDeleteClick
                }
            }
        );
    },

    initView: function(view ) {
        view.filters = [];
        view.store = Ext.create( 'Ext.data.Store', {
            model: this.getT_condiciones_pago_fcSearchModelModel(),
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
        
    onAdd: function(grid, record, item, index, e, options ) {
        var id = 0;
        var view = grid.up( 'tablascondicionesdepagogridview' );
        var panel = view.targetTab ? view.targetTab : Ext.getCmp( 'center' );
        var title = 'Nueva Condicion de pago';

        record = this.getT_condiciones_pago_fcModelModel();
        var myobject = record.create( {
            con_ifrecuencia: 30,
            con_idias: 1,
            con_ncuotas: 1
        });

        var view = Ext.widget( 'tablascondicionesdepagoformview', {
            caller: view,
            record: myobject,
            objectId: id,
        });

        var win = Ext.create( 'Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: title,
            width: 450,
            height: 500,
            border: false,
            items: view
        });
        win.show();
    },    
        
    onItemClick: function(grid, record, item, index, e, options ) {
        var id = record.get( 'Id' );
        var view = grid;
        var panel = view.targetTab ? view.targetTab : Ext.getCmp( 'center' );
        var title = 'Condicion de pago';

        var model = this.getT_condiciones_pago_fcModelModel().load( id, {
            callback: function( recordx, operation ) {

                if( operation.success ) {
                    var viewwin = Ext.widget( 'tablascondicionesdepagoformview', {
                        caller: view.up( 'tablascondicionesdepagogridview' ),
                        record: recordx,
                        objectId: id,
                    });

                    var win = Ext.create( 'Ext.Window', {
                        iconCls: 'icon-table-add',
                        layout: 'fit',
                        title: title,
                        width: 450,
                        height: 500,
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
        var view = button.up( 'tablascondicionesdepagogridview' );
        var store = view.getStore();
        store.clearFilter();
        store.filter( view.filters );
        view.down( '#query' ).setValue( '' );
    },
        
    onSearchClick: function(button, event, options ) {
        var view = button.up( 'tablascondicionesdepagogridview' );
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
            store.clearFilter( true );
            store.filter( filters );
        }
        else {
            store.clearFilter();
        }
    },
        
    onDeleteClick: function(button, event, options ) {
        var view = button.up( 'tablascondicionesdepagogridview' );
        var selection = view.getSelectionModel().getSelection();
        var controller = this;
        if( selection ) {
            Ext.MessageBox.confirm( 'Confirmar', 'Está seguro que desea borrar?', function( btn ) {
                if( btn == "yes" ) {
                    view.store.remove( selection );
                    var delRec = view.store.getRemovedRecords();
                    Ext.Array.each( delRec, function( rec ) {

                        rec.setConfig({
                            proxy: controller.getT_condiciones_pago_fcModelModel().getProxy()
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
                }
            })
        }
    }
});
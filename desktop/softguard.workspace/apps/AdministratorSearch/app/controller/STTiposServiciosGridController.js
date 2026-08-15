Ext.define( 'AdministratorSearch.controller.STTiposServiciosGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'TipoServicioSearchModel', 'TipoServicioModel' ],
    views: [ 'STTiposServiciosGridView' ],

    init: function(config ) {
        // genero los eventos
        this.control(
            {
                'sttiposserviciosview': {
                    afterrender: this.initView,
                    itemdblclick: this.onItemClick,
                    objectedit: this.onObjectEdit,
                    objectchanged: this.objectChanged

                },
                'sttiposserviciosview button[action=search]': {
                    click: this.onSearchClick
                },
                'sttiposserviciosview button[action=getall]': {
                    click: this.onGetAllClick
                },
                'sttiposserviciosview button[action=add]': {
                    click: this.onAdd
                },
                'sttiposserviciosview button[action="delete"]': {
                    click: this.onDeleteClick
                }
            }
        );
    },

    initView: function(view ) {
        view.store = Ext.create( 'Ext.data.Store', {
            model: this.getTipoServicioSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true
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
        var view = grid.up( 'sttiposserviciosview' );
        var title = 'Nuevo Tipo Servicio';
        var model = this.getTipoServicioModelModel();
        var myobject = model.create( {
        });
        var viewwin = Ext.widget( 'sttiposserviciosformview', {
            caller: view,
            record: myobject,
            objectId: id
        });

        var win = Ext.create( 'Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: title,
            width: 450,
            height: 250,
            border: false,
            items: viewwin
        });
        win.show();
    },    
        
    onItemClick: function(grid, record, item, index, e, options ) {
        var id = record.get( 'tip_idKey' );
        var view = grid.up( 'sttiposserviciosview' );
        var panel = view.targetTab ? view.targetTab : Ext.getCmp( 'center' );
        var title = '(' + record.get( 'tip_ccodigo' ) + ') Tipo Servicio';

        var model = this.getTipoServicioModelModel();
        model.load( id, {
            scope: this,
            failure: function( r, operation ) {
                //do something if the load failed
                //record is null
            },
            success: function( r, operation ) {
                var viewwin = Ext.widget( 'sttiposserviciosformview', {
                    caller: view,
                    record: r,
                    objectId: id,
                });

                var win = Ext.create( 'Ext.Window', {
                    iconCls: 'icon-table-add',
                    translate: false,
                    layout: 'fit',
                    title: title,
                    width: 450,
                    height: 250,
                    border: false,
                    items: viewwin
                });
                win.show();
            },
            callback: function( r, operation, success ) {
                //do something whether the load succeeded or failed
                //if operation is unsuccessful, record is null
            }
        })
    },    
            
    onObjectEdit: function(record, view ) {
        this.onItemClick( view, record );
    },

    onGetAllClick: function(button, event, options ) {
        var view = button.up( 'sttiposserviciosview' );
        var store = view.getStore();
        store.clearFilter();
        store.filter( view.filters );
        view.down( '#query' ).setValue( '' );
    },
            
    onSearchClick: function(button, event, options ) {
        var view = button.up( 'sttiposserviciosview' );
        var store = view.getStore();
        var fieldName = view.down( '#fieldName' ).getValue();
        var query = view.down( '#query' ).getValue();
        var filters = [];

        if( view.filters ) {
            filters = Ext.clone( view.filters );
        }

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

    //30-06-2023 Federico V. Modifique el onDeleteClick porque descubri que no estaba funcionando correctamente        
    onDeleteClick: function(button, event, options,  ) {
        var view = button.up( 'sttiposserviciosview' );
        var selection = view.getSelectionModel().getSelection()[ 0 ];
        if( selection ) {
            view.store.remove( selection );
            var delRec = view.store.getRemovedRecords();
            Ext.Array.each( delRec, function( rec ) {
                /** usando el proxy de otro model */
                var model = this.getTipoServicioModelModel();
                rec.setConfig({
                    proxy: model.getProxy()
                });
                /********************************************* */
                rec.destroy( {
                    callback: function( record, operation ) {
                        if( operation.success ) {
                            notify( 'Se eliminio exitosamente' );
                        }
                        else {
                            notify( 'No se puede eliminar el registro, esta siendo utilizado en el sistema.' );
                        }
                    }
                });
            }, this );
            //view.store.load();
        }
    }
});
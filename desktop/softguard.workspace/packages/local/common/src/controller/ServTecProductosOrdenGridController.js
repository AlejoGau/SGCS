//MIGRADO2024
Ext.define( 'Common.controller.ServTecProductosOrdenGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'ServTecProductosOrdenSearchModel', 'ServTecProductosOrdenModel' ],
    views: [ 'ServTecProductosOrdenGridView' ],
    init: function(config ) {
        // genero los eventos
        this.control(
        {
            'servtecproductosordengridview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectdelete: this.onObjectDelete,
                productSelected: this.onProductSelected
            },
            'servtecproductosordengridview button[action=search]': {
                click: this.onSearchClick
            },
            'servtecproductosordengridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'servtecproductosordengridview button[action=add]': {
                click: this.onAdd
            },
            'servtecproductosordengridview button[action="delete"]': {
                click: this.onDeleteClick
            },
            'servtecproductosordengridview button[action=asignarstock]': {
                click: this.onAsignarStock
            },
            'servtecproductosordengridview button[action=vermovimientos]': {
                click: this.onVerMovimeintos
            },
            'servtecproductosordengridview button[action=productosinsumidos]': {
                click: this.onProductosInsumidos
            }
        });
    },
        
    onProductosInsumidos: function (btn ) {
        var view = btn.up( 'servtecproductosordengridview' )
        var productview = Ext.widget( 'servtetecnicoproductoinsumidosview', {
            caller: view,
            record: view.record
        });
        var win = Ext.create( 'Ext.Window', {
            iconCls: 'icon-basket-go',
            layout: 'fit',
            title: 'Productos insumidos',
            width: 700,
            height: 400,
            border: false,
            items: productview
        });
        win.show();
    },
        
        
    onVerMovimeintos: function (btn ) {
        var view = btn.up( 'servtecproductosordengridview' )
        var movimientosview = Ext.widget( 'mstockcabeceraview', {
            caller: view,
            record: view.record,
            readOnly: true,
            byReferencia: true
        });
        var win = Ext.create( 'Ext.Window', {
            iconCls: 'icon-basket-put',
            layout: 'fit',
            title: 'Movimientos del servicio tecnico',
            width: 800,
            height: 400,
            border: false,
            items: movimientosview
        });
        win.show();
    },
        
    onAsignarStock: function (btn ) {
        var view = btn.up( 'servtecproductosordengridview' )
        var productview = Ext.widget( 'servtecasignacionstockview', {
            caller: view,
            record: view.record
        });
        var win = Ext.create( 'Ext.Window', {
            iconCls: 'icon-basket-go',
            layout: 'fit',
            title: 'Asignacion de stock',
            width: 700,
            height: 400,
            border: false,
            items: productview
        });
        win.show();
    },
    initView: function(view ) {
        view.filters = [
            {
                property: 'spr_iServicio',
                value: view.record.get( 'Id' )
            }
        ]
        view.store = Ext.create( 'Ext.data.Store', {
            model: this.getServTecProductosOrdenSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.bindStore( view.store );
        var toolbar = view.down( 'pagingtoolbar' );
        toolbar.bindStore( view.store );
        view.store.load();
        if( view.security && view.security.readOnly == true ) {
            view.down( '#add' ).hide()
        }
        var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
        var recordServtec = storeSecurity.findRecord( 'KeyReference', 'SerTec' )
        if( recordServtec && recordServtec.get( 'Available' ) == true ) {
            var _security = recordServtec.get( '_Security' );
            if( _security && _security.Supervisor == true ) {
                view.down( '#asignarstock' ).show()
            } else {
                view.down( '#productosinsumidos' ).show()
            }
        }
    },
        
    
        
    onAdd: function(grid, record, item, index, e, options ) {
        var id = 0;
        var view = grid.up( 'servtecproductosordengridview' );
        //  var panel = view.targetTab?view.targetTab:Ext.getCmp('center');
        var title = 'Nuevo producto';
        /*   record = this.getTablasProductosModelModel();
        
            
            var myobject = record.create({
            });          */
        var productview = Ext.widget( 'productgridview', {
            caller: view,
            tipo: 'helper',
            hideAdd: true
        });
        var win = Ext.create( 'Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: title,
            width: 700,
            height: 400,
            border: false,
            items: productview
        });
        win.show();
    },    
        
    onProductSelected: function(record, view ) {
        var controller = this;
        Ext.MessageBox.prompt( 'Cantidad', getLocale( 'Ingrese la cantidad:' ), function( btn, cantidad ) {
            if( btn != 'cancel' ) {
                controller.getServTecProductosOrdenModelModel().create( {
                    Id: 0,
                    spr_iServicio: view.record.get( 'Id' ),
                    spr_iProducto: record.get( 'Id' ),
                    spr_iCantidad: cantidad
                }).save( {
                    callback: function() {
                        var toolbar = view.down( 'pagingtoolbar' );
                        toolbar.doRefresh();
                        notify( 'El producto se agrego con exito.' )
                    }
                });
            }
        });
    },
        
    onObjectEdit: function(record, view ) {
        this.onItemClick( view, record );
    },
    onItemClick: function (view, record ) {
        if( view.security && view.security.readOnly == true ) {
            return false;
        }
        var controller = this;
        Ext.MessageBox.prompt( 'Cantidad', getLocale('Ingrese la cantidad:'), function( btn, cantidad ) {
            if( btn != 'cancel' ) {
                controller.getServTecProductosOrdenModelModel().load( record.get( 'Id' ), {
                    callback: function( rec ) {
                        rec.set( 'spr_iCantidad', cantidad );
                        rec.save( {
                            callback: function() {
                                var toolbar = view.up( 'servtecproductosordengridview' ).down( 'pagingtoolbar' );
                                toolbar.doRefresh();
                                notify( 'El producto se modificado con exito.' )
                            }
                        });
                    }
                });
            }
        });
    },
    onGetAllClick: function(button, event, options ) {
        var view = button.up( 'servtecproductosordengridview' );
        var store = view.getStore();
        store.clearFilter( true );
        store.filter( view.filters );
        view.down( '#query' ).setValue( '' );
    },
        
    onSearchClick: function(button, event, options ) {
        var view = button.up( 'servtecproductosordengridview' );
        var store = view.getStore();
        var fieldName = view.down( '#fieldName' ).getValue();
        var query = view.down( '#query' ).getValue();
        store.clearFilter( true );
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
        
    onObjectDelete: function(rec, view ) {
        var controller = this;
        /*rec.setConfig({
            proxy: controller.getServTecProductosOrdenModelModel().getProxy()
        });*/
        //rec.getProxy().url = controller.getServTecProductosOrdenModelModel().getProxy().url;
        var model = controller.getServTecProductosOrdenModelModel();
        
        model.load(rec.get("Id"),{
            callback: function(record, operation){
                record.erase( {
                    callback: function( record, operation ) {
                        if( operation.success ) {
                            notify( 'Se eliminio exitosamente' );
                        }
                        else {
                            notify( 'No se puede eliminar el registro, esta siendo utilizado en el sistema.' );
                        }
                        view.store.load();
                    }
                })                
            }
        });

    }
});
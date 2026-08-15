//MIGRADO2024
Ext.define( 'Common.controller.STDepositoGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'STDepositoModel', 'STDepositoSearchModel', 't_stock_depositosModel', 't_stock_depositosSearchModel' ],
    views: [ 'STDepositoGridView' ],
    init: function(config) {
        // genero los eventos
        this.control({
            'stdepositoview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick,
                objectedit: this.onObjectEdit,
                objectchanged: this.onEventChanged
            },
            'stdepositoview button[action=search]': {
                click: this.onSearchClick
            },
            'stdepositoview button[action=getall]': {
                click: this.onGetAllClick
            },
            'stdepositoview button[action=add]': {
                click: this.onAdd
            },
            'stdepositoview button[action="delete"]': {
                click: this.onDeleteClick
            }
        });
    },
        
    onEventChanged: function(view ) {
        view.store.load();
    },
    initView: function(view ) {
        if( view.idOrganizacion ) {
            view.filters = [ {
                property: 'tsd_idorganizacion',
                value: view.idOrganizacion
            }]
        }
        view.store = Ext.create( 'Ext.data.Store', {
            model: this.getT_stock_depositosSearchModelModel(),
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
    onAdd: function(grid, record, item, index, e, options ) {
        var id = 0;
        var view = grid.up( 'stdepositoview' );
        var panel = view.targetTab ? view.targetTab : Ext.getCmp( 'center' );
        var title = 'Nuevo Deposito';
        record = this.getT_stock_depositosModelModel();
        var myobject = record.create( {
        });
        var view = Ext.widget( 'stdepositoformview', {
            caller: view,
            record: myobject,
            objectId: id,
        });
        var win = Ext.create( 'Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: title,
            width: 450,
            height: 200,
            border: false,
            items: view
        });
        win.show();
    },    
    onItemClick: function(grid, record, item, index, e, options ) {
        var id = record.get( 'Id' );
        var view = grid.up( 'stdepositoview' );
        var panel = view.targetTab ? view.targetTab : Ext.getCmp( 'center' );
        /** 
        if( record.get( 'tsd_idorganizacion' ) != 0 ) {
            var title = '(' + record.get( 'Id' ) + ') ' + getLocale( 'Deposito' );
        } else {
            var title = '(' + record.get( 'Id' ) + ') ' + getLocale( 'Deposito de tecnico' );
        }
        if( record.get( 'tsd_idtecnico' ) != 0 ) {
            var title = '(' + record.get( 'Id' ) + ') ' + getLocale( 'Deposito de tecnico' );
        } else if( record.get( 'tsd_idorganizacion' ) != 0 ) {
            var title = '(' + record.get( 'Id' ) + ') ' + getLocale( 'Deposito' );
        } else {
            var title = '(' + record.get( 'Id' ) + ') ' + getLocale( 'No definido' );
        }
        */
        var title = record.get('Name')
        var view = Ext.widget( 'despositopanelview', {//stdepositoformview
            caller: view,
            record: record,
            objectId: id,
            idOrganizacion: view.idOrganizacion
        });
        var win = Ext.create( 'Ext.Window', {
            iconCls: 'icon-table-add',
            translate: false,
            layout: 'fit',
            title: title,
            width: 800,
            height: 600,
            border: false,
            items: view
        });
        win.show();
    },    
        
    onObjectEdit: function(record, view ) {
        this.onItemClick( view, record );
    },
    onGetAllClick: function(button, event, options ) {
        var view = button.up( 'stdepositoview' );
        var store = view.getStore();
        store.clearFilter( true );
        store.filter( view.filters );
        view.down( '#query' ).setValue( '' );
    },
        
    onSearchClick: function(button, event, options ) {
        var view = button.up( 'stdepositoview' );
        var store = view.getStore();
        var fieldName = view.down( '#fieldName' ).getValue();
        var query = view.down( '#query' ).getValue();
        var filters = [];
        store.clearFilter( true );
        if( query != '' && fieldName != '' ) {
            filters.push( {
                property: fieldName + ':LIKE',
                value: query
            });
        }
        var tipo = view.down( '#tipo' ).getValue();
        if( tipo == 'tecnico' ) {
            filters.push( {
                property: 'tsd_idtecnico:NOT',
                value: 0
            });
        } else if( tipo == 'deposito' ) {
            filters.push( {
                property: 'tsd_idtecnico',
                value: 0
            });
        }
        store.filter( filters );
    },
        
    onDeleteClick: function(button, event, options ) {
        var view = button.up( 'stdepositoview' );
        var selection = view.getSelectionModel().getSelection()[ 0 ];
        var controller = this;
        if( selection ) {
            view.store.remove( selection );
            var delRec = view.store.getRemovedRecords();
            var proxy = controller.getT_stock_depositosModelModel().getProxy();
            Ext.Array.each( delRec, function( rec ) {
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
            
        }
    }
});
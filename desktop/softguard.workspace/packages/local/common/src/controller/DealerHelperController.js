//MIGRADO2024
Ext.define( 'Common.controller.DealerHelperController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'TablasLineasModel', 'TablasLineasSearchModel' ],
    views: [ 'DealerHelperView' ],
    init: function(config ) {
        // genero los eventos
        this.control(
        {
            'dealerhelperview': {
                afterrender: this.initView,
                itemdblclick: this.onItemClick
            },
            'dealerhelperview button[action=search]': {
                click: this.onSearchClick
            },
            'dealerhelperview button[action=select]': {
                click: this.onSelectClick
            },
            'dealerhelperview button[action=getall]': {
                click: this.onGetAllClick
            },
            'dealerhelperview button[action=add]': {
                click: this.onAdd
            }
        });
    },
        
    onAdd: function(grid, record, item, index, e, options ) {
        var view = grid.up( 'dealerhelperview' );
        var title = 'Nuevo Dealer';
        record = this.getTablasLineasModelModel();
        var myobject = record.create( {
            'lin_ccodigo': ''
        });
        var viewWin = Ext.widget( 'tablaslineasformview', {
            caller: view,
            record: myobject
        });
        var win = Ext.create( 'Ext.Window', {
            layout: 'fit',
            title: title,
            closeAction: 'destroy',
            width: 450,
            height: 420,
            border: false,
            items: [ viewWin ],
            listeners: {
                destroy: function() {
                    view.getStore().load()
                }
            }
        }).show()
    },  
        
    onItemClick: function(grid, record, item, index, e, options ) {
        var view = grid.up( 'dealerhelperview' );
        if( view.simpleSelect ) {
            if( record ) {
                view.caller.fireEvent( 'selectedDealer', record, view.caller )
                view.up( 'window' ).close()
            }
        }
    },
    onSelectClick: function (btn ) {
        var view = btn.up( 'dealerhelperview' )
        var selection = view.getSelectionModel().getSelection();
        if( selection ) {
            view.caller.fireEvent( 'selectedDealer', selection, view.caller )
            view.up( 'window' ).close()
        }
    },
    initView: function(view ) {
        view.filters = [];
        view.store = Ext.create( 'Ext.data.Store', {
            model: this.getTablasLineasSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: view.filters
        })
        view.store.proxy.extraParams = {
            porrango: 1
        };
        view.bindStore( view.store );
        var toolbar = view.down( 'pagingtoolbar' );
        toolbar.bindStore( view.store );
        view.store.load( {
            callback: function() {
                view.getSelectionModel().deselectAll();
            }
        });
        if( view.simpleSelect ) {
            view.down( '#select' ).hide()
        }
        //verifico si es admin full para mostrar el boton de crear dealer
        var modules = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
        if( modules.isModuleAvailable( 'Administrator' ) ) {
            var Security = modules.getModuleAvailable( 'Administrator' ).get( '_Security' )
            if( Security && Security.rights && Security.rights.cuenta == false ) {
                view.down( '#add' ).show()
            }
        }
    },
    
    onGetAllClick: function(button, event, options ) {
        var view = button.up( 'dealerhelperview' );
        var store = view.getStore();
        store.clearFilter();
        store.filter( view.filters );
        view.down( '#query' ).setValue( '' );
    },
        
    onSearchClick: function(button, event, options ) {
        var view = button.up( 'dealerhelperview' );
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
    }
});
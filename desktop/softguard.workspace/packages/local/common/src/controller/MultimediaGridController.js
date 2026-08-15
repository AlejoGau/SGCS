//MIGRADO2024
Ext.define( 'Common.controller.MultimediaGridController', {
    extend: 'Ext.app.Controller',
    stores: [],
    models: [ 'p_rximgSearchModel' ],
    views: [ 'MultimediaGridView' ],
    init: function (config ) {
        var me = this;
        // genero los eventos
        this.control( {
            'multimediagridview': {
                beforerender: this.loadData,
                //itemdblclick: this.onItemDblClick,
                objectedit: this.onObjectEdit
            },
            'multimediagridview button[action=search]': {
                click: this.onSearchClick
            },
            'multimediagridview button[action=todos]': {
                click: this.onTodosClick
            }
        });
    }, // cierro init
    onTodosClick: function(button, event, options ) {
        var view = button.up( 'multimediagridview' );
        //var store = view.getStore();
        //store.filters.clear();   
        view.down( '#fechadesde' ).setValue( '' )
        view.down( '#fechahasta' ).setValue( '' )
        this.onSearchClick( button )
    },
    onSearchClick: function(button, event, options ) {
        var view = button.up( 'multimediagridview' );
        var store = view.getStore();
        var fechadesde = view.down( '#fechadesde' );
        var fechahasta = view.down( '#fechahasta' );
        var filters = Ext.clone( store.filters.items );
        if( view.down( '#fechadesde' ).getValue() ) {
            filters.push( {
                property: 'rec_tfechahora:GTE',
                value: view.down( '#fechadesde' ).getValue(),
                id: 'rec_tfechahora:GTE'
            });
        } else {
            filters = filters.filter( function( r ) {
                return r.id != 'rec_tfechahora:GTE'
            })
        }
        if( view.down( '#fechahasta' ).getValue() ) {
            filters.push( {
                property: 'rec_tfechahora:LTE',
                value: view.down( '#fechahasta' ).getValue(),
                id: 'rec_tfechahora:LTE'
            });
        } else {
            filters = filters.filter( function( r ) {
                return r.id != 'rec_tfechahora:LTE'
            })
        }
        store.filters.clear( true );
        store.filter( filters );
    },
    loadData: function (view ) {
        var record = view.record;
        var module = view.module;
        var profile = module ? module.get( 'profile' ) : 1;
        view.profile = profile;
        var filters = []
        if( view.filter ) {
            filters.push( view.filter )
        }
        filters.push( {
            property: 'rec_iidcuenta',
            value: record.get( 'cue_iid' )
        })
        // genero una nueva instancia del store para que no se mezclen las grillas de relaciones de las diferentes paletas.
        var mystore = Ext.create( 'Ext.data.Store', {
            model: 'Common.model.p_rximgSearchModel',
            remoteFilter: true,
            remoteSort: true,
            filters: filters,
            sort: [ {
                property: 'rec_tfechahora',
                direction: 'DESC'
            }]
        });
        var toolbar = view.down( 'pagingtoolbar' );
        toolbar.bindStore( mystore );
        mystore.load();
        view.bindStore( mystore );
        KeyModulesStore;//var storeKeyModule = this.getKeyModulesStoreStore();
        var isAvailable = KeyModulesStore.isModuleAvailable( 'Video' );
        if( !isAvailable ) {
            notify( 'No es posible acceder a la funcionalidad completa de esta solapa. Consulte con el proveedor del servicio.' )
            view.down( 'gridview' ).setDisabled( true );
        }
    }
});
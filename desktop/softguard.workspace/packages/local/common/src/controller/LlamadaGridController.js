//MIGRADO2024
Ext.define( 'Common.controller.LlamadaGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'GrabacionAudioSearchModel', 'LlamadasSearchModel' ],
    views: [ 'LlamadaGridView' ],
    init: function(config ) {
        // genero los eventos
        this.control( {
            'llamadagridview': {
                afterrender: this.initView
            },
            '#gridllamada #buscargrabadas': {
                click: this.onSearchClick
            },
            '#gridllamada #todosgrabadas': {
                click: this.onTodosClick
            }
        });
    }, // cierro init
    initView: function(view ) {
        var record = view.record;
        view.filter = [];
        if( record.get( 'cue_iid' ) ) {
            view.filter.push( {
                property: 'gra_iidcuenta',
                value: record.get( 'cue_iid' )
            });
        }
        if( record.get( 'rec_iid' ) ) {
            view.filter.push( {
                property: 'gra_iidrecepcion',
                value: record.get( 'rec_iid' )
            });
        }
        view.store = Ext.create( 'Ext.data.Store', {
            model: this.getGrabacionAudioSearchModelModel(),
            remoteFilter: true,
            autoload: false,
            filters: view.filter
        });
        var myGrid = view.down( '#gridllamada' );
        // var toolbar = myGrid.down('pagingtoolbar');
        // toolbar.bindStore(store);
        myGrid.bindStore( view.store );
        view.store.load();
        var storeKey = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
        storeKey.each( function( recordModule ) {
            // *************   aun no existe ese permiso en las key *******************
            /* if (!store.isModuleAvailable('Logger')){
                notify('Ud. no posee los permisos necesarios para utilizar llamadas grabadas.')
                view.down('#gridllamada').setDisabled(true);
            }*/
        })
    },
        
    onSearchClick: function(button, event, options ) {
        var view = button.up( '#gridllamada' );
        var viewgrid = button.up( 'llamadagridview' );
        var filters = Ext.clone( viewgrid.filter );;
        view.store.clearFilter( true );
        if( view.down( '#codigoalarma' ).getValue() ) {
            filters.push( {
                property: 'rec_calarma',
                value: view.down( '#codigoalarma' ).getValue(),
                id: 'codigoalarma'
            })
        }
        if( view.down( '#fechadesde' ).getValue() ) {
            filters.push( {
                property: 'o.[gra_dfechahora]:GT',
                value: Ext.Date.parse( Ext.Date.format( view.down( '#fechadesde' ).getValue(), 'Y-m-d' ) + ' ' + Ext.Date.format( view.down( '#horadesde' ).getValue(), 'h:i:s a' ), 'Y-m-d h:i:s a' ),
                id: 'fechadesde'
            });
        }
        if( view.down( '#fechahasta' ).getValue() ) {
            filters.push( {
                property: 'o.[gra_dfechahora]:LT',
                value: Ext.Date.parse( Ext.Date.format( view.down( '#fechahasta' ).getValue(), 'Y-m-d' ) + ' ' + Ext.Date.format( view.down( '#horahasta' ).getValue(), 'h:i:s a' ), 'Y-m-d h:i:s a' ),
                id: 'fechahasta'
            });
        }
        view.store.filter( filters );
    },
        
        
    onTodosClick: function(button ) {
        var view = button.up( '#gridllamada' );
        view.up( 'llamadagridview' ).store.clearFilter( true );
        view.up( 'llamadagridview' ).store.filter( view.up( 'llamadagridview' ).filter );
        //store.load();
        view.down( '#fechadesde' ).setValue( '' );
        view.down( '#fechahasta' ).setValue( '' );
        view.down( '#horadesde' ).setValue( '' );
        view.down( '#horahasta' ).setValue( '' );
        view.down( '#codigoalarma' ).setValue( '' );
    }
});
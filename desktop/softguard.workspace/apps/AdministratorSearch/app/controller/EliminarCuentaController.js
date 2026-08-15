Ext.define( 'AdministratorSearch.controller.EliminarCuentaController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'CuentaSearchModel', 'SoftguardCuentaModel', 'SoftguardEstadoModel' ],
views: [ 'EliminarCuentaView' ],

init: function(config ) {
    // genero los eventos
    this.control(
        {
            'eliminarcuentaview': {
                afterrender: this.initView
            },
            'eliminarcuentaview button[action="cuentaDelete"]': {
                click: this.onDeleteClick
            },
            'eliminarcuentaview button[action=removefilter]': {
                click: this.onRemovefilterClick
            },
            'eliminarcuentaview button[action=getall]': {
                click: this.onGetAllClick
            },
            'eliminarcuentaview button[action=filterText]': {
                click: this.onFiltertextClick
            },
            'eliminarcuentaview button[action=export]': {
                //Federico V. agregue el llamado al boton de exportar para que cumpla la funcion de exportar las cuentas a eliminar 
                click: this.onExportarClick
            },
            'eliminarcuentaview button[action=cuentaHabilitar]': {
                click: this.onHabilitarCuentaClick
            }


        });
},

initView: function(view ) {
    var controller = this;

    var store = Ext.create( 'Ext.data.Store', {
        model: this.getCuentaSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        listeners: {
            beforeload: controller.onBeforeload
        },
        filters: [
            {
                property: 'Situacion',
                value: 'Eliminar'
            }
        ],
        sorters: [
            {
                property: 'cue_ncuenta',
                direction: 'ASC'
            }
        ]
    })
    view.bindStore( store );
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.bindStore( store );
    store.load();

},
    
onBeforeload: function(store, operation, options ) {
    operation.store = store;
},
    
    
onHabilitarCuentaClick: function(button ) {
    var view = button.up( 'eliminarcuentaview' );
    var model = this.getSoftguardCuentaModelModel();
    var proxy = model.getProxy();
    var store = view.getStore();
    var selected = view.getSelectionModel().getSelection();
    var count = selected.length;
    var controller = this;

    Ext.Msg.show( {
        title: getLocale( 'Está seguro?' ),
        msg: getLocale( 'Esta a punto de habilitar una cuenta' ),
        buttons: Ext.Msg.YESNOCANCEL,
        icon: Ext.Msg.QUESTION,
        fn: function( btn ) {
            if( btn == "yes" ) {
                Ext.Array.each( selected, function( cuenta ) {

                    controller.getSoftguardEstadoModelModel().load( cuenta.get( 'cue_iid' ), {
                        callback: function( record, operation ) {
                            record.set( 'est_nestado', 0 );
                            record.set( 'est_ntipo', 0 );
                            record.save( {
                                callback: function() {

                                    count--;

                                    if( count == 0 ) {
                                        view.down( 'pagingtoolbar' ).doRefresh();
                                    }

                                }
                            })

                        }
                    })

                })
            }
        }
    });

},
    
onDeleteClick: function(button ) {
    var view = button.up( 'eliminarcuentaview' );
    var model = this.getSoftguardCuentaModelModel();
    var proxy = model.getProxy();
    var store = view.getStore();
    var selected = view.getSelectionModel().getSelection();
    var count = selected.length;
    var controller = this;

    Ext.Msg.show( {
        title: getLocale( 'Está seguro?' ),
        msg: getLocale( 'Los datos eliminados no se pueden recuperar' ),
        buttons: Ext.Msg.YESNOCANCEL,
        icon: Ext.Msg.QUESTION,
        fn: function( btn ) {
            if( btn == "yes" ) {
                Ext.Array.each( selected, function( cuenta ) {
                    var name = cuenta.get( 'cue_cnombre' );
                    var fullName = cuenta.get( 'cue_cnombre' ) + " " + cuenta.get( 'cue_clinea' ) + "-" + cuenta.get( 'cue_ncuenta' )
                    cuenta.setConfig({
                        proxy: model.getProxy()
                    });
                    cuenta.destroy( {
                        callback: function() {
                            count--;

                            Ext.Ajax.request( {
                                url: '/Rest/Search/AuditoriaInsert',
                                params: {
                                    aud_iidOperador: 1,
                                    aud_cLogin: _UserData.UserId.substring( 0, 20 ),
                                    aud_cProceso: 'Cuentas',
                                    aud_cAccion: 'D',
                                    aud_cTerminal: '_WW',
                                    aud_cObservacion: fullName

                                },
                                method: 'GET',
                                scope: this,
                                success: function( response ) {

                                    notify( 'Se notifico en auditoria.' );
                                }
                            });


                            if( count == 0 ) {
                                view.down( 'pagingtoolbar' ).doRefresh();
                            }
                        }
                    });
                })
            }
        }
    });

},
    
onFiltertextClick: function(button, event, options ) {
    var view = button.up( 'eliminarcuentaview' );
    var store = view.getStore();
    var query = view.down( '#query' );
    var queryType = view.down( '#queryType' );
    store.filters.clear();
    store.currentPage = 1;

    var queryProperty = queryType.getValue();
    var queryValue = query.getValue();

    var filter = null;

    switch( queryProperty ) {
        case 'cue_ncuenta':
            filter = {
                property: 'cue_ncuenta',
                value: queryValue,
                anyMatch: true
            };
            break;
        case 'cue_clinea':
            filter = {
                property: 'cue_clinea',
                value: queryValue,
                anyMatch: true
            };
            break;
        case 'cue_cnombre':
            filter = {
                property: 'cue_cnombre',
                value: queryValue,
                anyMatch: true
            };
            break;
        case 'cue_ccalle':
            filter = {
                property: 'cue_ccalle',
                value: queryValue,
                anyMatch: true
            };
            break;
        case 'cue_cemail':
            filter = {
                property: 'cue_cemail',
                value: queryValue,
                anyMatch: true
            };
            break;
        case 'cue_ctelefono':
            filter = {
                property: 'cue_ctelefono',
                value: queryValue,
                anyMatch: true
            };
            break;
        default:
            filter = null;
    }

    if( filter != null ) {
        store.filters.add( filter );
    }

    // Agregar filtro por situacion eliminar
    var filterBySituacion = {
        property: 'Situacion',
        value: 'Eliminar'
    };
    store.filters.add( filterBySituacion );

    store.filter( store.filters.getRange() );
},
    
onGetAllClick: function(button, event, options ) {
    var view = button.up( 'eliminarcuentaview' );
    var store = view.getStore();
    var query = view.down( '#query' );
    var queryType = view.down( '#queryType' );
    store.filters.clear();
    store.currentPage = 1;

    var filterBySituacion = {
        property: 'Situacion',
        value: 'Eliminar'
    };
    store.filters.add( filterBySituacion );

    store.filter( store.filters.getRange() );

},

onRemovefilterClick: function(button, event, options ) {
    var view = button.up( 'eliminarcuentaview' );
    var store = view.getStore();
    store.currentPage = 1;
    store.clearFilter();
    view.down( '#query' ).setValue( '' );
},
    
onExportarClick: function(button ) {
    var view = button.up( 'eliminarcuentaview' );
    //   var grid = view.down('#gridcuenta');
    var store = view.getStore();
    console.log('click')
    var url = store.lastUrl;
    var partes = url.split( /\?/ );
    url = partes[ 0 ] + '.xls?' + partes[ 1 ]


    url = Ext.urlAppend( url, 'limit=10000' );
    location.href = url;
}
    


});
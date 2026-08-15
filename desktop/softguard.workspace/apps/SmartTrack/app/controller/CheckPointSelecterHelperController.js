Ext.define( 'SmartTrack.controller.CheckPointSelecterHelperController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'CheckPointsSearchModel', 'CheckPointsModel', 'SoftguardZonaModel' ],
views: [ 'CheckPointSelecterHelperView', 'CheckSelecterField' ],

init: function(config ) {
    // genero los eventos
    this.control( {
        'checkpointselecterhelperview': {
            //afterrender : this.initView,
            beforerender: this.initView
            /* destroy: function (view) {
                 view.combostore.destroyStore()
                 view.down('#gridtodos').selModel.destroy()
             }*/
        },
        'checkpointselecterhelperview #agregar': {
            click: this.onAgregarClick
        },
        'checkpointselecterhelperview #quitar': {
            click: this.onQuitarClick
        },
        'checkpointselecterhelperview #listo': {
            click: this.onListoClick
        },
        'checkpointselecterhelperview #buscar': {
            click: this.onBuscarClick
        },
        'checkpointselecterhelperview #todos': {
            click: this.onTodosClick
        },
        'checkpointselecterhelperview #gridtodos': {
            itemclick: this.onItemDblClick,
            itemdblclick: this.onItemDblTodosClick
        },
        'checkpointselecterhelperview #gridselecionados': {
            itemdblclick: this.onItemDblSeleccionadosClick
        },
        'checkselecterfield #checkpoint': {
            click: this.onEventoClick
        },
        'checkselecterfield #deleteCheck': {
            click: this.ondeleteCheckeClick
        },
        'checkselecterfield': {
            selectedEvents: this.eventsSelected
        }


    });
}, // cierro init

eventsSelected: function(record, view ) {
    var descripcion = '';
    var codigo = '';
    if( record.items ) {
        var codArray = [];
        var descArray = [];
        Ext.Array.each( record.items, function( rec ) {
            descArray.push( rec.get( 'zon_mobservacion' ) );
            codArray.push( rec.get( 'zon_idKey' ) );
        })

        descripcion = descArray.join( ',' );
        codigo = codArray.join( ',' );

    } else {
        descripcion = record.get( 'zon_mobservacion' )
        codigo = record.get( 'zon_idKey' )
    }

    view.down( '#nombrecheckpoint' ).setValue( descripcion )
    view.down( '#codcheck' ).setValue( codigo )
    view.down( '#deleteCheck' ).show()
    view.fireEvent( 'change', view, codigo )
    if( view.up( 'menu' ) ) {
        view.up( 'button' ).showMenu()
    }

},
    
ondeleteCheckeClick: function (btn ) {
    var view = btn.up( 'checkselecterfield' );
    view.down( '#deleteCheck' ).hide()

    view.down( '#nombrecheckpoint' ).setValue( '' )
    view.down( '#codcheck' ).setValue( '' )
    view.fireEvent( 'change', view, '' )
    view.setValue( '' );
    if( view.up( 'menu' ) ) {
        view.up( 'button' ).showMenu()
    }
},
        
onEventoClick: function (btn ) {
    var view = btn.up( 'checkselecterfield' );

    var simpleSelect = true;
    if( !view.simpleSelect ) {
        simpleSelect = false;
    } else {
        simpleSelect = view.simpleSelect
    }

    var filter = [];
    if( view.filter ) {
        filter = view.filter
    }

    view.eventosSeleccionados = view.down( '#codcheck' ).getValue()

    var myWindow = Ext.widget( 'window', {
        title: 'Selector de eventos',
        height: 400,
        width: 900,
        //autoScroll: true,
        modal: true,
        autoDestroy: true,
        closeAction: 'destroy',
        items: [ {
            xtype: 'checkpointselecterhelperview',
            eventSelected: view.eventosSeleccionados,
            caller: view,
            filter: filter,
            simpleSelect: simpleSelect,
            closeAction: 'destroy',
            limitEventSelect: view.limitEventSelect ? view.limitEventSelect : 0
        }],
        layout: 'fit'
    }).show();



    myWindow.on( 'selectedEvents', function() {
        console.log( arguments )
    })



},
    
    
initView: function(view ) {
    
    var filter = view.filter ? Ext.Array.clone( view.filter ) : [];

    if( view.simpleSelect ) {
        view.down( '#botones' ).hide();
        view.down( '#gridselecionados' ).hide();
        view.down( '#listo' ).hide();

        /*var dom = Ext.dom.Query.select('.x-column-header-checkbox');
        var el = Ext.get(dom[0]); 
        el.hide()*/

        //  view.down('#gridtodos').selModel.setLocked(true)
    }


    var controller = this;
    var model = this.getCheckPointsSearchModelModel()
    var combo = view.down( '#gridtodos' );
    view.combostore = Ext.create( 'Ext.data.Store', {
        model: model,
        pageSize: 1000,
        remoteSort: false,
        remoteFilter: true,
        autoDestroy: true,
        filters: [ {
            property: 'cue_iid',
            value: view.cuenta.get( 'cue_iid' )
        }],
        sorters: [
            {
                property: 'zon_mobservacion',
                direction: 'ASC'
            }
        ]
    })
    combo.bindStore( view.combostore );
    

    var todos = view.down( '#gridtodos' )

    view.combostore.load( {
        callback: function() {
            var selecionadosstore = Ext.create( 'Ext.data.Store', {
                model: model,
                pageSize: 1000,
                remoteSort: false,
                autoDestroy: true,

                sorters: [
                    {
                        property: 'zon_mobservacion',
                        direction: 'ASC'
                    }
                ]
            })
            view.down( '#gridselecionados' ).bindStore( selecionadosstore );


            if( view.eventSelected ) {
                Ext.Array.each( view.eventSelected.split( "," ), function( alarma ) {


                    var alarmaRecord = view.combostore.findRecord( 'zon_mobservacion', alarma );
                    view.down( '#gridselecionados' ).getStore().addSorted( controller.getCheckPointsSearchModelModel().create( Ext.clone( alarmaRecord.data ) ) )
                    todos.getStore().remove( alarmaRecord )
                })
            }

        }
    });


    console.log( filter )
},
    
    
onItemDblSeleccionadosClick: function(view, record, item, index, e, options ) {

    var view = view.up( 'checkpointselecterhelperview' )
    var controller = this;
    if( !view.simpleSelect ) {


        var grillaselecionados = view.down( '#gridselecionados' )
        var todos = view.down( '#gridtodos' )



        grillaselecionados.getStore().remove( record )
        todos.getStore().addSorted( controller.getCheckPointsSearchModelModel().create( Ext.clone( record.data ) ) )


        grillaselecionados.getStore().sort()
        todos.getStore().sort()



    }

},
    
    
onItemDblTodosClick: function(view, record, item, index, e, options ) {

    var view = view.up( 'checkpointselecterhelperview' )
    var controller = this;
    if( !view.simpleSelect ) {


        var grillaselecionados = view.down( '#gridselecionados' )
        var todos = view.down( '#gridtodos' )

        grillaselecionados.getStore().addSorted( controller.getCheckPointsSearchModelModel().create( Ext.clone( record.data ) ) )
        todos.getStore().remove( record )


        grillaselecionados.getStore().sort()
        todos.getStore().sort()

    }

},
    
onItemDblClick: function(view, record, item, index, e, options ) {

    var view = view.up( 'checkpointselecterhelperview' )

    if( view.simpleSelect ) {

        view.caller.fireEvent( view.toEvent ? view.toEvent : 'selectedEvents', record, view.caller )
        view.up( 'window' ).close()

    }

},
    
    
onBuscarClick: function (btn ) {
    var view = btn.up( 'checkpointselecterhelperview' )
    var filter = view.filter ? Ext.Array.clone( view.filter ) : [];
    console.log( filter )
    Ext.Array.push( filter, {
        property: 'porNombreOCodigo',
        id: 'porNombreOCodigo',
        value: view.down( '#query' ).getValue()
    })

    view.combostore.clearFilter( true )
    view.combostore.filter( filter );

},   
    
    
onTodosClick: function (btn ) {
    var view = btn.up( 'checkpointselecterhelperview' )
    var store = view.combostore;
    store.currentPage = 1;
    store.filters.clear( false );
    var filter = view.filter ? Ext.Array.clone( view.filter ) : [];

    store.filter( filter );
    view.down( '#query' ).setValue( '' );

},   
    
onListoClick: function (btn ) {
    var view = btn.up( 'checkpointselecterhelperview' );
    
    var selectedCheckpoints = view.down( '#gridselecionados' ).getStore().getRange();
    var checkpointIds = selectedCheckpoints.map( function( record ) {
        return record.get( 'chp_idKey' ); // Ajusta 'chp_idKey' según el campo que identifique a cada checkpoint
    });
    var filterValue = checkpointIds.join(',');
    var mainView = view.caller;

    
    var dialog = Ext.create( 'Ext.window.MessageBox', {
        buttons: [
            {
                text: 'Solo copiar',
                handler: function() {
                    Ext.Ajax.request( {
                        url: '/rest/search/CopiarCheckPointsSelected',
                        params: {
                            cuentaDesde: view.cuenta.get( 'cue_iid' ),
                            cuentaHasta: view.caller.record.get( 'cue_iid' ),
                            remplazarDuplicados: 0,
                            filter: Ext.encode([{property: 'chp_idkey:inint', value: filterValue}]) // Enviar los checkpoints seleccionados
                        },
                        method: 'GET',
                        scope: this,
                        success: function( response ) {
                            var parametros = Ext.JSON.decode( response.responseText );
                            var rec = parametros.rows[ 0 ];

                            mainView.fireEvent( 'objectchanged', mainView );
                            view.up( 'window' ).close();
                            dialog.close();
                        }
                    });
                }
            },
            {
                text: 'Remplazar duplicados',
                handler: function() {
                    Ext.Ajax.request( {
                        url: '/rest/search/CopiarCheckPointsSelected',
                        params: {
                            cuentaDesde: view.cuenta.get( 'cue_iid' ),
                            cuentaHasta: view.caller.record.get( 'cue_iid' ),
                            remplazarDuplicados: 1,
                            filter: Ext.encode([{property: 'chp_idkey:inint', value: filterValue}]) // Enviar los checkpoints seleccionados
                        },
                        method: 'GET',
                        scope: this,
                        success: function( response ) {
                            var parametros = Ext.JSON.decode( response.responseText );
                            var rec = parametros.rows[ 0 ];

                            mainView.fireEvent( 'objectchanged', mainView );
                            view.up( 'window' ).close();
                            dialog.close();
                        }
                    });
                }
            },
            {
                text: 'Cancelar',
                handler: function() {
                    dialog.close();
                }
            }
        ]
    });

    dialog.show( {
        title: getLocale( 'Copiar checkpoints?' ),
        msg: getLocale( 'Desea remplazar los checkpoints que se encuentran duplicados?' ),
        icon: Ext.Msg.QUESTION
    });
},



onAgregarClick: function (btn ) {
    var view = btn.up( 'checkpointselecterhelperview' );
    var grillaselecionados = view.down( '#gridselecionados' )
    var selection = view.down( '#gridtodos' ).getSelectionModel().getSelection();
    var todos = view.down( '#gridtodos' )
    var controller = this;
    if( selection ) {

        Ext.Array.each( selection, function( rec ) {

            grillaselecionados.getStore().addSorted( controller.getCheckPointsSearchModelModel().create( Ext.clone( rec.data ) ) )
            todos.getStore().remove( rec )
        });

        grillaselecionados.getStore().sort()
        todos.getStore().sort()

    }
},
    
    
onQuitarClick: function (btn ) {
    var view = btn.up( 'checkpointselecterhelperview' );
    var grillaselecionadosseleccion = view.down( '#gridselecionados' ).getSelectionModel().getSelection()
    var selection = view.down( '#gridtodos' ).getSelectionModel().getSelection();
    var grillaselecionados = view.down( '#gridselecionados' );
    var todos = view.down( '#gridtodos' )
    var controller = this;
    if( grillaselecionados ) {

        Ext.Array.each( grillaselecionadosseleccion, function( rec ) {

            grillaselecionados.getStore().remove( rec )
            todos.getStore().addSorted( controller.getCheckPointsSearchModelModel().create( Ext.clone( rec.data ) ) )
        });

        grillaselecionados.getStore().sort()
        todos.getStore().sort()
    }
}
    
});
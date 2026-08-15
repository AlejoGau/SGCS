//MIGRADO2024
Ext.define( 'Common.controller.CuentaResolucionFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'ResolucionModel', 'm_CuentasConnModel', 'm_CuentasConnSearchModel', 'SoftguardCuentaModel' ],
views: [ 'ResolucionFormView' ],

init: function(config ) {
    this.control( {
        'resolucionformview': {
            afterrender: this.initview
        },
        'resolucionformview #agregar': {
            click: this.onAgregarClick
        },
        'resolucionformview #buscar': {
            click: this.onBuscarClick
        },
        'resolucionformview #todos': {
            click: this.onTodosClick
        },
        'resolucionformview #quitar': {
            click: this.onQuitarClick
        },
        'resolucionformview button[action="save"]': {
            click: this.onSaveClick
        }
    })
},

onAgregarClick: function (btn ) {
    var view = btn.up( 'resolucionformview' );
    var grillaselecionados = view.down( '#gridselecionados' )
    var selection = view.down( '#gridtodos' ).getSelectionModel().getSelection();
    var todos = view.down( '#gridtodos' )
    var controller = this;
    if( selection ) {
        Ext.Array.each( selection, function( rec, k ) {
            var record = controller.getM_CuentasConnSearchModelModel().create( Ext.clone( rec.data ) )
            grillaselecionados.getStore().addSorted( record )
            todos.getStore().remove( rec )
            var model = controller.getM_CuentasConnModelModel();
            var record = Ext.create( model, {
                name: '',
                cco_iConexion: rec.get( 'iprsc_ipcidkey' ),
                cco_iidCuenta: view.record.get( 'cue_iid' )
            })
            record.save( {
                callback: function() {
                    if( selection.length <= k + 1 ) {
                        if( view.storeSeleccionados )
                            view.storeSeleccionados.load()
                    }
                }
            })
        });
        grillaselecionados.getStore().sort()
        todos.getStore().sort()
    }
},

initview: function(view ) {
    const record = view.record;
    var controller = this;

    view.down( '#imei' ).setValue( record.get( 'cue_cIMEI' ) );
    view.down( '#idext' ).setValue( record.get( 'cue_cIdExtendido' ) );

    view.storeReceptores = Ext.create( 'Ext.data.Store', {
        model: controller.getResolucionModelModel(),
        pageSize: 150,
        remoteSort: true,
        remoteFilter: true
    });



    view.storeReceptores.load( {
        callback: function( records ) {

            view.storeSeleccionados = Ext.create( 'Ext.data.Store', {
                model: controller.getM_CuentasConnSearchModelModel(),
                pageSize: 150,
                remoteSort: true,
                remoteFilter: true,
                filters: [ {
                    property: 'cco_iidCuenta',
                    value: record.get( 'cue_iid' )
                }
                ]
            });
            view.down( '#gridtodos' ).bindStore( view.storeReceptores );
            view.down( '#gridselecionados' ).bindStore( view.storeSeleccionados );
            view.storeSeleccionados.load( seleccionados => {

            });
        }
    });
},


onTodosClick: function (btn ) {
    var view = btn.up( '#gridtodos' );
    var store = view.getStore();
    store.currentPage = 1;


    store.clearFilter( true );


    var filter = [
        {
            property: 'for_cformatoNOT',
            value: view.up( 'resolucionformview' ).record.get( 'for_cformato' )
        }
    ];


    store.addFilter( filter );


    store.load();


    if( view.down( '#query' ) ) {
        view.down( '#query' ).setValue( '' );
    }
},

onBuscarClick: function (btn ) {
    var view = btn.up( 'resolucionformview' );
    var filter = view.filter ? Ext.Array.clone( view.filter ) : [];


    view.storeReceptores.clearFilter( true );


    var newFilter = {
        property: 'iprs_ccnombre:LIKE',
        id: 'iprs_ccnombre',
        value: view.down( '#query' ).getValue()
    };


    Ext.Array.push( filter, newFilter );


    view.storeReceptores.filter( filter );
},


onQuitarClick: function (btn ) {
    var view = btn.up( 'resolucionformview' );
    var grillaselecionadosseleccion = view.down( '#gridselecionados' ).getSelectionModel().getSelection()
    var selection = view.down( '#gridtodos' ).getSelectionModel().getSelection();
    var grillaselecionados = view.down( '#gridselecionados' );
    var todos = view.down( '#gridtodos' )
    var controller = this;
    if( grillaselecionados ) {
        Ext.Array.each( grillaselecionadosseleccion, function( rec ) {
            var _model = controller.getM_CuentasConnModelModel();
            _model.load( rec.get( 'Id' ) ? rec.get( 'Id' ) : rec.get( 'iprsc_ipcidkey' ), {
                success: function( _rec ) {
                    _rec.destroy();
                    grillaselecionados.getStore().remove( rec )
                    //todos.getStore().addSorted( controller.getM_CuentasConnSearchModelModel().create( Ext.clone( rec.data ) ) )
                }
            })
        });
        grillaselecionados.getStore().sort()
        todos.getStore().sort()
    }
},
onSaveClick: function(button, event, options ) {
    var view = button.up( 'resolucionformview' );
    var myform = button.up( 'form' ).getForm();
    var win = button.up( 'window' );
    var record = view.record;

    myform.updateRecord( record );

    if( myform.isValid() ) {
        //record.set( 'for_cnombre', record.get( 'for_cdescripcion' ) );
        //record.set( 'for_idKey', record.get( 'Id' ) );
        record.save( {
            scope: this,
            view: view,
            callback: function( record, operation ) {
                if( operation.success ) {
                    notify( 'Los datos se guardaron correctamente' );
                    //view.caller.fireEvent( 'objectchanged', view.caller, record );
                    view.record = record
                    view.loadRecord( record )
                    //view.close()
                } else {
                    notifyError( 'Hubo un error al guardar los datos' );
                }
            },
            button: button
        });
    }

},

 
})
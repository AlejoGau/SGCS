Ext.define( 'AdministratorSearch.controller.FormatosFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'FormatosGridModel', 'TablasCodigosAlarmaSearchModel', 'ReceptoresCabUNIQUEModel', 'FormatosModel', 'ReceptoresSearchModel', 'ReceptorFormatosSearchModel', 'ReceptorModel' ],
    views: [ 'FormatosFormView' ],

    init: function(config ) {
        // genero los eventos
        this.control( {
            'formatosformview': {
                afterrender: this.initview,
                selectedEvents: this.eventsSelected
            },
            'formatosformview button[action="save"]': {
                click: this.onSaveClick
            },
            'formatosformview #evento': {
                click: this.onEventoClick
            },
            'formatosformview #limpiarevento': {
                click: this.onLimpiarEventoClick
            },
            'formatosformview #agregar': {
                click: this.onAgregarClick
            },
            'formatosformview #quitar': {
                click: this.onQuitarClick
            },
            'formatosformview #buscar': {
                click: this.onBuscarClick
            },
            'formatosformview #todos': {
                click: this.onTodosClick
            }
        });
    }, // cierro init

    onTodosClick: function (btn ) {
        var view = btn.up( '#gridtodos' )
        var store = view.getStore();
        store.currentPage = 1;

        /** Modificado dado que, se hacia el buscar todo en base a la configuracion del Store de la VIEW
         * y en realidad se debe realizar el Load y Filter del Store del gridPanel de #GridTodos
         * cuando hay una busqueda por #query, el filter.lenght es > 2, por lo que cuando presiono todos, hago limpieza
         * y procedo a volver a filtrar el Store de gridPanel como en el initView buscando el record de la view principal
         **/
        if( store.filters.length > 1 ) {
            store.filters.clear( true );
            var filter = [ {
                property: 'for_cformatoNOT',
                value: view.up( 'formatosformview' ).record.get( 'for_cformato' )
            }]
            store.filter( filter );
        } else {
            store.filter( filter );
        }
        view.down( '#query' ).setValue( '' );
    },
        
    onBuscarClick: function (btn ) {
        var view = btn.up( 'formatosformview' )
        var filter = view.filter ? Ext.Array.clone( view.filter ) : [];

        Ext.Array.push( filter, {
            property: 'rec_cdescripcionORrec_cdll',
            id: 'rec_cdescripcionORrec_cdll',
            value: view.down( '#query' ).getValue()
        });
        view.storeReceptores.proxy.extraParams = { conIdItem: 0 };
        view.storeReceptores.filter( filter );
    },  
        
    onAgregarClick: function (btn ) {
        var view = btn.up( 'formatosformview' );
        var grillaselecionados = view.down( '#gridselecionados' )
        var selection = view.down( '#gridtodos' ).getSelectionModel().getSelection();
        var todos = view.down( '#gridtodos' )
        var controller = this;
        if( selection ) {
            Ext.Array.each( selection, function( rec, k ) {
                var record = controller.getReceptorFormatosSearchModelModel().create( Ext.clone( rec.data ) )
                grillaselecionados.getStore().addSorted( record )
                todos.getStore().remove( rec )
                var model = controller.getReceptorModelModel();
                var record = Ext.create( model, {
                    rec_iid: record.get( 'rec_iid' ),
                    rec_cformato: view.record.get( 'for_ccodigo' ),
                    Name: 'test'
                })
                record.save( {
                    callback: function() {
                        if( selection.length <= k + 1 ) {
                            if(view.storeSeleccionados)
                                view.storeSeleccionados.load()
                        }
                    }
                })
            });
            grillaselecionados.getStore().sort()
            todos.getStore().sort()
        }
    },
        
    onQuitarClick: function (btn ) {
        var view = btn.up( 'formatosformview' );
        var grillaselecionadosseleccion = view.down( '#gridselecionados' ).getSelectionModel().getSelection()
        var selection = view.down( '#gridtodos' ).getSelectionModel().getSelection();
        var grillaselecionados = view.down( '#gridselecionados' );
        var todos = view.down( '#gridtodos' )
        var controller = this;
        if( grillaselecionados ) {
            Ext.Array.each( grillaselecionadosseleccion, function( rec ) {
                var _model = controller.getReceptorModelModel();
                _model.load( rec.get( 'Id' ) ? rec.get( 'Id' ) : rec.get( 'rec_idKey' ), {
                    success: function( _rec ) {
                        _rec.destroy();
                        grillaselecionados.getStore().remove( rec )
                        todos.getStore().addSorted( controller.getReceptoresSearchModelModel().create( Ext.clone( rec.data ) ) )
                    }
                })
            });
            grillaselecionados.getStore().sort()
            todos.getStore().sort()
        }
    },
    //Federico V. descomente estas dos funciones para que permita seleccionar un codigo de alarma a pedido de la tarea DSS-680
    onLimpiarEventoClick: function (btn ) {
        var view = btn.up( 'formatosformview' );
        view.down( '#nombreevento' ).setValue( '' )
        view.down( '#codevento' ).setValue( '' )
    },
    eventsSelected: function(record, view ) {
        view.down( '#nombreevento' ).setValue( record.get( 'Descripcion' )  )
        view.down( '#codevento' ).setValue( record.get( 'cod_ccodigo' ) )
    },
    onEventoClick: function (btn ) {
        var view = btn.up( 'formatosformview' );
        var myWindow = Ext.widget( 'window', {
            title: 'Selector de eventos',
            height: 400,
            width: 900,
            //autoScroll: true,
            modal: true,
            items: [ {
                xtype: 'eventselecterhelperview',
                caller: view,
                //filter: [{property:'cod_nManual', value:1}], // no filtra eventos manuales son todos.
                simpleSelect: true

            }],
            layout: 'fit'
        }).show();

        myWindow.on( 'selectedEvents', function() {
            console.log( arguments )
        })
    },

    initview: function(view ) {
        var controller = this;
        if( view.record ) {
            view.loadRecord( view.record );
            if( view.record.get( 'Id' ) != 0 ) {
                view.down( '#selectores' ).setDisabled( false )
            } else {
                view.down( '#selectores' ).setDisabled( true )
            }

            if( view.record.get( 'for_calarma' ) != '' ) {
                var combostore = Ext.create( 'Ext.data.Store', {
                    model: this.getTablasCodigosAlarmaSearchModelModel(),
                    pageSize: 1000,
                    remoteSort: false,
                    remoteFilter: true,
                    filters: [ {
                        property: 'cod_ccodigo',
                        value: view.record.get( 'for_calarma' )
                    }]
                })
                combostore.load( {
                    callback: function( records ) {
                        var record = records[ 0 ]
                        if( record ) {
                            view.down( '#nombreevento' ).setValue( record.get( 'Descripcion' ) )
                        }
                    }
                });
            }

            view.storeReceptores = Ext.create( 'Ext.data.Store', {
                model: controller.getReceptoresCabUNIQUEModelModel(),
                pageSize: 50,
                remoteSort: true,
                remoteFilter: true,
                filters: [ {
                    property: 'for_ccodigoNOT',
                    value: view.record.get( 'for_ccodigo' )
                }]
                /*
                filters: [ {
                    property: 'for_cformatoNOT',
                    value: view.record.get( 'for_cformato' )
                }]
                */
            })
            view.storeReceptores.proxy.extraParams = { conIdItem: 0 };
            view.down( '#gridtodos' ).bindStore( view.storeReceptores );

            view.storeReceptores.load( {
                callback: function() {
                    // dedalo 6/6/2018 cambio este model por el unique ya que el otro trae duplicados y filtra mal

                    /**
                     * JUAN : Agrego el conIdItem 0, para que haga el Distinct en el SP
                     **/

                    /**
                     * 20/12/2018 ADRIAN NO SAQUEN EL conIdItem es necesario
                     */
                    if( view.record.get( 'for_cformato' ) != "" ) {
                        view.storeSeleccionados = Ext.create( 'Ext.data.Store', {
                            model: controller.getReceptoresCabUNIQUEModelModel(),
                            pageSize: 50,
                            remoteSort: true,
                            remoteFilter: true,
                            filters: [ {
                                    property: 'for_cformato',
                                    value: view.record.get( 'for_cformato' )
                                }, {
                                    property: 'for_ccodigo',
                                    value: view.record.get( 'for_ccodigo' )
                                }
                            ]
                        })
                        view.storeSeleccionados.proxy.extraParams = { conIdItem: 1 };
                        view.down( '#gridselecionados' ).bindStore( view.storeSeleccionados );
                        view.storeSeleccionados.load();
                    }
                }
            });
        }
    },
    createStoreSeleccionados: function (view){
                    var controller = this;
                    if( view.record.get( 'for_cformato' ) != "" ) {
                        view.storeSeleccionados = Ext.create( 'Ext.data.Store', {
                            model: controller.getReceptoresCabUNIQUEModelModel(),
                            pageSize: 50,
                            remoteSort: true,
                            remoteFilter: true,
                            filters: [ {
                                    property: 'for_cformato',
                                    value: view.record.get( 'for_cformato' )
                                }, {
                                    property: 'for_ccodigo',
                                    value: view.record.get( 'for_ccodigo' )
                                }
                            ]
                        })
                        view.storeSeleccionados.proxy.extraParams = { conIdItem: 1 };
                        view.down( '#gridselecionados' ).bindStore( view.storeSeleccionados );
                        view.storeSeleccionados.load();
                    }

    },
    onSaveClick: function(button, event, options ) {
        // cambio la cantidad de columnas al panel
        // accedo al registro y lo salvo
        var myform = button.up( 'form' ).getForm();
        var view = button.up( 'formatosformview' );
        var win = button.up( 'window' );
        var record = myform.getRecord();
        var model = this.getFormatosModelModel();

        myform.updateRecord( record );
        record.setConfig({
            proxy: model.getProxy()
        });
        if( record.get( 'for_calarma' ).trim() == '' ) {
            notifyError( 'Debe seleccionar un código de alarma' );
            return;
        }

        if( myform.isValid() ) {
            record.set( 'for_cnombre', record.get( 'for_cdescripcion' ) );
            record.set( 'for_idKey', record.get( 'Id' ) );
            record.save( {
                scope: this,
                view: view,
                callback: function( record, operation ) {
                    if( operation.success ) {
                        notify( 'Los datos se guardaron correctamente' );
                        view.caller.fireEvent( 'objectchanged', view.caller, record );
                        view.record = record
                        view.loadRecord( record )
                        view.down( '#selectores' ).setDisabled( false );
                        this.createStoreSeleccionados(view);
                        //view.close()
                    } else {
                        notifyError( 'Hubo un error al guardar los datos' );
                    }
                },
                button: button
            });
        }
    }
});
Ext.define( 'Common.controller.EncuestasFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
    models: [ 'p_encuesta_preguntaModel', 'p_encuesta_preguntaSearchModel' ],
    views: [ 'EncuestasFormView' ],

    init: function(config ) {
        // genero los eventos
        this.control( {
                        'encuestasformview': {
                beforerender: this.initview,
                refreshPreguntas: this.onRefreshPreguntas,
                deletePregunta: this.onDeletePregunta
            },
            'encuestasformview button[action="save"]': {
                click: this.onSaveClick
            },
            'encuestasformview button[action="addPregunta"]': {
                click: this.onAddPreguntaClick
            },
            'encuestasformview #preguntasgrid': {
                itemdblclick: this.onItemClick
            },
            'encuestasformview #reportes': {
                click: this.onViewReportClick
            }
        });
    }, // cierro init

    onItemClick: function(grid, record, item, index, e, options ) {
        var view = grid.up( 'encuestasformview' );
        var title = record.get( 'epg_name' );

        this.getP_encuesta_preguntaModelModel().load( record.get( 'Id' ), {
            callback: function( record ) {
                var viewWin = Ext.widget( 'encuestaspreguntasformview', {
                    caller: view,
                    record: record,
                });

                var win = Ext.create( 'Ext.Window', {
                    iconCls: 'icon-table-add',
                    layout: 'fit',
                    title: title,
                    translate: false,
                    width: 700,
                    height: 400,
                    border: false,
                    items: viewWin
                });
                win.show();
            }
        })
    },
        
    onRefreshPreguntas: function (view, record ) {
        view.down( '#preguntasgrid' ).getStore().load()
    },
        
    onAddPreguntaClick: function (btn ) {
        var view = btn.up( 'encuestasformview' )

        var record = this.getP_encuesta_preguntaModelModel().create( {
            Id:0,
            epg_tipo: 0,
            epg_status: 1,
            epg_encidkey: view.record.get( 'Id' )
        })

        var viewWin = Ext.widget( 'encuestaspreguntasformview', {
            caller: view,
            record: record,
        });

        var win = Ext.create( 'Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: 'Nueva pregunta',
            translate: false,
            width: 700,
            height: 400,
            border: false,
            items: viewWin
        });
        win.show();
    },

    initview: function(view ) {
        view.loadRecord( view.record );
        //si tengo ID de pregunta traigo respuestas
        var id = view.record.get( 'Id' );
        if( id != 0 ) {
            this.loadRepsuesta( view, view.record )
            view.down( '#preguntas' ).show();
        }
    },
        
    loadRepsuesta: function (view, record ) {
        view.store = Ext.create( 'Ext.data.Store', {
            model: this.getP_encuesta_preguntaSearchModelModel(),
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: [ {
                property: 'epg_encidkey',
                value: record.get( 'Id' )
            }]
        })
        view.down( '#preguntasgrid' ).bindStore( view.store )
        view.store.load( {
            callback: function() {
            }
        })
    },

    onSaveClick: function(button, event, options ) {
        var myform = button.up( 'form' ).getForm();
        var view = button.up( 'encuestasformview' );
        var record = myform.getRecord();
        var controller = this

        myform.updateRecord( record );

        if( myform.isValid() ) {
            record.save( {
                callback: function( record, operation ) {
                    if( operation.success ) {
                        var win = view.up( 'window' );
                        notify( 'Los datos se guardaron correctamente' );
                        view.caller.fireEvent( 'refresh', view.caller, record );
                        view.loadRecord( record );
                        controller.loadRepsuesta( view, record )
                        view.record = record;
                        view.down( '#preguntas' ).show()

                    } else {
                        notifyError( 'Hubo un error al guardar los datos' );
                    }
                }
            });
        }
    },
        
    onDeletePregunta: function(rec, view ) {
        var model = this.getP_encuesta_preguntaModelModel();

        model.load(rec.get('Id'),{
            callback: function(record, operation, success){
                record.erase({
                    success: function(record,operation){
                        if( operation.success ) {
                            notify( 'Se eliminio exitosamente' );
                        }
                        else {
                            notify( 'No se puede eliminar el registro, esta siendo utilizado en el sistema.' );
                        }
                        view.store.load();
                    }
                });
            }
        });

        /*rec.setProxy( model.getProxy() );
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
        })*/
    }	
});

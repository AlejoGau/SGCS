Ext.define( 'SgAppSerTec.controller.ServTecMultiVsitasFormController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'ServTecVisitaSearchModel', 'ServTecVisitaModel', 'ServTecSearchModel', 'm_st_cabeceraModel', 'ServTecModel' ],
views: [ 'ServTecMultiVisitasFormView' ],

init: function(config ) {
    this.control( {
        'sertecmultivisitasformview': {
            afterrender: this.initview,
            moviladded: this.onSubItemAdded,
            tecnicoadded: this.onSubItemAdded,
            refresh: this.initview
        },
        'sertecmultivisitasformview button[action=save]': {
            click: this.onSaveClick
        },
        'sertecmultivisitasformview #svi_tSalidaHaciaCliente': {
            change: this.onChangesvi_tSalidaHaciaCliente
        },
        'sertecmultivisitasformview #svi_tArriboAlCliente': {
            change: this.onChangesvi_tArriboAlCliente
        },
        'sertecmultivisitasformview #svi_tSalidaHaciaClienteHora': {
            change: this.onChangesvi_tSalidaHaciaCliente
        },
        'sertecmultivisitasformview #svi_tArriboAlClienteHora': {
            change: this.onChangesvi_tArriboAlCliente
        }

    });
}, // cierro init

initview: function(view ) {
    var record = view.record;
    var controller = this;

    view.down( '#svi_tSalidaHaciaCliente' ).setValue( new Date() )

    if( record[ 0 ].get( 'Id' ) == 0 ) {
        view.down( '#tecnicos' ).setDisabled( true );
        view.down( '#moviles' ).setDisabled( true );
        view.down( '#estado' ).setDisabled( true );

        this.setRecord( view, this );
    } else {
        view.down( '#tecnicos' ).setDisabled( false );
        view.down( '#moviles' ).setDisabled( false );
        view.down( '#estado' ).setDisabled( false );
    }

    view.cabeceraRecord = view.cabecera;
},
onChangesvi_tSalidaHaciaCliente: function (combo ) {
    var view = combo.up( 'sertecmultivisitasformview' )
    var fecha = view.down( '#svi_tSalidaHaciaCliente' ).getValue()
    var hora = view.down( '#svi_tSalidaHaciaClienteHora' ).getValue()
    var fechaHora = new Date( Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( hora ), 'H:i:s' ) )

    view.down( '#svi_tArriboAlCliente' ).setMinValue( fechaHora )

    //si no tiene una fecha definida le defino un defualt al horario
    if( !view.down( '#svi_tSalidaHaciaClienteHora' ).getValue() ) {
        view.down( '#svi_tSalidaHaciaClienteHora' ).setValue( new Date( Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' 00:00:00' ) )
    }
},
    
onChangesvi_tArriboAlCliente: function (combo ) {
    var view = combo.up( 'sertecmultivisitasformview' )
    var fecha = view.down( '#svi_tArriboAlCliente' ).getValue()
    var hora = view.down( '#svi_tArriboAlClienteHora' ).getValue()
    var fechaHora = new Date( Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( hora ), 'H:i:s' ) )

    view.down( '#svi_tSalidaDelCliente' ).setMinValue( fechaHora )

    //si no tiene una fecha definida le defino un defualt al horario
    if( !view.down( '#svi_tArriboAlClienteHora' ).getValue() ) {
        view.down( '#svi_tArriboAlClienteHora' ).setValue( new Date( Ext.Date.format( new Date( fecha ), 'Y/m/d' ) + ' 00:00:00' ) )
    }
},

setRecord: function(view, controller ) {
    var record = view.visitas ? view.visitas : view.record;

    if( new Date( record[ 0 ].get( 'svi_tFechaHora' ) ).getFullYear() <= 1900 ) {
        record.set( 'svi_tFechaHora', null );
    }
    if( new Date( record[ 0 ].get( 'svi_tSalidaHaciaCliente' ) ).getFullYear() <= 1900 ) {
        record.set( 'svi_tSalidaHaciaCliente', null );
    }
    if( new Date( record[ 0 ].get( 'svi_tArriboAlCliente' ) ).getFullYear() <= 1900 ) {
        record.set( 'svi_tArriboAlCliente', null );
    }
    if( new Date( record[ 0 ].get( 'svi_tSalidaDelCliente' ) ).getFullYear() <= 1900 ) {
        record.set( 'svi_tSalidaDelCliente', null );
    }
    view.loadRecord( record[ 0 ] );

    view.dateAlta = new Date( record[ 0 ].get( 'svi_tFechaHora' ) )

    view.down( '#svi_tSalidaHaciaCliente' ).setValue( record[ 0 ].get( 'svi_tSalidaHaciaCliente' ) )
    view.down( '#svi_tArriboAlCliente' ).setValue( record[ 0 ].get( 'svi_tArriboAlCliente' ) )
    view.down( '#svi_tSalidaDelCliente' ).setValue( record[ 0 ].get( 'svi_tSalidaDelCliente' ) )

    view.down( '#svi_tSalidaHaciaClienteHora' ).setValue( Ext.Date.format( new Date( record[ 0 ].get( 'svi_tSalidaHaciaCliente' ) ), 'H:i' ) )
    view.down( '#svi_tArriboAlClienteHora' ).setValue( Ext.Date.format( new Date( record[ 0 ].get( 'svi_tArriboAlCliente' ) ), 'H:i' ) )
    view.down( '#svi_tSalidaDelClienteHora' ).setValue( Ext.Date.format( new Date( record[ 0 ].get( 'svi_tSalidaDelCliente' ) ), 'H:i' ) )


    view.down( '#svi_tSalidaHaciaCliente' ).setMinValue( record[ 0 ].get( 'svi_tFechaHora' ) )
    //view.down('#svi_tSalidaHaciaClienteHora').setMinValue(record.get('svi_tFechaHora'))

    view.down( '#svi_tArriboAlCliente' ).setMinValue( record[ 0 ].get( 'svi_tSalidaHaciaCliente' ) )
    // view.down('#svi_tArriboAlClienteHora').setMinValue(record.get('svi_tSalidaHaciaCliente'))

    view.down( '#svi_tSalidaDelCliente' ).setMinValue( record[ 0 ].get( 'svi_tArriboAlCliente' ) )
    // view.down('#svi_tSalidaDelClienteHora').setMinValue(record.get('svi_tArriboAlCliente'))

    if( view.readOnly ) {
        view.down( '#save' ).hide()
        view.down( 'servtectecnicovisitasgridview' ).down( 'toolbar' ).hide()
        view.down( 'servtecmovilvisitasgridview' ).down( 'toolbar' ).hide()
    }
},
    
onSubItemAdded: function (record, view ) {
    this.onSaveClick( view )
},
    
onSaveClick: function(button, event, options ) {
    const view = button.up( 'sertecmultivisitasformview' ) ? button.up( 'sertecmultivisitasformview' ) : button;
    const visitas = view.record;
    const controller = this;

    controller.forceSave( visitas, view, true );
},
    
forceSave: function (record, view, force ) {
    const cabeceras = view.cabeceraRecord;
    const myform = view.getForm();
    const controller = this;
    const observacion = view.down( '#observacion' ).getValue();
    const estado = view.down( '#estado' ).value;

    const newRecord = [];
    view.visitas = []

    if( myform.isValid() ) {
        myform.updateRecord( view.record[ 0 ] );

        if( !record[ 0 ].get( 'svi_cObservacion' ) ) {
            notify( 'Debe ingresar una observacion.' );
            return false;
        }

        record.forEach(( visita ) => {
            var svi_tSalidaHaciaCliente = view.down( '#svi_tSalidaHaciaCliente' ).getValue()
            var svi_tArriboAlCliente = view.down( '#svi_tArriboAlCliente' ).getValue()
            var svi_tSalidaDelCliente = view.down( '#svi_tSalidaDelCliente' ).getValue()
            var svi_tSalidaHaciaClienteHora = view.down( '#svi_tSalidaHaciaClienteHora' ).getValue()
            var svi_tArriboAlClienteHora = view.down( '#svi_tArriboAlClienteHora' ).getValue()
            var svi_tSalidaDelClienteHora = view.down( '#svi_tSalidaDelClienteHora' ).getValue()
            const horasPlanificadas = view.down( '#horasPlanificadas' ).getValue();

            if( horasPlanificadas != null ) {
                visita.set( 'svi_cHorasPlanificadas', horasPlanificadas );
            }
            if( !visita.get( 'svi_tSalidaHaciaCliente' ) ) {
                visita.set( 'svi_tSalidaHaciaCliente', new Date( '1/1/1900' ) );
            }

            if( !visita.get( 'svi_tArriboAlCliente' ) ) {
                visita.set( 'svi_tArriboAlCliente', new Date( '1/1/1900' ) );
            }

            if( !visita.get( 'svi_tSalidaDelCliente' ) ) {
                visita.set( 'svi_tSalidaDelCliente', new Date( '1/1/1900' ) );
            }

            if( view.down( '#fechayhora' ).getValue() ) {
                visita.set( 'svi_tFechaHora', view.dateAlta );
            }
            if( svi_tSalidaHaciaCliente != null ) {
                visita.set( 'svi_tSalidaHaciaCliente', new Date( Ext.Date.format( new Date( svi_tSalidaHaciaCliente ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( svi_tSalidaHaciaClienteHora ), 'H:i:s' ) ) );
            }
            if( svi_tArriboAlCliente != null ) {
                visita.set( 'svi_tArriboAlCliente', new Date( Ext.Date.format( new Date( svi_tArriboAlCliente ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( svi_tArriboAlClienteHora ), 'H:i:s' ) ) );
            }
            if( svi_tSalidaDelCliente != null ) {
                visita.set( 'svi_tSalidaDelCliente', new Date( Ext.Date.format( new Date( svi_tSalidaDelCliente ), 'Y/m/d' ) + ' ' + Ext.Date.format( new Date( svi_tSalidaDelClienteHora ), 'H:i:s' ) ) );
            }

            visita.set( 'svi_cObservacion', observacion );
            visita.set( 'svi_iEstado', estado );

            visita.save( {
                callback: function( recordsaved, operation ) {
                    view.visitas.push( recordsaved )

                    if( operation.success ) {
                        if( view.down( '#estado' ).getValue() == 3 || force == true ) {

                            if( view.down( 'servtectecnicovisitasgridview' ).getStore().data.items.length > 0 ) {
                                var tecnico = view.down( 'servtectecnicovisitasgridview' ).getStore().data.items[ 0 ].get( 'ins_ccodigo' );
                            }
                            if( view.down( 'servtecmovilvisitasgridview' ).getStore().data.items.length > 0 ) {
                                var movil = view.down( 'servtecmovilvisitasgridview' ).getStore().data.items[ 0 ].get( 'tmp_iid' );
                            }
                            const model = controller.getServTecModelModel();

                            model.load( visita.get( 'svi_iServicio' ), {
                                callback: function( cabecera ) {
                                    if( visita.get( 'svi_tSalidaHaciaCliente' ) != new Date( '1/1/1900' ) ) {
                                        cabecera.set( 'stc_dfecha_desde_1', visita.get( 'svi_tSalidaHaciaCliente' ) );
                                    } else {
                                        cabecera.set( 'stc_dfecha_desde_1', visita.get( 'svi_tFechaHora' ) );
                                    }
                                    cabecera.set( 'stc_ctecnico_1', tecnico );
                                    cabecera.set( 'stc_cmovil_1', movil );
                                    //en el st_cabecera el esta "En ejecucion" es 5
                                    var estado = view.down( '#estado' ).getValue();
                                    if( estado == 3 ) {
                                        cabecera.set( 'stc_nestado', 5 );
                                    } else if( estado == 4 ) {
                                        cabecera.set( 'stc_nestado', 4 );
                                    } else if( estado == 5 ) {
                                        cabecera.set( 'stc_nestado', 3 );
                                    } /*else if(estado == 6) {
                           }*/ else if( estado == 2 ) {
                                        cabecera.set( 'stc_nestado', 2 );
                                    }
                                    for( var f in cabecera.data ) {
                                        var date = cabecera.get( f );
                                        if( f.search( "dfecha|dsalida|darribo|dintecnico|doutecnico" ) > 0 && date == null ) {
                                            cabecera.set( f, new Date( '1/1/1900' ) );
                                        }
                                    }

                                    if( view.down( '#actualizarcabecera' ).getValue() ) {
                                        cabecera.save( {
                                            callback: function( recordSvd, operation ) {
                                                if( operation.success ) {
                                                    //newRecord.push( recordSvd )
                                                    view.fireEvent( 'refresh', view, newRecord );
                                                    notify( 'Los datos se guardaron con éxito.' )
                                                }
                                            }
                                        })
                                    }
                                }
                            })
                        } else {
                            view.fireEvent( 'refresh', view );
                            notify( 'Los datos se guardaron con éxito.' );
                        }
                    }

                }
            });//cierro visita save

        }); //cierre forEach

    } else {
        notifyError( 'Corrija los errores antes de guardar.' )
    }
}
});
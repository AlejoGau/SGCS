//MIGRADO2024
Ext.define( 'Common.controller.SoftguardNotaController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'InstruccionesModel', 'm_CuentasXtraInfoSearchModel', 'SoftguardNotaModel' ],
views: [ 'SoftguardNotaFormView' ],
init: function(config ) {
    // genero los eventos
    this.control( {
        'formnote button[action=save]': {
            click: this.onSaveClick
        },
        'formnote': {
            beforerender: this.initview
        },
    				'formnote textarea[name=not_mnotatemporal]': {
            change: this.onNotaTemporalChange
        },
        'formnote button[action=saveIns]': {
            click: this.onSaveClickInstruccion
        }
				});
}, // cierro init
initview: function(view ) {
    var cuenta = view.record;
    view.cuenta = cuenta;
    var module = view.module;
    var profile = module.get( 'profile' );
    view.profile = profile;
    var controller = this;
    if( profile < 2 ) {
        view.down( 'toolbar' ).hide();
        view.disableForm();
    }
    var objectId = cuenta.get( 'cue_iid' );
    if( view.notas == "1" ) {
        view.down( '#save' ).hide();
        view.down( '#saveInstrucciones' ).hide();
        var notaPrincipal = view.down( '#not_mnotatemporal' );
        var notaTemporal = view.down( '#not_mnotaprincipal' );
        var fechaDesde = view.down( '#fechadesde' );
        var horaDesde = view.down( '#desdeTime' );
        var fechaHasta = view.down('#fechahasta');
        var horaHasta = view.down('#hastaTime');
        var htmleditor = view.down('#cue_cInstrucciones')
        notaPrincipal.setReadOnly( true );
        notaTemporal.setReadOnly( true );
        fechaDesde.setReadOnly( true );
        horaDesde.setReadOnly( true );
        fechaHasta.setReadOnly( true );
        horaHasta.setReadOnly( true );
        htmleditor.setReadOnly(true)
        htmleditor.getToolbar().setDisabled(true);
    }
    this.getSoftguardNotaModelModel().load( objectId, {
        view: view,
        scope: this,
        success: function( record, operation ) {
            var controller = operation.scope;
            var view = operation.view;
            if( !record ) {
                record = this.createRecord( operation.view );
            };
            view.nota = record;
            this.setRecord( view );
        },
        failure: function() {
            console.log( 'error:', arguments );
        }// cierro function
    }); // cierro load
    var store = Ext.create( 'Ext.data.Store', {
        model: this.getM_CuentasXtraInfoSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: [ {
            property: 'cue_iidCuenta',
            value: objectId
        }],
    }).load( {
        callback: function( records ) {
            if( records.length > 0 ) {
                controller.getInstruccionesModelModel().load( records[ 0 ].get( 'Id' ), {
                    view: view,
                    scope: this,
                    success: function( record, operation ) {
                        var controller = operation.scope;
                        var view = operation.view;
                        if( !record ) {
                            record = this.createRecord( operation.view );
                        };
                        view.instruccion = record;
                        view.loadRecord( record )
                    },
                    failure: function() {
                        console.log( 'error:', arguments );
                    }// cierro function
                })
            }
        }
    })
},
    
createRecord: function(view ) {
    var model = this.getSoftguardNotaModelModel();
    var cuenta = view.cuenta;
    var desde = new Date();
    var hasta = Ext.Date.add( desde, Ext.Date.MONTH, 1 );
    var record = model.create( {
        not_iidcuenta: cuenta.get( 'Id' ),
        not_dtemporaldesde: desde,
        not_dtemporalhasta: hasta,
    });
    return record;
},
    
setRecord: function(view ) {
    var record = view.nota;
    var form = view.getForm();
    var desdeTime = view.down( '#desdeTime' );
    var hastaTime = view.down( '#hastaTime' );
    if( new Date( record.get( 'not_dtemporaldesde' ) ).getFullYear() <= 1900 ) {
        var desde = new Date();
        var hasta = new Date();
        record.set( 'not_dtemporaldesde', desde );
        record.set( 'not_dtemporalhasta', hasta );
    };
    if( desdeTime ) {
        desdeTime.setValue( record.get( 'not_dtemporaldesde' ) );
    }
    if( hastaTime ) {
        hastaTime.setValue( record.get( 'not_dtemporalhasta' ) );
    }
    if( record.get( 'not_mnotatemporal' ) == '' ) {
        var fdesde = form.findField( 'not_dtemporaldesde' );
        var fhasta = form.findField( 'not_dtemporalhasta' );
        if( fdesde ) fdesde.disable();
        if( fhasta ) fhasta.disable();
        if( desdeTime ) desdeTime.disable();
        if( hastaTime ) hastaTime.disable();
    }
    view.loadRecord( record );
},
    
onNotaTemporalChange: function(field, options ) {
    var view = field.up( 'formnote' );
    var form = view.getForm();
    var fdesde = form.findField( 'not_dtemporaldesde' );
    var fhasta = form.findField( 'not_dtemporalhasta' );
    var temporal = form.findField( 'not_mnotatemporal' );
    var desdeTime = view.down( '#desdeTime' );
    var hastaTime = view.down( '#hastaTime' );
    if( temporal.getRawValue() == '' ) {
        fdesde.disable();
        fhasta.disable();
        desdeTime.disable();
        hastaTime.disable();
    } else {
        fdesde.enable();
        fhasta.enable();
        desdeTime.enable();
        hastaTime.enable();
    }
},
onSaveClickInstruccion: function(button, event, options ) {
    var view = button.up( 'formnote' );
    var record = view.instruccion;
    var instruccion = view.down( '#cue_cInstrucciones' ).getValue();
    var mostrar = view.down( '#cue_iInstrMostrar' ).getValue();
    record.set( 'cue_cInstrucciones', instruccion );
    record.set( 'cue_iInstrMostrar', mostrar );
    // Forzar envío de objeto completo
    record.modified = record.data;
    record.save( {
        controller: this,
        failure: function( record, operation ) {
            var controller = operation.controller;
            if( operation.error.status = 404 ) {
                controller.createRecord( view );
            } else {
                console.log( arguments )
            }
        },// cierro function
        success: function( record, operation ) {
            var controller = operation.controller;
            notify( getLocale( 'La Instruccion se guardó con éxito' ) );
        }// cierro function
    });// cierro save
},
    
onSaveClick: function(button, event, options ) {
    var view = button.up( 'formnote' );
    var myform = view.getForm();
    var mymodel = view.nota;
    if( myform.isValid() ) {
        myform.updateRecord( mymodel );
        var desdeTime = view.down( '#desdeTime' );
        var hastaTime = view.down( '#hastaTime' );
        var tiempoDesde;
        var tiempoHasta;
        var fechaDesde = mymodel.get( 'not_dtemporaldesde' );
        var fechaHasta = mymodel.get( 'not_dtemporalhasta' );
        if( Ext.util.Format.trim( myform.findField( 'not_mnotatemporal' ).getValue() ) != '' ) {
            tiempoDesde = desdeTime.getValue();
            tiempoHasta = hastaTime.getValue();
            if( tiempoDesde && tiempoHasta ) {
                //fechaDesde.setUTCHours(tiempoDesde.getUTCHours());
                fechaDesde.setHours( tiempoDesde.getHours() );
                fechaDesde.setMinutes( tiempoDesde.getMinutes() );
                fechaHasta.setHours( tiempoHasta.getHours() );
                fechaHasta.setMinutes( tiempoHasta.getMinutes() );
                mymodel.set( 'not_dtemporaldesde', fechaDesde );
                mymodel.set( 'not_dtemporalhasta', fechaHasta );
            } else {
                notify( 'Para realizar una nota temporal debe ingregar las 2 fechas' );
                return
            }
        } else {
            mymodel.set( 'not_dtemporaldesde', new Date( 1900, 1, 1 ) )
            mymodel.set( 'not_dtemporalhasta', new Date( 1900, 1, 1 ) )
        }
        //mymodel.set('not_dtemporaldesde',fechaDesde);
        mymodel.save( {
            controller: this,
            failure: function( record, operation ) {
                var controller = operation.controller;
                if( operation.error.status = 404 ) {
                    controller.createRecord( view );
                } else {
                    console.log( arguments )
                }
            },// cierro function
            success: function( record, operation ) {
                var controller = operation.controller;
                notify( getLocale( 'La Nota se guardó con éxito' ) );
                if( view.caller ) {
                    view.caller.fireEvent( 'objectchanged', view.caller );
                }
                if( view.tipo == 'win' ) {
                    view.up( 'window' ).close();
                }
            }// cierro function
        });// cierro save
    } else {
        notifyError( 'Corrija los valores en el formulario' );
    }
} // cierro saveobject
});
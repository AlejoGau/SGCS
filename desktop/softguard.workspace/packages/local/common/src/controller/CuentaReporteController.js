//MIGRADO2024
Ext.define( 'Common.controller.CuentaReporteController', {
    extend: 'Ext.app.Controller',
    stores: [ 'Common.store.TablaModemsSmsNoHabilitadosStore', 'Common.store.CuentaReporteTipoStore', 'Common.store.CuentaReporteFrecuenciaStore', 'Common.store.SoftguardAlarmasMailStore', 'Common.store.TablaModemsSmsStore' ],
models: [ 'TablasModemsSmsSearchModel', 'CuentaSearchModel', 'TablasGruposSearchModel', 'TablasCodigosAlarmaSearchModel', 'CuentaReporteModel', 'TablaModemsSmsModel' ],
views: [ 'CuentaReporteView', 'CuentaReporteMailView' ],
init: function (config ) {
    var me = this;
    // genero los eventos
    this.control( {
        'reporteview': {
            afterrender: this.initview
        },
        'reporteview button[action=savereporte]': {
            click: this.onSaveClick
        },
        'reporteview button[action=noControlar]': {
            click: this.onNoControlarClick
        },
        'reporteview button[action=controlar]': {
            click: this.onControlarClick
        },
        'reporteview #actualizarcontador': {
            click: this.onActualizaContadorClick
        },
        'reporteview #rep_ntipo': {
            change: this.onTipoSelected
        },
        'reporteview #grupos': {
            change: this.onGrupoChange
        }
    });
}, // cierro initget       ReporteModelModel
onTipoSelected: function (combo, value ) {
    console.log( arguments )
    var view = combo.up( 'reporteview' )
    if( value == 4 ) {
        view.down( '#grupos' ).show()
        view.down( '#grupos' ).setValue( '' )
        view.down( '#grupos' ).setRawValue( '' )
    } else {
        view.down( '#grupos' ).hide()
        view.down( '#alarmasgrupo' ).hide()
    }
},
    
onGrupoChange: function (combo, value ) {
    var view = combo.up( 'reporteview' )
    if( value != '' ) {
        console.log( arguments )
        var store = Ext.create( 'Ext.data.Store', {
            model: this.getTablasCodigosAlarmaSearchModelModel(),
            pageSize: 500,
            remoteSort: true,
            remoteFilter: true,
            filters: [ {
                property: 'cod_cGrupo:LIKE',//Federico V. Agregue el LIkE  para que encuentre todo los codigo de alarma asociados, tarea DS-741
                value: combo.lastSelection[ 0 ].get( 'gru_ccodigo' )
            }]
        })
        view.down( '#alarmasgrupo' ).show()
        store.load( {
            callback: function( records ) {
                var codigosAlarma = [];
                store.each( function( record ) {
                    codigosAlarma.push( record.get( 'cod_ccodigo' ) )
                })
                if( codigosAlarma.length > 0 ) {
                    view.down( '#alarmasgrupo' ).setValue( codigosAlarma.join( ',' ) )
                } else {
                    view.down( '#alarmasgrupo' ).setValue( getLocale( 'No se encuentran alarmas relacionadas al grupo' ) )
                }
            }
        })
    }
},
    
onActualizaContadorClick: function  (btn ) {
    var view = btn.up( 'reporteview' )
    var controller = this;
    var record = view.record;
    view.storeCuenta = Ext.create( 'Ext.data.Store', {
        model: this.getCuentaSearchModelModel(),
        autoDestroy: true,
        remoteFilter: true,
        filters: [ {
            property: 'cue_iid',
            value: view.up( 'cuentaview' ).recordCuenta.get( 'Id' )
        }]
    }).load( {
        callback: function( records ) {
            var recordCuenta = records[ 0 ];
            var objectId = recordCuenta.get( 'Id' );
            view.recordCuenta = recordCuenta;
            view.up( 'cuentaview' ).recordCuenta = recordCuenta;
            controller.loadReporte( view );
        }
    })
},
    
actualizarContador: function (recordCuenta, record, view ) {
    var cuentasearch = recordCuenta;
    var enviados = cuentasearch.get( 'sta_ienviadossms' );
    view.down( '#smsenviados' ).setValue( enviados );
    var disponibles = record.get( 'rep_iLimiteSMS' ) - enviados;
    if( disponibles < 0 ) {
        disponibles = 0;
    }
    view.down( '#smsdisponible' ).setValue( disponibles );
    var sta_nenviasms = cuentasearch.get( 'sta_nenviasms' )
    if( sta_nenviasms == 1 ) {
        view.down( '#enviomensajeaviso' ).setValue( getLocale( 'Si' ) );
    } else {
        view.down( '#enviomensajeaviso' ).setValue( getLocale( 'No' ) );
    }
    if( sta_nenviasms == 3 ) {
        view.down( '#conmutomail' ).setValue( getLocale( 'Si' ) );
    } else {
        view.down( '#conmutomail' ).setValue( getLocale( 'No' ) );
    }
},
initview: function(view ) {
    var cuenta = view.record;
    view.cuenta = cuenta;
    var module = view.module;
    var profile = module.profile ? module.profile : module.get( 'profile' );
    var form = view.getForm();
    view.profile = profile;
    var controller = this;
    var storeEventos = this.getCuentaReporteFrecuenciaStoreStore()
    view.down( '#rep_nfrecuencia' ).bindStore( storeEventos )
    var storeTipo = this.getCuentaReporteTipoStoreStore()
    view.down( '#rep_ntipo' ).bindStore( storeTipo )
    view.down( '#mailview' ).record = view.record;
    view.down( '#smsview' ).record = view.record;
    view.down( '#pushview' ).record = view.record;
    var controller = this;
    if( profile < 2 ) {
        var toolbars = view.query( 'toolbar' );
        Ext.Array.each( toolbars, function( toolbar ) {
            toolbar.hide();
        })
        var forms = view.query( 'form' );
        Ext.Array.each( forms, function( form ) {
            form.disableForm();
        })
    }
    if( profile > 2 ) {
        view.down( '#combomodemsms' ).show();
    } else {
        view.down( '#combomodemsms' ).hide();
    }
    var objectId = cuenta.get( 'cue_iid' );
    view.storeReporte = Ext.create( 'Ext.data.Store', {
        model: this.getCuentaReporteModelModel(),
        pageSize: 500,
        remoteSort: true,
        remoteFilter: true,
        filters: [ {
            property: 'rep_iidcuenta',
            value: objectId
        }]
    })
    this.loadReporte( view );
    var comboGrupos = view.down( '#grupos' );
    var combostore = Ext.create( 'Ext.data.Store', {
        model: this.getTablasGruposSearchModelModel(),
        pageSize: 200,
        remoteSort: true
    });
    comboGrupos.bindStore( combostore );
    combostore.load( {
        callback: function() {
            if( comboGrupos.getValue() == 0 ) {
                comboGrupos.setRawValue( '' )
            }
        }
    });
},
    
loadReporte: function(view ) {
    var controller = this;
    view.storeReporte.load( {
        callback: function( records ) {
            var record = records[ 0 ]
            var grid = view.down( 'grid' );
            //var store = grid.getStore();
            if( !record ) {
                view.record = controller.createRecord( view );
                record = view.record;
            } else {
                view.record = record;
            }
            view.record.set( 'eventos', view.record.get( 'rep_meventos' ).split( ',' ) );
            var control = view.down( '#controlarSms' );
            var nocontrol = view.down( '#noControlarSms' );
            if( record.get( 'rep_iLimiteSMS' ) == 9999 ) {
                control.hide();
                nocontrol.show();
            } else if( record.get( 'rep_iLimiteSMS' ) == 0 ) {
                record.set( 'rep_iLimiteSMS', getParametro( 'SMSLIMITEXDEFAULT' ) );
                view.loadRecord( view.record );
                if( record.get( 'rep_iModemSMS' ) == 0 ) {
                    view.down( '#combomodemsms' ).setValue( null );
                }
            } else {
                control.show();
                nocontrol.hide();
            }
            view.loadRecord( view.record );
            if( record.get( 'rep_iModemSMS' ) == 0 ) {
                view.down( '#combomodemsms' ).setValue( null );
            }
            // seteo los valores de consumo.
            if( view.up( 'cuentaview' ) ) {
                controller.actualizarContador( view.up( 'cuentaview' ).recordCuenta, record, view )
            } else {
                view.down( '#consumo' ).hide();
            }
        }
    });
},
    
getModem: function(value ) {
    var store = Ext.data.StoreManager.get( 'TablaModemsSmsStore' );
    var record = store.findRecord( 'sms_icodigo', value );
    if( record == undefined )
        return getLocale( 'Sin Modem' );
    else
        return record.data.sms_cdescripcion;
},
    
createRecord: function(view ) {
    var model = this.getCuentaReporteModelModel();
    var cuenta = view.cuenta;
    var record = model.create( {
        rep_iidcuenta: cuenta.get( 'Id' ),
        rep_tproximoenvio: new Date()
    });
    return record
},
onSaveClick: function(button, event, options ) {
    var view = button.up( 'form' );
    var myform = view.getForm();
    var record = view.record;
    /*
    var mailStore = view.down('grid').getStore();
    var mail = '';
    
    mailStore.each(function(record,item, count){
        mail += record.get('email');
        if (item < (count-1)){
            mail += ';';
        }
    });
    */
    myform.updateRecord( record );
    //record.set('rep_cmailparaeventos', mail);
    if( myform.isValid() ) {
        
        record.set( 'rep_cmail', record.get( 'rep_cmail' ).split( ',' ).join( ';' ) )
        record.set( 'rep_cMailRuteoSMS', record.get( 'rep_cMailRuteoSMS' ).split( ';' ).join( ',' ) )
        record.modified = record.data;
        record.save( {
            controller: this,
            failure: function( record, operation ) {
                console.log( arguments )
            },// cierro function
            success: function( record, operation ) {
                var controller = operation.controller;
                notify( 'Los cambios se guardaron con éxito' );
            }// cierro function
        });// cierro save
    } else {
        notifyError( 'Por favor corrija los valores incorrectos.' );
    }
},
    
onNoControlarClick: function(button, event, options ) {
    var view = button.up( 'form' );
    var myform = view.getForm();
    var record = view.record;
    var control = view.down( '#controlarSms' );
    var nocontrol = view.down( '#noControlarSms' );
    control.hide();
    nocontrol.show();
    myform.findField( 'rep_iLimiteSMS' ).setValue( 9999 );
},
    
onControlarClick: function(button, event, options ) {
    var view = button.up( 'form' );
    var myform = view.getForm();
    var record = view.record;
    var control = view.down( '#controlarSms' );
    var nocontrol = view.down( '#noControlarSms' );
    control.show();
    nocontrol.hide();
    myform.findField( 'rep_iLimiteSMS' ).setValue( 1 );
},
    
onEventSelect: function(combo, records, options ) {
    var form = combo.up( 'form' ).getForm();
    var field = form.findField( 'rep_meventos' );
    field.setValue( new String().concat( combo.getValue() ) );
}
});
Ext.define( 'AdministratorSearch.controller.SoftguardDealerSmsFormController', {
    extend: 'Ext.app.Controller',
    stores: [ 'TablaPlantillasSmsStore' ],
models: [ 'TablaPlantillasSmsModel', 'NotificacionesDealerModel', 'SoftguardCodigoAlarmaModel', 'TablasGruposSearchModel' ],
views: [ 'SoftguardDealerSmsFormView' ],

init: function(config ) {
    // this.initConfig(config);
    // genero los eventos

    this.control( {
        'smsdealerformview': {
            afterrender: this.initview,
            selectedEvents: this.eventsSelected
        },
        'smsdealerformview #grupos': {
            select: this.onGroupEventSelect,
            change: this.onGroupEventSelect
        },
        'smsdealerformview #contacto': {
            select: this.onContactoSelect
        },
        'smsdealerformview #agregarevento': {
            click: this.onAgregarEventoClick
        },
        'smsdealerformview button[action="save"]': {
            click: this.saveObject
        },
        'smsdealerformview button[action="cancel"]': {
            click: this.onCancelClick
        },
        'smsdealerformview button[action="verPlantillaMail"]': {
            click: this.onVerPlantillaMailClick
        },
        'smsdealerformview button[action="verPlantillaPush"]': {
            click: this.onVerPlantillaPushClick
        },
        'smsdealerformview #tnd_iNotificarAlertas': {
            change: this.onNotificarAlertaClick
        },
        'smsdealerformview #tnd_iNotificarSP': {
            change: this.onNotificarSPClick
        },
        'smsdealerformview #eventos': {
            change: this.onEnableCombos
        }

        // dedalo 13/09/2019 saco loseventos porque se usa radio buttons.
        /*,
        'smsdealerformview #todosChk' : {
            change : this.checkIsAdmin
        },
        'smsdealerformview #adminChk' : {
            change : this.checkIsAdmin
        }*/

    });
}, 
// cierro init

onAgregarEventoClick: function (btn ) {
    var view = btn.up( 'smsdealerformview' );

    var filter = [];
    if( view.addType == 'sms' || view.addType == 'push' ) {
        filter.push( {
            property: 'cod_nSms',
            value: 1
        });
    } else if( view.addType == 'email' ) {
        filter.push( {
            property: 'cod_nMail',
            value: 1
        });
    }

    if( this.application._nameModule == 'VigiControl' ) {
        filter.push( {
            property: 'for_cProtocolo',
            value: 'VIGICONTROL'
        });
    }

    var myWindow = Ext.widget( 'window', {
        title: 'Selector de eventos',
        height: 400,
        width: 900,
        //autoScroll: true,
        modal: true,
        items: [ {
            xtype: 'eventselecterhelperview',
            eventSelected: view.record.get( 'tnd_cAlarmas' ),
            caller: view,
            filter: filter
        }],
        layout: 'fit'
    }).show();

    myWindow.on( 'selectedEvents', function() {
        console.log( arguments )
    })
},
    
/**
 * Funcion para cuando el TextArea esta en blanco, habilite el boton Modificar y el combo grupos para volver a elegir
 * */
onEnableCombos: function(textarea, event, options ) {
    var controller = this;
    var view = textarea.up( 'smsdealerformview' );

    if( textarea.getValue() == "" ) {
        view.down( '#agregarevento' ).setDisabled( false )
        view.down( '#grupos' ).setDisabled( false );
        view.down( '#grupos' ).setValue( '' );
    }
},
    
/**
 * Tildado de Notificar eventos
 * Se encarga de bloquear el text area de eventos y poner en 1 para notificar los eventos que ya tienen notificar alerta
 * */
onNotificarAlertaClick: function (chk, event, options ) {
    var view = chk.up( 'smsdealerformview' );

    if( chk.getValue() ) {
        view.down( '#eventosfieldset' ).setDisabled( true );
        view.down( '#eventos' ).setValue( '' );
        view.down( '#grupos' ).setDisabled( true );
        view.down( '#tnd_iNotificarSP' ).setValue( false );

        /**
         * Al tildar la opcion de Notificar Alarmas, debemos blanquear los eventos a informar como asi tambien el Grupo seleccionado
         * */
        view.record.set( 'tnd_iGrupoAlarmas', 0 );
        view.record.set( 'tnd_cAlarmas', '' );
        view.record.set( 'tnd_iNotificarAlertas', 1 );
        view.record.set( 'tnd_iNotificarSP', 0 );

    } else if( !view.down( '#tnd_iNotificarSP' ).getValue() ) {
        view.down( '#eventosfieldset' ).setDisabled( false )
        view.down( '#grupos' ).setDisabled( false );
    }

},

onNotificarSPClick: function (chk, event, options ) {
    var view = chk.up( 'smsdealerformview' );

    if( chk.getValue() ) {
        view.down( '#eventosfieldset' ).setDisabled( true );
        view.down( '#eventos' ).setValue( '' );
        view.down( '#grupos' ).setDisabled( true );
        view.down( '#tnd_iNotificarAlertas' ).setValue( false );

        /**
         * Al tildar la opcion de Notificar Alarmas, debemos blanquear los eventos a informar como asi tambien el Grupo seleccionado
         * */
        view.record.set( 'tnd_iGrupoAlarmas', 0 );
        view.record.set( 'tnd_cAlarmas', '' );
        view.record.set( 'tnd_iNotificarAlertas', 0 );
        view.record.set( 'tnd_iNotificarSP', 1 );

        // solo debe quedar seleccionado Administradores de cuenta
        view.down( '#todosChk' ).setDisabled( true );
        view.down( '#adminChk' ).setDisabled( true );
        view.down( '#todosCuentaChk' ).setDisabled( false );
        view.down( '#adminCuentaChk' ).setValue( true );

    } else if( !view.down( '#tnd_iNotificarAlertas' ).getValue() ) {
        view.down( '#eventosfieldset' ).setDisabled( false )
        view.down( '#grupos' ).setDisabled( false );
        view.down( '#todosChk' ).setDisabled( false );
        view.down( '#adminChk' ).setDisabled( false );
        view.down( '#todosCuentaChk' ).setDisabled( false );
    } else {
        view.down( '#todosChk' ).setDisabled( false );
        view.down( '#adminChk' ).setDisabled( false );
    }

},
    
eventsSelected: function(records, view ) {
    var textarea = view.down( '#eventos' );
    var text = '';

    var arrayEventos = [];
    Ext.Array.each( records.items, function( record ) {
        text = text + record.get( 'Descripcion' ) + '\r\n';
        arrayEventos.push( record.get( 'cod_ccodigo' ) );
    })

    textarea.setValue( text );

    view.down( '#eventoshide' ).setValue( arrayEventos.join( ',' ) )
    view.record.set( 'tnd_cAlarmas', arrayEventos.join( ',' ) )

    /**
     * Bloqueo el selector de Grupos de Alarma
     * */
    view.down( '#grupos' ).setDisabled( true );

},    
    
onContactoSelect: function(combo, records, options ) {
    var form = combo.up( 'form' ).getForm();
    var field = form.findField( 'sms_csmsparaeventos' );
    var controller = this;
    var view = combo.up( 'smsdealerformview' )

    var prev = '';
    if( field.getValue() != '' ) {
        prev = field.getValue() + ";";
    }

    field.setValue( prev + combo.getValue() );

    var nombresArray = view.down( '#descripcion' ).getValue().split( ';' )
    if( nombresArray[ 0 ] == '' ) {
        nombresArray = Ext.Array.remove( nombresArray, nombresArray[ 0 ] );
    }
    nombresArray.push( combo.getRawValue() )
    view.down( '#descripcion' ).setValue( nombresArray.join( ';' ) )

},
   

initview: function(view ) {
    var controller = this;
    var myform = view.getForm();
    var record = view.record;
    var text = '';

    /**
     * Carga del combo de plantillas
     * */
    var storePlantillaMail = this.getTablaPlantillasSmsStoreStore()
    view.down( '#tnd_cPlantillaMail' ).bindStore( storePlantillaMail );


    view.down( '#tnd_cPlantillaPush' ).bindStore( storePlantillaMail );

    /**
     * Cargo el combo de Grupo Alarmas
     * */
    var comboGrupos = view.down( '#grupos' );
    var combostore = Ext.create( 'Ext.data.Store', {
        model: this.getTablasGruposSearchModelModel(),
        pageSize: 200,
        remoteSort: true
    });
    comboGrupos.bindStore( combostore );
    combostore.load();

    /**
     * Cargo los campos con lo del record al iniciar, si existen
     * */
    var eventos = view.record.get( 'tnd_cAlarmas' );
    var aeventos = [];
    var filterAlarmas = [];

    if( eventos ) {
        view.down( '#eventoshide' ).setValue( eventos );
        aeventos = eventos.split( ',' );
        filterAlarmas = aeventos;
    }

    if( record.get( 'tnd_iNotificarAlertas' ) == 1 ) {
        view.down( '#tnd_iNotificarAlertas' ).setValue( true );
    }

    if( record.get( 'tnd_iNotificarSP' ) == 1 ) {
        view.down( '#tnd_iNotificarSP' ).setValue( true );
    }

    var model = this.getSoftguardCodigoAlarmaModelModel();
    var filter = [ {
        property: 'cod_ccodigo:IN',
        value: eventos
    }];

    if( eventos != '' ) {
        var combostore = Ext.create( 'Ext.data.Store', {
            model: model,
            pageSize: 1000,
            remoteFilter: true,
            filters: filter
        })

        view.mask = Ext.create( 'Ext.LoadMask', view, {
            msg: getLocale( "Cargando alarmas" )
        }).show();

        combostore.load( {
            callback: function() {
                view.mask.hide()
                // selecciono los eventos
                var sel = [];
                var e;
                Ext.Array.each( aeventos, function( evento ) {
                    e = combostore.findRecord( 'Codigo', evento );
                    if( e ) {
                        sel.push( e );
                    }

                });

                if( sel[ 0 ] != null ) {
                    Ext.Array.each( sel, function( record ) {
                        if( record ) {
                            text = text + record.get( 'Descripcion' ) + '\r\n';
                        }
                    })

                    var textarea = view.down( '#eventos' );
                    if( textarea ) {
                        textarea.setValue( text );
                    }

                    controller.eventsSelected( { items: sel }, view );
                }
            }
        });
    }


    /**
     * BC 390792274 : Se agrega la notificacion PUSH del Dealer.
     * Se envia como parametro de AppType = push desde NotificacionesPushDealerGridController
     * este addType hace que se vean las nuevas opciones de la VIEW de SmartPanics y oculte GRUPO y Plantilla Email
     * deshabilito todo lo oculto para que tome valido el form.
     * 
     */
    if( view.addType == 'push' ) {
        view.down( '#fieldsetemail' ).hide();
        view.down( '#grupos' ).hide();

        view.down( '#destinomail' ).disable();
        view.down( '#tnd_cPlantillaMail' ).disable();
        view.down( '#grupos' ).disable();

        view.down( '#spfieldset' ).show();

    } else {
        view.down( '#todosChk' ).disable();
        view.down( '#adminChk' ).disable();
        view.down( '#adminCuentaChk' ).disable();
        view.down( '#todosCuentaChk' ).disable();
        view.down( '#tnd_cPlantillaPush' ).disable();
        view.down( '#tnd_cPlantillaMail' ).setValue( record.get( 'tnd_cPlantillaMail' ) );
    }

    /**
     * Cargo el record en el form
     * */
    myform.loadRecord( view.record );
},

saveObject: function(button, event, options ) {
    var view = button.up( 'smsdealerformview' );
    var win = button.up( 'window' );
    var myform = button.up( 'form' ).getForm();
    var record = view.record;
    var controller = this;

    /**
     * Tomo el valor del textarea de destinatario de email y verificando que no este vacio
     * */
    var destinomail = view.down( '#destinomail' ).getValue();

    if( !destinomail && !view.down( '#destinomail' ).isDisabled() ) {
        notifyError( 'Debe seleccionar un destino del mail' );
        return false;
    }

    /**
     * Tomo el valor del textarea de eventos y la del checkbox de notificar alertas y verifico que no esten vacio
     * */
    if( record.get( 'tnd_cAlarmas' ) == '' && !view.down( '#tnd_iNotificarAlertas' ).getValue() && !view.down( '#tnd_iNotificarSP' ).getValue() ) {
        notifyError( 'Debe seleccionar un evento.' );
        return false;
    }

    /**
     * BC 390792274 : Se crea un nuevo tipo de notificacion. Debo evaluar el addType y los checkbox cuando el addType es push
     * 
     */
    if( view.addType == 'push' ) {
        // Guardo fijo el tipo 1 correspondiente a PUSH
        record.set( 'tnd_iTipo', 1 )

        var todosChk = win.down( '#todosChk' );
        var adminChk = win.down( '#adminChk' );
        /*
                    if (todosChk.checked) {
                        record.set('tnd_iAdmin', 0)
                    } else if (adminChk.checked) {
                        record.set('tnd_iAdmin', 1)
                    } else {
                        notifyError('Debe seleccionar al menos un tipo de destinatario de la notificacion');
                        return false;
                    }
        */
    } else {
        // Guardo fijo el tipo 0 correspondiente a notificacion MAIL
        record.set( 'tnd_iTipo', 0 )
    }

    if( myform.isValid() ) {
        myform.updateRecord( record );

        record.set( 'tnd_cMail', record.get( 'tnd_cMail' ).split( ',' ).join( ';' ) )

        view.fireEvent( 'objectchanged', record );

        record.setConfig({
            proxy: this.getNotificacionesDealerModelModel().getProxy()
        });
        record.set( 'tnd_iNotificarSP', view.down( '#tnd_iNotificarSP' ).getValue() ? 1 : 0 );
        record.set( 'tnd_iNotificarAlertas', view.down( '#tnd_iNotificarAlertas' ).getValue() ? 1 : 0 );

        record.save( {
            callback: function() {
                view.caller.fireEvent( 'objectchanged', view.caller )
                //view.caller.fireEvent('hideAddBtn', view.caller)
            }
        });

        win.close();
    } else {
        notifyError( 'Revise errores en el formulario' );
    }
},

deleteObject: function(button, event, options ) {
    var myform = button.up( 'form' ).getForm();
    var mymodel = myform.getRecord();
    var view = button.up( 'smsdealerformview' );

    mymodel.destroy( {
        scope: this.application
    });

    view.fireEvent( 'objectchanged' ); // debiera ser en el callback del destroy
    win.close()
},
    
onCancelClick: function(button, event, options ) {
    myWin = button.up( 'window' );
    var myform = button.up( 'form' ).getForm();
    var record = myform.getRecord();

    myWin.close();
},
    
onGroupEventSelect: function(combo, records, options ) {
    var form = combo.up( 'form' ).getForm();
    var field = form.findField( 'tnd_iGrupoAlarma' );
    var eventos = form.findField( '_eventos' );
    var eventoshide = form.findField( 'tnd_cAlarmas' );

    /**
     * Blanqueo el textArea
     */
    eventos.setValue( '' );
    eventoshide.setValue( '' );

    /**
     * Hago condicion de, si esta en blanco (para este caso es que dio en la Cruz de eliminar opcion del combo
     */
    if( combo.getValue() != "" ) {
        var text = '';
        var arrayEventos = [];

        if( records[ 0 ] != false ) {
            var codigosAlarmaStore = Ext.create( 'Ext.data.Store', {
                model: this.getSoftguardCodigoAlarmaModelModel(),
                pageSize: 200,
                remoteSort: true,
                remoteFilter: true,
                filters: [
                    {
                        property: 'cod_cGrupo',
                        value: records[ 0 ].get( 'gru_ccodigo' )
                    }
                ]
            });

            codigosAlarmaStore.load( {
                callback: function( records, opciones, success ) {
                    if( opciones.success ) {
                        Ext.Array.each( records, function( record ) {
                            text = text + record.get( 'Descripcion' ) + '\r\n';
                            arrayEventos.push( record.get( 'cod_ccodigo' ) );
                        })
                        eventos.setValue( text );
                        eventoshide.setValue( arrayEventos.join( ',' ) )

                        combo.up( 'form' ).record.set( 'tnd_iGrupoAlarmas', 1 )
                        combo.up( 'form' ).record.set( 'tnd_cAlarmas', arrayEventos.join( ',' ) )
                    }
                }
            });
        }

        /**
         * Bloqueo el boton modificar
         * */
        combo.up( 'form' ).down( '#agregarevento' ).setDisabled( true );
    } else {
        combo.up( 'form' ).down( '#agregarevento' ).setDisabled( false );
    }

},
    
onVerPlantillaMailClick: function(button, event, options ) {
    var view = button.up( 'form' );
    var form = view.getForm();

    var combo = form.findField( 'tnd_cPlantillaMail' );
    var record = combo.valueModels[ 0 ];

    console.log( 'combo---', combo )
    console.log( 'recird', record )

    var myWindow = Ext.widget( 'window', {
        title: record.get( 'pls_cdescripcion' ),
        height: 150,
        width: 600,
        //autoScroll: true,
        modal: true,
        items: [ {
            xtype: 'box',
            padding: 5,
            autoScroll: true,
            html: '<xmp>' + record.get( 'pls_mplantilla' ) + '</xmp>'
        }],
        layout: 'fit'
    }).show();
},

onVerPlantillaPushClick: function(button, event, options ) {
    console.log( 'click' )
    var view = button.up( 'form' );
    var form = view.getForm();

    var combo = form.findField( 'tnd_cPlantillaPush' );
    var record = combo.valueModels[ 0 ];

    console.log( 'combo---', combo )
    console.log( 'recird', record )

    var myWindow = Ext.widget( 'window', {
        title: record.get( 'pls_cdescripcion' ),
        height: 150,
        width: 600,
        //autoScroll: true,
        modal: true,
        items: [ {
            xtype: 'box',
            padding: 5,
            autoScroll: true,
            html: '<xmp>' + record.get( 'pls_mplantilla' ) + '</xmp>'
        }],
        layout: 'fit'
    }).show();
},

/**
 * BC 390792274 : Se agrega la comprobacion de a quien enviar el push
 */
checkIsAdmin: function(checkbox, event, options ) {
    var controller = this;
    var window = checkbox.up( 'window' );

    var todosChk = window.down( '#todosChk' );
    var adminChk = window.down( '#adminChk' );

    adminCuentaChk

    if( todosChk.checked ) {
        adminChk.disable();
    } else {
        adminChk.enable();
    }

    if( adminChk.checked ) {
        todosChk.disable();
    } else {
        todosChk.enable()
    }
}
    
});
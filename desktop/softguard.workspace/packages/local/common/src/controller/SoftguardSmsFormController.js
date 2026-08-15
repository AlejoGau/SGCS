//MIGRADO2024
Ext.define( 'Common.controller.SoftguardSmsFormController', {
    extend: 'Ext.app.Controller',
    stores: [ 'Common.store.TablaLineasStore', 'Common.store.TablasModemsSmsStore', 'Common.store.TablaModemsSmsNoHabilitadosStore', 'Common.store.SmartpanicsCrmSoundsStore', 'Common.store.TablaPlantillasSmsStore', 'Common.store.SoftguardAlarmasSmsStore' ],
models: [ 'TablasGruposSearchModel', 'SmsStatusModel', 'TablasLineasSearchModel', 'TablasModemsSmsSearchModel', 'SoftguardCodigoAlarmaModel', 'ZonaSearchModel', 'UsersDesktopWebModulosModelSearch', 'TelefonoSearchModel', 'SoftguardSmsModel', 'NotificacionesModel', 'SmartPanicSearchModel', 'TablaPlantillasSmsModel', 'm_telefonoModel', 'SoftguardTelefonoModel' ],
views: [ 'SoftguardSmsFormView' ],
init: function(config ) {
    // this.initConfig(config);
    // genero los eventos
    this.control( {
        'smsformview button[action="save"]': {
            click: this.saveObject
        },
        'smsformview button[action="cancel"]': {
            click: this.onCancelClick
        },
        'smsformview button[action="verPlantillaMail"]': {
            click: this.onVerPlantillaMailClick
        },
        'smsformview button[action="verPlantillaSms"]': {
            click: this.onVerPlantillaSmsClick
        },
        'smsformview button[action="verPlantillapush"]': {
            click: this.onVerPlantillaPushClick
        },
        'smsformview #refreshnombres': {
            click: this.onRefreshNombresClick
        },
        'smsformview': {
            afterrender: this.initview,
            selectedEvents: this.eventsSelected,
            smartpanicsFieldChange: this.smartpanicsFieldChange
        },
        'smsformview #comboeventos': {
            select: this.onEventSelect
        },
        'smsformview #grupos': {
            change: this.onGrupoChange
        },
        'smsformview #contacto': {
            select: this.onContactoSelect
        },
        'smsformview #agregarevento': {
            click: this.onAgregarEventoClick
        },
        'smsformview #eventosalerta': {
            change: this.onEventosAlertaClick
        },
        'smsformview #solitarcambio': {
            click: this.onSolicitarCambioClick
        },
        'smsformview button[action="agregarsms"]': {
            click: this.onAgregarSMSClick
        }
    });
}, // cierro init
initview: function(view ) {
    const storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    var myform = view.getForm();
    var record = view.record;
    var module = view.module;
    var profile = module.get( 'profile' );
    var text = '';
    var eventos = view.record.get( 'sms_meventos' );
    const administratorModule = storeSecurity.findRecord( 'KeyReference', 'Administrator' );
    const storeModems = this.getTablasModemsSmsStoreStore();
    console.log( "administratorModule.get( 'Available' )", administratorModule.get( 'Available' ) )
    console.log("administratorModule",administratorModule)
    if( !administratorModule.get( 'Available' ) ) {
        const arrDealer = [];
        const userId = _UserData.udw_idKey;
        const modelUserDesktop = Ext.create( 'Ext.data.Store', {
            model: this.getUsersDesktopWebModulosModelSearchModel(),
            pageSize: 500,
            remoteFilter: true,
            filters: [ {
                property: 'dwm_idModules',
                value: 0
            }, {
                    property: 'dwm_idWeb',
                    value: userId
                }]
        });
        modelUserDesktop.load(
            {
                callback: function( records, operation, success ) {
                    if( success ) {
                        if( records.length > 0 ) {
                            const modemsFilter = storeModems.data.items.filter( modem =>
                                records.some( record => {
                                    return modem.get( 'sms_cDealer' ).includes( record.get( 'dwm_dealer' ) )
                                })
                            );
                            console.log( "modems que tienen asignado dealer", modemsFilter )
                            const modemSinDealer = storeModems.data.items.filter( modem => !modem.get( 'sms_cDealer' ) );
                            const modems = modemsFilter.concat( modemSinDealer )
                            console.log( "modems modemSinDealer", modemSinDealer )
                            console.log( "modems", modems )
                            storeModems.loadData( modems )
                        }
                    }
                }
            })
    }
    var storeTipos = this.getTablaPlantillasSmsStoreStore();
    view.down( '#modem' ).bindStore( storeModems );
    var storePlantilla = this.getTablaPlantillasSmsStoreStore();
    view.down( '#sms_cplantillasms' ).bindStore( storePlantilla )
    storePlantilla.load();
    var storePlantillaMail = this.getTablaPlantillasSmsStoreStore()
    view.down( '#sms_cplantillamail' ).bindStore( storePlantillaMail )
    var storePlantillaPush = this.getTablaPlantillasSmsStoreStore()
    view.down( '#sms_cplantillapush' ).bindStore( storePlantillaPush )
    var storeSonido = this.getSmartpanicsCrmSoundsStoreStore();
    //storeSonido.setRemoteFilter(false);
    view.down( '#sms_cSonido' ).bindStore( storeSonido )
    var comboGrupos = view.down( '#grupos' );
    var grupostore = Ext.create( 'Ext.data.Store', {
        model: this.getTablasGruposSearchModelModel(),
        pageSize: 200,
        remoteSort: true,
        remoteFilter: true,
        autoLoad: false
    });
    comboGrupos.bindStore( grupostore );
    grupostore.load();
    var aeventos = [];
    if( eventos )
        aeventos = eventos.split( ',' );
    var filterAlarmas = [];
    if( eventos ) {
        view.record.set( 'eventos', aeventos );
    }
    view.down( '#smartpanicsfield' ).record = record
    view.recordOriginal = view.record.copy()
    myform.loadRecord( view.record );
    if( view.addType == 'push' ) {
        view.down( '#contSonido' ).show()
        if( view.record.get( 'sms_cSonido' ) == '' ) {
            view.down( '#sms_cSonido' ).select( view.down( '#sms_cSonido' ).getStore().getAt( 0 ) );
        } else {
            view.down( '#sms_cSonido' ).select( view.record.get( 'sms_cSonido' ) );
        }
        view.down( '#botonSonido' ).on( 'click', function() {
            if( view.down( '#sms_cSonido' ).getValue() != '' ) {
                var store = view.down( '#sms_cSonido' ).getStore();
                var index = store.find( 'codigo', view.down( '#sms_cSonido' ).getValue() );
                var record = store.getAt( index );
                var audio = new Audio( record.data.soundpath );
                audio.play();
            }
        });
    }
    if( view.record.get( 'sms_iGrupoAlarmas' ) == 0 ) {
        comboGrupos.setValue( '' );
    }
    // ajusto labels smarttrack
    if( this.application._nameModule == 'VigiControl' ) {
        view.down( '#sms_czona' ).setFieldLabel( getLocale( 'Checkpoint' ) );
    }
    // lleno el combo de zonas
    var zonasstore = Ext.create( 'Ext.data.Store', {
        model: this.getZonaSearchModelModel(),
        remoteFilter: true,
        pageSize: 600,
        remoteSort: true,
        sorters: {
            property: 'orderCodigo',
            id: 'orderCodigo',
            direction: 'ASC'
        },
        filters: [
            {
                property: 'zon_ccodigo:LIKENOT',
                value: 'PAR'
            }, {
                property: 'zon_ccodigo:ISNOTNULLOREMPTYTRIM',
                value: ''
            }, {
                property: 'zon_iidcuenta',
                value: view.recordCuenta.get( 'cue_iid' )
            }
        ]
    });
    view.down( '#sms_czona' ).bindStore( zonasstore );
    zonasstore.load();
    //traigo datos para los displayfield
    var status = this.getSmsStatusModelModel();
    var controller = this;
    var model = this.getSoftguardCodigoAlarmaModelModel()
    var filter = [
        {
            property: 'cod_ccodigo:IN',
            value: eventos
        }
    ];
    // var filtro;
    if( view.addType == 'sms' ) {
        view.down( '#fieldsetsms' ).show();
        /* filter.push({
                 property:'cod_nSms'
                 value:1
                 
         });*/
    } else if( view.addType == 'email' ) {
        view.down( '#fieldsetemail' ).show();
        /* filter.push({
                 property:'cod_nMail'
                 value:1
                 
         });*/
    } else if( view.addType == 'push' ) {
        view.down( '#fieldsetpush' ).show();
    }
    if( view.record.get( 'sms_inotificaralertas' ) == 1 ) {
        view.down( '#eventosalerta' ).setValue( true )
    }
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
                Ext.Array.each( aeventos, function( evento ) {
                    var e = combostore.findRecord( 'Codigo', evento );
                    if( e )
                        sel.push( e );
                });
                if( sel[ 0 ] != null ) {
                    Ext.Array.each( sel, function( record ) {
                        if( record )
                            text = text + record.get( 'Descripcion' ) + '\r\n';
                    })
                    var textarea = view.down( '#eventos' );
                    if( textarea ) {
                        textarea.setValue( text );
                    }
                }
            }
        });
    }
    if( profile > 2 ) {
        var modem = view.down( '#modem' );
        modem.show();
        view.down( '#displaymodem' ).hide();
        if( view.record.get( 'sms_imodemsms' ) == 0 ) {
            modem.setValue( null );
        }
    } else {
        var field = view.down( '#displaymodem' );
        field.setValue( this.getModem( view.record.get( 'sms_imodemsms' ) ) );
    }
    // no permito modificar valores
    if( profile < 2 ) {
        view.disableForm();
    }
    if( profile == 4 ) {
        view.down( '#save' ).hide();
        view.down( '#solitarcambio' ).show()
    }
    var telstore = Ext.create( 'Ext.data.Store', {
        // model: this.getSoftguardTelefonoModelModel(),
        model: this.getTelefonoSearchModelModel(),
        remoteSort: false,
        remoteFilter: true,
        sorters: [
            {
                property: 'tel_norden',
                direction: 'ASC'
            }
        ],
        filters: [
            {
                property: 'tel_nsms',
                value: 1
            }, {
                property: 'tel_iidcuenta',
                value: view.record.get( 'sms_iidcuenta' )
            }
        ]
    });
    var _ObjectId = view.record.get( 'sms_iidcuenta' );
    view.down( '#contacto' ).bindStore( telstore );
    // una vez que cargue el store hago el binding con la view
    telstore.load( { ObjectId: _ObjectId, view: view, store: telstore });
    if( view.record.get( 'sms_cidspushsmartpanic' ) != '' ) {
        view.down( '#smartpanicsfield' ).setValue( view.record.get( 'sms_cidspushsmartpanic' ) )
    }
},
onGrupoChange: function(combo, newvalue ) {
    var view = combo.up( 'smsformview' )
    var form = view.getForm();
    var eventos = view.down( '#eventos' );
    var controller = this;
    if( newvalue ) {
        eventos.setValue( '' );
        view.down( '#eventosfieldset' ).setDisabled( true );
    }
    else {
        view.down( '#eventosfieldset' ).setDisabled( false );
    }
},
    
onAgregarSMSClick: function(button ) {
    var view = button.up( 'smsformview' );
    var smsnumero = view.down( '#sms_numero' ).getValue();
    var destinosms = view.down( '#destinosms' ).getValue();
    if( destinosms == "" ) {
        destinosms = smsnumero;
    } else {
        destinosms += ";" + smsnumero;
    }
    view.down( '#destinosms' ).setValue( destinosms );
    view.down( '#sms_numero' ).setValue( "" );
},
onSolicitarCambioClick: function(button ) {
    var view = button.up( 'smsformview' );
    var controller = this;
    var RecordModificado = view.getForm().getRecord().copy()
    view.getForm().updateRecord( RecordModificado );
    if( RecordModificado.get( 'sms_inotificaralertas' ) != 0 && RecordModificado.get( 'sms_inotificaralertas' ) != 1 ) {
        RecordModificado.set( 'sms_inotificaralertas', 0 )
    }
    RecordModificado.set( 'sms_cidspushsmartpanic', view.down( '#smartpanicsfield' ).getValue() )
    var RecordOriginal = view.recordOriginal//view.getForm().getRecord().copy()
    delete RecordOriginal.store
    var rest = '/Rest/Sms/' + view.getForm().getRecord().get( 'Id' )
    var method = 'PUT';
    if( view.getForm().getRecord().get( 'Id' ) == 0 ) {
        rest = '/Rest/Sms'
        var method = 'POST';
    }
    Ext.Ajax.request( {
        url: '/handler/SearchPost?search=SolicitudModificacionesUpdOIns',
        method: 'POST',
        params: {
            pom_usuariopedido: _UserData.udw_idKey,
            pom_fechapedido: new Date(),
            pom_idtipoobjeto: view.getForm().getRecord().get( 'ObjectTypeId' ),
            pom_idobjeto: view.getForm().getRecord().get( 'Id' ),
            pom_sinmodificar: Ext.encode( RecordOriginal ),
            pom_modificado: Ext.encode( RecordModificado ),
            pom_estado: 0,
            pom_log: {},
            pom_usuarioultcambio: -1,
            pom_cueiid: view.record.get( 'sms_iidcuenta' ),
            pom_metadata: Ext.encode( {
                form: {
                    alias: view.xtype,
                    title: getLocale( 'Notificaciones' )
                },
                //cuando usa models viejos le armo la URL a mano
                altPath: rest,
                method: method
            })
        },
        scope: this,
        success: function( response ) {
            var errors = Ext.JSON.decode( response.responseText );
            notify( "La solicitud fue realizada" )
        }
    })
    view.up( 'window' ).close()
},
smartpanicsFieldChange: function (records, view ) {
    var record = view.getRecord();
    this.getNombresContactosPUSH( view, function( nombres ) {
        record.set( 'sms_cDescripcion', nombres )
        view.down( '#descripcion' ).setValue( nombres )
    })
},
onRefreshNombresClick: function (btn ) {
    var view = btn.up( 'smsformview' )
    var myform = btn.up( 'form' ).getForm();
    var record = myform.getRecord();
    var controller = this;
    if( record.get( 'sms_cidspushsmartpanic' ) != '' ) {
        //si es PUSH traigo los nombres getNombresContactosPUSH
        controller.getNombresContactosPUSH( view, function( nombres ) {
            record.set( 'sms_cDescripcion', nombres )
            view.down( '#descripcion' ).setValue( nombres )
        })
    } else if( view.down( '#destinosms' ).getValue() != '' ) {
        //si es SMS traigo los nombres con getNombresContactosSMS
        var nombres = controller.getNombresContactosSMS( view );
        record.set( 'sms_cDescripcion', nombres )
        view.down( '#descripcion' ).setValue( nombres )
    }
},
getNombresContactosPUSH: function (view, callback ) {
    view.combostore = Ext.create( 'Ext.data.Store', {
        model: this.getSmartPanicSearchModelModel(),
        pageSize: 1000,
        remoteSort: false,
        remoteFilter: true,
        filters: [ {
            property: 'Id:ININT',
            value: view.down( '#smartpanicsfield' ).getValue().split( ';' ).join( ',' )
        }]
    }).load( {
        callback: function( records ) {
            var nombres = [];
            Ext.Array.each( records, function( v, k ) {
                nombres.push( v.get( 'Nombre' ) )
            })
            callback( nombres.join( ';' ) )
        }
    })
},
    
getNombresContactosSMS: function (view ) {
    var nombres = [];
    var contactosStore = view.down( '#contacto' ).getStore();
    var numerosSeleccionadosArray = view.down( '#destinosms' ).getValue().split( ';' )
    Ext.Array.each( numerosSeleccionadosArray, function( v, k ) {
        var r = contactosStore.findRecord( 'tel_ctelefono', v, null, null, null, true )
        if( r ) {
            nombres.push( r.get( 'tel_cnombre' ) )
        }
    })
    return nombres.join( ';' )
},
    
onEventosAlertaClick: function (chk, event, options ) {
    var view = chk.up( 'smsformview' );
    if( chk.getValue() ) {
        view.down( '#eventosfieldset' ).setDisabled( true );
        //view.down('#eventosfieldset').setValue('');
        view.down( '#grupos' ).setValue( '' );
        view.down( '#grupos' ).disable();
    } else {
        view.down( '#eventosfieldset' ).setDisabled( false );
        view.down( '#grupos' ).enable();
    }
},
onAgregarEventoClick: function (btn ) {
    var view = btn.up( 'smsformview' );
    var filter = [];
    if( view.addType == 'sms' ) {
        filter.push( {
            property: 'cod_nSms',
            value: 1
        });
    } else if( view.addType == 'email' ) {
        filter.push( {
            property: 'cod_nMail',
            value: 1
        });
    } else if( view.addType == 'push' ) {
        filter.push( {
            property: 'cod_nSms',
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
            eventSelected: view.record.get( 'sms_meventos' ),
            caller: view,
            filter: filter
        }],
        layout: 'fit'
    }).show();
    myWindow.on( 'selectedEvents', function() {
        console.log( arguments )
    })
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
    if( view.down( '#eventoshide' ) ) {
        view.down( '#eventoshide' ).setValue( arrayEventos.join( ',' ) )
    }
    view.record.set( 'sms_meventos', arrayEventos.join( ',' ) )
},    
    
onContactoSelect: function(combo, records, options ) {
    var form = combo.up( 'form' ).getForm();
    var field = form.findField( 'sms_csmsparaeventos' );
    var controller = this;
    var view = combo.up( 'smsformview' )
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
	
getModem: function(value ) {
    var store = Ext.data.StoreManager.get( 'TablaModemsSmsStore' );
    var record = store.findRecord( 'sms_icodigo', value );
    if( record == undefined )
        return getLocale( 'Sin Modem' );
    else
        return record.data.sms_cdescripcion;
},
saveObject: function(button, event, options ) {
    // cambio la cantidad de columnas al panel
    // accedo al registro y lo salvo
    var view = button.up( 'smsformview' );
    var win = button.up( 'window' );
    var myform = button.up( 'form' ).getForm();
    var record = myform.getRecord();
    var controller = this;
    //  var eventos = view.down('#comboeventos').getValue();
    var destinosms = view.down( '#destinosms' ).getValue();
    var destinomail = view.down( '#destinomail' ).getValue();
    var destinopush = view.down( '#smartpanicsfield' ).getValue();
    if( !destinosms && !destinomail && !destinopush ) {
        notifyError( 'Debe seleccionar un destino del mail o sms o push.' );
        return false;
    }
    if( record.get( 'sms_meventos' ) == '' && !view.down( '#eventosalerta' ).getValue() && !view.down( '#grupos' ).getValue() ) {
        notifyError( 'Debe seleccionar un evento.' );
        return false;
    }
    if( myform.isValid() ) {
        myform.updateRecord( record );
        record.set( 'rep_cmail', record.get( 'sms_cmailparaeventos' ).split( ',' ).join( ';' ) )
        view.fireEvent( 'objectchanged', record );

        record.setConfig({
            proxy: this.getNotificacionesModelModel().getProxy()
        });

        record.set( 'sms_inotificaralertas', view.down( '#eventosalerta' ).getValue() ? 1 : 0 )
        record.set( 'sms_cplantillapush', record.get( 'sms_cplantillapush' ) )
        record.set( 'sms_cidspushsmartpanic', view.down( '#smartpanicsfield' ).getValue() )
        /* if(record.get('sms_cidspushsmartpanic') != '') {
             //si es PUSH traigo los nombres getNombresContactosPUSH
             controller.getNombresContactosPUSH(view, function (nombres) {
                 
                 record.set('sms_cDescripcion', nombres)
                 record.save({callback:function () {
                     view.caller.fireEvent('objectchanged', view.caller)
                 }});                    
                 win.close();
             
             
             })
             
         } else if(view.down('#destinosms').getValue() != '') {
             //si es SMS traigo los nombres con getNombresContactosSMS
             record.set('sms_cDescripcion',controller.getNombresContactosSMS(view))
             record.save({callback:function () {
                 view.caller.fireEvent('objectchanged', view.caller)
             }});
             
             win.close();
         }*/
        /*  if (record.get('Id')==0){
              record.setId(0);
              record.phantom = false;
          }*/
        record.save( {
            callback: function() {
                view.caller.fireEvent( 'objectchanged', view.caller )
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
    var view = button.up( 'smsformview' );
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
    /* if (record.get('Id') == 0){
         record.store.remove(record);
     }*/
    myWin.close();
},
    
getModem: function(value ) {
    var store = Ext.data.StoreManager.get( 'TablaModemsSmsStore' );
    var record = store.findRecord( 'sms_icodigo', value );
    if( record == undefined )
        return getLocale( 'Sin Modem' );
    else
        return record.data.sms_cdescripcion;
},
    
onEventSelect: function(combo, records, options ) {
    var form = combo.up( 'form' ).getForm();
    var field = form.findField( 'sms_meventos' );
    var eventos = form.findField( '_eventos' );
    var text = '';
    field.setValue( new String().concat( combo.getValue() ) );
    if( records[ 0 ] != false ) {
        Ext.Array.each( records, function( record ) {
            text = text + record.get( 'Descripcion' ) + '\r\n';
        })
    }
    eventos.setValue( text );
},
    
onVerPlantillaMailClick: function(button, event, options ) {
    var view = button.up( 'form' );
    var form = view.getForm();
    var combo = form.findField( 'sms_cplantillamail' );
    var value = combo.getValue();

    if (!value) {
        notifyError('Debe seleccionar una plantilla primero.');
        return;
    }

    var record = combo.getStore().findRecord(combo.valueField, value);

    if (!record) {
        notifyError('No se encontró la plantilla seleccionada.');
        return;
    }

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
    var view = button.up( 'form' );
    var form = view.getForm();
    var combo = form.findField( 'sms_cplantillapush' );
    var value = combo.getValue();

    if (!value) {
        notifyError('Debe seleccionar una plantilla primero.');
        return;
    }

    var record = combo.getStore().findRecord(combo.valueField, value);

    if (!record) {
        notifyError('No se encontró la plantilla seleccionada.');
        return;
    }

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
onVerPlantillaSmsClick: function(button, event, options ) {
    var view = button.up( 'form' );
    var form = view.getForm();
    var combo = form.findField( 'sms_cplantillasms' );
    var value = combo.getValue();

    if (!value) {
        notifyError('Debe seleccionar una plantilla primero.');
        return;
    }

    var record = combo.getStore().findRecord(combo.valueField, value);

    if (!record) {
        notifyError('No se encontró la plantilla seleccionada.');
        return;
    }

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
}
});
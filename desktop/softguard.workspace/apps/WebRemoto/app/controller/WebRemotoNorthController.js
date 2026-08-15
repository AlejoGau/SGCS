Ext.define( 'WebRemoto.controller.WebRemotoNorthController', {
    extend: 'Ext.app.Controller',
    stores: [ 'EventoEstadoStore' ],
models: [ 'SmartMailProgramModel', 'EventosPendientesSearchModel', 'TablasGruposSearchModel', 'AlarmasEnEventosPendientesSearchModel', 'ComboEventosModel' ],
views: [ 'WebRemotoNorthView' ],
init: function(config ) {
    this.control( {
        'webremotonorthview': {
            afterrender: this.initSuperView, //this.initView,
            //  cuentachanged: this.onCuentaChanged,
            cuentaselected: this.onCuentaSelected,
            //  initEventListener: this.initEventListener,
            newEventListener: this.newEventListener,
            grabarcuentaselected: this.onGrabarCuentaChanged
        },
        'webremotonorthview button[action=play]': {
            click: this.onPlayClick
        },
        /*'webremotonorthview #atencionautomatica' : {
            change : this.onAtencionAutomaticaClick
        },*/
        'webremotonorthview button[action=cambiooperador]': {
            click: this.onCambioOperadorClick
        },
        'webremotonorthview button[action=send]': {
            click: this.onSendClick
        },
        'webremotonorthview button[action=buscarcuenta]': {
            click: this.onBuscarCuentaClick
        },
        'webremotonorthview #newevent': {
            click: this.onNewEventClick
        },
        'webremotonorthview #grabarllamada': {
            click: this.onGrabarLlamadaClick
        },
        'webremotonorthview button[action=modoEmergencia]': {
            click: this.onModoEmergenciaClick
        },        
    });
},
onModoEmergenciaClick: function(button, object, options ) {
    var condicion = [];

    if( myQueryString.CondicionCuenta ) {
        condicion = JSON.parse( myQueryString.CondicionCuenta )
    }

    var storeSecurity = Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    var recordAdminsitrator = storeSecurity.findRecord( 'KeyReference', 'Administrator' )
    var recordDealerSearch = storeSecurity.findRecord( 'KeyReference', 'WebDealer' )
    if( recordAdminsitrator && recordAdminsitrator.get( 'Available' ) == true ) {
        forceIdModule = recordAdminsitrator.get( 'ModuleId' )
    } else if( recordDealerSearch && recordDealerSearch.get( 'Available' ) == true ) {
        forceIdModule = recordDealerSearch.get( 'ModuleId' )
    }

    var view = button.up( 'webremotonorthview' )
    if( !view.win ) {
        view.win = Ext.create( 'Ext.Window', {
            layout: 'fit',
            title: 'Modo Emergencia',
            width: '70%',
            height: 600,
            border: true,
            modal: false,
            minimizable: true, listeners: {
                minimize: function() {
                    view.down( '#modoEmergencia' ).setText( getLocale( 'Modo Emergencia' ) )
                    this.hide();
                },
                close: function() {
                    view.win = null;
                    view.down( '#modoEmergencia' ).setText( getLocale( 'Modo Emergencia' ) )
                }
            },
            items: [
                {
                    //title: 'Center Region',
                    xtype: 'tabpanel',
                    region: 'center',
                    itemId: 'center',
                    layout: 'fit',
                    margins: '5 0 0 0',
                    items: [
                        {
                            xtype: 'modoemergenciaeventosview',
                            title: 'Modo Emergencia',
                            //readOnly:true,
                            condicion: condicion.join( ',' ),
                            cuentaCreateHide: true,
                            forceIdModule: forceIdModule
                        }
                    ]
                }
            ]

        })
    }
    view.win.show()

    //view.win.show()
},

onGrabarCuentaChanged: function (cuenta, view ) {

    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Grabar llamada entrante',
        closeAction: 'destroy',
        itemId: 'cuentaWin',
        width: 300,
        height: 200,
        border: true,
        modal: true,
        view: view,
        items: [
            {
                xtype: 'grabarllamadaentranteview',
                record: cuenta,
                operadorId: view.operadorId
            }
        ]
    });
    win.show();
},

onGrabarLlamadaClick: function (btn ) {
    var view = btn.up( 'webremotonorthview' )

    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Seleccione una Cuenta',
        closeAction: 'destroy',
        itemId: 'cuentaWin',
        width: 750,
        height: 550,
        border: true,
        modal: true,
        view: view,
        items: [
            {
                xtype: 'cuentahelperview',
                tip_nCondicion: "0,5",
                caller: view,
                selectionEvent: 'grabarcuentaselected'
            }
        ]
    });
    win.show();
},
    
    
//este INIT lo arme por que teniamos probemas de carga con el operador ID es una solucion rapida
//sacar el AJAX usar el security que esta cargado.
initSuperView: function (view ) {
    var controller = this;
    //inicio variable de sonido para que no se repita el mismo evento
    view.ultimoSonidoEvento = 0;

    // Aislamiento/robustez: si no hay _UserData, no audito
    try {
        var qs = (window.location && window.location.search) ? window.location.search : '';
        var isolate = (window && window._WR_ISOLATE_LAYOUT === true) ||
                      (typeof Ext !== 'undefined' && Ext.global && Ext.global._WR_ISOLATE_LAYOUT === true) ||
                      (window.localStorage && localStorage.getItem('WR_ISOLATE') === '1') ||
                      (/([?&])ISOLATE=1(?!\d)/i.test(qs));
    } catch(e) { var isolate = false; }

    if (!isolate && typeof _UserData !== 'undefined' && _UserData && _UserData.UserId) {
        //auditoria
        Ext.Ajax.request( {
            url: '/rest/search/MwrLoginLogout',
            params: {
                userId: _UserData.UserId,
                login: 1
            },
            method: 'GET',
            scope: this,
            success: function( response ) { }
        })
    }

    var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    var recordMultimonitor = storeSecurity && storeSecurity.findRecord ? storeSecurity.findRecord( 'KeyReference', 'WebRemoto' ) : null;
    if( recordMultimonitor && recordMultimonitor.get( 'Available' ) == true ) {
        var _security = recordMultimonitor.get( '_Security' );
        if( _security && _security.hasOwnProperty( 'sonido' ) && _security.sonido == 'false' ) {
            controller.application.MUTE = true
            view.down( '#play' ).toggle( false );
        }
        if( _security ){ //en algunos usuarios _security viene con valor null
            view.operadorId = _security.ope_iid;
            view.sineventosdeposicion = _security.sineventosdeposicion;
        }
    }

    //si logger no esta en la llave lo escondo
    var store = KeyModulesStore;//this.getKeyModulesStoreStore();
    if( store && store.isModuleAvailable && !store.isModuleAvailable( 'Logger' ) ) {
        view.down( '#grabarllamada' ).hide()
    }

    if( view.operadorId == '' || view.operadorId == 0 || view.operadorId == null ) {
        notify( 'No se cargo el id del operador' )
        return false;
    }

    view.AVISOSONIDOPENDIENTES = getParametro( 'TIEMPOAVISOSONIDOPENDIENTES' );
    if( view.AVISOSONIDOPENDIENTES > 0 ) {
        view.lastSonidoPendiente = Date.now(); //arranco la cuenta de timepo para que a los x minutos reproduzca el sonido
    }

    controller.initView( view )
},

initView: function(view ) {
    var me = this;
    view.lastiid = 0;
    view.countLoading = 0;

    var filters = [
        // estamos en eventos pendientes no hace falta filtrar por alerta.
        /*{
            property:'cod_nalerta',
            value:1,
            id:'cod_nalerta'
        }*/
    ]

    var sorters = [
        {
            property: 'rec_iPrioridad',
            direction: 'ASC'
        }, {
            property: 'rec_tfechahora',
            direction: 'ASC'
        }
    ]

    // me fijo si estoy en automonitoreo
    var AUTOPROCESAMIENTO = parseInt( getParametro( 'AUTOPROCESAMIENTO' ) );

    if( AUTOPROCESAMIENTO == 1 ) {
        var toolbarAutomonitoreo = Ext.create( 'Ext.toolbar.Toolbar', {
            itemId: 'tbAutomonitoreo',
            hidden: false,
            items: [
                {
                    style: 'color:red',
                    xtype: 'tbtext',
                    text: '<b>' + getLocale( 'El sistema se encuentra en AUTOPROCESAMIENTO' ) + '</b>'
                },
                "->",
                {
                    iconCls: 'icon-cancel',
                    text: 'Cerrar',
                    action: 'close',
                    itemId: 'close',
                    handler: function() {
                        toolbarAutomonitoreo.hide();
                    }
                }
            ]
        });

        view.addDocked( toolbarAutomonitoreo );
    } else if( AUTOPROCESAMIENTO == 2 ) {
        var toolbarAutomonitoreo = Ext.create( 'Ext.toolbar.Toolbar', {
            itemId: 'tbAutomonitoreo',
            hidden: false,
            items: [
                {
                    style: 'color:red',
                    xtype: 'tbtext',
                    text: '<b>' + getLocale( 'El sistema se encuentra en AUTOPROCESAMIENTO POR DEALER' ) + '</b>'
                },
                "->",
                {
                    iconCls: 'icon-cancel',
                    text: 'Cerrar',
                    action: 'close',
                    itemId: 'close',
                    handler: function() {
                        toolbarAutomonitoreo.hide();
                    }
                }
            ]
        });

        view.addDocked( toolbarAutomonitoreo );
    }

    var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    var recordWebremoto = storeSecurity.findRecord( 'KeyReference', 'WebRemoto' )
    var recordDealer = storeSecurity.findRecord( 'KeyReference', 'WebDealer' )
    var recordAccountAdministrator = storeSecurity.findRecord( 'KeyReference', 'SgAppAccountAdministration' )
    var recordAdministrator = storeSecurity.findRecord( 'KeyReference', 'Administrator' )
    var keystore = KeyModulesStore;//this.getKeyModulesStoreStore();
    var linkavailable = storeSecurity.isModuleAvailable( 'Link' );
    var isadministrator = storeSecurity.isModuleAvailable( 'Administrator' );
    var linkkeyavailable = keystore.isModuleAvailable( 'Link' );

    if( linkavailable || ( isadministrator && linkkeyavailable ) ) {
        view.down( '#linkbtn' ).show();
    }

    if( recordWebremoto && recordWebremoto.get( 'Available' ) == true ) {
        var json = recordWebremoto.get( '_Security' );

        view.tiempoatencion = json.tiempoatencion ? json.tiempoatencion : 5;
        //config de envio masivo SMS
        if( json.EnvioSMSMasivo && json.EnvioSMSMasivo == 'true' ) {
            // view.down('#send').show();
            view.down( '#send' ).setDisabled( false );
        }

        if( json.grabarLlamadasEntrantes && json.grabarLlamadasEntrantes == '1' ) {
            view.down( '#grabarllamada' ).setDisabled( false );
        }

        if( json.bitacora ) {
            view.bitacora = json.bitacora
        } else {
            // dejo en TRUE si no vino por metadata
            view.bitacora = true
        }

        if( json.timeline ) {
            view.timeline = json.timeline
        } else {
            // dejo en TRUE si no vino por metadata
            view.timeline = true
        }
        if( json.notas ) {
            view.notas = json.notas
        } else {
            // dejo en TRUE si no vino por metadata
            view.notas = true
        }

        if( json.generadorEventos && json.generadorEventos == 'true' ) {
            //view.down('#newevent').show();
            view.down( '#newevent' ).setDisabled( false );
        }

        if( myQueryString.HideGenerarEvento == 'true' ) {
            view.down( '#newevent' ).hide();
        }

        //DS-589|adrianlara|230322 => Deshabilitar boton de play si el checkbox nomutealarm es true
        if( json.nomutealarm && json.nomutealarm == 'true' ) {
            view.down( '#play' ).disable();
        }


        if( json.EnvioSmsSimple && json.EnvioSmsSimple == 'true' ) {
            view.EnvioSmsSimple = true;
        }

        //lo muestro si tiene Delaer o accountadministrator o es admin
        if( ( recordDealer && recordDealer.get( 'Available' ) == true ) ||
            ( recordAccountAdministrator && recordAccountAdministrator.get( 'Available' ) == true ) ||
            ( recordAdministrator && recordAdministrator.get( 'Available' ) == true )
        ) {
            //view.down('#buscarcuenta').show();        
            view.down( '#buscarcuenta' ).setDisabled( false );
        }

        if( json.ControlOperador && json.ControlOperador == 'true' ) {
            view.intentosErroneos = 0;

            //default
            view.serenoConfig = {
                horaDesde: '0000',
                horaHasta: '1050',
                tiempoMinMilisegundo: 300000, // 5 minutos
                tiempoMaxMilisegundo: 3600000, // una hora
                tipoAlarma: '_CO',
                //cue_iid: '11199',
                //mail: 'adrian.cavicchia@synapticlinks.com.ar',
                tiempoRespuesta: 30000
            }

            var SERENOPARAOPERADORTIEMPO = getParametro( 'SERENOPARAOPERADORTIEMPO' );
            var MAILSERENOOPERADOR = getParametro( 'MAILSERENOOPERADOR' );
            var TIEMPORESPUESTASERENO = getParametro( 'TIEMPORESPUESTASERENO' );
            var SERENOPARAOPERADORSONIDO = getParametro( 'SERENOPARAOPERADORSONIDO' );

            if( SERENOPARAOPERADORTIEMPO ) {
                if( SERENOPARAOPERADORTIEMPO < 5 ) {
                    SERENOPARAOPERADORTIEMPO = 5;
                }
                view.serenoConfig.tiempoMaxMilisegundo = ( SERENOPARAOPERADORTIEMPO * 60000 )
            }
            if( MAILSERENOOPERADOR ) {
                view.serenoConfig.mail = MAILSERENOOPERADOR;
            }
            if( TIEMPORESPUESTASERENO ) {
                view.serenoConfig.tiempoRespuesta = ( TIEMPORESPUESTASERENO * 60000 );
            }

            if( SERENOPARAOPERADORSONIDO ) {
                if( Ext.util.Format.trim( SERENOPARAOPERADORSONIDO ) ) {
                    view.serenoSonido = SERENOPARAOPERADORSONIDO;
                } else {
                    view.serenoSonido = '2.wav';
                }
            }

            view.serenoConfig.horaDesde = json.ControlOperadorHoraDesde;
            view.serenoConfig.horaHasta = json.ControlOperadorHoraHasta;
            me.setTimeOpenSerenoWin( view );
        }

        //ATENCION AUTOMATICA
        var filtrosGuardados = Ext.decode( json.Filtros );
        var metadataEstado, metadataOrigen, metadataPrioridad, metadataGrupo;

        if( filtrosGuardados ) {
            metadataEstado = filtrosGuardados.Estado;
            metadataOrigen = filtrosGuardados.Origen;
            metadataPrioridad = filtrosGuardados.Prioridad;
            metadataGrupo = filtrosGuardados.Grupo;
        }
        //La sección || (json && json.MonitoreoGuiado && json.MonitoreoGuiado == "true" es para determinar si 
        // es un usuario de Monitoreo Guiado
        if( (json && json.AtenderAuto && json.AtenderAuto == "true" ) || (json && json.MonitoreoGuiado && json.MonitoreoGuiado == "true")) {
            arrEstado = [];
            Ext.Array.each( metadataEstado, function( rec ) {
                arrEstado.push( rec.Value )
            })

            arrOrigen = [];
            Ext.Array.each( metadataOrigen, function( rec ) {
                arrOrigen.push( rec.Value )
            })

            arrPrioridad = [];
            Ext.Array.each( metadataPrioridad, function( rec ) {
                arrPrioridad.push( rec.Value )
            })

            arrGrupo = [];
            Ext.Array.each( metadataGrupo, function( rec ) {
                arrGrupo.push( rec.Value )
            })

            filters = [
                    // si es eventos pendientes no hace falta el alerta en 1
                    /*{
                        property:'cod_nalerta',
                        value:1,
                        id:'cod_nalerta'
                    },*/{
                    property: 'rec_nestado',
                    value: 0,
                    id: 'rec_nestado'
                }, {
                    property: 'operadorAtendiendoCuentaNULLyPropio',
                    value: view.operadorId,
                    id: 'operadorAtendiendoCuenta'
                }
            ]

            if( filtrosGuardados.filtroAlarmas ) {
                filters.push( {
                    property: 'rec_calarma:IN',
                    value: filtrosGuardados.filtroAlarmas,
                    id: 'rec_calarma'
                })
            }


            if( arrOrigen.length > 0 ) {
                filters.push( {
                    property: 'rec_norigen:ININT',
                    value: arrOrigen.join( ',' ),
                    id: 'rec_norigen'
                })
            }

            if( arrPrioridad.length > 0 ) {
                filters.push( {
                    property: 'rec_iprioridadININT',
                    value: arrPrioridad.join( ',' ),
                    id: 'rec_iprioridad'
                })
            }

            view.ATENCIONAUTOMATICA = true;
            if(json && json.MonitoreoGuiado && json.MonitoreoGuiado == "true"){
                view.ATENCIONGUIADA = true; //con esto marco que es una usuario de monitoreo guiado
            }


        } else {
            // si no estoy en atencion atumatica el orden para el sonido es el ultimo que llega.
            sorters = [
                {
                    property: 'rec_iid',
                    direction: 'DESC'
                }
            ]
        }

        if( myQueryString.CondicionCuenta ) {
            condicion = JSON.parse( myQueryString.CondicionCuenta )

            filters.push( {
                property: 'tip_ncondicion:ININT',
                value: condicion.join( ',' ),
                id: 'tip_ncondicion'
            })
        }

        //cuando el usuario es supervisor solo traigo los eventos de supervision
        if( json && json.supervision == 2 && json.AtenderAuto == "true" ) {
            filters.push( {
                property: 'pro_nProceso:ININT',
                value: '40,44',
                id: 'pro_nProceso'
            })
        } else {
            filters.push( {
                property: 'pro_nProcesoNOTININT',
                value: '40,44',
                id: 'pro_nProceso'
            })
        }

        view.mystore = Ext.create( 'Ext.data.Store', {
            model: me.getEventosPendientesSearchModelModel(),
            //remoteGroup: false,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 1,
            filters: filters,
            sorters: sorters
        });
        view.mystore._loading = false;

        // dedalo: corro la tarea 2,5 sec para que no se ejectute al mismo tiempoqeu la otra busqeuda de eventos pendientes
        Ext.Function.defer( me.setTask, 3500, me, [ view ] );

        //si esta cookie exite le disparado automaticamente la comprobacion de sereno
        if( Ext.util.Cookies.get( 'keyActive' ) ) {
            this.openSerenoWin( view );
        }
    }
}, // cierro init

setTask: function(view ) {
    view.task = Ext.TaskManager.start( {
        args: [ view ],
        scope: this,
        run: this.loadData,
        interval: view.tiempoatencion * 1000
    });
},
    
    
onNewEventClick: function (btn ) {
    var view = btn.up( 'webremotonorthview' );
    var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup('SecurityModulesStore');  
    var recordMultimonitor = storeSecurity.findRecord('KeyReference', 'WebRemoto')
    var windowHeight = 600;
    if(recordMultimonitor && recordMultimonitor.get('Available') == true) {  
        var _security = recordMultimonitor.get('_Security');
        if(_security &&  _security.hasOwnProperty('sineventosdeposicion') && _security.sineventosdeposicion == 'true') {
            windowHeight = 400;             
        }
    }

    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Generar evento',
        width: 600,
        height: windowHeight,
        border: true,
        modal: true,
        
        autoShow: true,
        items: [
            {
                xtype: 'generareventoformview',
                sineventosdeposicion: view.sineventosdeposicion
            }
        ]
    });
},
    
onBuscarCuentaClick: function(button, object, options ) {
    var condicion = [];

    if( myQueryString.CondicionCuenta ) {
        condicion = JSON.parse( myQueryString.CondicionCuenta )
    }

    var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    var recordAdminsitrator = storeSecurity.findRecord( 'KeyReference', 'Administrator' )
    var recordDealerSearch = storeSecurity.findRecord( 'KeyReference', 'WebDealer' )
    if( recordAdminsitrator && recordAdminsitrator.get( 'Available' ) == true ) {
        forceIdModule = recordAdminsitrator.get( 'ModuleId' )
    } else if( recordDealerSearch && recordDealerSearch.get( 'Available' ) == true ) {
        forceIdModule = recordDealerSearch.get( 'ModuleId' )
    }

    var view = button.up( 'webremotonorthview' )
    if( !view.win ) {
        view.win = Ext.create( 'Ext.Window', {
            layout: 'fit',
            title: 'Buscar cuenta',
            width: '90%',
            height: 400,
            border: true,
            modal: false,
            minimizable: true,
            listeners: {
                minimize: function() {
                    view.down( '#buscarcuenta' ).setText( getLocale( 'Maximizar buscar cuenta' ) )
                    this.hide();
                },
                close: function() {
                    view.win = null;
                    view.down( '#buscarcuenta' ).setText( getLocale( 'Buscar cuenta' ) )
                }
            },
            items: [
                {
                    //title: 'Center Region',
                    xtype: 'tabpanel',
                    region: 'center',
                    itemId: 'center',
                    layout: 'fit',
                    margins: '5 0 0 0',
                    items: [
                        {
                            xtype: 'cuentagridview',
                            //readOnly:true,
                            condicion: condicion.join( ',' ),
                            cuentaCreateHide: true,
                            forceIdModule: forceIdModule
                        }
                    ]
                }
            ]
        })
    }
    view.win.show()
},
    
onCambioOperadorClick: function(button, object, options ) {
    var view = button.up( 'webremotonorthview' );
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Login',
        width: 400,
        height: 120,
        border: true,
        modal: false,
        modal: true,
        items: [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Usuario',
                        itemId: 'usuario',
                        vtype: 'email',
                        allowBlank: false
                    }, {
                        xtype: 'textfield',
                        inputType: 'password',
                        fieldLabel: 'Clave',
                        itemId: 'clave',
                        allowBlank: false
                    }, {
                        xtype: 'button',
                        text: 'Ingresar',
                        listeners: {
                            click: function() {
                                var user = this.up( 'window' ).down( '#usuario' ).getValue();
                                var pass = this.up( 'window' ).down( '#clave' ).getValue();

                                if( win.down( 'form' ).getForm().isValid() ) {
                                    Ext.Ajax.request( {
                                        url: '/handler/GetOperatorByUserPass',
                                        params: {
                                            user: user,
                                            pass: pass
                                        },
                                        method: 'GET',
                                        scope: this,
                                        success: function( response ) {
                                            var parametros = Ext.JSON.decode( response.responseText );

                                            if( !parametros.error ) {
                                                // descuento la sesion
                                                Ext.Ajax.request( {
                                                    url: '/a/WebRemoto?dropModuleSession=true'
                                                })

                                                // este debe ser el ope_iid del nuevo usuario
                                                var operadorTo = parametros.metadata.ope_iid;
                                                var operadorToNombre = parametros.metadata.Usuario;
                                                Ext.Ajax.request( {
                                                    url: '/rest/search/ReasignarEventosAUsuario',
                                                    params: {
                                                        idOperadorFrom: view.operadorId,
                                                        idOperadorTo: operadorTo
                                                    },
                                                    method: 'GET',
                                                    scope: this,
                                                    success: function( response ) {
                                                        var parametros = Ext.JSON.decode( response.responseText );
                                                        if( parametros.rows.length > 0 ) {
                                                            notify( 'Se reasignaron ' + parametros.total + ' eventos' );

                                                            // pasar esto adentro del store de reasignacion y no hacerlo aca que no tiene sentido... 
                                                            Ext.Array.each( parametros.rows, function( record ) {
                                                                Ext.Ajax.request( {
                                                                    url: '/rest/search/AtencionEventoObservacion',
                                                                    params: {
                                                                        rec_iid: record.rec_iid,
                                                                        rec_cObservaciones: 'El usuario ' + operadorToNombre + ' tomo los eventos del usuario ' + view.metadata.Usuario
                                                                    },
                                                                    method: 'GET',
                                                                    scope: this,
                                                                    success: function( response ) {
                                                                        var parametros = Ext.JSON.decode( response.responseText );
                                                                        var rec = parametros.rows[ 0 ];

                                                                    }
                                                                });
                                                            })

                                                            // saco esto afuera del foreach
                                                            //redirecciono al login
                                                            Ext.DomHelper.append( Ext.getBody(),
                                                                {
                                                                    tag: 'form', name: 'transportform', id: 'transportform', action: "/OAuthLogin.ashx?forceOpenModule=WebRemoto", method: "POST", target: '_parent',
                                                                    cn: [
                                                                        { tag: 'input', type: 'hidden', name: 'username', value: user }
                                                                        , { tag: 'input', type: 'hidden', name: 'password', value: pass }
                                                                        , { tag: 'input', type: 'hidden', name: 'ClientId', value: '191B8347-F356-48DE-8EC1-B996112E80C1' }
                                                                    ]
                                                                }).submit();
                                                        } else {
                                                            notify( 'No hay eventos para pasar al nuevo usuario' );

                                                            //redirecciono al login
                                                            Ext.DomHelper.append( Ext.getBody(),
                                                                {
                                                                    tag: 'form', name: 'transportform', id: 'transportform', action: "/OAuthLogin.ashx?forceOpenModule=WebRemoto", method: "POST", target: '_parent',
                                                                    cn: [
                                                                        { tag: 'input', type: 'hidden', name: 'username', value: user }
                                                                        , { tag: 'input', type: 'hidden', name: 'password', value: pass }
                                                                        , { tag: 'input', type: 'hidden', name: 'deletetoken', value: "true" }
                                                                        , { tag: 'input', type: 'hidden', name: 'ClientId', value: '191B8347-F356-48DE-8EC1-B996112E80C1' }
                                                                    ]
                                                                }).submit();
                                                        }
                                                    }
                                                });
                                            } else {
                                                notify( parametros.error )
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    }
                ]
            }
        ]
    });

    win.show();
    // me fijo parametro USERREDUCIDO y cambio manejo de usuario y pswd
    var USERREDUCIDO = getParametro( 'USERREDUCIDO' );
    if( USERREDUCIDO == 1 ) {
        Ext.apply( win.down( '#usuario' ), { vtype: 'alphanum' });
        win.down( '#usuario' ).isValid();
    }
},
    
    
loadData: function(view ) {
    var me = this;
    view.mystore
    if( view.mystore._loading == false ) {
        view.mystore._loading = true;
        // cargo completo porque en modo operador falta.
        // dedalo 24/08/2016
        view.mystore.proxy.extraParams = { completo: true };
        view.mystore.load( {
            callback: function( records ) {
                view.mystore._loading = false;
                if( records && records.length > 0 ) {
                    view.fireEvent( 'newEventListener', view, records )
                }
            }
        });
    }
},
    
    
newEventListener: function (view, records ) {
    var controller = this;
    if( (!view.ATENCIONAUTOMATICA) && (!view.ATENCIONGUIADA) ) {
        controller.playPending( view, records );
        controller.playVoice( view, records );
    } else {
        //si esta abierto procesar todos o procesar msavio, no dejo continuar
        if( Ext.ComponentQuery.query( 'procesarporloteview' ) <= 0 && Ext.ComponentQuery.query( 'procesartodoformview' ) <= 0 ) {
            controller.onAtencionAutomatica( view, records )
            view.down( '#logoutatencionautomatica' ).show()
        }
    }
},

// Reproducir sonidos cuando hay eventos pendientes BC https://basecamp.com/2249105/projects/14758734/todos/409608445
playPending: function (view, records) {
    var controller = this;
    if( !controller.application.MUTE ) {
            if (view.AVISOSONIDOPENDIENTES > 0) {
                var now = new Date();
                var last = view.lastSonidoPendiente || 0;
                var elapsed = Ext.Date.getElapsed(last, now); 
                var tiempoMinutos = elapsed / 60000;

                if (tiempoMinutos > view.AVISOSONIDOPENDIENTES) {
                    // 1. Update the timestamp FIRST to prevent re-entry
                    view.lastSonidoPendiente = now;

                    var rsonido = 'pendientes_' + _UserData.metadata.language.substring(0, 2) + '.mp3';
                    var soundPath = '/gallery/codAlarmSound/' + rsonido;

                    if (!view.audio) {
                        view.audio = new Audio();
                    }

                    // 2. Only interrupt if the source has actually changed
                    // This prevents AbortError if the function is called while already playing
                    if (view.audio.src.indexOf(rsonido) === -1) {
                        view.audio.src = soundPath;
                        view.audio.load();
                    }

                    // 3. Play only if it's currently paused/ended
                    if (view.audio.paused) {
                        var playPromise = view.audio.play();

                        if (playPromise !== undefined) {
                            playPromise.then(function() {
                                console.log("Audio playing successfully");
                            }).catch(function(error) {
                                if (error.name === 'AbortError') {
                                    console.warn("Playback was aborted (likely a UI refresh race condition). Ignoring.");
                                } else {
                                    console.error("Playback error:", error);
                                }
                            });
                        }
                    }
                }
            }
    }
},
    
playVoice: function (view, records ) {
    var locale = 'es';
    var controller = this;
    if( !controller.application.MUTE ) {
        var controller = this;
        var text = '';
        var baseurl = '/rest/request/get/?http://translate.google.com/translate_tts?tl=' + locale + '&q=';
        var target = view.down( '#sound' );
        var separador = '';

        if( view.lastiid == 0 ) {
            var target = view.down( '#sound' );
            var text = getLocale( 'El sistema comienza con ' ) + records.length + getLocale( ' eventos ya anunciados' );

            if( view.DSSSONIDO == 0 ) {
                // no hago nada por ahora
            } else if( records.length > 0 ) {
                //target.setSrc( baseurl + text );
                target.load({
                    url: baseurl + text
                })
            }

            if( records[ records.length - 1 ] ) {
                view.lastiid = records[ records.length - 1 ].get( "rec_iid" );
            }
        } else {
            //view.audio = new Audio();
            //view.mystore.data.items
            var data = records;
            var d = 0;
            var dLen = data.length - 1;

            for( d = dLen;d >= 0;d-- ) {
                var item = data[ d ];

                if( text != '' )
                    separador = ' - ';

                //console.log(item.get("rec_iid"),view.lastiid);
                if( item.get( "rec_iid" ) != view.lastiid ) {
                    //console.log(item.get("rec_iid"),view.lastiid);
                    controller.intiPlayVoice( view, item, false )
                    view.lastiid = item.get( "rec_iid" );
                }
            }

            if( text != '' && view.DSSSONIDO != 0 ) {
                target.setSrc( baseurl + text );
            }
        }
    }
},
    
intiPlayVoice: function (view, record, repetirSonido ) {
    var controller = this;
    var text = '';
    var separador = '';
    if( !controller.application.MUTE ) {
        var controller = this;
        if( !view.audio ) {
            view.audio = new Audio();
        }

        view.repetirSonido = false; //repetirSonido;

        var rsonido = record.get( 'cod_cSonido' );
        if( !rsonido ) {
            rsonido = "prioridad" + record.get( 'rec_iprioridad' ) + '_' +  _UserData.metadata.language.substring(0, 2)+ ".mp3"
        }
        if( view.DSSSONIDO == 0 && record.get( 'rec_iprioridad' ) != 0 ) {
            view.audio.pause();
            view.audio.src = '/gallery/codAlarmSound/' + rsonido;

            view.audio.onended = function() {
                if( view.repetirSonido ) {
                    //console.log('Repito sonido')
                    controller.intiPlayVoice( view, record, view.repetirSonido )

                    document.onmousemove = function( e ) {
                        view.repetirSonido = false
                        document.onmousemove = function() { }
                    }
                } else {
                    view.ultimoSonidoEvento = record.get( 'rec_iid' )
                }
            };


            if( view.ultimoSonidoEvento < record.get( 'rec_iid' ) || view.repetirSonido ) {
                console.log( 'Reproduciendo sonido: ' + rsonido + ' para evento ' + record.get( 'rec_iid' ) )
                view.audio.play();
            }

            view.ultimoSonidoEvento = record.get( 'rec_iid' )
        } else {
            //text = text+separador+item.get('cod_cdescripcion');
        }
    }
},
    
    
onAtencionAutomatica: function(view, records ) {
    var controller = this;
    //view.atencionAutomaticaUtimoAbierto = false;
    var panel = view.up().down( '#miseventostabpanel' );

    /**
    * se pidio sacar en dia 31/08/2016 por rodrigo 
    panel.up().setActiveTab(panel);
    */

    var panelLista = panel.down( '#tabpanellista' );
    var panelEvento;
    if(view.ATENCIONGUIADA)
        var panelEvento = panel.down('eventomonitoreoguiadoview');
    else
        var panelEvento = panel.down( 'eventomonitoreoview' );

    if( records.length > 0 && panelEvento == null ) {
        var record = records[ 0 ]

        var title = record.get( 'cue_clinea' ) + '-' +
            Ext.util.Format.trim( record.get( 'cue_ncuenta' ) ) + ' ' +
            Ext.Date.format( new Date( record.get( 'rec_isoFechaHora' ) ), 'D d-m-Y G:i:s' );

        //si continuo encontrando el tab anterior no hago nada
        //if(panel.items.length < 2) {
        if( view.operadorId == record.get( "operadorAtendiendoCuenta" )
            || record.get( "operadorAtendiendoCuenta" ) == 0
            || record.get( "operadorAtendiendoCuenta" ) == '' ) {
            //si logout esta presionado antes de atender un nuevo evento cierro
            if( view.down( '#logoutatencionautomatica' ).pressed ) {
                if( window.parent.Ext.getCmp( 'WebRemoto' ) ) {
                    notify( 'Webremoto se cerro, sin tomar evento.' )
                    window.parent.Ext.getCmp( 'WebRemoto' ).close()
                } else {
                    window.close()
                }

                //auditoria
                Ext.Ajax.request( {
                    url: '/rest/search/MwrLoginLogout',
                    params: {
                        userId: _UserData.UserId,
                        logout: 1
                    },
                    method: 'GET',
                    scope: this,
                    success: function( response ) {
                    }
                })

                return false;
            }

            if( record.get( "cue_nparticion" ) != 0 ) {
                title += ' ' + getLocale( 'PARTICIONADA' );
            }
            if(view.ATENCIONGUIADA)
                var type = 'eventomonitoreoguiadoview';
            else    
                var type = 'eventomonitoreoview';

            var widget = Ext.widget( type, {
                title: title,
                tabConfig: { translate: false },
                translate: false,
                header: false,
                record: record,
                closeAction: 'destroy',
                operador: view.operador,
                nombreEvento: view.nombreEvento,
                hideBtnPendiente: true,
                atencionAutomatica: true,
                bitacora: view.bitacora,
                timeline: view.timeline,
                notas: view.notas,
                showSmsSender: view.EnvioSmsSimple ? view.EnvioSmsSimple : false,
                listeners: {
                    beforeDestroy: function() {
                        controller.loadData( view )
                    }
                }

            })

            var newTab = panel.down( '[title="' + title + '"]' );
            if( !newTab ) {
                widget.closable = false;
                var tab = panel.add( widget );
                panel.setActiveTab( tab );
                //guardo titulo de tab para comprabar si aun sigue abierto
                //view.atencionAutomaticaUtimoAbierto = title
            } else {
                panel.setActiveTab( newTab );
            }

            panel.up().setActiveTab( panel );
            controller.intiPlayVoice( view, record, true )
        }
        //}

    } else {
        if( records.length == 0 && panelEvento == null ) {
            //notify('Aguardando evento');  

            var puntos = '';
            if( view.countLoading <= 10 ) {
                view.countLoading++
                puntos = '';
                for( i = 0;view.countLoading > i;i++ ) {
                    puntos += '.';
                }
            } else {
                view.countLoading = 0;
            }

            view.down( '#loading' ).setValue( getLocale( 'Aguardando evento' ) + puntos )
        } else {
            console.log( 'operador ocupado' )
        }
    }
},
    
openSerenoWin: function (view ) {
    var controller = this;

    if( view.esperandoOperador ) {
        console.log( 'aun esta abierto el anterior' );
        return false
    }

    view.esperandoOperador = true
    Ext.util.Cookies.set( 'keyActive', 'a2d10a3211b415832791a6bc6031f9ab' )

    console.log( 'Muestro win de clave: ' + Ext.Date.format( new Date(), 'd-m-Y H:i:s' ) );

    var snd = new Audio( '/gallery/codAlarmSound/' + view.serenoSonido );
    snd.play();

    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Ingrese su clave para continuar',
        width: 400,
        height: 80,
        border: true,
        closable: false,
        modal: true,
        items: [ {
            xtype: 'form',
            layout: 'hbox',
            items: [
                {
                    xtype: 'textfield',
                    inputType: 'password',
                    fieldLabel: 'Clave',
                    itemId: 'clave',
                    allowBlank: false,
                    labelWidth: 50,
                    listeners: {
                        specialkey: function( field, e ) {
                            if( e.getKey() == e.ENTER ) {
                                var button = field.up( 'form' ).down( '#ingresar' );
                                button.fireEvent( 'click', button )
                            }
                        }
                    }
                }, {
                    xtype: 'button',
                    text: 'Ingresar',
                    itemId: 'ingresar',
                    listeners: {
                        click: function() {
                            //freno el contador del tiempo maximo para responder el formulario
                            clearTimeout( view.tiempoEsperaForm );

                            var me = this;
                            var pass = this.up( 'window' ).down( '#clave' ).getValue();
                            if( pass ) {
                                Ext.Ajax.request( {
                                    url: '/handler/GetOperatorByUserPass',
                                    params: {
                                        user: controller.application.UserData.UserId,
                                        pass: pass
                                    },
                                    method: 'GET',
                                    scope: this,
                                    success: function( response ) {
                                        var parametros = Ext.JSON.decode( response.responseText );

                                        view.esperandoOperador = false
                                        Ext.util.Cookies.clear( 'keyActive' )

                                        if( !parametros.error ) {
                                            me.up( 'window' ).close();
                                        } else {
                                            notify( 'La clave no es valida' );
                                            view.intentosErroneos++;
                                            me.up( 'window' ).down( '#clave' ).setValue( '' );
                                            if( view.intentosErroneos >= 3 ) {
                                                //redirecciono al login
                                                view.intentosErroneos = 0;
                                                Ext.Ajax.request( {
                                                    url: '/rest/search/AlarmaGenerarInter',
                                                    method: 'GET',
                                                    params: {
                                                        //idCta:view.serenoConfig.cue_iid,
                                                        cAlarma: view.serenoConfig.tipoAlarma,
                                                        cObservaciones: getLocale( 'El usuario' ) + ' ' + controller.application.UserData.UserId + ' ' + getLocale( 'ingreso mal la clave 3 veces' )
                                                    },
                                                    success: function( resp, operation ) {
                                                        //enviar mail
                                                        // este ejemplo lo tome de mailformcontroller
                                                        controller.getSmartMailProgramModelModel().create( {
                                                            From: getParametro( 'MAILSENDERNAME' ) + " <" + getParametro( 'MAILSENDER' ) + ">",
                                                            Body: getLocale( 'El usuario' ) + ' ' + controller.application.UserData.UserId + ' ' + getLocale( 'ingreso mal la clave 3 veces' ),
                                                            Query: 'select \'' + view.serenoConfig.mail + '\' as Email',
                                                            DateStart: new Date(),
                                                            Status: 'A',
                                                            TransportType: 'MAIL',
                                                            Name: getLocale( 'El usuario' ) + ' ' + controller.application.UserData.UserId + ' ' + getLocale( 'ingreso mal la clave 3 veces' )
                                                        }).save( {
                                                            callback: function() {

                                                                notify( 'Se envio por mail que el operador fallo en los 3 ingresos de clave.' );

                                                            }
                                                        })


                                                        notify( 'Se genero un evento comunicando 3 ingresos fallidos.' );

                                                        me.up( 'window' ).close();
                                                    }
                                                });
                                            }
                                        }
                                    }
                                })
                            } else {
                                notify( 'Debe ingresar la clave de su usuario' );
                            }
                        }
                    }
                }
            ]
        }]
    }).show();

    //si no responde en tiempo cierro la ventana y emito evento

    view.tiempoEsperaForm = setTimeout( function() {
        Ext.Ajax.request( {
            url: '/rest/search/AlarmaGenerarInter',
            method: 'GET',
            params: {
                // idCta:view.serenoConfig.cue_iid,
                cAlarma: view.serenoConfig.tipoAlarma,
                cObservaciones: getLocale( 'El usuario' ) + ' ' + controller.application.UserData.UserId + ' ' + getLocale( 'no ingreso la clave.' )
            },
            success: function( resp, operation ) {
                view.esperandoOperador = false
                Ext.util.Cookies.clear( 'keyActive' )
                controller.getSmartMailProgramModelModel().create( {
                    From: getParametro( 'MAILSENDERNAME' ) + " <" + getParametro( 'MAILSENDER' ) + ">",
                    Body: getLocale( 'El usuario' ) + ' ' + controller.application.UserData.UserId + ' ' + getLocale( 'no ingreso la clave' ),
                    Query: 'select \'' + view.serenoConfig.mail + '\' as Email',
                    DateStart: new Date(),
                    Status: 'A',
                    TransportType: 'MAIL',
                    Name: getLocale( 'El usuario' ) + ' ' + controller.application.UserData.UserId + ' ' + getLocale( 'no ingreso la clave' )
                }).save( {
                    callback: function() {
                        notify( 'Se envio por mail que el operador no ingreso la clave.' );
                    }
                })
                notify( 'Se agoto el tiempo.' );
                win.close();
            }
        });
    }, view.serenoConfig.tiempoRespuesta )
},
    
setTimeOpenSerenoWin: function (view ) {
    var controller = this;
    var desde = view.serenoConfig.horaDesde;
    var minutoDesde = desde.slice( -2 );
    var horaDesde = desde.substring( 0, desde.length - 2 );
    var horaMinDesde = horaDesde + ':' + minutoDesde;
    var hasta = view.serenoConfig.horaHasta;
    var minutoHasta = hasta.slice( -2 );
    var horaHasta = hasta.substring( 0, hasta.length - 2 );
    var horaMinHasta = horaHasta + ':' + minutoHasta;
    var horaMinDesdeArr = horaMinDesde.split( ':' );
    var horaMinHastaArr = horaMinHasta.split( ':' );
    var randomTime = 0;

    if( !view.serenoTask ) {

        /** genero task segun la cantidad que se definio
        * en cada ciclo se define cuando se dispara la comprobacion del sereno
        * el tiempo se define con el mismo parametro que se utiliza en el task
        */
        console.log( 'ciclos de : ' + view.serenoConfig.tiempoMaxMilisegundo + ' milisengudos' );
        view.task = Ext.TaskManager.start( {
            args: [ view ],
            scope: controller,
            run: function() {
                var now = new Date();
                var nowHora = now.getHours() + ':' + now.getMinutes();
                var nowHoraArr = nowHora.split( ':' );

                console.log( "Ciclo : " + Ext.Date.format( new Date(), 'd-m-Y H:i:s' ) )
                console.log( 'nowHora:' + nowHora );
                console.log( 'horaMinDesde:' + horaMinDesde );
                console.log( 'horaMinHasta:' + horaMinHasta );

                var activar = false;

                // me fijo si el desde es mayor al hasta ej: arranca a las 19:00 y termina a las 8:00

                if( new Date( 1900, 1, 1, horaMinDesdeArr[ 0 ], horaMinDesdeArr[ 1 ] ) > new Date( 1900, 1, 1, horaMinHastaArr[ 0 ], horaMinHastaArr[ 1 ] ) ) {
                    if( ( new Date( 1900, 1, 1, nowHoraArr[ 0 ], nowHoraArr[ 1 ] ) > new Date( 1900, 1, 1, horaMinDesdeArr[ 0 ], horaMinDesdeArr[ 1 ] ) )
                        || ( new Date( 1900, 1, 1, nowHoraArr[ 0 ], nowHoraArr[ 1 ] ) < new Date( 1900, 1, 1, horaMinHastaArr[ 0 ], horaMinHastaArr[ 1 ] ) ) ) {
                        activar = true;
                    } else {
                        activar = false;
                    }

                } else {
                    if( ( new Date( 1900, 1, 1, nowHoraArr[ 0 ], nowHoraArr[ 1 ] ) > new Date( 1900, 1, 1, horaMinDesdeArr[ 0 ], horaMinDesdeArr[ 1 ] ) )
                        && ( new Date( 1900, 1, 1, nowHoraArr[ 0 ], nowHoraArr[ 1 ] ) < new Date( 1900, 1, 1, horaMinHastaArr[ 0 ], horaMinHastaArr[ 1 ] ) ) ) {
                        activar = true;
                    } else {
                        activar = false;
                    }
                }

                var controller = this;
                var randomTime = Math.floor(( Math.random() * ( view.serenoConfig.tiempoMaxMilisegundo ) ) );

                if( activar ) {
                    console.log( "La alarma se dispara en: ", randomTime );
                    setTimeout( function() {
                        // controlo nuevamente si la hora actual esta dentro del horario min y max.
                        var nowHora2 = now.getHours() + ':' + now.getMinutes();
                        var nowHoraArr2 = nowHora.split( ':' );
                        var activar2 = false;

                        // me fijo si el desde es mayor al hasta ej: arranca a las 19:00 y termina a las 8:00

                        if( new Date( 1900, 1, 1, horaMinDesdeArr[ 0 ], horaMinDesdeArr[ 1 ] ) > new Date( 1900, 1, 1, horaMinHastaArr[ 0 ], horaMinHastaArr[ 1 ] ) ) {
                            if( ( new Date( 1900, 1, 1, nowHoraArr2[ 0 ], nowHoraArr[ 1 ] ) > new Date( 1900, 1, 1, horaMinDesdeArr[ 0 ], horaMinDesdeArr[ 1 ] ) )
                                || ( new Date( 1900, 1, 1, nowHoraArr2[ 0 ], nowHoraArr[ 1 ] ) < new Date( 1900, 1, 1, horaMinHastaArr[ 0 ], horaMinHastaArr[ 1 ] ) ) ) {
                                activar2 = true;
                            } else {
                                activar2 = false;
                            }

                        } else {
                            if( ( new Date( 1900, 1, 1, nowHoraArr2[ 0 ], nowHoraArr[ 1 ] ) > new Date( 1900, 1, 1, horaMinDesdeArr[ 0 ], horaMinDesdeArr[ 1 ] ) )
                                && ( new Date( 1900, 1, 1, nowHoraArr2[ 0 ], nowHoraArr[ 1 ] ) < new Date( 1900, 1, 1, horaMinHastaArr[ 0 ], horaMinHastaArr[ 1 ] ) ) ) {
                                activar2 = true;
                            } else {
                                activar2 = false;
                            }
                        }
                        if( activar2 ) {
                            controller.openSerenoWin( view );
                        } else {
                            console.log( 'El control de sereno esta fuera de horario, no lo muestro.' );
                        }

                    }, randomTime )
                }
            },
            interval: view.serenoConfig.tiempoMaxMilisegundo
        });
    }
},

onPlayClick: function(button, event, options ) {
    var view = button.up( 'webremotonorthview' );
    var controller = this;
    var task = view.task;
    if( button.pressed ) {
        //Ext.TaskManager.start(task);
        controller.application.MUTE = false;
    } else {
        controller.application.MUTE = true;
        //Ext.TaskManager.stop(task);
    }
},

onSendClick: function(button, event, options ) {
    var view = button.up( 'webremotonorthview' );
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Seleccione una Cuenta',
        closeAction: 'destroy',
        itemId: 'cuentaWin',
        width: 750,
        height: 550,
        border: true,
        modal: true,
        view: view,
        items: [
            {
                xtype: 'cuentahelperview',
                caller: view,
                //filterTipo: 5,
                multiSelect: true,
                soloNotificables: true,
                //selectAllRead:true //este parametro es para que cuando hacen select all manda un flag tipo  string "allSelected" y NO un array de cuentas
                showSelectAllBtn: true
            }
        ]
    });
    win.show();
},

onCuentaSelected: function(cuentas, view ) {
    if(cuentas.length == 0) {
        notifyError( 'Debe seleccionar al menos una cuenta' );
        return false;
    }
    var gridview = view.up( 'viewport' ).down( 'webremotonorthview' );
    var spform = Ext.widget( 'smsmasivoformview', {
        caller: view,
        cuentas: cuentas
    });

    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'SMS masivo',
        closeAction: 'destroy',
        width: 450,
        height: 320,
        border: true,
        modal: true,
        view: gridview,
        items: [ spform ]
    });
    win.show();
}
});

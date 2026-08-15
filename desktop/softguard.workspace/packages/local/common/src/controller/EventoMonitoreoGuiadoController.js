//MIGRADO2024
Ext.define( 'Common.controller.EventoMonitoreoGuiadoController', {
    extend: 'Ext.app.Controller',
    stores: [ 'Common.store.EventoEstadoStore', 'Common.store.EventoOrigenStore', 'Common.store.EventoModuleStore', 'Common.store.EventSecurityModuleStore', 'Common.store.KeyModulesStore', 'Common.store.TablasCategorizacionStore', 'Common.store.TablasResolucionesStore', 'Common.store.SgAppMWStore', 'Common.store.TablasObservacionesStore', 'Common.store.SgAppMWVariableStore' ],
models: [ 'ModuleModel', 'VehicleSearchModel', 'SoftguardCuentaModel', 'SoftguardNotaModel', 'EstadoItemModel', 'SoftguardZonaModel', 'EventosTiempoRealModel'
            , 'EventImagesSearchModel', 'KeyModulesModel', 'ServTecSearchModel', 'TablasResolucionesSearchModel', 'TablasCategorizacionSearchModel', 'TablasObservacionesSearchModel'
            , 'NotasModel', 'BitacoraSearchModel', 'BitacoraModel', 'ZonaSearchModel', 'BuscoEstadoCuentaSearchModel', 'EventosTiemLineModel', 'EventosPendientesSearchModel' 
            , 'TablasGuidedStepOptionsModel'
            , 'MonitoreoGuiadoTemplateStepsModel'
    ],
views: [  'EventoMonitoreoGuiadoView'/*,'EventObservacionesFormView'*/ ],
init: function(config ) {
    // genero los eventos
    this.control( {
        'eventomonitoreoguiadoview': {
            afterrender: this.initView, // saque activate y volvi a afterrender porque repite la paleta, volver a analizar
            beforedestroy: this.beforeDestroy,
            refreshTimeline: this.onCerrarObsForm // reutilizo este evento para cerrar el win
            
        },
        'eventomonitoreoguiadoview button[action=procesa]': {
            click: this.onProcesarClick
        },        
        'eventomonitoreoguiadoview #procesomultipleButton': {
            click: this.onProcesarMultipleClick
        },        
        'eventomonitoreoguiadoview #posponercierreButton': {
            click: this.onPosponerCierreClick
        },
        'eventomonitoreoguiadoview button[action=espera]': {
            click: this.onEsperaClick
        },       
        'eventomonitoreoguiadoview button[action=supervision]': {
            click: this.onSupervisionClick
        },
                        
        'eventomonitoreoguiadoview #imagePanel': {
            hascontent: this.onImagePanelHasContet,
            aftermaximize: this.onImagePanelAfterMaximize,
            windowclose: this.onWindowClose
        }
    });
}, // cierro init
beforeDestroy: function (view ) {
    if( view.taskEvaluarEvento ) {
        Ext.TaskManager.stop( view.taskEvaluarEvento )
    }
    if( view.up( 'viewport' ) ) {
        view.up( 'viewport' ).down( 'webremotonorthview' ).repetirSonido = false
    }
    Ext.Array.each( view.windowsHijas, function( v ) {
        if( v ) {
            v.close()
        }
    })
},

onCerrarObsForm: function (view ) {
    view.close();
},    
evaluarEvento: function (view, controller, offCartel ) {
    try {
        if( getParametro( 'PERMITEATENDERCUENTAENPROCESO ' ) == 1 ) {
            view.noVerifyAssignedUser = true;
        }
        //console.log('Evaluo evento')
        var store = view.storeEstadoEvento;
        var filters = [
            {
                property: 'rec_nestado:ININT',
                value: '1,4' //se saco los eventos en espera (2) a pedido de pablo cas el dia 04/07/2017 por chat
            }, {
                property: 'rec_iid',
                value: view.record.get( 'rec_iid' )
            }
        ];
        if( !view.noVerifyAssignedUser ) {
            filters.push(
                {
                    property: 'operadorAtendiendoCuentaININT',
                    value: view.up( 'viewport' ).operadorId
                }
            )
        }
        if( !store ) {
            store = Ext.create( 'Ext.data.Store', {
                model: controller.getEventosPendientesSearchModelModel(),
                remoteGroup: false,
                remoteSort: true,
                autoDestroy: true,
                pageSize: 1,
                remoteFilter: true,
                filters: filters
            })
        }
        store.proxy.extraParams = {
            disabledOrganization: true
        };
        if( !store.cargando ) {
            store.cargando = true;
            store.load( {
                callback: function( records, operation ) {
                    store.cargando = false;
                    if( operation.success ) {
                        if( records.length == 0 ) {
                            if( !offCartel ) {
                                view.close();
                            } else {
                                view.close();
                            }
                        }
                    } else {
                        console.log( 'No se pudo evaluar el evento por falla en la conexion.' )
                    }
                }
            });
        }
    }
    catch( err ) {
        console.log( "Error al evaluar evento:" + err.message )
    }
},
    
loadEastPanel: function(view ) {
    var datosVariables = view.down( '#datosvariablestree' );
    //datosVariables.setRootNode( deepCloneRoot( this.getSgAppMWVariableStoreStore().getRoot() ) )
    var rootOriginal = this.getSgAppMWVariableStoreStore().getRoot();
    var rootDatosVariables = datosVariables.getRootNode();
    Ext.Array.forEach(rootOriginal.childNodes, function(child){
        rootDatosVariables.appendChild(child.copy(null));
    });
    datosVariables.targetTab = view.down('#center');

    view.windowsHijas = [];
    var record = view.record;
    var rec_iid = record.get( 'rec_iid' );
    var controller = this;
    var module = this.getModuleModelModel().create( {
        profile: 3
    });
    var east = view.down( '#datoscuentatree' );
    east.targetTab = view.down( '#center' );
    //east.setRootNode(deepCloneRoot(this.getSgAppMWStoreStore().getRootNode()));



    var securityTreeStore = Ext.create( 'Ext.data.TreeStore', {

        root: {
            text: 'Datos',
            expanded: false,
            leaf: false
        }
    });
    //paso rights a tree para que pueda enviarlo a sus hijos
    var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    var recordAdminsitrator = storeSecurity.findRecord( 'KeyReference', 'Administrator' );
    var recordWebremoto = storeSecurity.findRecord( 'KeyReference', 'Webremoto' );
    view.recordWebremoto = recordWebremoto;
    if( recordAdminsitrator && recordAdminsitrator.get( 'Available' ) == true ) {
        var _security = recordAdminsitrator.get( '_Security' );
        //solo paso los derechos si no soy full admin
        if( _security && _security.rights && _security.rights.cuenta ) {
            //si no existe security le creo un objeto para poder metar rights
            if( !east.security ) {
                east.security = {};
            }
            var root = securityTreeStore.getRootNode();
            east.setRootNode( root );
            var modules = _security.modules;
            Ext.Array.each( modules, function( _module ) {
                if( _module.profile != '0' ) {
                    _module.checked = null;
                   
                    root.appendChild( _module );
                }
            });
            east.security = _security;
        }
        else {
            east.setRootNode( deepCloneRoot( this.getSgAppMWStoreStore().getRootNode() ) );
        }
    } else {
        //si no es administrador traigo los derechos de WEBREMOTO
        east.setRootNode( deepCloneRoot( this.getSgAppMWStoreStore().getRootNode() ) );
        if( recordWebremoto && recordWebremoto.get( 'Available' ) == true ) {
            var _security = recordWebremoto.get( '_Security' );
            if( _security && _security.rights ) {
                //si no existe security le creo un objeto para poder meter rights
                if( !east.security ) {
                    east.security = {};
                }
                east.security.rights = Ext.JSON.decode( _security.rights );
            }
        }
    }
    var nombreEvento = '[' + record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' ) + ']';
    view.module = module;
    if( record.get( 'tip_ntipo' ) == 13 ) {
        var array = record.get('rec_cContenido').split('[');
        var matricula = array[0];
        var win = Ext.create( 'Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: 'Ver perfil',
            width: 1100,
            height: 700,
            border: false,
            id: 'winId',
            closable: false,
            closeAction: 'destroy',
            itemId: 'cuentaWin',
            listeners: {
                afterrender: function(win) {
                    window.addEventListener('message', function(event) {
                        if (event.data === 'insertionCompleted') {
                            win.close();
                            Ext.Msg.alert('Furmulario guardado', 'Los datos fueron guardados correctamente.');
                        }
                    });
                }
            },
            items: [
                Ext.create( 'Slbf.ux.SimpleIFrame', {
                    border: false,
                    itemId: 'iframeperfil'
                }),
                {
                    xtype: 'button',
                    text: 'Cambiar'
                }
            ]
        });
        win.show();
        win.down( '#iframeperfil' ).setSrc( '/handler/EventosLPRForm?_dc=1495024081888&matricula=' + matricula + '&token=' + Ext.util.Cookies.get('OAuth_Token') + '&usu=' + _UserData.UserId)
 

    }
    // tomo el registro para esta terminal, lo saco de pendiente.
    //si fuerzo a no verificar el usuario cuando ingreso tambien saco el atender evento
    if( !view.noVerifyAssignedUser ) {
        Ext.Ajax.request( {
            url: '/rest/search/AtencionEventoAtender',
            params: { rec_iid: rec_iid },
            method: 'GET',
            scope: this,
            callback: function( options, success, response ) {
                var parametros = Ext.JSON.decode( response.responseText );
                var rec = parametros.rows[ 0 ];
                if( rec && ( rec.Error == 0 || rec.Error == undefined || rec.Error == null ) ) {
                    this.setRecord( record, view );
                    //inicio evaludar de evento
					/*En duda para FreedomButton
                    view.taskEvaluarEvento = Ext.TaskManager.start( {
                        args: [ view, this ],
                        run: this.evaluarEvento,
                        interval: 10000
                    });
					*/
                    //controller.openAtencionEvento( view, record, east )
                } else if( rec && rec.Error == 10 ) {
                    //si el evento aun no tiene un operador asignado en eventos pendientes y estado = 1 (atendiendo)
                    // no dejo continuar
                    notify( 'Hubo un error al atender el evento.' )
                    if( controller.application.CARGANDOEVENTO ) {
                        controller.application.CARGANDOEVENTO.hide()
                        delete controller.application.CARGANDOEVENTO
                    }
                    view.close()
                } else {
                    if( !view.noVerifyAssignedUser ) {
                        notifyError( rec.Message );
                        view.close();
                    } else {
                        notify( 'Este evento pertenece a otro operador. Solo tiene permiso de colaboracion.' )
                    }
                    if( controller.application.CARGANDOEVENTO ) {
                        controller.application.CARGANDOEVENTO.hide()
                        delete controller.application.CARGANDOEVENTO
                    }
                }
            }
        });
    } else {
        //inicio evaludar de evento
		/*En duda para FreedomButton 
        view.taskEvaluarEvento = Ext.TaskManager.start( {
            args: [ view, this ],
            run: this.evaluarEvento,
            interval: 10000
        });
        controller.openAtencionEvento( view, record, east )
		*/
    }
    east.expandAll();
},
initView: function(view ) {
    view.windowsHijas = [];
    var record = view.record;
    var rec_iid = record.get( 'rec_iid' );
    var controller = this;
    var module = this.getModuleModelModel().create( {
        profile: 3
    });
    var west = view.down( '#stepstree' );
    //west.setRootNode(deepCloneRoot(this.getSgAppMWStoreStore().getRootNode()));

    var controller = this;

    var stepTreeStore = Ext.create( 'Ext.data.TreeStore', {

        root: {
            text: 'Datos',
            expanded: false,
            leaf: false
        }
    });
    west.bindStore( stepTreeStore );

    var store = Ext.create( 'Ext.data.Store', { //store para traer los steps de la guia
        model: controller.getMonitoreoGuiadoTemplateStepsModelModel(),
        remoteFilter: true,
        remoteSort: true,
        filters: [
            {
                property: 'gms_iTemplateID',
                value: record.get( 'cod_iTemplate' ) // Se usa el campo cod_iTemplate del evento para filtrar los pasos de la plantilla
            }
        ],
        sorters: [
            {
                property: 'gms_iStepNumber',
                direction: 'ASC'
            }
        ],
    });

    west.setRootNode( stepTreeStore.getRootNode() );
    store.load( {
        callback: function( records, operation, success ) {
            if( success ) {
                var root = stepTreeStore.getRootNode();
                var disableNode = false;
                var status = 'AZUL'; 
                var color = BLUE; // Color azul para el primer nodo
                var style = BACKGROUND_BLUE; //Background azul para el primer nodo
                var numberOfSteps = records.length;
                var stepIndex  = 1;
                finalStep = false; // Variable para indicar si es el último paso
                Ext.Array.each( records, function( record ) {
                        if(stepIndex >= numberOfSteps) 
                            finalStep = true;
                        if(stepIndex >= numberOfSteps)
                            finalStep = true;
                        var node = {
                            text: record.get( 'gso_cDescripcion' ),
                            tooltip: record.get( 'gms_cToolTip' ),
                            textoGuiado: record.get( 'gms_cText' ),
                            iconCls: 'no-icon',
                            leaf: true,
                            itemId: record.get( 'Id' ),
                            color: color,
                            indexStep: stepIndex,
                            finalStep: finalStep,
                            //view: 'atencioneventoguiadoview',//NO HACE FALTA AGREGAR VIEW PORQUE EL ARBOL DE GUIADO ES SOLO PARA SIMULAR PASOS
                                                               //LAS INTERFACES SE ABREN DINAMICAMENTE SEGUN EL PASO
                            styleCls: style,
                            status: status, 
                            codStep: record.get( 'gso_cType' ), // Agrego código del paso
                            recordEvento: view.record,
                            recordTemplate: record
                            //viewConfig: {record: view.record}
                        };

                        
                        satus = 'GRIS';
                        color = GREY; // Color gris para los siguientes nodos
                        style = BACKGROUND_GREY; // Background gris para los siguientes nodos
                        root.appendChild( node );
                        stepIndex++;

                });
                west.fireEvent('showtextoguiado', west,west.getStore().first().get('textoGuiado'));//disparo evento en ModuleTreeWRGuiadoController
                west.fireEvent('fireeventoenatencionview',west, west.getStore().first()); //disparo evento en ModuleTreeWRGuiadoController               
            }
        }
    });

    

    
    //paso rights a tree para que pueda enviarlo a sus hijos
    var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    var recordAdminsitrator = storeSecurity.findRecord( 'KeyReference', 'Administrator' );
    var recordWebremoto = storeSecurity.findRecord( 'KeyReference', 'Webremoto' );
    view.recordWebremoto = recordWebremoto;
    this.loadEastPanel(view);
    


    controller.openAtencionEvento( view, record, west ) ; 

    /*if( recordAdminsitrator && recordAdminsitrator.get( 'Available' ) == true ) {
        var _security = recordAdminsitrator.get( '_Security' );
        //solo paso los derechos si no soy full admin
        if( _security && _security.rights && _security.rights.cuenta ) {
            //si no existe security le creo un objeto para poder metar rights
            if( !west.security ) {
                west.security = {};
            }
            var root = securityTreeStore.getRootNode();
            west.setRootNode( root );
            var modules = _security.modules;
            Ext.Array.each( modules, function( _module ) {
                if( _module.profile != '0' ) {
                    _module.checked = null;
                    root.appendChild( _module );
                }
            });
            west.security = _security;
        }
        else {
            west.setRootNode( deepCloneRoot( this.getSgAppMWStoreStore().getRootNode() ) );
        }
    } else {
        //si no es administrador traigo los derechos de WEBREMOTO
        west.setRootNode( deepCloneRoot( this.getSgAppMWStoreStore().getRootNode() ) );
        if( recordWebremoto && recordWebremoto.get( 'Available' ) == true ) {
            var _security = recordWebremoto.get( '_Security' );
            if( _security && _security.rights ) {
                //si no existe security le creo un objeto para poder meter rights
                if( !west.security ) {
                    west.security = {};
                }
                west.security.rights = Ext.JSON.decode( _security.rights );
            }
        }
    }
    var nombreEvento = '[' + record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' ) + ']';
    view.module = module;
    if( record.get( 'tip_ntipo' ) == 13 ) {
        var array = record.get('rec_cContenido').split('[');
        var matricula = array[0];
        var win = Ext.create( 'Ext.Window', {
            iconCls: 'icon-table-add',
            layout: 'fit',
            title: 'Ver perfil',
            width: 1100,
            height: 700,
            border: false,
            id: 'winId',
            closable: false,
            closeAction: 'destroy',
            itemId: 'cuentaWin',
            listeners: {
                afterrender: function(win) {
                    window.addEventListener('message', function(event) {
                        if (event.data === 'insertionCompleted') {
                            win.close();
                            Ext.Msg.alert('Furmulario guardado', 'Los datos fueron guardados correctamente.');
                        }
                    });
                }
            },
            items: [
                Ext.create( 'Slbf.ux.SimpleIFrame', {
                    border: false,
                    itemId: 'iframeperfil'
                }),
                {
                    xtype: 'button',
                    text: 'Cambiar'
                }
            ]
        });
        win.show();
        win.down( '#iframeperfil' ).setSrc( '/handler/EventosLPRForm?_dc=1495024081888&matricula=' + matricula + '&token=' + Ext.util.Cookies.get('OAuth_Token') + '&usu=' + _UserData.UserId)
 
 
 

    }
    // tomo el registro para esta terminal, lo saco de pendiente.
    //si fuerzo a no verificar el usuario cuando ingreso tambien saco el atender evento
    if( !view.noVerifyAssignedUser ) {
        Ext.Ajax.request( {
            url: '/rest/search/AtencionEventoAtender',
            params: { rec_iid: rec_iid },
            method: 'GET',
            scope: this,
            callback: function( options, success, response ) {
                var parametros = Ext.JSON.decode( response.responseText );
                var rec = parametros.rows[ 0 ];
                if( rec && ( rec.Error == 0 || rec.Error == undefined || rec.Error == null ) ) {
                    this.setRecord( record, view );
                    //inicio evaludar de evento
                    view.taskEvaluarEvento = Ext.TaskManager.start( {
                        args: [ view, this ],
                        run: this.evaluarEvento,
                        interval: 10000
                    });
                    controller.openAtencionEvento( view, record, west )
                } else if( rec && rec.Error == 10 ) {
                    //si el evento aun no tiene un operador asignado en eventos pendientes y estado = 1 (atendiendo)
                    // no dejo continuar
                    notify( 'Hubo un error al atender el evento.' )
                    if( controller.application.CARGANDOEVENTO ) {
                        controller.application.CARGANDOEVENTO.hide()
                        delete controller.application.CARGANDOEVENTO
                    }
                    view.close()
                } else {
                    if( !view.noVerifyAssignedUser ) {
                        notifyError( rec.Message );
                        view.close();
                    } else {
                        notify( 'Este evento pertenece a otro operador. Solo tiene permiso de colaboracion.' )
                    }
                    if( controller.application.CARGANDOEVENTO ) {
                        controller.application.CARGANDOEVENTO.hide()
                        delete controller.application.CARGANDOEVENTO
                    }
                }
            }
        });
    } else {
        //inicio evaludar de evento
        view.taskEvaluarEvento = Ext.TaskManager.start( {
            args: [ view, this ],
            run: this.evaluarEvento,
            interval: 10000
        });
        controller.openAtencionEvento( view, record, west )
    }*/
    west.expandAll();
}, 
openAtencionEvento: function (view, record, west ) {
    var controller = this;
    //ANULADO POR MONITOREO GUIADO var datosVariables = view.down( '#datosvariablestree' );
    //ANULADO POR MONITOREO GUIADO datosVariables.setRootNode( deepCloneRoot( this.getSgAppMWVariableStoreStore().getRootNode() ) )
    var title = "Evento";
    var myPanel = view.down( 'tabpanel' );
    /**
     * 
     * ACA ESTYO COMENZADO A UTILIZAR EL NUEVO PROCESAR EVENTOS !!!!!!!! 
     * EL VIEJO ES : eventomonitoreopanelview 
     * 
     * EL NUEVO ES (SMARTPANIC) : atencioneventoview
     * EL NUEVO ES (COMUN) : atencioneventoComunview
     * 9/8/2017 se agrego para que Vigicontroll use la misma vista que Smartpanics a pedido de rodrigo
     */
    if( record.get( 'rxt_nSPIP' ) == 1 || record.get( 'rxt_nSPSMS' ) == 1 ) {
        var atencionView = 'atencioneventoguiadoview';
    } else if( record.get( 'rxt_nVCIP' ) == 1 || record.get( 'rxt_nVCSMS' ) == 1 || record.get( 'tip_ntipo' ) == 5 ) {
        var atencionView = 'atencioneventoguiadoview';
    } else {
        var atencionView = 'atencioneventoguiadoview';
    }
    var newTab = Ext.widget( atencionView, {
        record: record,
        evaluarEvento: function() {
            controller.evaluarEvento( view, controller, true )
        },
        module: view.module,
        title: title,
        closable: false,
        itemIdTabReturn: view.itemIdTabReturn,
        atencionAutomatica: view.atencionAutomatica,
        hideProcessOperations: view.hideProcessOperations,
        showSmsSender: view.showSmsSender,
        fireObservacionColaboracion: view.fireObservacionColaboracion,
        eventTabPanel: view.eventTabPanel,
        /**
         * BC 390361159 : Agregado personalizacion para mostar / ocultar bitacora, timeline, notas.
         */
        bitacora: view.bitacora,
        timeline: view.timeline,
        notas: view.notas
    });
    // agrego la paleta creada
    myPanel.add( newTab );
    myPanel.setActiveTab( newTab );
    if( view.fireObservacionColaboracion ) {
        var newTabMsg = Ext.widget( 'textfield', {
            disabled: true,
            translate: false,
            title: getLocale( 'Modo colaborador' ),
            tabConfig: {
                cls: 'tabmsg'
            }
        });
        myPanel.add( newTabMsg );
        newTabMsg.setDisabled( true )
    }
    //le sumo 1 segundo para que traiga solo posteriores
    var fecha = new Date( record.get( 'rec_isoFechaHora' ) ).setSeconds( record.get( 'rec_isoFechaHora' ).getSeconds() + 1 );
    var ultimoEventoReciid;
    var nombreEvento = '[' + record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' ) + ']';
    //ANULADO POR MONITOREO GUIADO this.applyKeyData( newTab );
    // si tiene servicio tecnico lo agrego al tree    
    /******************************************************************************/
    /*//ANULADO POR MONITOREO GUIADO
    if( record.get( 'stc_iid' ) > 0 && datosVariables.store.getRootNode() ) {
        datosVariables.store.getRootNode().appendChild( {
            text: 'ServTec pendientes',
            iconCls: 'icon-servtec-16',
            leaf: true,
            view: 'servtecgridview',
            closable: true,
            viewConfig: "{ estadoFilter: 1,noOpenServtecEditForm:true, readOnly:true }"
        })
    }

    */
    // si es tipo LPR agrego Vehiculos al three   
    /******************************************************************************/
    /*//ANULADO POR MONITOREO GUIADO
    if( record.get( 'tip_ntipo' ) == 13 ) {
        datosVariables.store.getRootNode().appendChild( {
            text: 'Vehiculos',
            iconCls: 'icon-car',
            leaf: true,
            view: 'gridvehicle',
            closable: true,
            viewConfig: ""
        })
    }
    */
    // si es moroso
    /******************************************************************************/
    /*//ANULADO POR MONITOREO GUIADO
    if( record.get( 'cli_nsituacion' ) > 0 && datosVariables.store.getRootNode() ) {
        if( record.get( 'cli_nsituacion' ) != 1 ) {
            datosVariables.store.getRootNode().appendChild( {
                text: 'Morosidad',
                iconCls: 'icon-moneyguard-16',
                leaf: true,
                view: 'mgcomprobantesgridview',
                closable: true,
                viewConfig: "{ cli_icodigo_ID: " + record.get( 'cli_icodigo_id' ) + " }"
            })
        }
    }
    */
    //ANULADO POR MONITOREO GUIADO var spPanel = newTab.down( '#smartpanics' );
    //datosVariables.cuenta = record;
    west.cuenta = record;
    view.cuenta = record;
    // verifico que la nota temporal este entre fechas
    var objectId = record.get( 'cue_iid' );
    /***************************************************************/
    record.loadNotaTemporal( function( record ) {
        if( record.get( 'not_dtemporaldesde' ) < new Date() && record.get( 'not_dtemporalhasta' ) > new Date() ) {
            var newView = Ext.widget( 'notatemporalroview', {
                record: view.record,
                title: '',
                module: view.module,
                tipo: 'win'
            });
            newView.down( 'toolbar' ).hide();
            var myWindow = Ext.widget( 'window', {
                title: 'Notas temporal ' + nombreEvento,
                height: 300,
                width: 600,
                modal: true,
                items: newView,
                closable: true,
                layout: 'fit',
            }).show();
            //agrego al tree la nota temporal    
            datosVariables.store.getRootNode().appendChild( {
                text: 'Nota temporal',
                iconCls: 'icon-transmit',
                leaf: true,
                view: 'notatemporalroview',
                closable: true
            })
        }
    })
    // miro el estado de la cuenta si es prueba // CUANDO ES PRUEBA POR ZONAS MIRAR EL CODIGO DE ZONA
    // este ajax es necesario? no viene ya el estado en el record?
    Ext.Ajax.request( {
        url: '/rest/search/CuentaById',
        params: { Id: objectId },
        method: 'GET',
        scope: this,
        success: function( response ) {
            var parametros = Ext.JSON.decode( response.responseText );
            var rec = parametros.rows[ 0 ];
            if( rec.Situacion == 'Prueba' ) {
                notify( 'El estado de la cuenta es: ' + rec.Situacion )
            }
            if( rec.Situacion == 'Prueba x Zonas ' ) {
                var items = Ext.create( 'Ext.data.Store', {
                    model: 'WebRemoto' + '.model.EstadoItemModel'
                });
                items.load( {
                    ObjectId: objectId, view: view, callback: function( records, operation, success ) {
                        Ext.each( records, function() {
                            //   console.log(Ext.util.Format.trim(this.get('est_czona')),Ext.util.Format.trim(record.get('cue_clinea')))           
                            if( Ext.util.Format.trim( this.get( 'est_czona' ) ) == Ext.util.Format.trim( record.get( 'rec_czona' ) ) ) {
                                notify( 'El estado de la zona es: ' + rec.Situacion )
                            }
                        });
                    }
                });
            }
            // muestro la foto
            if( rec.cue_cfoto != '' && rec.cue_nmostrar == 1 && view.isVisible() ) {
                var newView = Ext.widget( 'cuentaimagenview', {
                    cue_cfoto: rec.cue_cfoto
                });
                var myWindow = Ext.widget( 'window', {
                    title: getLocale( 'Imagen de la cuenta' ),
                    translate: false,
                    x: 400,
                    y: 100,
                    height: 470,
                    width: 400,
                    modal: false,
                    items: newView,
                    closable: true,
                    layout: 'fit',
                }).show();
                //declaro la windo como hija par aque cuando se cierra el evento cierre tambien las ventanas
                view.windowsHijas.push( myWindow )
            }
        }
    });
    // verifico que tenga imagen de zona para mostrar
    // saco el load porque vienen los campos en el evento (dedalo 17/10/2016)
    if( record.get( 'zon_cimagen' ).trim() != '' && record.get( 'zon_nmostrar' ) == 1 && view.isVisible() ) {
        var newView = Ext.widget( 'zonaimagenbyeventoview', {
            record: view.record,
            module: view.module
        });
        var myWindow = Ext.widget( 'window', {
            title: getLocale( 'Imagen de la zona' ) + " " + record.get( 'zon_cdescripcion' ),
            height: 470,
            width: 400,
            x: 300,
            y: 50,
            modal: false,
            items: newView,
            closable: true,
            layout: 'fit',
        }).show();
        //declaro la windo como hija par aque cuando se cierra el evento cierre tambien las ventanas
        view.windowsHijas.push( myWindow )
    }
    // aplico la seguridad a los botones de informes
    var _security = view.recordWebremoto.get( '_Security' );
    console.log('_security-----', _security)
    if( _security && _security.rights ) {
        if( _security.informeLlamada == "true" ) {
            view.down( '#informeLlamada' ).show();
        }
        if( _security.informeNotificaciones == "true" ) {
            view.down( '#informeNotificaciones' ).show();
        }
        if( _security.informeMultimedia == "true" ) {
            view.down( '#informeMultimedia' ).show();
        }
        if( _security.informeHistorico == "true" ) {
            view.down( '#informeHistorico' ).show();
        }
        if( _security.informeSertec == "true" ) {
            view.down( '#informeSertec' ).show();
        }
    }
},
onEventosnuevosClick: function(button, object, options ) {
    var view = button.up( 'eventomonitoreoguiadoview' );
    var record = view.record;
    var fecha = new Date( record.get( 'rec_isoFechaHora' ) ).setSeconds( record.get( 'rec_isoFechaHora' ).getSeconds() + 1 );
    var newTabUltimosEventos = Ext.widget( 'eventostrgridview', {
        itemId: 'ultimoseventos',
        title: 'Eventos posteriores',
        showEstadosFilter: false,
        estados: [ 0, 1, 2, 3, 4, 5, 6, 7, 9 ],
        showMaximizer: false,
        hiddenDealerFilter: true,
        short: 1,
        evaluarNuevosEventosYEnviarAlFrente: true,
        record: view.record,
        FechaDesde: Ext.Date.format( new Date( fecha ), 'Y-m-d\\TH:i:s' ),
        condiciones: view.condiciones,
        sorters: [
            {
                property: 'rec_tfechahora',
                direction: 'ASC'
            }
        ]
    });
    var myWindow = Ext.widget( 'window', {
        title: 'Eventos posteriores',
        height: 380,
        width: 600,
        modal: true,
        items: newTabUltimosEventos,
        closable: true,
        layout: 'fit',
        closeAction: 'destroy'
    }).show();
    newTabUltimosEventos.down( 'toolbar' ).hide();
},
    
onEnviarSmsClick: function(button, object, options ) {
    var view = button.up( 'eventomonitoreoguiadoview' )
    var newView = Ext.widget( 'smsenvioformview', {
        record: view.record,
        caller: view,
    });
    var myWindow = Ext.widget( 'window', {
        title: 'Enviar Sms',
        height: 380,
        width: 400,
        modal: true,
        items: newView,
        closable: true,
        layout: 'fit',
    }).show();
},
    
onCerrarClick: function(button, object, options ) {
    button.up( 'eventomonitoreoguiadoview' ).close()
},
    
onImagePanelHasContet: function(imagepanel ) {
    if( imagepanel.hascontent ) {
        var view = imagepanel.up( 'eventomonitoreoguiadoview' );
        //view.down('notaroview').hide();
        imagepanel.show();
    }
},
    
onImagePanelAfterMaximize: function(imagepanel ) {
    var view = imagepanel.up( 'eventomonitoreoguiadoview' );
    // Remuevo las TABs del la view dguardview (Grilla / Video)
    imagepanel.items.items[ 0 ].removeAll();
    // Oculto el panel dguardview
    imagepanel.hide();
},
    
onWindowClose: function(imagepanel ) {
    var view = imagepanel.up( 'eventomonitoreoguiadoview' );
    // Regenero las TABs de la view dguardview
    imagepanel.fireEvent( 'afterrender', imagepanel );
    // Muestro el panel dguardview
    imagepanel.show();
},
    
onGuardarNotaClick: function(button, object, options ) {
    var controller = this;
    var view = button.up( 'eventomonitoreoguiadoview' );
    var record = view.record;
    var nombreEvento = '[' + record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' ) + ']';
    var newView = Ext.widget( 'formnote', {
        record: view.record,
        module: view.module,
        tipo: 'win',
        title: ''
    });
    var myWindow = Ext.widget( 'window', {
        title: 'Modificar notas ' + nombreEvento,
        height: 380,
        width: 400,
        modal: true,
        items: newView,
        closable: true,
        layout: 'fit',
    }).show();
},
    
onLlamadaClick: function(button, object, options ) {
    var view = button.up( 'eventomonitoreoguiadoview' );
    var operadores = view.up( 'tabpanel' ).up( 'tabpanel' ).operador;
    var operadorId = view.up( 'viewport' ).operadorId;
    var record = view.record;
    var nombreEvento = '[' + record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' ) + ']';
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: getLocale( 'Realizar contacto ' ) + nombreEvento,
        closeAction: 'destroy',
        itemId: 'contacto',
        translate: false,
        width: 800,
        height: 500,
        border: true,
        modal: false,
        view: view,
        closable: false,
        items: [ {
            xtype: 'llamadahelperview',
            record: view.record,
            operador: operadores,
            operadorId: operadorId,
            called: view,
            operadorId: view.up( 'viewport' ).operadorId
        }]
    });
    win.show();
},
    
onEstadoClick: function(button, object, options ) {
    var view = button.up( 'eventomonitoreoguiadoview' );
    var record = view.record;
    var operadores = view.up( 'tabpanel' ).operador;
    var hidecontrols = [ '#btndeshabilitar', '#btnEliminar' ];
    if( record.get( 'rec_czona' ).trim() == '' ) {
        hidecontrols.push( '#btnxzonas' );
    }
    var nombreEvento = '[' + record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' ) + ']';
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: getLocale( 'Poner en prueba' ) + ' ' + nombreEvento,
        closeAction: 'destroy',
        translate: false,
        itemId: 'contacto',
        width: 800,
        height: 300,
        border: true,
        modal: false,
        view: view,
        closable: true,
        items: [ {
            xtype: 'estadoview',
            module: Ext.create( this.getModuleModelModel(), {
                profile: 3
            }),
            forceZona: record.get( 'rec_czona' ),
            hideControls: hidecontrols,
            record: view.cuenta,
            called: view,
            operadorId: view.up( 'viewport' ).operadorId,
            rec_iid: record.get( 'rec_iid' )
        }]
    });
    win.show();
},
    
onChangeObservacionesClick: function(combo, newvalue, oldvalue ) {
    var view = combo.up( 'eventomonitoreoguiadoview' );
    var textarea = view.down( '#obsfield' );
    textarea.setValue( textarea.getValue() + newvalue );
},
    
onAgregarObservacionClick: function(button, object, options ) {
    var view = button.up( 'eventomonitoreoguiadoview' );
    var record = view.record;
    var rec_iid = record.get( 'rec_iid' );
    var observaciones = view.down( '#obsfield' );
    var observacion = observaciones.getValue();
    var controller = this;
    if( observacion != '' ) {
        Ext.Ajax.request( {
            url: '/rest/search/AtencionEventoObservacion',
            params: {
                rec_iid: rec_iid,
                rec_cObservaciones: observacion
            },
            method: 'GET',
            scope: this,
            success: function( response ) {
                var parametros = Ext.JSON.decode( response.responseText );
                var rec = parametros.rows[ 0 ];
                if( rec.Error == 0 ) {
                    //actualizo las pantallas
                    notify( 'La observacion fue agregada.' );
                    observaciones.setValue( '' );
                    //guardo en eventostimeline
                    controller.getEventosTiemLineModelModel().create( {
                        etl_icuenta: record.get( 'cue_iid' ),
                        etl_tfechahora: new Date(),
                        etl_caccion: '%IngresoComentarios%',
                        etl_cobservacion: observacion,
                        etl_cowner: '%MWR%',
                        etl_ioperador: view.up( 'viewport' ).operadorId,
                        etl_irecid: rec_iid
                    }).save();
                    view.down( 'eventotimelinegridview' ).fireEvent( 'objectchanged', { record: record, view: view.down( 'eventotimelinegridview' ) });
                } else {
                    notifyError( rec.Message );
                }
            }
        });
    } else {
        notifyError( 'Debe completar la observación antes de guardar!' );
    }
},
    
onEsperaClick: function(button, object, options ) {
    var view = button.up( 'eventomonitoreoguiadoview' );
    var minutosEspera = view.down( '#minutosEspera' ).getValue();
    var record = view.record;
    var rec_iid = record.get( 'rec_iid' );
    var observaciones = view.down( '#obsfield' ).getValue();
    Ext.Ajax.request( {
        url: '/rest/search/AtencionEventoEspera',
        params: {
            rec_iid: rec_iid,
            rec_iMinutosEspera: minutosEspera,
            rec_cObservaciones: observaciones
        },
        method: 'GET',
        scope: this,
        success: function( response ) {
            var parametros = Ext.JSON.decode( response.responseText );
            var rec = parametros.rows[ 0 ];
            if( rec.Error == 0 ) {
                //actualizo las pantallas
                notify( 'El evento se pasó a espera' );
                view.close();
            } else {
                notifyError( rec.Message );
            }
        }
    });
},
onProcesarClick: function(button, object, options ) {
    var view = button.up( 'eventomonitoreoguiadoview' );
    var record = view.record;
    var categorizacion = view.record.get( 'rec_ccategorizacion' )//view.down('#categorizacion').getValue();
    var observaciones = view.down( '#obsfield' ).getValue();
    var resolucion = view.record.get( 'rec_idresolucion' )//view.down('#resolucion').getValue();
    var rec_iid = record.get( 'rec_iid' );

    if( view.isLlamadaOpen ) {
        notify( 'La ventana de llamados debe estar cerrada para poder procesar.' );
        return false;
    }

    var categorizacionRequerida = getParametro( 'CATEGORIZACIONOBLIGATORIA' )
    if( categorizacionRequerida == 1 || categorizacionRequerida == 2 ) {
        if( Ext.util.Format.trim( resolucion ) == '' ) {
            notify( 'Debe seleccionar una categoria para poder procesar el evento.' );
            return false;
        }
    }

    // me fijo si el form es valido

    //var form = view.down( 'eventobservacionesformview' ); se anula para no validar el form de observaciones 
    //if( form.isValid() ) {
        Ext.Ajax.request( {
            url: '/rest/search/AtencionEventoProcesar',
            params: {
                rec_iid: rec_iid,
                rec_idResolucion: Ext.String.leftPad( resolucion, 3, '0' ),
                rec_cObservaciones: observaciones,
                rec_cCategorizacion: Ext.String.leftPad( categorizacion, 3, '0' )

            },
            method: 'GET',
            scope: this,
            success: function( response ) {
                var parametros = Ext.JSON.decode( response.responseText );
                var rec = parametros.rows[ 0 ];

                if( parametros.success ) {
                    //actualizo las pantallas
                    notify( 'El evento se pasó a procesado' );
                    if(view.caller)
                        view.caller.opened = false;
                    // retorno al panel que abrio este evento
                    //var parentTabPanel = view.up( 'tabpanel' );
                    //if( view.itemIdTabReturn ) {
                    //    parentTabPanel.setActiveTab( parentTabPanel.down( '#' + view.itemIdTabReturn ) )
                    //}

                    //envio los push
                    Ext.Ajax.request( {
                        url: '/handler/sendPushFromQueue',
                        method: 'GET'
                    });

                    if( getParametro( 'NOTIFICAEVENTODEALER' ) != '' ) {

                        var NOTIFICAEVENTODEALER = getParametro( 'NOTIFICAEVENTODEALER', true, true ).get( '_par_cvalor' )
                        var subject = getLocale( 'Procesamiento de evento' ) + ' [' + record.get( 'rec_calarma' ) + ' ' + record.get( 'rec_tfechaproceso' ) + ']'

                        var preSubject = '';
                        if( NOTIFICAEVENTODEALER && NOTIFICAEVENTODEALER.nombreCuenta && NOTIFICAEVENTODEALER.numeroCuenta ) {
                            preSubject = Ext.util.Format.trim( record.get( 'cue_ncuenta' ) ) + '-' + Ext.util.Format.trim( record.get( 'cue_cnombre' ) )
                        } else if( NOTIFICAEVENTODEALER && NOTIFICAEVENTODEALER.numeroCuenta ) {
                            preSubject = Ext.util.Format.trim( record.get( 'cue_ncuenta' ) )
                        } else if( NOTIFICAEVENTODEALER && NOTIFICAEVENTODEALER.nombreCuenta ) {
                            preSubject = Ext.util.Format.trim( record.get( 'cue_cnombre' ) )
                        }

                        subject = preSubject + ' ' + subject

                        Ext.Ajax.request( {
                            url: '/rest/search/EnviarEventoADealer',
                            params: {
                                rec_iid: rec_iid,
                                dealer: record.get( 'cue_clinea' ),
                                subject: subject,
                                cuentaId: record.get( 'rec_iidcuenta' )
                            },
                            method: 'GET',
                            scope: this,
                            success: function( response ) {
                            }
                        })
                    }

                    view.close();
                } else {
                    if( rec )
                        notifyError( rec.Message );
                }

            }
        });
    //} else {
    //    notifyError( 'Por favor corrija los valores del formulario' );
    //}
},


onProcesarLotesClick: function(button, event, options ) {
    var view = button.up( 'eventomonitoreoguiadoview' );
    var record = view.record;
    var store = view.store;
    const ultimoseventos = view.down( '#ultimoseventos' )

    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        translate: false,
        forceClose: true,
        title: getLocale( 'Debe seleccionar los eventos a procesar' ),
        closeAction: 'destroy',
        caller: view,
        fieldName: 'udw_clave',
        modal: true,
        width: 700,
        height: 630,
        border: false,
        record: record,
        closable: false,
        items: [
            {
                xtype: 'procesarporloteview',
                estados: view.estados,
                ultimoseventos: ultimoseventos,
                closeAction: 'destroy',
                condiciones: view.condiciones,
                record: record,
                caller: view,
                filters: [
                    {
                        property: 'o.cue_clinea',
                        value: view.record.get( 'cue_clinea' )
                    }, {
                        property: 'o.cue_ncuenta',
                        value: view.record.get( 'cue_ncuenta' )
                    }
                ],
                observacion: view.down( 'eventobservacionesformview' ).down( '#obsfield' ).getValue(),
                categorizacion: view.down( 'eventobservacionesformview' ).down( '#categorizacion' ).getValue(),
                resolucion: view.down( 'eventobservacionesformview' ).down( '#resolucion' ).getValue(),
                closerOnFinish: true,
                noReservar: true,
                callerString: 'atencionEvento' //arme este flag por que no puedo colgarme de xtype por que la view tiene extencion
            }
        ]
    });
    win.show();
},


onSupervisionClick: function(button, object, options ) {
    var view = button.up( 'eventomonitoreoguiadoview' );
    var record = view.record;
    // var categorizacion = view.record.get('rec_ccategorizacion')//view.down('#categorizacion').getValue();
    var observaciones = view.down( '#obsfield' ).getValue();
    //var resolucion = view.record.get('rec_idresolucion')//view.down('#resolucion').getValue();

    var rec_iid = record.get( 'rec_iid' );

    if( view.isLlamadaOpen ) {
        notify( 'La ventana de llamados debe estar cerrada para poder procesar.' );
        return false;
    }

    // me fijo si el form es valido

    var form = view.down( 'eventobservacionesformview' );
    // if (form.isValid()){
    Ext.Ajax.request( {
        url: '/rest/search/AtencionEventoSupervisor',
        params: {
            rec_iid: rec_iid,
            rec_cObservaciones: observaciones
        },
        method: 'GET',
        scope: this,
        success: function( response ) {
            var parametros = Ext.JSON.decode( response.responseText );
            var rec = parametros.rows[ 0 ];

            if( parametros.success ) {
                //actualizo las pantallas
                notify( 'El evento se pasó a supervision' );

                // retorno al panel que abrio este evento
                var parentTabPanel = view.up( 'tabpanel' ).up( 'tabpanel' ).up( 'tabpanel' );
                if( view.itemIdTabReturn ) {
                    parentTabPanel.setActiveTab( parentTabPanel.down( '#' + view.itemIdTabReturn ) )
                }
                view.close();
            } else {
                if( rec )
                    notifyError( rec.Message );
            }
        }
    });
    /* } else {
         notifyError('Por favor corrija los valores del formulario');
     }*/
},



onPosponerCierreClick: function (btn ) {
    var view = btn.up( 'eventomonitoreoguiadoview' );
    var record = view.record

    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' ' + record.get( 'cue_cnombre' ),
        closeAction: 'hide',
        translate: false,
        width: 600,
        height: 500,
        border: true,
        modal: false,
        view: view,
        items: [
            {
                xtype: 'posponercierreview',
                caller: view,
                record: record
            }
        ]
    });
    win.show();
},

onProcesarMultipleClick: function (btn ) {
    var view = btn.up( 'eventomonitoreoguiadoview' )
    var controller = this;

    var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    var recordWebremoto = storeSecurity.findRecord( 'KeyReference', 'WebRemoto' )
    if( recordWebremoto && recordWebremoto.get( 'Available' ) == true ) {
        var _security = recordWebremoto.get( '_Security' );
        if( _security && _security.procesarporlote && _security.procesarporlote == "true" ) {
            controller.onProcesarLotesClick( btn )
        } else if( _security && _security.procesartodos && _security.procesartodos == "true" ) {
            controller.onProcesarTodosClick( btn )
        }
        //lo nuevo
        else if( _security && _security.procesarporloteproceso && _security.procesarporloteproceso == "true" ) {
            controller.onProcesarLotesClick( btn )
        }
        else if( _security && _security.procesartodosproceso && _security.procesartodosproceso == "true" ) {
            controller.onProcesarTodosClick( btn )
        }
    }
},


onPendienteClick: function(button, object, options ) {
    var view = button.up( 'eventomonitoreoguiadoview' );
    var record = view.record;
    var rec_iid = record.get( 'rec_iid' );
    Ext.Ajax.request( {
        url: ' /rest/Search/AtencionEventoDevolver?rec_iid=' + rec_iid,
        method: 'GET',
        scope: this,
        success: function( response ) {
            var parametros = Ext.JSON.decode( response.responseText );
            var rec = parametros.rows[ 0 ];
            if( rec.Error == 0 ) {
                //actualizo las pantallas
                notify( 'El evento se pasó a pendiente' );
                view.close();
            } else {
                notifyError( rec.Message );
            }
        }
    });
},
onProcesarTodosClick: function(button, object, options ) {
    var view = button.up( 'eventomonitoreoguiadoview' );
    var record = view.record;
    var cue_iid = record.get( 'cue_iid' );
    if( view.isLlamadaOpen ) {
        notify( 'La ventan de llamados debe estar cerrada para poder procesar' );
        return false;
    }
    var eventostiemporeal = view.down( 'eventostrgridview' );
    var nombreEvento = '[' + record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' ) + ']';
    var store = eventostiemporeal.store;
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        translate: false,
        title: getLocale( 'Procesamiento múltiple' ),//getLocale('Se procesaran ')+store.totalCount+getLocale('  elementos')+' '+nombreEvento,
        closeAction: 'hide',
        caller: view,
        fieldName: 'udw_clave',
        modal: true,
        width: 1000,
        height: 400,
        border: false,
        record: record,
        closable: false,
        items: [
            {
                xtype: 'eventosptgridview',
                stateId: 'procesartodos',
                nombreEvento: nombreEvento,
                showEstadosFilter: true,
                record: record,
                cue_iid: cue_iid,
                operador: view.operador,
                condiciones: view.condiciones,
                caller: view
            }
        ]
    });
    win.show();
},
    
onMapguardClick: function(button, object, options ) {
    var view = button.up( 'eventomonitoreoguiadoview' );
    var tabpanel = button.up( 'tabpanel' )
    var record = view.record;
    var cuenta = view.cuenta;
    var rec_iid = record.get( 'rec_iid' );
    var nombreEvento = '[' + record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' ) + ']';
    var title = getLocale( 'Mapguard' );
    var mytab = tabpanel.down( '[title=' + title + ']' );
    if( !mytab ) {
        var newTab = Ext.widget( 'mapguardeventosview', {
            record: record,
            targetTab: tabpanel,
            cuenta: cuenta,
            title: title,
            keepSelected: true,
            forceCuenta: true,
            closable: true,
            closeAction: 'destroy',
            autoDestroy: true,
            translate: false,
            operadorId: view.up( 'viewport' ).operadorId
        });
        tabpanel.add( newTab );
        tabpanel.setActiveTab( newTab );
    } else {
        tabpanel.setActiveTab( mytab );
    }
},
    
onServtecClick: function(button, object, options ) {
    var view = button.up( 'eventomonitoreoguiadoview' );
    var tabpanel = button.up( 'tabpanel' )
    var record = view.record;
    var cuenta = view.cuenta;
    var rec_iid = record.get( 'rec_iid' );
    var operador = view.up( 'tabpanel' ).operador;
    var nombreEvento = '(' + record.get( 'rec_calarma' ) + ' - ' + record.get( 'cod_cdescripcion' ) + ')';
    var title = getLocale( 'Servicio técnico' ) + ' ' + nombreEvento;
    var mytab = tabpanel.down( '[title=' + title + ']' );
    if( !mytab ) {
        var newTab = Ext.widget( 'servtecgridview', {
            record: cuenta,
            targetTab: tabpanel,
            event: record,
            title: title,
            translate: false,
            closable: true,
            closeAction: 'destroy',
            autoDestroy: true,
            operador: operador,
            operadorId: view.up( 'viewport' ).operadorId,
            rec_iid: rec_iid
        });
        tabpanel.add( newTab );
        tabpanel.setActiveTab( newTab );
    } else {
        tabpanel.setActiveTab( mytab );
    }
},
    
onAutoridadClick: function(button, object, options ) {
    var view = button.up( 'eventomonitoreoguiadoview' );
    var tabpanel = button.up( 'tabpanel' )
    var record = view.record;
    var cuenta = view.cuenta;
    var rec_iid = record.get( 'rec_iid' );
    Ext.Ajax.request( {
        url: '/rest/search/ReporteAutoridadesEventosManuales?rec_iid=' + rec_iid,
        success: function( resp, operation ) {
            var d = new Date();
            var ticks = d.getTime();
            var response = Ext.JSON.decode( resp.responseText );
            if( response.total > 0 ) {
                if( response.rows[ 0 ].aut_idestino != '1' ) {
                    Ext.widget( 'window', {
                        title: 'Reporte a autoridad',
                        width: 600,
                        height: 600,
                        layout: 'fit',
                        html: "<iframe style='overflow:auto;width:100%;height:100%;' frameborder='0'  src='" + response.rows[ 0 ].tad_curl + "?rec_iid=" + rec_iid + "&_dc=" + ticks + "'></iframe>"
                    }).show();
                } else {
                    button.disable();
                    notify( 'El evento se reportó con éxito.' );
                    //guardo en eventostimeline
                    controller.getEventosTiemLineModelModel().create( {
                        etl_icuenta: record.get( 'cue_iid' ),
                        etl_tfechahora: new Date(),
                        etl_caccion: '%ReporteAutoridadesManual%',
                        etl_cobservacion: '%ReporteAutoridadesManual%',
                        etl_cowner: '%MWR%',
                        etl_ioperador: view.up( 'viewport' ).operadorId,
                        etl_irecid: rec_iid
                    }).save();
                }
            } else {
                notifyError( 'No hay autoridades configuradas para reportar' );
            }
        }
    });
},
    
applyKeyData: function(view ) {
    var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    storeSecurity.each( function( v, k ) {
        var btnautoridad = view.down( '#btnautoridad' );
        var btnservtec = view.down( '#btnservtec' );
        if( v.get( 'KeyReference' ) == 'WebReporteAut' && v.get( 'Available' ) == true ) {
            btnautoridad.show();
        }
        if( v.get( 'KeyReference' ) == 'ReporteAutoridades' && v.get( 'Available' ) == true ) {
            btnautoridad.show();
        }
        if( v.get( 'KeyReference' ) == 'SgAppSerTec' && v.get( 'Available' ) == true ) {
            btnservtec.show();
        }
        if( v.get( 'KeyReference' ) == 'SerTec' && v.get( 'Available' ) == true ) {
            btnservtec.show();
        }
    })
},
    
setRecord: function(record, viewport ) {
    var controller = this;
    var myPanel = viewport.down( 'tabpanel' );
    var center = viewport.down( '#center' );
    var title = 'Datos del evento';
    //record.set('rec_iid', 3816238); // para usar un registro con datos
    var rec_iid = record.get( 'rec_iid' );
    var estadoStore = Ext.data.StoreManager.lookup( 'EventoEstadoStore' );
    var estadoRec = estadoStore.findRecord( 'Value', record.get( 'rec_nestado' ) );
    if( estadoRec )
        var estado = estadoRec.get( 'Name' );
    var rec_nOrigen = record.get( 'rec_nOrigen' );
    var rec_ipuerto = record.get( 'rec_iPuerto' );
    var origenStore = Ext.data.StoreManager.lookup( 'EventoOrigenStore' );
    var origenRec = origenStore.findRecord( 'Value', rec_nOrigen );
    if( origenRec )
        var origen = origenRec.get( 'Name' );
    record.set( '_eventDescripcion', record.get( 'rec_calarma' ) + '-' + record.get( 'cod_cdescripcion' ) );
    record.set( '_FechaHora', Ext.Date.format( record.get( 'rec_isoFechaHora' ), 'Y-m-d H:i:s' ) );
    record.set( '_estado', estado );
    //record.set('_origen', origen);
    var _win = viewport.up( 'window' );
    if( _win ) {
        _win.setTitle( record.get( '_eventDescripcion' ) + ' ' + record.get( '_FechaHora' ) );
    }
    if( center ) { center.record = record; }
},
    
openModules: function(tabpanel, record ) {
    var controller = this;
    // no tiene datos de seguridad en webdealer, me fijo si es master o admin
    var securitymodules = SecurityModulesStore;//controller.getSecurityModulesStoreStore();
    var masterModule = securitymodules.findRecord( 'KeyReference', 'MasterWebDealer' );
    var administratorModule = securitymodules.findRecord( 'KeyReference', 'Administrator' );
    var accountAdministrationModule = securitymodules.findRecord( 'KeyReference', 'SgAppAccountAdministration' );
    var isMaster = masterModule ? masterModule.get( 'Available' ) : false;
    var isAdmin = administratorModule ? administratorModule.get( 'Available' ) : false;
    var isAccount = accountAdministrationModule ? accountAdministrationModule.get( 'Available' ) : false;
    if( isMaster || isAdmin || isAccount ) {
        var modules = Ext.data.StoreManager.lookup( 'EventSecurityModuleStore' );
        modules.each( function( module ) {
            var newTab = Ext.widget( module.get( 'view' ), {
                iconCls: module.get( 'iconCls' ),
                record: record,
                title: module.get( 'text' ),
                closable: false
            });
            // agrego la paleta creada
            tabpanel.add( newTab );
            tabpanel.setActiveTab( newTab );
        })
        tabpanel.setActiveTab( 0 );
    } else {
        Ext.Ajax.request( {
            url: '/Rest/Security/Modules/5/Security', //cambiar id por el modulo
            method: 'GET',
            success: function( resp, operation ) {
                if( resp.responseText.length > 0 )
                    var json = JSON.parse( resp.responseText );
                if( json ) {
                    var modules = json.event;
                    Ext.Array.each( modules, function( module ) {
                        if( module.profile == 1 ) {
                            var newTab = Ext.widget( module.view, {
                                iconCls: module.iconCls,
                                record: record,
                                title: module.text,
                                closable: false
                            });
                            // agrego la paleta creada
                            tabpanel.add( newTab );
                            tabpanel.setActiveTab( newTab );
                        }
                    })
                    tabpanel.setActiveTab( 0 );
                }
            }
        })
    }
}
});
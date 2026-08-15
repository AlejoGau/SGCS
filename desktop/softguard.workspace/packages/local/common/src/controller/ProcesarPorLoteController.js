//MIGRADO2024
Ext.define( 'Common.controller.ProcesarPorLoteController', {
    extend: 'Ext.app.Controller',
    stores: [ 'Common.store.TablasObservacionesStore', 'Common.store.TablasCategorizacionStore', 'Common.store.TablasResolucionesStore' ],
models: [ 'TablasResolucionesSearchModel', 'TablasResolucionesActivasSearchModel', 'EventosPendientesSearchModel', 'EventosPendientesContabilizaSearchModel', 'AlarmasEnEventosPendientesSearchModel', 'SoftguardCodigoAlarmaModel' ],
views: [ 'ProcesarPorLoteView' ],
init: function(config ) {
    // this.initConfig(config);
    // genero los eventos
    this.control( {
        'procesarporloteview': {
            afterrender: this.initview,
            refresh: this.initView,
            addfilter: this.addfilter,
            beforedestroy: this.onDestroy
        },
        'procesarporloteview button[action=save]': {
            click: this.onSaveClick
        },
        'procesarporloteview #espera': {
            click: this.onEsperaClick
        },
        'procesarporloteview button[action=cancel]': {
            click: this.onCancelClick
        },
        'procesarporloteview #search': {
            click: this.onSearchClick
        },
        'procesarporloteview #observaciones': {
            change: this.onChangeObservacionesClick
        },
        'procesarporloteview #observaciones2': {
            change: this.onChangeObservaciones2Click
        },
        'procesarporloteview #vertodos': {
            click: this.onVerTodosClick
        },
        'procesarporloteview #codigoalarma': {
            expand: this.onAlarmasExpand
        },
        'procesarporloteview #resolucion': {
            change: this.onResolucionChange
        },
        'procesarporloteview #categorizacion': {
            change: this.onCategorizacionChange
        },
        'procesarporloteview #eventosespecificos': {
            click: this.onEventosEspecificosClick
        },
        'procesarporloteview button[action=supervision]': {
            click: this.onSupervisionClick
        },
    });
}, // cierro init
initview: function(view ) {
    const controller = this;
    //freno el loading en pendientes
    if( view.caller.task ) {
        Ext.TaskManager.stop( view.caller.task );
    }
    var me = this;
    var sorters = [
    ];
    view.me = this;
    if( !view.estados ) view.estados = 0;
    var filters = [ {
        property: "rec_nestado:ININT",
        value: view.estados,
        id: "rec_nestado"
    }, {
            property: "operadorAtendiendoCuentaNULL",
            value: 0,
            id: "operadorAtendiendoCuenta"
        }]
    if( view.filters ) {
        filters = view.filters
        //si algunos de los filtros que se pasan no tienen la propieda base:true entidndo que tengo que esconder la toolbar
        Ext.Array.each( filters, function( rec ) {
            if( rec.base != true ) {
                //view.down('toolbar').hide()
                view.down( '#vertodos' ).hide()
                view.down( '#search' ).hide()
                view.down( '#filtros' ).hide()
                return false;
            }
        })
    }
    var mystore = Ext.create( 'Ext.data.Store', {
        model: this.getEventosPendientesContabilizaSearchModelModel(),
        remoteGroup: false,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 10000,
        filters: filters,
        autoload: false,
        sorters: sorters
    });
    mystore.view = view;
    var mygrid = view.down( '#eventosprocesartodo' );
    if( view.excluirOrganizacionUsuarioActual ) {
        mystore.proxy.extraParams.excluirOrganizacionUsuarioActual = view.excluirOrganizacionUsuarioActual
    }
    mygrid.estados = view.estados;
    mygrid.bindStore( mystore );
    mystore.grid = mygrid;
    mystore.view = view;
    mystore.load()
    if( view.showEstadosFilter ) {
        var estadoStore = estados.getStore();
        estadoStore.filterBy( function( record ) {
            return Ext.Array.contains( view.estados, record.get( 'Value' ) )
        })
        estados.show();
    }
    var codigoAlarmaStore = Ext.create( 'Ext.data.Store', {
        model: this.getAlarmasEnEventosPendientesSearchModelModel(),//this.getSoftguardCodigoAlarmaModelModel(),
        autoload: false,
        sorters: [ {
            property: 'cod_cdescripcion',
            direction: 'ASC'
        }],
        pageSize: 10000
    });
    var comboCodigoalarma = view.down( '#codigoalarma' );
    comboCodigoalarma.bindStore( codigoAlarmaStore );
    codigoAlarmaStore.load();
    if( view.observacion ) {
        view.down( '#obsfield' ).setValue( view.observacion )
        view.down( '#obsfield2' ).setValue( view.observacion )
    }
    var TIEMPOENESPERA = getParametro( 'TIEMPOENESPERA', true, true );
    var TIEMPOENESPERAObj = TIEMPOENESPERA.get( '_par_cvalor' );
    var maxespera = 100;
    if( TIEMPOENESPERAObj && TIEMPOENESPERAObj.max ) {
        maxespera = TIEMPOENESPERAObj.max == 999 ? null : TIEMPOENESPERAObj.max;
    } else {
        maxespera = TIEMPOENESPERA.get( 'par_ivalor' )
    }
    var minespera = 2;
    if( TIEMPOENESPERAObj && TIEMPOENESPERAObj.min ) {
        minespera = TIEMPOENESPERAObj.min == 999 ? null : TIEMPOENESPERAObj.min;
    }
    var tiempoenespera = 50;
    if( TIEMPOENESPERAObj && TIEMPOENESPERAObj.default ) {
        tiempoenespera = TIEMPOENESPERAObj.default == 999 ? null : TIEMPOENESPERAObj.default;
    } else {
        tiempoenespera = TIEMPOENESPERA.get( 'par_ivalor' )
    }
    view.down( '#minutosEspera' ).setMaxValue( maxespera )
    view.down( '#minutosEspera' ).setValue( tiempoenespera )
    view.down( '#minutosEspera' ).setMinValue( minespera )
    //defino tiempo en espera
    /*var tiempoenespera = getParametro('TIEMPOENESPERA')
    if(tiempoenespera) {
        view.down('#minutosEspera').setValue(tiempoenespera)
    }*/
    var resolucionCombo = view.down( '#resolucion' )
    view.resolucionRequerida = getParametro( 'RESOLUCIONOBLIGATORIA' )
    view.categorizacionRequerida = getParametro( 'CATEGORIZACIONOBLIGATORIA' )
    console.log( 'Configuracion', 'Categorizacion->', view.categorizacionRequerida, 'Resolucion->', view.resolucionRequerida )
    if( view.resolucionRequerida == 1 ) {
        resolucionCombo.allowBlank = false;
        resolucionCombo.setValue( resolucionCombo.getStore().first() );
        resolucionCombo.validateValue( resolucionCombo.getValue() );
    } else if( view.resolucionRequerida == 2 ) {
        resolucionCombo.allowBlank = false;
        resolucionCombo.validateValue( resolucionCombo.getValue() );
    } else {
        resolucionCombo.allowBlank = true;
        resolucionCombo.setValue( '' );
    }
    var categorizacionCombo = view.down( '#categorizacion' )
    var resolucionesStore = Ext.create( 'Ext.data.Store', {
        model: this.getTablasResolucionesSearchModelModel(),
        pageSize: 99999,
        remoteFilter: true,
        remoteSort: true,
        sorters: [ { "property": "res_cdescripcion", "direction": "ASC" }],
        filters: [
            {
                property: 'res_nEstado',
                value: 0
            }
        ]
    });
    view.down( '#categorizacion' ).bindStore( resolucionesStore )
    resolucionesStore.load( {
        callback: function() {
            resolucionesStore.remoteFilter = false;
            var categorizacionRequerida = getParametro( 'CATEGORIZACIONOBLIGATORIA' )
            if( categorizacionRequerida == 1 ) {
                categorizacionCombo.allowBlank = false;
                categorizacionCombo.setValue( categorizacionCombo.getStore().first() );
                categorizacionCombo.validateValue( categorizacionCombo.getValue() );
            } else if( categorizacionRequerida == 2 ) {
                categorizacionCombo.allowBlank = false;
                categorizacionCombo.setValue( '' );
                categorizacionCombo.validateValue( categorizacionCombo.getValue() );
            } else {
                categorizacionCombo.allowBlank = true;
                categorizacionCombo.setValue( '' );
            }
            if( view.categorizacion ) {
                categorizacionCombo.setValue( view.categorizacion )
            }
        }
    });
    /***
     * TODO: Esto hay que re hacerlo para que erifique los campos por separados y luego tome la desicion
     */
    // valido si tengoqeu habilitar el boton porque se cargaron los defaults.
    var resolucion = resolucionCombo.getValue();
    var categorizacion = categorizacionCombo.getValue();
    if( view.resolucionRequerida == 2 || view.resolucionRequerida == 1 ) {
        if( resolucion != '' ) {
            //view.down('#save').setDisabled(false)
            //verifico si categoriazcion tambien requiere 
            if( view.categorizacionRequerida == 2 || view.categorizacionRequerida == 1 ) {
                if( categorizacion ) {
                    view.down( '#save' ).setDisabled( false )
                } else {
                    view.down( '#save' ).setDisabled( true )
                }
            } else {
                view.down( '#save' ).setDisabled( false )
            }
        } else {
            view.down( '#save' ).setDisabled( true )
        }
    } else if( view.resolucionRequerida == 0 && view.categorizacionRequerida == 0 ) {
        view.down( '#save' ).setDisabled( false )
    }
    /*
    lo pase dentro del callback del store que popula el combo
 
    if(view.categorizacion) {
        view.down('#categorizacion').setValue(view.categorizacion)
    }*/
    if( view.resolucion ) {
        view.down( '#resolucion' ).setValue( view.resolucion )
    }
    var storeSecurity = SecurityModulesStore;//Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    var recordWebremoto = storeSecurity.findRecord( 'KeyReference', 'WebRemoto' )
    // me fijo si tiene webremoto, si no, anulo el procesamineto aunque sea administrador (no tiene operador asignado)
    if( !recordWebremoto || !recordWebremoto.get( '_Security' ) ) {
        view.down( '#formularios' ).hide();
        notifyError( 'No tiene el módulo webremoto configurado, no puede procesar.' );
    }
    if( !view.preventProcesarTodos && recordWebremoto && recordWebremoto.get( 'Available' ) == true ) {
        var _security = recordWebremoto.get( '_Security' );
        if( _security && _security.supervision && _security.supervision > 0 ) {
            view.down( '#supervision' ).setDisabled( false )
        }
        if( _security && _security.procesartodos && _security.procesartodos == "false" ) {
            view.down( '#eventosespecificos' ).show()
        }//lo nuevo
        else if( _security && _security.procesartodospendientes && _security.procesartodospendientes == "true" && !view.callerString || view.callerString != 'atencionEvento' ) {
            view.down( '#eventosespecificos' ).show()
        } else if( _security && _security.procesartodosproceso && _security.procesartodosproceso == "true" && view.callerString && view.callerString == 'atencionEvento' ) {
            view.down( '#eventosespecificos' ).show()
        }
    }
    if( view.record ) {
        const filtros = [ { "property": "rec_iidcuenta:ININT", "value": view.record.get( 'rec_iidcuenta' ) },
            { "property": "rec_nestado:ININT", "value": "0,1,2,3,4,5,6,7,8,9" }]
        view.EventosStore = Ext.create( 'Ext.data.Store', {
            model: controller.getEventosPendientesSearchModelModel(),
            remoteGroup: false,
            remoteSort: true,
            autoDestroy: true,
            remoteFilter: true,
            listeners: {
                beforesort: function( store ) {
                    console.log( arguments )
                    store._isSort = true;
                },
                beforeload: function( store ) {
                    if( store._isSort ) {
                        store._isSort = false;
                        return false;
                    }
                },
            },
            sorters: sorters
        });
        view.EventosStore.clearFilter(); // Limpiar filtros existentes (si los hay)
        view.EventosStore.addFilter( filtros );
        view.EventosStore.load(( records ) => view.eventos = records )
    }
},
onSupervisionClick: function(button, object, options ) {
    const view = button.up( 'procesarporloteview' );
    let eventos;
    if( view.caller && typeof view.caller.getStore === 'function' ) {
        eventos = view.caller.getStore().data.items;
    } else {
        eventos = view.up().caller.down( '#ultimoseventos' ).getStore().data.items;
    }
    const observaciones = view.down( '#obsfield2' ).value;
    const controller = this;
    const promises = [];
    const alarma = view.down( '#codigoalarma' );
    if( view.isLlamadaOpen ) {
        notify( 'La ventana de llamados debe estar cerrada para poder procesar.' );
        return false;
    }
    if( alarma.getValue() && alarma.getValue() != '' ) {
        eventos = eventos.filter(evento =>{
            if(alarma.valueCollection.items.length>0)
                if(  evento.get( 'rec_calarma' ) == alarma.valueCollection.items[0].get('Codigo'))
                    return true;
                else
                    return false;
            else
                return false

        }
    );// )
    }
    console.log( "eventos", eventos );
    view.maskLoading = Ext.create( 'Ext.LoadMask', view, {
        msg: getLocale( "Procesando" ) + " 0/" + eventos.length + " " + getLocale( "registros" )
    }).show();
    Ext.Array.each( eventos, function( evento ) {
        const promise = new Promise(( resolve, reject ) => {
            Ext.Ajax.request( {
                url: '/rest/search/AtencionEventoSupervisor',
                params: {
                    rec_iid: evento.get( 'rec_iid' ),
                    rec_cObservaciones: observaciones
                },
                method: 'GET',
                success: function( response ) {
                    const parametros = Ext.JSON.decode( response.responseText );
                    const rec = parametros.rows[ 0 ];
                    if( parametros.success ) {
                        resolve();
                    } else {
                        if( rec )
                            notifyError( rec.Message );
                        reject();
                    }
                },
                failure: function( response ) {
                    reject();
                }
            });
        });
        promises.push( promise );
    });
    Promise.all( promises )
        .then(( res ) => {
            view.maskLoading.hide();
            view.up( 'window' ).close()
            if( view.caller ) {
                view.caller.fireEvent( 'forceEvaluateEvent', view.caller )
            }
            notify( 'Los eventos se pasaron a supervision.' );
        })
        .catch(( res ) => {
            console.log( "catch res", res )
            notify( 'Error al pasar a supervision' );
            view.maskLoading.hide();
        });
},
    
onEventosEspecificosClick: function(button, event, options ) {
    var view = button.up( 'procesarporloteview' );
    var record = view.record;
    var store = view.store;
    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        translate: false,
        forceClose: true,
        title: getLocale( 'Debe seleccionar los eventos a procesar' ),
        closeAction: 'destroy', //[Adrian] 5/11/2018 lo cambie a destroy, estab en hide y no se por que
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
                xtype: 'procesartodoformview',
                estados: view.estados,
                closeAction: 'destroy',
                condiciones: view.condiciones,
                record: record,
                filters: view.filters,
                caller: view,
                excluirOrganizacionUsuarioActual: view.excluirOrganizacionUsuarioActual,
                observacion: view.observacion,
                categorizacion: view.categorizacion,
                resolucion: view.resolucion,
                closerOnFinish: true,
                noReservar: view.noReservar
            }
        ]
    });
    win.show();
    view.up( 'window' ).close()
},
    
    
addfilter: function (view, rec ) {
    view.down( '#codigoalarma' ).setValue( rec.get( 'rec_calarma' ) )
    this.onSearchClick( view.down( '#codigoalarma' ) )
},
    
    
onResolucionChange: function (combo, value ) {
    var view = combo.up( 'procesarporloteview' )
    if( view.resolucionRequerida == 2 || view.categorizacionRequerida == 1 ) {
        if( value != '' ) {
            //view.down('#save').setDisabled(false)
            //verifico si categoriazcion tambien requiere 
            if( view.categorizacionRequerida == 2 || view.categorizacionRequerida == 1 ) {
                if( view.down( '#categorizacion' ).getValue() ) {
                    view.down( '#save' ).setDisabled( false )
                } else {
                    view.down( '#save' ).setDisabled( true )
                }
            } else {
                view.down( '#save' ).setDisabled( false )
            }
        } else {
            view.down( '#save' ).setDisabled( true )
        }
    }
},
    
    
onCategorizacionChange: function (combo, value ) {
    var view = combo.up( 'procesarporloteview' )
    if( view.categorizacionRequerida == 2 || view.resolucionRequerida == 1 ) {
        if( value != '' ) {
            //view.down('#save').setDisabled(false)
            //verifico si resolucion es requerida
            if( view.resolucionRequerida == 2 || view.resolucionRequerida == 1 ) {
                if( view.down( '#resolucion' ).getValue() ) {
                    view.down( '#save' ).setDisabled( false )
                } else {
                    view.down( '#save' ).setDisabled( true )
                }
            } else {
                view.down( '#save' ).setDisabled( false )
            }
        } else {
            view.down( '#save' ).setDisabled( true )
        }
    }
},
    
    
onAlarmasExpand: function (combo ) {
    combo.getStore().load()
},
    
onVerTodosClick: function (btn ) {
    var view = btn.up( 'procesarporloteview' )
    view.down( '#dealer' ).setValue()
    view.down( '#cuentadesde' ).setValue()
    view.down( '#cuentahasta' ).setValue()
    view.down( '#codigoalarma' ).setValue()
    this.onSearchClick( btn )
},
    
onChangeObservacionesClick: function(combo, newvalue, oldvalue ) {
    var view = combo.up( 'procesarporloteview' );
    var textarea = view.down( '#obsfield' );
    textarea.setValue( newvalue );
},
    
onChangeObservaciones2Click: function(combo, newvalue, oldvalue ) {
    var view = combo.up( 'procesarporloteview' );
    var textarea = view.down( '#obsfield2' );
    textarea.setValue( newvalue );
},
onDestroy: function (view ) {
    if( view.caller.task ) {
        Ext.TaskManager.start( view.caller.task );
    }
},
	
    
 
    
loadData: function(view ) {
    var controller = this;
    var myGrid = view.down( '#eventosprocesartodo' ),
        myStore = myGrid.store;
    // view.down('#save').setDisabled(true)
    //   view.down('#espera').setDisabled(true)
    view.loading = true;
    var dealer = view.down( '#dealer' );
    var cuentaDesde = view.down( '#cuentadesde' );
    var cuentaHasta = view.down( '#cuentahasta' );
    var alarma = view.down( '#codigoalarma' );
    var filters = [];
    if( view.filters ) {
        filters = Ext.clone( view.filters )
    } else {
        //si no se pasa view.filtro solo muestros los pendientes
        filters.push( {
            property: 'rec_nestado',
            value: 0,
            id: 'rec_nestado'
        })
    }
    if( dealer.getValue() ) {
        filters.push( {
            property: 'o.cue_clinea',
            value: dealer.getValue(),
            id: 'cue_clinea'
        })
    }
    if( alarma.getValue() && alarma.getValue() != '' ) {
        const alarmaFilter = alarma.valueCollection.items.map( item =>item.get('Codigo')).join();
        filters.push( {
            property: 'rec_calarma:IN',
            value: alarmaFilter,
            id: 'rec_calarma'
        })
    }
    if( cuentaDesde.getValue() ) {
        var pad = "0000";
        var n = cuentaDesde.getValue();
        var result = ( pad + n ).slice( -pad.length );
        cuentaDesde.setValue( result )
        filters.push( {
            property: 'o.[cue_ncuenta]:GTESTRING',
            value: Ext.util.Format.trim( cuentaDesde.getValue() ),
            id: 'cuentaDesde'
        })
    }
    if( cuentaHasta.getValue() ) {
        var pad = "0000";
        var n = cuentaHasta.getValue();
        var result = ( pad + n ).slice( -pad.length );
        cuentaHasta.setValue( result )
        filters.push( {
            property: 'o.[cue_ncuenta]:LTESTRING',
            value: Ext.util.Format.trim( cuentaHasta.getValue() ),
            id: 'cuentaHasta'
        })
    }
    myStore.clearFilter( true )
    myStore.filter( filters )
    view.down( '#formularios' ).setDisabled( true )
    myStore.load( {
        callback: function( records ) {
            view.down( '#formularios' ).setDisabled( false )
            //view.onOffProcesar()
            view.loading = false;
            if( view.maskLoading ) {
                view.maskLoading.hide()
            }
            if( view.caller ) {
                view.caller.fireEvent( 'refresh', view.caller )
            }
        }
    });
},
    
/*  onBeforeload: function(store,operation,options){
    
          var view = store.view;
          
      var params = {};
      
      
      var condiciones = view.condiciones;        
      if (condiciones){
          params.CondicionCuenta = condiciones;
      }
 
      params.Estados = view.estados; 
      params.cue_clinea = view.cue_clinea;
      params.cue_ncuentaDesde = view.cue_ncuentaDesde;
      params.cue_ncuentaHasta = view.cue_ncuentaHasta;
      params.CodigosAlarma = view.CodigosAlarma;
      
      operation.params =params;
  },  */
onSearchClick: function(button, event, options ) {
    var view = button.up( 'procesarporloteview' );
    view.estados = 9;
    view.cue_clinea = view.down( '#dealer' ).getValue();
    view.cue_ncuentaDesde = view.down( '#cuentadesde' ).getValue();
    view.cue_ncuentaHasta = view.down( '#cuentahasta' ).getValue();
    view.CodigosAlarma = view.down( '#codigoalarma' ).getValue();
    this.loadData( view );
},
    
evaluarErrorResponse: function (parametros, view, controller ) {
    if( parametros.error == 1 ) {
        notify( 'Ocurrio un error al procesar todos' )
        view.maskLoading.hide();
        controller.devolverEventosAPendiente( view )
        logger.error( parametros, function() {
            console.log( 'Fue reportardo un error de ajax en LOG', parametros )
        })
        view.up( 'window' ).close();
        return false;
    }
},
    
onEsperaClick: function(button, event, options ) {
    var view = button.up( 'procesarporloteview' );
    var buttonSearch = view.down( '#search' );
    var record = view.record;
    var observaciones = view.down( '#obsfield2' ).getValue();
    var gridrecepcion = view.down( '#eventosprocesartodo' );
    var controller = this;
    var minutosEspera = view.down( '#minutosEspera' ).getValue();
    var TIEMPOENESPERA = getParametro( 'TIEMPOENESPERA', true, true );
    var TIEMPOENESPERAObj = TIEMPOENESPERA.get( '_par_cvalor' );
    if( minutosEspera < TIEMPOENESPERAObj.min || minutosEspera > TIEMPOENESPERAObj.max ) {
        notify( 'El valor de de minutos de espera supera los limites definidos en el parametro TIEMPOENESPERA' )
        return false;
    }
    var filters = []
    Ext.Array.each( gridrecepcion.store.filters.items, function( item ) {
        filters.push( {
            property: item._property,
            value: item._value
        })
    })
    view.maskLoading = Ext.create( 'Ext.LoadMask', view, {
        msg: getLocale( "Enviando a espera" )
    }).show();
    Ext.Ajax.request( {
        url: '/rest/search/EventosPendientesProcesarPorLotes',
        params: {

            rec_iMinutosEspera: minutosEspera,
            rec_idResolucion: '',
            rec_cObservaciones: observaciones,
            rec_cCategorizacion: '',
            paso: 3,
            // DEDALO se elimina por ATLAS IMPORTANTE agregar token properti en el searchobject para la propiedad token
            //token: Ext.util.Cookies.get( 'OAuth_Token' ),
            filter: Ext.JSON.encode( filters ),
            excluirOrganizacionUsuarioActual: view.excluirOrganizacionUsuarioActual

        },
        method: 'GET',
        scope: this,
        success: function( response ) {
            var parametros = Ext.JSON.decode( response.responseText );
            if( view.caller ) {
                view.caller.fireEvent( 'forceEvaluateEvent', view.caller )
            }
            view.up( 'window' ).close()
            
            if(view.caller.itemId!='tabpendientes'){
                var eventomonitoreoview =  view.caller.up('eventomonitoreoview');
                if(eventomonitoreoview)
                    eventomonitoreoview.close();
            }
            buttonSearch.fireEvent( 'click', buttonSearch );
        }
    })
},
    
onSaveClick: function(button, event, options ) {
    var view = button.up( 'procesarporloteview' );
    var record = view.record;
    var resolucion = view.down( '#categorizacion' ).getValue();
    var observaciones = view.down( '#obsfield' ).getValue();
    var categorizacion = view.down( '#resolucion' ).getValue();
    //  var cue_iid = view.caller.record.get('cue_iid');
    var gridrecepcion = view.down( '#eventosprocesartodo' )
    var controller = this;
    var filters = []
    Ext.Array.each( gridrecepcion.store.filters.items, function( item ) {
        filters.push( {
            property: item._property,
            value: item._value
        })
    })
    view.maskLoading = Ext.create( 'Ext.LoadMask', view, {
        msg: getLocale( "Procesando" )
    }).show();
    
    Ext.Ajax.request( {
        url: '/rest/search/EventosPendientesProcesarPorLotes?_dc=',
        params: {
            rec_iidPadre: view.record ? view.record.get( 'rec_iid' ) : 0,
            rec_idResolucion: resolucion,
            rec_cObservaciones: observaciones,
            rec_cCategorizacion: categorizacion,
            paso: 1,
            // rec_iidArray : procesar.join(','),
            token: Ext.util.Cookies.get( 'OAuth_Token' ),
            filter: Ext.JSON.encode( filters ),
            excluirOrganizacionUsuarioActual: view.excluirOrganizacionUsuarioActual
        },
        method: 'GET',
        scope: this,
        callback: function() {
            //envio los push
            Ext.Ajax.request( {
                url: '/handler/sendPushFromQueue',
                method: 'GET'
            });
        },
        success: function( response ) {
            var parametros = Ext.JSON.decode( response.responseText );
            if( view.closerOnFinish ) {
                notify( 'Se procesaron los eventos con exito' )
                if( view.caller ) {
                    view.caller.fireEvent( 'forceEvaluateEvent', view.caller )
                }
                view.up( 'window' ).close();
                
                if(view.caller.itemId!='tabpendientes'){
                  
                    var eventomonitoreoview =  view.caller.up('eventomonitoreoview');
                    if(eventomonitoreoview)
                        eventomonitoreoview.close();
                    if(view.caller.itemIdTabReturn=='tabpendientes'){
                       var queryTabs = Ext.ComponentQuery.query('#'+view.caller.itemIdTabReturn);
                       if(queryTabs.length>0){
                            var tabpendientes = queryTabs[0];
                            tabPanelWebRemoto = tabpendientes.up('tabpanel');
                            tabPanelWebRemoto.setActiveTab(tabpendientes);
                       }
                        
                    }                      
                }
            } else {
                controller.onSearchClick( button )
            }
        }
    })
    
},
    
    
    
onCancelClick: function(button, event, options ) {
    var view = button.up( 'procesarporloteview' );
    var controller = this;
    view.up( 'window' ).close();
}
});
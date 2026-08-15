//MIGRADO2024
Ext.define( 'Common.controller.EventosAutoRefreshController', {
    extend: 'Ext.app.Controller',
    stores: [ 'Common.store.EventoEstadoStore' ],
models: [ 'ConexionesModel', 'EventosTiempoRealModel', 'TablasGruposSearchModel', 'SoftguardCodigoAlarmaModel', 'ComboEventosModel', 'TablasCodigosAlarmaSearchModel' ],
views: [ 'EventosAutoRefreshView' ],
init: function(config ) {
    this.control( {
        'eventosautorefreshview': {
            afterrender: this.initView,
            renderManual: this.initView,
            activate: this.onActivate,
            itemdblclick: this.onItemClick,
            openEvent: this.onItemClick
        },
        'eventosautorefreshview button[action=search]': {
            click: this.onBuscarClick
        },
        'eventosautorefreshview #comboEstados': {
            //	select : this.onComboSelect
        },
        'eventosautorefreshview #comboOrigenes': {
            //	select : thizs.onComboSelect
        },
        'eventosautorefreshview #comboTipos': {
            //	select : this.onComboSelect
        },
        'eventosautorefreshview #dealer': {
            //	change : this.onComboSelect
        },
        'eventosautorefreshview button[action=play]': {
            click: this.onPlayClick
        },
        'eventosautorefreshview button[action=stop]': {
            click: this.onStopClick
        },
        'eventosautorefreshview button[action=groupAlarmas]': {
            click: this.onGroupAlarmasClick
        },
        'eventosautorefreshview button[action=groupPrioridad]': {
            click: this.onGroupPrioridadClick
        },
        'eventosautorefreshview button[action=groupCuenta]': {
            click: this.onGroupCuentaClick
        },
        'eventosautorefreshview #grupos': {
            select: this.onGrupoChange//,
            //  change : this.onGrupoChangeClear
        },
        'eventosautorefreshview #dealer': {
            //	change : this.onDealerChange
        },
        'eventosautorefreshview #grupos-excluir': {
            //	select : this.onGrupoExcluirChange,
            //  change : this.onGrupoExcluirChangeClear
        },
        'eventosautorefreshview #procesartodosfull': {
            click: this.onProcesarTodosFullClick
        },
        'eventosautorefreshview button[action=soloAlarmas]': {
            click: this.onSoloAlarmasClick
        },
        'eventosautorefreshview #clearfilters': {
            click: this.onClearFiltersClick
        }


    });
}, // cierro init


initView: function(view ) {
    var me = this;
    var viewport = view.up( '#viewport' );
    var estados = view.down( '#comboEstados' );
    var mygrid = view;
    var record = view.record;

    if( !view.interval || view.interval == 0 )
        view.interval = 10000;

    if( view.hideProcessOperations ) { }

    if( view.showEvents ) {
        view.down( '#comboalarmas' ).hide()
    }

    if( view.showEvents ) {
        view.down( '#comboConexion' ).hide()
    }
    if( view.Origenes ) {
        view.down( '#comboOrigenes' ).hide()
    }


    //veo que filtros vienen
    //ORIGENES
    me.popularFiltro( view.down( '#comboOrigenes' ), view.showOrigenes );

    //ESTADOS
    me.popularFiltro( view.down( '#comboTipos' ), view.showTipo );

    //PRIORIDADES
    me.popularFiltro( view.down( '#prioridad' ), view.showPrioridad );


    var comboGrupos = view.down( '#grupos' );
    var combostore = Ext.create( 'Ext.data.Store', {
        model: this.getTablasGruposSearchModelModel(),
        pageSize: 200,
        remoteSort: true
    });

    comboGrupos.bindStore( combostore );
    combostore.load( {
        callback: function() {
            //GRUPOS
            me.popularFiltro( view.down( '#grupos' ), view.showGrupo, 'gru_ccodigo' );
        }
    });


    if( view.hiddenDealerFilter ) {
        view.down( '#dealer' ).hide();
    }

    var estadoStore = this.getEventoEstadoStoreStore();
    estados.bindStore( deepCloneStore( estadoStore ) );


    //estados.setValue(view.estados?view.estados:[0,1,2,4,9]);

    if( view.showprocesartodos ) {
        view.down( '#procesartodosfull' ).show();
    }

    if( ( view.estados || view.estados == 0 ) ) {
        estados.setValue( view.estados );
        estados.hide();
    } else {
        //estados.setValue([0,1,2,4,9]);
        estados.show();
    }


    if( view.showEstadosFilter ) {
        var estadoStore = estados.getStore();

        estadoStore.filterBy( function( record ) {
            return Ext.Array.contains( view.estados, record.get( 'Value' ) )
        })
        estados.setValue( view.estados );
        estados.show();
    }


    // si le pasaron una cuenta la agrega al filtro

    if( view.record ) {
        view.Cuentas = view.record.get( 'cue_iid' );
        view.down( 'gridcolumn[dataIndex="rec_iidcuenta"]' ).hide();
    }


    var comboGruposExcluir = view.down( '#grupos-excluir' );

    comboGruposExcluir.bindStore( combostore );

    combostore.load();


    var storeComboAlarmas = Ext.create( 'Ext.data.Store', {
        model: this.getSoftguardCodigoAlarmaModelModel(),
        pageSize: 500,
        remoteSort: false,
        remoteFilter: false,
        filters: [

        ]
    })
    view.down( '#comboalarmas' ).bindStore( storeComboAlarmas );
    storeComboAlarmas.load();


    var storeComboConexiones = Ext.create( 'Ext.data.Store', {
        model: this.getConexionesModelModel(),
        pageSize: 500,
        remoteSort: false,
        remoteFilter: false,
        filters: [

        ]
    });
    view.down( '#comboConexion' ).bindStore( storeComboConexiones );
    storeComboConexiones.load();
    //****************************
    view.headerCt.purgeCache();




    var combo = view.down( '#feventos' );

    if( combo ) { // daba error porque no encontraba el combo, emparcho (dedalo)
        var combostoreeventos = Ext.create( 'Ext.data.Store', {
            model: this.getComboEventosModelModel()
        });

        combo.bindStore( combostoreeventos );

        var eventos = getParametro( 'CODALRFALLAAC' );
        eventos = eventos.split( '|' ).join();
        combostoreeventos.add( { 'field1': eventos, 'field2': getLocale( 'Fallo de energía' ) });


        Ext.Ajax.request( {
            url: '/rest/search/CodigosFalloTest',
            method: 'GET',
            success: function( response, action ) {
                var json = Ext.JSON.decode( response.responseText );
                var objects = json.rows;

                var eventos = Ext.Array.pluck( objects, "tst_cAlarma" ).join();

                combostoreeventos.add( { 'field1': eventos, 'field2': getLocale( 'Fallo de enlace' ) });
            }
        });

        combostoreeventos.add( { 'field1': 'LOW', 'field2': getLocale( 'Batería baja' ) });

        combostoreeventos.add( { 'field1': 'OVF,CVF,OSA,OPF,CSA,CLF,NYO,NYC', 'field2': getLocale( 'Apertura y cierres fuera de horario' ) });
    }

    // esta url la encontre comentada pero se usa mas abajo!
    var url = '/Rest/Security/Modules/2/Security';

    var sorters = [
        {
            property: 'r.rec_tfechahora',
            direction: 'DESC',
            id: 'rec_tfechahora'
        }
    ];

    if( view.sorters ) {
        sorters = view.sorters;
    }

    view.me = this;

    var titleOriginal = view.title

    var CANTIDADMAXHISTORICO = getParametro( 'CANTIDADMAXHISTORICO' );

    // CANTIDADMAXHISTORICO = CANTIDADMAXHISTORICO>300:300?CANTIDADMAXHISTORICO;
    if( CANTIDADMAXHISTORICO > 300 ) {
        CANTIDADMAXHISTORICO = 300
    }

    view.mostrar = CANTIDADMAXHISTORICO;

    var mystore = Ext.create( 'Ext.data.Store', {
        model: this.getEventosTiempoRealModelModel(),
        remoteGroup: false,
        remoteSort: true,
        remoteFilter: true,
        autoDestroy: true,
        limit: CANTIDADMAXHISTORICO,
        pageSize: CANTIDADMAXHISTORICO,
        listeners: {
            beforeload: me.onBeforeload,
            load: function( store ) {
                //en cada oportunidad que se hace load del store emito un evento
                view.fireEvent( 'storeLoaded', view, mystore );
                view.loadingGrid = false;
            }
        },
        sorters: sorters
    });

    mygrid.bindStore( mystore );
    mystore.grid = mygrid;
    mystore.view = view;

    if( view.noRefresh ) {
        view.down( '#play' ).hide()
        view.down( '#stop' ).hide()
    } else {
        view.task = Ext.TaskManager.start( {
            args: [ view, this ],
            run: this.loadData,
            interval: view.interval
        });
    }

},

    
onClearFiltersClick: function(button, event, options ) {
    var view = button.up( 'eventosautorefreshview' );

    if( view.down( '#comboOrigenes' ) && view.down( '#comboOrigenes' ).isVisible() ) {
        view.down( '#comboOrigenes' ).setValue( '' );
    }
    if( view.down( '#comboTipos' ) && view.down( '#comboTipos' ).isVisible() ) {
        view.down( '#comboTipos' ).setValue( '' );
    }
    if( view.down( '#grupos' ) && view.down( '#grupos' ).isVisible() ) {
        view.down( '#grupos' ).setValue( '' );
    }
    if(view.grupoOptions){
        view.grupoOptions = '';
    }
    if( view.down( '#dealer' ) && view.down( '#dealer' ).isVisible() ) {
        view.down( '#dealer' ).setValue( '' );
    }
    if( view.down( '#grupos-excluir' ) && view.down( '#grupos-excluir' ).isVisible() ) {
        view.down( '#grupos-excluir' ).setValue( '' );
    }
    if( view.down( '#comboEstados' ) && view.down( '#comboEstados' ).isVisible() ) {
        view.down( '#comboEstados' ).setValue( '' );
    }
    if( view.down( '#comboalarmas' ) && view.down( '#comboalarmas' ).isVisible() ) {
        view.down( '#comboalarmas' ).setValue( '' );
    }
    if( view.down( '#prioridad' ) && view.down( '#prioridad' ).isVisible() ) {
        view.down( '#prioridad' ).setValue( '' );
    }
    if( view.down( '#fechadesde' ) && view.down( '#fechadesde' ).isVisible() ) {
        view.down( '#fechadesde' ).setValue( '' );
    }
    if( view.down( '#fechahasta' ) && view.down( '#fechahasta' ).isVisible() ) {
        view.down( '#fechahasta' ).setValue( '' );
    }
    if( view.down( '#cuenta' ) && view.down( '#cuenta' ).isVisible() ) {
        view.down( '#cuenta' ).setValue( '' );
    }
    if( view.down( '#comboConexion' ) && view.down( '#comboConexion' ).isVisible() ) {
        view.down( '#comboConexion' ).setValue( '' );
    }

    if( view.down( '#feventos' ) && view.down( '#feventos' ).isVisible() ) {
        view.down( '#feventos' ).setValue( '' );
    }

    var view = button.up( 'eventosautorefreshview' );
    this.loadData( view );
},
    
onSoloAlarmasClick: function(button, event, options ) {
    var view = button.up( 'eventosautorefreshview' );
    this.loadData( view );
},
    
    
onDealerChange: function(field, newValue, oldValue ) {
    var view = field.up( 'eventosautorefreshview' );

    if( newValue != '' ) {

        view.grupoOptions = '';
        this.loadData( view );

    }

},
    
    
onGrupoChangeClear: function (field, newValue, oldValue ) {
    var view = field.up( 'eventosautorefreshview' );
    if( newValue == '' ) {
        view.grupoOptions = '';
        this.loadData( view );
    }

},
    
onGrupoExcluirChangeClear: function (field, newValue, oldValue ) {
    var view = field.up( 'eventosautorefreshview' );
    if( newValue == '' ) {
        view.grupoOptions = '';
        this.loadData( view );
    }

},

onActivate: function(view ) {
    this.loadData( view );
},
    
popularFiltro: function (comboObj, itemsEnambled, fieldValueName ) {

    if( itemsEnambled ) {
        var fieldValueName = typeof fieldValueName !== 'undefined' ? fieldValueName : 'Value';
        var combo = comboObj;
        var comboStore = combo.getStore();

        var clone = deepCloneStore( comboStore );
        comboStore.removeAll();
        var arrValues = [];
        Ext.Array.each( clone.data.items, function( record ) {
            //console.log(record.get(fieldValueName),itemsEnambled)
            if( Ext.Array.contains( itemsEnambled.split( ',' ), record.get( fieldValueName ).toString() ) ) {
                comboStore.add( record );
                arrValues.push( record )
            }

        })
        combo.setValue( arrValues );
    }

},

	
    
onGrupoChange: function(combo, records, options ) {
    var view = combo.up( 'eventosautorefreshview' );

    var value = records[ 0 ].get( 'gru_ccodigo' );
    var t = this;

    var codigosAlarmaStore = Ext.create( 'Ext.data.Store', {
        model: this.getTablasCodigosAlarmaSearchModelModel(),
        pageSize: 200,
        remoteSort: true,
        remoteFilter: true,
        filters: [
            {
                property: 'cod_cGrupo',
                value: value
            }
        ]
    });

    view.grupoOptions = '';

    codigosAlarmaStore.load( {
        callback: function( records, opciones, success ) {
            if( opciones.success ) {
                Ext.Object.each( records, function( key, value ) {

                    //console.log(value.get('cod_ccodigo'));
                    if( key != 0 ) {
                        view.grupoOptions += ',';
                    }

                    view.grupoOptions += value.get( 'cod_ccodigo' );

                });


                if( options.eventos != '' ) {
                    t.loadData( view );
                } else {
                    notifyError( 'No hay códigos de alarma en este grupo' );

                }

            }
        }
    });

},

onGrupoExcluirChange: function(combo, records, options ) {
    var view = combo.up( 'eventosautorefreshview' );

    var value = records[ 0 ].get( 'gru_ccodigo' );
    var t = this;

    var codigosAlarmaStore = Ext.create( 'Ext.data.Store', {
        model: this.getTablasCodigosAlarmaSearchModelModel(),
        pageSize: 200,
        remoteSort: true,
        remoteFilter: true,
        filters: [
            {
                property: 'cod_cGrupo:NOT IN',
                value: value
            }
        ]
    });

    view.grupoOptions = '';

    codigosAlarmaStore.load( {
        callback: function( records, opciones, success ) {
            if( opciones.success ) {
                Ext.Object.each( records, function( key, value ) {

                    //console.log(value.get('cod_ccodigo'));
                    if( key != 0 ) {
                        view.grupoOptions += ',';
                    }

                    view.grupoOptions += value.get( 'cod_ccodigo' );

                });


                if( options.eventos != '' ) {
                    t.loadData( view );
                } else {
                    notifyError( 'No hay códigos de alarma en este grupo' );
                }
            }
        }
    });

},
    
onComboSelect: function( combo, records, eOpts ) {
    var view = combo.up( 'eventosautorefreshview' );
    this.loadData( view );
},

onBuscarClick: function(button, event, options ) {
    var view = button.up( 'eventosautorefreshview' );
    this.loadData( view );
},
    
onPlayClick: function(button, event, options ) {
    var view = button.up( 'eventosautorefreshview' );
    var task = view.task;
    Ext.TaskManager.start( task );
},
    
onStopClick: function(button, event, options ) {
    var view = button.up( 'eventosautorefreshview' );
    var task = view.task;
    Ext.TaskManager.stop( task );
},
    
onGroupAlarmasClick: function(button, event, options ) {
    var view = button.up( 'eventosautorefreshview' );
    var myGrid = view,
        myStore = myGrid.store;

    if( button.pressed ) {
        myStore.group( 'rec_calarma' );
    } else {
        myStore.clearGrouping();
    }

},
    
onGroupCuentaClick: function(button, event, options ) {
    var view = button.up( 'eventosautorefreshview' );
    var myGrid = view,
        myStore = myGrid.store;

    if( button.pressed ) {
        myStore.group( 'rec_iidcuenta' );
    } else {
        myStore.clearGrouping();
    }

},
    
onGroupPrioridadClick: function(button, event, options ) {
    var view = button.up( 'eventosautorefreshview' );
    var myGrid = view,
        myStore = myGrid.store;

    if( button.pressed ) {
        myStore.group( 'rec_iPrioridad' );
    } else {
        myStore.clearGrouping();
    }

},

loadData: function(view, showMask ) {
    var controller = this;
    var myGrid = view,
        myStore = myGrid.store;
    if( !view.loadingGrid && view.isVisible() ) {
        view.loadingGrid = true;
        myStore.load( {
            callback: function( records, operation ) {
                view.loadingGrid = false;
            }
        });
    }
    console.log( "ENTRE" );
},
    
onBeforeload: function(store, operation, options ) {
    console.log( "onBeforeload" )
    if( operation.scope )
        var view = operation.scope;
    else
        var view = store.view;

    var params = {};
    var estados = view.down( '#comboEstados' );
    var origenes = view.down( '#comboOrigenes' );
    var tipos = view.down( '#comboTipos' );
    var alarma = view.down( '#comboalarmas' );
    var conexion = view.down( '#comboConexion' );
    var dealer = view.down( '#dealer' );
    var prioridad = view.down( '#prioridad' );
    var fechadesde = view.down( '#fechadesde' );
    var fechahasta = view.down( '#fechahasta' );
    var cuenta = view.down( '#cuenta' );

    var comboeventos = view.down( '#feventos' );
    var gruposExcluir = view.down( '#grupos-excluir' ).getValue();

    //solo trae los codigos de alalrma que tiene en 1
    params.cod_nMultiMonitor = 1;


    var fehcadesdeValue = '';
    if( fechadesde && fechadesde.getValue() != '' ) {
        fehcadesdeValue = fechadesde.getValue();
    }


    if( view.FechaDesde ) {
        fehcadesdeValue = view.FechaDesde;
    }


    var fehcahastaValue = '';
    if( fechahasta && fechahasta.getValue() != null ) {
        fehcahastaValue = fechahasta.getValue();
        fehcahastaValue = Ext.Date.add( fehcahastaValue, Ext.Date.DAY, 1 );
    } else if( view.FechaHasta ) {
        fehcahastaValue = view.FechaHasta;
    }


    /// HAY QUE REVISAR ESTE CONDICIONAL 
    var cuentaValue = '';
    if( cuenta && cuenta.getValue() != null && cuenta.getValue() != "" ) {
        cuentaValue = cuenta.getValue();
    }
    /*else if(view.FechaHasta) {
        cuentaValue = view.Cuentas;
    }*/

    //// REVISARRR CONDICIONAL


    if( view.Cuentas ) {
        params.Cuentas = view.Cuentas;
    }

    var condiciones = view.condiciones;

    if( condiciones ) {
        params.CondicionCuenta = condiciones;
    }

    //params.Alertas = alarma;
    if (origenes && origenes.getValue()){
        params.Origenes = origenes.getValue().join();
    }
   


    if( view.est_nestado != null ) {
        params.est_nestado = view.est_nestado
    }

    if( view.Origenes ) {
        params.Origenes = view.Origenes;
    }


    if( estados ) {
        params.Estados = estados.getValue().join();
    }

    if (tipos && tipos.getValue()){
        params.Tipos = tipos.getValue().join();
    }



    if( view.showEvents ) {
        params.CodigosAlarma = view.showEvents
    } else {
        let codigoAlarma = "";
        if( comboeventos && comboeventos.getValue() ) {
            try {
                if( codigoAlarma.length > 0 ) {
                    codigoAlarma = codigoAlarma + "," + comboeventos.getValue().join();
                } else {
                    codigoAlarma = comboeventos.getValue()
                }

            } catch( error ) {
                codigoAlarma = comboeventos.getValue();
                if( codigoAlarma.length > 0 ) {
                    codigoAlarma = codigoAlarma + "," + comboeventos.getValue();
                } else {
                    codigoAlarma = comboeventos.getValue()
                }
            }
        }

        if( alarma && alarma.getValue() ) {
            try {
                if( codigoAlarma.length > 0 ) {
                    codigoAlarma = codigoAlarma + "," + alarma.getValue().join();
                } else {
                    codigoAlarma = alarma.getValue();
                }
            } catch( error ) {
                if( codigoAlarma.length > 0 ) {
                    codigoAlarma = codigoAlarma + "," + alarma.getValue();
                } else {
                    codigoAlarma = alarma.getValue();
                }
            }
        }
        params.CodigosAlarma = codigoAlarma;
    }
    if( view.showEvents ) {
        params.iConexion = view.showEvents
    } else {
        if( conexion && conexion.getValue() ) {
            params.iConexion = conexion.getValue();
        } /* else if (alarma) {
                params.iConexion = alarma.getValue().join();    
            }*/
    }

    if( view.grupoOptions ) {
        params.CodigosAlarma = view.grupoOptions;
    }

    if( view.filterTipo ) {
        options.tipocuenta = view.filterTipo;
        params.tipocuenta = options.tipocuenta;
    }

    if( view.short = 1 ) {
        params.short = 1;
    }

    if( dealer ) {
        params.cue_clinea = dealer.getValue();
    }

    if (prioridad && prioridad.getValue()){
        params.Prioridad = prioridad.getValue().join();
    }
    
    params.cue_ncuenta = cuentaValue;
    params.Operador = view.operador ? view.operador : '';
    params.OperadorNot = view.operadorNOT ? view.operadorNOT : '';

    params.Mostrar = view.mostrar ? view.mostrar : 0;

    params.FechaDesde = fehcadesdeValue;
    params.FechaHasta = fehcahastaValue;

    params.cod_cgrupoExcluir = gruposExcluir;

    params.extramonth = false;

    const proxy = store.getProxy();
    proxy.setExtraParams(params);
},
    
onItemClick: function(grid, record, item, index, e, options ) {
    // piso el record para que funque con los grupos
    //var record = grid.getStore().data.getByKey(item.viewRecordId);
    var view = grid.up( 'eventosautorefreshview' ) ? grid.up( 'eventosautorefreshview' ) : grid;
    var panel = view.targetTab ? view.targetTab : Ext.getCmp( 'center' );
    /* var title = record.get('cue_clinea')+'-'+
         record.get('cue_ncuenta')+' > '+
         record.get('rec_calarma')+'-'+
         record.get('cod_cdescripcion');*/
    //+' ('+Ext.Date.format(record.get('rec_isoFechaHora'),'D d-m-Y G:i:s')+')';
    var title = record.get( 'cue_clinea' ) + '-' +
        Ext.util.Format.trim( record.get( 'cue_ncuenta' ) ) + ' ' +
        Ext.Date.format( new Date( record.get( 'rec_isoFechaHora' ) ), 'D d-m-Y G:i:s' );

    if( record.get( "cue_nparticion" ) != 0 ) {
        title += ' ' + getLocale( 'PARTICIONADA' );
    }

    var type = view.eventEditor ? view.eventEditor : 'eventoview';
    var icon = '/handler/getImage?u=/images/codala/' + record.get( 'rec_calarma' ) + '.png';

    //console.log(panel.operador);

    var widget = Ext.widget( type, {
        title: title,
        tabConfig: { translate: false },
        translate: false,
        header: false,
        record: record,
        icon: icon,
        closeAction: 'destroy',
        operador: view.operador,
        nombreEvento: view.nombreEvento,
        hideProcessOperations: view.hideProcessOperations ? view.noVerifyAssignedUser : false,
        noVerifyAssignedUser: view.noVerifyAssignedUser ? view.noVerifyAssignedUser : false,
        showSmsSender: view.showSmsSender ? view.showSmsSender : false,
        caller: view,
        condiciones: view.condiciones,
        tabConfig: {
            style: "color: " + record.txtColor + " !important; background-color: " + record.backColor + " !important;background-image: none !important"
        },
        tabPanelParent: panel

    })

    //la doble vista me obliga ir a buscar el titulo al parent
    panel.returnTab = view.returnTab ? view.returnTab : view.title;

    if( view.eventTarget == 'tab' ) {
        var newTab = panel.down( '[title="' + title + '"]' );
        if( !newTab ) {
            widget.closable = false;
            var tab = panel.add( widget );
            // armo el color de la paleta
            panel.setActiveTab( tab );
        } else {
            panel.setActiveTab( newTab );
        }

        if( panel.up( 'tabpanel' ) ) {
            panel.up( 'tabpanel' ).setActiveTab( panel );
        }


    } else {
        Ext.widget( 'window', {
            title: title,
            translate: false,
            closable: true,
            autoShow: true,
            closeAction: 'destroy',
            width: 900,
            height: 500,
            layout: 'fit',
            items: [ widget ]
        });
    }
}
});
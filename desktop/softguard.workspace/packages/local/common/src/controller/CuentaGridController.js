//MIGRADO2024
Ext.define( 'Common.controller.CuentaGridController', {
    extend: 'Ext.app.Controller',
    stores: [ 'Common.store.SiNoStore', 'Common.store.WebDealerSecurityModulesStore', 'Common.store.ProvinciasStore' ],
models: [ 'SoftguardTablaPanelesModel', 't_provinciasSearchModel', 'TablaTipoServicioModel', 'CuentaTipoSearchModel', 'TablasPanelesSearchModel', 'CuentaAwccSearchModel', 'CuentaSearchModel', 'CantidadCuentaGroupByTipoSearchModel' ],
models: [ 'CuentaSearchModel', 'SoftguardTablaPanelesModel', 'CuentaTipoSearchModel', 'TablasPanelesSearchModel', 't_provinciasSearchModel', 'CantidadCuentaGroupByTipoSearchModel', 'CuentaAwccSearchModel', 'TablaTipoServicioModel' ],
views: [ 'Common.view.CuentaGridView' ],

init: function(config ) {
    // genero los eventos
    this.control( {
        'cuentagridview': {
            afterrender: this.initView,
            itemdblclick: this.onItemClick,
            objectedit: this.onObjectEdit,
            objectcreated: this.onCuentaCreated,
            mostrarEventos: this.onMostrarEventos,
            selectionchange: this.onSelectionChange,
            openNew: this.onCrearcuentaClick
        },
        'cuentagridview button[action=filterFalloTest]': {
            click: this.onFalloTestClick
        },
        'cuentagridview button[action=filterFalloAC]': {
            click: this.onFalloACClick
        },
        'cuentagridview button[action=filterHabilitadas]': {
            click: this.onHabilitadasClick
        },
        'cuentagridview button[action=filterNoHabilitadas]': {
            click: this.onNoHabilitadasClick
        },
        'cuentagridview button[action=filterEnprueba]': {
            click: this.onEnpruebaClick
        },
        'cuentagridview button[action=filterEliminar]': {
            click: this.onEliminarClick
        },
        'cuentagridview button[action=filterAlarmas]': {
            click: this.onAlarmaClick
        },
        'cuentagridview button[action=removefilter]': {
            click: this.onRemovefilterClick
        },
        'cuentagridview button[action=filterText]': {
            click: this.onFiltertextClick
        },
        'cuentagridview button[action=limpiarText]': {
            click: this.onLimpiarTextClick
        },
        'cuentagridview button[action=crearCuenta]': {
            click: this.onCrearcuentaClick
        },
        'cuentanewview': {
            objectcreated: this.onCuentaCreated
        },
        'cuentagridview button[action=export]': {
            click: this.onExportarClick
        },
        'cuentagridview button[action=particiones]': {
            click: this.onParticionesClick
        },
        'cuentagridview #filiacion': {
            click: this.onFiliacionClick
        },
        'cuentagridview #btnActivados': {
            click: this.onActivadosClick
        },
        'cuentagridview #btnDesactivados': {
            click: this.onDesactivadosClick
        },
        'cuentagridview #comboProvincia': {
            change: this.onChangeProvincia
        },
        /**
         * BC
         */
        '#exportarWindow': {
            afterrender: this.checkPermission
        }
    });
}, //

onChangeProvincia: function(combo ) {
    const filterValue = combo.getRawValue().toLowerCase().normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" );
    const store = combo.getStore();

    if( !filterValue ) {
        store.clearFilter();
        return;
    }

    store.clearFilter(); // Limpia cualquier filtro anterior

    store.filterBy( record => {
        const recordValue = record.get( 'pro_cdescripcion' ).toLowerCase().normalize( "NFD" ).replace( /[\u0300-\u036f]/g, "" );
        return recordValue.includes( filterValue );
    });
},

onActivadosClick: function (btn ) {
    var controller = this;
    var view = btn.up( 'cuentagridview' );

    var filters = [];
    filters.push( {
        property: 'sta_nestado',
        value: 0,
        id: 'sta_nestado'
    });

    view.storeCuenta.remoteFilter = false;
    view.storeCuenta.filter( filters, true );
    view.storeCuenta.remoteFilter = true;

    view.storeCuenta.load( {
        callback: function() {

            Ext.Array.each( view.query( 'button' ), function( btn ) { btn.toggle( false ) });

            if( view.caller ) {
                /**
                 * Evento que filtra por Activados en AWCC, realizan la modificación en el mapa y carga la información
                 * 11/04/2019 : se realiza un nuevo fireEvent para la re-carga del mapa con este filtro                 * 
                 */
                view.down( '#btnActivados' ).toggle( true );
                controller.onFiltertextClick( btn );
            }

            //view.getSelectionModel().selectAll();

            view.down( '#filtro' ).hideMenu();

            view.readySelectedAll = false

        }
    })

},
    
onDesactivadosClick: function (btn ) {
    var controller = this;
    var view = btn.up( 'cuentagridview' );

    var filters = [];
    filters.push( {
        property: 'sta_nestado',
        value: 1,
        id: 'sta_nestado'
    });

    view.storeCuenta.remoteFilter = false;
    view.storeCuenta.filter( filters, true );
    view.storeCuenta.remoteFilter = true;
    view.storeCuenta.load( {
        callback: function() {
            Ext.Array.each( view.query( 'button' ), function( btn ) { btn.toggle( false ) });
            if( view.caller ) {
                /**
                 * Evento que filtra por Activados en AWCC, realizan la modificación en el mapa y carga la información
                 * 11/04/2019 : se realiza un nuevo fireEvent para la re-carga del mapa con este filtro                 * 
                 */
                view.down( '#btnDesactivados' ).toggle( true );
                controller.onFiltertextClick( btn );
            }
            //view.getSelectionModel().selectAll();
            view.down( '#filtro' ).hideMenu();
            view.readySelectedAll = false

        }
    })
},
    
onFiliacionClick: function (btn, sacarFallo ) {
    var view = btn.up( 'cuentagridview' );
    if( btn.pressed ) {
        view.stateId = 'Common' + '_' + 'cuentagridview_filiacion';
        //saco filtro fallo
        if( view.down( '#fallotst' ).pressed && sacarFallo != false ) {
            view.down( '#fallotst' ).toggle( false )
            this.onFalloTestClick( view.down( '#fallotst' ), false )
        }

        if( view.down( "gridcolumn[dataIndex=nvs_nNivel]" ) ) {
            view.down( "gridcolumn[dataIndex=nvs_nNivel]" ).setVisible( false )
        }

        //view.columns[4].setVisible(false);  
        
        if( view.down( "gridcolumn[dataIndex=Situacion]" ) ) {
            view.down( "gridcolumn[dataIndex=Situacion]" ).setVisible( false )
        }

        //view.columns[5].setVisible(false);
        if( view.down( "gridcolumn[dataIndex=act_nestado]" ) ) {
            view.down( "gridcolumn[dataIndex=act_nestado]" ).setVisible( false )
        }
        //view.columns[6].setVisible(false);
        if( view.down( "gridcolumn[dataIndex=cue_cIMEI]" ) ) {
            view.down( "gridcolumn[dataIndex=cue_cIMEI]" ).setVisible( false )
        }

        //view.columns[8].setVisible(false);
        if( view.down( "gridcolumn[dataIndex=sta_dfechautimaalarma]" ) ) {
            view.down( "gridcolumn[dataIndex=sta_dfechautimaalarma]" ).setVisible( false )
        }

        if( view.down( "gridcolumn[dataIndex=sta_cultimaalarma]" ) ) {
            view.down( "gridcolumn[dataIndex=sta_cultimaalarma]" ).setVisible( false )
        }
        //view.columns[8].setVisible(false);
        if( view.down( "gridcolumn[dataIndex=sta_dfechautimaalarma]" ) ) {
            view.down( "gridcolumn[dataIndex=sta_dfechautimaalarma]" ).setVisible( false )
        }

        if( view.down( "gridcolumn[dataIndex=cue_cUltimaAlarmaRecibida]" ) ) {
            view.down( "gridcolumn[dataIndex=cue_cUltimaAlarmaRecibida]" ).setVisible( false )
        }

        if( view.down( "gridcolumn[dataIndex=cue_dFechaUltimaAlarmaRecibida]" ) ) {
            view.down( "gridcolumn[dataIndex=cue_dFechaUltimaAlarmaRecibida]" ).setVisible( false )
        }

        //view.columns[9].setVisible(false);
        if( view.down( "gridcolumn[dataIndex=gps_tfechahora]" ) ) {
            view.down( "gridcolumn[dataIndex=gps_tfechahora]" ).setVisible( false )
        }
        //view.columns[10].setVisible(false);
        if( view.down( "gridcolumn[dataIndex=sta_dfechaultimotst]" ) ) {
            view.down( "gridcolumn[dataIndex=sta_dfechaultimotst]" ).setVisible( false )
        }

        if( view.down( "gridcolumn[dataIndex=sta_cultimaalerta]" ) ) {
            view.down( "gridcolumn[dataIndex=sta_cultimaalerta]" ).setVisible( false )
        }

        if( view.down( "gridcolumn[dataIndex=sta_dFechaUltimaAlerta]" ) ) {
            view.down( "gridcolumn[dataIndex=sta_dFechaUltimaAlerta]" ).setVisible( false )
        }


        //view.columns[11].setVisible(false);
        if( view.down( "gridcolumn[dataIndex=cue_provincia]" ) ) {
            view.down( "gridcolumn[dataIndex=cue_provincia]" ).setVisible( false )
        }
        //view.columns[12].setVisible(true);
        if( view.down( "gridcolumn[dataIndex=cue_clocalidad]" ) ) {
            view.down( "gridcolumn[dataIndex=cue_clocalidad]" ).setVisible( true )
        }
        //view.columns[13]
        if( view.down( "gridcolumn[dataIndex=cue_ccalle]" ) ) {
            view.down( "gridcolumn[dataIndex=cue_ccalle]" ).setVisible( true )
        }
        //view.columns[14]
        if( view.down( "gridcolumn[dataIndex=cue_ctelefono]" ) ) {
            view.down( "gridcolumn[dataIndex=cue_ctelefono]" ).setVisible( true )
        }

    } else {
        view.stateId = 'Common' + '_' + 'cuentagridview';

        if( view.down( "gridcolumn[dataIndex=nvs_nNivel]" ) ) {
            view.down( "gridcolumn[dataIndex=nvs_nNivel]" ).setVisible( true )
        }

        if( view.down( "gridcolumn[dataIndex=Situacion]" ) ) {
            view.down( "gridcolumn[dataIndex=Situacion]" ).setVisible( true )
        }
        //view.columns[5].setVisible(true);
        if( view.down( "gridcolumn[dataIndex=act_nestado]" ) ) {
            view.down( "gridcolumn[dataIndex=act_nestado]" ).setVisible( true )
        }
        //view.columns[6].setVisible(true);
        if( view.down( "gridcolumn[dataIndex=cue_cIMEI]" ) ) {
            view.down( "gridcolumn[dataIndex=cue_cIMEI]" ).setVisible( true )
        }
        //view.columns[7].setVisible(true);
        if( view.down( "gridcolumn[dataIndex=sta_cultimaalarma]" ) ) {
            view.down( "gridcolumn[dataIndex=sta_cultimaalarma]" ).setVisible( true )
        }
        // view.columns[8].setVisible(true);
        if( view.down( "gridcolumn[dataIndex=sta_dfechautimaalarma]" ) ) {
            view.down( "gridcolumn[dataIndex=sta_dfechautimaalarma]" ).setVisible( true )
        }

        if( view.down( "gridcolumn[dataIndex=cue_cUltimaAlarmaRecibida]" ) ) {
            view.down( "gridcolumn[dataIndex=cue_cUltimaAlarmaRecibida]" ).setVisible( true )
        }

        if( view.down( "gridcolumn[dataIndex=cue_dFechaUltimaAlarmaRecibida]" ) ) {
            view.down( "gridcolumn[dataIndex=cue_dFechaUltimaAlarmaRecibida]" ).setVisible( true )
        }

        //view.columns[9].setVisible(true);
        if( view.down( "gridcolumn[dataIndex=gps_tfechahora]" ) ) {
            view.down( "gridcolumn[dataIndex=gps_tfechahora]" ).setVisible( true )
        }
        //view.columns[10].setVisible(true);
        if( view.down( "gridcolumn[dataIndex=sta_dfechaultimotst]" ) ) {
            view.down( "gridcolumn[dataIndex=sta_dfechaultimotst]" ).setVisible( true )
        }


        if( view.down( "gridcolumn[dataIndex=sta_cultimaalerta]" ) ) {
            view.down( "gridcolumn[dataIndex=sta_cultimaalerta]" ).setVisible( true )
        }

        if( view.down( "gridcolumn[dataIndex=sta_dFechaUltimaAlerta]" ) ) {
            view.down( "gridcolumn[dataIndex=sta_dFechaUltimaAlerta]" ).setVisible( true )
        }

        //view.columns[11].setVisible(true);
        if( view.down( "gridcolumn[dataIndex=cue_provincia]" ) ) {
            view.down( "gridcolumn[dataIndex=cue_provincia]" ).setVisible( true )
        }

        //view.columns[12].setVisible(false);
        if( view.down( "gridcolumn[dataIndex=cue_clocalidad]" ) ) {
            view.down( "gridcolumn[dataIndex=cue_clocalidad]" ).setVisible( false )
        }

        /*if(view.columns[13]) {
            view.columns[13].setVisible(false);
        }*/
        if( view.down( "gridcolumn[dataIndex=cue_ccalle]" ) ) {
            view.down( "gridcolumn[dataIndex=cue_ccalle]" ).setVisible( false )
        }
        /*if(view.columns[14]) {
            view.columns[14].setVisible(false); 
        } */
        if( view.down( "gridcolumn[dataIndex=cue_ctelefono]" ) ) {
            view.down( "gridcolumn[dataIndex=cue_ctelefono]" ).setVisible( false )
        }
    }
    this.evaluarColumnasHide( view );
},

/**
 * BC 389356119 : Funcion creada para cuando se llame a la VIEW con la propiedad columnUnhide habilite las columnas ocultas.
 */
evaluarColumnasUnhide: function (view ) {
    if( view.columnUnhide ) {
        var arrColumnId = view.columnUnhide.split( ',' );
        Ext.Array.each( arrColumnId, function( value ) {
            view.columns[ value ].setVisible( true );
        })
    }
},
    
evaluarColumnasHide: function (view ) {
    if( view.columnHide ) {
        var arrColumnId = view.columnHide.split( ',' );
        Ext.Array.each( arrColumnId, function( value ) {
            view.columns[ value ].setVisible( false );
        })
    }
},

initView: function(view ) {
    var viewport = view.up( 'viewport' );
    var controller = this;
    view.down( '#cuentaCreate' ).setDisabled( true );
    //view.QtyAccounts = 0;
    var storeEquipos = Ext.create( 'Ext.data.Store', {
        model: this.getSoftguardTablaPanelesModelModel(),
        pageSize: 500,
        remoteSort: true,
        remoteFilter: true,
        filters: [
            {
                property: 'pan_nesgprs',
                value: 1
            }
        ],
        sorters: [ { property: 'pan_cdescripcion', direction: 'ASC' }]
    })
    var storeProvincias = Ext.create( 'Ext.data.Store', {
        model: controller.getT_provinciasSearchModelModel(),
        autoLoad: true,
        pageSize: 10000,
        remoteFilter: false,
        remoteSort: true,
        sorters: [ { property: 'pro_cdescripcion', direction: 'ASC' }]
    })
    const comboProvincia = view.down( '#comboProvincia' );
    comboProvincia.bindStore( storeProvincias )
    if( view.down( '#equipogprs' ) ) {
        view.down( '#equipogprs' ).bindStore( storeEquipos );
        storeEquipos.load();
    }


    if( this.application._nameModule == 'VigiControl' ) {
        view.down( '#cuentaCreate' ).setText( getLocale( 'Nuevo objetivo' ) );
    }

    if( view.cuentaCreateHide ) {
        view.down( '#cuentaCreate' ).hide();
    }

    if( view.exportarHide ) {
        view.down( '#btnExportar' ).hide();
    }

    if( view.down( '#filiacion' ) ) {
        this.onFiliacionClick( view.down( '#filiacion' ) );
    }

    var tipostore = Ext.create( 'Ext.data.Store', {
        model: this.getCuentaTipoSearchModelModel(),
        remoteSort: true,
        remoteFilter: true,
        filters: [
            {
                property: 'tip_nTipo',
                value: '0'
            }
        ]
    })

    if( view.down( '#tipo' ) ) {
        view.down( '#tipo' ).bindStore( tipostore );
        tipostore.load()
    }

    //Cargo el combo de tipos de servicios
    var storeComboTiposServicio = Ext.create( 'Ext.data.Store', {
        model: controller.getTablaTipoServicioModelModel(),
        pageSize: 1000,
        remoteSort: true,
        remoteFilter: true,
        filters: [ {
            property: 'cts_iestado:ININT',
            value: 1
        }],
    })
    var comboTiposServicio = view.down( '#comboTiposServicio' );
    if( comboTiposServicio ) {
        comboTiposServicio.bindStore( storeComboTiposServicio );
        storeComboTiposServicio.load();
    }


    //inicio con los fallos escondidos
    if( view.down( "gridcolumn[dataIndex=sta_ncuentaenfallodetst]" ) ) {
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallodetst]" ).setVisible( false )
    }
    if( view.down( "gridcolumn[dataIndex=sta_ncuentaenfallodetst]" ) ) {
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallo2dotst]" ).setVisible( false )
    }
    if( view.down( "gridcolumn[dataIndex=sta_ncuentaenfallodetst]" ) ) {
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallo3ertst]" ).setVisible( false )
    }

    if( view.partitionHide ) {
        //view.down('#btnparticiones').hide();
        //view.columns[0].down('#btnparticiones').hide();
        view.down( '#particiones' ).hide();
    }

    if( view.falloTSTHide ) {
        view.down( '#fallotst' ).hide();
    }

    if( view.falloAC ) {
        view.down( '#falloac' ).hide();
    }

    if( view.cambioSituacionShow ) {
        view.columns[ 0 ].setWidth( 30 );
    }

    if( view.readOnly ) {
        view.down( '#cuentaCreate' ).hide();
        view.copiHide = true;
        view.readonly = true;
        view.columnHide = '0,1'//,12,13'
    }

    this.evaluarColumnasHide( view );

    var filters = [];
    if( !view.mostrarparticion )
        filters.push( {
            property: 'cue_nparticion',
            value: '0',
            id: 'cue_nparticion'
        });

    if( view.filterTipo ) {
        view.filterTipoObj = {
            property: 'tip_nTipo:ININT',
            value: view.filterTipo
        }
    } else {
        view.filterTipoObj = {
            /*property: '_tip_nTipo:NOT',
            value: '1,2,3,5,6,9,11',
            id: '_tip_nTipoNOT'*/
        }
    }

    if( view.sinVehiculo ) {
        view.filterTipoObj = {
            property: 'sinVehiculo',
            value: true
        }
    }

    if( view.soloAccesoWeb ) {
        filters.push( {
            property: 'cue_nllaveul',
            value: 1,
            id: 'cue_nllaveul'
        });
    }

    if( view.condicion ) {
        filters.push( {
            property: 'tip_nCondicion',
            value: view.condicion,
            id: 'tip_nCondicion'
        });
    }

    filters.push( view.filterTipoObj );

    view.filters = filters;

    if( !view.pageSize ) {
        view.pageSize = 50;
    }

    var modelSearch = 'Common.model.CuentaSearchModel';
    if( this.application._nameModule == 'AWCC' ) {
        modelSearch = 'Common.model.CuentaAwccSearchModel';
    }

    view.storeCuenta = Ext.create( 'Ext.data.Store', {
        model: modelSearch,
        pageSize: view.pageSize,
        remoteSort: true,
        autoDestroy: true,
        remoteFilter: true,
        listeners: {
            beforeload: controller.onBeforeload
        },
        filters: filters,
        sorters: [
            {
                property: 'cue_ncuenta',
                direction: 'ASC'
                //,root: 'data'
            }
        ]
    })


    /**
     * BC 389356119 : 
     * Al ingresar desde Administrator debo mostrar solo ciertas columnas
     * Se bloquean las acciones, la creacion de nuevos usaurios, el boton filiacion y el de Exportar a Excel.
     * Se bloquea el filtro de DEALER, bindeando automaticamente al que se ingresó, permitiendo buscar por ncuenta
     * Se aplica al CuentaByDealer un extraParams por el cual filtrar la grilla         * 
     */
    if( view.fromAdministrator ) {
        var dwmDealer = view.record.get( 'dwm_dealer' )
        this.evaluarColumnasUnhide( view );

        view.down( '#dealer' ).setValue( dwmDealer ).disable( true );
        view.down( '#cuentaCreate' ).hide();
        view.down( '#filiacion' ).hide();
        view.down( '#btnExportar' ).hide();
        view.readonly = true;

        view.storeCuenta.proxy.extraParams = {
            linea: dwmDealer,
            cue_ncuentaDesde: view.record.get( 'dwm_cuenta_desde' ),
            cue_ncuentaHasta: view.record.get( 'dwm_cuenta_hasta' )
        };
    }


    view.storeCuenta.view = view;
    view.bindStore( view.storeCuenta );
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.bindStore( view.storeCuenta );


    /**
     * 11/04 Agregado por doble llamado, pero para que no se pincha DealerSearch / AdminCuentas
     */
    if( !view.caller ) {
        this.loadData( view, controller )
    }


    if( view.noShowPaginator ) {
        toolbar.hide()
    }

    /*
    DEDALO 2019/12/13 Rearmo para usar modelo de seguridad ya cargado
    */
    var btnCreate = view.down( '#cuentaCreate' );
    var btnExport = view.down( '#btnExportar' );

    //var accounttoolbar = view.getDockedItems('accountadministrationtoolbarview');
    var viewport = view.up( 'viewport' );
    var accounttoolbar = viewport ? viewport.down( '#north' ) : null;

    var btnMulticuenta = accounttoolbar ? accounttoolbar.down( '#btnMulticuenta' ) : null;
    var btnTiempoReal = accounttoolbar ? accounttoolbar.down( '#btnTiempoReal' ) : null;


    // 16/01/2020 JUAN : Reemplazo de carga de permisos... volver atras en caso de error.
    // var storeSecurity = Ext.data.StoreManager.lookup('SecurityModulesStore');  
    // var recordAdministrator = getSecurityModule('Administrator');
    // var masterModule = getSecurityModule('MasterWebDealer');
    // //var administratorModule = getSecurityModule('Administrator');
    // //var accountAdministrationModule = getSecurityModule('SgAppAccountAdministration'); //??

    // var isMaster = isModuleAvailable('MasterWebDealer');
    // var isAdmin = isModuleAvailable('Administrator');
    // var isAccount = isModuleAvailable('SgAppAccountAdministration'); //??

    // view.isMaster = isMaster;
    // view.isAdmin = isAdmin;
    // view.isAccount = isAccount;


    // if ( isMaster || isAdmin || isAccount ){
    //     var masterDealerModules = controller.getWebDealerSecurityModulesStoreStore();
    //     var modulesArray = [];
    //     masterDealerModules.each(function(_module){
    //         _module.set('profile',2);
    //         modulesArray.push(_module.data);
    //     })

    //     // /* BC 404430734 : No logro identificar cuando se tiene el modulo de Admin / WebDealer con el tilde de Admin Cuentas, que se tomen los derechos, lo agrego. */
    //     // let _security = isAdmin ? JSON.parse(recordAdministrator.get('Security')) : JSON.parse(masterModule.get('Security'))
    //     // let _rights = _security.rights

    //     // view.security = { 
    //     //     modules: modulesArray,
    //     //     rights: _rights
    //     // }

    //     // if ( _rights.cuenta && _rights.exportar) {
    //     //     btnExport.hide();
    //     // }


    // } 
    // else {
    //     // var _security = recordAdministrator.get('_Security');   -- VIEJO
    //     var _security = recordAdministrator.get('Security');

    //     /**
    //      * 03/01/2020 JUAN : Hernan paso un caso del usuario acampeon@dx.com en GCS con permisos de Admin + WebDealer
    //      * el recordAdministrator que viene de la Security de Administrator estaba mal tomado hacia get a _Security y es Security
    //      * Al estar en blanco, luego pinchaba por .rights, por lo que procedo a validar si existe para aplicar.
    //      *  */ 
    //     if ( _security && _security.rights ) {

    //         view.security = _security;
    //         var rigths = _security.rights;

    //         if (!rights.create && btnCreate) {
    //             btnCreate.hide();     
    //         }

    //         if(!rights.checkgeoreferencia) {
    //             if(accounttoolbar.length== 1) {
    //                 toolbar.down('#autolocalizarcuentas').hide()
    //             }
    //         }

    //         if (!rights.copy){
    //             view.copiHide = true;
    //         }

    //         if (!rights.multicuenta && btnMulticuenta){
    //             btnMulticuenta.hide();
    //         }

    //         if (!rights.tiemporeal && btnTiempoReal){
    //             btnTiempoReal.hide();
    //         }

    //         if (!rights.exportar && btnExport){
    //             btnExport.hide();
    //         }

    //     }

    // Obtengo los modulos habilitados del usuario que determinan Seguridad.      
    var modulesStore = SecurityModulesStore;//controller.getSecurityModulesStoreStore();
    var masterModule = modulesStore.findRecord( 'KeyReference', 'MasterWebDealer' );
    var webDealerModule = modulesStore.findRecord( 'KeyReference', 'WebDealer' );
    var administratorModule = modulesStore.findRecord( 'KeyReference', 'Administrator' );

    // Armo los flags de habilitación segun perfil.
    var isMaster = masterModule ? masterModule.get( 'Available' ) : false;
    var isWebDealer = webDealerModule ? webDealerModule.get( 'Available' ) : false;
    var isAdmin = administratorModule ? administratorModule.get( 'Available' ) : false;
    var isNeededReadRights = false; // para la lectura de derechos del modulo segun App ejecutada, y asi ver si es SOLO ADMIN CUENTAS.
    var isAdminCuenta = false;

    view.isMaster = isMaster;
    view.isAdmin = isAdmin;
    view.isAccount = isAdminCuenta;

    // Reviso si tengo el modulo Administration pero con tilde de SOLO ADMIN CUENTAS.
    if( isAdmin ) {
        var security = administratorModule.get( 'Security' );
        var json;
        if( security && security != '' ) {
            json = Ext.JSON.decode( security );
            view.security = json;
        }
        // Caso en el cual se encuentra modulo Administrator habilitado y con el tilde de SOLO ADMIN CUENTAS.
        if( json && json.rights && json.modules && json.rights.cuenta ) {
            isNeededReadRights = true; // Habilito el flag de lectura de los permisos de las opciones de la vista.
            isAdminCuenta = true;
            isAdmin = false; // Deshabilito el flag de Admin
            view.isAdmin = isAdmin;
            view.isAccount = isAdminCuenta;
        }
    }
    if( isNeededReadRights || isMaster || isWebDealer ) {
        // Soy SOLO ADMIN CUENTAS o WebDealer o MasterWebDealer - debo leer derechos, armo seguridad segun App ejecutada
        var _security;

        if( ( controller.application._nameModule && controller.application._nameModule == 'Administrator' ) || isAdminCuenta ) {
            _security = administratorModule.get( 'Security' );
        } else {
            // Cuando la App es MasterWebDealer o WebDealer, verifico el modulo que tenga cargado el usuario y su seguridad.
            if( isMaster ) {
                // Es MasterWebDealer
                _security = masterModule.get( 'Security' );
            } else if( isWebDealer ) {
                // Es WebDealer
                _security = webDealerModule.get( 'Security' );
            }
        }
        // Leo la seguridad cargada y muestro/oculto segun lo que corresponda.
        if( _security ) {
            _security = JSON.parse( _security );
            view.security = _security;
        }

        if( _security.rights && !_security.rights.create && btnCreate ) {
            btnCreate.hide();
        }

        if( _security.rights && !_security.rights.checkgeoreferencia ) {
            if( accounttoolbar && accounttoolbar.down( '#autolocalizarcuentas' ) ) {
                accounttoolbar.down( '#autolocalizarcuentas' ).hide()
            }
        }

        if( _security.rights && !_security.rights.copy ) {
            view.copiHide = true;
        }

        if( _security.rights && !_security.rights.multicuenta && btnMulticuenta ) {
            btnMulticuenta.hide();
        }

        if( _security.rights && !_security.rights.tiemporeal && btnTiempoReal ) {
            btnTiempoReal.hide();
        }

        if( _security.rights && !_security.rights.exportar && btnExport ) {
            btnExport.hide();
        }
    }

    if( view.autoRefresh && view.autoRefresh > 0 ) {
        view.task = Ext.TaskManager.start( {
            args: [ view, controller ],
            run: controller.loadData,
            interval: view.autoRefresh
        });
    }

    var storePaneles = Ext.create( 'Ext.data.Store', {
        model: this.getTablasPanelesSearchModelModel(),
        pageSize: 5000,
        remoteSort: true,
        autoDestroy: true,
        remoteFilter: true,
        autoLoad: false,
        sorters: [ {
            property: 'pan_cdescripcion',
            direction: 'ASC'
        }]
    })

    if( view.down( '#panel' ) ) {
        view.down( '#panel' ).bindStore( storePaneles );
        storePaneles.load()
    }

    if( view.filiacionHide ) {
        view.down( '#filiacion' ).hide()
    }
    view.exportFilters = view.filters;
},
    
loadData: function (view, controller ) {
    view.persistedSelection = view.getSelectionModel().getSelection()
    view.storeCuenta.load( {
        callback: function( records, data ) {
            /**
             * Configuracion en la view AWCC, para que realice el checkbox de todos y asi graficar en el mapa
             * 11/04/2019 : La configuracion en la VIEW CuentaConMapaView se pasa a false, para que no realice esta accion
             */
            if( view.initAllSelected ) {
                view.getSelectionModel().deselectAll( true );
                view.getSelectionModel().selectAll();
            }

            controller.tieneCuentasDisponibles( view, false, data.resultSet ? data.resultSet.total : data.store.totalCount );
            if( view.caller ) {
                /**
                 * Evento que se encuentra dentro del Refresh, para lo cual debemos leer los estados de los botones o filtros aplicados y asi recargar
                 * Verificacion de campos del filtro
                 * Verificacion de los botones
                 *  
                 */

                controller.onFiltertextClick( view.down( '#filtro' ) );
            }
        }
    });
},
    
tieneCuentasDisponibles: function (view, callback, cantidad ) {
    var controller = this;

    // me fijo si hay que controlar.
    if( !view.KeyCustomerInfo ) {

        // me fijo si cargo KeyCustomerInfo sino vuelvo a llamar luego
        if( !KeyCustomerInfo ) {
            Ext.Function.defer( controller.tieneCuentasDisponibles, 1000, this, arguments );
            return;
        }

        view.KeyCustomerInfo = KeyCustomerInfo;
        view.QtyAccounts = parseInt( view.KeyCustomerInfo.QtyAccounts );

        // si la cantidad de usuarios es mayor a 0 le aplico el calculo de limite
        // sino dejo liberado
        if( view.QtyAccounts == 0 ) {
            view.cuentasDisponibles = true;
            view.cuentaLibres = true;
            view.down( '#cuentaCreate' ).setDisabled( false );
            return;
        }
    }

    if( !view.isAdmin ) { // por si ya lo calcule
        var modules = Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
        view.isAdmin = modules.isModuleAvailable( 'Administrator' );
    }

    // si cuentas libre esta en true no compruebo nunca la cantidad de cuentas utilizadas
    if( view.cuentaLibres ) {
        view.down( '#cuentaCreate' ).setDisabled( false );
        view.cuentasDisponibles = true;
    } else {
        var fieldToolBar = Ext.ComponentQuery.query( '#toolbardisplayfield' )[ 0 ];

        if( view.QtyAccounts && view.QtyAccounts != 0 ) { //==0 solo para testeo
            var url = '/Rest/search/CantidadCuentaGroupByTipo?type=totallicencias';
            if( view.nameModule == 'SmartPanicsPC' ) {
                url = '/Rest/search/CantidadCuentaGroupByTipo?type=SmartPanicsPC';
            }
            Ext.Ajax.request( {
                url: url,
                method: 'GET',
                success: function( resp, operation ) {
                    if( resp.responseText.length > 0 ) {
                        var json = JSON.parse( resp.responseText );
                        var asignados = parseInt( json.rows[ 0 ].Cuentas );

                        if( asignados == view.QtyAccounts ) {
                            // actualizo cantidades en la barra
                            if( fieldToolBar && view.isAdmin ) {
                                fieldToolBar.setValue( getLocale( 'Disponibles/Usadas' ) + ' (' + view.QtyAccounts + '/' + asignados + ')' );
                            }

                            view.down( '#cuentaCreate' ).setDisabled( true );
                            var msg = getLocale( 'Se supero la cantidad de cuentas disponibles' ) + '. (' + view.QtyAccounts + '/' + asignados + ')';
                            Ext.Msg.alert( 'Atención', msg, Ext.emptyFn );
                            view.cuentasDisponibles = false;
                        } else if( asignados > view.QtyAccounts ) {
                            // actualizo cantidades en la barra
                            if( fieldToolBar ) {
                                fieldToolBar.setValue( getLocale( 'Disponibles/Usadas' ) + ' (' + view.QtyAccounts + '/' + asignados + ')' );
                            }

                            view.down( '#cuentaCreate' ).setDisabled( true );
                            Ext.Msg.alert( 'Atención', getLocale( 'Se supero la cantidad de cuentas disponibles. Por favor comuniquese con el administrador' ) + '. (' + view.QtyAccounts + '/' + asignados + ')', Ext.emptyFn );
                            view.licenseViolation = true;
                            view.cuentasDisponibles = false;
                            view.fireEvent( 'licenseviolation' );

                        } else {
                            // actualizo cantidades en la barra
                            if( fieldToolBar && view.isAdmin ) {
                                fieldToolBar.setValue( getLocale( 'Disponibles/Usadas' ) + ' (' + view.QtyAccounts + '/' + asignados + ')' );
                            }

                            view.down( '#cuentaCreate' ).setDisabled( false );
                            view.cuentasDisponibles = true;
                            if( callback ) {
                                callback();
                            }
                        }
                    }
                },
                failure: function() {
                    Ext.Function.defer( controller.tieneCuentasDisponibles, 1000, controller, [ view, callback, cantidad ] );
                }
            });
        }
        else {
            // actualizo cantidades en la barra   
            if( fieldToolBar && view.isAdmin )
                fieldToolBar.setValue( getLocale( 'Sin control de cuentas' ) );

            view.cuentasDisponibles = true;
            view.down( '#cuentaCreate' ).setDisabled( false );
            //view.down('#cuentaCreate').setDisabled(true);

            if( callback ) {
                callback();
            }
        }
    }
},
    
onBeforeload: function(store, operation, options ) {
    operation.store = store;
    var params = {}
    if( store.view.fieldList ) {
        params.fieldlist = store.view.fieldList;
    }

    operation.params = params;
},
onExportarClick: function (button) {
    var controller = this;
    var view = button.up('cuentagridview') ? button.up('cuentagridview') : button;

    var store = view.getStore();

    // Obtenemos los filtros guardados en view.exportFilters (se setean en onFiltertextClick línea 1823)
    var exportFilters = view.exportFilters || [];

    // Convertir a JSON string y codificar
    var filterParam = '';
    if (exportFilters.length > 0) {
        filterParam = 'filter=' + encodeURIComponent(JSON.stringify(exportFilters));
    }

    console.log('Filtros para exportar:', exportFilters);

    // tu handler de export
    var baseurl = '/handler/CuentaGridExportHTML';
    var url = baseurl + (filterParam ? '?' + filterParam : '');

    var win = Ext.create('Ext.Window', {
        layout: 'vbox',
        title: 'Exportar Reporte',
        alias: 'widget.exportfilter',
        closeAction: 'destroy',
        width: 450,
        height: 340,
        border: false,
        view: view,
        itemId: 'exportarWindow',
        items: [{
            xtype: 'fieldset',
            title: 'Seleccione los datos que incluira el reporte',
            layout: 'vbox',
            items: [{
                xtype: 'checkboxgroup',
                itemId: 'incluirchecks',
                columns: 2,
                vertical: true,
                hideLabel: true,
                width: 400,
                items: [
                    { boxLabel: 'Fecha de Alta', itemId: 'chkfechaalta', checked: true },
                    { boxLabel: 'Dealer / Cuenta', itemId: 'chkcuenta', checked: true },
                    { boxLabel: 'ID Extendido', itemId: 'chkidextendido', checked: true },
                    { boxLabel: 'Tipo de Cuenta', itemId: 'chktipocuenta', checked: true },
                    { boxLabel: 'Nombre', itemId: 'chknombre', checked: true },
                    { boxLabel: 'Situación', itemId: 'chksituacion', checked: true },
                    { boxLabel: 'Estado', itemId: 'chkestado', checked: true },
                    { boxLabel: 'Provincia', itemId: 'chkprovincia', checked: true },
                    { boxLabel: 'Localidad', itemId: 'chklocalidad', checked: true },
                    { boxLabel: 'Calle', itemId: 'chkcalle', checked: true },
                    { boxLabel: 'Codigo Postal', itemId: 'chkcodpostal', checked: true },
                    { boxLabel: 'IMEI', itemId: 'chkimei', checked: true },
                    { boxLabel: 'Teléfono', itemId: 'chktelefono', checked: true },
                    { boxLabel: 'Último evento', itemId: 'chkultimoevento', checked: true },
                    { boxLabel: 'Fecha último evento', itemId: 'chkfechaultimoevento', checked: true },
                    { boxLabel: 'Última alarma recibida', itemId: 'chkultimaalarmarecibida', checked: true },
                    { boxLabel: 'Fecha última alarma', itemId: 'chkfechaultimaalarma', checked: true },
                    { boxLabel: 'Ubicacion de la Cuenta', itemId: 'chkubicacion', checked: true },
                    { boxLabel: 'Último test', itemId: 'chkultimotest', checked: true },
                    { boxLabel: 'Campo Custom', itemId: 'chkcustom', checked: true },
                    { boxLabel: 'Email', itemId: 'chkemail', checked: true },
                    { boxLabel: 'Clave', itemId: 'chkclave', checked: false, hidden: true }
                ]
            }]
        }],
        buttons: [{
            text: 'Exportar',
            handler: function () {
                var incluirchecks = win.down('#incluirchecks').getChecked();
                var exportToExcel = 'yes';

                console.log('URL base para exportar:', url);

                var finalUrl = url;
                if (exportToExcel) {
                    finalUrl = Ext.String.urlAppend(finalUrl, 'exportToExcel=' + exportToExcel);
                }

                if (incluirchecks) {
                    Ext.Array.each(incluirchecks, function (v) {
                        finalUrl = Ext.String.urlAppend(finalUrl, v.itemId + '=' + v.checked);
                    });
                }

                // para evitar cache
                finalUrl = Ext.String.urlAppend(finalUrl, '_dc=' + new Date().getTime());

                console.log('URL final para exportar:', finalUrl);

                location.href = finalUrl;
                win.hide();
            }
        }, {
            text: 'Cancelar',
            handler: function () {
                win.hide();
            }
        }]
    });

    win.show();
},
/**
 * BC 394823116
 */
checkPermission: function(win ) {
    var controller = this;
    var view = win.up( 'cuentagridview' )
    /**
     * Si el usuario es Administrator o bien dentro de WebDealer se le asigna el check de claves, muestro para exportar.
     */
    var storeSecurity = Ext.data.StoreManager.lookup( 'SecurityModulesStore' );
    var recordAdminsitrator = storeSecurity.findRecord( 'KeyReference', 'Administrator' )
    var recordWebDealer = storeSecurity.findRecord( 'KeyReference', 'WebDealer' )

    if( recordAdminsitrator && recordAdminsitrator.get( 'Available' ) == true ) {
        win.down( '#chkclave' ).show();
        win.down( '#chkclave' ).setValue( true );
    }
    if( recordWebDealer && recordWebDealer.get( 'Available' ) == true ) {
        let _security = recordWebDealer.get( '_Security' );
        if( _security && _security.rights && _security.rights.claves == true ) {
            win.down( '#chkclave' ).show();
            win.down( '#chkclave' ).setValue( true );
        }
    }
},
    
onItemClick: function(view, record ) {
    var id = record.get( 'Id' );
    var cuentagridview = view.up( 'cuentagridview' )
    if( cuentagridview ) {
        var panel = cuentagridview.idTargetPanel ? view.up( '#' + cuentagridview.idTargetPanel ) : view.up( '#center' );
    } else {
        var panel = view.up( '#center' );
        cuentagridview = view;
    }
    var title = record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' - ' + record.get( 'cue_cnombre' );
    title = title
        .replace( /,/g, '' )
        .replace( /\[/g, '' )
        .replace( /\]/g, '' )
        .replace( /#/g, '' )
        .replace( /\./g, '' )
        .replace( />/g, '' );
    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down( '[title="' + title + '"]' );

    var readonly = false;

    /** se saco por que simpre habilitaba situacion cuando tenia no habilitado
     * if (record.get('Situacion')=="No Habilitado"){
         readonly=true;
     }*/

    if( cuentagridview && cuentagridview.readonly ) {
        readonly = true;
    }

    var openView = 'cuentaview';
    if( view.itemDbClickView ) {
        openView = view.itemDbClickView;
    } else {
        if( cuentagridview ) {
            if( cuentagridview.itemDbClickView != undefined ) {
                openView = cuentagridview.itemDbClickView
            }
        }
    }

    if( cuentagridview && cuentagridview.itemDbClickViewType == 'win' ) {
        var forceIdModule = null;
        if( cuentagridview ) {
            forceIdModule = cuentagridview.forceIdModule ? cuentagridview.forceIdModule : null
        }

        var win = Ext.create( 'Ext.Window', {
            layout: 'fit',
            title: title,
            width: 450,
            height: 300,
            border: false,
            translate: false,
            items: [
                {
                    xtype: openView,
                    recordCuenta: record,
                    caller: view,
                    securityId: cuentagridview.securityId,
                    nameModule: panel.nameModule,
                    forceIdModule: forceIdModule
                }
            ]
        });
        win.show();
    } else {
        if( cuentagridview ) {
            forceIdModule = cuentagridview.forceIdModule ? cuentagridview.forceIdModule : null
        }
        if( !mytab ) {
            var newTab = Ext.widget( openView, {
                tabConfig: { translate: false },
                title: title,
                objectId: id,
                translate: false,
                closable: true,
                readonly: readonly,
                closeAction: 'destroy',
                recordCuenta: record,
                securityId: cuentagridview ? cuentagridview.securityId : '',
                nameModule: cuentagridview.nameModule,
                forceIdModule: forceIdModule,
                filterTipo: cuentagridview.filterTipo
            });
            panel.add( newTab );
            panel.setActiveTab( newTab );
        }
        // el existe, lo activo
        else {
            //volver atrás mytab.show();
        }
    }
},
    
onMostrarEventos: function(record, view ) {
    var id = record.get( 'Id' );
    var panel = view.up( '#center' );
    var title = record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' - ' + record.get( 'cue_cnombre' ) + ' (' + getLocale( 'Eventos' ) + ')';
    title = title.replace( ',', '' );
    // me fijo si el tab existe, si es nuevo lo creo
    var mytab = panel.down( '[title="' + title + '"]' );
    if( !mytab ) {
        var newTab = Ext.widget( 'recepcionview', {
            tabConfig: { translate: false },
            translate: false,
            title: title,
            record: record,
            closable: true,
            closeAction: 'destroy'
        });
        panel.add( newTab );
        panel.setActiveTab( newTab );
    }
    // el existe, lo activo
    else {
        mytab.show();
    }
},
    
onNoHabilitadasClick: function(button, event, options ) {
    var view = button.up( 'cuentagridview' );
    var store = view.getStore();

    //saco filtro fallo // esto me aprece que esta mal... 
    this.removeFalloTstFilter( view )

    var filters = Ext.clone( store.filters.items );
    filters.push( {
        property: 'Situacion',
        value: 'No Habilitada',
        id: 'estado'
    })
    filters.push( view.filterTipoObj );

    store.filters.clear();
    store.currentPage = 1;
    store.filter( filters );
},
    
onFalloACClick: function(button, sacarFiliacion ) {
    var view = button.up( 'cuentagridview' );
    var store = view.getStore();
    var filters = Ext.clone( store.filters.items );
    if( button.pressed ) {

        //saco la vista filiacion
        if( view.down( '#filiacion' ).pressed && sacarFiliacion != false ) {
            view.down( '#filiacion' ).toggle( false )
            this.onFiliacionClick( view.down( '#filiacion' ), false )
        }

        filters.push( {
            property: 'sta_nEnFalloDeAC',
            value: '1',
            id: 'estado'
        })
        filters.push( view.filterTipoObj );

        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallodetst]" ).setVisible( true )
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallo2dotst]" ).setVisible( true )
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallo3ertst]" ).setVisible( true )
    } else {
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallodetst]" ).setVisible( false )
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallo2dotst]" ).setVisible( false )
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallo3ertst]" ).setVisible( false )
    }

    store.currentPage = 1;
    store.filter( filters );
},
    
onFalloTestClick: function(button, sacarFiliacion ) {
    var view = button.up( 'cuentagridview' );
    var store = view.getStore();
    var filters = Ext.clone( store.filters.items );

    if( button.pressed ) {

        //saco la vista filiacion
        if( view.down( '#filiacion' ).pressed && sacarFiliacion != false ) {
            view.down( '#filiacion' ).toggle( false )
            this.onFiliacionClick( view.down( '#filiacion' ), false )
        }

        filters.push( {
            property: 'sta_ncuentaenfallo',
            value: '1',
            id: 'estado'
        })

        filters.push( view.filterTipoObj );

        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallodetst]" ).setVisible( true )
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallo2dotst]" ).setVisible( true )
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallo3ertst]" ).setVisible( true )
    } else {
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallodetst]" ).setVisible( false )
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallo2dotst]" ).setVisible( false )
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallo3ertst]" ).setVisible( false )
        filters.push( {
            property: 'sta_ncuentaenfallo',
            value: '0',
            id: 'estado'
        })

    }
    store.filters.clear(); //dedalo habilito porque se mezclan los filtros
    store.currentPage = 1;
    store.filter( filters );

},
    
removeFalloTstFilter: function (view ) {
    //saco filtro fallo
    if( view.down( '#fallotst' ).pressed ) {
        view.down( '#fallotst' ).toggle( false )
        this.onFalloTestClick( view.down( '#fallotst' ) )
    }

    /**
     * BC 389356119 : 
     * Adapto la funcion para cuando se modifique el filtro y el boton de Fallo TST o AC deje de estar tildado, desaparezcan las columnas
     * Lo aplico solo para cuando disparo esta VIEW desde Administrator.
     */
    if( view.fromAdministrator ) {
        view.down( "gridcolumn[dataIndex=nvs_nNivel]" ).setVisible( false )
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallodetst]" ).setVisible( false )
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallo2dotst]" ).setVisible( false )
        view.down( "gridcolumn[dataIndex=sta_ncuentaenfallo3ertst]" ).setVisible( false )
    }

},  
    
onHabilitadasClick: function(button, event, options ) {
    var view = button.up( 'cuentagridview' );
    var store = view.getStore();

    //saco filtro fallo // esto me aprece que esta mal... 
    this.removeFalloTstFilter( view )


    var filters = Ext.clone( store.filters.items );
    filters.push( {
        property: 'Situacion',
        value: 'Habilitada',
        id: 'estado'
    })
    filters.push( view.filterTipoObj );

    store.filters.clear(); //dedalo habilito porque se mezclan los filtros
    store.currentPage = 1;
    store.filter( filters );
},
    
onEnpruebaClick: function(button, event, options ) {
    var view = button.up( 'cuentagridview' );
    var store = view.getStore();

    //saco filtro fallo
    this.removeFalloTstFilter( view )

    var filters = Ext.clone( store.filters.items );
    filters.push( {
        property: 'Situacion',
        value: 'En Prueba',
        id: 'estado'
    })
    filters.push( view.filterTipoObj );

    store.filters.clear();//dedalo habilito porque se mezclan los filtros
    store.currentPage = 1;
    store.filter( filters );
},
    
onEliminarClick: function(button, event, options ) {
    var view = button.up( 'cuentagridview' );
    var store = view.getStore();

    //saco filtro fallo
    this.removeFalloTstFilter( view )

    var filters = Ext.clone( store.filters.items );
    filters.push( {
        property: 'Situacion',
        value: 'Eliminar',
        id: 'estado'
    })
    filters.push( view.filterTipoObj );

    store.filters.clear();//dedalo habilito porque se mezclan los filtros
    store.currentPage = 1;
    store.filter( filters );
},
    
onAlarmaClick: function(button, event, options ) {
    var view = button.up( 'cuentagridview' );
    var store = view.getStore();

    var filters = Ext.clone( store.filters.items );
    filters.push( {
        property: 'Situacion',
        value: 'Alarma',
        id: 'estado'
    })
    filters.push( view.filterTipoObj );

    store.filters.clear();//dedalo habilito porque se mezclan los filtros
    store.currentPage = 1;
    store.filter( filters );
},
    
onParticionesClick: function(button, event, options ) {
    var view = button.up( 'cuentagridview' );
    var store = view.getStore();
    store.currentPage = 1;

    var filters = Ext.clone( store.filters.items );

    //saco filtro fallo
    this.removeFalloTstFilter( view )


    if( button.pressed ) {
        filters.push( {
            property: 'cue_nparticion:GTINT',
            value: '0',
            id: 'cue_nparticion'
        });
        filters.push( view.filterTipoObj );
        store.filters.clear( true );//dedalo habilito porque se mezclan los filtros
        store.filter( filters );

        if( view.down( "gridcolumn[dataIndex=madre_cnombre]" ) ) {
            view.down( "gridcolumn[dataIndex=madre_cnombre]" ).setVisible( true )
        }
    } else {
        /*store.filters.removeAtKey('cue_nparticion');
        store.filter();*/

        //[adrian] 16-11-2018 se agrego a pedido de rodrigo
        filters.push( {
            property: 'cue_nparticion',
            value: '0',
            id: 'cue_nparticion'
        });
        filters.push( view.filterTipoObj );
        store.filters.clear( true );//dedalo habilito porque se mezclan los filtros
        store.filter( filters );

        if( view.down( "gridcolumn[dataIndex=madre_cnombre]" ) ) {
            view.down( "gridcolumn[dataIndex=madre_cnombre]" ).setVisible( false )
        }
    }

    //view.down('#query').setValue('');
},

onLimpiarTextClick: function(button, event, options ) {
    var view = button.up( 'cuentagridview' );
    if( view.down( '#dealer' ) )
        view.down( '#dealer' ).setValue( '' );
    if( view.down( '#cuenta' ) )
        view.down( '#cuenta' ).setValue( '' );
    if( view.down( '#nombre' ) )
        view.down( '#nombre' ).setValue( '' );
    if( view.down( '#calle' ) )
        view.down( '#calle' ).setValue( '' );
    if( view.down( '#email' ) )
        view.down( '#email' ).setValue( '' );
    if( view.down( '#emailnotificaciones' ) )
        view.down( '#emailnotificaciones' ).setValue( '' );
    if( view.down( '#permiso' ) )
        view.down( '#permiso' ).setValue( '' );
    if( view.down( '#imei' ) )
        view.down( '#imei' ).setValue( '' );
    if( view.down( '#telefono' ) )
        view.down( '#telefono' ).setValue( '' );
    if( view.down( '#clave' ) )
        view.down( '#clave' ).setValue( '' );
    if( view.down( '#equipogprs' ) )
        view.down( '#equipogprs' ).setValue( '' );
    if( view.down( '#campocustom' ) )
        view.down( '#campocustom' ).setValue( '' );
    if( view.down( '#comboProvincia' ) )
        view.down( '#comboProvincia' ).setValue( '' );
    if( view.down( '#comboProvincia' ) )
        view.down( '#comboefectiva' ).setValue( '' );
    if( view.down( '#localidad' ) )
        view.down( '#localidad' ).setValue( '' );
    if( view.down( '#tipo' ) )
        view.down( '#tipo' ).setValue( '' );
    if( view.down( '#comboTiposServicio' ) )
        view.down( '#comboTiposServicio' ).setValue( '' );
    if( view.down( '#pan_cnrosim' ) )
        view.down( '#pan_cnrosim' ).setValue( '' );
    if( view.down( '#pan_ccompania' ) )
        view.down( '#pan_ccompania' ).setValue( '' );
    if( view.down( '#cue_cIdExtendido' ) )
        view.down( '#cue_cIdExtendido' ).setValue( '' );
    if( view.down( '#panel' ) )
        view.down( '#panel' ).setValue( '' );

},
    
onFiltertextClick: function(button, event, options ) {
    var view = button.up( 'cuentagridview' );
    var store = view.getStore();
    var urlParts = [];
    store.currentPage = 1;

    var baseFilters = Ext.clone( view.filters ) || [];
    var filters = baseFilters.slice();

    var pushFilter = function(cfg ) {
        var cmp = view.down( cfg.cmp );
        if( !cmp ) {
            return;
        }

        var value = Ext.isFunction( cfg.valueFn ) ? cfg.valueFn( cmp ) : cmp.getValue();
        if( Ext.isString( value ) ) {
            value = Ext.String.trim( value );
        }

        if( cfg.transformValue ) {
            value = cfg.transformValue( value, cmp );
        }

        if( cfg.skipIf && cfg.skipIf( value ) ) {
            return;
        }

        if( Ext.isEmpty( value ) && value !== 0 ) {
            return;
        }

        var filter = {
            property: cfg.property,
            value: value,
            id: cfg.id || cfg.property
        };

        if( cfg.extraProps ) {
            Ext.apply( filter, cfg.extraProps );
        }

        filters.push( filter );
        urlParts.push( Ext.encode( {
            property: filter.property,
            value: filter.value
        }));
    };

    pushFilter( {
        cmp: '#dealer',
        property: 'cue_clinea',
        id: 'cue_clinea'
    });

    pushFilter( {
        cmp: '#cuenta',
        property: 'cue_ncuenta',
        id: 'cue_ncuenta',
        transformValue: function(value, cmp ) {
            if( Ext.isEmpty( value ) ) {
                return value;
            }
            var pad = '0000';
            var result = ( pad + value ).slice( -pad.length );
            cmp.setValue( result );
            return result;
        }
    });

    pushFilter( {
        cmp: '#nombre',
        property: '_nombre',
        id: '_nombre'
    });

    pushFilter( {
        cmp: '#panel',
        property: 'pan.pan_ccodigo',
        id: 'pan_ccodigo'
    });

    pushFilter( {
        cmp: '#calle',
        property: 'cue_ccalle',
        id: 'cue_ccalle'
    });

    pushFilter( {
        cmp: '#email',
        property: 'cue_cemail',
        id: 'cue_cemail'
    });

    pushFilter( {
        cmp: '#emailnotificaciones',
        property: 'rep_cmail',
        id: 'rep_cmail'
    });

    pushFilter( {
        cmp: '#permiso',
        property: 'cue_cpermiso:LIKE',
        id: 'cue_cpermiso'
    });

    pushFilter( {
        cmp: '#imei',
        property: 'cue_cIMEI:LIKE',
        id: 'cue_cIMEI'
    });

    pushFilter( {
        cmp: '#telefono',
        property: '_telefono',
        id: '_telefono'
    });

    pushFilter( {
        cmp: '#clave',
        property: '_clave',
        id: '_clave'
    });

    pushFilter( {
        cmp: '#equipogprs',
        property: 'pan_cGPRS',
        id: 'pan_cGPRS'
    });

    pushFilter( {
        cmp: '#campocustom',
        property: 'cue_cCustom',
        id: 'cue_cCustom'
    });

    var comboProvincia = view.down( '#comboProvincia' );
    if( comboProvincia ) {
        var provinciaValue = comboProvincia.getValue();
        var provinciaRaw = Ext.String.trim( comboProvincia.getRawValue() || '' );

        if( !Ext.isEmpty( provinciaValue ) ) {
            filters.push( {
                property: 'cue_cprovincia',
                value: provinciaValue,
                id: 'cue_cprovincia'
            });
            urlParts.push( Ext.encode( {
                property: 'cue_cprovincia',
                value: provinciaValue
            }));
        } else if( provinciaRaw ) {
            filters.push( {
                property: 'pro_cdescripcion:LIKE',
                value: provinciaRaw,
                id: 'cue_cprovincia'
            });
            urlParts.push( Ext.encode( {
                property: 'pro_cdescripcion:LIKE',
                value: provinciaRaw
            }));
        }
    }

    pushFilter( {
        cmp: '#comboefectiva',
        property: 'cue_nEfectiva',
        id: 'cue_nEfectiva',
        skipIf: function(value ) {
            var numericValue = parseInt( value, 10 );
            return isNaN( numericValue ) || numericValue <= 0;
        }
    });

    pushFilter( {
        cmp: '#localidad',
        property: 'cue_clocalidad',
        id: 'cue_clocalidad'
    });

    pushFilter( {
        cmp: '#tipo',
        property: 'tip_idKey',
        id: 'tip_idKey',
        skipIf: function(value ) {
            return Ext.isEmpty( value ) && value !== 0;
        }
    });

    pushFilter( {
        cmp: '#comboTiposServicio',
        property: 'cue_iTipoServicio',
        id: 'cue_iTipoServicio',
        skipIf: function(value ) {
            return Ext.isEmpty( value ) && value !== 0;
        }
    });

    pushFilter( {
        cmp: '#pan_cnrosim',
        property: 'pan_cnrosim',
        id: 'pan_cnrosim'
    });

    pushFilter( {
        cmp: '#pan_ccompania',
        property: 'pan_ccompania',
        id: 'pan_ccompania'
    });

    pushFilter( {
        cmp: '#cue_cIdExtendido',
        property: 'cue_cIdExtendido',
        id: 'cue_cIdExtendido'
    });

    var btnActivados = view.down( '#btnActivados' );
    var btnDesactivados = view.down( '#btnDesactivados' );
    if( btnActivados && btnActivados.pressed ) {
        urlParts.push( Ext.encode( {
            property: 'sta_nestado',
            value: 0
        }));
    } else if( btnDesactivados && btnDesactivados.pressed ) {
        urlParts.push( Ext.encode( {
            property: 'sta_nestado',
            value: 1
        }));
    }

    if( view.down( '#removefilter' ) ) {
        view.down( '#removefilter' ).toggle( false );
    }

    store.filters.clear( true );
    store.remoteFilter = false;
    store.filter( filters, true );
    store.remoteFilter = true;

    var url = '';
    if( urlParts.length > 0 ) {
        url = ',' + urlParts.join( ',' );
    }
    
    // Guardar los filtros para exportación ANTES del load
    // Filtrar objetos vacíos o inválidos
    view.exportFilters = filters.filter(function(f) {
        return f && f.property && f.value !== undefined && f.value !== null;
    });

    store.load( {
        callback: function() {
            if( view.caller ) {
                view.caller.fireEvent( 'addManualFilters', view.caller, url );
            }
            view.down( '#filtro' ).hideMenu();
        }
    });
},
    
onRemovefilterClick: function(button, event, options ) {
    var controller = this;
    var view = button.up( 'cuentagridview' );
    var store = view.getStore();
    store.clearFilter( true );

    //saco filtro fallo
    this.removeFalloTstFilter( view )

    //limpio campo
    //view.down('#query').setValue('');
    view.down( '#dealer' ).setValue( '' );
    view.down( '#cuenta' ).setValue( '' );
    view.down( '#nombre' ).setValue( '' );
    view.down( '#calle' ).setValue( '' );
    view.down( '#email' ).setValue( '' );
    view.down( '#telefono' ).setValue( '' );

    if( view.down( '#cue_cIdExtendido' ) ) {
        view.down( '#cue_cIdExtendido' ).setValue( '' );
    }

    if( view.down( '#panel' ) ) {
        view.down( '#panel' ).setValue( '' );
    }

    if( view.down( '#clave' ) ) {
        view.down( '#clave' ).setValue( '' );
    }

    if( view.down( '#equipogprs' ) ) {
        view.down( '#equipogprs' ).setValue( '' );
    }

    if( view.down( '#campocustom' ) ) {
        view.down( '#campocustom' ).setValue( '' );
    }

    if( view.down( '#imei' ) ) {
        view.down( '#imei' ).setValue( '' );
    }

    view.down( '#comboProvincia' ).setValue( '' );
    view.down( '#localidad' ).setValue( '' );
    if( view.down( '#tipo' ) ) {
        view.down( '#tipo' ).setValue( '' );
    }
    if( view.down( '#comboefectiva' ) ) {
        view.down( '#comboefectiva' ).setValue( '' );
    }
    //var filters = [];
    //filters.push(view.filterTipoObj);
    // store.filter(filters);

    if( view.down( '#particiones' ) ) {
        view.down( '#particiones' ).toggle( false );
    }

    var filters = Ext.clone( view.filters );

    store.remoteFilter = false;
    store.filter( filters, true );
    store.remoteFilter = true;

    store.load( {
        callback: function() {
            if( view.caller ) {
                controller.onFiltertextClick( button );
            }
            button.toggle( true );
        }
    });

    /*
    if (!buttonParticiones.pressed){
        filters.push({
            property: 'cue_nparticion',
            value: '0',
            id: 'cue_nparticion'
        });
        filters.push(view.filterTipoObj);
        store.filter(filters);
    } else {
        store.filters.removeAtKey('cue_nparticion');
        store.filter(view.filterTipoObj);
    }
    */
},
    
onObjectEdit: function(record, view ) {
    this.onItemClick( view, record );
},
    
onCrearcuentaClick: function(button, event, options ) {
    //var grid = button.up('grid');
    var view = button.up( 'cuentagridview' ) ? button.up( 'cuentagridview' ) : button;

    var view = Ext.widget( 'cuentanewview', {
        isAdmin: view.isAdmin,
        isAccount: view.isAccount,
        caller: view,
        createTipo: view.createTipo,
        fenceOptions: view.fenceOptions
    });

    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Nueva cuenta',
        width: 450,
        height: 240,
        border: false,
        items: view
    });
    win.show();
},
    
onCuentaCreated: function(view ) {
    var record = view.record;
    var grid = view.caller ? view.caller : view;
    var paging = grid.down( 'pagingtoolbar' );
    this.onItemClick( grid.getView(), record );

    // paging.moveFirst();
    // paging.doRefresh();
    var store = grid.getStore();
    store.load();
},
    
/**
 * Evento de los checkbox de AWCC, realizan la modificación en el mapa y carga la información
 * 11/04/2019 : Se quitan checkbox de AWCC y se simula igual a MapGuard
 * El caller para AWCC es awcccuentagridview y el fireEvent markersDealerChange esta en AWCC Controller
 * 
 */
onSelectionChange: function(selectionModel, records, options ) {
    var view = selectionModel.view.up( 'cuentagridview' );

    if( view.fireSelectionChange ) {
        var caller;
        if( view.feireSelectionChangeCaller ) {
            caller = view.up( view.feireSelectionChangeCaller ).down( 'gmappanel6' )
        } else {
            caller = view.up( 'mapguardgpsview' ).down( 'gmappanel6' );
        }
        caller.fireEvent( 'markersDealerChange', caller, records );
    }
}
});
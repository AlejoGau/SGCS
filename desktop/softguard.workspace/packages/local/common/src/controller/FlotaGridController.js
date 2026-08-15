//MIGRADO2024
Ext.define( 'Common.controller.FlotaGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'UsersDesktopWebModulosModelSearch', 'VehicleSearchFlotaModel', 'DesktopModuleDetailByUserModel' ],
views: [ 'FlotaGridView' ],
stateful: false,
    init : function(config ) {
        // genero los eventos
        this.control( {
            'flotagridview': {
                afterrender: this.initView,
                beforedestroy: this.onBeforeDestroy,
                itemdblclick: this.onClickItem,
                //itemclick: this.onItemClick,
                selectionchange: this.onSelectionChange,
                //select : this.onSelect,
                groupclick: this.onGroupClick,
                activate: function() {
                    console.log( this )
                }
            },
            'flotagpsview gmappanel6': {
                mapready: this.onMapReady,
            },
            'flotagridview button[action=removefilter]': {
                click: this.onRemovefilterClick
            },
            'flotagridview #comboFlota': {
                select: this.onFlotaSelect
            },
            'flotagridview button[action=searchAll]': {
                click: this.onSearchAllClick
            },
            'flotagridview button[action=filterText]': {
                click: this.onFiltertextClick
            },
            'flotagridview button[action=groupdealer]': {
                click: this.onGroupDealerClick
            },
            'flotagridview #dispositivos-todos': {
                click: this.onDispositivosTodosClick
            },
            'flotagridview #dispositivos-seleccionados': {
                click: this.onDispositivosSeleccionadosClick
            },
            'flotagridview #dispositivos-filtro': {
                click: this.onDispositivosFiltroClick
            },
            'flotagridview #enmovimiento': {
                click: this.onFiltersClick
            },
            'flotagridview #frenado': {
                click: this.onFiltersClick
            },
            'flotagridview #viejas': {
                click: this.onFiltersClick
            },
            'flotagridview #enviaje': {
                click: this.onFiltersClick
            },
            'flotagridview #conalarma': {
                click: this.onFiltersClick
            },
            'flotagridview button[action=filterEnprueba]': {
                click: this.onFiltertextClick
            }
        });
    }, // cierro init  
onSelectionChange: function(selectionModel, records, options ) {
    var view = selectionModel.view.up( 'flotagridview' );
    var flotagpsview = view.up( 'flotagpsview' );
    if( flotagpsview ) {
        var gmappanel6 = flotagpsview.down( '#googlemap' );
        gmappanel6.vehicleList = records;
        gmappanel6.cantidadDispositivos = records.length;
        flotagpsview.cantidadDispositivos = records.length;
        flotagpsview.vehicles = records;
        //flotagpsview.fireEvent('selectionChange',records,flotagpsview);
    }
    this.cambiarContador( view );
    view.down( '#dispositivos-seleccionados' ).toggle( true );
    view.filtroDispositivos = 'seleccionados';
    this.loadGeoJson( view );
},
    
onFiltersClick: function (btn ) {
    var view = btn.up( 'flotagridview' )
    this.loadGeoJson( view )
    this.onFiltertextClick( btn )
},
    
onDispositivosTodosClick: function (btn ) {
    var view = btn.up( 'flotagridview' )
    view.down( '#toolbarestados' ).setDisabled( true );
    view.down( '#toolbarfiltro' ).setDisabled( true );
    this.cambiarContador( view )
    view.filtroDispositivos = 'todos'
    btn.toggle( true )
    this.onRemovefilterClick( btn )
    this.loadGeoJson( view )
},
onDispositivosSeleccionadosClick: function (btn ) {
    var view = btn.up( 'flotagridview' )
    view.down( '#toolbarestados' ).setDisabled( false );
    view.down( '#toolbarfiltro' ).setDisabled( false );
    this.cambiarContador( view )
    view.filtroDispositivos = 'seleccionados'
    btn.toggle( true )
    this.loadGeoJson( view )
},
onDispositivosFiltroClick: function (btn ) {
    var view = btn.up( 'flotagridview' )
    view.down( '#toolbarestados' ).setDisabled( false );
    view.down( '#toolbarfiltro' ).setDisabled( false );
    this.cambiarContador( view )
    view.filtroDispositivos = 'filtro'
    btn.toggle( true )
    this.loadGeoJson( view )
},
    
loadGeoJson: function (view ) {
    var enmovimiento = view.down( '#enmovimiento' ).pressed;
    var frenado = view.down( '#frenado' ).pressed;
    var viejas = view.down( '#viejas' ).pressed;
    var conalarma = view.down( '#conalarma' ).pressed;
    var enviaje = view.down( '#enviaje' ).pressed;
    var showState = [];
    if( enmovimiento ) {
        showState.push( 'enmovimeinto' )
    }
    if( frenado ) {
        showState.push( 'frenado' )
    }
    if( conalarma ) {
        showState.push( 'alarma' )
    }
    if( viejas ) {
        showState.push( 'vieja' )
    }
    //default
    /*if( !view.filtroDispositivos ) {
        view.filtroDispositivos = 'filtro'
    }*/
    //armo filtro
    var filter = [];
    var btnEnprueba = view.down( '#filterEnprueba' );
    var btnBuscar = view.down('#buscar')
    if( view.filtroDispositivos == 'filtro' ) {
        var query = view.down( '#query' );
        var queryType = view.down( '#queryType' );
        /**
         * BC 389742299 : Se solicito agregar el boton EN PRUEBA
         * Esto hace que el filtro del GeoJson tambien debe variar
         */
        if( btnEnprueba.pressed ) {
            filter.push( {
                "Id": "Situacion",
                "property": "Situacion",
                "value": "En Prueba"
            })
        } else {
            filter.push( {
                "Id": "Situacion",
                "property": "Situacion",
                "value": "Habilitada"
            })
        }
        if( enviaje ) {
            filter.push( {
                "Id": "enviaje",
                "property": "enviaje",
                "value": "true"
            })
        }
        if(btnBuscar.pressed){
            //Federico V. condicion agregada para que el filtro lo realice al apretar el boton de buscar 24/01/2024
            filter.push( { "Id": queryType.getValue(), "property": queryType.getValue(), "value": query.getValue() })
        }
        //filter.push( { "Id": queryType.getValue(), "property": queryType.getValue(), "value": query.getValue() })
        if( showState.length > 0 ) {
            filter.push( { "Id": "stateIN", "property": "stateIN", "value": showState.join( ',' ) })
        }
    } else if( view.filtroDispositivos == 'seleccionados' ) {
        var ids = []
        Ext.Array.each( view.getSelectionModel().getSelection(), function( v ) {
            ids.push( v.get( 'cue_iid' ) )
        })
        if( ids.length > 0 ) {
            filter.push( { "property": 'cue_iidIN', "value": ids.join( ',' ) })
        } else {
            //notify( 'Se muestran todos hasta que se seleccione alguno' );
            filter.push( { "property": 'cue_iidIN', "value": '0' } ); //23/12/2025 Daniel O. Medina se agrega este filtro para que no muestre nada si no hay seleccionados
        }
    } else if( view.filtroDispositivos == 'todos' ) {
    }
    //armo url       
    var dateNow = new Date()
    var urlgeojson = '/handler/dispositivosGeoJson';
    urlgeojson += '?token=' + Ext.util.Cookies.get( 'OAuth_Token' );
    if( filter.length > 0 ) {
        urlgeojson += '&filter=' + Ext.encode( filter );
    }
    urlgeojson += "&_dc=" + dateNow.getTime();
    //envio al mapa si esta visible
    //El caller no se está enviando aqui
    if( view.caller && view.filtroDispositivos == 'filtro' || view.filtroDispositivos == 'seleccionados' || view.filtroDispositivos == 'todos' ){
        if( view.caller.isVisible() ) {
            view.caller.fireEvent( 'setUrlGeoJson', urlgeojson, view.caller, true );
        }
    }
        
},
    
    
onGroupDealerClick: function(button, event, options ) {
    var view = button.up( 'flotagridview' );
    var store = view.getStore();
    var grouping = view.getView().features[ 0 ];
    if( button.pressed ) {
        grouping.enable();
        store.group( 'cue_clinea' );
    } else {
        grouping.disable();
        store.clearGrouping();
        view.getView().refresh()
    }
},
initView: function(view ) {
    var controller = this;
    var filters = [ { "Id": "Situacion", "property": "Situacion", "value": "Habilitada" }];
    if( view.onlyGpsCords ) {
        filters = [
            {
                property: 'gps_valid',
                value: 'true'
            }
        ]
    }
    var enmovimiento = view.down( '#enmovimiento' ).pressed;
    var frenado = view.down( '#frenado' ).pressed;
    var viejas = view.down( '#viejas' ).pressed;
    var conalarma = view.down( '#conalarma' ).pressed;
    var enviaje = view.down( '#enviaje' ).pressed;
    var showState = [];
    if( enmovimiento ) {
        showState.push( 'enmovimeinto' )
    }
    if( frenado ) {
        showState.push( 'frenado' )
    }
    if( conalarma ) {
        showState.push( 'alarma' )
    }
    if( viejas ) {
        showState.push( 'vieja' )
    }
    if( showState.length > 0 ) {
        filters.push( { "Id": "stateIN", "property": "stateIN", "value": showState.join( ',' ) })
    }
    if( enviaje ) {
        filter.push( {
            "Id": "enviaje",
            "property": "enviaje",
            "value": "true"
        })
    }
    var store = Ext.create( 'Ext.data.Store', {
        model: this.getVehicleSearchFlotaModelModel(),
        remoteFilter: true,
        pageSize: 100,
        remoteGroup: false,
        filters: filters,
        listeners: {
            load: function( store, records ) {
                var gpsview = view.up( 'flotagpsview' );
                if( gpsview && records ) {
                    gpsview.totalDispositivos = records.length;
                }
            }
        },
        sorters: [
            {
                property: 'Name',
                direction: 'ASC',
                id: 'Name'
            }
        ]
    });
    view.bindStore( store );
    var pagingtoolbar = view.down( '#pagingtoolbar' );
    pagingtoolbar.bindStore( store );
    /*
    store.load({
        params: {
            short: true
        },
        callback: function(records, operation, success){
            if (myQueryString.idCuenta){
                var record = this.findRecord('cue_iid',myQueryString.idCuenta);
                if (record){
                    view.getSelectionModel().select(record);
                } 
            } else if (!view.selectNone){
                if(view.seleccionInicial) {
                    Ext.Array.each(view.seleccionInicial,function (v) {
                       view.getSelectionModel().select( v.index, true);
                    })
                    
                } else {
                    view.getSelectionModel().selectAll(true);
                }
                //view.close();
            }
       
        }
    });
    */
     //Daniel O. Medina por pedido de tarea DSS-786 se activa nuevamente esta línea     
    this.onFiltertextClick( view.down('#buscar') );
    
    // Refresco periodico: arranque DIRECTO con Ext.TaskManager (mismo enfoque que
    // MovilesGridController, que SI funciona). Antes usaba un new Ext.util.TaskRunner()
    // local + un Ext.Function.defer( view.task.start(), ... ) roto en onMapReady (el ()
    // ejecutaba start() en el acto y le pasaba un no-funcion a defer) => el task nunca
    // quedaba corriendo y loadGeoJson no disparaba nunca.
    if( !view.task ) {
        view.task = Ext.TaskManager.start( {
            run: this.loadGeoJson,
            args: [ view ],
            scope: controller,
            interval: 5000
        });
    }
},
onMapReady: function(gmappanel6 ) {
    var controller = this;
    var view = gmappanel6.up( 'flotagpsview' ).down( 'flotagridview' );
    // El task de refresco ya arranca solo en initView (Ext.TaskManager). Aca solo limpio el filtro.
    controller.onRemovefilterClick( view.down( '#searchAll' ) );
},
// Cleanup al cerrar la solapa: freno el task para que no quede pegandole al server.
onBeforeDestroy: function(view ) {
    if( view.task ) {
        Ext.TaskManager.stop( view.task );
        view.task = null;
    }
},
    
loadFlotas: function(view ) {
    // traigo los datos del usuario
    Ext.Ajax.request( {
        url: '/Rest/Security/UserData',
        failure: function( r, o ) {
            //alert("No se pudieron cargar los modulos, por favor, intente nuevamente");
            //window.location.href="/";
        },
        success: function( response, action ) {
            var infoUser = Ext.JSON.decode( response.responseText );
            var modules = Ext.create( 'Ext.data.Store', {
                model: this.getUsersDesktopWebModulosModelSearchModel(),
                filters: [ {
                    property: 'dwm_idModules',
                    value: 0
                }, {
                        property: 'dwm_idWeb',
                        value: infoUser.udw_idKey
                    }]
            })
            view.down( '#comboFlota' ).bindStore( modules );
            modules.load( {
                callback: function( records, operation, success ) {
                    if( records.length == 0 ) {
                        view.down( '#comboFlota' ).hide();
                    }
                }
            });
        },
        scope: this
    });
},
    
onGroupClick: function(view, node, value, event, options ) {
    var t = event.getTarget( '.grpCheckbox' );
    var store = view.store;
    var grouper = store.groupers.items[ 0 ];
    var field = grouper.property;
    if( t ) {
        var checked = t.checked;
        store.each( function( rec, index ) {
            if( rec.get( field ) == value ) {
                if( checked ) {
                    view.getSelectionModel().select( rec, true );
                } else {
                    view.getSelectionModel().deselect( rec );
                }
            }
        });
    }
},
onFlotaSelect: function(combo, records ) {
},
    
onRemovefilterClick: function(button, event, options ) {
    var view = button.up( 'flotagridview' );
    view.down( '#query' ).setValue( '' )
    view.down( '#enmovimiento' ).toggle( true );
    view.down( '#frenado' ).toggle( true );
    view.down( '#viejas' ).toggle( true );
    view.down( '#conalarma' ).toggle( true );
    this.onFiltertextClick( button )
},
    
onFiltertextClick: function(button, event, options ) {
    var controller = this;
    var view = button.up( 'flotagridview' );
    var store = view.getStore();
    var query = view.down( '#query' );
    var queryType = view.down( '#queryType' );
    view.getSelectionModel().deselectAll()
    store.clearFilter( true );
    store.currentPage = 1;
    store.remoteFilter = false;
    /**
     * BC 389742299 : Se solicito agregar el boton EN PRUEBA
     * El funcionamiento pasa a ser el siguiente
     * 
     * Click en boton TODOS, chequeo que este pressed el boton En Prueba
     * De estarlo, muestro todos los filtrados pero en prueba, caso contrario habilitados.
     */
    var filters = [];
    var btnEnprueba = view.down( '#filterEnprueba' );
    if( button.text == 'Todos' && btnEnprueba.pressed || button.itemId == 'filterEnprueba' && btnEnprueba.pressed ) {
        filters.push( {
            "Id": "Situacion",
            "property": "Situacion",
            "value": "En Prueba"
        })
    } else {
        filters.push( {
            "Id": "Situacion",
            "property": "Situacion",
            "value": "Habilitada"
        })
    }
    if( query.getValue() ) {
        filters.push( { "Id": queryType.getValue(), "property": queryType.getValue(), "value": query.getValue() })
    }
    var enmovimiento = view.down( '#enmovimiento' ).pressed;
    var frenado = view.down( '#frenado' ).pressed;
    var viejas = view.down( '#viejas' ).pressed;
    var conalarma = view.down( '#conalarma' ).pressed;
    var enviaje = view.down( '#enviaje' ).pressed;
    var showState = [];
    if( enviaje ) {
        filters.push( {
            "Id": "enviaje",
            "property": "enviaje",
            "value": "true"
        })
    }
    if( enmovimiento ) {
        showState.push( 'enmovimeinto' )
    }
    if( frenado ) {
        showState.push( 'frenado' )
    }
    if( conalarma ) {
        showState.push( 'alarma' )
    }
    if( viejas ) {
        showState.push( 'vieja' )
    }
    if( showState.length > 0 ) {
        filters.push( { "Id": "stateIN", "property": "stateIN", "value": showState.join( ',' ) })
    }
    store.filter( filters );
    store.remoteFilter = true;
    view.down( '#toolbarestados' ).setDisabled( false )
    store.load( {
        callback: function( records, operation, success ) {
            console.log( arguments );
            if( view.up( 'flotagpsview' ) ) {
                view.up( 'flotagpsview' ).totalDispositivos = operation.resultSet ? operation.resultSet.total : 0
            }
            controller.cambiarContador( view );
            controller.loadGeoJson( view )
            if( view.filtroDispositivos != 'todos' ) {
                view.down( '#toolbarestados' ).setDisabled( false )
            }
        }
    })
},
    
onSearchAllClick: function(button, event, options ) {
    var controller = this;
    var view = button.up( 'flotagpsview' );
    var viewport = Ext.getCmp( 'viewport' );
    var gmap = viewport.down( '#googlemap' );
    var store = Ext.create( 'Ext.data.Store', {
        model: this.getVehicleSearchModelModel(),
        pageSize: 10000,
        remoteFilter: false,
        sorters: [
            {
                property: 'Name',
                direction: 'ASC'
            }
        ],
    });
    store.filter( [ { "Id": "Situacion", "property": "Situacion", "value": "Habilitada" }] );
    store.remoteFilter = true;
    store.load( {
        callback: function( records, operation, success ) {
            view.all = true;
            gmap.fireEvent( 'markersChange', gmap, records );
            view.totalDispositivos = records.length;
        }
    })
},
    
cambiarContador: function (view ) {
    var viewParent = view.up( 'flotagpsview' )
    if( viewParent ) {
        if( view.down( '#dispositivos-seleccionados' ).pressed ) {
            if( viewParent.totalDispositivos ) {
                view.setTitle( getLocale( 'Dispositivos Seleccionados / Total: ' ) + viewParent.cantidadDispositivos + ' / ' + viewParent.totalDispositivos )
                //viewParent.down('#menudispositivos').setText(getLocale('Dispositivos Seleccionados / Total: ')+viewParent.cantidadDispositivos+' / '+viewParent.totalDispositivos)
            } else if( viewParent.cantidadDispositivos ) {
                view.setTitle( getLocale( 'Dispositivos Seleccionados: ' ) + viewParent.cantidadDispositivos )
                //viewParent.down( '#menudispositivos' ).setText( getLocale( 'Dispositivos Seleccionados: ' ) + viewParent.cantidadDispositivos )
            } else {
                view.setTitle( getLocale( 'Dispositivos Seleccionados: ' ) + "0" )
                // viewParent.down('#menudispositivos').setText(getLocale('Dispositivos Seleccionados: ')+"0")
            }
        } else if( view.down( '#dispositivos-todos' ).pressed ) {
            view.setTitle( getLocale( 'Todos los dispositivos' ) )
            //viewParent.down('#menudispositivos').setText(getLocale('Todos los dispositivos'))
        } else {
            view.setTitle( getLocale( 'Dispositivos por filtro' ) )
            //viewParent.down('#menudispositivos').setText(getLocale('Dispositivos por filtro'))
        }
    }
},
onClickItem: function (grid, record, item, index, e, options ) {
    var id = Array.isArray( record ) ? record[ 0 ].get( 'Id' ) : record.get( 'Id' );
    var panel = grid.up( '#center' );
    var view = grid.up();
    var editorview = 'vehicleview';
    var tabName = record.get( 'cue_cnombre' ) + ' (' + record.get( 'cue_ncuenta' ) + ')';
     if (this.application._nameModule == "TrackguardMonitoreo"){
            var editorview='vehicleslavegpsview';
        }
    tabName = tabName
        .replace( /,/g, '' )
        .replace( /\[/g, '' )
        .replace( /\]/g, '' )
        .replace( /#/g, '' )
        .replace( /\./g, '' )
        .replace( />/g, '' );
    var mytab = panel.down( '[title="' + tabName + '"]' );
    if( !mytab ) {
        var newTab = Ext.widget( editorview, {
            tabConfig: { translate: false },
            title: tabName,
            objectId: id,
            openPosicion: true,
            translate: false,
            closable: true,
            record: record,
            closeAction: 'destroy',
            caller: view
        });
        panel.add( newTab );
        panel.setActiveTab( newTab );
    }
    // el existe, lo activo
    else {
        mytab.show();
    }
    //escondo el despegable 
    //view.up('menu').hide()
}
});
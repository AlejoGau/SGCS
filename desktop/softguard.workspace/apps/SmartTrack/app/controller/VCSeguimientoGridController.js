Ext.define( 'SmartTrack.controller.VCSeguimientoGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'VCCuentaSeguimientoModel', 'KeyModulesModel', 'SmartTrackSearchModel' ],
views: [ 'VCSeguimientoGridView' ],

init: function(config ) {
    // genero los eventos
    this.control(
        {
            'vcseguimientogridview': {
                afterrender: this.initView,
                mostrarSeguimiento: this.onMostrarSeguimiento
            },
            'vcseguimientogridview button[action=search]': {
                click: this.onSearchClick
            },
            'vcseguimientogridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'vcseguimientogridview button[action=groupAlarmas]': {
                click: this.onGroupAlarmasClick
            }

            /**
             * Nueva vista para el menu dispositovo
             */
            ,
            'vcseguimientogridmenuview': {
                afterrender: this.initView,
                selectionchange: this.onSelectionChange,
                reloadMarkers: this.armoUrlGeoJson
            },
            'vcseguimientogridmenuview button[action=groupAlarmas]': {
                click: this.onGroupAlarmasClick
            },
            'vcseguimientogridmenuview button[action=search]': {
                click: this.onSearchClick
            },
            'vcseguimientogridmenuview #dispositivos-todos': {
                click: this.onDispositivosTodosClick
            },
            'vcseguimientogridmenuview #dispositivos-seleccionados': {
                click: this.onDispositivosSeleccionadosClick
            },
            'vcseguimientogridmenuview #dispositivos-filtro': {
                click: this.onDispositivosFiltroClick
            },
            'vcseguimientogridmenuview button[action=getall]': {
                click: this.onGetAllClick
            },
            'vcseguimientogridmenuview #dispersoVigicontrol': {
                click: this.onSubfixFiltroClick
            },
            'vcseguimientogridmenuview #viejasVigicontrol': {
                click: this.onSubfixFiltroClick
            },
            'vcseguimientogridmenuview #actualesVigicontrol': {
                click: this.onSubfixFiltroClick
            }
        }
    );
},

initView: function(view ) {
    view.licenseViolation = false;
    var isAdmin = view.isAdmin;
    //if (!isAdmin)
    //view.down('#toolbardisplayfield').hide(); esta dando error y no encuentro nada, vieno copiado?


    view.filters = [ {
        property: 'cue_ncuenta:NOT',
        value: ''
    }, {
            property: 'Imei:NOT',
            value: ''
        }];

    if( this.application._nameModule === "CleanApp" ) {
        view.filterTipo = 9;
    }

    if( view.filterTipo ) {
        view.filters.push( {
            property: 'tip_nTipo',
            value: view.filterTipo
        })
    }

    var store = Ext.create( 'Ext.data.Store', {
        model: this.getVCCuentaSeguimientoModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        //  groupField: 'cue_cnombre',

        remoteGroup: false,
        filters: view.filters
    })
    view.bindStore( store );
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.bindStore( store );

    store.load( {
        callback: function() {

            var grouping = view.getView().features[ 0 ];
            grouping.enable();
            store.group( 'cue_cnombre', 'ASC' );

        }
    });

    var storeKey = Ext.create( 'Ext.data.Store', {
        model: this.getKeyModulesModelModel()
    })
    var t = this;
    storeKey.load( {
        callback: function() {
            storeKey.each( function( record ) {
                if( record.get( 'Module' ) == 'SmartTrack' ) {
                    view.QtyUsers = record.get( 'QuantityOfUsers' );
                    store.load();
                }
            }, this );

            t.tieneUsuariosDisponibles( view );
        }
    });
},
        
        
onMostrarSeguimiento: function(record, view ) {
    if( view.licenseViolation ) {
        notifyError( 'Hay mas dispositivos asociados que los permitidos!' )
        return false
    }

    var title = record.get( 'cue_clinea' ) + '-' + record.get( 'cue_ncuenta' ) + ' - ' + record.get( 'cue_cnombre' ) + ' ' + record.get( 'Nombre' );//"Evento: " + record.get('rec_iid');
    title = title.replace( ',', '' );

    var id = record.get( 'CuentaId' );
    var panel = view.up( 'tabpanel' );
    var mon = Ext.widget( 'vcseguimientomapview', {
        title: title,
        translate: false,
        record: record,
        closable: true,
        closeAtion: 'Destroy'
    });

    panel.add( mon );
    panel.setActiveTab( mon );
},
        
onGroupAlarmasClick: function(button, event, options ) {
    var view = button.up( 'vcseguimientogridview' ) ? button.up( 'vcseguimientogridview' ) : button.up( 'vcseguimientogridmenuview' );
    var store = view.store;
    var grouping = view.getView().features[ 0 ];

    /*  if (button.pressed){
        grouping.enable();
        //store.group('cue_cnombre');
    }else {
        grouping.disable();
        view.getView().refresh()
    }*/

    if( button.pressed ) {
        grouping.enable();
        store.group( 'cue_cnombre', 'ASC' );
    } else {
        grouping.disable();
        store.clearGrouping();
        //view.getView().refresh()
    }
},
        
onSearchClick: function(button, event, options ) {
    var view = button.up( 'vcseguimientogridview' ) ? button.up( 'vcseguimientogridview' ) : button.up( 'vcseguimientogridmenuview' );
    var store = view.getStore();
    // var query = view.down('#query');
    //var field = view.down('#fieldName');
    /* view.filters.add = ;*/
    var filters = [ {
        property: 'cue_ncuenta:NOT',
        value: ''
    }];

    // Ext.clone(view.filters);
    var queryType = view.down( '#queryType' ).getValue();
    var query = view.down( '#query' ).getValue();

    // var name = view.down('#Imei').getValue();
    //var lastname = view.down('#Telefono').getValue();
    //var email = view.down('#Cuenta').getValue();

    if( queryType == 'imei' )
        filters.push( {
            property: 'Imei:LIKE',
            value: query,
            id: 'search'
        });

    if( queryType == 'telefono' )
        filters.push( {
            property: 'Telefono:LIKE',
            value: query,
            id: 'search'
        });

    if( queryType == 'nombre' )
        filters.push( {
            property: 'cue_cnombre:LIKE',
            value: query,
            id: 'search'
        });

    if( queryType == 'usuario' )
        filters.push( {
            property: 'Nombre:LIKE',
            value: query,
            id: 'search'
        });

    if( queryType == 'cuenta' )
        filters = [ {
            property: 'cue_ncuenta:LIKE',
            value: query,
            id: 'search'
        }];

    if( queryType == 'dealer' )
        filters = [ {
            property: 'cue_clinea:LIKE',
            value: query,
            id: 'search'
        }];

    if( this.application._nameModule === "CleanApp" ) {
        filters.push( {
            property: 'tip_nTipo',
            value: 9
        })
    }
    var states = [];
    if( view.down( '#actualesVigicontrol' ) && view.down( '#actualesVigicontrol' ).pressed ) {
        states.push( 'current' )
    }
    if( view.down( '#dispersoVigicontrol' ) && view.down( '#dispersoVigicontrol' ).pressed ) {
        states.push( 'disper' )
    }
    if( view.down( '#viejasVigicontrol' ) && view.down( '#viejasVigicontrol' ).pressed ) {
        states.push( 'old' )
    }
    filters.push( {
        property: 'state:IN',
        value: states.join( ',' ),
        id: 'state'
    });

    if( filters.length > 0 ) {
        store.clearFilter( true );
        store.filter( filters );

    } else {
        store.clearFilter();
    }
},
        
tieneUsuariosDisponibles: function (view, callback ) {
    //var fieldToolBar = view.down('#toolbardisplayfield');
    if( view.QtyUsers != 0 ) { //==0 solo para testeo
        var store = Ext.create( 'Ext.data.Store', {
            model: this.getSmartTrackSearchModelModel(),
            pageSize: 1000, // estaba tirando 25 max
            filters: [ {
                property: 'cue_ncuenta:NOT',
                value: ''
            }]
        })

        store.load( function() {
            var asignados = this.getTotalCount();
            if( asignados == view.QtyUsers ) {
                // actualizo cantidades en la barra
                {
                    var t = view.down( 'toolbar' );
                    //fieldToolBar.setValue(getLocale('Disponibles/Usados') +' ('+view.QtyUsers+'/'+asignados+')');      
                }
                view.down( '[action="nuevo"]' ).setDisabled( true );
                var msg = getLocale( 'Se supero la cantidad de asignaciones disponibles' ) + '. (' + asignados + '\/' + view.QtyUsers + ')';
                Ext.Msg.alert( 'Atención', msg, Ext.emptyFn );

            } else if( asignados > view.QtyUsers ) {
                // actualizo cantidades en la barra
                //fieldToolBar.setValue(getLocale('Disponibles/Usados') +' ('+view.QtyUsers+'/'+asignados+')');
                //view.down('#queryType').setDisabled(true);
                //view.down('#query').setDisabled(true);
                //view.down('[action="search"]').setDisabled(true);
                //view.down('[action="getall"]').setDisabled(true);

                view.down( '[action="groupAlarmas"]' ).setDisabled( true );
                view.down( '[action="configurar"]' ).setDisabled( true );
                view.down( '[action="nuevo"]' ).setDisabled( true );
                Ext.Msg.alert( 'Atención', getLocale( 'Se supero la cantidad de asignaciones disponibles. Por favor comuniquese con el administrador' ) + '.(' + asignados + '/' + view.QtyUsers + ')', Ext.emptyFn );
                view.licenseViolation = true;
                view.fireEvent( 'licenseviolation' );
            } else {
                // actualizo cantidades en la barra
                //fieldToolBar.setValue(getLocale('Disponibles/Usados')+' ('+view.QtyUsers+'/'+asignados+')');
                if( callback ) {
                    callback();
                }
            }
        });
    } else {
        // actualizo cantidades en la barra
        var t = view.down( 'toolbar' );
        fieldToolBar.setValue( getLocale( 'Dispositivos ilimitados' ) );
        if( callback ) {
            callback();
        }
    }
},
        
onGetAllClick: function(button, event, options ) {
    var view = button.up( 'vcseguimientogridview' ) ? button.up( 'vcseguimientogridview' ) : button.up().up();
    var store = view.getStore();

    store.clearFilter( true );
    store.filter( view.filters );
    view.down( '#queryType' ).setValue( '' );
    view.down( '#query' ).setValue( '' );

    if( view.down( '#actualesVigicontrol' ) ) {
        view.down( '#actualesVigicontrol' ).toggle( true )
    }
    if( view.down( '#dispersoVigicontrol' ) ) {
        view.down( '#dispersoVigicontrol' ).toggle( true )
    }
    if( view.down( '#viejasVigicontrol' ) ) {
        view.down( '#viejasVigicontrol' ).toggle( true )
    }
},
onSelectionChange: function(selectionModel, records, options ) {
    var view = selectionModel.view.up( 'vcseguimientogridmenuview' );
    if( view.fireSelectionChange ) {
        if( view.down( '#dispositivos-seleccionados' ) ) {
            view.down( '#dispositivos-seleccionados' ).toggle( true )
        }
        view.filtroDispositivos = 'seleccionados'
        this.armoUrlGeoJson( view )
    }
},
onDispositivosTodosClick: function (btn ) {
    var view = btn.up( 'vcseguimientogridmenuview' );

    view.down( '#toolbarfiltro' ).setDisabled( true );
    view.filtroDispositivos = 'todos'
    btn.toggle( true )
    this.armoUrlGeoJson( view )
},
onDispositivosSeleccionadosClick: function (btn ) {
    var view = btn.up( 'vcseguimientogridmenuview' );

    view.down( '#toolbarfiltro' ).setDisabled( false );
    view.filtroDispositivos = 'seleccionados'
    btn.toggle( true )
    this.armoUrlGeoJson( view )
},
onDispositivosFiltroClick: function (btn ) {
    var view = btn.up( 'vcseguimientogridmenuview' );

    view.down( '#toolbarfiltro' ).setDisabled( false );
    view.filtroDispositivos = 'filtro'
    btn.toggle( true )
    this.armoUrlGeoJson( view )
},
onSubfixFiltroClick: function (btn ) {
    var view = btn.up( 'vcseguimientogridmenuview' );

    this.onSearchClick( btn )
    this.armoUrlGeoJson( view )
},
armoUrlGeoJson: function (view ) {
    var controller = this
    var continueLoad = true;
    var filters = []

    /**
     * Limpio siempre los markers
     */
    if( view.gmappanel.smarttrack ) {
        view.gmappanel.smarttrack.forEach( function( feature ) {
            view.gmappanel.smarttrack.remove( feature )
        })
    }

    if( view.gmappanel ) {
        //armo url para geojson           
        var urlgeojson = '/handler/SmartTrackGeoJson';
        var dateNow = new Date()
        urlgeojson += '?token=' + Ext.util.Cookies.get( 'OAuth_Token' );
        urlgeojson += "&_dc=" + dateNow.getTime();

        if( view.filtroDispositivos == 'seleccionados' ) {
            var ids = []
            Ext.Array.each( view.getSelectionModel().getSelection(), function( record ) {
                ids.push( record.get( 'Id' ) )
            })

            filters = [ {
                property: 'Id:ININT',
                value: ids.join( ',' )
            }];

            if( ids.length > 0 ) {
            } else {
                // notify('Debe seleccionar algun smartpanics para continuar.')
                continueLoad = false;
            }

        } else if( view.filtroDispositivos == 'filtro' ) {
            filters = Ext.clone( view.filters );
            var queryType = view.down( '#queryType' ).getValue();
            var query = view.down( '#query' ).getValue();

            var filters = [ {
                property: 'cue_ncuenta:NOT',
                value: ''
            }];

            var queryType = view.down( '#queryType' ).getValue();
            var query = view.down( '#query' ).getValue();

            if( queryType == 'imei' && query != "" )
                filters.push( {
                    property: 'Imei:LIKE',
                    value: query,
                    id: 'search'
                });

            if( queryType == 'telefono' && query != "" )
                filters.push( {
                    property: 'Telefono:LIKE',
                    value: query,
                    id: 'search'
                });

            if( queryType == 'nombre' && query != "" )
                filters.push( {
                    property: 'cue_cnombre:LIKE',
                    value: query,
                    id: 'search'
                });

            if( queryType == 'usuario' && query != "" )
                filters.push( {
                    property: 'Nombre:LIKE',
                    value: query,
                    id: 'search'
                });

            if( queryType == 'cuenta' && query != "" )
                filters = [ {
                    property: 'cue_ncuenta:LIKE',
                    value: query,
                    id: 'search'
                }];

            if( queryType == 'dealer' && query != "" )
                filters = [ {
                    property: 'cue_clinea:LIKE',
                    value: query,
                    id: 'search'
                }];

        }

        if( this.application._nameModule === "CleanApp" ) {
            filters.push( {
                property: 'tip_nTipo',
                value: 9,
            });
        }
        /**
         * Leo los botones del header de la window
         * 
         */
        var states = [];
        if( view.down( '#actualesVigicontrol' ).pressed ) {
            states.push( 'current' )
        }
        if( view.down( '#dispersoVigicontrol' ).pressed ) {
            states.push( 'disper' )
        }
        if( view.down( '#viejasVigicontrol' ).pressed ) {
            states.push( 'old' )
        }
        filters.push( {
            property: 'state:IN',
            value: states.join( ',' ),
            id: 'state'
        });
        
        urlgeojson += '&filter=' + Ext.encode( filters );

        //console.log(urlgeojson,gmappanel)
        /**
         * Actualizo el mapa
         */
        view.gmappanel.smarttrack.loadGeoJson( urlgeojson );
    }
}
});
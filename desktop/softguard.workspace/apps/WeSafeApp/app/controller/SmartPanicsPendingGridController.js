Ext.define( 'WeSafe.controller.SmartPanicsPendingGridController', {
    extend: 'Ext.app.Controller',
    stores: [  ],
models: [ 'SmartPanicSearchModel', 'KeyModulesModel', 'SmartPanicModel', 'TelefonoSearchModel', 'SoftguardTelefonoModel', 'SoftguardUsuarioModel' ],
views: [ 'SmartPanicPendingGridView' ],

init: function(config ) {
    // genero los eventos
    this.control(
        {
            'smartpanicpendinggridview': {
                afterrender: this.initView,
                objectedit: this.onObjectEdit,
                //cuentachanged: this.onCuentaChanged,
                cuentaselected: this.onCuentaChanged,
                cuentanew: this.onCuentaNew,
                smartpanicchange: this.onSmartPanicChange
            },
            'smartpanicgridview': {
                smartpanicchange: this.onSmartPanicChange
            },
            'smartpanicpendinggridview button[action=search]': {
                click: this.onSearchClick
            },
            'smartpanicpendinggridview button[action=getall]': {
                click: this.onGetAllClick
            },
            'smartpanicpendinggridview button[action=asignarcuenta]': {
                click: this.onAsignarCuentaClick
            },

            /*  'smartpanicpendinggridview button[action=configurar]': {
                  click: this.onConfigurarClick
              },*/
            'smartpanicpendinggridview button[action=groupAlarmas]': {
                click: this.onGroupAlarmasClick
            },
            'smartpanicpendinggridview button[action=delete]': {
                click: this.onDeleteClick
            }
        });
},
    
    
aplicasPermisos: function (json, view ) {
    if( json.baja && json.baja == 'true' ) {
        view.down( '#delete' ).show()
    }
    if( json.asignardesasignar && json.asignardesasignar == 'true' ) {
        view.down( '#asignarcuenta' ).show()
    }
},

initView: function(view ) {
    var controller = this;
    var securitymodules = SecurityModulesStore;//controller.getSecurityModulesStoreStore();

    var administratorModule = securitymodules.findRecord( 'KeyReference', 'Administrator' );
    var isAdmin = administratorModule ? administratorModule.get( 'Available' ) : false;


    if( isAdmin ) {
        controller.aplicasPermisos( {
            baja: 'true',
            asignardesasignar: 'true'
        }, view )
    } else {
        var url = '/Rest/Security/Modules/' + controller.application.getModuleIdByName( 'SmartPanics' ) + '/Security';

        Ext.Ajax.request( {
            url: url,
            method: 'GET',
            success: function( resp, operation ) {
                var json = resp.responseText ? JSON.parse( resp.responseText ) : null;
                if( json ) {


                    controller.aplicasPermisos( json, view )


                }
            }
        })
    }
    if( view.hideCounter ) {
        view.down( '#toolbardisplayfield' ).hide();
    }

    view.filters = [ {
        property: 'cue_ncuenta:ISNULLOREMPTY',
        value: ''
    }];

    var store = Ext.create( 'Ext.data.Store', {
        model: this.getSmartPanicSearchModelModel(),
        pageSize: 50,
        remoteSort: true,
        remoteFilter: true,
        filters: view.filters
    })
    console.log("SmartPanicPendingGridController - Init")
    store.addFilter({
        property: 'IsWeSafe',
        value: '1'
    });

    view.bindStore( store );
    var toolbar = view.down( 'pagingtoolbar' );
    toolbar.bindStore( store );

    // modificar y poner keymodules store
    var storeKey = Ext.create( 'Ext.data.Store', {
        model: this.getKeyModulesModelModel()
    })

    var t = this;
    storeKey.load( {
        callback: function() {
            storeKey.each( function( record ) {
                if( record.get( 'Module' ) == 'SmartPanics' ) {
                    view.QtyUsers = record.get( 'QuantityOfUsers' );
                    store.load();
                }
            }, this );
            t.tieneUsuariosDisponibles( view );
        }
    });
},

onSmartPanicChange: function (record, view ) {
    var gridview = view.up( 'viewport' ).down( 'smartpanicpendinggridview' );

    if( gridview ) {
        gridview.down( 'pagingtoolbar' ).doRefresh();
    }
},

onDeleteClick: function(button, event, options ) {
    var view = button.up( 'smartpanicpendinggridview' );
    var selection = view.getSelectionModel().getSelection();
    var model = this.getSmartPanicModelModel();
    var cantidad = selection.length;

    Ext.Array.each( selection, function( record, i ) {
        record.setConfig({
            proxy: model.getProxy()
        });
        if( record.get( 'CuentaId' ) == 0 ) {

            record.destroy( {
                callback: function() {
                    if( cantidad >= i ) {
                        view.down( 'pagingtoolbar' ).doRefresh();
                    }
                }
            });

        } else {
            notify( 'El telefono ' + record.get( 'Telefono' ) + ' no puede ser eliminado por que se encuentra asociado.' );
        }
    });
},

onGroupAlarmasClick: function(button, event, options ) {
    var view = button.up( 'smartpanicpendinggridview' );
    var store = view.store;

    if( button.pressed ) {
        store.group( 'cue_cnombre' );
    } else {
        store.clearGrouping();
        view.getView().refresh()
    }
},

onAsignarCuentaClick: function(button, event, options, ) {
    var view = button.up( 'smartpanicpendinggridview' );

    this.tieneUsuariosDisponibles( view, function() {
        var selection = view.getSelectionModel().getSelection();
        var record = selection[ 0 ];

        if( parseInt( record.get( 'Telefono' ) ) > 0 ) {
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
                        tip_nCondicion: "0,1,null",
                        caller: view
                    }
                ]
            });
            win.show();

        } else {
            notify( 'Debe tener número de teléfono para poder asignar una cuenta.' );
        }
    });
},
    
onObjectEdit: function(record, view ) {

    this.tieneUsuariosDisponibles( view, function() {
        this.onItemClick( view, record );
    });

},


onGetAllClick: function(button, event, options ) {
    var view = button.up( 'smartpanicpendinggridview' );
    var store = view.getStore();
    store.clearFilter( true );
    view.filters.push({
        property: 'IsWeSafe',
        value: '1'
    });
    store.filter( view.filters );
},
    
onSearchClick: function(button, event, options ) {
    var menu = button.up( '#filtrostr' ).menu;
    var telefono = menu.down( '#telefonoId' ).getValue();
    var usuario = menu.down( '#usuarioId' ).getValue();
    var imei = menu.down( '#imeiId' ).getValue();
    var fechaDesde = menu.down( '#fechadesde' ).getValue();
    var fechaHasta = menu.down( '#fechahasta' ).getValue();
    var view = button.up( 'smartpanicpendinggridview' );
    var store = view.getStore();
    /*var view = button.up('smartpanicpendinggridview');
    
    var store = view.getStore();
   // var query = view.down('#query');
    //var field = view.down('#fieldName');
    
    var filters = Ext.clone(view.filters);
    
    var queryType = view.down('#queryType').getValue();
    var query = view.down('#query').getValue();*/

    // var name = view.down('#Imei').getValue();
    //var lastname = view.down('#Telefono').getValue();
    //var email = view.down('#Cuenta').getValue();

    // Construir filtro de búsqueda para el número de teléfono
    if( !telefono && !usuario && !imei && !fechaDesde && !fechaHasta ) {
        //Ext.Msg.alert('Información', 'Por favor ingrese al menos un criterio de búsqueda.');
        return;
    }

    var telefonoFilter = null;
    if( telefono ) {
        telefonoFilter = {
            property: 'Telefono:LIKE',
            value: '%' + telefono + '%',
        };
    }

    // Aplicar todos los filtros
    var filters = Ext.clone( view.filters );
    if( telefonoFilter ) {
        filters.push( telefonoFilter );
    }
    if( usuario ) {
        filters.push( {
            property: 'Nombre:LIKE',
            value: '%' + usuario + '%',
        });
    }
    if( imei ) {
        filters.push( {
            property: 'Imei:LIKE',
            value: '%' + imei + '%',
        });
    }
    if( fechaDesde && fechaHasta ) {
        filters.push( {
            property: 'rec_tfechahora',
            value: {
                $gte: fechaDesde,
                $lte: fechaHasta
            },
            operator: 'AND'
        });
    }

    // Aplicar los filtros a la tienda
    //store.clearFilter();
    store.filter( filters );
    // ...
},
    
onCuentaChanged: function(cuenta, view ) {
    var gridview = view.up( 'viewport' ).down( 'smartpanicpendinggridview' );
    var selection = view.getSelectionModel().getSelection();
    var model = this.getSmartPanicModelModel();
    var telefonoModel = this.getTelefonoSearchModelModel();
    var t = this;

    Ext.Array.each( selection, function( record, key ) {
        console.log( "record", record )
        var telefono = record.get( 'Telefono' );;
        var filters = [ {
            property: 'tel_ctelefono',
            value: telefono
        }, {
                property: 'tel_iidcuenta',
                value: cuenta.get( 'Id' )
            }];

        var store = Ext.create( 'Ext.data.Store', {
            model: telefonoModel,
            pageSize: 50,
            remoteSort: true,
            remoteFilter: true,
            filters: filters
        });

        store.load( {
            callback: function( records ) {
                record.setConfig({
                    proxy: model.getProxy()
                });
                record.set( 'CuentaId', cuenta.get( 'cue_iid' ) );
                record.save( {
                    success: function( record ) {
                        var parametros = 'cuentaid=' + cuenta.get( 'cue_iid' ) + '&smartpanicid=' + record.get( 'Id' );
                        Ext.Ajax.request( {
                            url: '/rest/search/smartpanicasignarcuenta',
                            method: 'GET',
                            params: parametros,
                            success: function( resp, operation ) {
                                notify( 'Los datos se guardaron con éxito' );
                                gridview.down( 'pagingtoolbar' ).doRefresh();
                            }
                        });
                    }
                });
            }
        });
    });
},
    
onCuentaNew: function(cuenta, view ) {
    var gridview = view.up( 'viewport' ).down( 'smartpanicpendinggridview' );

    var win = Ext.create( 'Ext.Window', {
        layout: 'fit',
        title: 'Nuevo SmartPanic',
        closeAction: 'destroy',
        itemId: 'cuentaNew',
        width: 450,
        height: 450,
        border: true,
        modal: true,
        view: gridview,
        items: [
            {
                xtype: 'smartpanicform',
                caller: view,
                cuenta: cuenta
            }
        ]
    });
    win.show();
},
    
tieneUsuariosDisponibles: function (view, callback ) {
    if( !view.up( 'viewport' ) ) {
        return null;
    }
    var fieldToolBar = view.up( 'viewport' ).down( '#toolbardisplayfield' );

    if( fieldToolBar.hidden && view.up( 'viewport' ).down( 'smartpanicnorthview' ) ) {
        fieldToolBar = view.up( 'viewport' ).down( 'smartpanicnorthview' ).down( '#toolbardisplayfield' );
    }
    var filters = Ext.Array.clone( view.filters );

    if( view.QtyUsers != 0 ) {
        var store = Ext.create( 'Ext.data.Store', {
            model: this.getSmartPanicSearchModelModel(),
            pageSize: 1, // estaba tirando 25 max
            remoteFilter: true,
            filters: [ {
                property: 'CuentaId:GTINT',
                value: '0'
            }]
        })

        store.load( function() {
            var asignados = this.getTotalCount();
            if( asignados == view.QtyUsers ) {

                // actualizo cantidades en la barra
                {
                    var t = view.down( 'toolbar' );
                    if( fieldToolBar )
                        fieldToolBar.setValue( getLocale( 'Disponibles/Usados' ) + ' (' + view.QtyUsers + '/' + asignados + ')' );
                }

                var nuevo = view.down( '[action="nuevo"]' );
                if( nuevo ) {
                    nuevo.setDisabled( true );
                }

                var msg = 'Se supero la cantidad de asignaciones disponibles. (' + asignados + '\/' + view.QtyUsers + ')';
                Ext.Msg.alert( 'Atención', msg, Ext.emptyFn );

            } else if( asignados > view.QtyUsers ) {
                // actualizo cantidades en la barra
                if( fieldToolBar )
                    fieldToolBar.setValue( getLocale( 'Disponibles/Usados' ) + ' (' + view.QtyUsers + '/' + asignados + ')' );

                view.down( '#queryType' ).setDisabled( true );
                view.down( '#query' ).setDisabled( true );
                view.down( '[action="search"]' ).setDisabled( true );
                view.down( '[action="getall"]' ).setDisabled( true );

                if( view.down( '[action="groupAlarmas"]' ) ) {
                    view.down( '[action="groupAlarmas"]' ).setDisabled( true );
                }

                if( view.down( '[action="configurar"]' ) ) {
                    view.down( '[action="configurar"]' ).setDisabled( true );
                }

                view.down( '[action="asignarcuenta"]' ).setDisabled( true );

                Ext.Msg.alert( 'Atención', 'Se supero la cantidad de asignaciones disponibles. Por favor comuniquese con el administrador.(' + asignados + '/' + view.QtyUsers + ')', Ext.emptyFn );

            } else {
                // actualizo cantidades en la barra
                if( fieldToolBar )
                    fieldToolBar.setValue( getLocale( 'Disponibles/Usados' ) + ' (' + view.QtyUsers + '/' + asignados + ')' );

                view.down( '[action="asignarcuenta"]' ).setDisabled( false );
                if( callback ) {
                    callback();
                }
            }
        });
    }
    else {
        // actualizo cantidades en la barra
        var t = view.down( 'toolbar' );
        fieldToolBar.setValue( getLocale( 'Dispositivos ilimitados' ) );
        if( callback ) {
            callback();
        }
    }
}
});